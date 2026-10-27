'use client';

import React from 'react';
import Image from 'next/image';

interface HeroFloatingRobotProps {
  className?: string;
}

export default function HeroFloatingRobot({ className = '' }: HeroFloatingRobotProps) {
  return (
    <div
      className={`pointer-events-none select-none z-20 ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes veloraRobotFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1.2deg);
          }
        }

        @keyframes veloraRobotShadowPulse {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes veloraRobotAuraGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.08);
          }
        }

        @keyframes veloraParticleDrift1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-5px, -9px) scale(1.3);
            opacity: 0.85;
          }
        }

        @keyframes veloraParticleDrift2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(6px, -7px) scale(1.25);
            opacity: 0.9;
          }
        }

        @keyframes veloraParticleDrift3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate(-3px, 6px) scale(1.15);
            opacity: 0.75;
          }
        }

        .velora-robot-anim-float {
          animation: veloraRobotFloat 4.2s ease-in-out infinite;
          will-change: transform;
        }

        .velora-robot-anim-shadow {
          animation: veloraRobotShadowPulse 4.2s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .velora-robot-anim-aura {
          animation: veloraRobotAuraGlow 3.8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .velora-robot-anim-p1 {
          animation: veloraParticleDrift1 3.2s ease-in-out infinite;
        }

        .velora-robot-anim-p2 {
          animation: veloraParticleDrift2 4s ease-in-out infinite 0.8s;
        }

        .velora-robot-anim-p3 {
          animation: veloraParticleDrift3 3.6s ease-in-out infinite 1.5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .velora-robot-anim-float,
          .velora-robot-anim-shadow,
          .velora-robot-anim-aura,
          .velora-robot-anim-p1,
          .velora-robot-anim-p2,
          .velora-robot-anim-p3 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Main floating container */}
      <div className="relative flex flex-col items-center">
        {/* Soft radial blue/cyan aura behind the robot */}
        <div
          className="velora-robot-anim-aura absolute -inset-3 sm:-inset-4 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 180, 255, 0.28) 0%, rgba(0, 71, 186, 0.16) 45%, rgba(0, 71, 186, 0) 75%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Floating particles around the robot */}
        <div className="velora-robot-anim-p1 absolute -top-1 -left-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
        <div className="velora-robot-anim-p2 absolute top-1/3 -right-2.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
        <div className="velora-robot-anim-p3 absolute bottom-4 -left-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        <div className="velora-robot-anim-p1 absolute -bottom-1 right-2 w-1 h-1 rounded-full bg-sky-300 shadow-[0_0_4px_#7dd3fc]" />

        {/* Robot figure with floating hover motion */}
        <div className="velora-robot-anim-float relative">
          <div
            className="w-[68px] sm:w-[82px] md:w-[90px] lg:w-[100px] xl:w-[112px] h-auto transition-transform duration-300"
            style={{
              filter:
                'drop-shadow(0 12px 20px rgba(0, 71, 186, 0.18)) drop-shadow(0 3px 6px rgba(2, 132, 199, 0.22))',
            }}
          >
            <Image
              src="/images/about-robot-3d.png"
              alt="VELORA 3D AI companion robot"
              width={634}
              height={860}
              priority
              className="w-full h-auto object-contain select-none"
            />
          </div>
        </div>

        {/* Hover repulsor shadow underneath */}
        <div className="velora-robot-anim-shadow mt-1 w-12 sm:w-16 h-2 rounded-full bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent blur-[2px]" />
      </div>
    </div>
  );
}
