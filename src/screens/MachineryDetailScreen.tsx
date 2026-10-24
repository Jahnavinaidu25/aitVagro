import React, { useState } from 'react';
import { AppScreen, MachineryItem } from '../types';
import { MACHINERY_LIST } from '../data/mockData';
import { ThreeTractorViewer } from '../components/ThreeTractorViewer';
import {
  FileText,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Fuel,
  UserCheck,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  Rotate3d,
  Layers,
  Wrench,
  Gauge,
  Box,
  Sparkles
} from 'lucide-react';

interface MachineryDetailScreenProps {
  machineryId: string;
  onNavigate: (screen: AppScreen) => void;
  onSelectMachinery: (id: string) => void;
}

export const MachineryDetailScreen: React.FC<MachineryDetailScreenProps> = ({
  machineryId,
  onNavigate,
  onSelectMachinery,
}) => {
  const machinery = MACHINERY_LIST.find((m) => m.id === machineryId) || MACHINERY_LIST[0];
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [activeTab, setActiveTab] = useState<'specs' | 'implements' | 'reviews'>('specs');

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Back button & Screen indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('marketplace')}
          className="text-xs font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <FileText className="w-3.5 h-3.5" />
          Machinery Specs & 3D Inspection
        </div>
      </div>

      {/* Main Hero Viewer: 3D Twin vs Photo Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-surface-container shadow-lg">
            {/* Toggle Switch */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-2xl border border-white/20">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5" />
                <span>Three.js 3D Twin</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  viewMode === 'photo'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <span>Field Photo</span>
              </button>
            </div>

            {viewMode === '3d' ? (
              <ThreeTractorViewer
                implementType={machinery.category === 'rotavator' ? 'rotavator' : 'seeder'}
                className="h-[420px] w-full"
              />
            ) : (
              <div className="h-[420px] w-full bg-zinc-950 relative">
                <img
                  src={machinery.image}
                  alt={machinery.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-center">
              <Gauge className="w-5 h-5 mx-auto text-primary mb-1" />
              <div className="text-[10px] uppercase font-bold text-outline">Engine Power</div>
              <div className="text-sm font-black text-on-surface">{machinery.hp} HP • 4 Cylinders</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-center">
              <Wrench className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <div className="text-[10px] uppercase font-bold text-outline">PTO Output</div>
              <div className="text-sm font-black text-on-surface">45.4 HP • 540 RPM</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-center">
              <Layers className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <div className="text-[10px] uppercase font-bold text-outline">Lift Capacity</div>
              <div className="text-sm font-black text-on-surface">1,700 kg Hydraulics</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-center">
              <Fuel className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <div className="text-[10px] uppercase font-bold text-outline">Fuel Scheme</div>
              <div className="text-sm font-black text-on-surface">{machinery.fuelScheme || 'Included'}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Specs, Provider Card & Booking CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {machinery.type}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {machinery.rating} ({machinery.reviewsCount} reviews)
                </span>
              </div>
              <h1 className="text-2xl font-black text-on-surface mt-1.5">{machinery.name}</h1>
              <p className="text-xs text-on-surface-variant font-medium">{machinery.model}</p>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">Standard Rate:</span>
                <div className="text-2xl font-black text-primary">
                  ₹{machinery.pricePerHour}
                  <span className="text-xs font-normal text-on-surface-variant"> / hour</span>
                </div>
              </div>
              {machinery.pricePerAcre && (
                <div className="flex items-baseline justify-between pt-1 border-t border-outline-variant/20 text-xs">
                  <span className="text-on-surface-variant">Acreage Rate (Full Field):</span>
                  <span className="font-bold text-on-surface">₹{machinery.pricePerAcre} / acre</span>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Certified Driver included • Zero extra travel surcharge</span>
              </div>
            </div>

            {/* Provider Card */}
            <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-outline">
                Machinery Fleet Provider
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{machinery.providerName}</h4>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <span>{machinery.providerLocation}</span>
                    <span>•</span>
                    <span className="text-primary font-bold">{machinery.distanceKm} km away</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Aadhaar Vetted</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                onSelectMachinery(machinery.id);
                onNavigate('unified-booking');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>Proceed to Unified Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="text-center text-[11px] text-on-surface-variant flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Covered by Kisan Escrow Protection • 100% Refund Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Field Reviews */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-bold pb-1 transition border-b-2 ${
              activeTab === 'specs'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            Technical Specifications & Implements
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-1 transition border-b-2 ${
              activeTab === 'reviews'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            Farmer Reviews & Field Ratings ({machinery.reviewsCount})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <h5 className="font-bold text-sm text-on-surface">Engine & Transmission</h5>
              <p className="text-on-surface-variant">
                Mahindra m-Boost 4-cylinder high-torque diesel engine, 12 Forward + 3 Reverse gears with side-shift transmission. Best in class for deep wetland puddle harrowing and hard dry sugarcane furrows.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-on-surface-variant pt-1">
                <li>Braking: Oil Immersed Multi-disc Brakes (OIB)</li>
                <li>Steering: Hydrostatic Power Steering for tight headland turns</li>
                <li>Fuel Tank Capacity: 60 Litres with reserve warning indicator</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-sm text-on-surface">Compatible Implements</h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-surface border border-outline-variant/30 font-semibold text-on-surface">
                  7-Blade Shaktiman Rotavator
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-surface border border-outline-variant/30 font-semibold text-on-surface">
                  3-Bottom Disc Plough
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-surface border border-outline-variant/30 font-semibold text-on-surface">
                  9-Tyne Multi-crop Seed Drill
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-surface border border-outline-variant/30 font-semibold text-on-surface">
                  Hydraulic Laser Land Leveler
                </span>
              </div>
              <p className="text-on-surface-variant pt-2">
                Hydraulic quick-release couplers allow switching implements in under 8 minutes directly at your farm gate.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-on-surface">Chandrashekar (Maddur)</span>
                <span className="text-amber-500 font-bold text-xs">★ 5.0 • Oct 16, 2024</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                "Arrived punctually at 6:30 AM for 4.5 acres of wetland paddy rotavator harrowing. Driver Babu ploughed precisely along the bund edges without damaging irrigation canals."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-on-surface">Kempanna (Koppa Hobli)</span>
                <span className="text-amber-500 font-bold text-xs">★ 4.9 • Oct 10, 2024</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                "Clean machine with excellent fuel efficiency. Completed deep tillage on 3 acres of sugarcane field in 2 hours flat. Escrow release was smooth."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
