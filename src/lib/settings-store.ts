import { env } from "@/lib/env";

declare global {
  var __lkl_custom_settings: Record<string, string> | undefined;
}

export function getCustomSettings(): Record<string, string> {
  if (!global.__lkl_custom_settings) {
    global.__lkl_custom_settings = {
      phone: env.business.phone,
      secondaryPhone: env.business.secondaryPhone,
      whatsapp: env.business.whatsapp,
      googleMapsUrl: env.business.googleMapsUrl,
      addressPhrase: env.business.addressPhrase,
      slogan: env.business.slogan,
      facebook: "https://facebook.com/lkl.machinery",
      youtube: "",
    };
  }
  return global.__lkl_custom_settings;
}

export function updateCustomSettings(updates: Record<string, string>): Record<string, string> {
  global.__lkl_custom_settings = {
    ...getCustomSettings(),
    ...updates,
  };
  return global.__lkl_custom_settings;
}
