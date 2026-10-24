import React, { useEffect, useRef, useState } from 'react';
import { AppScreen } from '../types';
import { INITIAL_BOOKINGS } from '../data/mockData';
import {
  MapPin,
  Navigation as NavIcon,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Gauge,
  Fuel,
  Thermometer,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface NearbyMapScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const NearbyMapScreen: React.FC<NearbyMapScreenProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeBooking, setActiveBooking] = useState(INITIAL_BOOKINGS[0]);
  const [tractorProgress, setTractorProgress] = useState(0.35); // 0 to 1 along path
  const [jobStatus, setJobStatus] = useState<'en-route' | 'arrived' | 'in-progress' | 'completed'>('en-route');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  // Dynamic telemetry simulated values
  const [speed, setSpeed] = useState(18);
  const [fuel, setFuel] = useState(82);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = tractorProgress;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Field Background Terrain
      ctx.fillStyle = '#0f2414'; // Dark lush agricultural green
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Topographic Furrow Contour Lines
      ctx.strokeStyle = '#183821';
      ctx.lineWidth = 1.5;
      for (let y = 20; y < canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.quadraticCurveTo(x + 20, y + Math.sin(x * 0.02) * 8, x + 40, y);
        }
        ctx.stroke();
      }

      // 3. Draw Farm Boundary Geo-Fences
      // Plot A (Destination)
      ctx.fillStyle = 'rgba(36, 107, 53, 0.4)';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(canvas.width * 0.6, canvas.height * 0.2, canvas.width * 0.35, canvas.height * 0.6, 20);
      ctx.fill();
      ctx.stroke();

      // Plot A Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Plot A: Cauvery Terrace (4.5 Ac)', canvas.width * 0.62, canvas.height * 0.26);
      ctx.fillStyle = '#9fe9a6';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Geo-Fence Active • Target Destination', canvas.width * 0.62, canvas.height * 0.31);

      // Irrigation Canal (Blue curved river)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.52, 0);
      ctx.bezierCurveTo(canvas.width * 0.54, canvas.height * 0.4, canvas.width * 0.5, canvas.height * 0.7, canvas.width * 0.55, canvas.height);
      ctx.stroke();

      ctx.fillStyle = '#7dd3fc';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('Cauvery Canal feeder', canvas.width * 0.44, canvas.height * 0.15);

      // 4. Draw Waypoint Route Path
      const p0 = { x: 80, y: canvas.height * 0.75 }; // Provider Hub
      const p1 = { x: canvas.width * 0.3, y: canvas.height * 0.45 }; // Village Road
      const p2 = { x: canvas.width * 0.48, y: canvas.height * 0.65 }; // Canal Bridge
      const p3 = { x: canvas.width * 0.75, y: canvas.height * 0.4 }; // Target Field Gate

      // Route Glow
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      ctx.quadraticCurveTo(canvas.width * 0.58, canvas.height * 0.75, p3.x, p3.y);
      ctx.stroke();

      // Route Line (Dashed Golden Amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      ctx.quadraticCurveTo(canvas.width * 0.58, canvas.height * 0.75, p3.x, p3.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Waypoint Hub Pin
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(p0.x, p0.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.fillText('Hub: Mandya Rural', p0.x - 40, p0.y + 20);

      // Waypoint Gate Pin
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(p3.x, p3.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('🎯 Field Gate', p3.x - 25, p3.y - 15);

      // 6. Calculate Tractor Position along route based on progress
      // Quadratic Bezier interpolation
      let tractorX = 0;
      let tractorY = 0;
      if (t < 0.5) {
        const u = t * 2;
        tractorX = (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * p1.x + u * u * p2.x;
        tractorY = (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * p1.y + u * u * p2.y;
      } else {
        const u = (t - 0.5) * 2;
        const cpX = canvas.width * 0.58;
        const cpY = canvas.height * 0.75;
        tractorX = (1 - u) * (1 - u) * p2.x + 2 * (1 - u) * u * cpX + u * u * p3.x;
        tractorY = (1 - u) * (1 - u) * p2.y + 2 * (1 - u) * u * cpY + u * u * p3.y;
      }

      // Pulsing Radar Rings around Tractor
      const pulse = (Date.now() % 1500) / 1500;
      ctx.strokeStyle = `rgba(34, 197, 94, ${1 - pulse})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tractorX, tractorY, 15 + pulse * 25, 0, Math.PI * 2);
      ctx.stroke();

      // Tractor Pin Body
      ctx.fillStyle = '#00521f';
      ctx.beginPath();
      ctx.arc(tractorX, tractorY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Tractor Emoji Icon
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚜', tractorX, tractorY);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      // Callout box on top of tractor
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(tractorX - 60, tractorY - 45, 120, 26, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('Mahindra Yuvo 585', tractorX - 52, tractorY - 32);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '9px sans-serif';
      ctx.fillText(`${speed} km/h • 1.8km out`, tractorX - 52, tractorY - 21);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [tractorProgress, speed]);

  const handleSimulateAdvance = () => {
    if (tractorProgress < 0.95) {
      setTractorProgress((prev) => Math.min(0.98, prev + 0.25));
    } else {
      setTractorProgress(0.15);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === activeBooking.otpCode || enteredOtp === '5921') {
      setOtpVerified(true);
      setJobStatus('in-progress');
      setShowOtpModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            Live GPS Telemetry & Tracking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            ನೈಜ-ಸಮಯದ ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ / Field Fleet Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Live GPS telemetry stream for Order #{activeBooking.id} • Mandya Sub-basin
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateAdvance}
            className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-xs font-bold text-primary flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Simulate Tractor En-Route Movement</span>
          </button>
        </div>
      </div>

      {/* Main Field Map Container */}
      <div className="relative rounded-3xl overflow-hidden border border-outline-variant/40 shadow-2xl bg-[#0f2414]">
        <canvas
          ref={canvasRef}
          width={900}
          height={480}
          className="w-full h-[400px] sm:h-[480px] block"
        />

        {/* Floating Telemetry HUD (Top Left) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-emerald-500/40 text-white space-y-2 pointer-events-auto shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Telemetry Feed
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-700/50">
                4G LTE • 50 Hz
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Gauge className="w-4 h-4 mx-auto text-amber-400 mb-0.5" />
                <div className="text-[9px] text-zinc-400 uppercase">Speed</div>
                <div className="text-sm font-black text-white">{speed} km/h</div>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Fuel className="w-4 h-4 mx-auto text-emerald-400 mb-0.5" />
                <div className="text-[9px] text-zinc-400 uppercase">Fuel Tank</div>
                <div className="text-sm font-black text-white">{fuel}%</div>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 mx-auto text-blue-400 mb-0.5" />
                <div className="text-[9px] text-zinc-400 uppercase">ETA</div>
                <div className="text-sm font-black text-white">12 mins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Start OTP Box (Top Right) */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div className="p-4 rounded-3xl bg-black/90 backdrop-blur-md border border-amber-500/50 text-white text-center shadow-2xl">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Field Start OTP
            </div>
            <div className="text-3xl font-mono font-black text-amber-300 tracking-widest my-1">
              {activeBooking.otpCode}
            </div>
            <p className="text-[10px] text-zinc-400 max-w-36">
              Driver will request this code to begin ploughed acreage tracking
            </p>

            <button
              onClick={() => setShowOtpModal(true)}
              className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition"
            >
              Verify OTP
            </button>
          </div>
        </div>

        {/* Bottom Driver Dispatch Bar */}
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center border-2 border-emerald-400">
              BK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">Driver Babu K.</h4>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  ★ 4.9 • Certified Operator
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Mahindra Yuvo Tech+ 585 DI • 1.8km away on Maddur Canal Road
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="tel:+919845210920"
              className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Operator</span>
            </a>

            <button
              onClick={() => onNavigate('my-bookings')}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              View Order Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Start OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="p-6 rounded-3xl bg-surface border border-outline-variant/40 shadow-2xl max-w-sm w-full space-y-4 text-on-surface">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Verify Field Start OTP</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Enter the 4-digit code provided to the driver upon machinery arrival at Plot A.
              </p>
            </div>

            <div>
              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="5921"
                className="w-full text-center py-3 text-2xl font-mono font-black tracking-widest rounded-xl bg-surface-container border border-outline-variant/50 focus:border-primary focus:outline-none"
              />
              <p className="text-[11px] text-center text-outline mt-1">Hint: 5921</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowOtpModal(false)}
                className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold"
              >
                Confirm OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
