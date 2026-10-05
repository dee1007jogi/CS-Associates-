import React, { useEffect, useRef, useState, useCallback } from 'react';

interface HangingHardHatRigProps {
  section1Id?: string; // default: 'protection-matrix'
  anchorTargetId?: string; // default: 'helmetRestAnchor'
}

export const HangingHardHatRig: React.FC<HangingHardHatRigProps> = ({
  section1Id = 'protection-matrix',
  anchorTargetId = 'helmetRestAnchor'
}) => {
  const chainRigRef = useRef<HTMLDivElement>(null);
  const chainLinksRef = useRef<HTMLDivElement>(null);
  const chainHookRef = useRef<HTMLDivElement>(null);
  const helmetAssemblyRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [badgeText, setBadgeText] = useState('100% Site Safety Protocol');
  const [isTugging, setIsTugging] = useState(false);

  // Physics animation reference
  const stateRef = useRef<'CHAIN' | 'FALLING' | 'LANDED'>('CHAIN');
  const currentChainHeightRef = useRef(48);
  const smoothedProgressRef = useRef(0);
  const releaseCoordsRef = useRef({ startX: 0, startY: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Easing function for organic deceleration
  const organicDecel = useCallback((t: number) => {
    return 1 - Math.pow(1 - t, 3.5);
  }, []);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    const chainRig = chainRigRef.current;
    const chainLinks = chainLinksRef.current;
    const chainHook = chainHookRef.current;
    const helmetAssembly = helmetAssemblyRef.current;
    const shadow = shadowRef.current;

    if (!chainRig || !chainLinks || !chainHook || !helmetAssembly || !shadow) return;

    let currentRotX = 0;
    let currentRotY = 0;
    let currentRotZ = 0;
    let currentX = 0;
    let currentY = 0;
    let isMounted = true;

    const updatePhysics = () => {
      if (!isMounted || document.hidden) {
        animFrameIdRef.current = null;
        return;
      }

      const sec1El = document.getElementById(section1Id);
      const anchorEl = document.getElementById(anchorTargetId);

      if (!sec1El || !anchorEl) {
        animFrameIdRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const viewportHeight = window.innerHeight;
      const sec1Rect = sec1El.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();

      // Visibility Gate: Only show if within vicinity of Section 1 or Section 2
      const isAboveSec1 = sec1Rect.top > viewportHeight;
      const isWayBelowSec2 = anchorRect.bottom < -viewportHeight * 0.8;

      if (isAboveSec1 || isWayBelowSec2) {
        chainRig.style.opacity = '0';
        shadow.style.opacity = '0';
        animFrameIdRef.current = requestAnimationFrame(updatePhysics);
        return;
      } else {
        chainRig.style.opacity = '1';
      }

      // Section 1 scroll threshold: When Section 1 bottom scrolls past viewport center-bottom
      const thresholdY = viewportHeight * 0.45;
      const hasCrossedSection1 = sec1Rect.bottom <= thresholdY;

      if (!hasCrossedSection1) {
        // ============================================================
        // STATE 1: SUSPENDED ON CHAIN IN SECTION 1
        // ============================================================
        if (stateRef.current !== 'CHAIN') {
          stateRef.current = 'CHAIN';
          smoothedProgressRef.current = 0;
          currentRotX = 0;
          currentRotY = 0;
          currentRotZ = 0;

          chainRig.appendChild(helmetAssembly);
          helmetAssembly.className = 'helmet-assembly sway-active -mt-1';
          helmetAssembly.style.position = '';
          helmetAssembly.style.top = '';
          helmetAssembly.style.left = '';
          helmetAssembly.style.transform = '';

          chainLinks.classList.remove('chain-retracting');
          chainHook.classList.remove('hook-opened');
          shadow.style.opacity = '0';

          const impactPulse = document.getElementById('landingImpactPulse');
          if (impactPulse) {
            impactPulse.classList.remove('scale-150', 'opacity-0');
            impactPulse.classList.add('scale-0');
          }

          setBadgeText('100% Site Safety Protocol');
        }

        // Chain unspooling based on how deep we are into Section 1
        const maxScrollDist = Math.max(1, sec1El.offsetHeight - viewportHeight * 0.5);
        const distFromTop = Math.max(0, -sec1Rect.top);
        const progressInSec1 = Math.min(Math.max(distFromTop / maxScrollDist, 0), 1);
        const targetChainHeight = 48 + progressInSec1 * 260;

        currentChainHeightRef.current = lerp(currentChainHeightRef.current, targetChainHeight, 0.075);
        chainLinks.style.height = `${currentChainHeightRef.current.toFixed(1)}px`;

      } else {
        // ============================================================
        // TRANSITION TO SECTION 2: DETACHMENT & 3D TUMBLE
        // ============================================================
        if (stateRef.current === 'CHAIN') {
          stateRef.current = 'FALLING';
          chainLinks.classList.add('chain-retracting');
          chainHook.classList.add('hook-opened');

          const helmetRect = helmetAssembly.getBoundingClientRect();
          releaseCoordsRef.current = {
            startX: helmetRect.left,
            startY: helmetRect.top
          };
          currentX = helmetRect.left;
          currentY = helmetRect.top;
          currentRotX = 0;
          currentRotY = 0;
          currentRotZ = 0;

          document.body.appendChild(helmetAssembly);
          helmetAssembly.classList.remove('sway-active');
          helmetAssembly.classList.add('helmet-falling');
          setBadgeText('Descent to Stage 01 Active');
        }

        const totalFallDistance = Math.max(300, viewportHeight * 0.55);
        const distanceIntoProcess = thresholdY - sec1Rect.bottom;
        const targetRawProgress = Math.min(Math.max(distanceIntoProcess / totalFallDistance, 0), 1);

        smoothedProgressRef.current = lerp(smoothedProgressRef.current, targetRawProgress, 0.06);
        const progress = smoothedProgressRef.current;

        if (progress < 0.985) {
          // ============================================================
          // STATE 2: SLOW 3D TUMBLE IN FLIGHT
          // ============================================================
          if (stateRef.current !== 'FALLING') {
            stateRef.current = 'FALLING';
            document.body.appendChild(helmetAssembly);
            helmetAssembly.className = 'helmet-assembly helmet-falling';
            const impactPulse = document.getElementById('landingImpactPulse');
            if (impactPulse) {
              impactPulse.classList.remove('scale-150', 'opacity-0');
              impactPulse.classList.add('scale-0');
            }
          }

          const targetX = anchorRect.left + anchorRect.width / 2 - 64;
          const targetY = anchorRect.top + 8;

          const easedT = organicDecel(progress);
          currentY = lerp(releaseCoordsRef.current.startY, targetY, easedT);
          currentX = lerp(releaseCoordsRef.current.startX, targetX, progress);

          const targetRotZ = progress * 360;
          const wobble = Math.sin(progress * Math.PI * 3.2) * 8;
          currentRotZ = lerp(currentRotZ, targetRotZ + wobble, 0.08);
          currentRotX = Math.sin(progress * Math.PI * 2) * 16;
          currentRotY = Math.cos(progress * Math.PI * 2) * 12;

          const scaleFactor = 1 + Math.sin(progress * Math.PI) * 0.08;

          helmetAssembly.style.position = 'fixed';
          helmetAssembly.style.top = '0px';
          helmetAssembly.style.left = '0px';
          helmetAssembly.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) perspective(900px) rotateX(${currentRotX.toFixed(1)}deg) rotateY(${currentRotY.toFixed(1)}deg) rotateZ(${currentRotZ.toFixed(1)}deg) scale(${scaleFactor.toFixed(3)})`;

          // Trailing shadow
          shadow.style.opacity = `${(progress * 0.6).toFixed(2)}`;
          shadow.style.transform = `translate3d(${currentX + 20}px, ${(currentY + 110 + (1 - progress) * 40).toFixed(2)}px, 0) scale(${Math.max(0.6, progress).toFixed(2)})`;

        } else {
          // ============================================================
          // STATE 3: DOCKED ON STAGE 01 CARD CORNER
          // ============================================================
          if (stateRef.current !== 'LANDED') {
            stateRef.current = 'LANDED';

            anchorEl.appendChild(helmetAssembly);
            helmetAssembly.className = 'helmet-assembly helmet-dropped-state';
            helmetAssembly.style.position = '';
            helmetAssembly.style.top = '';
            helmetAssembly.style.left = '';
            helmetAssembly.style.transform = 'translate3d(0, 0, 0) rotate(-6deg)';

            shadow.style.opacity = '0';
            const impactPulse = document.getElementById('landingImpactPulse');
            if (impactPulse) {
              impactPulse.classList.remove('scale-0');
              impactPulse.classList.add('scale-150', 'opacity-0');
            }

            setBadgeText('Stationed on Site: Stage Oversight Active');
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePhysics);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
        }
      } else if (isMounted) {
        if (!animFrameIdRef.current) {
          animFrameIdRef.current = requestAnimationFrame(updatePhysics);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [section1Id, anchorTargetId, lerp, organicDecel]);

  return (
    <>
      {/* Dynamic Trailing Shadow for Free-fall */}
      <div ref={shadowRef} className="helmet-flight-shadow" />

      {/* Hanging Chain & Hard Hat Rigging Container */}
      <div 
        ref={chainRigRef} 
        className="chain-rig-container select-none hidden md:flex transition-opacity duration-300"
      >
        {/* Ceiling Mount Anchor Bracket */}
        <div className="w-11 h-3.5 bg-neutral-900 rounded-b-md shadow-xl border-t-2 border-orange-500 flex items-center justify-center">
          <div className="w-5 h-2 rounded bg-neutral-700 border border-neutral-500 flex items-center justify-around px-0.5">
            <span className="w-1 h-1 rounded-full bg-neutral-950" />
            <span className="w-1 h-1 rounded-full bg-neutral-950" />
          </div>
        </div>
        
        {/* Steel Chain Links Section */}
        <div ref={chainLinksRef} className="chain-link-strip" style={{ height: '48px' }} />

        {/* Heavy Duty Carabiner / Shackle with Metallic Accent */}
        <div ref={chainHookRef} className="relative -mt-1 flex flex-col items-center transition-all duration-300">
          <svg className="w-6 h-6 text-zinc-300 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.69 2 6 4.69 6 8v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm3 10c0 1.65-1.35 3-3 3s-3-1.35-3-3V8c0-1.65 1.35-3 3-3s3 1.35 3 3v4z"/>
            <rect x="9" y="15" width="6" height="5" rx="1.5" fill="#f97316"/>
          </svg>
        </div>

        {/* Realistic Hanging Hard Hat */}
        <div 
          ref={helmetAssemblyRef} 
          className="helmet-assembly sway-active -mt-1"
          title="CS Associates Verified Safety Gear"
          onMouseDown={() => setIsTugging(true)}
          onMouseUp={() => setIsTugging(false)}
          style={isTugging ? { transform: 'scale(1.12) rotate(10deg)' } : undefined}
        >
          <div className="relative group">
            {/* Badge Popover on Hover */}
            <div className="absolute -left-36 top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-neutral-950/95 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-2xl border border-neutral-700/80 flex items-center gap-1.5 z-50">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>{badgeText}</span>
            </div>

            {/* 3D Vector Hard Hat Illustration */}
            <svg className="w-28 sm:w-32 h-auto" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="shellHighlightReact" cx="38%" cy="28%" r="65%">
                  <stop offset="0%" stopColor="#ff9a5b"/>
                  <stop offset="25%" stopColor="#ff6a1a"/>
                  <stop offset="65%" stopColor="#ea580c"/>
                  <stop offset="85%" stopColor="#c2410c"/>
                  <stop offset="100%" stopColor="#7c2d12"/>
                </radialGradient>
                <linearGradient id="metalChromeReact" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f4f4f5"/>
                  <stop offset="35%" stopColor="#a1a1aa"/>
                  <stop offset="70%" stopColor="#52525b"/>
                  <stop offset="100%" stopColor="#27272a"/>
                </linearGradient>
                <linearGradient id="rimGlossReact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#ff7a29" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#431407" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="reflectStripeReact" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.4"/>
                  <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95"/>
                  <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3"/>
                </linearGradient>
                <filter id="helmetDropShadowReact" x="-20%" y="-10%" width="140%" height="150%">
                  <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.35"/>
                </filter>
              </defs>

              {/* Suspension Eyelet & Fastener */}
              <g transform="translate(118, 4)">
                <ellipse cx="12" cy="10" rx="7" ry="10" fill="url(#metalChromeReact)" stroke="#27272a" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3.5" fill="#18181b"/>
                <rect x="9" y="16" width="6" height="12" rx="1.5" fill="#3f3f46"/>
              </g>

              {/* Outer Shell */}
              <g filter="url(#helmetDropShadowReact)">
                <path d="M42 128 C42 66 84 22 130 22 C176 22 218 66 218 128 C218 135 210 144 196 148 C168 155 92 155 64 148 C50 144 42 135 42 128 Z" fill="url(#shellHighlightReact)"/>
                <path d="M120 22 C124 22 126 38 126 130 C126 142 124 147 130 147 C136 147 134 142 134 130 C134 38 136 22 140 22 C134 20 126 20 120 22 Z" fill="#ffffff" fillOpacity="0.25" style={{ mixBlendMode: 'overlay' }}/>
                <path d="M85 45 C70 70 65 105 68 135" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" opacity="0.45"/>
                <path d="M88 44 C73 69 68 104 71 134" stroke="#fed7aa" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
                <path d="M175 45 C190 70 195 105 192 135" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" opacity="0.45"/>
                <path d="M172 44 C187 69 192 104 189 134" stroke="#fed7aa" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
                <path d="M44 116 C75 125 185 125 216 116 C214 124 204 129 188 133 C155 139 105 139 72 133 C56 129 46 124 44 116 Z" fill="url(#reflectStripeReact)"/>
                <path d="M48 118 C78 126 182 126 212 118" stroke="#ffffff" strokeWidth="1.2" opacity="0.75"/>
                <path d="M72 48 C100 28 145 28 168 38 C150 34 115 36 90 52 C78 60 70 76 68 96 C67 78 68 60 72 48 Z" fill="#ffffff" fillOpacity="0.45"/>
                <path d="M22 138 C20 133 30 128 50 126 C88 122 172 122 210 126 C230 128 240 133 238 138 C236 148 214 160 178 166 C148 171 112 171 82 166 C46 160 24 148 22 138 Z" fill="url(#shellHighlightReact)"/>
                <path d="M24 141 C38 152 74 163 130 163 C186 163 222 152 236 141 C232 151 206 168 130 168 C54 168 28 151 24 141 Z" fill="#431407"/>
                <path d="M22 138 C20 133 30 128 50 126 C88 122 172 122 210 126 C230 128 240 133 238 138" stroke="url(#rimGlossReact)" strokeWidth="2.5" strokeLinecap="round"/>
                <g transform="translate(116, 75)">
                  <rect x="0" y="0" width="28" height="28" rx="7" fill="#18181b" stroke="#f97316" strokeWidth="1.8"/>
                  <text x="14" y="19" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="-0.5">CS</text>
                </g>
                <path d="M68 144 C72 175 90 206 122 210 C154 206 172 175 176 144" fill="none" stroke="#27272a" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 3"/>
                <rect x="114" y="204" width="16" height="8" rx="2" fill="#52525b" stroke="#71717a" strokeWidth="1.2"/>
                <line x1="122" y1="204" x2="122" y2="212" stroke="#27272a" strokeWidth="1.5"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
