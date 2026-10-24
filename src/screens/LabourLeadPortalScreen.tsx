import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
  PhoneCall,
  UserCheck,
  Check,
  X
} from 'lucide-react';

interface LabourLeadPortalScreenProps {
  currentUser: UserProfile;
}

export const LabourLeadPortalScreen: React.FC<LabourLeadPortalScreenProps> = ({ currentUser }) => {
  const [escrowBalance, setEscrowBalance] = useState(18900);
  const [disbursed, setDisbursed] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({
    'w-1': true,
    'w-2': true,
    'w-3': true,
    'w-4': true,
    'w-5': true,
    'w-6': true,
    'w-7': true,
    'w-8': true,
  });

  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'req-1',
      farmerName: 'Somanna (Koppa Hobli)',
      crop: 'Sugarcane De-topping & Bundling',
      acreage: '4.5 Acres',
      dates: 'Tomorrow, 25 Oct (3 Days)',
      crewRequired: 10,
      wageTotal: 13500,
      escrowLocked: true
    },
    {
      id: 'req-2',
      farmerName: 'Kempanna (Maddur)',
      crop: 'Paddy Nursery Weeding',
      acreage: '2.8 Acres',
      dates: '28 Oct (1 Day)',
      crewRequired: 8,
      wageTotal: 3600,
      escrowLocked: true
    }
  ]);

  const workers = [
    { id: 'w-1', name: 'Lakshmi M. (Lead)', role: 'Transplantation Supervisor', phone: '97412 88564', aadhaar: '✓ Verified' },
    { id: 'w-2', name: 'Parvathamma G.', role: 'Senior Paddy Specialist', phone: '98442 12093', aadhaar: '✓ Verified' },
    { id: 'w-3', name: 'Gowramma K.', role: 'SRI Weeder Operator', phone: '99014 55102', aadhaar: '✓ Verified' },
    { id: 'w-4', name: 'Sunitha R.', role: 'Nursery Uprooting Hand', phone: '94812 77091', aadhaar: '✓ Verified' },
    { id: 'w-5', name: 'Pushpa Latha', role: 'Drip & Seed Specialist', phone: '97311 44029', aadhaar: '✓ Verified' },
    { id: 'w-6', name: 'Mangala B.', role: 'Field Bund Builder', phone: '98451 99012', aadhaar: '✓ Verified' },
    { id: 'w-7', name: 'Sharadamma', role: 'Crop Care Specialist', phone: '94481 00293', aadhaar: '✓ Verified' },
    { id: 'w-8', name: 'Kempamma', role: 'Harvest Bundler', phone: '99002 11983', aadhaar: '✓ Verified' },
  ];

  const handleDisburse = () => {
    setDisbursed(true);
    setTimeout(() => {
      setEscrowBalance(0);
    }, 1200);
  };

  const handleAcceptRequest = (id: string) => {
    setIncomingRequests((prev) => prev.filter((r) => r.id !== id));
    alert('Contract accepted! Squad scheduled on farmer calendar with Escrow guarantee.');
  };

  const handleDeclineRequest = (id: string) => {
    setIncomingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24 text-on-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-800 text-xs font-bold border border-blue-500/20 mb-1">
            <Users className="w-3.5 h-3.5" />
            Labour Squad Lead Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ಕಾರ್ಮಿಕರ ಪಡೆ & ಕೂಲಿ ಎಸ್ಕ್ರೋ ನಿರ್ವಹಣೆ / Labour Contractor Portal
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Squad: <strong>{currentUser.squadName || "Kaveri Women's Self-Help Labour Group"}</strong> • 14 Members
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Raitha Suraksha Insured</span>
          </span>
        </div>
      </div>

      {/* Analytics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Escrow Balance */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-700/50 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="font-semibold uppercase tracking-wider">Locked Wage Escrow</span>
              <ShieldCheck className="w-4 h-4 text-blue-300" />
            </div>
            <div className="text-3xl font-black mt-2 text-white">
              ₹{escrowBalance.toLocaleString()}
            </div>
            <p className="text-[11px] text-blue-200 mt-1">Guaranteed wages for ongoing shifts</p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            {escrowBalance > 0 ? (
              <button
                disabled={disbursed}
                onClick={handleDisburse}
                className="w-full py-2 px-3 rounded-xl bg-blue-400 hover:bg-blue-300 text-black text-xs font-extrabold transition shadow"
              >
                {disbursed ? 'Disbursing to Members...' : 'Disburse to Member Bank Accounts'}
              </button>
            ) : (
              <div className="text-center text-xs text-emerald-300 font-bold py-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>₹18,900 Distributed to 8 Bank Accounts</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Today's Deployment */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">Active Field Job</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-black text-on-surface mt-2">
              Paddy Sowing • 8 Workers
            </div>
            <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Plot B East Marsh (Ramesh Gowda)
            </p>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold pt-3 border-t border-outline-variant/20">
            Shift: 07:00 AM - 01:00 PM • OTP Verified ✓
          </div>
        </div>

        {/* Card 3: Monthly Squad Wages */}
        <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">October Total Earnings</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-on-surface mt-2">₹1,12,400</div>
            <p className="text-[11px] text-on-surface-variant mt-1">26 Completed contract days</p>
          </div>
          <div className="text-[10px] text-outline pt-3 border-t border-outline-variant/20">
            Standard Daily Wage: ₹450 / Person / Day
          </div>
        </div>
      </div>

      {/* Incoming Contract Requests */}
      {incomingRequests.length > 0 && (
        <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
              <span>Incoming Farmer Hiring Requests</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 font-bold">
                {incomingRequests.length} Pending
              </span>
            </h3>
            <span className="text-xs text-outline">Escrow Pre-Funded</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {incomingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{req.farmerName}</h4>
                    <p className="text-xs text-primary font-semibold">{req.crop}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {req.acreage} • {req.dates}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-amber-800">₹{req.wageTotal}</div>
                    <div className="text-[10px] text-emerald-700 font-bold">Escrow Locked ✓</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-outline-variant/20">
                  <button
                    onClick={() => handleDeclineRequest(req.id)}
                    className="py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface-variant transition"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAcceptRequest(req.id)}
                    className="py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Job</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Squad Members & Daily Attendance */}
      <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-on-surface">
              Squad Worker Roster & Attendance
            </h3>
            <p className="text-xs text-on-surface-variant">
              Track active members on field and ensure daily wage distribution
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            All 8 Present Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Worker Name</th>
                <th className="p-3.5">Specialization</th>
                <th className="p-3.5">Mobile Contact</th>
                <th className="p-3.5">Aadhaar Status</th>
                <th className="p-3.5">Daily Wage</th>
                <th className="p-3.5 text-center">Today's Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {workers.map((w) => {
                const isPresent = attendance[w.id];
                return (
                  <tr key={w.id} className="hover:bg-surface-container-high transition">
                    <td className="p-3.5 font-bold text-on-surface">{w.name}</td>
                    <td className="p-3.5 text-on-surface-variant">{w.role}</td>
                    <td className="p-3.5 font-mono text-outline">{w.phone}</td>
                    <td className="p-3.5 text-emerald-700 font-semibold">{w.aadhaar}</td>
                    <td className="p-3.5 font-bold text-primary">₹450</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() =>
                          setAttendance((prev) => ({ ...prev, [w.id]: !prev[w.id] }))
                        }
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          isPresent
                            ? 'bg-emerald-500 text-white'
                            : 'bg-zinc-200 text-zinc-600'
                        }`}
                      >
                        {isPresent ? 'Present ✓' : 'Absent'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
