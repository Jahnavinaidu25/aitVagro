import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEFAULT_PROFILES } from '../data/mockData';
import {
  User,
  UserCheck,
  Tractor,
  Users,
  Building2,
  X,
  Check,
  LogOut,
  ShieldCheck,
  Save,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onSwitchRole,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [district, setDistrict] = useState(currentUser.district);
  const [landAcreage, setLandAcreage] = useState(currentUser.landAcreage || 12.5);
  const [soilType, setSoilType] = useState(currentUser.soilType || 'Red Sandy Clay Loam');
  const [primaryCrop, setPrimaryCrop] = useState(currentUser.primaryCrop || 'Sugarcane & Paddy');
  const [rtcPahaniNumber, setRtcPahaniNumber] = useState(currentUser.rtcPahaniNumber || 'KA-MDY-2024-0982');
  const [fleetName, setFleetName] = useState(currentUser.fleetName || 'Sree Maruthi Agro Fleet');
  const [squadName, setSquadName] = useState(currentUser.squadName || "Kaveri Women's SHG");
  const [officerDesignation, setOfficerDesignation] = useState(currentUser.officerDesignation || 'Assistant Director of Agriculture');
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name,
      phone,
      location,
      district,
      avatarInitials: name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      landAcreage,
      soilType,
      primaryCrop,
      rtcPahaniNumber,
      fleetName,
      squadName,
      officerDesignation,
    };
    onUpdateProfile(updated);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 2000);
  };

  const roles = [
    { id: 'farmer' as UserRole, label: 'Farmer / Kisan', icon: UserCheck, desc: 'Rent machinery & labour' },
    { id: 'provider' as UserRole, label: 'Fleet Provider', icon: Tractor, desc: 'Manage fleet & payouts' },
    { id: 'labour' as UserRole, label: 'Labour Squad Lead', icon: Users, desc: 'Crew roster & wage escrow' },
    { id: 'admin' as UserRole, label: 'Agri Officer', icon: Building2, desc: 'CHC & subsidies' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden text-on-surface flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary font-black text-lg flex items-center justify-center shadow">
              {currentUser.avatarInitials || 'RG'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-on-surface">{currentUser.name}</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {currentUser.role.toUpperCase()} PORTAL
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {currentUser.location} • {currentUser.district}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save feedback toast */}
        {saveToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Switch Role Gateway */}
          <div className="p-4 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Switch Active Role Portal / ಪಾತ್ರ ಬದಲಾವಣೆ
              </span>
              <span className="text-[11px] text-outline font-semibold">Instant Switch</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roles.map((r) => {
                const isCurrent = currentUser.role === r.id;
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      onSwitchRole(r.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-primary-container/20 border-primary ring-1 ring-primary shadow-sm'
                        : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isCurrent ? 'text-primary' : 'text-outline'}`} />
                    <div>
                      <div className="font-bold text-xs text-on-surface">{r.label}</div>
                      <div className="text-[10px] text-on-surface-variant line-clamp-1">{r.desc}</div>
                    </div>
                    {isCurrent && (
                      <span className="text-[9px] font-bold text-primary mt-1.5">Active ✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Edit Profile Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-bold text-sm text-on-surface">Edit Profile Details / ಪ್ರೊಫೈಲ್ ತಿದ್ದುಪಡಿ</h3>
              <span className="text-[11px] text-primary font-semibold">Government KYC Linked</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Full Name / ಪೂರ್ಣ ಹೆಸರು
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Phone Number (+91)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Village / Hobli / Farm Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  District & State
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>

              {/* Role specific dynamic fields */}
              {currentUser.role === 'farmer' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Total Farm Holding (Acres)
                    </label>
                    <input
                      type="number"
                      value={landAcreage}
                      onChange={(e) => setLandAcreage(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Soil Type
                    </label>
                    <input
                      type="text"
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Primary Crops
                    </label>
                    <input
                      type="text"
                      value={primaryCrop}
                      onChange={(e) => setPrimaryCrop(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Karnataka RTC Pahani Number
                    </label>
                    <input
                      type="text"
                      value={rtcPahaniNumber}
                      onChange={(e) => setRtcPahaniNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                </>
              )}

              {currentUser.role === 'provider' && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Fleet Enterprise Name
                  </label>
                  <input
                    type="text"
                    value={fleetName}
                    onChange={(e) => setFleetName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              {currentUser.role === 'labour' && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Labour Squad / SHG Name
                  </label>
                  <input
                    type="text"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              {currentUser.role === 'admin' && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Official Designation & Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={officerDesignation}
                    onChange={(e) => setOfficerDesignation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl border border-red-500/40 text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Account</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
