import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';

interface ConstructionHero3DProps {
  onOpenConsultation?: () => void;
  nextSectionId?: string;
}

export const ConstructionHero3D: React.FC<ConstructionHero3DProps> = ({
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isTourComplete, setIsTourComplete] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const isTourCompleteRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastSentProgressRef = useRef(-1);
  const animFrameRef = useRef<number | null>(null);

  // Smooth continuous lerp loop that streams progress to the 3D scene without stopping or discrete locks
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        // Crisp, fluid responsiveness
        currentProgressRef.current += diff * 0.18;
        
        // Firm snap to boundaries
        if (targetProgressRef.current === 0 && currentProgressRef.current < 0.005) {
          currentProgressRef.current = 0;
        } else if (targetProgressRef.current === 1 && currentProgressRef.current > 0.995) {
          currentProgressRef.current = 1;
        }

        const p = Math.max(0, Math.min(1, currentProgressRef.current));
        
        // Throttled postMessage: only send if progress moved by >= 0.0015 or hit boundaries
        if (
          Math.abs(p - lastSentProgressRef.current) >= 0.0015 ||
          p === 0 ||
          p === 1
        ) {
          lastSentProgressRef.current = p;
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'SCROLL_STAGES',
                progress: p
              },
              '*'
            );
          }
        }

        // Active stage indicator calculation
        const stageIdx = p < 0.17 ? 0 : p < 0.5 ? 1 : p < 0.83 ? 2 : 3;
        setActiveStage((prev) => (prev !== stageIdx ? stageIdx : prev));

        // Tour completion threshold
        const tourDone = p >= 0.95;
        if (tourDone !== isTourCompleteRef.current) {
          isTourCompleteRef.current = tourDone;
          setIsTourComplete(tourDone);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Central continuous scroll controller for desktop mouse wheel
  const handleScrollDelta = useCallback((deltaY: number, preventDefaultFn?: () => void) => {
    // If user has already scrolled down past the hero, let native scroll handle it
    if (window.scrollY > 25) return;
    if (Math.abs(deltaY) < 1.0) return;

    const SCROLL_SENSITIVITY = 0.0016;

    if (deltaY > 0) {
      // User is scrolling DOWN
      if (targetProgressRef.current < 0.98) {
        if (preventDefaultFn) preventDefaultFn();
        targetProgressRef.current = Math.min(1.0, targetProgressRef.current + deltaY * SCROLL_SENSITIVITY);
      } else {
        if (!preventDefaultFn) {
          window.scrollBy({ top: deltaY, behavior: 'auto' });
        }
      }
    } else if (deltaY < 0) {
      // User is scrolling UP
      if (window.scrollY <= 15) {
        if (targetProgressRef.current > 0.01) {
          if (preventDefaultFn) preventDefaultFn();
          const nextP = targetProgressRef.current + deltaY * SCROLL_SENSITIVITY;
          targetProgressRef.current = nextP <= 0.01 ? 0 : Math.max(0, nextP);
        }
      }
    }
  }, []);

  // Sync scroll gestures: Desktop wheel + Mobile window scroll without scroll-locking
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // On mobile screens, disable mouse wheel interception
      if (window.innerWidth < 768) return;

      if (window.scrollY > 20) return;

      if (e.deltaY > 0 && targetProgressRef.current >= 0.98) {
        return; // Allow native browser scroll down
      }

      if (e.deltaY < 0 && targetProgressRef.current <= 0.01) {
        return;
      }

      handleScrollDelta(e.deltaY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    // Mobile-optimized window scroll sync: 3D scene smoothly progresses as the page scrolls
    const handleWindowScroll = () => {
      if (window.innerWidth < 768) {
        const heroH = containerRef.current?.offsetHeight || window.innerHeight;
        // Map 0 to 70% of hero height to progress 0 to 1
        const p = Math.min(1.0, Math.max(0, window.scrollY / (heroH * 0.7)));
        targetProgressRef.current = p;
      }
    };

    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.type === 'IFRAME_WHEEL') {
          handleScrollDelta(event.data.deltaY);
        } else if (event.data.type === 'MOBILE_SCROLL') {
          // Native smooth mobile scroll forwarded from 3D viewport without locking
          const dy = event.data.deltaY;
          if (window.__lenis) {
            window.__lenis.scrollTo(window.scrollY + dy * 1.15, { immediate: true });
          } else {
            window.scrollBy({ top: dy * 1.15, behavior: 'auto' });
          }
        } else if (event.data.type === 'RESET_VIEW') {
          targetProgressRef.current = 0;
          currentProgressRef.current = 0;
          lastSentProgressRef.current = 0;
          setActiveStage(0);
          isTourCompleteRef.current = false;
          setIsTourComplete(false);
        } else if (event.data.type === 'OPEN_CONSULTATION') {
          if (onOpenConsultation) onOpenConsultation();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [handleScrollDelta]);

  // Pause 3D WebGL rendering when hero canvas is scrolled off-screen to free 100% GPU/CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'SET_VISIBILITY',
                isVisible
              },
              '*'
            );
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[88vh] sm:h-screen min-h-[580px] sm:min-h-[640px] max-h-[1050px] overflow-hidden bg-neutral-950 flex flex-col justify-between select-none"
    >
      {/* 3D Scene Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          src="/architectural_construction_3d.html"
          title="Architectural Construction 3D Simulation"
          className="w-full h-full border-0 select-none pointer-events-auto"
          loading="eager"
          allow="fullscreen"
        />
      </div>

      {/* Top spacer for breathing room below sticky header */}
      <div className="h-10 pointer-events-none" />

      {/* Bottom Action HUD: Mobile Call & Consult Buttons */}
      <div className="relative z-20 px-3.5 sm:px-6 pointer-events-none pb-6 sm:pb-8 flex flex-col items-center justify-center">
        {/* Mobile Action Buttons: Call & Consult (Positioned higher above the trees) */}
        <div className="pointer-events-auto flex sm:hidden items-center justify-center gap-2.5 w-full max-w-xs mb-44 sm:mb-0">
          <a
            href="tel:8296266389"
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-neutral-900/95 backdrop-blur-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-700/80 shadow-2xl shadow-black/60 active:scale-95 transition-all"
            title="Call CS Associates Desk"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>Call Desk</span>
          </a>
          <button
            onClick={onOpenConsultation}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-2xl shadow-orange-500/40 active:scale-95 transition-all cursor-pointer"
            title="Schedule Consultation"
          >
            <span>Consult</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frosted Bottom Blur Tile & Seamless Gradient Seam */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent backdrop-blur-[4px] pointer-events-none z-10"
        aria-hidden="true"
      />
    </div>
  );
};
