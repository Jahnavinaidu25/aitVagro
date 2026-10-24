import React, { useState } from 'react';
import { AppScreen, UserRole } from '../types';
import {
  UserCheck,
  Tractor,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';

interface RoleOnboardingScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const RoleOnboardingScreen: React.FC<RoleOnboardingScreenProps> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [farmerName, setFarmerName] = useState('Ramesh Gowda');
  const [taluk, setTaluk] = useState('Maddur Taluk, Mandya District');
  const [acreage, setAcreage] = useState('12.5');
  const [primaryCrop, setPrimaryCrop] = useState('Sugarcane & Paddy (Sona Masuri)');
  const [soilType, setSoilType] = useState('Red Sandy Clay Loam');
  const [rtcVerified, setRtcVerified] = useState(true);

  const roles = [
    {
      id: 'farmer' as UserRole,
      title: 'Kisan / Farmer',
      indicTitle: 'ರೈತ / ಕೃಷಿಕ',
      icon: UserCheck,
      description: 'Rent GPS tractors, combine harvesters, book verified labour squads with escrow protection.',
      badge: 'Most Popular',
      color: 'emerald'
    },
    {
      id: 'provider' as UserRole,
      title: 'Equipment & Fleet Provider',
      indicTitle: 'ಯಂತ್ರೋಪಕರಣ ಮಾಲೀಕ',
      icon: Tractor,
      description: 'List tractors, rotavators, harvesters, track fleet telemetry live, receive escrow payouts.',
      badge: 'Earn ₹45k+/mo',
      color: 'amber'
    },
    {
      id: 'labour' as UserRole,
      title: 'Labour Squad Lead / Contractor',
      indicTitle: 'ಕಾರ್ಮಿಕರ ಮುಖಂಡ',
      icon: Users,
      description: 'Manage crew of 8-30 workers for transplantation, harvesting, spraying with group insurance.',
      badge: 'Guaranteed Wage',
      color: 'blue'
    },
    {
      id: 'admin' as UserRole,
      title: 'Cooperative / Agri Officer',
      indicTitle: 'ಸಹಕಾರಿ ಕೃಷಿ ಅಧಿಕಾರಿ',
      icon: Building2,
      description: 'Monitor Custom Hiring Centre (CHC) telemetry, subsidy vouchers, and APMC yard quotas.',
      badge: 'Govt Portal',
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <UserCheck className="w-3.5 h-3.5" />
          Role & Land Identity Setup
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
          ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ / Select Your Role
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
          Tailor your dashboard experience: Book agricultural equipment as a farmer or manage fleet machinery and earnings as a provider.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;
          const Icon = r.icon;

          return (
            <div
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-primary-container/15 border-primary shadow-md ring-1 ring-primary'
                  : 'bg-surface-container border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-primary border border-primary/20">
                    {r.badge}
                  </span>
                </div>

                <div className="font-extrabold text-base text-on-surface">{r.title}</div>
                <div className="text-xs text-primary font-bold mt-0.5">{r.indicTitle}</div>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {r.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  {isSelected ? 'Active Role Selected ✓' : 'Click to Select'}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-outline-variant'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile & Field Data Form */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-outline-variant/30">
          <div>
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
              <span>Farmer Land & RTC Identity</span>
              <span className="text-xs text-primary font-normal">/ ಭೂಮಿ & ಪಹಣಿ ವಿವರ</span>
            </h3>
            <p className="text-xs text-on-surface-variant">
              Linked with Karnataka Bhoomi RTC database for automated plot boundary matching
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>RTC Pahani Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Full Name / ಕಿಸಾನ್ ಹೆಸರು
            </label>
            <input
              type="text"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-sm font-semibold text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Taluk & District Location
            </label>
            <input
              type="text"
              value={taluk}
              onChange={(e) => setTaluk(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-sm font-semibold text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Total Farm Holding (Acres)
            </label>
            <input
              type="number"
              value={acreage}
              onChange={(e) => setAcreage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-sm font-semibold text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Soil Type Classification
            </label>
            <input
              type="text"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-sm font-semibold text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Primary Cultivated Crops / ಬೆಳೆಗಳು
            </label>
            <input
              type="text"
              value={primaryCrop}
              onChange={(e) => setPrimaryCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-sm font-semibold text-on-surface focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onNavigate('language-selection')}
          className="text-xs font-bold text-on-surface-variant hover:text-on-surface"
        >
          ← Back to Language Selection
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {selectedRole === 'provider' ? (
            <button
              onClick={() => onNavigate('provider-hub')}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Launch Provider Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Save & Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
