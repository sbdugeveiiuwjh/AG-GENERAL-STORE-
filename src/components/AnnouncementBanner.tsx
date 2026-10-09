import React from 'react';
import { Volume2, Clock, FileText, QrCode } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBanner: React.FC = () => {
  const {
    storeSettings,
    isStoreCurrentlyOpen,
    setIsParchiOpen,
    setIsUpiOpen
  } = useStore();

  const isOpen = isStoreCurrentlyOpen();

  return (
    <div className="bg-gradient-to-r from-blue-900 via-[#1769E0] to-blue-800 text-white py-2 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        
        {/* Left: Announcement / Notice */}
        <div className="flex items-center gap-2 overflow-hidden text-center sm:text-left">
          <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          </span>
          <span className="font-devanagari font-medium text-blue-50 truncate">
            {storeSettings.announcementActive && storeSettings.announcement
              ? storeSettings.announcement
              : 'दुकान प्रतिदिन सुबह 7:00 बजे से रात 9:30 बजे तक खुली रहती है।'}
          </span>
        </div>

        {/* Right: Live Open Status + Quick Action Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            isOpen ? 'bg-emerald-500/90 text-white' : 'bg-amber-400 text-slate-900'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-white animate-ping' : 'bg-slate-900'}`}></span>
            <span>{isOpen ? 'अभी खुला है (Open Now)' : 'रात 9:30 PM के बाद बंद'}</span>
          </span>

          {/* Quick Parchi Button */}
          <button
            onClick={() => setIsParchiOpen(true)}
            className="hidden md:inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-2.5 py-0.5 rounded-md font-semibold transition-colors"
          >
            <FileText className="w-3 h-3 text-amber-300" />
            <span>राशन पर्ची भेजें</span>
          </button>

          {/* UPI QR shortcut */}
          <button
            onClick={() => setIsUpiOpen(true)}
            className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-2.5 py-0.5 rounded-md font-semibold transition-colors"
          >
            <QrCode className="w-3 h-3 text-emerald-300" />
            <span>UPI QR</span>
          </button>
        </div>

      </div>
    </div>
  );
};
