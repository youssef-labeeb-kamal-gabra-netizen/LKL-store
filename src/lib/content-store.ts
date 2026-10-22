export interface ContentBlocks {
  heroTagline: string;
  heroHeading: string;
  heroDescription: string;
  aboutText: string;
  locationPhrase: string;
}

declare global {
  var __lkl_content_blocks: ContentBlocks | undefined;
}

const defaultContent: ContentBlocks = {
  heroTagline: "شريككم الأول في المعدات الزراعية وأنظمة الري",
  heroHeading: "شركة لبيب كمال للأدوات والآلات الزراعية",
  heroDescription: "نوفر أحدث محركات الرش، طلمبات ومحركات مياه الري، محركات الديزل، ومستلزمات شبكات الري الحديث مع توفير قطع الغيار الأصلية والدعم الفني المباشر في الزقازيق ومحافظات مصر.",
  aboutText: "تأسست شركة لبيب كمال في محافظة الشرقية لتكون المركز الرائد في توريد وصيانة الآلات الزراعية، ومحركات مياه الري والرش، وتوفير كافة مستلزمات الإنتاج الزراعي الحديث.",
  locationPhrase: "الزقازيق — محافظة الشرقية — مصر (البداية، طريق مصر الزراعي)",
};

export function getContentStore(): ContentBlocks {
  if (!global.__lkl_content_blocks) {
    global.__lkl_content_blocks = { ...defaultContent };
  }
  return global.__lkl_content_blocks;
}

export function updateContentStore(updates: Partial<ContentBlocks>): ContentBlocks {
  const store = getContentStore();
  global.__lkl_content_blocks = {
    ...store,
    ...updates,
  };
  return global.__lkl_content_blocks;
}
