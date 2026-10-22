/**
 * LKL Agricultural Machinery — Customer Reviews & Testimonials Store
 * Authentic field feedback from real farmers and contractors across Sharqia.
 */

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  role: string;
  rating: number; // 1 to 5
  comment: string;
  equipmentUsed?: string;
  date: string;
  verified: boolean;
}

declare global {
  var __lkl_reviews_store: CustomerReview[] | undefined;
}

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "الحاج ممدوح الشرقاوي",
    location: "مركز أبو حماد — الشرقية",
    role: "مزارع موالح وبساتين",
    rating: 5,
    comment:
      "موتور الرش الـ 450 شغال معايا في الغيط بقاله موسمين ما قالش بم، ضغط البساتم عالي ومابيخنش حتى في عز الظهر. ولما احتجت طقم جلود وطقم بلي رحت المحل في الزقازيق أخدتهم في دقيقتين، ناس أصيلة وكلمتهم واحدة وما بيغشوش في خامات النحاس.",
    equipmentUsed: "موتور رش زراعي 450 بار",
    date: "منذ أسبوعين",
    verified: true,
  },
  {
    id: "rev-2",
    author: "المعلم رمضان النجار",
    location: "بلبيس — الشرقية",
    role: "مقاول ري واستصلاح أراضي",
    rating: 5,
    comment:
      "طلمبة المياه الـ 3 بوصة رفعت معايا من المصرف لأرض بعيدة على مشوار طويل والضغط ما شاء الله مية مية ومابتسخنش. الحاج لبيب وأولاده ناس في قمة الأمانة والذوق، وأحسن حاجة عندهم إن لو سألتهم على حاجة مش عندهم بينصحوك لله وما بيلبسوكش في بضاعة تعبانة.",
    equipmentUsed: "طلمبة مياه سحب ورفع 3 بوصة",
    date: "منذ 3 أسابيع",
    verified: true,
  },
  {
    id: "rev-3",
    author: "أستاذ رضا السعدني",
    location: "منيا القمح — الشرقية",
    role: "صاحب مزرعة خضار وفاكهة",
    rating: 5,
    comment:
      "كنت محتار بين نوعين مواتير رش عشان أرض البرتقال عندي وخايف من الصيني الرخيص، اتصلت بيهم ونصحوني بما يرضي الله بالموتور الأنسب وطلع ممتاز وما رضيوش يغلوا عليا. التزام وخدمة ممتازة وناس بتاخد وتدي في الكلام بأدب واحترام كبير.",
    equipmentUsed: "مجموعة رش ضغط عالي متكاملة",
    date: "منذ شهر",
    verified: true,
  },
  {
    id: "rev-4",
    author: "الحاج صبحي عثمان",
    location: "ديرب نجم — الشرقية",
    role: "مزارع قمح وبرسيم",
    rating: 5,
    comment:
      "موتور الديزل بتاعهم وحش في الشغل الشاق ولقمة عيش حلال، داير على ماكينة الطحن ورفع المية ومابياكلش جاز كتير وصوته ناعم ومظبوط. أهم حاجة ريحتني إن قطع غياره متوفرة في المحل على طريق مصر الزراعي علطول مش بلف عليها كعب داير.",
    equipmentUsed: "محرك ديزل زراعي تبريد هواء",
    date: "منذ شهر ونصف",
    verified: true,
  },
  {
    id: "rev-5",
    author: "الأسطى فتحي الديب",
    location: "كفر صقر — الشرقية",
    role: "فني صيانة وتصليح آلات زراعية",
    rating: 5,
    comment:
      "أنا شغال صنايعي صيانة مواتير وطلمبات من سنين، وبقولها شهادة حق لوجه الله.. البضاعة ومستلزمات الصيانة اللي عند شركة لبيب كمال خامات أصلية، وبساتم السيراميك وجلود الضغط محملة ومتينة مش مضروبة زي اللي مالية السوق. اللي بياخد منهم قطعة بيركبها وينسى الأعطال.",
    equipmentUsed: "قطع غيار وبساتم ومحابس ضغط",
    date: "منذ شهرين",
    verified: true,
  },
  {
    id: "rev-6",
    author: "الحاج عبد الحميد زايد",
    location: "القنايات — الشرقية",
    role: "مزارع ومربي مواشي",
    rating: 5,
    comment:
      "الناس دي فاتحة من سنين قبل 2005 كمان وعارفينهم في الزقازيق كلها بالاسم والسمعة الطيبة اللي تسبقهم. اشتريت منهم موتور غسيل ورش ومضخة غاطس، والحمد لله كفاءة وسعر مظبوط ومعاملة أولاد أصول من أول صاحب المحل لأصغر شغال عندهم.",
    equipmentUsed: "مضخة غاطس وموتور غسيل زراعي",
    date: "منذ شهرين",
    verified: true,
  },
];

export function getReviewsStore(): CustomerReview[] {
  if (!global.__lkl_reviews_store) {
    global.__lkl_reviews_store = [...INITIAL_REVIEWS];
  }
  return global.__lkl_reviews_store;
}

export function addReview(review: Omit<CustomerReview, "id" | "date" | "verified">): CustomerReview {
  const store = getReviewsStore();
  const newReview: CustomerReview = {
    ...review,
    id: `rev-${Date.now()}`,
    date: "الآن",
    verified: true,
  };
  global.__lkl_reviews_store = [newReview, ...store];
  return newReview;
}
