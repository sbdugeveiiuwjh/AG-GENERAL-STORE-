import React from 'react';
import { Tag, Calendar, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const SpecialOffers: React.FC = () => {
  const { offers, storeSettings } = useStore();

  const activeOffers = offers.filter(o => o.active);

  if (activeOffers.length === 0) {
    return null; // Hide if no active real offers entered
  }

  const sendListUrl = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मैं अपनी मासिक किराना लिस्ट (Monthly Grocery List) WhatsApp पर भेजना चाहता/चाहती हूँ।`
  );

  return (
    <section id="offers" className="py-12 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769E0] uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>दुकान की सुविधाएं एवं सेवाएं</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Special Store Services & Grocery Deals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-devanagari">
            ग्राहकों की सुविधा के लिए वास्तविक स्टोर सेवाएं — कोई बनावटी छूट या फर्जी टाइमर नहीं
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {activeOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-blue-50 text-[#1769E0] text-xs font-bold rounded-md">
                  {offer.tag}
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-devanagari">
                  {offer.titleHi}
                </h3>
                <h4 className="text-sm font-semibold text-slate-500">
                  {offer.titleEn}
                </h4>
                <p className="text-sm text-slate-600 font-devanagari leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>दुकान पर लागू</span>
                </span>
                <a
                  href={sendListUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#16A34A] hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
                  <span>लिस्ट भेजें</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Bulk / Event Orders */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-devanagari">
                शादी-विवाह, भोज एवं त्योहारों के लिए थोक किराना
              </h4>
              <p className="text-xs text-slate-500 font-devanagari">
                बड़ी मात्रा में दाल, चावल, तेल, चीनी और मसालों के लिए सीधे दुकान पर संपर्क करें
              </p>
            </div>
          </div>
          <a
            href={sendListUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-[#1769E0] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>थोक पूछताछ करें</span>
          </a>
        </div>

      </div>
    </section>
  );
};
