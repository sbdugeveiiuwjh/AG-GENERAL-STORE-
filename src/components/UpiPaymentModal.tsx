import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ShieldCheck, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const UpiPaymentModal: React.FC = () => {
  const { isUpiOpen, setIsUpiOpen, storeSettings } = useStore();
  const [copied, setCopied] = useState(false);

  if (!isUpiOpen) return null;

  const upiId = storeSettings.upiId || '7366942823@upi';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Standard UPI URI format
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    storeSettings.storeName
  )}&cu=INR`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-center space-y-4">
        
        {/* Close */}
        <button
          onClick={() => setIsUpiOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div>
          <div className="w-12 h-12 bg-blue-50 text-[#1769E0] rounded-2xl flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">
            दुकानदार को UPI से भुगतान करें
          </h3>
          <p className="text-xs text-slate-500 font-devanagari mt-0.5">
            {storeSettings.storeName}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 inline-block shadow-2xs">
          {/* Authentic QR Pattern Render */}
          <div className="w-48 h-48 bg-white border border-slate-300 rounded-xl p-2 mx-auto flex flex-col items-center justify-center relative">
            <img
              src={
                storeSettings.upiQrCodeImage
                  ? storeSettings.upiQrCodeImage
                  : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      upiUri
                    )}`
              }
              alt="Store UPI QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <span className="text-[11px] text-slate-500 font-semibold mt-2 block">
            {storeSettings.upiQrCodeImage
              ? '✓ AG GENRAL STORE का आधिकारिक QR कोड'
              : 'PhonePe · Google Pay · Paytm · BHIM'}
          </span>
        </div>

        {/* UPI ID Copy Field */}
        <div className="bg-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs">
          <div className="text-left font-mono font-bold text-slate-800 truncate pr-2">
            {upiId}
          </div>
          <button
            onClick={handleCopyUpi}
            className="flex items-center gap-1 bg-white hover:bg-slate-200 text-[#1769E0] font-bold px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">कॉपी हुआ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>कॉपी करें</span>
              </>
            )}
          </button>
        </div>

        {/* Quick App Link for Mobile */}
        <div className="pt-1">
          <a
            href={upiUri}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#1769E0] hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI ऐप में खोलें (Pay via UPI App)</span>
          </a>
        </div>

        {/* Trust Notice */}
        <div className="text-[11px] text-slate-500 font-devanagari bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 flex items-start gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-[#1769E0] shrink-0 mt-0.5" />
          <span>
            <b>सुरक्षा निर्देश:</b> अग्रिम भुगतान आवश्यक नहीं है। आप दुकान पर सामान लेते समय (Pickup) या सामान की पुष्टि के बाद ही भुगतान करें।
          </span>
        </div>

      </div>
    </div>
  );
};
