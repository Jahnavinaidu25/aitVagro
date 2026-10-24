import React, { useState } from 'react';
import { AppScreen } from '../types';
import { MACHINERY_LIST } from '../data/mockData';
import {
  Layers,
  Tractor,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Gauge,
  Fuel,
  Wrench,
  Download,
  AlertCircle
} from 'lucide-react';

interface ProviderHubScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const ProviderHubScreen: React.FC<ProviderHubScreenProps> = ({ onNavigate }) => {
  const [escrowBalance, setEscrowBalance] = useState(42800);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [newMachineName, setNewMachineName] = useState('Sonalika Tiger DI 55');
  const [newMachineHp, setNewMachineHp] = useState(55);
  const [newMachineRate, setNewMachineRate] = useState(900);

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => {
      setEscrowBalance(0);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold border border-amber-500/20 mb-1">
            <Layers className="w-3.5 h-3.5" />
            Fleet Owner & Provider Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಯಂತ್ರ ಮಾಲೀಕರ ಆದಾಯ & ನಿಯಂತ್ರಣ / Provider Fleet Hub
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Fleet Telemetry, Driver Dispatches & Automated Escrow Payouts for Sree Maruthi Agro Fleet
          </p>
        </div>

        <button
          onClick={() => setShowAddMachineModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Machine to Fleet</span>
        </button>
      </div>

      {/* Revenue & Escrow Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ready Escrow Payout */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border border-emerald-700/50 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span className="font-semibold uppercase tracking-wider">Escrow Ready Payout</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black mt-2 text-white">
              ₹{escrowBalance.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-300 mt-1">Verified ploughed acreage completed</p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            {escrowBalance > 0 ? (
              <button
                disabled={payoutRequested}
                onClick={handleRequestPayout}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold transition shadow"
              >
                {payoutRequested ? 'Transferring to Bank...' : 'Withdraw to Bank (IMPS)'}
              </button>
            ) : (
              <div className="text-center text-xs text-emerald-300 font-bold py-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>₹42,800 Transferred to SBI Account</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Monthly Fleet Revenue */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">October Gross Earnings</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-black text-on-surface mt-2">₹1,84,500</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">+18.4% vs September</p>
          </div>
          <div className="text-[10px] text-outline pt-3 border-t border-outline-variant/20">
            44 Completed shifts • 182 Hours logged
          </div>
        </div>

        {/* Card 3: Active Fleet Units */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">Active Fleet Units</span>
              <Tractor className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-on-surface mt-2">5 Units Online</div>
            <p className="text-[11px] text-on-surface-variant mt-1">3 In Field • 1 Idle • 1 Maint</p>
          </div>
          <div className="text-[10px] text-outline pt-3 border-t border-outline-variant/20">
            94.2% Fleet Utilization this season
          </div>
        </div>

        {/* Card 4: Driver Squad Status */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">Certified Operators</span>
              <Wrench className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-on-surface mt-2">4 Drivers Active</div>
            <p className="text-[11px] text-on-surface-variant mt-1">All with valid Heavy Tractor DL</p>
          </div>
          <div className="text-[10px] text-outline pt-3 border-t border-outline-variant/20">
            Average Customer Rating: 4.9 ★
          </div>
        </div>
      </div>

      {/* Fleet Live Telemetry Status Table */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-on-surface">
            Live Machinery Fleet Telemetry Roster
          </h3>
          <button
            onClick={() => onNavigate('nearby-map')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Open Global Field Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Machine Details</th>
                <th className="p-3.5">Assigned Operator</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Current Speed & Fuel</th>
                <th className="p-3.5">Daily Earnings</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {MACHINERY_LIST.map((mach, i) => (
                <tr key={mach.id} className="hover:bg-surface-container-high transition">
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-on-surface">{mach.name}</div>
                    <div className="text-[11px] text-on-surface-variant">
                      {mach.hp} HP • {mach.model}
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-on-surface">
                    {i === 0 ? 'Babu K. (Mandya)' : i === 1 ? 'Somanna (Koppa)' : 'Nagaraju'}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        mach.status === 'Ready for Hire'
                          ? 'bg-emerald-100 text-emerald-800'
                          : mach.status === 'In Field'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {mach.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-on-surface">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{i === 0 ? '18 km/h' : '0 km/h'}</span>
                      <span className="text-outline">•</span>
                      <span className="text-emerald-700 font-semibold">{80 - i * 8}% Diesel</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-primary">
                    ₹{(mach.pricePerHour * 4).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onNavigate('3d-equipment-lab')}
                      className="px-3 py-1.5 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-highest font-bold text-primary transition"
                    >
                      Inspect 3D
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Machine Modal */}
      {showAddMachineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="p-6 rounded-3xl bg-surface border border-outline-variant/40 shadow-2xl max-w-md w-full space-y-4 text-on-surface">
            <div>
              <span className="text-xs font-bold text-primary uppercase">Fleet Registration</span>
              <h3 className="font-extrabold text-lg">Add New Tractor or Implement</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Machine Model & Brand
                </label>
                <input
                  type="text"
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Horsepower (HP)
                  </label>
                  <input
                    type="number"
                    value={newMachineHp}
                    onChange={(e) => setNewMachineHp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Hourly Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={newMachineRate}
                    onChange={(e) => setNewMachineRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Attachable Implements
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/40 text-primary font-semibold">
                    Rotavator ✓
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/40 text-primary font-semibold">
                    Disc Plough ✓
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/40 text-primary font-semibold">
                    Laser Leveler ✓
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowAddMachineModal(false)}
                className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Unit "${newMachineName}" submitted for APMC & RTO Verification!`);
                  setShowAddMachineModal(false);
                }}
                className="py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold"
              >
                Register Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
