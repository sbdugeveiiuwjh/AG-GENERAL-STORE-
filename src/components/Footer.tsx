import React, { useState } from 'react';
import { Phone, MessageCircle, Navigation, MapPin, X, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { storeSettings, categories, setSelectedCategory } = useStore();
  const { user, userProfile, setIsAuthModalOpen } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे किराना सामान के बारे में जानकारी चाहिए।`
  );

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 md:pb-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
            
            {/* Column 1: Store Branding & About */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-blue-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  AG
                </div>
                <div>
                  <div className="font-extrabold text-white text-base tracking-tight leading-none">
                    {storeSettings.storeName}
                  </div>
                  <div className="text-sm font-semibold text-emerald-400 font-devanagari mt-0.5">
                    किराना एवं राशन की दुकान
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 font-devanagari leading-relaxed">
                दुर्गा मंदिर के पीछे, सब्जी मंडी मार्केट, भटनी बाजार, बिशनपुर सुंदर (बिहार)। आपकी रोज़मर्रा की दाल, चावल, मसाले, चीनी और दैनिक किराना आवश्यकताओं का विश्वसनीय स्थानीय स्टोर।
              </p>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>दुकान का समय: रात {storeSettings.closingTime} तक</span>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                त्वरित नेविगेशन (Quick Links)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => scrollTo('home')}
                    className="hover:text-white transition-colors"
                  >
                    Home (मुख्य पृष्ठ)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('products')}
                    className="hover:text-white transition-colors"
                  >
                    All Products (सभी उत्पाद)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('offers')}
                    className="hover:text-white transition-colors"
                  >
                    Offers & Services (विशेष सेवाएं)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('about')}
                    className="hover:text-white transition-colors"
                  >
                    About Us (हमारे बारे में)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hover:text-emerald-400 text-slate-300 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>मेरी प्रोफ़ाइल {user ? `(${userProfile?.displayName?.split(' ')[0] || user.displayName?.split(' ')[0] || 'ग्राहक'})` : ''}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Direct Actions */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                संपर्क एवं स्थान (Contact)
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="font-devanagari">{storeSettings.address}</span>
                </li>
                <li>
                  <a
                    href={`tel:${storeSettings.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Phone: {storeSettings.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-400 text-transparent" />
                    <span>WhatsApp: +91 73669 42823</span>
                  </a>
                </li>
                <li>
                  <a
                    href={storeSettings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Google Maps Directions</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Store Policies & Hours */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                स्टोर नीतियां व सेवाएं
              </h4>
              <p className="text-xs text-slate-400 font-devanagari">
                ताज़ा एवं शुद्ध किराना सामान। दुकान पर सीधी खरीदारी व WhatsApp ऑर्डर सुविधा उपलब्ध।
              </p>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                <div>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    गोपनीयता नीति (Privacy Policy)
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    नियम एवं शर्तें (Terms & Conditions)
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setActiveModal('order-policy')}
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    ऑर्डर नीति (Order Policy)
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Footer Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div>© 2026 AG GENRAL STORE. All rights reserved.</div>
            <div className="font-devanagari">
              भटनी बाजार, बिशनपुर सुंदर, बिहार 852112 · शुद्धता एवं विश्वास का प्रतीक
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal Popups */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1769E0] font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <h3>गोपनीयता नीति (Privacy Policy)</h3>
                </div>
                <p className="text-xs text-slate-600 font-devanagari leading-relaxed">
                  AG GENRAL STORE आपकी व्यक्तिगत जानकारी का सम्मान करता है। वेबसाइट पर ऑर्डर फॉर्म में भरा गया नाम, मोबाइल नंबर और पता केवल WhatsApp संदेश तैयार करने के लिए उपयोग किया जाता है। हम आपका डाटा किसी तीसरे पक्ष को नहीं बेचते और न ही अनचाहे प्रचार संदेश भेजते हैं।
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1769E0] font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <h3>नियम एवं शर्तें (Terms and Conditions)</h3>
                </div>
                <p className="text-xs text-slate-600 font-devanagari leading-relaxed">
                  वेबसाइट पर प्रदर्शित कीमतें एवं स्टॉक बाजार की उपलब्धता के अनुसार बदल सकते हैं। वास्तविक राशि की पुष्टि दुकानदार द्वारा WhatsApp या फोन पर की जाएगी। उत्पाद की गुणवत्ता और तोल की गारंटी दुकान के नियमों के तहत है।
                </p>
              </div>
            )}

            {activeModal === 'order-policy' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1769E0] font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <h3>ऑर्डर नीति (Order Policy)</h3>
                </div>
                <p className="text-xs text-slate-600 font-devanagari leading-relaxed">
                  ऑर्डर WhatsApp के माध्यम से सीधे दुकान पर भेजा जाता है। स्टोर पिकअप पूरी तरह निःशुल्क है। लोकल डिलीवरी नजदीकी क्षेत्र में दुकानदार की उपलब्धता और न्यूनतम ऑर्डर पर निर्भर करती है। भुगतान सीधे दुकान पर नकद (Cash) अथवा UPI द्वारा किया जा सकता है।
                </p>
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                बंद करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
