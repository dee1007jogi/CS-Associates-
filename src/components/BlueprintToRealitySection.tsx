import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlueprintToRealitySectionProps {
  onOpenConsultation?: () => void;
}

export const BlueprintToRealitySection: React.FC<BlueprintToRealitySectionProps> = ({
  onOpenConsultation
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasSectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);

  const postToIframe = (data: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(data, '*');
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvasSection = canvasSectionRef.current;
    if (!wrapper || !canvasSection) return;

    // Connect with Lenis smooth scroll if present on window
    const lenis = window.__lenis;
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    const isMobile = window.innerWidth < 768;
    const pinDistance = isMobile ? 1800 : 2600;

    // GSAP ScrollTrigger: Pin container at top top (ZERO gap above) and scrub 3D progress
    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top', // Pins seamlessly at viewport top with 0px gap
      end: `+=${pinDistance}`,
      pin: canvasSection,
      pinSpacing: true,
      scrub: 1.0, // Smooth scrubbing inertia
      anticipatePin: 1,
      onEnter: () => {
        postToIframe({ type: 'SET_VISIBILITY', isVisible: true });
        postToIframe({ type: 'RESIZE' });
      },
      onLeaveBack: () => {
        postToIframe({ type: 'RESIZE' });
      },
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        postToIframe({
          type: 'SET_PROGRESS',
          progress: p
        });
      }
    });

    const handleResize = () => {
      postToIframe({ type: 'RESIZE' });
      ScrollTrigger.refresh();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        postToIframe({ type: 'SET_VISIBILITY', isVisible: false });
      } else {
        if (trigger.isActive) {
          postToIframe({ type: 'SET_VISIBILITY', isVisible: true });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      postToIframe({ type: 'SET_VISIBILITY', isVisible: false });
      trigger.kill();
    };
  }, []);

  // Determine current active phase name from progress
  const getPhaseName = (p: number) => {
    if (p < 0.25) return 'Phase 01 // Substructure & Raft';
    if (p < 0.50) return 'Phase 02 // RCC Framing & Cantilevers';
    if (p < 0.75) return 'Phase 03 // Clash-Free MEP & Facades';
    return 'Phase 04 // Luxury Sovereign Estate';
  };

  const pct = Math.round(progress * 100);

  return (
    <div
      ref={wrapperRef}
      id="blueprint-assembly"
      className="relative w-full p-0 m-0 bg-[#040810] overflow-hidden select-none"
    >
      {/* 3D Scrollytelling Pinned Container - Full viewport with 0 gap */}
      <div
        ref={canvasSectionRef}
        className="relative w-full h-screen p-0 m-0 bg-[#040810] overflow-hidden"
      >
        {/* WebGL Iframe Container */}
        <iframe
          ref={iframeRef}
          src="/blueprint_to_reality_estate.html"
          title="CS Associates - Blueprint to Reality: Interactive Architectural Assembly"
          className="w-full h-full border-0 block p-0 m-0 pointer-events-none sm:pointer-events-auto"
          loading="lazy"
          allow="fullscreen"
        />

        {/* Minimalist Floating Scrollytelling Progress HUD */}
        <div className="absolute top-4 left-4 right-4 md:left-8 md:right-8 z-30 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#080e1a]/85 backdrop-blur-md border border-orange-500/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]" />
            <span className="text-[11px] md:text-xs font-mono tracking-wider text-orange-400 font-semibold uppercase">
              Blueprint &rarr; Reality
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline text-[11px] md:text-xs font-medium text-neutral-300">
              {getPhaseName(progress)}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080e1a]/85 backdrop-blur-md border border-white/10 shadow-lg">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] md:text-xs font-mono font-bold text-white tracking-wide">
              {pct}%
            </span>
          </div>
        </div>

        {/* Scrubbing Scroll Indicator (Only visible before completion) */}
        {progress < 0.95 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5 opacity-80 transition-opacity">
            <span className="text-[10px] md:text-xs font-mono text-neutral-400 tracking-widest uppercase">
              Scroll down to assemble structure
            </span>
            <ArrowDown className="w-4 h-4 text-orange-400 animate-bounce" />
          </div>
        )}

        {/* Completion Milestone Pill when finished */}
        {progress >= 0.95 && onOpenConsultation && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bring Your Architectural Blueprint to Reality &rarr;</span>
            </button>
          </div>
        )}

        {/* Dynamic Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-neutral-900/60 z-30">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 transition-all duration-75 shadow-[0_0_10px_#f97316]"
            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
