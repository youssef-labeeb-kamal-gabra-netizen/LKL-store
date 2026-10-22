"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { Send } from "lucide-react";

export interface ContactFormProps {
  initialProductSlug?: string;
}

export function ContactForm({ initialProductSlug }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState(initialProductSlug || "");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("يرجى ملء جميع الحقول الإلزامية (الاسم، رقم الهاتف، والرسالة).");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          product: product.trim() || undefined,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء إرسال الطلب.");
      }

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "تعذر إرسال طلبك حالياً، يرجى المحاولة لاحقاً أو التواصل عبر واتساب.";
      setStatus("error");
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-start">
      {status === "success" && (
        <Toast
          type="success"
          message="تم استلام طلبكم بنجاح! سيقوم فريق شركة لبيب كمال بالتواصل معكم هاتفياً أو عبر واتساب في أقرب وقت."
          onClose={() => setStatus("idle")}
        />
      )}

      {status === "error" && (
        <Toast
          type="error"
          message={errorMessage}
          onClose={() => setStatus("idle")}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="الاسم بالكامل"
          required
          placeholder="مثال: م. أحمد عبد الله"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <Input
          label="رقم الهاتف / واتساب"
          required
          type="tel"
          placeholder="مثال: 010xxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="البريد الإلكتروني (اختياري)"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          label="المعدة أو الطراز المطلوب الاستفسار عنه"
          placeholder="مثال: موتور رش / طلمبة مياه 3 بوصة"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Textarea
        label="تفاصيل الاستفسار أو متطلبات المزرعة"
        required
        placeholder="اذكر نوع المحصول، المساحة، مصدر المياه، أو نوع الطلمبة المطلوبة بالتحديد..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full sm:w-auto font-bold px-8"
      >
        <Send className="h-4 w-4 ms-2" />
        إرسال الطلب والاستفسار
      </Button>
    </form>
  );
}
