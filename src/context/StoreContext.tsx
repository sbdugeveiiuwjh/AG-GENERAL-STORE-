import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, StoreSettings, SpecialOffer, GroceryBundle } from '../types/grocery';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_STORE_SETTINGS, INITIAL_OFFERS, INITIAL_BUNDLES } from '../data/initialData';

export interface OrderReceipt {
  orderNumber: string;
  date: string;
  customerName: string;
  phoneNumber: string;
  orderType: 'pickup' | 'delivery';
  address?: string;
  items: CartItem[];
  subtotal: number;
  paymentStatus?: 'PAID_ONLINE' | 'PENDING' | 'CASH_ON_PICKUP';
  paymentMethod?: string;
  transactionRef?: string;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  storeSettings: StoreSettings;
  offers: SpecialOffer[];
  bundles: GroceryBundle[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'name-asc') => void;
  onlyInStock: boolean;
  setOnlyInStock: (val: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Cart operations
  addToCart: (product: Product, variantId: string, quantity?: number) => void;
  addBundleToCart: (bundle: GroceryBundle) => void;
  updateQuantity: (productId: string, variantId: string, delta: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;

  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isParchiOpen: boolean;
  setIsParchiOpen: (open: boolean) => void;
  isUpiOpen: boolean;
  setIsUpiOpen: (open: boolean) => void;
  isReceiptOpen: boolean;
  setIsReceiptOpen: (open: boolean) => void;

  // Receipts
  lastOrderReceipt: OrderReceipt | null;
  setLastOrderReceipt: (receipt: OrderReceipt | null) => void;

  // Store timing
  isStoreCurrentlyOpen: () => boolean;

  // Admin / Storekeeper operations
  updateProduct: (updated: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (settings: StoreSettings) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'ag_store_products_v2',
  SETTINGS: 'ag_store_settings_v2',
  CART: 'ag_store_cart_v2',
  OFFERS: 'ag_store_offers_v2',
  WISHLIST: 'ag_store_wishlist_v2'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const sugar = parsed.find(p => p.id === 'p-sugar');
        if (sugar && !sugar.variants.some(v => v.weight.includes('500'))) {
          sugar.variants = [
            { id: 'v-sg-1k', weight: '1 kg', price: 46 },
            { id: 'v-sg-500g', weight: '500 g', price: 24 },
            { id: 'v-sg-250g', weight: '250 g', price: 12 },
            { id: 'v-sg-5k', weight: '5 kg', price: 225 }
          ];
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [bundles] = useState<GroceryBundle[]>(INITIAL_BUNDLES);

  // Settings state with localStorage
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.address && parsed.address.includes('852214')) {
          parsed.address = parsed.address.replace('852214', '852112');
        }
        if (parsed.googleMapsUrl && parsed.googleMapsUrl.includes('852214')) {
          parsed.googleMapsUrl = parsed.googleMapsUrl.replace('852214', '852112');
        }
        if (parsed.storeNameHi && (parsed.storeNameHi.includes('आग') || parsed.storeNameHi === 'आग जनरल स्टोर')) {
          parsed.storeNameHi = 'AG General Store';
        }
        return { ...INITIAL_STORE_SETTINGS, ...parsed };
      }
    } catch {
      // fallback
    }
    return INITIAL_STORE_SETTINGS;
  });

  // Offers state
  const [offers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_OFFERS;
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isParchiOpen, setIsParchiOpen] = useState(false);
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrderReceipt, setLastOrderReceipt] = useState<OrderReceipt | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [wishlist]);

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, variantId: string, quantity = 1) => {
    const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
    if (!variant) return;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          nameHi: product.nameHi,
          nameEn: product.nameEn,
          weight: variant.weight,
          price: variant.price,
          quantity,
          image: product.image
        }
      ];
    });
  };

  // Add an entire pre-configured bundle into the cart
  const addBundleToCart = (bundle: GroceryBundle) => {
    const newItems: CartItem[] = bundle.items.map((item, idx) => ({
      productId: `${bundle.id}-${idx}`,
      variantId: `var-${idx}`,
      nameHi: item.name,
      nameEn: `(from ${bundle.titleEn})`,
      weight: item.weight,
      price: item.estimatedPrice,
      quantity: item.quantity,
      image: bundle.image
    }));

    setCart(prev => [...prev, ...newItems]);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.productId === productId && item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.variantId === variantId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Check store timing (7:00 AM - 9:30 PM Indian Standard Time)
  const isStoreCurrentlyOpen = () => {
    const now = new Date();
    // Convert to Indian Time (UTC + 5:30)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + 3600000 * 5.5);
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentDecimal = hours + minutes / 60;
    // 7:00 AM to 9:30 PM (21.5)
    return currentDecimal >= 7.0 && currentDecimal <= 21.5;
  };

  // Admin methods
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = 'p-custom-' + Date.now();
    setProducts(prev => [
      {
        ...newProd,
        id
      },
      ...prev
    ]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateSettings = (settings: StoreSettings) => {
    setStoreSettings(settings);
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setStoreSettings(INITIAL_STORE_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        storeSettings,
        offers,
        bundles,
        cart,
        cartCount,
        cartSubtotal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        onlyInStock,
        setOnlyInStock,
        wishlist,
        toggleWishlist,
        isWishlisted,
        addToCart,
        addBundleToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        isParchiOpen,
        setIsParchiOpen,
        isUpiOpen,
        setIsUpiOpen,
        isReceiptOpen,
        setIsReceiptOpen,
        lastOrderReceipt,
        setLastOrderReceipt,
        isStoreCurrentlyOpen,
        updateProduct,
        addProduct,
        deleteProduct,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
