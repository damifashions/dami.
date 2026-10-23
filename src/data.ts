import { Product, LookbookItem, Testimonial, DamiLanguage, DamiCurrency } from './types';

// Luxury Translation Dictionary to keep our UI seamless
export const TRANSLATIONS: Record<string, Record<DamiLanguage, string>> = {
  heroTitle: {
    en: "Crafted Heritage. Worn Today.",
    fr: "Héritage Artisanal. Porté Aujourd'hui.",
    ar: "تراث مصاغ. نرتديه اليوم."
  },
  heroSubtitle: {
    en: "The spirit of traditional Moroccan craftsmanship meets contemporary minimal elegance.",
    fr: "L'esprit de l'artisanat marocain traditionnel rencontre la pureté d'un minimalisme contemporain.",
    ar: "روح الصناعة التقليدية المغربية تلتقي مع بساطة الأناقة المعاصرة."
  },
  shopCollection: {
    en: "Shop Collection",
    fr: "Découvrir la Collection",
    ar: "تسوق المجموعة"
  },
  discoverDami: {
    en: "Discover Dami",
    fr: "L'Histoire Dami",
    ar: "اكتشف دامي"
  },
  featuredCollections: {
    en: "Featured Categories",
    fr: "Catégories Clés",
    ar: "الفئات المميزة"
  },
  bestSellers: {
    en: "The Best Sellers",
    fr: "Les Incontournables",
    ar: "الأكثر مبيعاً"
  },
  bestSellersSub: {
    en: "Timeless silhouettes crafted for global sanctuaries of modern elegance.",
    fr: "Sihouettes intemporelles façonnées pour les temples de l'élégance moderne.",
    ar: "تصاميم خالدة صُممت خصيصاً لملاذات الأناقة والجمال العصري."
  },
  ourStoryTitle: {
    en: "Our Heritage & Vision",
    fr: "Notre Héritage & Vision",
    ar: "تراثنا ورؤيتنا"
  },
  lookbookTitle: {
    en: "Visual Lookbook",
    fr: "Le Lookbook Éditorial",
    ar: "كتالوج الأزياء"
  },
  lookbookSubtitle: {
    en: "A sensory journey photographed across luxury riads, dunes of Merzouga, and brutalist Moroccan villas.",
    fr: "Un voyage sensoriel capturé au cœur de riads d'exception, de dunes d'or et de villas brutalistes.",
    ar: "رحلة حسية تم تصويرها عبر الرياض الفاخرة، رمال مرزوكة، والفلل العصرية."
  },
  testimonialsTitle: {
    en: "The Dami Inner Circle Stories",
    fr: "L'Avis de nos Connaisseurs",
    ar: "قصص مجتمع دامي الموثوقة"
  },
  sizeGuideTitle: {
    en: "The Couture Size Matrix",
    fr: "Tableau de Mesures Couture",
    ar: "جدول المقاسات الفاخر"
  },
  quickAdd: {
    en: "Quick Add",
    fr: "Ajout Rapide",
    ar: "إضافة سريعة"
  },
  wishlist: {
    en: "Wishlist",
    fr: "Liste d'Envies",
    ar: "المفضلة"
  },
  cart: {
    en: "Your Cart",
    fr: "Votre Panier",
    ar: "حقيبة التسوق"
  },
  emptyCart: {
    en: "Your luxury cart is currently unoccupied.",
    fr: "Votre panier d'exception est actuellement vide.",
    ar: "حقيبة تسوقك الفاخرة فارغة حالياً."
  },
  checkout: {
    en: "Proceed to Checkout",
    fr: "Finaliser la Commande",
    ar: "إتمام الشراء"
  },
  newsletterTitle: {
    en: "Join the Dami Circle",
    fr: "Rejoindre le Cercle Dami",
    ar: "انضم إلى مجتمع دامي الخاص"
  },
  newsletterSub: {
    en: "Receive exclusive access to private capsule collections, artisan diaries, and special previews.",
    fr: "Accédez en priorité à nos capsules privées, nos carnets d'ateliers et événements d'initiés.",
    ar: "احصل على وصول حصري لمجموعاتنا الخاصة، ويوميات الحرفيين، والعروض المسبقة."
  },
  placeholderEmail: {
    en: "Enter your email address",
    fr: "Votre adresse e-mail d'exception",
    ar: "أدخل عنوان بريدك الإلكتروني"
  },
  subscribeButton: {
    en: "Request Entry",
    fr: "Demander l'Accès",
    ar: "طلب الانضمام"
  },
  successSubscribe: {
    en: "You have been registered for the Dami Circle. A welcome correspondence awaits you.",
    fr: "Bienvenue dans le Cercle Dami. Une correspondance d'accueil vous attend.",
    ar: "لقد تم تسجيلك في مجتمع دامي. ستصلك رسالة ترحيبية خاصة."
  },
  backToShopping: {
    en: "Back to Catalog",
    fr: "Retour au Catalogue",
    ar: "العودة للتسوق"
  },
  all: {
    en: "All Pieces",
    fr: "Toutes les Pièces",
    ar: "الكل"
  },
  kimonos: {
    en: "Kimonos",
    fr: "Kimonos d'Atelier",
    ar: "كيمونو"
  },
  abayas: {
    en: "Tunics",
    fr: "Tuniques Nobles",
    ar: "تونيك"
  },
  sets: {
    en: "Tailored Sets",
    fr: "Ensembles Tailleur",
    ar: "أطقم"
  },
  limited: {
    en: "Limited Editions",
    fr: "Éditions Limitées",
    ar: "إصدارات محدودة"
  }
};

// Luxury items with real Unsplash high fashion editorial images
export const PRODUCTS: Product[] = [
  {
    id: "dami-kimono-riad",
    title: {
      en: "Riad Marrakesh Silk Kimono",
      fr: "Kimono de Riad en Soie Impériale",
      ar: "كيمونو حريري لقصور مراكش"
    },
    category: "kimonos",
    categoryLabel: { en: "Kimonos", fr: "Kimonos Dami", ar: "كيمونو" },
    price: { EUR: 19, USD: 21, MAD: 199 },
    imageMain: "https://i.imgur.com/VZa5ym5.jpeg", // Riad Marrakesh Silk Kimono main image
    imageAlt: "https://i.imgur.com/9DqNja8.jpeg", // Riad Marrakesh Silk Kimono alt image
    description: {
      en: "Woven in premium organic silk with subtle hand-placed gold stitch borders. Designed with relaxed billowy sleeves and elegant side drapery that matches Marrakesh light shadows.",
      fr: "Tissé en soie biologique d'exception ornée de délicats liserés brodés à l'or fin par notre maître artisan à Fès. Une coupe majestueuse au tombé aérien idéal.",
      ar: "منسوج من الحرير الطبيعي الفاخر مع حواف مطرزة بخيوط ذهبية رقيقة غاية في الدقة على يد حائكينا بمدينة فاس."
    },
    details: {
      en: [
        "100% Organic Mulberry Silk",
        "Hand-guided gold embroidery borders",
        "Inner tadelakt-finish silk lining",
        "Crafted by hand in Fez, Morocco (14 hours of work)",
        "Includes silk belt tie with gold-plated cord tassel"
      ],
      fr: [
        "100% Soie de Mûrier Biologique",
        "Liserés brodés dorés guidés à la main",
        "Doublure intérieure au toucher cachemire tadelakt",
        "Façonné à la main à Fès (14 heures d'artisanat)",
        "Ceinture assortie en soie avec pampilles plaquées or"
      ],
      ar: [
        "حرير الملبيري العضوي الطبيعي 100٪",
        "تطريز ذهبي يدوي فريد على الأطراف",
        "بطانة داخلية ناعمة تحاكي ملمس التادلاكت",
        "صنع يدوياً بالكامل في مدينة فاس العريقة (عمل مستمر لمدة 14 ساعة)",
        "يتضمن حزام حريري مبهر مزين بشراشيب مطلية بطلاء ذهبي دقيق"
      ]
    },
    sizes: ["S", "M", "L"],
    materials: {
      en: "Dry Clean Only. Organic Mulberry Silk & Gold Thread.",
      fr: "Nettoyage à sec. Soie de Mûrier & Broderies Dorées.",
      ar: "تنظيف جاف فقط. حرير و خيوط ذهبية."
    },
    isBestSeller: true,
    isNew: true,
    inStock: false
  },
  {
    id: "dami-set-olive",
    title: {
      en: "Atlas Drape Loose Silk Set",
      fr: "Ensemble Atlas Drapé Vert Olive",
      ar: "طقم أطلس الحريري بلون الزيتون"
    },
    category: "sets",
    categoryLabel: { en: "Tailored Sets", fr: "Ensembles", ar: "أطقم" },
    price: { EUR: 25, USD: 28, MAD: 270 },
    imageMain: "https://unsplash.com/photos/NloW0pfYABk/download?q=80&w=800&auto=format&fit=crop", // Elegant emerald dress representing Atlas forest and olive luxury tones
    description: {
      en: "A refined dynamic dual-piece set consisting of wide-leg trousers and a coordinating minimalist tunic shirt. Painted in luxurious Dark Olive (#4D5643) color reflecting desert plants and Atlas mountains forests.",
      fr: "Un ensemble tailleur minimaliste fluide d'un coloris Olive Profond envoûtant. Pantalon à jambes larges amples à taille élastiquée invisible et tunique zéphyr assortie.",
      ar: "طقم فاخر من قطعتين يتكون من بنطال واسع مريح وبلوزة متناسقة بلمسة عصرية بلون زيتوني داكن ساحر يعكس بهاء جبال الأطلس وغاباتها."
    },
    details: {
      en: [
        "Heavy sand-washed Italian silk-crepe blend",
        "Elasticated hidden waistband on wide trousers",
        "Deep minimalist double cuffs with Mother of Pearl buttons",
        "Breathable, lightweight construction with elegant flow",
        "Perfect for high summer sunset galleries or luxury riad lounges"
      ],
      fr: [
        "Crêpe de soie lourd lavé au sable d'origine italienne",
        "Taille élastique dissimulée ultra-confortable",
        "Boutons d'exception en nacre naturelle",
        "Régulation naturelle thermique pour les chaudes soirées",
        "Fentes latérales structurées sur la tunique"
      ],
      ar: [
        "مزيج من كريب الحرير الإيطالي الثقيل المغسول بالرمال",
        "حزام خصر مرن مخفي على البنطال الواسع لمزيد من الثقة والراحة",
        "أزرار من عرق اللؤلؤ الطبيعي الفاخر على الأكمام المزمومة",
        "قصة جانبية متهدلة ساحرة وخفيفة الوزن",
        "مثالي للأمسيات الراقية والمناسبات الخاصة"
      ]
    },
    sizes: ["S", "M", "L", "XL"],
    materials: {
      en: "Mother of Pearl Buttons. Heavy Silk-Crepe Union.",
      fr: "Boutons Nacre Véritable. Crêpe de Soie Naturel.",
      ar: "أزرار من صدف اللؤلؤ الطبيعي. حرير كريب ثقيل."
    },
    isBestSeller: false,
    isNew: true,
    inStock: false
  },
  {
    id: "dami-bohemian-tunic",
    title: {
      en: "Bohemian Tunic",
      fr: "Tunique Bohème",
      ar: "تونيك بوهيمي"
    },
    category: "abayas",
    categoryLabel: { en: "Tunics", fr: "Tuniques Nobles", ar: "تونيك" },
    price: { EUR: 29, USD: 32, MAD: 310 },
    imageMain: "https://i.imgur.com/JdIEioK.jpeg", // Bohemian Tunic main image
    description: {
      en: "A tribute to free-spirited elegance. Combining fluid high-grade black satin-silk with minimal geometric bohemian embroidery that frames the silhouette with extreme grace.",
      fr: "Un hommage à l'élégance libre de l'esprit bohème. Soie de satin fluide noir de jais, rehaussée de délicates broderies géométriques bohèmes.",
      ar: "تكريم مذهل لأناقة الروح الحرة. يجمع بين الساتان الحريري الأسود الفاخر والتطريز البوهيمي الهندسي الأنيق."
    },
    details: {
      en: [
        "Premium heavy fluid satin-silk with subtle leather lustre",
        "Ivory White bohemian tahriri stitches representing artisan aesthetics",
        "Oversized draped kimono-sleeves for modest contemporary layout",
        "High-density weave resistant to wrinkling",
        "Invisible closures at wrists for adjustable sleeve length"
      ],
      fr: [
        "Soie satinée lourde italienne au lustre naturel subtil",
        "Surpiqûres ivoire de style bohème brodées le sillage",
        "Manches cloche dramatiques pour une élégance moderne",
        "Tissage très dense infroissable idéal pour les voyages",
        "Subtile boutonnière intérieure cachée"
      ],
      ar: [
        "ساتان حريري إيطالي ثقيل ومنسدل يمنحك بريقاً هادئاً",
        "خياطة هندسية بوهيمية بلون العاج الأبيض يدوية الصنع",
        "أكمام متموجة فضفاضة لأناقة عصرية محتشمة",
        "نسيج كثيف مقاوم للتجاعيد يحافظ على رونقه طوال اليوم",
        "أزرار داخلية خفية للتحكم بالاتساع"
      ]
    },
    sizes: ["S", "M", "L"],
    materials: {
      en: "90% Satin Silk, 10% Nylon for drape stability.",
      fr: "90% Satin de Soie Impérial, 10% Nylon stabilisateur.",
      ar: "90٪ ساتان حريري، 10٪ نايلون لتعزيز انسيابية وثبات القصّة."
    },
    isBestSeller: false,
    isNew: false,
    inStock: false
  },
  {
    id: "dami-set-majorelle",
    title: {
      en: "Majorelle Ivory Linen Set",
      fr: "Ensemble Blanc Ivoire Majorelle",
      ar: "طقم ماجوريل العاجي الراقي"
    },
    category: "sets",
    categoryLabel: { en: "Tailored Sets", fr: "Ensembles", ar: "أطقم" },
    price: { EUR: 39, USD: 43, MAD: 410 },
    imageMain: "https://unsplash.com/photos/hExji7sHm0A/download?q=80&w=800&auto=format&fit=crop", // Elegant black and white photo of a woman in a long flowing luxury dress
    description: {
      en: "An structured set of pure Ivory White cotton-linen blend. Consisting of an minimalist kaftan-cut tunic and sand-dune flow trousers, capturing natural light with majestic luxury.",
      fr: "Un ensemble immaculé d'un Blanc Ivoire pur façconné en métis de lin et coton bio. Tunique d'une architecture parfaite à découpe géométrique moderne.",
      ar: "طقم متناسق مذهل بلون العاج الأبيض الصافي خفيف للغاية ومنسوج من مزيج القطن والكتان الطبيعي. يضم بلوزة بقصة القفطان الفضفاض وبنطال مريح."
    },
    details: {
      en: [
        "Blend of 60% Raw Flax Linen & 40% Giza Cotton",
        "Breathes beautifully during sunny afternoons inside Moroccan villas",
        "Split side hems on the tunic for visual dynamism",
        "Flat front trousers with hidden zipper back waist",
        "Made sustainably in a private artisan cooperative in Fez"
      ],
      fr: [
        "Mélange précieux de 60% Lin Bio & 40% Coton d'Égypte",
        "Légèreté absolue pour la saison chaude d'Afrique du Nord",
        "Fentes latérales structurées sur la chemise",
        "Pantalon à coupe droite impeccable avec fermeture invisible",
        "Teint de manière organique et écologique sous le soleil de l'Atlas"
      ],
      ar: [
        "مزيج مثالي من 60٪ كتان بري خام، 40٪ قطن مصري فاخر",
        "يوفر تهوية مثالية لأيام الصيف المشمسة في واحات النخيل",
        "فتح أقسام مميزة على التونيك لتوفير انسيابية ملفتة مع كل خطوة",
        "سحاب خلفي مخفي بلمسات الخياطة الراقية الصارمة",
        "صُنع بحب في تعاونية نسيج حرفية صغيرة مستقلة"
      ]
    },
    sizes: ["S", "M", "L"],
    materials: {
      en: "Organic linen & Giza cotton hybrid weave.",
      fr: "Hybride de lin pur et coton de Gizeh d'Égypte.",
      ar: "مزيج هجين من الكتان الطبيعي والقطن المصري."
    },
    isBestSeller: true,
    isNew: true,
    inStock: false
  }
];

// Immersive editorial lookbook
export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-1",
    title: {
      en: "Luminescence of the Desert",
      fr: "Luminescence des Dunes d'Or",
      ar: "إشراقة كثبان الصحراء"
    },
    subtitle: {
      en: "Captured in the traditional geometric patterns of the Moroccan high couture.",
      fr: "Capturé au gré des passemeteries et pampilles ancestrales façonnées à la main.",
      ar: "تم تصويره مع لمسات الخياطة التقليدية الأصيلة تحت سماء الأطلس."
    },
    imageUrl: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop", // Beautiful pure golden sand dunes of the Merzouga Sahara desert
    setting: {
      en: "Dunes of Merzouga, Morocco",
      fr: "Dunes de Merzouga, Maroc",
      ar: "كثبان مرزوكة، المغرب"
    },
    designerQuote: {
      en: "The desert strips away all noise, leaving only raw roots and pure silhouettes. That is Dami.",
      fr: "L'artisanat efface le bruit inutile de la modernité pour ne laisser que la lumière pure.",
      ar: "دامي تجرد كل صخب لتترك فقط الجذور النقية والظلال البسيطة والفريدة."
    }
  },
  {
    id: "look-2",
    title: {
      en: "The Hidden Sanctuary",
      fr: "Le Sanctuaire Secret",
      ar: "الملاذ والرياض الخفي"
    },
    subtitle: {
      en: "An interplay of architectural arches with private reflecting pools in Marrakesh.",
      fr: "Dialogue silencieux entre arches de pierre épurée et bassins d'eau calme.",
      ar: "تفاعل مذهل بين الأقواس المعمارية الحديثة ونوافير الرياض الخاصة في قلب المدينة القديمة."
    },
    imageUrl: "https://unsplash.com/photos/gCr0amJXOts/download?q=80&w=1200&auto=format&fit=crop", // User requested Unsplash image gCr0amJXOts
    setting: {
      en: "La Sultana Riad Villa, Marrakesh",
      fr: "Riad La Sultana, Marrakech",
      ar: "رياض لا سلطانة، مراكش"
    },
    designerQuote: {
      en: "In the shadow of traditional columns, the contemporary kimono claims its eternal place.",
      fr: "À l'ombre des colonnes centenaires du riad, le kimono de lin révèle toute sa modernité.",
      ar: "في ظلال الأعمدة التاريخية العريقة، يستعيد الكيمونو المنسوج رونقه ومكانته الخالدة."
    }
  },
  {
    id: "look-3",
    title: {
      en: "Breeze of the Medina Steps",
      fr: "Souffle de la Médina à Marrakech",
      ar: "نسيم درجات المدينة بمراكش"
    },
    subtitle: {
      en: "Oatmeal-grey linen drapery set against warm sand-washed stone staircases.",
      fr: "Drapés de lin ivoire sculpturaux respirant face à l'immensité du riad.",
      ar: "أقمشة كتانية بيضاء ورمادية مذهلة تتهادى على درجات القصور التاريخية بمراكش."
    },
    imageUrl: "https://i.imgur.com/loZ8qPq.jpeg", // User image: Model warm linen
    setting: {
      en: "Medina Ateliers, Marrakech",
      fr: "Ateliers de la Médina, Maroc",
      ar: "درج المدينة، المغرب"
    },
    designerQuote: {
      en: "We design clothing to move like the coastal wind—effortless, confident, wild but meticulously composed.",
      fr: "Nos silhouettes bougent comme le vent d'ouest : avec aisance, confiance et majesté.",
      ar: "نحن نصمم أزياء تتحرك وتتدفق مثل رياح المحيط الهادئة - بلا تكلف، مع حكايات الثقة والحرية."
    }
  }
];

// Curated high-end customer feedbacks
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: {
      en: "Dami embodies the exact equilibrium of Moroccan history and minimalist state-of-the-art silhouettes. The feel of the organic silk lining in my Riad Kimono is incomparable. It is not clothing; it is modern architectural monument for the body.",
      fr: "Dami incarne l'équilibre parfait entre l'héritage marocain et l'aspiration minimaliste contemporaine. Le toucher de la soie sur la peau est divin. Un véritable chef-d'œuvre à porter au quotidien.",
      ar: "تجسد دامي التوازن الدقيق للغاية بين التاريخ المغربي الأصيل والتصاميم البسيطة فائقة الحداثة. ملمس بطانة الحرير العضوي في الكيمونو لا يمكن مقارنته بأي شيء آخر. إنها قطعة فنية تمنحك الثقة الفائقة."
    },
    author: "Princess Lalla Kenza O.",
    city: "Rabat / Geneva"
  }
];

// Simulated Instagram Gallery items with only user-uploaded photos
export const INSTAGRAM_POSTS = [
  { id: "ig-1", url: "https://i.imgur.com/loZ8qPq.jpeg" },
  { id: "ig-2", url: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=400&auto=format&fit=crop" },
  { id: "ig-3", url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop" },
  { id: "ig-4", url: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=400&auto=format&fit=crop" }
];
