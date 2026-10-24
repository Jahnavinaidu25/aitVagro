import React, { useState } from 'react';
import { AppScreen, LanguageCode, UserProfile } from '../types';
import { LANGUAGES, NOTIFICATIONS } from '../data/mockData';
import {
  Sun,
  Volume2,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Tractor,
  MapPin,
  Users,
  Receipt,
  Sparkles,
  TrendingUp,
  Box,
  Layers,
  Building2,
  UserCheck
} from 'lucide-react';

interface NavigationProps {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  highSunlight: boolean;
  setHighSunlight: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: UserProfile;
  onOpenProfile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  setCurrentScreen,
  currentLang,
  setCurrentLang,
  highSunlight,
  setHighSunlight,
  currentUser,
  onOpenProfile,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(NOTIFICATIONS);

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleSpeakGreeting = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(activeLangObj.sampleAudioText);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Farmer specific navigation tabs
  const farmerTabs: Array<{ id: AppScreen; label: string; indic: string; icon: React.ElementType }> = [
    { id: 'dashboard', label: 'Home', indic: 'ಮುಖಪುಟ', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Fleet Grid', indic: 'ಯಂತ್ರ ಬಾಡಿಗೆ', icon: Tractor },
    { id: 'nearby-map', label: 'GPS Map', indic: 'ನಕ್ಷೆ', icon: MapPin },
    { id: 'labour-discovery', label: 'Labour Squads', indic: 'ಕಾರ್ಮಿಕರು', icon: Users },
    { id: 'my-bookings', label: 'My Bookings', indic: 'ಬುಕಿಂಗ್', icon: Receipt },
    { id: 'ai-assistant', label: 'Kisan AI', indic: 'ಸಲಹೆಗಾರ', icon: Sparkles },
    { id: 'operations', label: 'Mandi Rates', indic: 'ಮಾರುಕಟ್ಟೆ', icon: TrendingUp },
  ];

  // Provider specific navigation tabs
  const providerTabs: Array<{ id: AppScreen; label: string; indic: string; icon: React.ElementType }> = [
    { id: 'provider-hub', label: 'Fleet Hub', indic: 'ಮಾಲೀಕರ ಹಬ್', icon: Layers },
    { id: 'nearby-map', label: 'Live Telemetry', indic: 'ಜಿಪಿಎಸ್', icon: MapPin },
    { id: '3d-equipment-lab', label: '3D Studio', indic: '3D ತಪಾಸಣೆ', icon: Box },
    { id: 'operations', label: 'Mandi Rates', indic: 'ಮಾರುಕಟ್ಟೆ', icon: TrendingUp },
  ];

  // Labour Lead specific navigation tabs
  const labourTabs: Array<{ id: AppScreen; label: string; indic: string; icon: React.ElementType }> = [
    { id: 'labour-lead-portal', label: 'Squad Hub', indic: 'ತಂಡದ ಹಬ್', icon: Users },
    { id: 'labour-discovery', label: 'Farmer Jobs', indic: 'ಕೆಲಸಗಳು', icon: UserCheck },
    { id: 'operations', label: 'Mandi Rates', indic: 'ಮಾರುಕಟ್ಟೆ', icon: TrendingUp },
  ];

  // Agri Officer specific navigation tabs
  const officerTabs: Array<{ id: AppScreen; label: string; indic: string; icon: React.ElementType }> = [
    { id: 'agri-officer-portal', label: 'CHC & Subsidy Hub', indic: 'ಸಹಕಾರಿ ಹಬ್', icon: Building2 },
    { id: 'operations', label: 'APMC Yard Mandi', indic: 'ಮಾರುಕಟ್ಟೆ', icon: TrendingUp },
    { id: 'nearby-map', label: 'District Fleet Map', indic: 'ಜಿಪಿಎಸ್ ನಕ್ಷೆ', icon: MapPin },
  ];

  const currentTabs =
    currentUser.role === 'farmer'
      ? farmerTabs
      : currentUser.role === 'provider'
      ? providerTabs
      : currentUser.role === 'labour'
      ? labourTabs
      : officerTabs;

  return (
    <>
      {/* Top Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-colors border-b shadow-sm ${
          highSunlight
            ? 'bg-[#ffe600] text-black border-black font-extrabold'
            : 'bg-surface/95 backdrop-blur-md border-outline-variant/30 text-on-surface'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (currentUser.role === 'farmer') setCurrentScreen('dashboard');
                else if (currentUser.role === 'provider') setCurrentScreen('provider-hub');
                else if (currentUser.role === 'labour') setCurrentScreen('labour-lead-portal');
                else setCurrentScreen('agri-officer-portal');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105 ${
                  highSunlight ? 'bg-black text-[#ffe600]' : 'bg-primary text-on-primary shadow'
                }`}
              >
                🌾
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight leading-none text-primary">
                    VAgriConnect
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-primary/10 text-primary uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-on-surface-variant leading-tight">
                  ಕಿಸಾನ್ ಮೊಬಿಲಿಟಿ & ಎಂಟರ್‌ಪ್ರೈಸ್ ಗ್ರಿಡ್
                </p>
              </div>
            </button>
          </div>

          {/* Role Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {currentTabs.map((tab) => {
              const isSelected = currentScreen === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentScreen(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? highSunlight
                        ? 'bg-black text-[#ffe600]'
                        : 'bg-primary text-on-primary shadow-sm'
                      : highSunlight
                      ? 'text-black hover:bg-black/10'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Controls: Sunlight, Speech, Language, Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* High Sunlight Field Mode Toggle */}
            <button
              onClick={() => setHighSunlight((prev) => !prev)}
              className={`p-2 rounded-full border transition flex items-center justify-center ${
                highSunlight
                  ? 'bg-black text-[#ffe600] border-black ring-2 ring-black'
                  : 'bg-surface-container border-outline-variant/40 hover:bg-surface-container-high text-amber-600'
              }`}
              title="High Sunlight Field Mode"
            >
              <Sun className="w-4 h-4" />
            </button>

            {/* Audio Speech Greeting */}
            <button
              onClick={handleSpeakGreeting}
              className={`p-2 rounded-full border transition flex items-center justify-center ${
                highSunlight
                  ? 'bg-black text-[#ffe600] border-black'
                  : 'bg-surface-container border-outline-variant/40 hover:bg-surface-container-high text-primary'
              }`}
              title="Vernacular Voice Announcement"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-bold transition ${
                  highSunlight
                    ? 'bg-black text-[#ffe600] border-black'
                    : 'bg-surface-container border-outline-variant/40 hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span>{activeLangObj.native}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 text-on-surface">
                  <div className="px-3 py-1.5 border-b border-outline-variant/20 text-[11px] font-bold text-outline uppercase tracking-wider">
                    Select Language / ಭಾಷೆ
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setCurrentLang(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-surface-container-high transition ${
                        currentLang === l.code ? 'font-bold text-primary bg-primary/10' : 'text-on-surface'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{l.native}</div>
                        <div className="text-[10px] text-on-surface-variant">{l.name}</div>
                      </div>
                      {currentLang === l.code && <span className="text-primary text-xs">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full border transition ${
                  highSunlight
                    ? 'bg-black text-[#ffe600] border-black'
                    : 'bg-surface-container border-outline-variant/40 hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.some((n) => n.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-2xl shadow-xl border border-outline-variant/30 p-3 z-50 text-on-surface">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-2">
                    <span className="text-xs font-bold">Field Alerts & Orders</span>
                    <button
                      onClick={() => {
                        setUnreadNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                        setShowNotifications(false);
                      }}
                      className="text-[11px] text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {unreadNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl text-xs border ${
                          notif.unread
                            ? 'bg-primary-container/10 border-primary/30'
                            : 'bg-surface-container border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{notif.title}</span>
                          <span className="text-[10px] text-outline">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Role Button (Clicks to open Profile & Role Switcher Modal!) */}
            <button
              onClick={onOpenProfile}
              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition cursor-pointer ${
                highSunlight
                  ? 'bg-black text-[#ffe600] border-black font-black'
                  : 'bg-surface-container border-outline-variant/50 hover:bg-surface-container-high text-on-surface shadow-sm'
              }`}
              title="Click to view & edit Profile or Switch Role"
            >
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-black text-xs flex items-center justify-center">
                {currentUser.avatarInitials || 'RG'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold leading-tight">{currentUser.name.split(' ')[0]}</div>
                <div className="text-[9px] text-primary font-semibold uppercase leading-tight">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-outline" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Quick Navigation Bar for Mobile / Tablet */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors lg:hidden ${
          highSunlight
            ? 'bg-[#ffe600] text-black border-black font-black'
            : 'bg-surface/95 backdrop-blur-lg border-outline-variant/30 text-on-surface'
        }`}
      >
        <div
          className={`grid h-16 items-center px-1 ${
            currentTabs.length <= 5
              ? `grid-cols-${currentTabs.length}`
              : 'grid-cols-5'
          }`}
          style={{ gridTemplateColumns: `repeat(${Math.min(currentTabs.length, 5)}, minmax(0, 1fr))` }}
        >
          {currentTabs.slice(0, 5).map((tab) => {
            const isSelected = currentScreen === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id)}
                className={`flex flex-col items-center justify-center py-1 transition ${
                  isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] mt-1 truncate max-w-16">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
