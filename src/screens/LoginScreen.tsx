import React, { useState } from 'react';
import { UserRole, UserProfile, LanguageCode } from '../types';
import { DEFAULT_PROFILES, LANGUAGES } from '../data/mockData';
import {
  UserCheck,
  Tractor,
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
  Phone,
  CheckCircle2,
  Lock,
  Sparkles,
  Sun,
  Globe,
  ChevronRight
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: UserRole, profile: UserProfile) => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  highSunlight: boolean;
  onToggleSunlight: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  currentLang,
  onSelectLang,
  highSunlight,
  onToggleSunlight,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [phoneNumber, setPhoneNumber] = useState('98452 71092');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const roleConfigs = [
    {
      id: 'farmer' as UserRole,
      title: 'Farmer / Kisan',
      indicTitle: 'ರೈತ / ಕೃಷಿಕ',
      icon: UserCheck,
      color: 'emerald',
      badge: 'Hire Equipment & Labour',
      phone: '98452 71092',
      demoName: 'Ramesh Gowda',
      highlights: [
        'Rent 45-75 HP tractors & combine harvesters within 10 km',
        'Book verified labour squads with fixed daily wage rates',
        '100% Kisan Escrow protection — zero advance payment fraud',
        'Live GPS tractor speed, fuel & field telemetry tracking',
        'Kisan AI voice advisor for crop diseases & pest scanner'
      ]
    },
    {
      id: 'provider' as UserRole,
      title: 'Equipment & Fleet Provider',
      indicTitle: 'ಯಂತ್ರೋಪಕರಣ ಮಾಲೀಕ',
      icon: Tractor,
      color: 'amber',
      badge: 'Fleet Telemetry & Payouts',
      phone: '94481 33201',
      demoName: 'Shivaraj Patil (Sree Maruthi Fleet)',
      highlights: [
        'Live telemetry roster for all tractors, harvesters & rotavators',
        'Automatic field job dispatch and certified driver assignment',
        'Instant Escrow earnings withdrawal to bank via IMPS',
        'Interactive 3D digital twin implement inspector',
        'Add new machinery to village Custom Hiring grid'
      ]
    },
    {
      id: 'labour' as UserRole,
      title: 'Labor Squad Lead / Contractor',
      indicTitle: 'ಕಾರ್ಮಿಕರ ಮುಖಂಡ',
      icon: Users,
      color: 'blue',
      badge: 'Squad Roster & Wage Escrow',
      phone: '97412 88564',
      demoName: "Lakshmi M. (Kaveri Women's SHG)",
      highlights: [
        'Manage 8-25 member agricultural crew and daily attendance',
        'Paddy transplanting, sugarcane cutting & spraying schedules',
        'Guaranteed group wage escrow locked before field arrival',
        'Raitha Suraksha group accident & medical insurance verification',
        'Accept or decline farmer contract booking requests'
      ]
    },
    {
      id: 'admin' as UserRole,
      title: 'Cooperative Agri Officer',
      indicTitle: 'ಸಹಕಾರಿ ಕೃಷಿ ಅಧಿಕಾರಿ',
      icon: Building2,
      color: 'purple',
      badge: 'CHC & Subsidy Governance',
      phone: '94808 51230',
      demoName: 'Dr. Manjunath Swamy (ADA Mandya)',
      highlights: [
        'Real-time Custom Hiring Centre (CHC) telemetry across Mandya',
        'Review and sanction 50% farm mechanization subsidy vouchers',
        'Monitor APMC Yard grain arrival quotas and MSP enforcement',
        'District soil health mapping and harvest weather bulletins',
        'Zero-leakage government DBT disbursal audit trail'
      ]
    }
  ];

  const currentRoleConfig = roleConfigs.find((r) => r.id === selectedRole) || roleConfigs[0];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const config = roleConfigs.find((r) => r.id === role);
    if (config) {
      setPhoneNumber(config.phone);
    }
    setOtpSent(false);
    setOtp('');
  };

  const handleFastDemoLogin = (role: UserRole) => {
    const profile = DEFAULT_PROFILES[role];
    onLogin(role, profile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      setOtp('5921');
    } else {
      const profile = DEFAULT_PROFILES[selectedRole];
      onLogin(selectedRole, profile);
    }
  };

  return (
    <div className="min-h-screen pb-16 flex flex-col justify-between bg-surface text-on-surface">
      {/* Top Banner Navigation */}
      <header className="border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-black text-xl shadow">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-primary">
                  VAgriConnect
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary/10 text-primary">
                  PORTAL GATEWAY
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant font-medium">
                ಕಿಸಾನ್ ಎಂಟರ್‌ಪ್ರೈಸ್ ಮೊಬಿಲಿಟಿ ಗ್ರಿಡ್
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* High sunlight toggle */}
            <button
              onClick={onToggleSunlight}
              className={`p-2 rounded-full border text-xs font-bold transition flex items-center gap-1.5 ${
                highSunlight
                  ? 'bg-black text-[#ffe600] border-black'
                  : 'bg-surface-container border-outline-variant/40 hover:bg-surface-container-high text-amber-600'
              }`}
              title="High Sunlight Field Mode"
            >
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">High Sunlight</span>
            </button>

            {/* Language Picker */}
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-2xl border border-outline-variant/40 text-xs">
              <Globe className="w-3.5 h-3.5 text-primary ml-1.5" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="bg-transparent font-bold text-on-surface pr-2 focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-surface text-on-surface">
                    {l.native} ({l.name.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            Role-Based Agricultural Enterprise Gateway
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-on-surface tracking-tight">
            Select Your Agricultural Role / ಲಾಗಿನ್ ಪೋರ್ಟಲ್
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Each role accesses dedicated workflows tailored specifically for farmers, fleet providers, labour squads, or cooperative officers.
          </p>
        </div>

        {/* 4 Separate Role Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {roleConfigs.map((role) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`p-4 sm:p-5 rounded-3xl border-2 text-left transition-all relative flex flex-col justify-between group shadow-sm ${
                  isSelected
                    ? 'bg-primary-container/15 border-primary shadow-lg ring-2 ring-primary scale-[1.02]'
                    : 'bg-surface-container border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-md'
                          : 'bg-surface text-primary group-hover:bg-primary group-hover:text-on-primary'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs shadow">
                        ✓
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                    {role.title}
                  </h3>
                  <div className="text-xs font-bold text-primary mt-0.5">
                    {role.indicTitle}
                  </div>
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                    {role.badge}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">
                    {isSelected ? 'Active Portal' : 'Select'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-primary translate-x-0.5' : 'text-outline'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Login Card & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container border border-outline-variant/40 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Left Column: Role Features & What is Required */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <currentRoleConfig.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Workspace Features
                </span>
                <h2 className="text-xl font-black text-on-surface">
                  {currentRoleConfig.title} Portal Requirements
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              When logged in as a <strong>{currentRoleConfig.title}</strong>, your workspace is dedicated to:
            </p>

            <div className="space-y-2.5 pt-1">
              {currentRoleConfig.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between text-xs mt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-semibold text-on-surface">
                  KYC Verified Demo Identity: <strong>{currentRoleConfig.demoName}</strong>
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                Active in Mandya
              </span>
            </div>
          </div>

          {/* Right Column: Mobile / OTP Authentication Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-outline-variant/40 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-primary">
                  {currentRoleConfig.title} Sign In
                </span>
                <span className="text-[10px] text-outline font-semibold">OTP Verification</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mt-1">
                Enter Mobile Number
              </h3>
              <p className="text-xs text-on-surface-variant">
                We will verify your Karnataka Agri registration credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Registered Mobile (+91)
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container border border-outline-variant/50 focus-within:border-primary">
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

              {otpSent && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-on-surface-variant">Enter 4-Digit OTP</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Code: 5921</span>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="5921"
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container border border-outline-variant/50 text-center text-xl font-mono font-bold tracking-widest text-primary focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>
                  {otpSent ? `Enter ${currentRoleConfig.title} Portal` : 'Send OTP / ಒಟಿಪಿ ಪಡೆಯಿರಿ'}
                </span>
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-outline-variant/40"></div>
              <span className="flex-shrink mx-2 text-[10px] text-outline font-bold uppercase">Or Instant Access</span>
              <div className="flex-grow border-t border-outline-variant/40"></div>
            </div>

            {/* One-Tap Demo Login Button */}
            <button
              onClick={() => handleFastDemoLogin(selectedRole)}
              className="w-full py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/50 text-on-surface font-extrabold text-xs transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>One-Tap Demo Login as <strong>{currentRoleConfig.demoName.split('(')[0]}</strong></span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/20 py-4 text-center text-xs text-on-surface-variant">
        <p>VAgriConnect • Kisan Enterprise Mobility & Escrow Grid • Government of Karnataka Agri Mechanization</p>
      </footer>
    </div>
  );
};
