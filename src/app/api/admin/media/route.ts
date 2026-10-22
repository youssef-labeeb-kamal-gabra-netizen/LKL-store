import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/auth";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function GET() {
  try {
    await requireAdmin();

    const mediaList = [];

    // 1. Scan real uploaded files
    if (fs.existsSync(UPLOADS_DIR)) {
      const uploadFiles = fs.readdirSync(UPLOADS_DIR);
      for (const file of uploadFiles) {
        const fullPath = path.join(UPLOADS_DIR, file);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
          mediaList.push({
            id: `upload-${file}`,
            name: file,
            url: `/uploads/${file}`,
            alt: file.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, ""),
            size: `${Math.round(stat.size / 1024)} KB`,
            date: stat.mtime.toISOString().split("T")[0],
            isCustomUpload: true,
          });
        }
      }
    }

    // 2. Scan official products catalogue HD images
    const productsDir = path.join(process.cwd(), "public", "images", "products");
    if (fs.existsSync(productsDir)) {
      const productFiles = fs.readdirSync(productsDir);
      for (const file of productFiles) {
        if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp")) {
          const fullPath = path.join(productsDir, file);
          const stat = fs.statSync(fullPath);
          mediaList.push({
            id: `prod-img-${file}`,
            name: file,
            url: `/images/products/${file}`,
            alt: file.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, ""),
            size: `${Math.round(stat.size / 1024)} KB`,
            date: stat.mtime.toISOString().split("T")[0],
            isCustomUpload: false,
          });
        }
      }
    }

    return NextResponse.json({ ok: true, media: mediaList });
  } catch {
    return NextResponse.json({ ok: false, message: "غير مصرح" }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "صورة معدة زراعية";

    if (!file) {
      return NextResponse.json({ ok: false, message: "يرجى اختيار ملف صورة صالح" }, { status: 400 });
    }

    // MIME type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, message: "نوع الملف غير مدعوم. الأنواع المسموحة: JPG, PNG, WEBP" },
        { status: 400 }
      );
    }

    // Size limit (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, message: "حجم الصورة يتجاوز الحد الأقصى المسموح (5 ميجابايت)" },
        { status: 400 }
      );
    }

    // Sanitize and generate unique safe filename
    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueName);

    // Save actual file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destinationPath, buffer);

    const mediaItem = {
      id: `upload-${uniqueName}`,
      name: uniqueName,
      url: `/uploads/${uniqueName}`,
      alt: altText,
      size: `${Math.round(file.size / 1024)} KB`,
      date: new Date().toISOString().split("T")[0],
      isCustomUpload: true,
    };

    return NextResponse.json({ ok: true, media: mediaItem }, { status: 201 });
  } catch (err) {
    console.error("Media upload error:", err);
    return NextResponse.json({ ok: false, message: "تعذر رفع وحفظ الصورة على الخادم" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("name");

    if (!fileName) {
      return NextResponse.json({ ok: false, message: "اسم الملف مطلوب للحذف" }, { status: 400 });
    }

    // Security check: prevent path traversal attacks
    const safeBaseName = path.basename(fileName);
    const targetPath = path.join(UPLOADS_DIR, safeBaseName);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return NextResponse.json({ ok: true, message: "تم حذف الصورة نهائياً من السيرفر" });
    }

    return NextResponse.json({ ok: false, message: "الملف غير موجود في مجلد الرفع" }, { status: 404 });
  } catch {
    return NextResponse.json({ ok: false, message: "غير مصرح أو تعذر حذف الملف" }, { status: 403 });
  }
}
