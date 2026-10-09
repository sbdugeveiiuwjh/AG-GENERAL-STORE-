import React from 'react';
import { Star, MessageSquarePlus, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { storeSettings } = useStore();

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        <div>
          <div className="text-xs font-bold text-[#1769E0] tracking-wider uppercase mb-1">
            ग्राहकों की राय · Verified Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-devanagari mt-1">
            स्थानीय ग्राहकों का सच्चा अनुभव एवं प्रामाणिक रेटिंग
          </p>
        </div>

        {/* Rating Score Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div>
            <div className="text-4xl font-extrabold text-slate-900">5.0 / 5.0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Google Maps Listed Rating · 1 Verified Review
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-600 font-devanagari leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              हम किसी भी तरह की बनावटी समीक्षाएं (Fake Testimonials) प्रदर्शित नहीं करते हैं।
            </span>
          </div>

          <div className="pt-2">
            <a
              href={storeSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#1769E0] hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Google पर अपनी ईमानदार समीक्षा दें (Leave a Review)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
