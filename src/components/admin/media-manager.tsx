"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast";
import { ImageIcon, Upload } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  alt: string;
  size: string;
  date: string;
}

export function MediaManager({ initialMedia }: { initialMedia: MediaItem[] }) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [altText, setAltText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setToastMessage({ type: "error", text: "يرجى تحديد ملف صورة للرفع" });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("altText", altText.trim() || selectedFile.name);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "فشل رفع الصورة");

      setMediaList([data.media, ...mediaList]);
      setSelectedFile(null);
      setAltText("");
      setToastMessage({ type: "success", text: "تم رفع وفحص الصورة بنجاح وتجهيزها للاستخدام" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ أثناء الرفع";
      setToastMessage({ type: "error", text: msg });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
    setToastMessage({ type: "success", text: "تم حذف الصورة من مكتبة الوسائط" });
  };

  return (
    <div className="space-y-8 text-start">
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.text}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="border-b border-brand-neutral-200 pb-5">
        <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
          إدارة الأصول الرقمية
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-0.5">
          مكتبة وسائط وصور المعدات ({mediaList.length})
        </h1>
        <p className="text-sm text-brand-neutral-500 mt-1">
          رفع وإدارة صور الآلات مع فحص الأمان (MIME Verification) والنصوص البديلة (Alt Text) لمحركات البحث.
        </p>
      </div>

      {/* Upload Box (Task 143, 144, 148) */}
      <form onSubmit={handleUpload} className="rounded-2xl border border-brand-neutral-200 bg-white p-6 shadow-sm space-y-4 max-w-xl">
        <h3 className="text-base font-bold text-brand-neutral-900 flex items-center gap-2">
          <Upload className="h-5 w-5 text-brand-green-700" />
          رفع صورة معدة زراعية جديدة
        </h3>

        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-semibold text-brand-neutral-700 mb-1">
              اختر ملف الصورة (JPG, PNG, WEBP — بحد أقصى 5MB)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-brand-neutral-500 file:ms-0 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-green-50 file:text-brand-green-700 hover:file:bg-brand-green-100 cursor-pointer"
            />
          </div>

          <Input
            label="النص البديل (Alt Text) لوصف المعدة بمحركات البحث"
            placeholder="مثال: صورة تفصيلية لموتور رش زراعي 450 بار"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          <Button type="submit" variant="primary" size="sm" isLoading={isUploading} className="font-bold gap-2">
            <Upload className="h-4 w-4" />
            بدء فحص ورفع الصورة
          </Button>
        </div>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-brand-neutral-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-brand-neutral-100 flex flex-col items-center justify-center p-4 text-center border-b border-brand-neutral-100">
              <ImageIcon className="h-10 w-10 text-brand-neutral-400 mb-2" />
              <span className="text-xs font-bold text-brand-neutral-700 font-mono truncate max-w-[180px]">
                {m.name}
              </span>
            </div>

            <div className="p-3 text-xs space-y-1">
              <p className="text-brand-neutral-600 line-clamp-1 font-medium">{m.alt}</p>
              <div className="flex items-center justify-between text-brand-neutral-400 pt-1">
                <span>{m.size}</span>
                <span>{m.date}</span>
              </div>
            </div>

            <div className="p-2.5 bg-brand-neutral-50 border-t border-brand-neutral-100 flex justify-end">
              <button
                type="button"
                onClick={() => handleDelete(m.id)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold p-1 hover:bg-red-50 rounded"
              >
                حذف الصورة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
