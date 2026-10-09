import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    setIsReceiptOpen,
    setIsUpiOpen,
    storeSettings
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Full screen modal container - responsive full screen on mobile & desktop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 lg:p-6">
        <div className="w-full h-full md:max-w-4xl md:h-[92vh] md:max-h-[850px] md:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 animate-in zoom-in-95 duration-200">
          
          {/* Top Bar / Header */}
          <div className="p-3.5 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 via-white to-blue-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors md:hidden"
                aria-label="पीछे जाएं"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-[#1769E0] text-white flex items-center justify-center shadow-xs shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    आपकी किराना टोकरी (Cart)
                  </h3>
                  <span className="bg-[#1769E0] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {cartCount} आइटम
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-devanagari">
                  {storeSettings.storeName} · भटनी बाजार
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="hidden sm:flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>पूरी कार्ट खाली करें</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/80 transition-colors"
                aria-label="Close cart"
                title="बंद करें (Close)"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items List or Empty state */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-slate-50/50">
            {cart.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-blue-50 text-[#1769E0] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xl">
                    आपकी कार्ट खाली है (Cart is Empty)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-devanagari mt-1 max-w-sm mx-auto">
                    अपनी रोज़मर्रा की ज़रूरत का किराना सामान, मसाले, दालें या तेल सूची से चुनें और कार्ट में जोड़ें।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <span>खरीदारी शुरू करें (Continue Shopping)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs text-slate-600 font-medium">
                  <span>जोड़े गए सामान की सूची ({cart.length} प्रकार के उत्पाद)</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="sm:hidden text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>खाली करें</span>
                  </button>
                </div>

                {cart.map(item => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="p-3 sm:p-4 rounded-xl border border-slate-200/90 bg-white flex items-center gap-3 sm:gap-4 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.nameHi}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base font-devanagari truncate">
                          {item.nameHi}
                        </h4>
                        <div className="text-xs text-slate-500 font-medium truncate">
                          {item.nameEn}
                        </div>
                        <div className="flex items-center gap-2 mt-1 sm:mt-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {item.weight}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            ₹{item.price} प्रति पैक
                          </span>
                        </div>
                      </div>

                      {/* Controls and Total */}
                      <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-1">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                          title="कार्ट से हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="text-right mt-1">
                          <div className="text-sm sm:text-base font-extrabold text-[#1769E0]">
                            ₹{lineTotal}
                          </div>
                          
                          <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 mt-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                              className="p-1 sm:p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 sm:px-3 text-xs sm:text-sm font-bold text-slate-900 min-w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                              className="p-1 sm:p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Helpful Note */}
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    दुकान से ताज़ा एवं सील पैक सामान पैक किया जाता है। वजन और तोल की 100% गारंटी।
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer / Subtotal / Checkout */}
          {cart.length > 0 && (
            <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-white shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="text-slate-600">
                    <span>कुल सामग्री: </span>
                    <b className="text-slate-900">{cartCount} पैकेट</b>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-600">कुल योग: </span>
                    <span className="text-xl sm:text-2xl font-black text-[#1769E0]">₹{cartSubtotal}</span>
                  </div>
                </div>

                {/* Main WhatsApp Checkout Button */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-5 rounded-xl font-extrabold text-sm sm:text-base bg-[#16A34A] hover:bg-emerald-700 text-white flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                  <span>WhatsApp ऑर्डर विवरण भरें (Proceed to Checkout)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReceiptOpen(true)}
                    className="py-2.5 text-center text-xs font-semibold bg-slate-100 border border-slate-300 rounded-xl text-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    📄 बिल पर्ची (गैलरी में सेव)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpiOpen(true)}
                    className="py-2.5 text-center text-xs font-semibold bg-blue-50 border border-blue-200 rounded-xl text-[#1769E0] hover:bg-blue-100 transition-colors"
                  >
                    💳 UPI QR देखें
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="col-span-2 sm:col-span-1 py-2.5 text-center text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    ➕ और सामान जोड़ें
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
