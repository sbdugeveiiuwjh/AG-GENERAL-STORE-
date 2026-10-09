import React, { useRef, useState } from 'react';
import { X, Printer, Download, Store, CheckCircle, Share2, Loader2, Image as ImageIcon } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { useStore } from '../context/StoreContext';

export const BillReceiptModal: React.FC = () => {
  const {
    isReceiptOpen,
    setIsReceiptOpen,
    lastOrderReceipt,
    cart,
    cartSubtotal,
    storeSettings
  } = useStore();

  const billRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  if (!isReceiptOpen) return null;

  // Use either the last completed order or current cart
  const items = lastOrderReceipt?.items || cart;
  const subtotal = lastOrderReceipt?.subtotal || cartSubtotal;
  const customerName = lastOrderReceipt?.customerName || 'सम्मानित ग्राहक';
  const customerPhone = lastOrderReceipt?.phoneNumber || '';
  const orderNumber = lastOrderReceipt?.orderNumber || `AG-${Date.now().toString().slice(-6)}`;
  const orderDate = lastOrderReceipt?.date || new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Helper to convert base64 dataUrl to Blob
  const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Handle saving the bill directly to the phone's gallery / downloads
  const handleSaveToGallery = async () => {
    if (!billRef.current || isSaving) return;
    setIsSaving(true);
    setSaveMessage('बिल तैयार हो रहा है...');

    try {
      const fileName = `AG-Store-Bill-${orderNumber}.jpg`;

      // Capture bill using html-to-image (compatible with Tailwind oklch colors)
      const dataUrl = await toJpeg(billRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2.2,
        skipFonts: true,
        cacheBust: true,
      });

      // Trigger download as .jpg image for Phone Gallery / Downloads
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setIsSaving(false);
      setSaveSuccess(true);
      setSaveMessage('बिल आपकी गैलरी में सेव हो गया! ✓');

      // Reset success message after 4 seconds
      setTimeout(() => {
        setSaveSuccess(false);
        setSaveMessage('');
      }, 4000);
    } catch (err) {
      console.error('Failed to capture bill for gallery:', err);
      setIsSaving(false);
      // Fallback to window.print if capture fails
      window.print();
    }
  };

  // Optional Share functionality via Web Share API
  const handleShare = async () => {
    if (!billRef.current || isSaving) return;
    setIsSaving(true);
    setSaveMessage('शेयर करने के लिए तैयार हो रहा है...');

    try {
      const fileName = `AG-Store-Bill-${orderNumber}.jpg`;
      const dataUrl = await toJpeg(billRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2.2,
        skipFonts: true,
        cacheBust: true,
      });

      const blob = dataUrlToBlob(dataUrl);
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${storeSettings.storeName} बिल पर्ची`,
            text: `किराना बिल संख्या: ${orderNumber} - कुल राशि: ₹${subtotal}`,
          });
          setIsSaving(false);
          setSaveSuccess(true);
          setSaveMessage('सफलतापूर्वक शेयर किया गया! ✓');
          setTimeout(() => {
            setSaveSuccess(false);
            setSaveMessage('');
          }, 3000);
          return;
        } catch (shareErr) {
          // User cancelled share
          console.log('Share canceled or dismissed', shareErr);
        }
      }

      // If Web Share API files not supported, fallback to direct download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setIsSaving(false);
      setSaveSuccess(true);
      setSaveMessage('बिल आपकी गैलरी में सेव हो गया! ✓');
      setTimeout(() => {
        setSaveSuccess(false);
        setSaveMessage('');
      }, 4000);
    } catch (err) {
      console.error('Failed sharing bill:', err);
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Controls Bar (hidden during actual window.print) */}
        <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm min-w-0">
            <Store className="w-4 h-4 text-[#1769E0] shrink-0" />
            <span className="truncate">किराना बिल पर्ची (Invoice)</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Primary Action Button: Save directly to phone gallery */}
            <button
              onClick={handleSaveToGallery}
              disabled={isSaving}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1769E0] hover:bg-blue-700 text-white'
              }`}
              title="बिल को फोन गैलरी में फोटो के रूप में सेव/डाउनलोड करें"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden xs:inline">सेव हो रहा है...</span>
                  <span className="xs:hidden">सेव...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>गैलरी में सेव हो गया! ✓</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>गैलरी में सेव करें</span>
                </>
              )}
            </button>

            {/* Optional Share button on mobile */}
            {typeof navigator !== 'undefined' && 'canShare' in navigator && (
              <button
                onClick={handleShare}
                disabled={isSaving}
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                title="WhatsApp या अन्य ऐप पर बिल फोटो शेयर करें"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">शेयर</span>
              </button>
            )}

            {/* Print button */}
            <button
              onClick={handlePrint}
              disabled={isSaving}
              className="p-1.5 sm:px-2 sm:py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="प्रिंटर से प्रिंट करें या PDF बनाएं"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">प्रिंट</span>
            </button>

            {/* Close button */}
            <button
              onClick={() => setIsReceiptOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success / Status Banner */}
        {saveMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-4 py-2 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top-1 print:hidden">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{saveMessage}</span>
            </span>
            <span className="text-[10px] text-emerald-600">फोटो ऐप / डाउनलोड में देखें</span>
          </div>
        )}

        {/* Printable & Capturable Bill Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-2 sm:p-5">
          <div
            id="printable-bill"
            ref={billRef}
            className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 sm:p-7 font-sans text-slate-900 space-y-4 max-w-md mx-auto"
          >
            {/* Bill Header */}
            <div className="text-center pb-4 border-b-2 border-slate-900 border-dashed space-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#1769E0] text-white font-extrabold text-lg mb-1 shadow-xs">
                AG
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                {storeSettings.storeName}
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-emerald-700 font-devanagari">
                किराना एवं राशन की दुकान
              </div>
              <p className="text-xs text-slate-600 font-devanagari max-w-sm mx-auto leading-relaxed">
                {storeSettings.address}
              </p>
              <div className="text-xs font-semibold text-slate-800 pt-0.5">
                फोन / WhatsApp: {storeSettings.phone}
              </div>
            </div>

            {/* Meta Details */}
            <div className="grid grid-cols-2 text-xs py-2 border-b border-slate-200 gap-2 bg-slate-50/60 rounded-lg px-2.5">
              <div>
                <span className="text-slate-500">पर्ची संख्या: </span>
                <span className="font-mono font-bold text-slate-900">{orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500">दिनांक: </span>
                <span className="font-semibold text-slate-900">{orderDate}</span>
              </div>
              <div>
                <span className="text-slate-500">ग्राहक: </span>
                <span className="font-bold text-slate-900">{customerName}</span>
              </div>
              {customerPhone && (
                <div className="text-right">
                  <span className="text-slate-500">फोन: </span>
                  <span className="font-mono text-slate-900">{customerPhone}</span>
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b-2 border-slate-200 font-bold text-slate-700 bg-slate-50/50">
                    <th className="py-2 px-1 w-6">क्र.</th>
                    <th className="py-2 px-1.5">विवरण (Item)</th>
                    <th className="py-2 px-1 text-center whitespace-nowrap">वज़न</th>
                    <th className="py-2 px-1 text-center whitespace-nowrap">मात्रा</th>
                    <th className="py-2 px-1 text-right whitespace-nowrap">दर</th>
                    <th className="py-2 px-1 text-right whitespace-nowrap">कुल (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-1 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="py-2 px-1.5 font-medium font-devanagari text-slate-900">
                        {it.nameHi}
                      </td>
                      <td className="py-2 px-1 text-center text-slate-600 whitespace-nowrap">{it.weight}</td>
                      <td className="py-2 px-1 text-center font-bold whitespace-nowrap">{it.quantity}</td>
                      <td className="py-2 px-1 text-right text-slate-600 whitespace-nowrap">₹{it.price}</td>
                      <td className="py-2 px-1 text-right font-bold text-slate-900 whitespace-nowrap">
                        ₹{it.price * it.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="pt-3 border-t-2 border-slate-900 border-dashed space-y-1 text-sm">
              <div className="flex justify-between items-center font-extrabold text-base pt-1">
                <span>कुल राशि (Total Amount):</span>
                <span className="text-[#1769E0] text-xl">₹{subtotal}</span>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-devanagari">
              <p className="font-semibold text-slate-700">🙏 AG General Store पर खरीदारी करने के लिए हार्दिक धन्यवाद!</p>
              <p className="text-[10px] text-slate-400">
                * यह एक अनुमानित पर्ची है। अंतिम दर एवं तौल दुकान के काउण्टर पर मान्य है।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Helper Bar on Mobile */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 print:hidden">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>बटन दबाते ही बिल फोटो आपकी <b>गैलरी / डाउनलोड्स</b> में सेव हो जाता है</span>
          </span>
          <button
            onClick={handleSaveToGallery}
            disabled={isSaving}
            className="text-[#1769E0] font-bold hover:underline"
          >
            डाउनलोड करें →
          </button>
        </div>

      </div>
    </div>
  );
};

