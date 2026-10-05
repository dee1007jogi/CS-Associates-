import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';

interface ConstructionHero3DProps {
  onOpenConsultation?: () => void;
  nextSectionId?: string;
  isHome?: boolean;
}

export const ConstructionHero3D: React.FC<ConstructionHero3DProps> = ({
  onOpenConsultation,
  isHome = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [, setIsTourComplete] = useState(false);
  const [, setActiveStage] = useState(0);
  const isTourCompleteRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastSentProgressRef = useRef(-1);
  const animFrameRef = useRef<number | null>(null);

  // Sync visibility with 3D scene when switching between Home and other pages
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    if (isHome) {
      // Resume rendering immediately when on Home page
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SET_VISIBILITY',
          isVisible: true,
        },
        '*'
      );
      // Reset camera to front elevation cleanly
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      lastSentProgressRef.current = 0;
      setActiveStage(0);
      isTourCompleteRef.current = false;
      setIsTourComplete(false);

      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SCROLL_STAGES',
          progress: 0,
        },
        '*'
      );
    } else {
      // Pause 3D WebGL loop when user is on other pages (/about, /projects, etc.)
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SET_VISIBILITY',
          isVisible: false,
        },
        '*'
      );
    }
  }, [isHome, isIframeLoaded]);

  // Smooth continuous lerp loop streaming progress to the 3D scene (Home page only)
  useEffect(() => {
    if (!isHome) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    let active = true;

    const startLoop = () => {
      if (animFrameRef.current) return;

      const tick = () => {
        if (!active || !isHome || document.hidden) {
          animFrameRef.current = null;
          return;
        }

        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0003) {
          currentProgressRef.current += diff * 0.18;

          if (targetProgressRef.current === 0 && currentProgressRef.current < 0.005) {
            currentProgressRef.current = 0;
          } else if (targetProgressRef.current === 1 && currentProgressRef.current > 0.995) {
            currentProgressRef.current = 1;
          }

          const p = Math.max(0, Math.min(1, currentProgressRef.current));

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
                  progress: p,
                },
                '*'
              );
            }
          }

          const stageIdx = p < 0.17 ? 0 : p < 0.5 ? 1 : p < 0.83 ? 2 : 3;
          setActiveStage((prev) => (prev !== stageIdx ? stageIdx : prev));

          const tourDone = p >= 0.95;
          if (tourDone !== isTourCompleteRef.current) {
            isTourCompleteRef.current = tourDone;
            setIsTourComplete(tourDone);
          }
        }

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    };

    startLoop();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            {
              type: 'SET_VISIBILITY',
              isVisible: false,
            },
            '*'
          );
        }
      } else {
        if (isHome) {
          startLoop();
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'SET_VISIBILITY',
                isVisible: true,
              },
              '*'
            );
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isHome]);

  // Desktop mouse wheel scroll controller
  const handleScrollDelta = useCallback(
    (deltaY: number, preventDefaultFn?: () => void) => {
      if (!isHome) return;
      if (window.scrollY > 25) return;
      if (Math.abs(deltaY) < 1.0) return;

      const SCROLL_SENSITIVITY = 0.0016;

      if (deltaY > 0) {
        if (targetProgressRef.current < 0.98) {
          if (preventDefaultFn) preventDefaultFn();
          targetProgressRef.current = Math.min(
            1.0,
            targetProgressRef.current + deltaY * SCROLL_SENSITIVITY
          );
        } else {
          if (!preventDefaultFn) {
            if (window.__lenis) {
              window.__lenis.scrollTo(window.scrollY + deltaY * 1.2, {
                immediate: false,
                duration: 0.6,
              });
            } else {
              window.scrollBy({ top: deltaY, behavior: 'smooth' });
            }
          }
        }
      } else if (deltaY < 0) {
        if (window.scrollY <= 15) {
          if (targetProgressRef.current > 0.01) {
            if (preventDefaultFn) preventDefaultFn();
            const nextP = targetProgressRef.current + deltaY * SCROLL_SENSITIVITY;
            targetProgressRef.current = nextP <= 0.01 ? 0 : Math.max(0, nextP);
          }
        }
      }
    },
    [isHome]
  );

  // Touch controller for mobile swipes
  const handleTouchDelta = useCallback(
    (deltaY: number, preventDefaultFn?: () => void) => {
      if (!isHome) return;
      if (window.scrollY > 25) return;
      if (Math.abs(deltaY) < 0.5) return;

      const TOUCH_SENSITIVITY = 0.0028;

      if (deltaY > 0) {
        if (targetProgressRef.current < 0.98) {
          if (preventDefaultFn) preventDefaultFn();
          targetProgressRef.current = Math.min(
            1.0,
            targetProgressRef.current + deltaY * TOUCH_SENSITIVITY
          );
        } else {
          if (!preventDefaultFn) {
            if (window.__lenis) {
              window.__lenis.scrollTo(window.scrollY + deltaY * 1.3, {
                immediate: false,
                duration: 0.5,
              });
            } else {
              window.scrollBy({ top: deltaY, behavior: 'smooth' });
            }
          }
        }
      } else if (deltaY < 0) {
        if (window.scrollY <= 15) {
          if (targetProgressRef.current > 0.01) {
            if (preventDefaultFn) preventDefaultFn();
            const nextP = targetProgressRef.current + deltaY * TOUCH_SENSITIVITY;
            targetProgressRef.current = nextP <= 0.01 ? 0 : Math.max(0, nextP);
          }
        }
      }
    },
    [isHome]
  );

  // Sync scroll & touch gestures only when on Home page
  useEffect(() => {
    if (!isHome) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHome) return;
      if (window.innerWidth < 768) return;
      if (window.scrollY > 20) return;

      if (e.deltaY > 0 && targetProgressRef.current >= 0.98) {
        return;
      }

      if (e.deltaY < 0 && targetProgressRef.current <= 0.01) {
        return;
      }

      handleScrollDelta(e.deltaY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (!isHome) return;
      if (e.touches && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isHome) return;
      if (!e.touches || e.touches.length !== 1) return;
      const curY = e.touches[0].clientY;
      const deltaY = touchStartY - curY;
      touchStartY = curY;

      handleTouchDelta(deltaY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    const handleIframeMessage = (event: MessageEvent) => {
      if (!isHome) return;
      if (event.data) {
        if (event.data.type === 'IFRAME_WHEEL') {
          handleScrollDelta(event.data.deltaY);
        } else if (event.data.type === 'HERO_TOUCH_DELTA') {
          handleTouchDelta(event.data.deltaY);
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

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('message', handleIframeMessage);

    return () => {
      if (containerEl) {
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchmove', handleTouchMove);
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [isHome, handleScrollDelta, handleTouchDelta, onOpenConsultation]);

  // Pause 3D WebGL rendering when hero canvas is scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && isHome;
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'SET_VISIBILITY',
                isVisible,
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
  }, [isHome]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: isHome ? 0 : -99999,
        width: isHome ? '100%' : '1px',
        height: isHome ? undefined : '1px',
        visibility: isHome ? 'visible' : 'hidden',
        opacity: isHome ? 1 : 0,
        pointerEvents: isHome ? 'auto' : 'none',
        zIndex: isHome ? 10 : -100,
        transition: 'opacity 0.25s ease',
      }}
      className={`h-[88vh] sm:h-screen min-h-[580px] sm:min-h-[640px] max-h-[1050px] overflow-hidden bg-neutral-950 flex flex-col justify-between select-none`}
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
          onLoad={() => {
            setIsIframeLoaded(true);
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                {
                  type: 'SET_VISIBILITY',
                  isVisible: isHome,
                },
                '*'
              );
            }
          }}
        />
      </div>

      {/* Top spacer for breathing room below sticky header */}
      <div className="h-10 pointer-events-none" />

      {/* Bottom Action HUD: Mobile Call & Consult Buttons */}
      <div className="relative z-20 px-3.5 sm:px-6 pointer-events-none pb-6 sm:pb-8 flex flex-col items-center justify-center">
        <div className="pointer-events-auto flex sm:hidden items-center justify-center gap-2.5 w-full max-w-xs mb-44 sm:mb-0">
          <a
            href="tel:8095823483"
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
