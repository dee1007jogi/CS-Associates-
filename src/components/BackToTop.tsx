import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(pct);
      }

      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    // If Lenis is active, use its silky momentum engine
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Broadcast reset view for any active 3D construction scenes
    window.postMessage({ type: 'RESET_VIEW' }, '*');
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((ifr) => {
      try {
        ifr.contentWindow?.postMessage({ type: 'RESET_VIEW' }, '*');
      } catch {
        // ignore cross-origin if any
      }
    });
  };

  if (!isVisible) return null;

  // Circumference for circular progress ring (r = 18)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed z-40 right-4 md:right-6 bottom-20 md:bottom-24 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white backdrop-blur-xl border border-white/15 shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
      aria-label="Back to top"
      title="Back to top"
    >
      {/* Dynamic SVG Circular Scroll Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="text-white/10 stroke-current"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="text-orange-500 stroke-current transition-[stroke-dashoffset] duration-150"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {/* Upward Chevron / Arrow Icon */}
      <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-neutral-300 group-hover:text-orange-400 group-hover:-translate-y-0.5 transition-all duration-200" />
    </button>
  );
};
