export interface ProductVariant {
  id: string;
  weight: string; // e.g. "100 g", "250 g", "500 g", "1 kg", "5 kg"
  price: number; // in INR
}

export interface Product {
  id: string;
  nameHi: string;
  nameEn: string;
  categoryId: string;
  description?: string;
  image: string;
  variants: ProductVariant[];
  defaultVariantIndex: number;
  inStock: boolean;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  nameHi: string;
  nameEn: string;
  image: string;
  description?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  nameHi: string;
  nameEn: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface StoreSettings {
  storeName: string;
  storeNameHi: string;
  phone: string;
  whatsappNumber: string; // e.g. "917366942823"
  address: string;
  landmark: string;
  plusCode: string;
  closingTime: string;
  googleMapsUrl: string;
  deliveryAvailable: boolean;
  deliveryCharge: number;
  minOrderForDelivery: number;
  upiId: string;
  upiQrCodeImage?: string;
  announcement: string;
  announcementActive: boolean;
}

export interface BundleItem {
  name: string;
  weight: string;
  quantity: number;
  estimatedPrice: number;
}

export interface GroceryBundle {
  id: string;
  titleHi: string;
  titleEn: string;
  badge: string;
  description: string;
  items: BundleItem[];
  totalPrice: number;
  image: string;
}

export interface SpecialOffer {
  id: string;
  titleHi: string;
  titleEn: string;
  description: string;
  tag: string;
  active: boolean;
}

export interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
  orderType: 'pickup' | 'delivery';
  address: string;
  landmark: string;
  notes: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

