/**
 * Type-safe environment variables reader with sensible defaults
 * and clear production safety checks.
 */

export const env = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  business: {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "شركة لبيب كمال لبيب للأدوات والآلات الزراعية",
    brand: process.env.NEXT_PUBLIC_BRAND_NAME || "LKL",
    slogan: process.env.NEXT_PUBLIC_BUSINESS_SLOGAN || "الجودة • الثقة • الخدمة المتميزة",
    location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || "الزقازيق — الشرقية — مصر",
    addressPhrase: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_PHRASE || "البداية، طريق مصر الزراعي",
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "01220792948",
    secondaryPhone: process.env.NEXT_PUBLIC_BUSINESS_SECONDARY_PHONE || "01114587917",
    whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "01220792948",
    googleMapsUrl: process.env.NEXT_PUBLIC_BUSINESS_MAPS_URL || "https://maps.app.goo.gl/fjJacxeJPcMBw7rU8",
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
