import React, { useState } from 'react';
import { AppScreen, LanguageCode, UserRole, UserProfile } from './types';
import { DEFAULT_PROFILES } from './data/mockData';
import { Navigation } from './components/Navigation';
import { ProfileModal } from './components/ProfileModal';

// Screens
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { MarketplaceScreen } from './screens/MarketplaceScreen';
import { MachineryDetailScreen } from './screens/MachineryDetailScreen';
import { UnifiedBookingScreen } from './screens/UnifiedBookingScreen';
import { NearbyMapScreen } from './screens/NearbyMapScreen';
import { LabourDiscoveryScreen } from './screens/LabourDiscoveryScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { MyBookingsScreen } from './screens/MyBookingsScreen';
import { ProviderHubScreen } from './screens/ProviderHubScreen';
import { LabourLeadPortalScreen } from './screens/LabourLeadPortalScreen';
import { AgriOfficerPortalScreen } from './screens/AgriOfficerPortalScreen';
import { AiAssistantScreen } from './screens/AiAssistantScreen';
import { Equipment3DLabScreen } from './screens/Equipment3DLabScreen';
import { LanguagesAccessibilityScreen } from './screens/LanguagesAccessibilityScreen';
import { OperationsScreen } from './screens/OperationsScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_PROFILES.farmer);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('kn');
  const [highSunlight, setHighSunlight] = useState(false);
  const [selectedMachineryId, setSelectedMachineryId] = useState('mach-1');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle Login from separate role gateway
  const handleLogin = (role: UserRole, profile: UserProfile) => {
    setCurrentUser(profile);
    setIsLoggedIn(true);

    // Navigate to role-specific entry screen
    if (role === 'farmer') {
      setCurrentScreen('dashboard');
    } else if (role === 'provider') {
      setCurrentScreen('provider-hub');
    } else if (role === 'labour') {
      setCurrentScreen('labour-lead-portal');
    } else if (role === 'admin') {
      setCurrentScreen('agri-officer-portal');
    }
  };

  // Handle Role Switch from Profile Modal
  const handleSwitchRole = (role: UserRole) => {
    const profile = DEFAULT_PROFILES[role];
    setCurrentUser(profile);

    if (role === 'farmer') {
      setCurrentScreen('dashboard');
    } else if (role === 'provider') {
      setCurrentScreen('provider-hub');
    } else if (role === 'labour') {
      setCurrentScreen('labour-lead-portal');
    } else if (role === 'admin') {
      setCurrentScreen('agri-officer-portal');
    }
    setIsProfileOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setIsProfileOpen(false);
  };

  // If not logged in, render the Login Gateway Screen
  if (!isLoggedIn || currentScreen === 'login') {
    return (
      <div
        className={`min-h-screen font-sans transition-colors ${
          highSunlight ? 'bg-[#ffe600] text-black' : 'bg-surface text-on-surface'
        }`}
      >
        <LoginScreen
          onLogin={handleLogin}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          highSunlight={highSunlight}
          onToggleSunlight={() => setHighSunlight((prev) => !prev)}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors ${
        highSunlight ? 'bg-[#ffe600] text-black' : 'bg-surface text-on-surface'
      }`}
    >
      {/* Top Header & Mobile Bottom Bar Navigation */}
      <Navigation
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        highSunlight={highSunlight}
        setHighSunlight={setHighSunlight}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Profile & Role Switcher Modal (Opened when clicking profile avatar in header) */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={(updated) => setCurrentUser(updated)}
        onSwitchRole={handleSwitchRole}
        onLogout={handleLogout}
      />

      {/* Main Dynamic Workspace segregated by Role & Screen */}
      <main className="w-full">
        {/* === FARMER SPECIFIC SCREENS === */}
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={setCurrentScreen}
            onSelectMachinery={(id) => {
              setSelectedMachineryId(id);
              setCurrentScreen('machinery-detail');
            }}
          />
        )}

        {currentScreen === 'marketplace' && (
          <MarketplaceScreen
            onNavigate={setCurrentScreen}
            onSelectMachinery={(id) => {
              setSelectedMachineryId(id);
            }}
          />
        )}

        {currentScreen === 'machinery-detail' && (
          <MachineryDetailScreen
            machineryId={selectedMachineryId}
            onNavigate={setCurrentScreen}
            onSelectMachinery={setSelectedMachineryId}
          />
        )}

        {currentScreen === 'unified-booking' && (
          <UnifiedBookingScreen
            machineryId={selectedMachineryId}
            onNavigate={setCurrentScreen}
            onSelectMachinery={setSelectedMachineryId}
          />
        )}

        {currentScreen === 'nearby-map' && (
          <NearbyMapScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'labour-discovery' && (
          <LabourDiscoveryScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'my-bookings' && (
          <MyBookingsScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'ai-assistant' && (
          <AiAssistantScreen
            currentLang={currentLang}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === '3d-equipment-lab' && (
          <Equipment3DLabScreen
            onNavigate={setCurrentScreen}
            onSelectMachinery={setSelectedMachineryId}
          />
        )}

        {currentScreen === 'languages-accessibility' && (
          <LanguagesAccessibilityScreen
            currentLang={currentLang}
            onSelectLang={setCurrentLang}
            highSunlight={highSunlight}
            onToggleSunlight={() => setHighSunlight((prev) => !prev)}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* === FLEET PROVIDER SCREEN === */}
        {currentScreen === 'provider-hub' && (
          <ProviderHubScreen onNavigate={setCurrentScreen} />
        )}

        {/* === LABOUR SQUAD LEAD SCREEN === */}
        {currentScreen === 'labour-lead-portal' && (
          <LabourLeadPortalScreen currentUser={currentUser} />
        )}

        {/* === COOPERATIVE AGRI OFFICER SCREEN === */}
        {currentScreen === 'agri-officer-portal' && (
          <AgriOfficerPortalScreen currentUser={currentUser} />
        )}

        {/* === APMC MANDI & OPERATIONS (SHARED) === */}
        {currentScreen === 'operations' && (
          <OperationsScreen onNavigate={setCurrentScreen} />
        )}
      </main>
    </div>
  );
}
