import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Phone, Menu, X, ShieldCheck, Maximize2, Minimize2 } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Founder & About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: '7-Stage PMC', path: '/process' },
    { label: 'Projects', path: '/projects' },
    { label: 'Cost Estimator', path: '/calculator' },
    { label: 'Office & Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-2xl border-b border-neutral-800/80 transition-all">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Mobile App Bar: Left Emblem & Brand Wordmark */}
        <div className="flex items-center gap-2.5">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <img 
              src="/src/assets/images/cs_logo_transparent.png" 
              alt="CS Associates Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_0_14px_rgba(221,108,2,0.45)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-bold tracking-tight text-white font-display leading-tight group-hover:text-orange-400 transition-colors">
                CS ASSOCIATES
              </span>
              <span className="text-[9px] text-orange-400 uppercase tracking-widest font-mono font-semibold">
                A TRADITION OF TRUST
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: Multi-Page Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                isActive(link.path)
                  ? 'text-orange-400 font-bold'
                  : 'hover:text-white text-neutral-400'
              }`}
            >
              <span>{link.label}</span>
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-orange-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Full Screen Toggle Action - Hidden on mobile, visible on desktop/tablets */}
          <button
            onClick={toggleFullscreen}
            className="hidden md:flex items-center justify-center min-h-[44px] min-w-[44px] px-2.5 sm:px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors glass-panel active:scale-95 cursor-pointer"
            title={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
            aria-label="Toggle Full Screen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-orange-400 shrink-0" />
            ) : (
              <Maximize2 className="w-4 h-4 text-neutral-300 shrink-0 hover:text-orange-400" />
            )}
            <span className="hidden xl:inline ml-1.5 text-[11px] font-mono">
              {isFullscreen ? "Exit Full" : "Full Screen"}
            </span>
          </button>

          {/* WhatsApp Direct Action (Native App Feel) */}
          <a
            href="https://wa.me/918296266389?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20inquire%20about%20your%20Project%20Management%20Consultancy%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-950/30 transition-colors glass-panel active:scale-95"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="ml-1.5">WhatsApp DPR</span>
          </a>

          {/* Consultation CTA */}
          <button
            onClick={onOpenConsultation}
            className="group flex items-center justify-center min-h-[42px] sm:min-h-[44px] px-3 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all shadow-md shadow-orange-600/20 hover:shadow-orange-500/35 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span>Consult</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile & Tablet Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex xl:hidden p-2.5 text-neutral-200 hover:text-white min-h-[42px] min-w-[42px] items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-orange-400" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-200" />
            )}
          </button>
        </div>
      </div>

      {/* Modern Slide-Down Mobile & Tablet Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-neutral-800/90 bg-neutral-950/98 backdrop-blur-2xl px-4 sm:px-6 py-5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Active Status Badge */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                PMC Site Desk Active &bull; Bengaluru HQ
              </span>
            </div>
            <span className="text-[10px] font-mono text-orange-400 font-semibold uppercase">
              25+ Yrs Authority
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition-all ${
                  isActive(link.path)
                    ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/80'
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Action CTAs in Mobile Menu */}
          <div className="pt-4 mt-3 border-t border-neutral-800/80 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/918296266389?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20inquire%20about%20your%20Project%20Management%20Consultancy%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:8296266389"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-neutral-200 border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call Desk</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg shadow-orange-600/25 active:scale-[0.99] transition-all cursor-pointer"
            >
              Schedule Site Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
