import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface ConstructionHero3DProps {
  onOpenConsultation?: () => void;
  nextSectionId?: string;
}

export const ConstructionHero3D: React.FC<ConstructionHero3DProps> = ({
  onOpenConsultation: _onOpenConsultation,
  nextSectionId = 'stats-overview'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isTourComplete, setIsTourComplete] = useState(false);
  const isTourCompleteRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastSentProgressRef = useRef(-1);
  const animFrameRef = useRef<number | null>(null);

  const scrollToNextSection = useCallback(() => {
    const el = document.getElementById(nextSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [nextSectionId]);

  // Click handler for 'Scroll Down to Explore' button:
  // Step through the 3D stages, and once complete, smoothly scroll to Section 02
  const handleExploreButtonClick = useCallback(() => {
    if (isTourComplete || targetProgressRef.current >= 0.95) {
      scrollToNextSection();
      return;
    }

    // Step through the 4 architectural stages:
    // 01. Reset View (0.00) -> 02. West Elevation (0.33) -> 03. Rear Skyline (0.66) -> 04. Tower Crane (1.00)
    const currentP = targetProgressRef.current;
    let nextP = 0.33;
    if (currentP < 0.28) {
      nextP = 0.33;
    } else if (currentP < 0.60) {
      nextP = 0.66;
    } else {
      nextP = 1.0;
    }

    targetProgressRef.current = nextP;
  }, [isTourComplete, scrollToNextSection]);

  // Smooth continuous lerp loop that streams progress to the 3D scene without stopping or discrete locks
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        // Crisp, fluid responsiveness without sluggish damping lag
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

        // Only update React state on boolean boundary crossing to avoid 60-120fps component re-renders
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

  // Central continuous scroll controller: fluid speed across the 3D path, then seamlessly releases to Section 02
  const handleScrollDelta = useCallback((deltaY: number, preventDefaultFn?: () => void) => {
    // If user has already scrolled down past the hero into subsequent sections, let browser handle native scrolling
    if (window.scrollY > 25) return;
    if (Math.abs(deltaY) < 1.0) return;

    const SCROLL_SENSITIVITY = 0.0016;

    if (deltaY > 0) {
      // User is scrolling DOWN
      if (targetProgressRef.current < 0.98) {
        // Continuous 3D camera progression
        if (preventDefaultFn) preventDefaultFn();
        targetProgressRef.current = Math.min(1.0, targetProgressRef.current + deltaY * SCROLL_SENSITIVITY);
      } else {
        // 3D camera tour complete -> Seamlessly hand over to native document scrolling!
        // DO NOT call preventDefaultFn() so the wheel event naturally scrolls the page down.
        // If event was forwarded from inside the iframe (cursor hovered over 3D canvas),
        // drive window scrollBy directly so the page glides smoothly into Section 02:
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

  // Capture both parent wheel gestures and forwarded iframe continuous scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If already scrolled down into the page, allow native scrolling
      if (window.scrollY > 20) return;

      // When scrolling down and 3D path is complete, DO NOT prevent default!
      if (e.deltaY > 0 && targetProgressRef.current >= 0.98) {
        return; // Allow native browser scroll down
      }

      // When at top and 3D path is reset, allow normal browser behavior
      if (e.deltaY < 0 && targetProgressRef.current <= 0.01) {
        return;
      }

      handleScrollDelta(e.deltaY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.type === 'IFRAME_WHEEL') {
          handleScrollDelta(event.data.deltaY);
        } else if (event.data.type === 'RESET_VIEW') {
          targetProgressRef.current = 0;
          currentProgressRef.current = 0;
          lastSentProgressRef.current = 0;
          isTourCompleteRef.current = false;
          setIsTourComplete(false);
        }
      }
    };

    // Touch continuous handling on parent container
    let touchLastY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length === 1) {
        touchLastY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 20) return;
      if (e.touches && e.touches.length === 1) {
        const deltaY = touchLastY - e.touches[0].clientY;
        touchLastY = e.touches[0].clientY;

        if (deltaY > 0 && targetProgressRef.current >= 0.98) {
          return; // Allow native touch scroll down
        }
        if (deltaY < 0 && targetProgressRef.current <= 0.01) {
          return;
        }

        handleScrollDelta(deltaY * 1.5, () => {
          if (e.cancelable) e.preventDefault();
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('message', handleIframeMessage);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('message', handleIframeMessage);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleScrollDelta]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[92vh] sm:h-screen min-h-[640px] max-h-[1050px] overflow-hidden bg-neutral-950 flex flex-col justify-between select-none"
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



      {/* Bottom Action HUD: Clean Navigation Control */}
      <div className="relative z-20 p-4 sm:p-6 pointer-events-none flex items-center justify-end pb-6 sm:pb-8">
        <button
          onClick={handleExploreButtonClick}
          className="pointer-events-auto group bg-white/90 hover:bg-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-orange-600 border border-white/80 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
          title={isTourComplete ? 'Continue to next section' : 'Click or scroll down to explore 3D viewpoints'}
        >
          <span>{isTourComplete ? 'Continue to Next Section' : 'Scroll Down to Explore'}</span>
          <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-orange-500 transition-colors">
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* Frosted Bottom Blur Tile & Seamless Gradient Seam */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent backdrop-blur-[4px] pointer-events-none z-10"
        aria-hidden="true"
      />
    </div>
  );
};
