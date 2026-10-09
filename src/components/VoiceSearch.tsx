import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('आपके ब्राउज़र में वॉइस सर्च की सुविधा उपलब्ध नहीं है। कृपया टाइप करें।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Default to Hindi (matches English words too)
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
        isListening
          ? 'bg-rose-500 text-white animate-pulse'
          : 'text-slate-400 hover:text-[#1769E0] hover:bg-slate-100'
      }`}
      title={isListening ? 'सुन रहा है... बोलिए' : 'बोलकर खोजें (Voice Search)'}
      aria-label="Voice Search"
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};
