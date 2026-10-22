import { env } from "@/lib/env";
import { readStorageFile, writeStorageFile } from "@/lib/storage";
import type { BusinessSettings } from "@/types/settings";

export type { BusinessSettings };

const STORAGE_FILE = "settings.json";

function getDefaultSettings(): BusinessSettings {
  return {
    phone: env.business.phone || "01220792948",
    secondaryPhone: env.business.secondaryPhone || "01114587917",
    whatsapp: env.business.whatsapp || "01220792948",
    googleMapsUrl: env.business.googleMapsUrl || "https://www.google.com/maps/place/%D8%B4%D8%B1%D9%83%D8%A9+%D9%84%D8%A8%D9%8A%D8%A8+%D9%83%D9%85%D8%A7%D9%84+%D9%84%D9%84%D8%A3%D9%84%D8%A7%D8%AA+%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D9%87/@30.5346921,31.3866374,17z",
    addressPhrase: env.business.addressPhrase || "طريق بنها - الزقازيق (طريق مصر الزراعي)، قرية الجديدة، مركز منيا القمح",
    workingHours: "يومياً من 8:00 صباحاً حتى 9:00 مساءً",
    slogan: env.business.slogan || "الجودة • الثقة • الخدمة المتميزة",
    facebook: "https://facebook.com/lkl.machinery",
    youtube: "",
  };
}

export function getCustomSettings(): BusinessSettings {
  return readStorageFile<BusinessSettings>(STORAGE_FILE, getDefaultSettings());
}

export function updateCustomSettings(updates: Partial<BusinessSettings>): BusinessSettings {
  const current = getCustomSettings();
  const merged: BusinessSettings = {
    ...current,
    ...updates,
  };
  writeStorageFile(STORAGE_FILE, merged);
  return merged;
}
