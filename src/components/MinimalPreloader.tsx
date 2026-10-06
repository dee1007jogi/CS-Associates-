import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import csLogo from '../assets/images/cs_logo_transparent.png';

interface MinimalPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // duration in ms
}

export const MinimalPreloader: React.FC<MinimalPreloaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const percentRef = useRef<HTMLSpanElement>(null);

  // Circle dimensions
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~427.26
  const durationSec = (minDuration / 1000).toFixed(2);

  useEffect(() => {
    // Lock body scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let animFrameId: number;
    let finishTimeoutId: ReturnType<typeof setTimeout>;
    const startTime = performance.now();

    // Direct DOM text update - zero React re-renders while counting
    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / minDuration);
      // Easing curve closely tracking cubic-bezier(0.25, 1, 0.45, 1)
      const easedRatio = 1 - Math.pow(1 - progressRatio, 2.8);
      const currentPct = Math.min(100, Math.round(easedRatio * 100));

      if (percentRef.current) {
        percentRef.current.textContent = `${currentPct}%`;
      }

      if (progressRatio < 1) {
        animFrameId = requestAnimationFrame(updateCounter);
      } else {
        if (percentRef.current) {
          percentRef.current.textContent = '100%';
        }
        // Brief settle at 100% for satisfying visual completion before cinematic exit
        finishTimeoutId = setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 220);
      }
    };

    animFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(finishTimeoutId);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    document.body.style.overflow = '';
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="minimal-circle-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(10px)',
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#07090e] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden"
          onClick={handleSkip}
          title="Click to enter immediately"
        >
          {/* Hardware-accelerated GPU animations - 100% decoupled from JS main-thread load */}
          <style>{`
            @keyframes preloaderStrokeFill {
              0% {
                stroke-dashoffset: 427.26;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes preloaderBeaconSpin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes preloaderOuterOrbit {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .animate-preloader-stroke {
              animation: preloaderStrokeFill ${durationSec}s cubic-bezier(0.25, 1, 0.45, 1) forwards;
              will-change: stroke-dashoffset;
            }
            .animate-preloader-beacon {
              transform-origin: 80px 80px;
              animation: preloaderBeaconSpin ${durationSec}s cubic-bezier(0.25, 1, 0.45, 1) forwards;
              will-change: transform;
            }
            .animate-preloader-orbit {
              animation: preloaderOuterOrbit 24s linear infinite;
              will-change: transform;
            }
          `}</style>

          {/* Subtle Ambient Radial Backlight behind the logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Bar: Minimal Brand Mark & Skip Action */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span className="text-neutral-300 font-semibold tracking-widest uppercase">
                CS Associates PMC
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="text-[10px] uppercase font-mono px-3 py-1 rounded-md border border-neutral-800 bg-neutral-900/60 hover:border-orange-500/80 text-neutral-400 hover:text-orange-400 transition-colors shadow-sm"
            >
              Skip ↗
            </button>
          </div>

          {/* Center Stage: Minimal Circle around CS Associates Logo */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            {/* Circular Ring Container */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              {/* Animated Outer Orbit Accent (Slow Precision Rotation via CSS) */}
              <div
                className="animate-preloader-orbit absolute inset-0 rounded-full border border-dashed border-orange-500/20 pointer-events-none"
              />

              {/* SVG Circular Progress Track */}
              <svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              >
                <defs>
                  <linearGradient id="circleOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>

                  <filter id="orangeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#f97316" floodOpacity="0.75" />
                  </filter>
                </defs>

                {/* Base Inactive Circle Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2.5"
                />

                {/* Active Dynamic Progress Stroke - Compositor-driven pure CSS animation */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="url(#circleOrangeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                  transform="rotate(-90 80 80)"
                  filter="url(#orangeGlow)"
                  className="animate-preloader-stroke"
                />

                {/* Active Orbit Beacon Point - GPU Compositor 360deg rotation synchronized with stroke */}
                <g className="animate-preloader-beacon pointer-events-none">
                  <g transform="translate(80, 12)" style={{ filter: 'drop-shadow(0 0 6px #f97316)' }}>
                    <circle cx="0" cy="0" r="4.5" fill="#f97316" className="animate-ping" opacity="0.6" />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />
                  </g>
                </g>
              </svg>

              {/* Logo Centered Within Circle */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 rounded-full"
              >
                <img
                  src={csLogo}
                  alt="CS Associates"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(249,115,22,0.35)]"
                />
              </motion.div>
            </div>

            {/* Brand Typography & Progress Information */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-6 flex flex-col items-center text-center space-y-1.5"
            >
              <h2 className="text-base sm:text-lg font-display font-bold tracking-[0.28em] text-white uppercase">
                CS Associates
              </h2>
              <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-orange-400 font-semibold">
                Project Management Consultancy
              </p>
              <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-neutral-400 tracking-wider">
                <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                <span ref={percentRef}>0%</span>
              </div>
            </motion.div>
          </div>

          {/* Micro Footer Indicator */}
          <div className="relative z-10 text-center text-[10px] font-mono text-neutral-400">
            BANGALORE · 25+ YEARS EXCELLENCE · CLICK ANYWHERE TO ENTER ↗
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
