import React, { useState } from 'react';
import { Package, ShoppingBag, Check, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GroceryBundle } from '../types/grocery';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const GroceryBundles: React.FC = () => {
  const { bundles, addBundleToCart, storeSettings } = useStore();
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);
  const [addedMap, setAddedMap] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (bundle: GroceryBundle) => {
    addBundleToCart(bundle);
    setAddedMap(prev => ({ ...prev, [bundle.id]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [bundle.id]: false }));
    }, 1500);
  };

  const toggleExpand = (id: string) => {
    setExpandedBundleId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769E0] uppercase tracking-wider mb-1">
              <Package className="w-3.5 h-3.5" />
              <span>राशन कॉम्बो किट · Grocery Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              मासिक एवं धार्मिक अनुष्ठान राशन किट
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-devanagari mt-1">
              एक क्लिक में पूरे महीने का राशन या पूजा सामग्री ऑर्डर करें — सही अनुपात, सही तोल
            </p>
          </div>
        </div>

        {/* Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map(bundle => {
            const isExpanded = expandedBundleId === bundle.id;
            const isAdded = addedMap[bundle.id];

            const directWhatsApp = getWhatsAppUrl(
              storeSettings.whatsappNumber,
              `Namaste ${storeSettings.storeName}! मुझे यह कॉम्बो पैक चाहिए:\n📦 ${bundle.titleHi} (${bundle.titleEn})\nअनुमानित कीमत: ₹${bundle.totalPrice}\nकृपया उपलब्धता की पुष्टि करें।`
            );

            return (
              <div
                key={bundle.id}
                className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                    <img
                      src={bundle.image}
                      alt={bundle.titleHi}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      {bundle.badge}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="font-bold text-slate-900 text-base font-devanagari leading-snug">
                      {bundle.titleHi}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">
                      {bundle.titleEn}
                    </div>

                    <p className="text-xs text-slate-600 font-devanagari leading-relaxed">
                      {bundle.description}
                    </p>

                    {/* Price and Item Count */}
                    <div className="pt-2 flex items-baseline justify-between border-t border-slate-200/80">
                      <div>
                        <span className="text-xs text-slate-400">अनुमानित पैकेज मूल्य: </span>
                        <div className="text-xl font-extrabold text-[#1769E0]">
                          ₹{bundle.totalPrice}
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                        {bundle.items.length} आवश्यक वस्तुएं
                      </span>
                    </div>

                    {/* Accordion Toggle for Itemized list */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(bundle.id)}
                      className="w-full text-left pt-2 text-xs font-semibold text-slate-600 hover:text-[#1769E0] flex items-center justify-between"
                    >
                      <span>किट में शामिल सामान देखें</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Expandable item list */}
                    {isExpanded && (
                      <div className="mt-2 bg-white rounded-xl p-3 border border-slate-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                        {bundle.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-700">
                            <span className="font-devanagari">
                              • {it.name} ({it.weight})
                            </span>
                            <span className="font-semibold text-slate-900 shrink-0">
                              ₹{it.estimatedPrice}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(bundle)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1769E0] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>किट कार्ट में जोड़ी गई!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>पूरी किट कार्ट में जोड़ें</span>
                      </>
                    )}
                  </button>

                  <a
                    href={directWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-1.5 px-3 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-transparent" />
                    <span>WhatsApp पर यह किट मंगवाएं</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
