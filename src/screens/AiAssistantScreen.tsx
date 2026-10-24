import React, { useState } from 'react';
import { AppScreen, LanguageCode } from '../types';
import {
  Sparkles,
  Mic,
  Camera,
  Send,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Bug,
  Calculator,
  Award,
  ChevronRight
} from 'lucide-react';

interface AiAssistantScreenProps {
  currentLang: LanguageCode;
  onNavigate: (screen: AppScreen) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  diagnosis?: {
    disease: string;
    kannadaName: string;
    confidence: string;
    remedy: string;
    chemicalDosage: string;
    organicAlternative: string;
  };
}

export const AiAssistantScreen: React.FC<AiAssistantScreenProps> = ({
  currentLang,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'ai',
      text: 'ನಮಸ್ಕಾರ ಕಿಸಾನ್ ಬಂಧು! ನಾನು ನಿಮ್ಮ VAgriConnect ಕೃಷಿ AI ಸಹಾಯಕ. ಬೆಳೆ ರೋಗ ಪತ್ತೆ, ಗೊಬ್ಬರ ಪ್ರಮಾಣ ಅಥವಾ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣಗಳ ಬಾಡಿಗೆ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [scanningLeaf, setScanningLeaf] = useState(false);

  const sampleLeafDiagnoses = [
    {
      label: 'Scan Paddy Leaf Blast (ಭತ್ತದ ಬೆಂಕಿ ರೋಗ)',
      image: 'https://images.unsplash.com/photo-1599827552599-eadf5e0a0584?w=500&auto=format&fit=crop&q=80',
      disease: 'Rice Blast (Pyricularia grisea)',
      kannadaName: 'ಭತ್ತದ ಎಲೆ ಬೆಂಕಿ ರೋಗ',
      confidence: '98.4% Match',
      remedy: 'Avoid excess nitrogen fertilizer. Maintain standing water in nursery beds.',
      chemicalDosage: 'Spray Tricyclazole 75% WP @ 0.6 g/litre water.',
      organicAlternative: 'Neem seed kernel extract (NSKE 5%) or Pseudomonas fluorescens @ 5 g/litre.'
    },
    {
      label: 'Scan Sugarcane Red Rot (ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ)',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=80',
      disease: 'Sugarcane Red Rot (Colletotrichum falcatum)',
      kannadaName: 'ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ',
      confidence: '96.2% Match',
      remedy: 'Uproot and burn affected sets immediately to prevent soil fungal spread.',
      chemicalDosage: 'Drench furrows with Carbendazim 50% WP @ 1 g/litre water.',
      organicAlternative: 'Trichoderma viride bio-fertilizer enriched compost application.'
    }
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // AI Response simulation tailored for regional Mandya/Kisan context
    setTimeout(() => {
      let reply = 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು. ಮಂಡ್ಯ ಭಾಗದಲ್ಲಿ ಈಗ ಭತ್ತದ ಬಿತ್ತನೆಗೆ ಉತ್ತಮ ಹವಾಮಾನವಿದೆ.';
      if (inputText.toLowerCase().includes('tractor') || inputText.toLowerCase().includes('rate')) {
        reply = 'ಮಂಡ್ಯ ಎಪಿಎಂಸಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ 50 HP ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ ಸರಾಸರಿ ₹850 ರಿಂದ ₹950/ಗಂಟೆಗೆ ಲಭ್ಯವಿದೆ. ರೋಟವೇಟರ್ ಜೋಡಣೆಗೆ ₹200 ಹೆಚ್ಚುವರಿ ಶುಲ್ಕವಿದೆ.';
      } else if (inputText.toLowerCase().includes('subsidy') || inputText.toLowerCase().includes('yojana')) {
        reply = 'ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಯ ಕಸ್ಟಮ್ ಹೈರಿಂಗ್ ಸೆಂಟರ್ (CHC) ಅಡಿಯಲ್ಲಿ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ಯಂತ್ರ ಬಾಡಿಗೆ ಮೇಲೆ 50% ಸಬ್ಸಿಡಿ ಲಭ್ಯವಿದೆ.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
        },
      ]);
    }, 800);
  };

  const handleScanSample = (sample: typeof sampleLeafDiagnoses[0]) => {
    setScanningLeaf(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `u-scan-${Date.now()}`,
        sender: 'user',
        text: `Scanning leaf specimen for crop health diagnosis...`,
        image: sample.image,
      },
    ]);

    setTimeout(() => {
      setScanningLeaf(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-diag-${Date.now()}`,
          sender: 'ai',
          text: `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${sample.kannadaName} (${sample.disease})`,
          diagnosis: sample,
        },
      ]);
    }, 1200);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold border border-purple-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Kisan AI Voice & Pest Diagnostic Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಕಿಸಾನ್ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಸಲಹೆಗಾರ / Crop & Pest AI Advisor
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Powered by Multilingual Gemini Agri-Vision for instant weed, pest and fertilizer diagnostics
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-2xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition shrink-0"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Quick Pest Scan Triggers */}
      <div className="p-4 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
          <span className="flex items-center gap-1.5 text-primary">
            <Camera className="w-4 h-4" />
            Instant Leaf Pest Scanner / ರೋಗ ಪರೀಕ್ಷೆ
          </span>
          <span className="text-outline">Click sample to analyze</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleLeafDiagnoses.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleScanSample(sample)}
              className="p-3 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary/50 text-left flex items-center gap-3 transition group"
            >
              <img
                src={sample.image}
                alt={sample.disease}
                className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-on-surface truncate">{sample.label}</div>
                <div className="text-[11px] text-primary font-medium mt-0.5">{sample.disease}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chat Stream */}
      <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm space-y-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-tr-none'
                  : 'bg-surface text-on-surface border border-outline-variant/30 rounded-tl-none'
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded leaf"
                  className="rounded-xl w-full max-h-48 object-cover mb-2"
                />
              )}

              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {/* Structured Diagnosis Card if available */}
              {msg.diagnosis && (
                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 space-y-2 text-xs mt-2 text-on-surface">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                    <span className="font-bold text-primary flex items-center gap-1">
                      <Bug className="w-3.5 h-3.5" />
                      {msg.diagnosis.kannadaName}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {msg.diagnosis.confidence}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-amber-800">Field Treatment:</div>
                    <div className="text-on-surface-variant">{msg.diagnosis.remedy}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-primary">Chemical Prescription:</div>
                    <div className="font-mono text-[11px] bg-surface p-1.5 rounded border border-outline-variant/20">
                      {msg.diagnosis.chemicalDosage}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-emerald-700">Bio / Organic Alternative:</div>
                    <div className="text-on-surface-variant text-[11px]">
                      {msg.diagnosis.organicAlternative}
                    </div>
                  </div>
                </div>
              )}

              {msg.sender === 'ai' && (
                <div className="pt-1 flex items-center justify-between text-[11px] text-outline">
                  <span className="font-bold text-primary">VAgriConnect Agri-AI</span>
                  <button
                    onClick={() => speakText(msg.text)}
                    className="hover:text-primary transition flex items-center gap-1"
                    title="Read response aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {scanningLeaf && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-surface border border-outline-variant/30 text-xs text-primary max-w-xs animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Analyzing cellular leaf structure with Gemini...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsListening(!isListening);
            if (!isListening) {
              setInputText('ಮಂಡ್ಯದಲ್ಲಿ 50 HP ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ ದರ ಎಷ್ಟು?');
            }
          }}
          className={`p-3 rounded-2xl border transition ${
            isListening
              ? 'bg-red-500 text-white border-red-500 animate-pulse'
              : 'bg-surface-container border-outline-variant/40 text-primary hover:bg-surface-container-high'
          }`}
          title="Voice Command (Click to dictate in Kannada)"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask in Kannada or English (e.g., 'ಬೆಳೆ ರೋಗ, ರೋಟವೇಟರ್ ಬಾಡಿಗೆ')..."
          className="flex-1 py-3 px-4 rounded-2xl bg-surface-container border border-outline-variant/40 text-sm font-semibold text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
        />

        <button
          type="submit"
          className="p-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary transition shadow"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
