import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Store, Truck, ShieldAlert, CheckCircle, ArrowLeft, Printer, QrCode, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { CheckoutFormData } from '../types/grocery';
import { generateWhatsAppOrderMessage, getWhatsAppUrl } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    storeSettings,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    setIsReceiptOpen,
    setIsUpiOpen,
    setLastOrderReceipt
  } = useStore();

  const { user, userProfile } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phoneNumber: '',
    orderType: 'pickup',
    address: '',
    landmark: '',
    notes: ''
  });

  useEffect(() => {
    if (user && isCheckoutOpen) {
      setFormData(prev => ({
        ...prev,
        customerName: prev.customerName || userProfile?.displayName || user.displayName || '',
        phoneNumber: prev.phoneNumber || userProfile?.phone || '',
        address: prev.address || userProfile?.address || ''
      }));
    }
  }, [user, userProfile, isCheckoutOpen]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'कृपया अपना नाम दर्ज करें (Please enter your name)';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'कृपया अपना मोबाइल नंबर दर्ज करें (Please enter mobile number)';
    } else if (formData.phoneNumber.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phoneNumber = '10 अंकों का मान्य मोबाइल नंबर दर्ज करें (Valid 10-digit number)';
    }

    if (formData.orderType === 'delivery') {
      if (!formData.address.trim()) {
        newErrors.address = 'होम डिलीवरी के लिए पूरा पता आवश्यक है (Address is required for delivery)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewOrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save order receipt for printing
      setLastOrderReceipt({
        orderNumber: `AG-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('hi-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        orderType: formData.orderType,
        address: formData.address,
        items: cart,
        subtotal: cartSubtotal
      });
      setShowPreview(true);
    }
  };

  const generatedMessage = generateWhatsAppOrderMessage(
    cart,
    cartSubtotal,
    formData,
    storeSettings
  );

  const finalWhatsAppUrl = getWhatsAppUrl(storeSettings.whatsappNumber, generatedMessage);

  const handleSendToWhatsApp = () => {
    window.open(finalWhatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
              title="वापस कार्ट पर जाएं"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                ऑर्डर एवं ग्राहक विवरण (Checkout)
              </h3>
              <p className="text-xs text-slate-500 font-devanagari">
                WhatsApp पर सीधा ऑर्डर भेजें · कोई ऑनलाइन कार्ड भुगतान नहीं
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Order Summary Box */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800 text-sm">
                ऑर्डर सारांश ({cart.length} वस्तुएं)
              </span>
              <span className="font-extrabold text-[#1769E0] text-base">
                ₹{cartSubtotal}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1 max-h-24 overflow-y-auto font-devanagari pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate">
                    {item.nameHi} ({item.weight}) x {item.quantity}
                  </span>
                  <span className="font-semibold text-slate-700 shrink-0 ml-2">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* If Preview Mode: Show exact message review */}
          {showPreview ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp संदेश की समीक्षा (Message Preview)</span>
                </div>
                <p className="text-xs text-slate-600 font-devanagari">
                  नीचे दिया गया संदेश दुकान के आधिकारिक नंबर <b>{storeSettings.phone}</b> पर भेजा जाएगा:
                </p>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-800 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto shadow-2xs">
                  {generatedMessage}
                </div>
              </div>

              {/* Strict Notice regarding order confirmation and payment */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="font-devanagari">
                  <b>महत्वपूर्ण सूचना:</b> संदेश भेजने के बाद दुकानदार स्टॉक और अंतिम बिल की पुष्टि करेंगे। दुकान पर नकद (Cash on Pickup) या UPI द्वारा भुगतान किया जा सकता है।
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  विवरण बदलें (Edit)
                </button>
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-[#16A34A] hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                  <span>WhatsApp पर भेजें (Send to +91 73669 42823)</span>
                </button>
              </div>

              {/* Quick Bill Receipt and UPI Pay shortcuts */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsReceiptOpen(true)}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#1769E0]" />
                  <span>बिल पर्ची (गैलरी में सेव)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpiOpen(true)}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-[#1769E0] flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>दुकानदार QR देखें</span>
                </button>
              </div>
            </div>
          ) : (
            /* Form Mode */
            <form onSubmit={handlePreviewOrSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  आपका नाम (Full Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="उदा: राहुल कुमार / अंजली शर्मा"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
                {errors.customerName && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.customerName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  मोबाइल नंबर (Mobile Number) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="उदा: 9876543210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Order Preference: Pickup vs Local Delivery */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ऑर्डर का प्रकार चुनें (Order Type) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.orderType === 'pickup'
                        ? 'border-[#1769E0] bg-blue-50/70 text-[#1769E0]'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      checked={formData.orderType === 'pickup'}
                      onChange={() => setFormData({ ...formData, orderType: 'pickup' })}
                      className="text-[#1769E0]"
                    />
                    <div>
                      <div className="flex items-center gap-1 font-bold text-sm">
                        <Store className="w-4 h-4" />
                        <span>स्टोर पिकअप</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        दुकान से आकर लेंगे (Free)
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.orderType === 'delivery'
                        ? 'border-[#1769E0] bg-blue-50/70 text-[#1769E0]'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      checked={formData.orderType === 'delivery'}
                      onChange={() => setFormData({ ...formData, orderType: 'delivery' })}
                      className="text-[#1769E0]"
                    />
                    <div>
                      <div className="flex items-center gap-1 font-bold text-sm">
                        <Truck className="w-4 h-4" />
                        <span>लोकल डिलीवरी</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        दुकानदार से पुष्टि अनुसार
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Address Fields if Delivery */}
              {formData.orderType === 'delivery' && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      डिलीवरी का पता (Delivery Address) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="मोहल्ला, गली नंबर, घर का पता..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      लैंडमार्क / पहचान (Landmark)
                    </label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                      placeholder="उदा: दुर्गा मंदिर के पास / मुख्य सड़क के पास"
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  अतिरिक्त निर्देश / टिप्पणी (Optional Notes)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="उदा: 10 बजे तक तैयार रखें / दाल अच्छी क्वालिटी की हो"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
              </div>

              {/* Information pill */}
              <div className="text-[11px] text-slate-500 font-devanagari bg-slate-100 p-2.5 rounded-lg">
                ℹ️ यह फॉर्म जमा करने पर आपके WhatsApp पर पूरा ऑर्डर अपने-आप तैयार हो जाएगा। आप उसे देखकर भेज सकेंगे।
              </div>

              {/* Action */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#16A34A] hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>आगे बढ़ें (Preview & Send to WhatsApp)</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
