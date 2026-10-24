import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, ZoomIn, ZoomOut, Eye, Sparkles, Layers, RefreshCw } from 'lucide-react';

interface ThreeTractorViewerProps {
  implementType?: 'rotavator' | 'plough' | 'seeder' | 'none';
  interactive?: boolean;
  className?: string;
  autoRotateSpeed?: number;
}

export const ThreeTractorViewer: React.FC<ThreeTractorViewerProps> = ({
  implementType = 'rotavator',
  interactive = true,
  className = 'h-80 w-full',
  autoRotateSpeed = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>('Mahindra 585 DI Power Chassis');
  const [activeImplement, setActiveImplement] = useState<'rotavator' | 'plough' | 'seeder' | 'none'>(implementType);
  const [isRotating, setIsRotating] = useState(true);
  const [viewWireframe, setViewWireframe] = useState(false);

  useEffect(() => {
    setActiveImplement(implementType);
  }, [implementType]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1a12); // Deep agricultural night/studio green

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(7, 5, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x9fe9a6, 0.8);
    fillLight.position.set(-10, 8, -10);
    scene.add(fillLight);

    // Ground platform / Agricultural Field soil disc
    const soilGeo = new THREE.CylinderGeometry(6, 6.2, 0.3, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x3d2817, // Rich Deccan Red/Brown soil
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(soilGeo, soilMat);
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular furrow grid rings
    const ringGeo = new THREE.RingGeometry(3.5, 5.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x246b35, wireframe: true, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.04;
    scene.add(ring);

    // Tractor Root Group
    const tractor = new THREE.Group();
    scene.add(tractor);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x00521f, // Kisan dark green
      metalness: 0.4,
      roughness: 0.3,
      wireframe: viewWireframe
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Amber gold / Kisan yellow
      metalness: 0.3,
      roughness: 0.4,
      wireframe: viewWireframe
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: viewWireframe
    });
    const tyreMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.9,
      wireframe: viewWireframe
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Golden yellow tractor rims
      metalness: 0.5,
      roughness: 0.3,
      wireframe: viewWireframe
    });

    // 1. Tractor Main Hood & Chassis
    const hoodGeo = new THREE.BoxGeometry(2.8, 1.2, 1.4);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0.6, 0.4, 0);
    hood.castShadow = true;
    tractor.add(hood);

    // Grille / Radiator
    const grilleGeo = new THREE.BoxGeometry(0.1, 0.9, 1.2);
    const grille = new THREE.Mesh(grilleGeo, darkMetalMat);
    grille.position.set(2.01, 0.35, 0);
    tractor.add(grille);

    // Headlights
    const lightGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.15, 16);
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff0aa, emissiveIntensity: 1 });
    const leftLight = new THREE.Mesh(lightGeo, lightMat);
    leftLight.rotation.z = Math.PI / 2;
    leftLight.position.set(2.02, 0.55, 0.45);
    tractor.add(leftLight);

    const rightLight = leftLight.clone();
    rightLight.position.z = -0.45;
    tractor.add(rightLight);

    // Exhaust Pipe with Rain Cap
    const exhaustGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.8, 12);
    const exhaust = new THREE.Mesh(exhaustGeo, darkMetalMat);
    exhaust.position.set(1.2, 1.4, 0.5);
    tractor.add(exhaust);

    const capGeo = new THREE.BoxGeometry(0.2, 0.04, 0.15);
    const cap = new THREE.Mesh(capGeo, darkMetalMat);
    cap.position.set(1.2, 2.3, 0.5);
    cap.rotation.z = 0.2;
    tractor.add(cap);

    // Driver Station & Cabin / ROPS Frame
    const seatGeo = new THREE.BoxGeometry(0.7, 0.6, 0.7);
    const seat = new THREE.Mesh(seatGeo, darkMetalMat);
    seat.position.set(-0.8, 0.5, 0);
    tractor.add(seat);

    // Steering Column & Wheel
    const columnGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const column = new THREE.Mesh(columnGeo, darkMetalMat);
    column.position.set(-0.2, 0.9, 0);
    column.rotation.z = -0.4;
    tractor.add(column);

    const wheelTorusGeo = new THREE.TorusGeometry(0.28, 0.04, 8, 16);
    const steerWheel = new THREE.Mesh(wheelTorusGeo, darkMetalMat);
    steerWheel.position.set(-0.35, 1.25, 0);
    steerWheel.rotation.y = Math.PI / 2;
    steerWheel.rotation.x = -0.4;
    tractor.add(steerWheel);

    // ROPS Roll Cage Bar
    const ropsBarGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 12);
    const ropsLeft = new THREE.Mesh(ropsBarGeo, accentMat);
    ropsLeft.position.set(-1.2, 1.2, 0.7);
    tractor.add(ropsLeft);

    const ropsRight = ropsLeft.clone();
    ropsRight.position.z = -0.7;
    tractor.add(ropsRight);

    const ropsTopGeo = new THREE.BoxGeometry(0.15, 0.15, 1.55);
    const ropsTop = new THREE.Mesh(ropsTopGeo, accentMat);
    ropsTop.position.set(-1.2, 2.3, 0);
    tractor.add(ropsTop);

    // Rear Fenders / Mudguards
    const fenderGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.45, 16, 1, false, 0, Math.PI);
    const leftFender = new THREE.Mesh(fenderGeo, bodyMat);
    leftFender.rotation.x = Math.PI / 2;
    leftFender.position.set(-0.9, 0.4, 0.95);
    tractor.add(leftFender);

    const rightFender = leftFender.clone();
    rightFender.position.z = -0.95;
    tractor.add(rightFender);

    // Big Rear Wheels
    const createWheel = (radius: number, width: number, isRear: boolean) => {
      const wheelGroup = new THREE.Group();

      const tyreGeo = new THREE.CylinderGeometry(radius, radius, width, 24);
      const tyre = new THREE.Mesh(tyreGeo, tyreMat);
      tyre.rotation.x = Math.PI / 2;
      tyre.castShadow = true;
      wheelGroup.add(tyre);

      // Yellow Rim
      const rimRadius = radius * 0.65;
      const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius, width + 0.02, 16);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelGroup.add(rim);

      // Hub & Bolts
      const hubGeo = new THREE.CylinderGeometry(rimRadius * 0.35, rimRadius * 0.35, width + 0.06, 12);
      const hub = new THREE.Mesh(hubGeo, darkMetalMat);
      hub.rotation.x = Math.PI / 2;
      wheelGroup.add(hub);

      // Tread Grips
      if (isRear) {
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2;
          const treadGeo = new THREE.BoxGeometry(0.15, 0.08, width - 0.04);
          const tread = new THREE.Mesh(treadGeo, tyreMat);
          tread.position.set(Math.cos(angle) * (radius + 0.04), Math.sin(angle) * (radius + 0.04), 0);
          tread.rotation.z = angle;
          wheelGroup.add(tread);
        }
      }

      return wheelGroup;
    };

    // Rear Large Wheels
    const rearLeftWheel = createWheel(1.1, 0.48, true);
    rearLeftWheel.position.set(-0.9, 0.1, 1.05);
    tractor.add(rearLeftWheel);

    const rearRightWheel = createWheel(1.1, 0.48, true);
    rearRightWheel.position.set(-0.9, 0.1, -1.05);
    tractor.add(rearRightWheel);

    // Front Smaller Wheels
    const frontLeftWheel = createWheel(0.65, 0.32, false);
    frontLeftWheel.position.set(1.5, -0.35, 0.85);
    tractor.add(frontLeftWheel);

    const frontRightWheel = createWheel(0.65, 0.32, false);
    frontRightWheel.position.set(1.5, -0.35, -0.85);
    tractor.add(frontRightWheel);

    // Implement Group (Attached behind the tractor)
    const implementGroup = new THREE.Group();
    implementGroup.position.set(-2.2, 0, 0);
    tractor.add(implementGroup);

    // Hitch linkage arms
    const hitchGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8);
    const hitchLeft = new THREE.Mesh(hitchGeo, darkMetalMat);
    hitchLeft.rotation.z = 1.2;
    hitchLeft.position.set(0.5, 0.2, 0.35);
    implementGroup.add(hitchLeft);

    const hitchRight = hitchLeft.clone();
    hitchRight.position.z = -0.35;
    implementGroup.add(hitchRight);

    // PTO Shaft
    const ptoGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
    const ptoMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6 });
    const ptoShaft = new THREE.Mesh(ptoGeo, ptoMat);
    ptoShaft.rotation.z = 1.57;
    ptoShaft.position.set(0.5, 0.35, 0);
    implementGroup.add(ptoShaft);

    // Implements definitions
    const rotavatorBladesGroup = new THREE.Group();

    if (activeImplement === 'rotavator') {
      // Rotavator Housing
      const hoodRotGeo = new THREE.BoxGeometry(0.8, 0.5, 2.2);
      const hoodRotMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
      const rotHood = new THREE.Mesh(hoodRotGeo, hoodRotMat);
      rotHood.position.set(0, 0.4, 0);
      implementGroup.add(rotHood);

      // Central Rotor Shaft & Curved Blades
      const rotorShaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.1, 12);
      const rotorShaft = new THREE.Mesh(rotorShaftGeo, darkMetalMat);
      rotorShaft.rotation.x = Math.PI / 2;
      rotavatorBladesGroup.add(rotorShaft);

      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 4;
        const bladeGeo = new THREE.BoxGeometry(0.35, 0.06, 0.05);
        const blade = new THREE.Mesh(bladeGeo, darkMetalMat);
        blade.position.set(Math.cos(angle) * 0.22, Math.sin(angle) * 0.22, -0.9 + i * 0.2);
        blade.rotation.z = angle;
        rotavatorBladesGroup.add(blade);
      }
      rotavatorBladesGroup.position.set(0, 0.1, 0);
      implementGroup.add(rotavatorBladesGroup);
    } else if (activeImplement === 'plough') {
      // Disc Plough with 3 concave discs
      const beamGeo = new THREE.BoxGeometry(1.6, 0.15, 0.15);
      const beam = new THREE.Mesh(beamGeo, darkMetalMat);
      beam.position.set(0, 0.3, 0);
      beam.rotation.y = 0.4;
      implementGroup.add(beam);

      for (let i = 0; i < 3; i++) {
        const discGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.05, 16);
        const disc = new THREE.Mesh(discGeo, darkMetalMat);
        disc.position.set(-0.5 + i * 0.5, 0.1, -0.4 + i * 0.4);
        disc.rotation.x = 0.5;
        disc.rotation.y = 0.3;
        implementGroup.add(disc);
      }
    } else if (activeImplement === 'seeder') {
      // Seed Drill Box & 7 Tynes
      const seedBoxGeo = new THREE.BoxGeometry(0.7, 0.8, 2.0);
      const seedBox = new THREE.Mesh(seedBoxGeo, accentMat);
      seedBox.position.set(0, 0.6, 0);
      implementGroup.add(seedBox);

      for (let i = 0; i < 7; i++) {
        const tyneGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 8);
        const tyne = new THREE.Mesh(tyneGeo, darkMetalMat);
        tyne.position.set(0, 0.0, -0.8 + i * 0.26);
        tyne.rotation.z = 0.3;
        implementGroup.add(tyne);
      }
    }

    // Animation & Interaction Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Mouse drag interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      tractor.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(1, Math.min(10, camera.position.y - deltaY * 0.02));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile responsiveness
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !interactive || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      tractor.rotation.y += deltaX * 0.015;
      camera.position.y = Math.max(1, Math.min(10, camera.position.y - deltaY * 0.02));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        tractor.rotation.y += delta * autoRotateSpeed;
      }

      // Spin rotavator blades if attached
      if (activeImplement === 'rotavator' && rotavatorBladesGroup) {
        rotavatorBladesGroup.rotation.x += delta * 6;
      }

      // Slight realistic engine vibration idle
      tractor.position.y = Math.sin(clock.getElapsedTime() * 12) * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js resources
      renderer.dispose();
      soilGeo.dispose();
      soilMat.dispose();
      bodyMat.dispose();
      accentMat.dispose();
      darkMetalMat.dispose();
      tyreMat.dispose();
      rimMat.dispose();
    };
  }, [activeImplement, isRotating, viewWireframe, interactive, autoRotateSpeed]);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a160e] to-[#122218] border border-emerald-900/40 shadow-xl ${className}`}>
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD controls */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-auto">
        <span className="px-3 py-1 bg-emerald-900/80 backdrop-blur-md text-emerald-200 text-xs font-semibold rounded-full border border-emerald-700/60 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Three.js 3D Telemetry Twin
        </span>

        {selectedPart && (
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-xs rounded-full border border-amber-500/30">
            {selectedPart}
          </span>
        )}
      </div>

      {/* Implement Switcher Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveImplement('rotavator')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activeImplement === 'rotavator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Rotavator
          </button>
          <button
            onClick={() => setActiveImplement('plough')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activeImplement === 'plough'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Disc Plough
          </button>
          <button
            onClick={() => setActiveImplement('seeder')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activeImplement === 'seeder'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Seed Drill
          </button>
          <button
            onClick={() => setActiveImplement('none')}
            className={`px-2 py-1 text-xs rounded-lg font-medium transition ${
              activeImplement === 'none'
                ? 'bg-zinc-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Chassis Only
          </button>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause auto-rotation' : 'Start auto-rotation'}
            className={`p-1.5 rounded-lg text-xs transition ${
              isRotating ? 'text-emerald-400 bg-emerald-950/60' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </button>

          <button
            onClick={() => setViewWireframe(!viewWireframe)}
            title="Toggle Wireframe Telemetry"
            className={`p-1.5 rounded-lg text-xs transition ${
              viewWireframe ? 'text-amber-400 bg-amber-950/60' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
