import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Store,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const GoogleLoginScreen: React.FC = () => {
  const { signInWithGoogle, authError, setAuthError } = useAuth();
  const { storeSettings } = useStore();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const whatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे वेबसाइट में लॉगिन करने में सहायता चाहिए।`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6 shadow-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#1769E0] to-blue-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
              AG
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none">
                {storeSettings.storeName}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-emerald-700 font-devanagari mt-0.5">
                किराना एवं राशन स्टोर
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>भटनी बाजार, बिशनपुर सुंदर</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <Clock className="w-3.5 h-3.5" />
              <span>रात {storeSettings.closingTime} तक</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-500/5 p-6 sm:p-8 text-center relative overflow-hidden">
            {/* Top Decorative Banner */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500" />

            {/* Lock / Security Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#1769E0] text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-[#1769E0]" />
              <span>सुरक्षित किराना स्टोर पोर्टल</span>
            </div>

            {/* Store Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Store className="w-8 h-8" />
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
              दुकान में प्रवेश के लिए <br />
              <span className="text-[#1769E0]">Google से लॉगिन करें</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              किराना सामान देखने, पर्ची भेजने और ऑर्डर करने के लिए कृपया अपनी ईमेल आईडी चुनें।
            </p>

            {/* Error Banner */}
            {authError && (
              <div className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm text-left flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold">{authError}</div>
                  <button
                    onClick={handleGoogleLogin}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>पुनः प्रयास करें</span>
                  </button>
                </div>
              </div>
            )}

            {/* PRIMARY GOOGLE LOGIN BUTTON */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border-2 border-slate-300 hover:border-blue-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 font-bold text-base group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {/* Official Google 'G' icon */}
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>

                <div className="text-left flex-1">
                  <div className="text-slate-900 group-hover:text-blue-600 font-extrabold text-[15px] sm:text-base leading-tight">
                    {loading ? 'Google खाता खुल रहा है...' : 'Google से लॉगिन करें'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    टैप करें और अपनी ईमेल आईडी चुनें
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Instruction Explainer Box */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>यह कैसे काम करता है?</span>
              </div>
              <ol className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>ऊपर दिए गए <strong>"Google से लॉगिन करें"</strong> बटन पर टैप करें।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>आपके फोन में जितनी भी <strong>ईमेल आईडी (Gmail)</strong> होंगी, सब सामने आ जाएंगी।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>बस अपनी ईमेल आईडी पर <strong>1-क्लिक</strong> करें और आप तुरंत वेबसाइट में प्रवेश कर जाएंगे!</span>
                </li>
              </ol>
            </div>

            {/* Trust Points */}
            <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-around text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>कोई पासवर्ड नहीं</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-blue-700">
                <ShieldCheck className="w-4 h-4" />
                <span>100% सुरक्षित</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-indigo-700">
                <Lock className="w-4 h-4" />
                <span>सत्यापित ग्राहक</span>
              </div>
            </div>
          </div>

          {/* Need help footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 mb-2.5">
              लॉगिन करने में कोई परेशानी है? दुकानदार से सीधे संपर्क करें:
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`tel:${storeSettings.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>कॉल: {storeSettings.phone}</span>
              </a>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp सहायता</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} {storeSettings.storeName} · भटनी बाजार, बिशनपुर सुंदर
      </footer>
    </div>
  );
};
