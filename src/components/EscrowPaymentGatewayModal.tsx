import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  QrCode,
  CreditCard,
  Building2,
  RefreshCw,
  X,
  FileCheck,
  Check,
  Download,
  KeyRound,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface EscrowPaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  paymentMethod: 'upi' | 'kcc' | 'netbanking' | 'postpay';
  serviceTitle: string;
  providerName: string;
  farmerName: string;
  plotName: string;
}

export const EscrowPaymentGatewayModal: React.FC<EscrowPaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount,
  paymentMethod,
  serviceTitle,
  providerName,
  farmerName,
  plotName,
}) => {
  const [step, setStep] = useState<'auth' | 'locking' | 'success'>('auth');
  const [pin, setPin] = useState('');
  const [lockingProgress, setLockingProgress] = useState(0);
  const [lockingStageText, setLockingStageText] = useState('Initiating 256-Bit SSL Handshake...');
  const [timeLeft, setTimeLeft] = useState(299); // 5 mins countdown

  useEffect(() => {
    if (!isOpen) {
      setStep('auth');
      setPin('');
      setLockingProgress(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAuthorize = () => {
    setStep('locking');
    setLockingProgress(15);
    setLockingStageText('Debiting ₹' + amount.toLocaleString() + ' from Farmer Bank Account...');

    setTimeout(() => {
      setLockingProgress(45);
      setLockingStageText('Routing via Karnataka State Apex Bank & NPCI Escrow Switch...');
    }, 800);

    setTimeout(() => {
      setLockingProgress(75);
      setLockingStageText('Locking ₹' + amount.toLocaleString() + ' in Kisan Trust Escrow Vault #ESC-2024-KA8921...');
    }, 1600);

    setTimeout(() => {
      setLockingProgress(100);
      setLockingStageText('Smart Escrow Bond Sealed with OTP Condition (5921)!');
    }, 2400);

    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleDeletePin = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-on-surface">
        {/* Gateway Security Header */}
        <div className="bg-[#0b1d12] text-white p-4 sm:p-5 border-b border-emerald-800/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-tight text-white">
                    Kisan Trust Escrow Switch
                  </span>
                  <span className="text-[9px] bg-emerald-500 text-black font-extrabold px-1.5 py-0.2 rounded font-mono">
                    256-BIT SSL
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300">
                  Karnataka Apex Cooperative Bank & NPCI Gateway
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-400 font-mono">SESSION TIMER</span>
              <div className="text-xs font-mono font-bold text-amber-300">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Amount Banner */}
        <div className="bg-surface-container-high px-5 py-3 border-b border-outline-variant/30 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-outline uppercase font-bold">Escrow Deposit Amount</span>
            <div className="text-xl font-black text-primary">₹{amount.toLocaleString()}.00</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-outline uppercase font-bold">Target Vault ID</span>
            <div className="font-mono text-xs font-bold text-on-surface">KV-ESC-2024-MDY</div>
          </div>
        </div>

        {/* Step 1: Authentication */}
        {step === 'auth' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-on-surface">
                {paymentMethod === 'upi'
                  ? 'Authorize UPI Payment to Escrow'
                  : paymentMethod === 'kcc'
                  ? 'Kisan Credit Card (KCC) PIN'
                  : 'Confirm Bank Escrow Mandate'}
              </h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Funds are immediately isolated in a neutral Karnataka Govt-audited escrow account.
              </p>
            </div>

            {/* PIN Entry Display */}
            <div className="space-y-3">
              <div className="text-center">
                <label className="text-[11px] font-bold text-outline uppercase tracking-wider">
                  Enter 4 or 6-Digit Bank PIN
                </label>
                <div className="flex items-center justify-center gap-2.5 mt-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-mono font-black ${
                        pin.length > idx
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-outline-variant/60 bg-surface'
                      }`}
                    >
                      {pin.length > idx ? '●' : ''}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-primary font-semibold mt-1.5">
                  Demo Quick PIN: Click "7890" or use keypad below
                </p>
              </div>

              {/* Virtual Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      if (k === 'C') setPin('');
                      else if (k === '⌫') handleDeletePin();
                      else handleKeyPress(k);
                    }}
                    className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high font-bold text-sm text-on-surface transition active:scale-95 border border-outline-variant/30"
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setPin('7890')}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  ⚡ Auto-fill Demo PIN (7890)
                </button>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Advance Risk Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Neither party has sole custody. Provider receives payment only when you provide the 4-digit start/completion OTP on your farm.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface-variant transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pin.length < 4}
                onClick={handleAuthorize}
                className="py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center justify-center gap-1.5 shadow disabled:opacity-50"
              >
                <span>Authorize Escrow Lock</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Real-time Escrow Holding Transfer Simulation */}
        {step === 'locking' && (
          <div className="p-8 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-primary font-black text-xs">
                {lockingProgress}%
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-on-surface">
                Locking Funds in Escrow...
              </h3>
              <p className="text-xs font-semibold text-primary animate-pulse">
                {lockingStageText}
              </p>
            </div>

            {/* Interactive Progress Bar */}
            <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${lockingProgress}%` }}
              />
            </div>

            {/* Real-time escrow routing pipeline */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-outline">Farmer Account:</span>
                <span className="font-bold text-on-surface">State Bank of India (***4819)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline">Escrow Regulatory Holder:</span>
                <span className="font-bold text-primary">Karnataka Apex Bank Trust</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline">Release Trigger Condition:</span>
                <span className="font-bold text-amber-800">OTP 5921 on Acreage Signoff</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Escrow Verified & Mutual Trust Bond */}
        {step === 'success' && (
          <div className="p-6 overflow-y-auto space-y-5 animate-in fade-in duration-300">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                Escrow Guarantee Activated
              </span>
              <h3 className="text-xl font-black text-on-surface">
                ₹{amount.toLocaleString()} Locked in Escrow Vault
              </h3>
              <p className="text-xs text-on-surface-variant">
                Both parties are protected under the Kisan Custom Hiring Trust Protocol.
              </p>
            </div>

            {/* Visual Mutual Trust Protection Box */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Farmer Protection */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <div className="font-bold text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Farmer Protection</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Funds will <strong>NOT</strong> leave escrow until you inspect the ploughed field and provide your OTP. Full refund if machinery fails to arrive.
                </p>
              </div>

              {/* Provider Protection */}
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                <div className="font-bold text-blue-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Provider Protection</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Guaranteed payout! Provider dispatches the tractor with 100% confidence that ₹{amount.toLocaleString()} is already locked in escrow.
                </p>
              </div>
            </div>

            {/* Smart Escrow Certificate */}
            <div className="p-4 rounded-2xl bg-surface border border-outline-variant/40 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <span className="font-bold text-primary flex items-center gap-1">
                  <FileCheck className="w-4 h-4" />
                  Digital Escrow Certificate
                </span>
                <span className="text-[10px] font-mono text-outline">
                  #KV-ESC-8921-2024
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Contract Hash:</span>
                  <span className="font-mono text-outline">SHA256: 8f3a9e...7b21</span>
                </div>
                <div className="flex justify-between">
                  <span>Hirer (Farmer):</span>
                  <span className="font-bold text-on-surface">{farmerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fleet Provider:</span>
                  <span className="font-bold text-on-surface">{providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Field:</span>
                  <span className="font-bold text-on-surface">{plotName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required OTP for Settlement:</span>
                  <span className="font-mono font-bold text-amber-700 text-xs">5921</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onPaymentSuccess();
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>View Live Order & Telemetry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => alert('Digital Escrow Certificate downloaded to device (PDF).')}
                className="w-full py-2 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Download Escrow Bond Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
