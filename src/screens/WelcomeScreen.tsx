import React, { useState } from 'react';
import { AppScreen, LanguageCode } from '../types';
import { LANGUAGES } from '../data/mockData';
import {
  Tractor,
  ShieldCheck,
  Users,
  ArrowRight,
  Volume2,
  CheckCircle2,
  Phone,
  Sparkles,
  Sun
} from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  highSunlight: boolean;
  onToggleSunlight: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  currentLang,
  onSelectLang,
  highSunlight,
  onToggleSunlight,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('98452 71092');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(activeLang.welcomeText);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20 md:pb-10 flex flex-col justify-between">
      {/* Hero Visual Banner */}
      <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl mb-8 border border-outline-variant/30">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6tBc1s-_9pe4WWU77MojqUxoDss_MWYCm989Do_1ppkeNDnzRGf9VybisHNsEvRYgzRqp0c3dWtMAG-BZUsC9CIC6dHDVR_3KFW8OwH2v18aBJhW5ljaJ-XUg0k8xNHGLnga-t8OQckugXMAPkUcW_zvpMe1IjNS7NAGac1wlK3mHhwgqCAiCJ61BC7Q3_VixinEHuCOJ6z0j_QM2aYbAnMBt2wNs3Ydj6Y21JfjX0edLmHJNpqTs"
          alt="Terraced Fields & Tractor Fleet"
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Kisan Mobility Portal
          </span>
        </div>

        {/* Top Right Quick Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={onToggleSunlight}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition ${
              highSunlight ? 'bg-[#ffe600] text-black ring-2 ring-black' : 'bg-black/60 text-amber-300 border border-amber-400/30'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">High Sunlight</span>
          </button>

          <button
            onClick={handleSpeak}
            className="p-2 rounded-full bg-black/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-800/80 transition"
            title="Listen to audio greeting"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            VAgriConnect Karnataka & Cauvery Grid
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
            ಕಿಸಾನ್ ಮೊಬಿಲಿಟಿ & ಕೃಷಿ ಎಸ್ಕ್ರೋ ಗ್ರಿಡ್
          </h1>
          <p className="text-sm sm:text-base text-zinc-200 line-clamp-2">
            Modern farm machinery, combine harvesters, and verified labour squads delivered directly to your field with bank-grade escrow protection.
          </p>
        </div>
      </div>

      {/* Main Grid: Value Pillars & Fast Login */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: 3 Value Pillars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span>Why Farmers Trust VAgriConnect</span>
              <span className="text-xs text-primary font-normal">/ ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಗಳು</span>
            </h2>
            <button
              onClick={() => onNavigate('language-selection')}
              className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              Change Language ({activeLang.native}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 1: On Demand Fleet */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex items-start gap-4 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-on-surface">
                  On-Demand Farm Fleet within 10 km
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  GPS Ready
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Book 45-75 HP tractors, heavy rotavators, multi-crop seed drills, and paddy harvesters. Real-time telemetry, transparent per-hour or per-acre pricing, zero hidden fuel charges.
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  Mahindra • Kubota • New Holland • John Deere
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Verified Labour Squads */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex items-start gap-4 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-on-surface">
                  Vetted Agricultural Labour Squads
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  Aadhaar KYC
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Dedicated crews for paddy transplantation, sugarcane harvesting, chemical spraying, and weeding. Fixed standardized daily wage rates with group Suraksha Bima insurance.
              </p>
            </div>
          </div>

          {/* Pillar 3: Kisan Escrow Protection */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex items-start gap-4 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-on-surface">
                  100% Kisan Escrow Protection
                </h3>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                  Zero Advance Fraud
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Your payment is held safely in Kisan Escrow. Money is disbursed to the equipment provider only after you enter the job-completion OTP and inspect the ploughed acreage.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Fast Onboarding & Entry Box */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-surface-container-high border border-outline-variant/40 shadow-lg space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Fast Kisan Login
                </span>
                <span className="text-[11px] text-on-surface-variant">Instant 30s Setup</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mt-1">
                Enter Phone Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Receive instant OTP verification code for seamless access to regional fleet & labour.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Mobile Number (India +91)
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface border border-outline-variant/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <span className="text-xs font-bold text-on-surface-variant">+91</span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98452 71092"
                      className="w-full bg-transparent text-sm font-semibold text-on-surface focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition flex items-center justify-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send OTP / ಒಟಿಪಿ ಪಡೆಯಿರಿ</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>OTP sent to +91 {phoneNumber}. Demo OTP: <strong>5921</strong></span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Enter 4-Digit OTP
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="5921"
                    className="w-full px-3 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-center text-lg font-mono tracking-widest text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition flex items-center justify-center gap-2 shadow"
                >
                  <span>Verify & Proceed to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-outline-variant/40"></div>
              <span className="flex-shrink mx-3 text-xs text-outline font-semibold uppercase">Or</span>
              <div className="flex-grow border-t border-outline-variant/40"></div>
            </div>

            {/* Direct Quick Launch Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface border border-outline-variant/50 hover:bg-surface-container font-semibold text-xs text-on-surface transition flex items-center justify-between"
              >
                <span>Continue as Kisan (Farmer Guest)</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </button>

              <button
                onClick={() => onNavigate('role-onboarding')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface border border-outline-variant/50 hover:bg-surface-container font-semibold text-xs text-on-surface transition flex items-center justify-between"
              >
                <span>Register as Machinery Fleet Owner</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>

              <button
                onClick={() => onNavigate('language-selection')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface border border-outline-variant/50 hover:bg-surface-container font-semibold text-xs text-on-surface transition flex items-center justify-between"
              >
                <span>Change Language / ಭಾಷೆ ಬದಲಿಸಿ ({activeLang.name})</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
