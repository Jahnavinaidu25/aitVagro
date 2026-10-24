import React, { useState } from 'react';
import { AppScreen } from '../types';
import { ThreeTractorViewer } from '../components/ThreeTractorViewer';
import {
  Box,
  Rotate3d,
  Layers,
  Wrench,
  Fuel,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface Equipment3DLabScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectMachinery: (id: string) => void;
}

export const Equipment3DLabScreen: React.FC<Equipment3DLabScreenProps> = ({
  onNavigate,
  onSelectMachinery,
}) => {
  const [activeImplement, setActiveImplement] = useState<'rotavator' | 'plough' | 'seeder' | 'none'>('rotavator');
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  const toggleEngineSound = () => {
    if (!soundPlaying) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Low frequency diesel rumble simulation
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(45, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        setAudioContext(ctx);
        setOscillator(osc);
        setSoundPlaying(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
      setSoundPlaying(false);
      setOscillator(null);
      setAudioContext(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/20 mb-1">
            <Box className="w-3.5 h-3.5" />
            3D Equipment & Implement Digital Twin Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            3D ಯಂತ್ರೋಪಕರಣ ಪ್ರಯೋಗಾಲಯ / Three.js Telemetry Studio
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Rotate 360°, inspect PTO shaft hydraulics, attach seasonal implements, and verify equipment integrity
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulated Engine Sound */}
          <button
            onClick={toggleEngineSound}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              soundPlaying
                ? 'bg-amber-500 text-black border-amber-500'
                : 'bg-surface-container border-outline-variant/40 text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {soundPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundPlaying ? 'Diesel Idle: 45 Hz' : 'Simulate Engine Idle'}</span>
          </button>

          <button
            onClick={() => {
              onSelectMachinery('mach-1');
              onNavigate('unified-booking');
            }}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition flex items-center gap-1 shadow"
          >
            <span>Book This Setup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Studio Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ThreeTractorViewer
            implementType={activeImplement}
            className="h-[480px] w-full"
            autoRotateSpeed={0.5}
          />
        </div>

        {/* Right Inspection Specs */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/40 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Digital Twin Inspection
              </span>
              <h3 className="text-xl font-bold text-on-surface mt-1">
                Mahindra Yuvo Tech+ 585 DI
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                4-Cylinder 49 HP Common Rail High-Torque Diesel
              </p>
            </div>

            {/* Implements Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-outline">
                Swap Rear Implement:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rotavator', label: 'Rotavator 7-Blade' },
                  { id: 'plough', label: 'Disc Plough 3-Bottom' },
                  { id: 'seeder', label: 'Multi-crop Seed Drill' },
                  { id: 'none', label: 'Tractor Chassis Only' },
                ].map((imp) => (
                  <button
                    key={imp.id}
                    onClick={() => setActiveImplement(imp.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition text-left ${
                      activeImplement === imp.id
                        ? 'bg-primary text-on-primary border-primary shadow'
                        : 'bg-surface border-outline-variant/30 text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {imp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-system Hotspots list */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/20 text-xs">
              <div className="p-2.5 rounded-xl bg-surface border border-outline-variant/30 space-y-0.5">
                <div className="font-bold text-primary flex items-center justify-between">
                  <span>1. PTO Drive Shaft</span>
                  <span className="text-[10px] text-emerald-700">Verified 540 RPM</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Direct helical gear coupling with zero slip under heavy clay load.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-surface border border-outline-variant/30 space-y-0.5">
                <div className="font-bold text-primary flex items-center justify-between">
                  <span>2. Category II 3-Point Hitch</span>
                  <span className="text-[10px] text-emerald-700">1,700 kg Capacity</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Automatic draft and position control for precise tillage depth.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-surface border border-outline-variant/30 space-y-0.5">
                <div className="font-bold text-primary flex items-center justify-between">
                  <span>3. High-Lug Wetland Tyres</span>
                  <span className="text-[10px] text-emerald-700">14.9 x 28 Rear</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Deep bar treads engineered for Cauvery black wetland paddy soils.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
