import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, MessageCircle, Heart } from 'lucide-react';
import { Product } from '../types/grocery';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setIsCartOpen, storeSettings, toggleWishlist, isWishlisted } = useStore();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[product.defaultVariantIndex]?.id || product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFav = isWishlisted(product.id);

  const currentVariant =
    product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAddToCart = () => {
    if (!product.inStock || !currentVariant) return;
    addToCart(product, currentVariant.id, quantity);
    setIsCartOpen(true);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  // Quick single-item WhatsApp inquiry
  const directWhatsAppLink = currentVariant
    ? getWhatsAppUrl(
        storeSettings.whatsappNumber,
        `Namaste ${storeSettings.storeName}! मुझे यह सामान चाहिए:\n${product.nameHi} (${product.nameEn})\nवजन / पैक: ${currentVariant.weight}\nसंख्या: ${quantity}\nकीमत: ₹${currentVariant.price * quantity}\nकृपया उपलब्धता बताएं।`
      )
    : '#';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Product Image & Stock Badge & Favorite button */}
        <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
          <img
            src={product.image}
            alt={`${product.nameHi} - ${product.nameEn}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Stock Tag */}
          <div className="absolute top-2.5 left-2.5">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 bg-emerald-600/95 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
                उपलब्ध (In Stock)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-rose-600/95 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
                स्टॉक समाप्त (Out of Stock)
              </span>
            )}
          </div>

          {/* Favorite Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-2xs transition-colors"
            title={isFav ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें'}
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Titles */}
          <div>
            <h3 className="font-bold text-slate-900 text-base font-devanagari leading-snug group-hover:text-[#1769E0] transition-colors">
              {product.nameHi}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
              {product.nameEn}
            </p>
          </div>

          {/* Variants / Weights Selector */}
          {product.variants.length > 0 && (
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                वज़न / साइज़ चुनें (Select Weight):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                      selectedVariantId === variant.id
                        ? 'bg-[#1769E0] text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Display */}
          <div className="pt-1 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">कीमत: </span>
              <span className="text-xl font-extrabold text-slate-900">
                ₹{currentVariant ? currentVariant.price : 0}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                / {currentVariant ? currentVariant.weight : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 space-y-2">
        {/* Quantity Selector + Add to Cart */}
        <div className="flex items-center gap-2">
          {/* Stepper */}
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={!product.inStock}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-bold text-slate-800 min-w-6 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              disabled={!product.inStock}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              !product.inStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1769E0] hover:bg-blue-700 text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>जोड़ा गया (Added)</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>कार्ट में जोड़ें</span>
              </>
            )}
          </button>
        </div>

        {/* Quick single-item WhatsApp Order */}
        {product.inStock && (
          <a
            href={directWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-1.5 px-2 rounded-lg text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 flex items-center justify-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-transparent" />
            <span>WhatsApp पर यह आइटम ऑर्डर करें</span>
          </a>
        )}
      </div>
    </div>
  );
};
