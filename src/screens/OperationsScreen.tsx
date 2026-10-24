import React, { useState } from 'react';
import { AppScreen } from '../types';
import { MANDI_RATES, WEATHER_FORECAST, MandiRate } from '../data/mockData';
import {
  TrendingUp,
  CloudSun,
  Droplets,
  Wind,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface OperationsScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const OperationsScreen: React.FC<OperationsScreenProps> = ({ onNavigate }) => {
  const [selectedCrop, setSelectedCrop] = useState<MandiRate>(MANDI_RATES[0]);
  const [marketFilter, setMarketFilter] = useState<'all' | 'mandya' | 'mysuru'>('all');

  const filteredRates = MANDI_RATES.filter((r) => {
    if (marketFilter === 'mandya') return r.district.includes('Mandya');
    if (marketFilter === 'mysuru') return r.district.includes('Mysuru');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/20 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            APMC Mandi Rates, Weather Radar & Soil Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು & ಹವಾಮಾನ / Mandi & Operations Hub
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Live commodity prices from Mandya, Mysuru, and Ramanagara APMC yards coupled with real-time harvest weather radar
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-2xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition shrink-0"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Weather Radar Banner */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-on-surface">
              {WEATHER_FORECAST.location} • Sowing & Spray Radar
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Optimal Field Window Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 text-center">
            <div className="text-[10px] uppercase font-bold text-outline">Current Temp</div>
            <div className="text-2xl font-black text-on-surface mt-0.5">
              {WEATHER_FORECAST.currentTemp}°C
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">{WEATHER_FORECAST.condition}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 text-center">
            <Droplets className="w-4 h-4 mx-auto text-blue-500 mb-0.5" />
            <div className="text-[10px] uppercase font-bold text-outline">Relative Humidity</div>
            <div className="text-2xl font-black text-on-surface mt-0.5">
              {WEATHER_FORECAST.humidity}%
            </div>
            <div className="text-[10px] text-on-surface-variant">Dew Point: 21°C</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 text-center">
            <Wind className="w-4 h-4 mx-auto text-teal-500 mb-0.5" />
            <div className="text-[10px] uppercase font-bold text-outline">Wind Velocity</div>
            <div className="text-2xl font-black text-on-surface mt-0.5">
              12 <span className="text-xs font-normal">km/h</span>
            </div>
            <div className="text-[10px] text-on-surface-variant">Direction: ENE</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 text-center">
            <div className="text-[10px] uppercase font-bold text-outline">Soil Moisture (15cm)</div>
            <div className="text-2xl font-black text-emerald-800 mt-0.5">
              34% VWC
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">Good Field Holding</div>
          </div>
        </div>

        {/* 5-Day forecast cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {WEATHER_FORECAST.days.map((d) => (
            <div
              key={d.day}
              className="p-3 rounded-2xl bg-surface border border-outline-variant/30 text-center text-xs"
            >
              <div className="font-bold text-on-surface">{d.day}</div>
              <div className="text-sm font-black text-primary my-1">{d.temp}</div>
              <div className="text-[11px] text-on-surface-variant">{d.condition}</div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">Rain: {d.rain}</div>
            </div>
          ))}
        </div>
      </div>

      {/* APMC Mandi Rates Grid & MSP Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Commodity Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-on-surface">
                Karnataka APMC Live Commodity Yard Rates
              </h3>
              <p className="text-xs text-on-surface-variant">
                Updated every 15 minutes directly from e-NAM / KSAMB gateway
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 'mandya', 'mysuru'] as const).map((mf) => (
                <button
                  key={mf}
                  onClick={() => setMarketFilter(mf)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition ${
                    marketFilter === mf
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {mf}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Crop & Variety</th>
                  <th className="p-3.5">APMC Market</th>
                  <th className="p-3.5">Modal Price</th>
                  <th className="p-3.5">Govt MSP</th>
                  <th className="p-3.5">Trend</th>
                  <th className="p-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredRates.map((crop) => {
                  const isSelected = selectedCrop.id === crop.id;
                  const isAboveMsp = crop.modalPrice >= crop.mspGovt;

                  return (
                    <tr
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-primary-container/20 font-semibold'
                          : 'hover:bg-surface-container-high'
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-sm text-on-surface">{crop.crop}</div>
                        <div className="text-[11px] text-on-surface-variant">{crop.variety}</div>
                      </td>
                      <td className="p-3.5 font-medium text-on-surface">
                        <div>{crop.market}</div>
                        <div className="text-[10px] text-outline">{crop.district}</div>
                      </td>
                      <td className="p-3.5 font-black text-sm text-primary">
                        ₹{crop.modalPrice}
                        <span className="text-[10px] font-normal text-on-surface-variant">
                          /{crop.unit}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-on-surface-variant">
                        ₹{crop.mspGovt}
                        <span
                          className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            isAboveMsp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {isAboveMsp ? 'Above MSP' : 'Below MSP'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold ${
                            crop.changePercent >= 0 ? 'text-emerald-700' : 'text-red-700'
                          }`}
                        >
                          {crop.changePercent >= 0 ? `+${crop.changePercent}%` : `${crop.changePercent}%`}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="text-primary font-bold text-xs">View →</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Crop Analytics & Sell Advisory */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Crop Pricing Analysis
              </span>
              <h3 className="text-xl font-bold text-on-surface mt-1">
                {selectedCrop.crop}
              </h3>
              <p className="text-xs text-on-surface-variant">
                {selectedCrop.variety} • {selectedCrop.market}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-outline uppercase font-bold">Today's Modal Rate</span>
                <span className="text-2xl font-black text-primary">
                  ₹{selectedCrop.modalPrice}
                </span>
              </div>

              <div className="space-y-1.5 text-xs pt-1 border-t border-outline-variant/20">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Minimum Yard Price:</span>
                  <span className="font-semibold text-on-surface">₹{selectedCrop.minPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Maximum Peak Price:</span>
                  <span className="font-semibold text-on-surface">₹{selectedCrop.maxPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Official Govt MSP:</span>
                  <span className="font-bold text-emerald-800">₹{selectedCrop.mspGovt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Daily Yard Arrival:</span>
                  <span className="font-semibold text-on-surface">
                    {selectedCrop.arrivalTons.toLocaleString()} {selectedCrop.unit}s
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-on-surface-variant space-y-1">
              <div className="font-bold text-primary flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>Harvest & Logistics Recommendation</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Prices for {selectedCrop.crop} are currently favorable. Sona Masuri mill gate demand is high in Mysuru/Mandya. We recommend harvesting within the next 48 hours before Wednesday showers.
              </p>
            </div>

            <button
              onClick={() => onNavigate('marketplace')}
              className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center justify-center gap-2 shadow"
            >
              <span>Book Harvester Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
