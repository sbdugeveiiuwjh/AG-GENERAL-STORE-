import React, { useState } from 'react';
import { X, FileText, Camera, MessageCircle, Mic, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const QuickParchiModal: React.FC = () => {
  const { isParchiOpen, setIsParchiOpen, storeSettings } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customText, setCustomText] = useState('');
  const [hasPhotoNote, setHasPhotoNote] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');

  // Sample starter items that can be quickly added
  const commonSuggestions = [
    '5 kg गेहूं का आटा',
    '5 kg चावल',
    '1 Ltr सरसों तेल',
    '2 kg सफेद चीनी',
    '1 kg अरहर दाल',
    '1 kg चना दाल',
    '100 g जीरा',
    '100 g हल्दी पाउडर',
    '1 kg टाटा नमक',
    '1 पैकेट चाय पत्ती'
  ];

  if (!isParchiOpen) return null;

  const handleAddSuggestion = (item: string) => {
    setCustomText(prev => (prev.trim() ? `${prev}\n• ${item}` : `• ${item}`));
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('वॉइस इनपुट आपके ब्राउज़र में समर्थित नहीं है।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text) {
          setCustomText(prev => (prev.trim() ? `${prev}\n• ${text}` : `• ${text}`));
        }
      };
      recognition.start();
    } catch {
      // ignore
    }
  };

  const handleSendParchi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() && !hasPhotoNote) {
      alert('कृपया अपनी पर्ची में सामान लिखें या फोटो विकल्प चुनें');
      return;
    }

    const message = `Namaste ${storeSettings.storeName}!
मैं अपनी *राशन पर्ची (Kirana Parchi)* भेज रहा/रही हूँ।

👤 Name: ${customerName || 'ग्राहक'}
📞 Phone: ${phoneNumber || 'N/A'}
🏪 Preference: ${orderType === 'pickup' ? 'स्टोर पिकअप' : `होम डिलीवरी: ${address}`}

📝 राशन लिस्ट (Items List):
${customText || '(पर्ची की फोटो साथ में भेज रहा/रही हूँ)'}
${hasPhotoNote ? '\n📷 (नोट: पर्ची की फोटो भी अलग से अटैच की जा रही है)' : ''}

कृपया इस लिस्ट के अनुसार सामान तैयार करें और कुल बिल की पुष्टि करें।
धन्यवाद!`;

    const url = getWhatsAppUrl(storeSettings.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsParchiOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#1769E0] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                राशन पर्ची भेजें (Quick Kirana Parchi)
              </h3>
              <p className="text-xs text-blue-100">
                हाथ से लिखी पर्ची या सामान का नाम लिखकर सीधा WhatsApp करें
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsParchiOpen(false)}
            className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendParchi} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Quick Voice / Suggestion toolbar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                सामान की सूची लिखें (List of Items):
              </label>
              <button
                type="button"
                onClick={handleVoiceInput}
                className="text-xs text-[#1769E0] hover:text-blue-700 font-bold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>बोलकर जोड़ें</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="उदा:&#10;• 5 किलो गेहूं का आटा&#10;• 2 किलो चीनी&#10;• 1 लीटर कच्ची घानी सरसों तेल&#10;• 100 ग्राम जीरा"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-devanagari focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
            />
          </div>

          {/* Quick Add Suggestions Chips */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              + झटपट सामान जोड़ें (Click to add):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {commonSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSuggestion(item)}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-[#1769E0] text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 font-devanagari"
                >
                  <Plus className="w-3 h-3 text-slate-400" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Slip Note Checkbox */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
            <input
              type="checkbox"
              id="hasPhoto"
              checked={hasPhotoNote}
              onChange={e => setHasPhotoNote(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#1769E0] rounded border-slate-300 focus:ring-[#1769E0]"
            />
            <label htmlFor="hasPhoto" className="text-xs text-slate-700 cursor-pointer">
              <span className="font-bold flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>हाथ से लिखी पर्ची की फोटो WhatsApp पर साथ भेजेंगे</span>
              </span>
              <span className="text-slate-500 text-[11px] block mt-0.5 font-devanagari">
                मैसेज भेजने के बाद WhatsApp में अपनी पर्ची की फोटो भी अटैच कर सकते हैं।
              </span>
            </label>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                आपका नाम (Your Name):
              </label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="उदा: मोहन जी"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                फोन नंबर (Phone):
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="उदा: 9876543210"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Pickup vs Delivery */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              ऑर्डर का प्रकार:
            </label>
            <div className="flex gap-3 text-xs font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="parchiOrderType"
                  checked={orderType === 'pickup'}
                  onChange={() => setOrderType('pickup')}
                />
                <span>दुकान से पिकअप (Free)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="parchiOrderType"
                  checked={orderType === 'delivery'}
                  onChange={() => setOrderType('delivery')}
                />
                <span>होम डिलीवरी (पुष्टि अनुसार)</span>
              </label>
            </div>
            {orderType === 'delivery' && (
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="डिलीवरी का पता (गली, मोहल्ला)..."
                className="w-full mt-2 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#16A34A] hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>पर्ची WhatsApp पर भेजें (Send to +91 73669 42823)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
