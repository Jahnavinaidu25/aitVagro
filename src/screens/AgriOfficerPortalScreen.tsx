import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Tractor,
  TrendingUp,
  FileCheck,
  Check,
  X,
  Send,
  MapPin,
  AlertTriangle,
  Award,
  Bell
} from 'lucide-react';

interface AgriOfficerPortalScreenProps {
  currentUser: UserProfile;
}

export const AgriOfficerPortalScreen: React.FC<AgriOfficerPortalScreenProps> = ({ currentUser }) => {
  const [subsidyApplications, setSubsidyApplications] = useState([
    {
      id: 'sub-101',
      farmerName: 'Ramesh Gowda',
      taluk: 'Maddur Taluk',
      service: 'Combine Harvester 4 Hours (Paddy)',
      rentalCost: 7200,
      subsidyAmount: 3600, // 50%
      rtcNumber: 'KA-MDY-2024-0982',
      status: 'pending'
    },
    {
      id: 'sub-102',
      farmerName: 'Basavaraj Patil',
      taluk: 'Koppa Hobli',
      service: 'Mahindra 585 DI Rotavator 6 Hours',
      rentalCost: 5100,
      subsidyAmount: 2550,
      rtcNumber: 'KA-MDY-2024-1104',
      status: 'pending'
    },
    {
      id: 'sub-103',
      farmerName: 'Chennamma K.',
      taluk: 'Srirangapatna',
      service: 'Multi-crop Seed Drill Sowing (Ragi)',
      rentalCost: 3800,
      subsidyAmount: 1900,
      rtcNumber: 'KA-MDY-2024-0418',
      status: 'pending'
    }
  ]);

  const [broadcastText, setBroadcastText] = useState(
    'ಮಂಡ್ಯ ಜಿಲ್ಲಾ ಕೃಷಿ ಇಲಾಖೆ ಸಲಹೆ: ಬುಧವಾರ ಸಂಜೆ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇರುವುದರಿಂದ, ಕಟಾವಿಗೆ ಬಂದಿರುವ ಭತ್ತವನ್ನು ಮುಂದಿನ ೪೮ ಗಂಟೆಗಳಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ ಎಪಿಎಂಸಿ ಆವರಣಕ್ಕೆ ತಲುಪಿಸಿ.'
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleApproveSubsidy = (id: string) => {
    setSubsidyApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'approved' } : app))
    );
  };

  const handleRejectSubsidy = (id: string) => {
    setSubsidyApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'rejected' } : app))
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const chcCentres = [
    { name: 'Maddur Central CHC', tractors: 6, harvesters: 3, inField: 7, idle: 2 },
    { name: 'Koppa Village CHC', tractors: 5, harvesters: 2, inField: 6, idle: 1 },
    { name: 'Mandya APMC Yard CHC', tractors: 8, harvesters: 4, inField: 10, idle: 2 },
    { name: 'Gejjalagere Farmer Cooperative', tractors: 5, harvesters: 3, inField: 7, idle: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24 text-on-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-800 text-xs font-bold border border-purple-500/20 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            Karnataka Agriculture Department • Cooperative Governance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಸಹಕಾರಿ ಕೃಷಿ ಅಧಿಕಾರಿ ಪೋರ್ಟಲ್ / CHC & Subsidy Hub
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Officer: <strong>{currentUser.name}</strong> ({currentUser.officerDesignation || 'Assistant Director of Agriculture, Mandya'})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Govt of Karnataka e-Kisan Admin</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30">
          <div className="text-xs font-bold uppercase tracking-wider text-outline">Custom Hiring Centres</div>
          <div className="text-2xl font-black text-on-surface mt-1">8 CHC Hubs</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">36 Total Machinery Units</p>
        </div>

        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30">
          <div className="text-xs font-bold uppercase tracking-wider text-outline">Fleet Utilization</div>
          <div className="text-2xl font-black text-primary mt-1">86.4% Active</div>
          <p className="text-[11px] text-on-surface-variant mt-1">30 Units in field right now</p>
        </div>

        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30">
          <div className="text-xs font-bold uppercase tracking-wider text-outline">Subsidy Disbursed</div>
          <div className="text-2xl font-black text-amber-800 mt-1">₹4,28,000</div>
          <p className="text-[11px] text-on-surface-variant mt-1">50% Mechanization Grant</p>
        </div>

        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30">
          <div className="text-xs font-bold uppercase tracking-wider text-outline">Registered Farmers</div>
          <div className="text-2xl font-black text-blue-700 mt-1">1,840 Kisans</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">100% Bhoomi RTC Linked</p>
        </div>
      </div>

      {/* Subsidy Sanction Approvals Table */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-on-surface">
              Pending Farm Mechanization 50% Rental Subsidy Applications
            </h3>
            <p className="text-xs text-on-surface-variant">
              Direct Benefit Transfer (DBT) subsidies for Small & Marginal farmers under Raitha Siri
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            {subsidyApplications.filter((s) => s.status === 'pending').length} Awaiting Approval
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Farmer & RTC ID</th>
                <th className="p-3.5">Taluk</th>
                <th className="p-3.5">Machinery Service</th>
                <th className="p-3.5">Gross Rental</th>
                <th className="p-3.5">50% Subsidy</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {subsidyApplications.map((app) => (
                <tr key={app.id} className="hover:bg-surface-container-high transition">
                  <td className="p-3.5">
                    <div className="font-bold text-on-surface">{app.farmerName}</div>
                    <div className="text-[10px] text-outline font-mono">{app.rtcNumber}</div>
                  </td>
                  <td className="p-3.5 text-on-surface-variant">{app.taluk}</td>
                  <td className="p-3.5 font-medium text-on-surface">{app.service}</td>
                  <td className="p-3.5 font-semibold text-on-surface">₹{app.rentalCost.toLocaleString()}</td>
                  <td className="p-3.5 font-black text-emerald-800">₹{app.subsidyAmount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {app.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleRejectSubsidy(app.id)}
                          className="px-2.5 py-1 rounded-lg bg-surface border border-outline-variant/40 hover:bg-red-50 text-red-600 font-bold transition"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveSubsidy(app.id)}
                          className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold transition shadow"
                        >
                          Approve DBT
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-outline">Processed ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHC Fleet Telemetry Summary */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <h3 className="font-bold text-base text-on-surface">
          Custom Hiring Centre (CHC) Village Distribution Grid
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chcCentres.map((chc, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-2"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-on-surface">{chc.name}</h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  GPS Active
                </span>
              </div>
              <div className="text-xs text-on-surface-variant">
                Tractors: <strong>{chc.tractors}</strong> • Harvesters: <strong>{chc.harvesters}</strong>
              </div>
              <div className="pt-2 border-t border-outline-variant/20 flex justify-between text-xs">
                <span className="text-primary font-bold">{chc.inField} In Field</span>
                <span className="text-outline">{chc.idle} Idle at Hub</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farmer Advisory Broadcast Tool */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-on-surface">
            District-Wide Farmer SMS & App Advisory Broadcast
          </h3>
        </div>
        <p className="text-xs text-on-surface-variant">
          Push weather bulletins, pest alerts or APMC quotas directly to 1,840 registered farmers in Mandya.
        </p>

        <form onSubmit={handleSendBroadcast} className="space-y-3">
          <textarea
            rows={3}
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-surface border border-outline-variant/40 text-xs font-semibold text-on-surface focus:border-primary focus:outline-none"
          />

          <div className="flex items-center justify-between">
            {broadcastSent ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Broadcast successfully dispatched to 1,840 Farmers in Mandya Sub-basin!
              </span>
            ) : (
              <span className="text-[11px] text-outline">Target: All registered Kisans in Mandya district</span>
            )}

            <button
              type="submit"
              className="py-2 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Bulletin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
