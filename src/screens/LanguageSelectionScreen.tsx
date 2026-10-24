import React, { useState } from 'react';
import { AppScreen, LanguageCode } from '../types';
import { LANGUAGES } from '../data/mockData';
import {
  Languages,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Mic,
  Sliders,
  Check,
  Sparkles
} from 'lucide-react';

interface LanguageSelectionScreenProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  currentLang,
  onSelectLang,
  onNavigate,
}) => {
  const [voiceAssisted, setVoiceAssisted] = useState(true);
  const [speechSpeed, setSpeechSpeed] = useState<'normal' | 'slow' | 'deliberate'>('normal');
  const [playingCode, setPlayingCode] = useState<LanguageCode | null>(null);

  const handlePlayPreview = (langCode: LanguageCode, text: string) => {
    setPlayingCode(langCode);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = speechSpeed === 'slow' ? 0.75 : speechSpeed === 'deliberate' ? 0.6 : 0.9;
      u.onend = () => setPlayingCode(null);
      u.onerror = () => setPlayingCode(null);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setPlayingCode(null), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Languages className="w-3.5 h-3.5" />
          Vernacular & Dialect Selection
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
          ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ / Choose Language
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
          All equipment specifications, live tractor GPS telemetry, legal escrow agreements, and AI voice diagnostics will adapt to your chosen mother tongue.
        </p>
      </div>

      {/* Language Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LANGUAGES.map((lang) => {
          const isSelected = currentLang === lang.code;
          const isPlaying = playingCode === lang.code;

          return (
            <div
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-primary-container/15 border-primary shadow-md ring-1 ring-primary'
                  : 'bg-surface-container border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-on-surface">
                    {lang.native}
                  </span>
                  {isSelected ? (
                    <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-full border-2 border-outline-variant/60"></span>
                  )}
                </div>

                <div className="mt-1 font-semibold text-sm text-on-surface">
                  {lang.name}
                </div>
                <div className="text-xs text-primary font-medium mt-0.5">
                  {lang.region}
                </div>

                <p className="text-xs text-on-surface-variant mt-3 italic bg-surface/60 p-2.5 rounded-xl border border-outline-variant/20">
                  {lang.welcomeText}
                </p>
              </div>

              {/* Audio Listen Button */}
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPreview(lang.code, lang.welcomeText);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlaying
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlaying ? 'Playing...' : 'Audio Preview'}</span>
                </button>

                <span className="text-[11px] font-mono text-outline uppercase">
                  {lang.code.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice-First Accessibility Settings for Agricultural Fields */}
      <div className="p-5 sm:p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-sm sm:text-base text-on-surface">
            Field Voice & Speech Cadence Settings / ಧ್ವನಿ ಸೌಲಭ್ಯ
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Toggle 1: Auto-Read Field Prompts */}
          <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-on-surface">Auto-Read Voice Prompts</div>
              <div className="text-[11px] text-on-surface-variant">Speak telemetry and OTP codes aloud</div>
            </div>
            <button
              onClick={() => setVoiceAssisted(!voiceAssisted)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                voiceAssisted ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  voiceAssisted ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Speech Cadence */}
          <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-on-surface">Field Noise Cadence</div>
              <div className="text-[11px] text-on-surface-variant">Paced for tractor noise environments</div>
            </div>
            <div className="flex items-center gap-1">
              {(['slow', 'normal'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeechSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                    speechSpeed === spd
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onNavigate('welcome')}
          className="text-xs font-bold text-on-surface-variant hover:text-on-surface"
        >
          ← Back to Welcome
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('role-onboarding')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-surface-container-high border border-outline-variant/40 hover:bg-surface-container-highest text-on-surface text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Setup Role</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition flex items-center justify-center gap-2 shadow-md"
          >
            <span>Save & Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
