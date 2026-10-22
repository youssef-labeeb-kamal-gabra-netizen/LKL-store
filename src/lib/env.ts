/**
 * Type-safe environment variables reader with sensible defaults
 * and strict production safety checks (Phase 1, Item 1).
 */

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

// Strict production security invariants check
export function validateProductionSecurity(): void {
  if (!isProduction) return;

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret || authSecret === "dev-fallback-secret-for-local-build-only" || authSecret.trim().length < 32) {
    throw new Error(
      "SECURITY CRITICAL: AUTH_SECRET is missing, insecure, or using dev fallback in production! Configure a strong secret (>= 32 chars)."
    );
  }

  const adminEmailsRaw = process.env.ADMIN_EMAILS;
  if (!adminEmailsRaw || adminEmailsRaw.trim() === "") {
    throw new Error(
      "SECURITY CRITICAL: ADMIN_EMAILS is missing in production! You must explicitly define at least one verified administrator email."
    );
  }
}

// Runtime check in production when running on server (excluding build phases)
if (isProduction && typeof window === "undefined" && process.env.NEXT_PHASE !== "phase-production-build") {
  try {
    validateProductionSecurity();
  } catch (err: unknown) {
    if (process.env.VERCEL) {
      console.warn("Production security check:", err instanceof Error ? err.message : err);
    }
  }
}

export const env = {
  isProduction,
  isDevelopment,
  
  appUrl: process.env.NEXT_PUBLIC_APP_URL || (isProduction ? "https://lkl-store.vercel.app" : "http://localhost:3000"),
  
  business: {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "شركة لبيب كمال لبيب للأدوات والآلات الزراعية",
    brand: process.env.NEXT_PUBLIC_BRAND_NAME || "LKL",
    slogan: process.env.NEXT_PUBLIC_BUSINESS_SLOGAN || "الجودة • الثقة • الخدمة المتميزة",
    location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || "الجديدة — منيا القمح — الشرقية — مصر",
    addressPhrase: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_PHRASE || "طريق بنها - الزقازيق (طريق مصر الزراعي)، قرية الجديدة، مركز منيا القمح",
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "01220792948",
    secondaryPhone: process.env.NEXT_PUBLIC_BUSINESS_SECONDARY_PHONE || "01114587917",
    whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "01220792948",
    googleMapsUrl: process.env.NEXT_PUBLIC_BUSINESS_MAPS_URL || "https://www.google.com/maps/place/%D8%B4%D8%B1%D9%83%D8%A9+%D9%84%D8%A8%D9%8A%D8%A8+%D9%83%D9%85%D8%A7%D9%84+%D9%84%D9%84%D8%A3%D9%84%D8%A7%D8%AA+%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D9%87/@30.5346921,31.3866374,17z",
    establishedYear: "2005",
    experienceYears: "20+",
  },

  databaseUrl: process.env.DATABASE_URL || "",
  
  auth: {
    secret: process.env.AUTH_SECRET || "dev-fallback-secret-for-local-build-only",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    adminEmails: (process.env.ADMIN_EMAILS || "yousseflabeeb256@gmail.com")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  },
};
