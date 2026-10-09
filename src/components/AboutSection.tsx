import React from 'react';
import { Store, MapPin, Phone, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { storeSettings } = useStore();

  return (
    <section id="about" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Image with Storefront feel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                alt="AG General Store neighborhood grocery shelves"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="font-extrabold text-lg">AG GENRAL STORE</div>
                <div className="text-sm font-devanagari text-slate-200">
                  AG General Store · भटनी बाजार
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Authentic Information */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-bold text-[#1769E0] tracking-wider uppercase mb-1">
                परिचय एवं स्थान · About Our Store
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                About AG GENRAL STORE
              </h2>
              <div className="text-lg font-bold text-emerald-700 font-devanagari mt-0.5">
                AG General Store (Bhatni Bazar, Bihar)
              </div>
            </div>

            {/* Exact required description from prompt */}
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-devanagari bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              AG GENRAL STORE is a local grocery store located behind Durga Mandir, near Sabji Mandi Market, Bhatni Bazar, Bishan Pur Sundar, Bihar. We aim to make everyday grocery shopping convenient for our local customers.
            </p>

            {/* Feature Highlights without exaggerations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50">
                <Store className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">दैनिक आवश्यक किराना</h4>
                  <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                    साबुत व पिसे मसाले, दालें, चावल, आटा, चीनी, तेल एवं घरेलू सामान।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">सुगम स्थान</h4>
                  <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                    दुर्गा मंदिर के पीछे, सब्जी मंडी बाजार, बिशनपुर सुंदर (पिन: 852112)।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">शुद्ध तोल एवं उचित भाव</h4>
                  <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                    स्थानीय ग्राहकों का भरोसा, साफ-सुथरा राशन और पारदर्शी व्यवहार।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50">
                <HeartHandshake className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">आसान WhatsApp संपर्क</h4>
                  <p className="text-xs text-slate-500 font-devanagari mt-0.5">
                    घर बैठे पर्ची भेजें और तैयार सामान सीधे दुकान से प्राप्त करें।
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact reminder */}
            <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>सीधा संपर्क सूत्र: <b>{storeSettings.phone}</b></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
