import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPct = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(scrollPct);
      }
      setShowScrollTop(totalScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top sticky progress line */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900/50 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(251,191,36,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating progress widget on bottom-left */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 glass-panel py-1.5 px-3 rounded-full text-[11px] text-neutral-300 border border-white/10 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono tabular-nums">{Math.round(scrollProgress)}% Scrolled</span>
          <button
            onClick={scrollToTop}
            className="ml-1 p-1 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3 h-3 text-orange-500" />
          </button>
        </div>
      )}
    </>
  );
};
