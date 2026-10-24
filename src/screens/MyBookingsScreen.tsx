import React, { useState } from 'react';
import { AppScreen, BookingOrder } from '../types';
import { INITIAL_BOOKINGS } from '../data/mockData';
import {
  Receipt,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  Printer,
  X,
  ArrowRight,
  Repeat,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface MyBookingsScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ onNavigate }) => {
  const [bookings, setBookings] = useState<BookingOrder[]>(INITIAL_BOOKINGS);
  const [selectedInvoice, setSelectedInvoice] = useState<BookingOrder | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'active') return b.status === 'en-route' || b.status === 'accepted';
    if (filterTab === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-1">
            <Receipt className="w-3.5 h-3.5" />
            My Bookings & Digital Tax Invoices
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು & ರಶೀದಿಗಳು / Kisan Orders & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Track ongoing field machinery, review verified work completion cards, and download GST tax invoices
          </p>
        </div>

        <button
          onClick={() => onNavigate('marketplace')}
          className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center gap-1.5 shadow"
        >
          <span>Book New Machinery</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'active', label: 'Active & En Route' },
          { id: 'completed', label: 'Completed Jobs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              filterTab === tab.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((order) => {
          const isEnRoute = order.status === 'en-route';
          const isCompleted = order.status === 'completed';

          return (
            <div
              key={order.id}
              className={`p-5 sm:p-6 rounded-3xl border transition shadow-sm ${
                isEnRoute
                  ? 'bg-gradient-to-r from-surface-container to-emerald-950/20 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-surface-container border-outline-variant/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-outline">
                    #{order.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isEnRoute
                        ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/40 flex items-center gap-1'
                        : isCompleted
                        ? 'bg-zinc-200 text-zinc-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isEnRoute && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {order.date} • {order.shift}
                  </span>
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 space-y-1">
                  <h3 className="font-extrabold text-base text-on-surface">
                    {order.serviceTitle}
                  </h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{order.farmLocation}</span>
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Provider: <strong>{order.providerName}</strong>
                  </p>
                </div>

                {/* OTP or Escrow Status */}
                <div className="md:col-span-5 flex flex-wrap items-center justify-between md:justify-end gap-3">
                  {order.otpCode && (
                    <div className="p-2.5 px-3 rounded-2xl bg-surface border border-outline-variant/40 text-center">
                      <div className="text-[9px] uppercase font-bold text-outline">Start OTP</div>
                      <div className="text-lg font-mono font-black text-amber-600 tracking-wider">
                        {order.otpCode}
                      </div>
                    </div>
                  )}

                  <div className="text-right">
                    <div className="text-xs text-outline font-semibold">Kisan Escrow</div>
                    <div className="text-lg font-black text-primary">
                      ₹{order.escrowAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" />
                      {order.escrowStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {isEnRoute && (
                    <button
                      onClick={() => onNavigate('nearby-map')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Track Live on Map</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedInvoice(order)}
                    className="px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>Tax Invoice & Job Card</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('marketplace')}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <Repeat className="w-3 h-3" />
                    <span>Repeat Booking</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Close */}
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="border-b border-zinc-200 pb-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-emerald-800">🌾 VAgriConnect</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                      TAX INVOICE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Karnataka State Custom Hiring & Farm Escrow Authority
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    GSTIN: 29AABCV1209K1Z5 • UTR: SBIN202410249821
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-zinc-400 font-mono">INVOICE NUMBER</div>
                  <div className="font-mono font-bold text-sm text-zinc-800">
                    INV-{selectedInvoice.id}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{selectedInvoice.date}</div>
                </div>
              </div>
            </div>

            {/* Bill To & Provider */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
                  Kisan (Hirer)
                </span>
                <div className="font-bold text-sm text-zinc-900 mt-0.5">Ramesh Gowda</div>
                <div className="text-zinc-600">Plot A, Maddur Taluk, Mandya</div>
                <div className="text-zinc-500">RTC Pahani: KA-MDY-2024-0982</div>
              </div>

              <div>
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
                  Machinery Fleet Provider
                </span>
                <div className="font-bold text-sm text-zinc-900 mt-0.5">
                  {selectedInvoice.providerName}
                </div>
                <div className="text-zinc-600">Mandya Rural CHC Hub</div>
                <div className="text-zinc-500">APMC Registered Fleet Partner</div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-zinc-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold">
                  <tr>
                    <th className="p-3">Service Description</th>
                    <th className="p-3 text-center">Acreage/Shift</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-zinc-900">{selectedInvoice.serviceTitle}</div>
                      <div className="text-zinc-500 text-[11px]">{selectedInvoice.farmLocation}</div>
                    </td>
                    <td className="p-3 text-center font-medium">
                      {selectedInvoice.acreage} Acres
                    </td>
                    <td className="p-3 text-right font-bold text-zinc-900">
                      ₹{selectedInvoice.escrowAmount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-zinc-900">Kisan Escrow Guarantee & Insurance</div>
                      <div className="text-zinc-500 text-[11px]">Zero advance loss & equipment safety bond</div>
                    </td>
                    <td className="p-3 text-center font-medium">Subsidized</td>
                    <td className="p-3 text-right font-bold text-emerald-700">₹0</td>
                  </tr>
                </tbody>
                <tfoot className="bg-zinc-50 border-t border-zinc-200">
                  <tr>
                    <td colSpan={2} className="p-3 font-bold text-zinc-800 text-right">
                      Total Escrow Settled:
                    </td>
                    <td className="p-3 text-right font-black text-emerald-800 text-base">
                      ₹{selectedInvoice.escrowAmount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Verification Signoff */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold">Acreage Inspected & Verified via OTP {selectedInvoice.otpCode}</span>
                  <div className="text-[11px] text-emerald-700">Payment released via Kisan Escrow gateway</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-200/60 px-2 py-1 rounded font-bold">
                SETTLED
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-xs font-bold text-zinc-800 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => alert(`Tax invoice INV-${selectedInvoice.id} downloaded.`)}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
