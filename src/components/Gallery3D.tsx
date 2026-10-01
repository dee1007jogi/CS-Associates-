import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Play, 
  Pause
} from 'lucide-react';

interface GalleryItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  location: string;
  image: string;
  specs: string;
  pmcHighlight: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'living-interior',
    number: '01',
    title: 'Double-Height Grand Living & Foyer',
    shortTitle: 'Grand Living & Foyer',
    category: 'Luxury Villa Interiors',
    location: 'Sadashivanagar, Bengaluru',
    image: '/src/assets/images/gallery_luxury_interior_1790601175826.jpg',
    specs: '7,400 sq.ft. · Italian Statuario · Fluted Walnut',
    pmcHighlight: 'Zero-crack shadow gap detailing & acoustic ceiling alignment'
  },
  {
    id: 'facade-fenestration',
    number: '02',
    title: 'Cantilever Facade & Reflection Pool',
    shortTitle: 'Cantilever Facade',
    category: 'Contemporary Villa Architecture',
    location: 'Tataguni, Kanakapura Road',
    image: '/src/assets/images/gallery_facade_fenestration_1790601203004.jpg',
    specs: '11,200 sq.ft. · Minimal Glazing · Lap Pool',
    pmcHighlight: 'Deflection-tested steel structural cantilevers with zero sagging'
  },
  {
    id: 'site-engineering',
    number: '03',
    title: 'Civil & Structural Engineering Deck',
    shortTitle: 'Civil Engineering Deck',
    category: 'PMC Site Inspection',
    location: 'Abbigere, Bengaluru',
    image: '/src/assets/images/gallery_site_engineering_1790601189950.jpg',
    specs: 'M25 Concrete · Fe550D TMT · Laser Levels',
    pmcHighlight: '100% laser verification of bar spacing and formwork plumbness'
  },
  {
    id: 'commercial-atrium',
    number: '04',
    title: 'High-Performance Corporate Atrium',
    shortTitle: 'Corporate Atrium',
    category: 'Commercial Infrastructure',
    location: 'Whitefield, Bengaluru',
    image: '/src/assets/images/gallery_commercial_complex_1790601212975.jpg',
    specs: '24,000 sq.ft. · High-Load MEP · Curtain Glazing',
    pmcHighlight: 'Clash-free HVAC duct routing and fast-track occupancy certification'
  }
];

export const Gallery3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Smooth GPU-accelerated scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Track active card via IntersectionObserver for 60fps performance without state thrashing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to card
  const scrollToCard = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  // Optional auto-slide progression
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % GALLERY_ITEMS.length;
        scrollToCard(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section 
      ref={containerRef}
      id="gallery-3d" 
      className="relative py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
    >
      {/* SECTION HEADER: Landmark Projects & Engineering Archive */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-neutral-800/80 pb-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>SIGNATURE PORTFOLIO ARCHIVE · SITE EXECUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance uppercase">
            Featured Projects & Civil Milestones
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-2xl">
            Explore our signature luxury residences, structural engineering milestones, and commercial facilities delivered with rigorous fiduciary oversight, laser accuracy, and zero contractor disputes.
          </p>
        </div>

        {/* Portfolio Deck Controls: Active Index & Auto Play */}
        <div className="flex flex-wrap items-center gap-4 bg-neutral-900/90 border border-neutral-800 px-4 py-2.5 rounded-2xl self-start lg:self-end shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span>Portfolio Index:</span>
            <span className="font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-500/30">
              0{activeIndex + 1} / 0{GALLERY_ITEMS.length}
            </span>
          </div>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              isAutoPlay
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>Auto Slide</span>
          </button>
        </div>
      </div>

      {/* Sticky Category Tabs with Smooth Scroll Progress Bar */}
      <div className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-xl py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-12 border-b border-neutral-800/80">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => scrollToCard(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-orange-500 text-neutral-950 font-bold border-orange-500 shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-neutral-950' : 'bg-orange-500'}`} />
                <span>{item.number}. {item.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Smooth Hardware-Accelerated Progress Line */}
        <div className="w-full h-1 bg-neutral-800/80 rounded-full overflow-hidden mt-1">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 origin-left"
            style={{ scaleX: smoothProgress }}
          />
        </div>
      </div>

      {/* Clean, Simple & Smooth Sticky Stacking Cards Container */}
      <div className="relative w-full space-y-24 sm:space-y-36 pb-20">
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            data-index={idx}
            className="sticky top-28 sm:top-32 w-full transition-all duration-300"
            style={{ zIndex: 10 + idx }}
          >
            {/* Card Frame */}
            <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] rounded-3xl overflow-hidden border border-neutral-800/90 hover:border-orange-500/50 shadow-2xl bg-neutral-950 group">
              
              {/* High-Resolution Project Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Vignette & Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/40 pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-semibold text-white font-mono">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-neutral-200 font-medium pointer-events-auto">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Bottom Specifications Overlay Card */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20 pointer-events-auto">
                <div className="bg-neutral-950/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider">
                        PROJECT #{item.number} //
                      </span>
                      <span className="text-xs font-mono text-neutral-300">
                        {item.specs}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>PMC Quality Verification: <strong className="text-white">{item.pmcHighlight}</strong></span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <span className="px-3.5 py-2 rounded-xl bg-white/10 text-xs text-neutral-200 font-mono font-medium border border-white/10">
                      Verified PMC Delivery · #{item.number}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
