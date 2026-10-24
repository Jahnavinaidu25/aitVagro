import React, { useState } from 'react';
import { AppScreen, LabourSquad } from '../types';
import { LABOUR_SQUADS } from '../data/mockData';
import {
  Users,
  Search,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  PhoneCall,
  Bus,
  Award,
  Sparkles
} from 'lucide-react';

interface LabourDiscoveryScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectSquad?: (squad: LabourSquad) => void;
}

export const LabourDiscoveryScreen: React.FC<LabourDiscoveryScreenProps> = ({
  onNavigate,
  onSelectSquad,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [transportOnly, setTransportOnly] = useState(false);
  const [selectedSquadForBooking, setSelectedSquadForBooking] = useState<LabourSquad | null>(null);
  const [bookingDays, setBookingDays] = useState(2);

  const specialties = [
    { id: 'all', label: 'All Operations' },
    { id: 'paddy', label: 'Paddy Transplantation' },
    { id: 'sugarcane', label: 'Sugarcane Cutting' },
    { id: 'spraying', label: 'Chemical Spraying' },
    { id: 'weeding', label: 'Precision Weeding' },
  ];

  const filteredSquads = LABOUR_SQUADS.filter((squad) => {
    if (selectedSpecialty !== 'all') {
      const match = squad.cropSpecialization.some((c) =>
        c.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
      if (!match) return false;
    }
    if (transportOnly && !squad.transportProvided) return false;
    if (
      searchQuery &&
      !squad.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !squad.cropSpecialization.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold border border-amber-500/20 mb-1">
            <Users className="w-3.5 h-3.5" />
            Agricultural Labour & Contractor Squads
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಕೃಷಿ ಕಾರ್ಮಿಕರ ತಂಡ ಮತ್ತು ಕಾಂಟ್ರಾಕ್ಟ್ / Verified Labour Squads
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Pre-vetted agricultural crews with SHG certification, group insurance, and direct escrow wage guarantee
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-2xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition shrink-0"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Paddy transplanting, Sugarcane harvesting, Spraying..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface border border-outline-variant/40 text-sm font-semibold text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
            />
          </div>

          <button
            onClick={() => setTransportOnly(!transportOnly)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              transportOnly
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-surface border-outline-variant/50 text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Transport Provided</span>
          </button>
        </div>

        {/* Specialty Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSpecialty(s.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedSpecialty === s.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-surface border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Squad Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSquads.map((squad) => (
          <div
            key={squad.id}
            className="rounded-3xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Header with image */}
              <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                <img
                  src={squad.image}
                  alt={squad.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30">
                    {squad.workersCount} Workers Crew
                  </span>
                  {squad.transportProvided && (
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Bus className="w-3 h-3" /> Transport Included
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{squad.rating} ({squad.completedJobs} jobs done)</span>
                  </div>
                  <div className="bg-black/70 px-2 py-0.5 rounded-lg border border-white/20 font-bold">
                    {squad.distanceKm} km away
                  </div>
                </div>
              </div>

              {/* Squad Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-on-surface">{squad.name}</h3>
                    <p className="text-xs text-on-surface-variant font-medium">
                      Lead: <strong>{squad.leadName}</strong> • {squad.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-800">
                      ₹{squad.wagePerPersonDay}
                    </div>
                    <div className="text-[10px] text-outline font-semibold">/ person / day</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {squad.certifiedBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/20 flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Operations Specialization */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase font-bold text-outline">Crop Operations</div>
                  <div className="flex flex-wrap gap-1.5">
                    {squad.cropSpecialization.map((crop, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-surface border border-outline-variant/30 text-on-surface font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919845210920"
                className="py-2.5 px-3 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Lead</span>
              </a>

              <button
                onClick={() => setSelectedSquadForBooking(squad)}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <span>Book Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Squad Booking Modal */}
      {selectedSquadForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="p-6 rounded-3xl bg-surface border border-outline-variant/40 shadow-2xl max-w-md w-full space-y-4 text-on-surface">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 uppercase">
                  Contractor Wage Escrow
                </span>
                <span className="text-xs text-outline">{selectedSquadForBooking.workersCount} Workers</span>
              </div>
              <h3 className="font-extrabold text-lg mt-0.5">{selectedSquadForBooking.name}</h3>
              <p className="text-xs text-on-surface-variant">Lead: {selectedSquadForBooking.leadName}</p>
            </div>

            {/* Days slider */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Field Work Duration:</span>
                <span className="font-bold text-primary">{bookingDays} Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={bookingDays}
                onChange={(e) => setBookingDays(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-outline">
                <span>1 Day</span>
                <span>3 Days</span>
                <span>7 Days</span>
              </div>
            </div>

            {/* Price calculation */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">
                  {selectedSquadForBooking.workersCount} Workers × {bookingDays} Days @ ₹{selectedSquadForBooking.wagePerPersonDay}/day:
                </span>
                <span className="font-bold text-on-surface">
                  ₹{(selectedSquadForBooking.workersCount * bookingDays * selectedSquadForBooking.wagePerPersonDay).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Group Raitha Suraksha Insurance:</span>
                <span className="font-bold text-emerald-700">Covered Free ✓</span>
              </div>

              <div className="flex justify-between pt-2 text-sm font-extrabold">
                <span>Total Escrow Deposit:</span>
                <span className="text-xl font-black text-amber-800">
                  ₹{(selectedSquadForBooking.workersCount * bookingDays * selectedSquadForBooking.wagePerPersonDay).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setSelectedSquadForBooking(null)}
                className="py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setSelectedSquadForBooking(null);
                  onNavigate('checkout');
                }}
                className="py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <span>Proceed to Escrow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
