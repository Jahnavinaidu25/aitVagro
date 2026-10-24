import React, { useRef, useState } from 'react';
import { AppScreen } from '../types';
import {
  ShieldCheck,
  QrCode,
  CreditCard,
  Building,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

import { EscrowPaymentGatewayModal } from '../components/EscrowPaymentGatewayModal';

interface CheckoutScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onOrderCompleted?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onNavigate,
  onOrderCompleted,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'kcc' | 'netbanking' | 'postpay'>('upi');
  const [signed, setSigned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    setSigned(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00521f';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  };

  const handleAuthorizeEscrow = () => {
    setShowGatewayModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('unified-booking')}
          className="text-xs font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Booking Setup</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          Kisan Escrow Checkout & Digital Contract
        </div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
          ಕಿಸಾನ್ ಎಸ್ಕ್ರೋ ಪಾವತಿ & ಡಿಜಿಟಲ್ ಒಪ್ಪಂದ / Escrow Checkout
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Bank-grade escrow guarantees that your funds remain safe until field inspection is complete
        </p>
      </div>

      {!isPaid ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Payment Method & Signature Pad */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Payment Methods */}
            <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-primary">
                1. Select Payment Method / ಪಾವತಿ ವಿಧಾನ
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Method 1: UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'upi'
                      ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-primary mb-1" />
                  <div className="font-bold text-xs text-on-surface">Instant UPI QR</div>
                  <div className="text-[10px] text-on-surface-variant">BHIM, PhonePe, GPay</div>
                </button>

                {/* Method 2: Kisan Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('kcc')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'kcc'
                      ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-600 mb-1" />
                  <div className="font-bold text-xs text-on-surface">Kisan Credit Card</div>
                  <div className="text-[10px] text-on-surface-variant">NABARD 0% Subsidized</div>
                </button>

                {/* Method 3: NetBanking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'netbanking'
                      ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <Building className="w-5 h-5 text-blue-600 mb-1" />
                  <div className="font-bold text-xs text-on-surface">Agri NetBanking</div>
                  <div className="text-[10px] text-on-surface-variant">SBI, Canara, Apex Bank</div>
                </button>

                {/* Method 4: Pay After Inspection */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('postpay')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'postpay'
                      ? 'bg-primary-container/20 border-primary ring-1 ring-primary'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 mb-1" />
                  <div className="font-bold text-xs text-on-surface">Post-Work Cash</div>
                  <div className="text-[10px] text-on-surface-variant">Pay after OTP signoff</div>
                </button>
              </div>

              {/* UPI QR Simulation Preview */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex items-center gap-4">
                  <div className="w-20 h-20 bg-white p-1 rounded-xl border border-zinc-300 flex items-center justify-center shrink-0">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=kisan.escrow@agrigrid&pn=VAgriConnect&am=3600&cu=INR"
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-on-surface">Scan with any UPI App</div>
                    <div className="text-on-surface-variant mt-0.5">UPI ID: <strong>kisan.escrow@vagriconnect</strong></div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                      Directly routed to Karnataka State Apex Bank Escrow Account
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Digital Agreement & Signature Pad */}
            <div className="p-5 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  2. Farmer Digital Signature / ಡಿಜಿಟಲ್ ಸಹಿ
                </label>
                {signed && (
                  <button
                    onClick={clearSignature}
                    className="text-[11px] text-red-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <p className="text-[11px] text-on-surface-variant">
                By signing below, you agree to the Kisan Custom Hiring Contract clauses (zero advance loss, operator insurance, and work verification OTP terms).
              </p>

              <div className="relative border-2 border-dashed border-outline-variant/60 rounded-2xl bg-surface p-2">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={130}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-28 cursor-crosshair rounded-xl block bg-surface"
                />
                {!signed && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-outline font-medium">
                    Draw your signature here with finger or mouse
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSigned(true)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Or click here to e-Sign with linked Aadhaar KYC
              </button>
            </div>
          </div>

          {/* Right Column: Escrow Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Order Breakdown
                </span>
                <h3 className="text-xl font-bold text-on-surface mt-1">
                  Mahindra Yuvo 585 DI + Rotavator
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Scheduled for Tomorrow, 06:30 AM (4h Shift)
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Target Farm Location:</span>
                  <span className="font-semibold text-on-surface">Plot A (Cauvery Terrace, 4.5 Ac)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Provider / Fleet Owner:</span>
                  <span className="font-semibold text-on-surface">Shivaraj Patil (Sree Maruthi Agro)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Certified Driver Allowance:</span>
                  <span className="font-bold text-emerald-700">Included Free ✓</span>
                </div>

                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Diesel Fuel Arrangement:</span>
                  <span className="font-semibold text-on-surface">Included in rate</span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-bold text-on-surface">Escrow Deposit:</span>
                  <span className="text-2xl font-black text-primary">₹3,600</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Kisan Escrow Guarantee Active
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your funds are locked in trust. Provider receives settlement only after you verify acreage with the completion OTP.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAuthorizeEscrow}
                className="w-full py-4 px-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <span>Pay via Secure Escrow Gateway (₹3,600)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Order Confirmed Screen */
        <div className="p-8 rounded-3xl bg-surface-container border border-primary/40 shadow-2xl text-center max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-3xl bg-primary text-on-primary mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Booking Confirmed & Escrow Secured
            </span>
            <h2 className="text-2xl font-black text-on-surface mt-1">
              ₹3,600 Locked in Kisan Escrow
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Work Order #VAG-2024-8921 has been dispatched to Shivaraj Patil.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-outline">Driver Assigned:</span>
              <span className="font-bold text-on-surface">Babu K. (+91 98452 10920)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">Scheduled Shift:</span>
              <span className="font-bold text-on-surface">Tomorrow, 06:30 AM (4 Hours)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">Your Secure Start OTP:</span>
              <span className="font-mono font-bold text-primary text-base">5921</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onNavigate('nearby-map')}
              className="py-3 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-on-surface"
            >
              Track GPS Live
            </button>

            <button
              onClick={() => onNavigate('my-bookings')}
              className="py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <span>View Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Mock Secure Escrow Payment Gateway Modal */}
      <EscrowPaymentGatewayModal
        isOpen={showGatewayModal}
        onClose={() => setShowGatewayModal(false)}
        onPaymentSuccess={() => {
          setIsPaid(true);
          setShowGatewayModal(false);
          if (onOrderCompleted) onOrderCompleted();
        }}
        amount={3600}
        paymentMethod={paymentMethod}
        serviceTitle="Mahindra Yuvo 585 DI + Rotavator"
        providerName="Shivaraj Patil (Sree Maruthi Agro)"
        farmerName="Ramesh Gowda"
        plotName="Plot A (Cauvery Terrace, 4.5 Ac)"
      />
    </div>
  );
};
