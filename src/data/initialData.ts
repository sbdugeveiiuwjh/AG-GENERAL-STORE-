import { Category, Product, StoreSettings, SpecialOffer, GroceryBundle } from '../types/grocery';

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'AG GENRAL STORE',
  storeNameHi: 'AG General Store',
  phone: '+91 73669 42823',
  whatsappNumber: '917366942823',
  address: 'Durga Mandir ke pichhe, Sabji Mandi Market, Bhatni Bazar, Bishan Pur Sundar, Bihar 852112, India',
  landmark: 'Durga Mandir ke pichhe (Behind Durga Mandir)',
  plusCode: '2XV4+X4 Bishan Pur Sundar, Bihar',
  closingTime: '9:30 PM',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=AG+GENRAL+STORE+Bhatni+Bazar+Bishan+Pur+Sundar+Bihar+852112',
  deliveryAvailable: true,
  deliveryCharge: 0, // Free local pickup; local delivery subject to shop confirmation
  minOrderForDelivery: 300,
  upiId: '7366942823@upi',
  upiQrCodeImage: '',
  announcement: 'ताजा चक्की आटा, शुद्ध सरसों तेल एवं कतरनी चावल का नया स्टॉक उपलब्ध है! अपनी पर्ची WhatsApp करें।',
  announcementActive: true,
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'whole-spices',
    nameHi: 'साबुत मसाले',
    nameEn: 'Whole Spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: 'खड़े मसाले, लौंग, इलायची, दालचीनी, काली मिर्च'
  },
  {
    id: 'coriander',
    nameHi: 'धनिया',
    nameEn: 'Coriander',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    description: 'साबुत धनिया और पिसा हुआ धनिया पाउडर'
  },
  {
    id: 'cumin',
    nameHi: 'जीरा',
    nameEn: 'Cumin',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
    description: 'ताजा एवं खुशबूदार साबुत जीरा'
  },
  {
    id: 'red-chilli',
    nameHi: 'लाल मिर्च',
    nameEn: 'Red Chilli',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    description: 'तीखी लाल मिर्च पाउडर और खड़ी सूखी मिर्च'
  },
  {
    id: 'turmeric',
    nameHi: 'हल्दी',
    nameEn: 'Turmeric',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    description: 'शुद्ध हल्दी पाउडर और साबुत हल्दी'
  },
  {
    id: 'sugar',
    nameHi: 'चीनी',
    nameEn: 'Sugar',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    description: 'साफ एवं दानेदार सफेद चीनी और गुड़'
  },
  {
    id: 'rice',
    nameHi: 'चावल',
    nameEn: 'Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'दैनिक चावल, कतरनी, बासमती और उसना चावल'
  },
  {
    id: 'pulses',
    nameHi: 'दालें',
    nameEn: 'Pulses',
    image: 'https://images.unsplash.com/photo-1585994192701-f2545ca80ec4?auto=format&fit=crop&w=600&q=80',
    description: 'अरहर (तूर), चना, मसूर, मूंग और उड़द दाल'
  },
  {
    id: 'flour-besan',
    nameHi: 'आटा और बेसन',
    nameEn: 'Flour and Gram Flour',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'चक्की ताजा गेहूं का आटा, चना बेसन, मैदा और सूजी'
  },
  {
    id: 'salt',
    nameHi: 'नमक',
    nameEn: 'Salt',
    image: 'https://images.unsplash.com/photo-1626197031507-c1707cb4d4d1?auto=format&fit=crop&w=600&q=80',
    description: 'आयोडीन युक्त नमक, सेंधा नमक और काला नमक'
  },
  {
    id: 'cooking-oil',
    nameHi: 'खाद्य तेल',
    nameEn: 'Cooking Oil',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    description: 'शुद्ध सरसों का तेल (कच्ची घानी), रिफाइंड तेल और घी'
  },
  {
    id: 'biscuits-snacks',
    nameHi: 'बिस्कुट और स्नैक्स',
    nameEn: 'Biscuits and Snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    description: 'पारले-जी, मैरी, नमकीन, भुजिया और स्नैक्स'
  },
  {
    id: 'tea-coffee',
    nameHi: 'चाय और कॉफी',
    nameEn: 'Tea and Coffee',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'ताज़ा कड़क चाय पत्ती और कॉफी'
  },
  {
    id: 'household',
    nameHi: 'साबुन और घरेलू सामान',
    nameEn: 'Household Essentials',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'कपड़े धोने का डिटर्जेंट, नहाने का साबुन, अगरबत्ती और माचिस'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Spices
  {
    id: 'p-dhaniya',
    nameHi: 'धनिया पाउडर',
    nameEn: 'Dhaniya Powder (Coriander)',
    categoryId: 'coriander',
    description: 'सुगंधित और ताज़ा पिसा हुआ धनिया पाउडर, हर सब्ज़ी के लिए उत्तम।',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-dh-100', weight: '100 g', price: 28 },
      { id: 'v-dh-250', weight: '250 g', price: 65 },
      { id: 'v-dh-500', weight: '500 g', price: 125 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-jeera',
    nameHi: 'जीरा साबुत',
    nameEn: 'Jeera Whole (Cumin Seeds)',
    categoryId: 'cumin',
    description: 'प्रीमियम क्वालिटी साफ साबुत जीरा, तड़के और ज़ायके के लिए।',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-jr-100', weight: '100 g', price: 42 },
      { id: 'v-jr-250', weight: '250 g', price: 100 },
      { id: 'v-jr-500', weight: '500 g', price: 195 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-mirchi',
    nameHi: 'लाल मिर्च पाउडर',
    nameEn: 'Red Chilli Powder (Lal Mirch)',
    categoryId: 'red-chilli',
    description: 'शुद्ध तीखापन और प्राकृतिक लाल रंग, बिना किसी मिलावट के।',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-mr-100', weight: '100 g', price: 34 },
      { id: 'v-mr-250', weight: '250 g', price: 80 },
      { id: 'v-mr-500', weight: '500 g', price: 155 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-haldi',
    nameHi: 'हल्दी पाउडर',
    nameEn: 'Turmeric Powder (Haldi)',
    categoryId: 'turmeric',
    description: 'शुद्ध देसी हल्दी पाउडर, उच्च करक्यूमिन युक्त और स्वास्थ्यवर्धक।',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-hd-100', weight: '100 g', price: 30 },
      { id: 'v-hd-250', weight: '250 g', price: 70 },
      { id: 'v-hd-500', weight: '500 g', price: 135 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-garam-masala',
    nameHi: 'साबुत गरम मसाला मिश्रण',
    nameEn: 'Whole Garam Masala Mix',
    categoryId: 'whole-spices',
    description: 'लौंग, बड़ी इलायची, दालचीनी, काली मिर्च, तेजपत्ता का संतुलित खड़ा मसाला।',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-gm-50', weight: '50 g', price: 45 },
      { id: 'v-gm-100', weight: '100 g', price: 85 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  },

  // 2. Staples & Sugar
  {
    id: 'p-sugar',
    nameHi: 'सफेद चीनी',
    nameEn: 'Refined White Sugar',
    categoryId: 'sugar',
    description: 'साफ, चमकदार और मीठी उत्तम दानेदार चीनी।',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-sg-1k', weight: '1 kg', price: 46 },
      { id: 'v-sg-500g', weight: '500 g', price: 24 },
      { id: 'v-sg-250g', weight: '250 g', price: 12 },
      { id: 'v-sg-5k', weight: '5 kg', price: 225 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-rice',
    nameHi: 'चावल (दैनिक भोग व उसना)',
    nameEn: 'Rice (Daily Grain / Usna Rice)',
    categoryId: 'rice',
    description: 'साफ किया हुआ, स्वादिष्ट और रोज़मर्रा के भोजन के लिए उत्तम चावल।',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-rc-1k', weight: '1 kg', price: 42 },
      { id: 'v-rc-5k', weight: '5 kg', price: 205 },
      { id: 'v-rc-10k', weight: '10 kg', price: 400 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-arhar-dal',
    nameHi: 'अरहर दाल (तूर दाल)',
    nameEn: 'Arhar Dal (Toor Dal)',
    categoryId: 'pulses',
    description: 'पॉलिश-रहित साफ अरहर दाल, गाढ़ी और स्वादिष्ट दाल बनाने के लिए।',
    image: 'https://images.unsplash.com/photo-1585994192701-f2545ca80ec4?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-ad-1k', weight: '1 kg', price: 145 },
      { id: 'v-ad-2k', weight: '2 kg', price: 285 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-chana-dal',
    nameHi: 'चना दाल',
    nameEn: 'Chana Dal (Bengal Gram)',
    categoryId: 'pulses',
    description: 'पोषक तत्वों से भरपूर साफ देसी चना दाल। तड़का और पूरनपोली के लिए श्रेष्ठ।',
    image: 'https://images.unsplash.com/photo-1585994192701-f2545ca80ec4?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-cd-1k', weight: '1 kg', price: 92 },
      { id: 'v-cd-2k', weight: '2 kg', price: 180 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  },
  {
    id: 'p-atta',
    nameHi: 'गेहूं का आटा (चक्की ताजा)',
    nameEn: 'Chakki Fresh Wheat Atta',
    categoryId: 'flour-besan',
    description: '100% शुद्ध संपूर्ण गेहूं का आटा, नरम और फूली हुई रोटियों के लिए।',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-at-5k', weight: '5 kg', price: 185 },
      { id: 'v-at-10k', weight: '10 kg', price: 360 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-besan',
    nameHi: 'चना बेसन',
    nameEn: 'Gram Flour (Besan)',
    categoryId: 'flour-besan',
    description: 'बारीक पिसा हुआ शुद्ध चना बेसन, कढ़ी और पकौड़ों के लिए एकदम सही।',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-bs-500', weight: '500 g', price: 55 },
      { id: 'v-bs-1k', weight: '1 kg', price: 105 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  },
  {
    id: 'p-salt',
    nameHi: 'आयोडीन युक्त नमक',
    nameEn: 'Iodized Salt (Namak)',
    categoryId: 'salt',
    description: 'शुद्ध सफेद आयोडीन युक्त नमक, रोजाना के स्वाद और सेहत के लिए।',
    image: 'https://images.unsplash.com/photo-1626197031507-c1707cb4d4d1?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-st-1k', weight: '1 kg', price: 26 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-sarson-tel',
    nameHi: 'कच्ची घानी सरसों का तेल',
    nameEn: 'Mustard Oil (Kacchi Ghani)',
    categoryId: 'cooking-oil',
    description: 'शुद्ध तीखा सरसों तेल, परंपरागत बिहारी स्वाद और तड़के के लिए।',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-mo-1l', weight: '1 Ltr', price: 155 },
      { id: 'v-mo-5l', weight: '5 Ltr', price: 740 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: true
  },
  {
    id: 'p-chai-patti',
    nameHi: 'कड़क चाय पत्ती',
    nameEn: 'Strong CTC Tea Leaf',
    categoryId: 'tea-coffee',
    description: 'स्वादिष्ट कड़क चाय पत्ती, भरपूर रंग और स्फूर्तिदायक स्वाद।',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-cp-250', weight: '250 g', price: 85 },
      { id: 'v-cp-500', weight: '500 g', price: 165 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  },
  {
    id: 'p-parleg',
    nameHi: 'ग्लूकोज बिस्कुट (पारले-जी / मैरी)',
    nameEn: 'Parle-G / Tea Biscuits Pack',
    categoryId: 'biscuits-snacks',
    description: 'चाय के साथ सबका पसंदीदा बिस्कुट पैकेट।',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-pg-pack', weight: 'Family Pack', price: 35 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  },
  {
    id: 'p-washing-powder',
    nameHi: 'डिटर्जेंट पाउडर एवं कपड़े धोने का साबुन',
    nameEn: 'Detergent Powder & Laundry Soap',
    categoryId: 'household',
    description: 'सफेदी और चमक देने वाला कपड़े धोने का पाउडर।',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'v-wp-1k', weight: '1 kg', price: 75 }
    ],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  }
];

export const INITIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-1',
    titleHi: 'मासिक किराना राशन लिस्ट ऑर्डर',
    titleEn: 'Monthly Kirana List Pre-Order',
    description: 'अपनी पूरी महीने की राशन पर्ची WhatsApp पर फोटो या लिस्ट भेजकर तैयार करवाएं। स्टोर से तुरंत उठाएं।',
    tag: 'सुविधाजनक सेवा',
    active: true
  },
  {
    id: 'off-2',
    titleHi: 'ताजा चक्की आटा व शुद्ध मसाले',
    titleEn: 'Fresh Spices & Chakki Atta',
    description: 'दुर्गा मंदिर के पीछे, सब्जी मंडी बाजार में हमेशा ताजा स्टॉक उपलब्ध।',
    tag: 'दुकान की विशेषता',
    active: true
  }
];

export const INITIAL_BUNDLES: GroceryBundle[] = [
  {
    id: 'bundle-monthly-family',
    titleHi: 'मासिक परिवार राशन किट (1 Month Pack)',
    titleEn: 'Monthly Family Grocery Pack',
    badge: 'सबसे लोकप्रिय पैक',
    description: '4-5 सदस्यों के परिवार के लिए 1 महीने का आवश्यक राशन — आटा, चावल, दालें, तेल, चीनी, नमक और रोजमर्रा के मसाले।',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    totalPrice: 1690,
    items: [
      { name: 'चक्की ताजा गेहूं का आटा', weight: '10 kg', quantity: 1, estimatedPrice: 360 },
      { name: 'दैनिक चावल (उसना/कतरनी)', weight: '10 kg', quantity: 1, estimatedPrice: 400 },
      { name: 'अरहर दाल (तूर)', weight: '2 kg', quantity: 1, estimatedPrice: 285 },
      { name: 'चना दाल', weight: '1 kg', quantity: 1, estimatedPrice: 92 },
      { name: 'कच्ची घानी सरसों तेल', weight: '2 Ltr', quantity: 1, estimatedPrice: 310 },
      { name: 'सफेद चीनी', weight: '2 kg', quantity: 1, estimatedPrice: 92 },
      { name: 'टाटा / आयोडीन नमक', weight: '1 kg', quantity: 1, estimatedPrice: 26 },
      { name: 'धनिया + जीरा + हल्दी + मिर्च पैक', weight: '100g each', quantity: 1, estimatedPrice: 125 }
    ]
  },
  {
    id: 'bundle-puja',
    titleHi: 'सत्यनारायण पूजा / धार्मिक अनुष्ठान किट',
    titleEn: 'Satyanarayan Puja & Rituals Kit',
    badge: 'पूजा विशेष',
    description: 'पंजीरी भोग, धूप, अगरबत्ती, कलावा, शुद्ध घी, सूजी, चीनी, साबुत लौंग-इलायची और पूजा सामग्री का संपूर्ण पैक।',
    image: 'https://images.unsplash.com/photo-1609205809756-3b6088d22dfb?auto=format&fit=crop&w=600&q=80',
    totalPrice: 485,
    items: [
      { name: 'भोग के लिए बारीक सूजी / आटा', weight: '500 g', quantity: 1, estimatedPrice: 35 },
      { name: 'साफ दानेदार चीनी', weight: '1 kg', quantity: 1, estimatedPrice: 46 },
      { name: 'पूजा शुद्ध कपूर व अगरबत्ती पैकेट', weight: '1 Pack', quantity: 1, estimatedPrice: 40 },
      { name: 'साबुत लौंग, छोटी व बड़ी इलायची', weight: '50 g Pack', quantity: 1, estimatedPrice: 65 },
      { name: 'मौली (कलावा), रोली, सिन्दूर', weight: '1 Set', quantity: 1, estimatedPrice: 30 },
      { name: 'शुद्ध देसी घी (हवन/प्रसाद हेतु)', weight: '200 ml', quantity: 1, estimatedPrice: 175 },
      { name: 'पंचमेवा / मखाना पैकेट', weight: '100 g', quantity: 1, estimatedPrice: 94 }
    ]
  },
  {
    id: 'bundle-spices-box',
    titleHi: 'रसोई मसाला कॉम्बो किट (All Spices Pack)',
    titleEn: 'Kitchen Master Spice Combo',
    badge: 'शुद्ध देसी मसाले',
    description: 'रसोई के सभी आवश्यक 5 प्रमुख मसाले — धनिया, जीरा, हल्दी, लाल मिर्च और खड़ा गरम मसाला।',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    totalPrice: 380,
    items: [
      { name: 'धनिया पाउडर', weight: '250 g', quantity: 1, estimatedPrice: 65 },
      { name: 'जीरा साबुत', weight: '250 g', quantity: 1, estimatedPrice: 100 },
      { name: 'हल्दी पाउडर शुद्ध', weight: '250 g', quantity: 1, estimatedPrice: 70 },
      { name: 'तीखी लाल मिर्च पाउडर', weight: '250 g', quantity: 1, estimatedPrice: 80 },
      { name: 'साबुत गरम मसाला मिश्रण', weight: '50 g', quantity: 1, estimatedPrice: 65 }
    ]
  }
];

