import { NextResponse } from "next/server";
import { addContactRequest } from "@/lib/contact-requests";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, product, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, message: "يرجى كتابة الاسم بشكل صحيح (حرفين على الأقل)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return NextResponse.json(
        { ok: false, message: "يرجى كتابة رقم هاتف صالح للتواصل." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, message: "يرجى توضيح تفاصيل الاستفسار (5 أحرف على الأقل)." },
        { status: 400 }
      );
    }

    // Persist request
    const saved = addContactRequest({
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      email: email ? String(email).trim().slice(0, 100) : undefined,
      product: product ? String(product).trim().slice(0, 100) : undefined,
      message: message.trim().slice(0, 1000),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "تم استلام طلبكم بنجاح.",
        requestId: saved.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
