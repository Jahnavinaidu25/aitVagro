import React, { useState } from 'react';
import { AppScreen } from '../types';
import { MACHINERY_LIST, FARM_PLOTS } from '../data/mockData';
import {
  CalendarCheck,
  MapPin,
  Clock,
  Layers,
  UserCheck,
  Fuel,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles
} from 'lucide-react';

interface UnifiedBookingScreenProps {
  machineryId: string;
  onNavigate: (screen: AppScreen) => void;
  onSelectMachinery: (id: string) => void;
  onConfirmBookingDetails?: (details: any) => void;
}

export const UnifiedBookingScreen: React.FC<UnifiedBookingScreenProps> = ({
  machineryId,
  onNavigate,
  onSelectMachinery,
}) => {
  const machinery = MACHINERY_LIST.find((m) => m.id === machineryId) || MACHINERY_LIST[0];

  const [selectedPlot, setSelectedPlot] = useState(FARM_PLOTS[0].id);
  const [selectedShift, setSelectedShift] = useState<'morning' | 'afternoon' | 'fullday'>('morning');
  const [bookingDate, setBookingDate] = useState('Tomorrow, 25 Oct');
  const [selectedImplement, setSelectedImplement] = useState('Heavy 7-Blade Rotavator');
  const [driverIncluded, setDriverIncluded] = useState(true);
  const [dieselIncluded, setDieselIncluded] = useState(true);
  const [durationHours, setDurationHours] = useState(4);

  const activePlot = FARM_PLOTS.find((p) => p.id === selectedPlot) || FARM_PLOTS[0];

  // Pricing calculations
  const baseRate = machinery.pricePerHour;
  const hours = selectedShift === 'fullday' ? 8 : 4;
  const implementFee = selectedImplement.includes('Rotavator') ? 200 : 350;
  const fuelAllowance = dieselIncluded ? 600 : 0;
  const totalAmount = baseRate * hours + implementFee + fuelAllowance;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('machinery-detail')}
          className="text-xs font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Spec Sheet</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <CalendarCheck className="w-3.5 h-3.5" />
          Unified Booking Flow
        </div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
          ಏಕೀಕೃತ ಕೃಷಿ ಕಾಯ್ದಿರಿಸುವಿಕೆ / Field Booking Setup
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Configuring <strong>{machinery.name}</strong> for {activePlot.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Configuration */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Plot Selection */}
          <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                1. Select Registered Farm Plot / ಜಮೀನು ಆಯ್ಕೆ
              </label>
              <span className="text-[11px] text-outline font-semibold">RTC Geo-Fenced</span>
            </div>

            <div className="space-y-2">
              {FARM_PLOTS.map((plot) => {
                const isSelected = selectedPlot === plot.id;
                return (
                  <div
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot.id)}
                    className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary-container/15 border-primary ring-1 ring-primary'
                        : 'bg-surface border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-on-surface">{plot.name}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {plot.acreage} Acres • Crop: {plot.crop} • {plot.soil}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-outline-variant'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Implement Attachment */}
          <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              2. Implement Attachment / ಉಪಕರಣ ಜೋಡಣೆ
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Heavy 7-Blade Rotavator', desc: 'Deep soil harrowing', fee: '+₹200' },
                { name: '3-Bottom Disc Plough', desc: 'Hard ground breaking', fee: '+₹300' },
                { name: 'Multi-crop Seed Drill', desc: 'Sowing & fertilizer', fee: '+₹350' },
                { name: 'Laser Land Leveler', desc: 'Water table grading', fee: '+₹400' },
              ].map((imp) => (
                <button
                  key={imp.name}
                  type="button"
                  onClick={() => setSelectedImplement(imp.name)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    selectedImplement === imp.name
                      ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <div className="font-bold text-xs text-on-surface">{imp.name}</div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">{imp.desc}</div>
                  <div className="text-[10px] font-bold text-primary mt-1">{imp.fee}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Date & Shift Picker */}
          <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              3. Date & Field Work Shift / ಕೆಲಸದ ಸಮಯ
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'morning', label: 'Morning Shift', time: '06:30 - 11:30 AM (4h)' },
                { id: 'afternoon', label: 'Afternoon Shift', time: '01:30 - 05:30 PM (4h)' },
                { id: 'fullday', label: 'Full Day (8h)', time: '06:30 AM - 04:30 PM' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedShift(s.id as any)}
                  className={`p-2.5 rounded-2xl border text-center transition ${
                    selectedShift === s.id
                      ? 'bg-primary text-on-primary font-bold shadow'
                      : 'bg-surface border-outline-variant/30 text-on-surface hover:bg-surface-container-high text-xs'
                  }`}
                >
                  <div className="font-bold text-xs">{s.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{s.time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Breakdown & Checkout CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 shadow-lg space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Transparent Cost Estimate
              </div>
              <h3 className="text-xl font-bold text-on-surface mt-1">
                Kisan Escrow Quote
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Funds remain locked in Escrow until you inspect the ploughed acreage
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Tractor Base Hire ({hours} hrs @ ₹{baseRate}/hr):</span>
                <span className="font-bold text-on-surface">₹{(baseRate * hours).toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Attachment ({selectedImplement}):</span>
                <span className="font-bold text-on-surface">₹{implementFee}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Certified Driver Allowance:</span>
                <span className="font-bold text-emerald-700">Included Free ✓</span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Diesel Fuel Arrangement:</span>
                <span className="font-bold text-on-surface">
                  {dieselIncluded ? `₹${fuelAllowance} (Included)` : 'Self Supplied'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Kisan Escrow Insurance Guarantee:</span>
                <span className="font-bold text-emerald-700">₹0 (Sponsored)</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 text-base">
                <span className="font-extrabold text-on-surface">Total Escrow Amount:</span>
                <span className="text-2xl font-black text-primary">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-on-surface-variant flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>100% Escrow Safety:</strong> Payment is not transferred to the provider until you enter your 4-digit OTP at the end of the shift.
              </span>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Confirm & Lock in Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
