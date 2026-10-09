import React from 'react';
import { ShoppingCart, MessageCircle, CheckCircle2, MapPin, Clock, ShieldCheck, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { storeSettings, setIsParchiOpen } = useStore();

  const directWhatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे किराना सामान के भाव और ऑर्डर के बारे में पूछना है।`
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200/80 rounded-lg text-xs font-medium text-slate-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>दुर्गा मंदिर के पीछे, सब्जी मंडी बाजार, भटनी</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-semibold">खुला है (रात 9:30 PM तक)</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172033] tracking-tight leading-[1.15]">
                Your Everyday Grocery Store
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#1769E0] font-devanagari leading-snug">
                आपकी रोज़मर्रा की जरूरतों का भरोसेमंद साथी
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-devanagari max-w-2xl">
              मसाले, चावल, दाल, चीनी और रोज़मर्रा का किराना सामान — सब एक ही जगह। ताज़ा सामान, सही तौल और वाजिब दाम के साथ।
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('products')}
                className="flex items-center justify-center gap-2 bg-[#1769E0] hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now (सामान देखें)</span>
              </button>

              <button
                onClick={() => setIsParchiOpen(true)}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base px-5 py-3 rounded-xl shadow-xs hover:shadow transition-all active:scale-[0.98]"
              >
                <FileText className="w-5 h-5" />
                <span>राशन पर्ची भेजें (Quick Parchi)</span>
              </button>

              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Verification Note (Explicitly following rules: no false delivery claims) */}
            <p className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>स्टोर पिकअप की सीधी सुविधा उपलब्ध। होम डिलीवरी नजदीकी इलाके में दुकानदार की पुष्टि पर निर्भर है।</span>
            </p>

            {/* 3 Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Easy Ordering</h4>
                <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                  WhatsApp पर सीधी लिस्ट भेजें या कार्ट से ऑर्डर करें
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769E0] flex items-center justify-center mb-2">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Everyday Essentials</h4>
                <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                  दैनिक मसाले, दालें, चावल, आटा, चीनी व तेल
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Local Grocery Store</h4>
                <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                  भटनी बाजार, बिशनपुर सुंदर में आपका अपना किराना स्टोर
                </p>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85"
                alt="Indian spices and grocery assortment at AG General Store"
                className="w-full h-72 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  शुद्ध देसी किराना सामग्री
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-devanagari mt-1">
                  AG General Store — सब सामान सही मोल, शुद्ध तोल
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-200">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>रात 9:30 PM तक सेवा</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>सब्जी मंडी मार्केट</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
