import { NextResponse } from "next/server";
import { getReviewsStore, addReview } from "@/lib/reviews-store";

export async function GET() {
  const reviews = getReviewsStore();
  return NextResponse.json({ ok: true, reviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, location, role, rating, comment, equipmentUsed } = body;

    if (!author || typeof author !== "string" || author.trim().length < 2) {
      return NextResponse.json(
        { ok: false, message: "يرجى كتابة الاسم الكريم (حرفين على الأقل)" },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim().length < 5) {
      return NextResponse.json(
        { ok: false, message: "يرجى كتابة تفاصيل رأيك وتجربتك (5 أحرف على الأقل)" },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    const validRating = !isNaN(numericRating) && numericRating >= 1 && numericRating <= 5 ? numericRating : 5;

    // Sanitize basic tags to prevent XSS
    const cleanAuthor = author.replace(/<[^>]*>?/gm, "").trim();
    const cleanLocation = (location || "محافظة الشرقية").replace(/<[^>]*>?/gm, "").trim();
    const cleanRole = (role || "مزارع / عميل كريم").replace(/<[^>]*>?/gm, "").trim();
    const cleanComment = comment.replace(/<[^>]*>?/gm, "").trim();
    const cleanEquipment = equipmentUsed ? equipmentUsed.replace(/<[^>]*>?/gm, "").trim() : undefined;

    const review = addReview({
      author: cleanAuthor,
      location: cleanLocation,
      role: cleanRole,
      rating: validRating,
      comment: cleanComment,
      equipmentUsed: cleanEquipment,
    });

    return NextResponse.json({ ok: true, review, message: "تمت إضافة مراجعتكم الكريمة بنجاح، شكراً لثقتكم!" });
  } catch {
    return NextResponse.json({ ok: false, message: "حدث خطأ أثناء حفظ التقييم" }, { status: 500 });
  }
}
