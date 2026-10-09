import React from 'react';
import { Phone, MessageCircle, Navigation, MapPin, Clock, Compass, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const { storeSettings } = useStore();

  const whatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे दुकान का पता और सामान के बारे में पूछना है।`
  );

  return (
    <section id="contact" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-bold text-[#1769E0] tracking-wider uppercase">
            संपर्क एवं दुकान का पता · Contact Us
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with AG GENRAL STORE
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-devanagari">
            सामान का ऑर्डर देने, भाव पूछने या दुकान पर आने के लिए नीचे दिए गए माध्यमों से संपर्क करें
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1769E0] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-500 uppercase">
                  फोन नंबर (Phone)
                </div>
                <a
                  href={`tel:${storeSettings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-[#1769E0] transition-colors block mt-0.5"
                >
                  {storeSettings.phone}
                </a>
                <p className="text-xs text-slate-500 font-devanagari mt-1">
                  दुकान के समय में कभी भी कॉल कर सकते हैं
                </p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`tel:${storeSettings.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 bg-[#1769E0] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-500 uppercase">
                  दुकान का पूरा पता (Store Address)
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 font-devanagari">
                  {storeSettings.address}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono font-semibold">Plus Code: {storeSettings.plusCode}</span>
                </div>
                <div className="mt-3">
                  <a
                    href={storeSettings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">दुकान बंद होने का समय</div>
                <div className="text-sm font-bold text-slate-900 font-devanagari">
                  प्रतिदिन रात {storeSettings.closingTime} बजे तक खुली रहती है
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Location Card */}
          <div className="lg:col-span-6 bg-slate-100 rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="font-extrabold text-slate-900 text-base">
                  Google Maps Location
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Bhatni Bazar, Bihar</span>
            </div>

            {/* Interactive Location Visual / Map Link Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-white shadow-xs aspect-16/10 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3 ring-8 ring-red-50">
                <MapPin className="w-7 h-7" />
              </div>

              <h4 className="font-extrabold text-slate-900 text-base">
                AG GENRAL STORE
              </h4>
              <p className="text-xs text-slate-600 max-w-sm font-devanagari mt-1">
                दुर्गा मंदिर के पीछे, सब्जी मंडी मार्केट, भटनी बाजार, बिशनपुर सुंदर, बिहार 852112
              </p>
              <div className="text-xs font-mono text-slate-500 mt-2 bg-slate-100 px-2.5 py-1 rounded">
                2XV4+X4 Bishan Pur Sundar, Bihar
              </div>

              <a
                href={storeSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps पर रास्ता देखें (Navigate Now)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            <p className="text-[11px] text-slate-500 text-center font-devanagari">
              * दुकान का स्थान सत्यापित पते और Plus Code के आधार पर Google Maps पर खोजा जा सकता है।
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
