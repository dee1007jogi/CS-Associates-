import React, { useEffect, useState } from 'react';
import { 
  ArrowUp, 
  ChevronUp, 
  ChevronDown, 
  Layers, 
  X, 
  Sparkles, 
  Compass, 
  Rotate3d, 
  ShieldCheck, 
  CheckSquare, 
  Calculator, 
  Phone,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface SectionMeta {
  id: string;
  num: string;
  title: string;
  paradigm: string;
  tech: string;
  color: string;
}

const SECTIONS_METADATA: SectionMeta[] = [
  {
    id: 'top',
    num: '#01',
    title: 'Architectural Hero & Parallax',
    paradigm: 'Multi-Tier Speed Parallax & Depth Plunge (#09 & #04)',
    tech: 'Framer Motion',
    color: 'text-orange-500'
  },
  {
    id: 'about',
    num: '#02',
    title: 'Founder & Industry Mastery',
    paradigm: '3D Origami Hinge Fold & Reading Highlight (#02 & #29)',
    tech: 'CSS3D + Motion',
    color: 'text-orange-600'
  },
  {
    id: 'gallery-3d',
    num: '#03',
    title: '3D Spatial Architectural Gallery',
    paradigm: 'LiDAR Laser Topography & Spatial Camera (#37 & #36)',
    tech: 'Canvas + 3D Tilt',
    color: 'text-cyan-400'
  },
  {
    id: 'protection-matrix',
    num: '#04',
    title: 'Client Protection Standard',
    paradigm: 'Bi-Directional Counter-Scrolling Columns (#07 & #14)',
    tech: 'Kinematic Shearing',
    color: 'text-emerald-500'
  },
  {
    id: 'process',
    num: '#05',
    title: '7-Stage PMC & DPR Command',
    paradigm: 'Pinned Horizontal Ribbon & WhatsApp Unbox (#06 & #32)',
    tech: 'Sticky Pinning',
    color: 'text-purple-400'
  },
  {
    id: 'services',
    num: '#06',
    title: 'Multi-Disciplinary Services Bento',
    paradigm: 'Procedural Grid Matrix Shutters (#12 & #03)',
    tech: 'Radial Decay FLIP',
    color: 'text-orange-500'
  },
  {
    id: 'projects',
    num: '#07',
    title: 'Curated Realized Portfolio',
    paradigm: 'Sticky Card Deck Compaction (#01 & #30)',
    tech: 'Stack Decay',
    color: 'text-orange-400'
  },
  {
    id: 'calculator',
    num: '#08',
    title: 'Cost & Direct Savings Estimator',
    paradigm: 'Financial Harmonic Waveform Ribbon (#41)',
    tech: 'Canvas 2D Wave',
    color: 'text-emerald-400'
  },
  {
    id: 'contact',
    num: '#09',
    title: 'Bengaluru Head Office & Desk',
    paradigm: 'Orbital Coordinates Plunge & Spring Snag (#43 & #18)',
    tech: 'GPS Radar + Spring',
    color: 'text-rose-400'
  }
];

export const ScrollHud: React.FC = () => {
  const [globalProgress, setGlobalProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionMeta>(SECTIONS_METADATA[0]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const pct = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setGlobalProgress(pct);
      }

      // Detect active section based on proximity to viewport center
      const vh = window.innerHeight || 800;
      const viewportCenter = vh / 2;
      let closestSection = SECTIONS_METADATA[0];
      let minDistance = Infinity;

      SECTIONS_METADATA.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const dist = Math.abs(viewportCenter - sectionCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestSection = sec;
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsTrayOpen(false);
    }
  };

  const stepSection = (direction: 1 | -1) => {
    const currentIdx = SECTIONS_METADATA.findIndex((s) => s.id === activeSection.id);
    const targetIdx = Math.max(0, Math.min(SECTIONS_METADATA.length - 1, currentIdx + direction));
    jumpToSection(SECTIONS_METADATA[targetIdx].id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Global Multi-Gradient Scroll Ribbon (Top of Viewport) */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900/60 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-orange-500 via-orange-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(251,191,36,0.8)]"
          style={{ width: `${globalProgress}%` }}
        />
      </div>

      {/* 2. Active Section Architectural HUD Pill (Bottom Left / Mobile Optimized) */}
      <aside className="fixed bottom-20 md:bottom-6 left-4 z-40 select-none">
        <div className="glass-panel p-2 sm:p-2.5 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center gap-3 text-xs font-mono text-neutral-200">
          
          {/* Active Status Pulse */}
          <div className="flex items-center gap-2 pl-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            
            {/* Section Number & Name */}
            {!isCollapsed && (
              <div className="flex flex-col leading-tight max-w-[140px] sm:max-w-[240px]">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                  <span className={`font-bold ${activeSection.color}`}>{activeSection.num}</span>
                  <span className="truncate">{activeSection.tech}</span>
                </div>
                <span className="font-sans font-bold text-white text-[11px] sm:text-xs truncate">
                  {activeSection.title}
                </span>
                <span className="text-[9px] text-orange-500/90 truncate hidden sm:block">
                  {activeSection.paradigm}
                </span>
              </div>
            )}
          </div>

          {/* Progress Percentage */}
          <div className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 text-[11px] font-bold tabular-nums text-orange-500">
            {Math.round(globalProgress)}%
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-1 pl-1 border-l border-white/10">
            <button
              onClick={() => stepSection(-1)}
              title="Previous Architectural Section"
              aria-label="Previous Section"
              className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => stepSection(1)}
              title="Next Architectural Section"
              aria-label="Next Section"
              className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            
            {/* Index Tray Trigger */}
            <button
              onClick={() => setIsTrayOpen(true)}
              title="Open Section Master Index Tray"
              aria-label="Open Section Index"
              className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/30 transition-all active:scale-90 cursor-pointer ml-0.5"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
              aria-label="Toggle Full Screen"
              className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-orange-500 border border-white/10 transition-all active:scale-90 cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-orange-500" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

        </div>
      </aside>

      {/* 3. Master Section Index Tray Modal / Drawer */}
      {isTrayOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end transition-opacity duration-300"
          onClick={() => setIsTrayOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-neutral-950 h-full border-l border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Tray Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <h3 className="font-display font-bold text-white text-base">
                    Architectural Scroll Index (09)
                  </h3>
                </div>
                <button
                  onClick={() => setIsTrayOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-neutral-400 mt-3 mb-4 leading-relaxed font-sans">
                Each continuous section below embodies a distinct physical kinematic paradigm from the ScrollCraft engine. Click to glide directly to that section.
              </p>

              {/* Section List */}
              <div className="space-y-2">
                {SECTIONS_METADATA.map((sec) => {
                  const isActive = activeSection.id === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => jumpToSection(sec.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer group ${
                        isActive
                          ? 'bg-orange-500/10 border-orange-500/40 text-white shadow-lg shadow-orange-500/10'
                          : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${sec.color}`}>
                            {sec.num}
                          </span>
                          <span className="font-display font-bold text-xs text-white group-hover:text-orange-500 transition-colors">
                            {sec.title}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                          {sec.paradigm}
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400 shrink-0">
                        {sec.tech}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tray Footer */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>CS Associates PMC Engine</span>
              <button
                onClick={scrollToTop}
                className="text-orange-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
