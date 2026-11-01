'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RobotMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  // Motion state refs for 60fps smooth interpolation (lerp)
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const isHovered = useRef(false);
  const lastMouseMove = useRef(Date.now());
  const rafId = useRef<number | null>(null);

  // Direct DOM refs to avoid React re-renders on every animation frame
  const headRef = useRef<HTMLDivElement>(null);
  const eyesGroupRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse tracking handler
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMove.current = Date.now();
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized offset from mascot center (-1 to +1)
      const maxDistanceX = window.innerWidth / 1.4;
      const maxDistanceY = window.innerHeight / 1.4;

      const rawDx = (e.clientX - centerX) / maxDistanceX;
      const rawDy = (e.clientY - centerY) / maxDistanceY;

      // Clamp between -1 and 1
      targetX.current = Math.max(-1, Math.min(1, rawDx));
      targetY.current = Math.max(-1, Math.min(1, rawDy));
    };

    // Touch tracking for tablets and mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && containerRef.current) {
        lastMouseMove.current = Date.now();
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxDistanceX = window.innerWidth / 1.2;
        const maxDistanceY = window.innerHeight / 1.2;

        const rawDx = (touch.clientX - centerX) / maxDistanceX;
        const rawDy = (touch.clientY - centerY) / maxDistanceY;

        targetX.current = Math.max(-1, Math.min(1, rawDx));
        targetY.current = Math.max(-1, Math.min(1, rawDy));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Blink timer (natural periodic blinking every 3.5 - 5 seconds)
    let blinkTimeout: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3200 + Math.random() * 2400;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // 25% chance of a quick double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => setIsBlinking(false), 120);
            }, 160);
          }
          scheduleNextBlink();
        }, 140);
      }, delay);
    };
    scheduleNextBlink();

    // Main 60fps Animation Loop
    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const idleTime = (Date.now() - lastMouseMove.current) / 1000;

      // If user hasn't moved mouse for 2.2s, smoothly transition to gentle autonomous idle wander
      if (idleTime > 2.2 && !isHovered.current) {
        const idleWave = Math.sin(elapsed * 0.9);
        const idlePitch = Math.cos(elapsed * 0.7);
        targetX.current = idleWave * 0.45;
        targetY.current = idlePitch * 0.25;
      }

      // Linear interpolation (lerp) for ultra-smooth responsiveness
      const lerpFactor = prefersReducedMotion ? 0.02 : 0.085;
      currentX.current += (targetX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      const x = currentX.current;
      const y = currentY.current;

      // Floating bobbing motion (sine wave)
      const floatOffsetY = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.8) * 12;
      const floatTiltZ = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.2) * 2;

      // 1. Overall mascot levitation
      if (floatRef.current) {
        floatRef.current.style.transform = `translateY(${floatOffsetY}px) rotateZ(${floatTiltZ}deg)`;
      }

      // 2. Soft floor shadow reactivity (expands when closer, contracts when higher)
      if (shadowRef.current) {
        const shadowScale = 1 - (floatOffsetY / 12) * 0.12;
        const shadowOpacity = 0.45 - (floatOffsetY / 12) * 0.1;
        shadowRef.current.style.transform = `scale(${shadowScale}) translateX(${x * 15}px)`;
        shadowRef.current.style.opacity = `${shadowOpacity}`;
      }

      // 3. Head 3D Rotation (Yaw, Pitch, Roll)
      if (headRef.current) {
        const headYaw = x * 26; // rotateY
        const headPitch = -y * 20; // rotateX
        const headRoll = x * 7; // rotateZ
        const headTransX = x * 10;
        const headTransY = y * 8;
        headRef.current.style.transform = `translate3d(${headTransX}px, ${headTransY}px, 20px) rotateY(${headYaw}deg) rotateX(${headPitch}deg) rotateZ(${headRoll}deg)`;
      }

      // 4. Digital Eyes Tracking inside Visor
      if (eyesGroupRef.current) {
        const eyeX = x * 16;
        const eyeY = y * 11;
        eyesGroupRef.current.style.transform = `translate3d(${eyeX}px, ${eyeY}px, 15px)`;
      }

      // 5. Body / Torso follows with anatomical lag (about 35% of head motion)
      if (bodyRef.current) {
        const bodyYaw = x * 10;
        const bodyPitch = -y * 8;
        const bodyRoll = x * 3;
        bodyRef.current.style.transform = `rotateY(${bodyYaw}deg) rotateX(${bodyPitch}deg) rotateZ(${bodyRoll}deg)`;
      }

      // 6. Floating Hands Inertia & Reactivity
      if (leftHandRef.current) {
        const handFloat = Math.sin(elapsed * 2.2 + 0.8) * 6;
        const handX = -12 + x * 8;
        const handY = handFloat + y * 12;
        const handRot = -x * 12 + Math.sin(elapsed * 1.5) * 4;
        leftHandRef.current.style.transform = `translate3d(${handX}px, ${handY}px, 30px) rotateZ(${handRot}deg)`;
      }

      if (rightHandRef.current) {
        const handFloat = Math.cos(elapsed * 2.2) * 6;
        const handX = 12 + x * 8;
        const handY = handFloat + y * 12;
        const handRot = -x * 12 + Math.cos(elapsed * 1.5) * 4;
        rightHandRef.current.style.transform = `translate3d(${handX}px, ${handY}px, 30px) rotateZ(${handRot}deg)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHovered.current = true;
        setIsHappy(true);
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        setIsHappy(false);
      }}
      className="relative w-full max-w-[460px] lg:max-w-[500px] h-[440px] sm:h-[480px] lg:h-[520px] mx-auto flex items-center justify-center select-none"
      style={{
        perspective: '1200px',
        background: 'transparent',
      }}
      aria-label="Interactive 3D Robot Mascot"
      role="img"
    >
      {/* ============================================================== */}
      {/* FLOATING ROOT RIG (Natural Levitating Entity)                   */}
      {/* ============================================================== */}
      <div
        ref={floatRef}
        className="relative w-[340px] h-[440px] sm:w-[380px] sm:h-[480px] flex flex-col items-center justify-center will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ========================================================== */}
        {/* TOP ANTENNA & ENERGY BEACON                                */}
        {/* ========================================================== */}
        <div
          className="relative z-30 flex flex-col items-center -mb-2"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Pulsing Blue Beacon Sphere */}
          <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-[#0055ff] via-[#00d4ff] to-[#e0f9ff] shadow-[0_0_16px_#00d4ff,0_0_30px_rgba(0,180,255,0.7)] animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white blur-[0.5px]" />
          </div>
          {/* Metallic Antenna Stem */}
          <div className="w-1.5 h-6 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full shadow-inner -mt-1" />
          {/* Antenna Base Collar */}
          <div className="w-6 h-2 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-full shadow-sm -mt-0.5 border border-slate-300" />
        </div>

        {/* ========================================================== */}
        {/* 3D ROBOT HEAD                                              */}
        {/* ========================================================== */}
        <div
          ref={headRef}
          className="relative z-20 w-[240px] h-[175px] sm:w-[270px] sm:h-[195px] will-change-transform flex items-center justify-center cursor-pointer transition-[filter] duration-300 hover:brightness-105"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Side Cyber-Ears / Audio Sensor Pods */}
          {/* Left Ear */}
          <div
            className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-6 h-14 rounded-l-2xl bg-gradient-to-r from-slate-400 via-slate-200 to-slate-300 border border-slate-300/80 shadow-[-4px_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center"
            style={{ transform: 'translateZ(-10px)' }}
          >
            <div className="w-2 h-8 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          </div>

          {/* Right Ear */}
          <div
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-14 rounded-r-2xl bg-gradient-to-l from-slate-400 via-slate-200 to-slate-300 border border-slate-300/80 shadow-[4px_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center"
            style={{ transform: 'translateZ(-10px)' }}
          >
            <div className="w-2 h-8 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          </div>

          {/* Outer Head Shell (Pearl White Ceramic & Brushed Silver Edge) */}
          <div
            className="relative w-full h-full rounded-[65px] p-2.5 sm:p-3 shadow-[0_20px_45px_-12px_rgba(0,71,186,0.22),0_10px_25px_-8px_rgba(15,23,42,0.18)]"
            style={{
              background:
                'linear-gradient(145deg, #ffffff 0%, #f4f7fb 45%, #e1e9f2 85%, #cbd5e1 100%)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Top Gloss Specular Highlight */}
            <div
              className="absolute top-2 left-6 right-6 h-12 rounded-[50px] opacity-75 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 75%)',
              }}
            />

            {/* Dark Curved Glass Visor (The Screen Face) */}
            <div
              className="relative w-full h-full rounded-[50px] overflow-hidden flex items-center justify-center border border-slate-700/60 shadow-[inset_0_4px_16px_rgba(0,0,0,0.85),0_0_15px_rgba(0,180,255,0.15)]"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, #0d1726 0%, #080e18 65%, #030710 100%)',
              }}
            >
              {/* Glass Visor Top Diagonal Gloss Reflection */}
              <div
                className="absolute -top-12 -left-8 w-44 h-48 rounded-full rotate-45 pointer-events-none opacity-25"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 65%)',
                }}
              />

              {/* Visor Subtle Curved Ambient Grid Lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, #00d4ff 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* ==================================================== */}
              {/* INTERACTIVE GLOWING ELECTRIC BLUE EYES               */}
              {/* ==================================================== */}
              <div
                ref={eyesGroupRef}
                className="relative flex items-center justify-center gap-7 sm:gap-9 will-change-transform z-10"
              >
                {/* Left Eye */}
                <div
                  className={`relative transition-all duration-150 ease-out ${
                    isBlinking
                      ? 'scale-y-[0.08] opacity-70'
                      : isHappy
                      ? 'scale-y-90 scale-x-105'
                      : 'scale-y-100 scale-x-100'
                  }`}
                >
                  {/* Glowing Eye Capsule */}
                  <div
                    className={`w-9 h-11 sm:w-11 sm:h-13 rounded-full flex items-center justify-center ${
                      isHappy
                        ? 'rounded-t-full rounded-b-none h-8 sm:h-10 border-t-4 border-[#00f0ff]'
                        : ''
                    }`}
                    style={{
                      background: isHappy
                        ? 'linear-gradient(180deg, #00f0ff 0%, #0066ff 100%)'
                        : 'linear-gradient(180deg, #e0f9ff 0%, #00f0ff 40%, #0052cc 100%)',
                      boxShadow:
                        '0 0 14px #00f0ff, 0 0 28px rgba(0, 160, 255, 0.8), inset 0 0 6px #ffffff',
                    }}
                  >
                    {/* Inner Pupil Specular Catchlight */}
                    {!isHappy && !isBlinking && (
                      <div className="w-2.5 h-3 rounded-full bg-white opacity-95 -mt-2 -ml-1 blur-[0.4px]" />
                    )}
                  </div>
                </div>

                {/* Right Eye */}
                <div
                  className={`relative transition-all duration-150 ease-out ${
                    isBlinking
                      ? 'scale-y-[0.08] opacity-70'
                      : isHappy
                      ? 'scale-y-90 scale-x-105'
                      : 'scale-y-100 scale-x-100'
                  }`}
                >
                  {/* Glowing Eye Capsule */}
                  <div
                    className={`w-9 h-11 sm:w-11 sm:h-13 rounded-full flex items-center justify-center ${
                      isHappy
                        ? 'rounded-t-full rounded-b-none h-8 sm:h-10 border-t-4 border-[#00f0ff]'
                        : ''
                    }`}
                    style={{
                      background: isHappy
                        ? 'linear-gradient(180deg, #00f0ff 0%, #0066ff 100%)'
                        : 'linear-gradient(180deg, #e0f9ff 0%, #00f0ff 40%, #0052cc 100%)',
                      boxShadow:
                        '0 0 14px #00f0ff, 0 0 28px rgba(0, 160, 255, 0.8), inset 0 0 6px #ffffff',
                    }}
                  >
                    {/* Inner Pupil Specular Catchlight */}
                    {!isHappy && !isBlinking && (
                      <div className="w-2.5 h-3 rounded-full bg-white opacity-95 -mt-2 -ml-1 blur-[0.4px]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expressive Cute Mouth / Status Pulse Bar */}
              <div className="absolute bottom-4 flex items-center justify-center">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isHappy
                      ? 'w-10 bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] rounded-b-xl h-2.5'
                      : 'w-6 bg-[#00d4ff]/70 shadow-[0_0_8px_#00d4ff]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* ARTICULATED COLLAR / NECK JOINT                            */}
        {/* ========================================================== */}
        <div
          className="relative z-10 w-24 h-5 -mt-1.5 rounded-full bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 border border-slate-400/80 shadow-md flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Blue Cyber Fiber Seam */}
          <div className="w-16 h-1 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff]" />
        </div>

        {/* ========================================================== */}
        {/* 3D TORSO & BODY CHASSIS WITH FLOATING ARMS                 */}
        {/* ========================================================== */}
        <div className="relative w-full flex items-center justify-center -mt-2">
          {/* Left Floating Hand */}
          <div
            ref={leftHandRef}
            className="absolute -left-1 sm:-left-3 top-6 w-9 h-18 sm:w-11 sm:h-22 rounded-full will-change-transform z-20 flex flex-col items-center justify-center"
            style={{
              background:
                'linear-gradient(160deg, #ffffff 0%, #f0f4f8 40%, #cbd5e1 100%)',
              boxShadow:
                '-4px 10px 20px rgba(0,71,186,0.18), inset 0 2px 4px rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(255,255,255,0.9)',
            }}
          >
            {/* Palm Energy Core */}
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-[#0055ff] to-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          </div>

          {/* Right Floating Hand */}
          <div
            ref={rightHandRef}
            className="absolute -right-1 sm:-right-3 top-6 w-9 h-18 sm:w-11 sm:h-22 rounded-full will-change-transform z-20 flex flex-col items-center justify-center"
            style={{
              background:
                'linear-gradient(160deg, #ffffff 0%, #f0f4f8 40%, #cbd5e1 100%)',
              boxShadow:
                '4px 10px 20px rgba(0,71,186,0.18), inset 0 2px 4px rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(255,255,255,0.9)',
            }}
          >
            {/* Palm Energy Core */}
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-[#0055ff] to-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          </div>

          {/* Central Torso Shell */}
          <div
            ref={bodyRef}
            className="relative w-[170px] h-[165px] sm:w-[195px] sm:h-[185px] rounded-[55px] p-3 shadow-[0_22px_45px_-10px_rgba(0,71,186,0.2),0_12px_24px_-8px_rgba(15,23,42,0.15)] will-change-transform flex flex-col items-center justify-between"
            style={{
              background:
                'linear-gradient(165deg, #ffffff 0%, #f8fafc 35%, #e2e8f0 80%, #cbd5e1 100%)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Specular Highlight on Shoulder Arch */}
            <div
              className="absolute top-1.5 left-6 right-6 h-10 rounded-full opacity-80 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)',
              }}
            />

            {/* Futuristic Chest Plate & ARC Reactor Core */}
            <div className="relative mt-3 flex flex-col items-center">
              {/* Outer Reactor Bezel Ring */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 p-1 shadow-inner flex items-center justify-center border border-slate-300">
                {/* Glowing Blue AI Core Reactor */}
                <div className="relative w-full h-full rounded-full bg-[#0a1120] flex items-center justify-center overflow-hidden shadow-[inset_0_0_10px_#00d4ff]">
                  {/* Rotating / Pulsing Core Glow */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#0047ba] via-[#00d4ff] to-[#70e5ff] animate-pulse opacity-90 shadow-[0_0_15px_#00d4ff]" />
                  {/* Velora V / Lab Emblem Core */}
                  <div className="relative z-10 text-white font-extrabold text-xs tracking-widest drop-shadow-[0_0_4px_#ffffff]">
                    V
                  </div>
                </div>
              </div>

              {/* Futuristic Tech Seams / Chest Inscription */}
              <div className="mt-2 text-[9px] font-mono tracking-widest uppercase text-slate-500 font-semibold flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00d4ff]" />
                VELORA AI
                <span className="w-1 h-1 rounded-full bg-[#00d4ff]" />
              </div>
            </div>

            {/* Bottom Anti-Gravity Thruster Nozzle */}
            <div className="relative -mb-2 flex flex-col items-center">
              <div className="w-14 h-3 rounded-full bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 border border-slate-400" />
              {/* Blue Ion Plasma Exhaust Field */}
              <div
                className="w-16 h-4 -mt-1 rounded-full opacity-90 blur-[2px] animate-pulse"
                style={{
                  background:
                    'radial-gradient(ellipse at center, #00f0ff 0%, #0066ff 60%, transparent 100%)',
                  boxShadow: '0 4px 18px #00d4ff',
                }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SOFT NATURAL GROUND SHADOW (No Card/Box/Frame)             */}
        {/* ========================================================== */}
        <div
          ref={shadowRef}
          className="absolute -bottom-7 w-44 sm:w-52 h-7 rounded-[100%] will-change-transform pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 71, 186, 0.28) 0%, rgba(15, 23, 42, 0.16) 40%, transparent 75%)',
            filter: 'blur(7px)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
