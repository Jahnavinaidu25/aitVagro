import React from 'react';
import { AppScreen } from '../types';
import { MACHINERY_LIST, INITIAL_BOOKINGS, MANDI_RATES, WEATHER_FORECAST } from '../data/mockData';
import {
  Tractor,
  Users,
  MapPin,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  ArrowRight,
  CloudSun,
  ChevronRight,
  CheckCircle,
  PhoneCall,
  Eye,
  Box
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectMachinery: (id: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onSelectMachinery,
}) => {
  const activeBooking = INITIAL_BOOKINGS.find((b) => b.status === 'en-route') || INITIAL_BOOKINGS[0];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Top Banner: Weather + Active Order Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Active En-Route Order Status */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0e2716] to-[#091a10] text-white border border-emerald-800/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Farmer Command Center
              </span>
              <span className="text-xs text-emerald-300/80 font-mono">
                Order #{activeBooking.id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Live Dispatch In Progress
                </div>
                <h2 className="text-xl sm:text-2xl font-black mt-0.5 text-white">
                  {activeBooking.serviceTitle}
                </h2>
                <p className="text-xs text-zinc-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>En route to {activeBooking.farmLocation} • ETA {activeBooking.etaMinutes} mins</span>
                </p>
              </div>

              {/* Start OTP Display Box */}
              <div className="p-3 rounded-2xl bg-black/50 border border-emerald-500/40 text-center shrink-0 min-w-36">
                <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                  Field Start OTP
                </div>
                <div className="text-2xl font-mono font-black text-amber-300 tracking-widest mt-0.5">
                  {activeBooking.otpCode}
                </div>
                <div className="text-[9px] text-zinc-400 mt-0.5">Share with driver on site</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ₹{activeBooking.escrowAmount.toLocaleString()} Locked in Kisan Escrow
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('nearby-map')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Track Live on Map</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Field Agro-Weather Card */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-surface-container border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
              <span className="font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-amber-500" />
                Maddur Mandya Radar
              </span>
              <span className="text-[11px] font-mono">Live</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-on-surface">
                {WEATHER_FORECAST.currentTemp}°C
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {WEATHER_FORECAST.condition}
              </span>
            </div>

            <p className="text-xs text-on-surface-variant mt-2 bg-surface p-2.5 rounded-xl border border-outline-variant/20">
              💡 <strong>Advisory:</strong> {WEATHER_FORECAST.sprayAdvisory}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
            <div className="text-[11px] text-on-surface-variant">
              Soil Moisture: <strong>{WEATHER_FORECAST.soilMoisture}</strong>
            </div>
            <button
              onClick={() => onNavigate('operations')}
              className="text-primary hover:underline font-bold text-xs flex items-center gap-0.5"
            >
              5-Day Radar <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Large Touch-Friendly Quick Action Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3 flex items-center gap-2">
          <span>Primary Kisan Operations</span>
          <span className="text-xs text-primary font-normal">/ ಪ್ರಮುಖ ಸೇವೆಗಳು</span>
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Rent Machinery */}
          <button
            onClick={() => onNavigate('marketplace')}
            className="p-4 sm:p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition text-left group shadow-sm flex flex-col justify-between h-44"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 group-hover:bg-primary group-hover:text-on-primary transition flex items-center justify-center">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-on-surface group-hover:text-primary transition">
                Rent Machinery
              </div>
              <div className="text-xs text-primary font-bold">ಯಂತ್ರ ಬಾಡಿಗೆ</div>
              <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                45-75 HP Tractors, Harvesters, Rotavators
              </p>
            </div>
            <div className="text-[11px] font-bold text-primary flex items-center gap-1">
              <span>Explore Fleet</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>

          {/* Card 2: Hire Labour Squads */}
          <button
            onClick={() => onNavigate('labour-discovery')}
            className="p-4 sm:p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-amber-500/50 transition text-left group shadow-sm flex flex-col justify-between h-44"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-on-surface group-hover:text-amber-700 transition">
                Hire Labour Squads
              </div>
              <div className="text-xs text-amber-800 font-bold">ಕಾರ್ಮಿಕರ ಪಡೆ</div>
              <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                Transplanting, cutting, spraying crews
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
              <span>View Squads</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>

          {/* Card 3: Live GPS Telemetry Map */}
          <button
            onClick={() => onNavigate('nearby-map')}
            className="p-4 sm:p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-blue-500/50 transition text-left group shadow-sm flex flex-col justify-between h-44"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-on-surface group-hover:text-blue-700 transition">
                Live GPS Tracking
              </div>
              <div className="text-xs text-blue-800 font-bold">ನಕ್ಷೆ & ಟ್ರ್ಯಾಕಿಂಗ್</div>
              <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                Real-time farm coordinates & speed
              </p>
            </div>
            <div className="text-[11px] font-bold text-blue-800 flex items-center gap-1">
              <span>Open Field Map</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>

          {/* Card 4: Kisan AI Assistant */}
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="p-4 sm:p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-purple-500/50 transition text-left group shadow-sm flex flex-col justify-between h-44"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-on-surface group-hover:text-purple-700 transition">
                Kisan AI Voice Assistant
              </div>
              <div className="text-xs text-purple-800 font-bold">ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ</div>
              <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                Pest photo scanner & crop advisory
              </p>
            </div>
            <div className="text-[11px] font-bold text-purple-800 flex items-center gap-1">
              <span>Ask AI Kisan</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>

      {/* Live APMC Mandi Ticker */}
      <div className="p-4 sm:p-5 rounded-3xl bg-surface-container border border-outline-variant/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs sm:text-sm text-on-surface">
              Live Mandya & Cauvery Basin APMC Mandi Rates / ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳು
            </span>
          </div>
          <button
            onClick={() => onNavigate('operations')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Full Mandi Board</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {MANDI_RATES.map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate('operations')}
              className="p-3 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary/40 cursor-pointer transition"
            >
              <div className="text-[11px] font-bold text-on-surface truncate">{m.crop}</div>
              <div className="text-[10px] text-on-surface-variant truncate">{m.variety}</div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-on-surface">
                  ₹{m.modalPrice}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    m.changePercent >= 0 ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {m.changePercent >= 0 ? `+${m.changePercent}%` : `${m.changePercent}%`}
                </span>
              </div>
              <div className="text-[9px] text-outline mt-0.5">per {m.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Machinery Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
              <span>Available Farm Machinery Near You</span>
              <span className="text-xs text-primary font-normal">/ ಹತ್ತಿರದ ಯಂತ್ರಗಳು</span>
            </h3>
            <p className="text-xs text-on-surface-variant">
              Pre-vetted equipment with certified drivers within 8 km of your farm
            </p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All Machinery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MACHINERY_LIST.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {item.hp} HP • {item.type}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-primary text-on-primary text-xs font-bold shadow">
                    ₹{item.pricePerHour} / hr
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{item.name}</h4>
                      <p className="text-xs text-on-surface-variant">{item.model}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-500 shrink-0">
                      ★ {item.rating}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 2).map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-surface text-on-surface-variant font-medium border border-outline-variant/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-on-surface-variant flex items-center justify-between pt-1">
                    <span>Provider: {item.providerName.split('(')[0]}</span>
                    <span className="font-semibold text-primary">{item.distanceKm} km away</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onSelectMachinery(item.id);
                    onNavigate('machinery-detail');
                  }}
                  className="py-2 px-3 rounded-xl bg-surface border border-outline-variant/50 hover:bg-surface-container-high text-xs font-semibold text-on-surface text-center transition flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>

                <button
                  onClick={() => {
                    onSelectMachinery(item.id);
                    onNavigate('unified-booking');
                  }}
                  className="py-2 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold text-center transition flex items-center justify-center gap-1 shadow"
                >
                  <span>Rent Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Trust Banner */}
      <div className="p-5 rounded-3xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">Kisan Escrow Protection Guarantee</h4>
            <p className="text-xs text-on-surface-variant">
              Every booking is insured. Payment is credited to the provider only after you confirm acreage ploughing with your OTP.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('3d-equipment-lab')}
          className="px-4 py-2 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-primary flex items-center gap-1.5 shrink-0"
        >
          <Box className="w-4 h-4" />
          <span>Launch 3D Equipment Lab</span>
        </button>
      </div>
    </div>
  );
};
