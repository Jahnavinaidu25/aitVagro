import React, { useState } from 'react';
import { AppScreen, MachineryItem } from '../types';
import { MACHINERY_LIST } from '../data/mockData';
import {
  Tractor,
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Eye,
  Fuel,
  UserCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface MarketplaceScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectMachinery: (id: string) => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onNavigate,
  onSelectMachinery,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [driverIncludedFilter, setDriverIncludedFilter] = useState(false);
  const [maxDistance, setMaxDistance] = useState(15);
  const [minHp, setMinHp] = useState(40);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'tractor', label: 'Tractors 4WD' },
    { id: 'harvester', label: 'Paddy Harvesters' },
    { id: 'rotavator', label: 'Heavy Rotavators' },
    { id: 'seeder', label: 'Multi-crop Seeders' },
  ];

  const filteredMachinery = MACHINERY_LIST.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (driverIncludedFilter && !item.driverIncluded) return false;
    if (item.distanceKm > maxDistance) return false;
    if (item.hp < minHp) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-1">
            <Tractor className="w-3.5 h-3.5" />
            Machinery Fleet Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಕೃಷಿ ಯಂತ್ರೋಪಕರಣಗಳ ಮಾರುಕಟ್ಟೆ / Farm Machinery Grid
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Discover verified tractors, combine harvesters, and rotavators within 15 km of your Mandya farm
          </p>
        </div>

        {/* Quick link to 3D studio */}
        <button
          onClick={() => onNavigate('3d-equipment-lab')}
          className="px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-primary flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Open 3D Equipment Inspector</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Mahindra, Kubota, Rotavator, HP rating..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface border border-outline-variant/40 text-sm font-semibold text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setDriverIncludedFilter(!driverIncludedFilter)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                driverIncludedFilter
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface border-outline-variant/50 text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Certified Driver</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-outline-variant/50 text-xs font-semibold text-on-surface">
              <span>Radius:</span>
              <input
                type="range"
                min="3"
                max="25"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-20 accent-primary"
              />
              <span className="font-mono text-primary font-bold">{maxDistance}km</span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
        <span>Showing <strong>{filteredMachinery.length}</strong> verified equipment units ready for field dispatch</span>
        <span className="text-primary font-medium">All units KYC & Telemetry Verified ✓</span>
      </div>

      {/* Machinery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMachinery.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {item.hp} HP
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30">
                    {item.type}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      item.status === 'Ready for Hire'
                        ? 'bg-emerald-500 text-white'
                        : item.status === 'In Field'
                        ? 'bg-amber-500 text-black'
                        : 'bg-zinc-600 text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{item.rating} ({item.reviewsCount} reviews)</span>
                  </div>
                  <div className="font-bold bg-black/70 px-2 py-0.5 rounded-lg border border-white/20">
                    {item.distanceKm} km away
                  </div>
                </div>
              </div>

              {/* Specs & Provider Details */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-extrabold text-base text-on-surface group-hover:text-primary transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5 font-medium">
                    {item.model}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="p-3 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-outline">Hourly Rate</div>
                    <div className="text-lg font-black text-primary">₹{item.pricePerHour}<span className="text-xs font-normal text-on-surface-variant">/hr</span></div>
                  </div>
                  {item.pricePerAcre && (
                    <div className="text-right border-l border-outline-variant/30 pl-4">
                      <div className="text-[10px] uppercase font-bold text-outline">Acreage Rate</div>
                      <div className="text-base font-bold text-on-surface">₹{item.pricePerAcre}<span className="text-xs font-normal text-on-surface-variant">/acre</span></div>
                    </div>
                  )}
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-surface text-on-surface-variant border border-outline-variant/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Provider info */}
                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">
                      P
                    </div>
                    <span className="font-medium truncate max-w-44">{item.providerName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>KYC Vetted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  onSelectMachinery(item.id);
                  onNavigate('machinery-detail');
                }}
                className="py-2.5 px-3 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Specs</span>
              </button>

              <button
                onClick={() => {
                  onSelectMachinery(item.id);
                  onNavigate('unified-booking');
                }}
                className="py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
