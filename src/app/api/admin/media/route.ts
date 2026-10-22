import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const media = [
      { id: "img-1", name: "spray-motor-1.jpg", alt: "موتور رش زراعي عالي الضغط", size: "142 KB", date: "2026-01-15" },
      { id: "img-2", name: "water-pump-1.jpg", alt: "طلمبة مياه ري 3 بوصة", size: "185 KB", date: "2026-01-16" },
      { id: "img-3", name: "diesel-motor-1.jpg", alt: "محرك ديزل زراعي", size: "210 KB", date: "2026-01-17" },
      { id: "img-4", name: "irrigation-filter-1.jpg", alt: "فلاتر ومستلزمات ري", size: "95 KB", date: "2026-01-18" },
      { id: "img-5", name: "tiller-1.jpg", alt: "عزاقة زراعية ميكانيكية", size: "160 KB", date: "2026-01-19" },
    ];
    return NextResponse.json({ ok: true, media });
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
      return NextResponse.json({ ok: false, message: "يرجى اختيار ملف صورة" }, { status: 400 });
    }

    // Task 144: Validate file MIME type and size (Max 5MB)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ ok: false, message: "نوع الملف غير مدعوم. الأنواع المسموحة: JPG, PNG, WEBP" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, message: "حجم الصورة يتجاوز الحد الأقصى المسموح (5 ميجابايت)" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const mediaItem = {
      id: `media-${Date.now()}`,
      name: safeName,
      alt: altText,
      size: `${Math.round(file.size / 1024)} KB`,
      date: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({ ok: true, media: mediaItem }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "غير مصرح" }, { status: 403 });
  }
}
