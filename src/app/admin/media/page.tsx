import React from "react";
import { MediaManager } from "@/components/admin/media-manager";

const initialMedia = [
  { id: "img-1", name: "spray-motor-1.jpg", alt: "موتور رش زراعي عالي الضغط", size: "142 KB", date: "2026-01-15" },
  { id: "img-2", name: "water-pump-1.jpg", alt: "طلمبة مياه ري 3 بوصة", size: "185 KB", date: "2026-01-16" },
  { id: "img-3", name: "diesel-motor-1.jpg", alt: "محرك ديزل زراعي للخدمة الشاقة", size: "210 KB", date: "2026-01-17" },
  { id: "img-4", name: "irrigation-filter-1.jpg", alt: "فلاتر ومستلزمات ري", size: "95 KB", date: "2026-01-18" },
  { id: "img-5", name: "tiller-1.jpg", alt: "عزاقة زراعية ميكانيكية", size: "160 KB", date: "2026-01-19" },
  { id: "img-6", name: "spare-parts-1.jpg", alt: "طقم بساتم وجلود طلمبة رش", size: "115 KB", date: "2026-01-20" },
];

export default function AdminMediaPage() {
  return <MediaManager initialMedia={initialMedia} />;
}
