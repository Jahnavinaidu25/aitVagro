import React, { useState } from 'react';
import { AppScreen, LanguageCode } from '../types';
import {
  Eye,
  Sun,
  Volume2,
  Sliders,
  Type,
  WifiOff,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Languages
} from 'lucide-react';

interface LanguagesAccessibilityScreenProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  highSunlight: boolean;
  onToggleSunlight: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export const LanguagesAccessibilityScreen: React.FC<LanguagesAccessibilityScreenProps> = ({
  currentLang,
  onSelectLang,
  highSunlight,
  onToggleSunlight,
  onNavigate,
}) => {
  const [selectedDialect, setSelectedDialect] = useState('mandya');
  const [speechRate, setSpeechRate] = useState(0.85);
  const [textSize, setTextSize] = useState(110);
  const [smsFallback, setSmsFallback] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);

  const dialects = [
    { id: 'mandya', name: 'Mysuru-Mandya (Cauvery Basin)', desc: 'Optimized for local sugarcane & paddy colloquialisms' },
    { id: 'north', name: 'North Karnataka (Dharwad / Belagavi)', desc: 'Customized for Jowar, Cotton & Black soil terminology' },
    { id: 'karavali', name: 'Coastal Karavali (Mangaluru / Udupi)', desc: 'Arecanut, Coconut & Coastal wetland dialect' },
    { id: 'kalyana', name: 'Kalyana Karnataka (Kalaburagi / Bidar)', desc: 'Tur dal, Red gram & dryland agricultural phrases' }
  ];

  const handleTestSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('ಕಿಸಾನ್ ಧ್ವನಿ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಟ್ರ್ಯಾಕ್ಟರ್ ೧೫ ನಿಮಿಷದಲ್ಲಿ ತಲುಪಲಿದೆ.');
      u.rate = speechRate;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-1">
            <Eye className="w-3.5 h-3.5" />
            Vernacular & Sunlight Ergonomics Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಪ್ರಾದೇಶಿಕ ಭಾಷೆ & ಬಿಸಿಲಿನ ಸ್ಪಷ್ಟತೆ / Field Accessibility
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Designed for outdoor readability under harsh 35°C noon sunlight, loud tractor engine noise, and regional dialects
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-2xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition shrink-0"
        >
          Back to Dashboard
        </button>
      </div>

      {/* 1. High Sunlight Field Mode Toggle */}
      <div
        className={`p-6 rounded-3xl border-2 transition-all shadow-md ${
          highSunlight
            ? 'bg-[#ffe600] text-black border-black ring-4 ring-black'
            : 'bg-surface-container border-outline-variant/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                highSunlight ? 'bg-black text-[#ffe600]' : 'bg-amber-500/10 text-amber-600'
              }`}
            >
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">
                  High Sunlight Field Mode / ಪ್ರಖರ ಬಿಸಿಲಿನ ಮೋಡ್
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    highSunlight ? 'bg-black text-[#ffe600]' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Harsh Glare Safe
                </span>
              </div>
              <p
                className={`text-xs mt-1 max-w-xl ${
                  highSunlight ? 'text-black font-semibold' : 'text-on-surface-variant'
                }`}
              >
                Inverts UI into maximum optical contrast (High-visibility yellow & bold black) so farmers can read acreage maps and OTP codes under harsh noon direct sunlight on open fields.
              </p>
            </div>
          </div>

          <button
            onClick={onToggleSunlight}
            className={`px-6 py-3 rounded-2xl font-bold text-xs transition shadow-md shrink-0 ${
              highSunlight
                ? 'bg-black text-[#ffe600] hover:bg-zinc-800'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            {highSunlight ? 'Disable Sunlight Mode' : 'Enable High Sunlight Mode'}
          </button>
        </div>
      </div>

      {/* 2. Regional Sub-Dialect Selection */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-on-surface">
            Karnataka Regional Dialect Precision / ಉಪಭಾಷೆ
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dialects.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDialect(d.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                selectedDialect === d.id
                  ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                  : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
              }`}
            >
              <div>
                <div className="font-bold text-xs text-on-surface">{d.name}</div>
                <div className="text-[11px] text-on-surface-variant mt-1">{d.desc}</div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedDialect === d.id ? 'border-primary bg-primary' : 'border-outline-variant'
                }`}
              >
                {selectedDialect === d.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Audio Cadence & Indic Text Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Audio Speech Speed */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              Speech Cadence Rate
            </label>
            <span className="text-xs font-bold text-on-surface">{speechRate}x Pacing</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Slow down spoken announcements to overcome loud 2000 RPM diesel engine noise.
          </p>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.05"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <button
            onClick={handleTestSpeech}
            className="w-full py-2 px-3 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-primary flex items-center justify-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Spoken Voice Sample</span>
          </button>
        </div>

        {/* Text Size Slider */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              Indic Script Font Scale
            </label>
            <span className="text-xs font-bold text-on-surface">{textSize}%</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Enlarge complex Kannada ligatures and ottakshara characters for effortless field scanning.
          </p>
          <input
            type="range"
            min="100"
            max="135"
            value={textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="p-2 rounded-xl bg-surface border border-outline-variant/30 text-center text-xs font-bold text-primary">
            Preview: ಕಿಸಾನ್ ಮೊಬಿಲಿಟಿ ಗ್ರಿಡ್
          </div>
        </div>
      </div>

      {/* 4. Remote Connectivity Fallbacks */}
      <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-outline">
          Field Connectivity Fallbacks / ನೆಟ್‌ವರ್ಕ್ ರಕ್ಷಣೆ
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-on-surface">SMS / WhatsApp OTP Fallback</div>
              <div className="text-[11px] text-on-surface-variant">Dispatches SMS if 4G drops in fields</div>
            </div>
            <button
              onClick={() => setSmsFallback(!smsFallback)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                smsFallback ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  smsFallback ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-on-surface">Offline Farm PWA Storage</div>
              <div className="text-[11px] text-emerald-700 font-semibold">24 Machinery Profiles Cached</div>
            </div>
            <button
              onClick={() => setOfflineCacheEnabled(!offlineCacheEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                offlineCacheEnabled ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  offlineCacheEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
