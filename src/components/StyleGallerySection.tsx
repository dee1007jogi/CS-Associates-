import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Sparkles,
  Play,
  Pause
} from 'lucide-react';

export interface StyleGalleryProject {
  id: string;
  title: string;
  tags: string[];
  location: string;
  year: string;
  image: string;
  category: string;
  specs: string;
  description: string;
}

const STYLE_GALLERY_PROJECTS: StyleGalleryProject[] = [
  {
    id: 'luxury-skyline',
    title: 'Luxury Skyline',
    tags: ['RESIDENTIAL', 'SINGLE HOME'],
    location: 'Sadashivanagar, Bengaluru',
    year: '2025',
    image: '/src/assets/images/gallery_luxury_interior_1790601175826.jpg',
    category: 'Luxury Dining & Living Interior',
    specs: '7,400 sq.ft. · Italian Statuario · Fluted Walnut',
    description: 'Double-height grand living and dining space executed with book-matched Italian marble dry-lays, custom fluted timber wall paneling, and acoustic ceiling alignment with zero-crack shadow gap detailing.'
  },
  {
    id: 'bohemian-rhapsody',
    title: 'Bohemian Rhapsody',
    tags: ['RESIDENTIAL', 'SINGLE HOME'],
    location: 'Tataguni, Kanakapura Road',
    year: '2024',
    image: '/src/assets/images/project_opulence_tataguni_courtyard.jpg',
    category: 'Sculptural Courtyard & Staircase',
    specs: '11,200 sq.ft. · Minimalist Floating Steps · Natural Skylight',
    description: 'Architectural concrete steps leading to an open sunlit courtyard. Engineered with deflection-tested structural cantilevers and seamless micro-topping plaster finishes.'
  },
  {
    id: 'vintage-glamour',
    title: 'Vintage Glamour',
    tags: ['RESIDENTIAL', 'SINGLE HOME'],
    location: 'Indiranagar, Bengaluru',
    year: '2025',
    image: '/src/assets/images/hero_luxury_architecture_1790599616170.jpg',
    category: 'Contemporary Villa Architecture',
    specs: '6,200 sq.ft. · European Chandeliers · Warm Oak Millwork',
    description: 'Sophisticated living lounge blending neoclassical proportion with modern minimalism. Features recessed profile illumination, custom brass trims, and acoustic isolation.'
  },
  {
    id: 'living-innovation',
    title: 'Living Innovation',
    tags: ['RESIDENTIAL', 'SINGLE HOME'],
    location: 'Abbigere, Bengaluru',
    year: '2024',
    image: '/src/assets/images/project_timber_wood_chalet_day.png',
    category: 'Natural Timber & Glass Estate',
    specs: '8,800 sq.ft. · Treated Timber · Double Glazing',
    description: 'Harmonious indoor-outdoor residential structure utilizing engineered glulam timber beams, cantilevered sun decks, and high-efficiency thermal glass curtain walls.'
  },
  {
    id: 'opulence-estate',
    title: 'Opulence Estate',
    tags: ['RESIDENTIAL', 'LUXURY ESTATE'],
    location: 'Kanakapura Road, Bengaluru',
    year: '2025',
    image: '/src/assets/images/opulence_kanakapura_1790599663999.jpg',
    category: 'Private Luxury Villa',
    specs: '12,500 sq.ft. · Reflection Pool · Structural Cantilever',
    description: 'Flagship private residential estate overseen with 100% laser verification of formwork plumbness, 72-hour waterproof ponding tests, and zero-defect civil handover.'
  },
  {
    id: 'apex-atrium',
    title: 'Apex Commercial Atrium',
    tags: ['COMMERCIAL', 'CORPORATE'],
    location: 'Whitefield, Bengaluru',
    year: '2024',
    image: '/src/assets/images/gallery_commercial_complex_1790601212975.jpg',
    category: 'Commercial Infrastructure',
    specs: '24,000 sq.ft. · High-Load MEP · Structural Glazing',
    description: 'Corporate atrium and commercial complex featuring clash-free HVAC duct routing, seismic-tested structural glazing, and fast-track occupancy certification.'
  }
];

// Tripled dataset to guarantee an infinitely seamless CSS loop with zero jump
const CONTINUOUS_PROJECTS = [
  ...STYLE_GALLERY_PROJECTS,
  ...STYLE_GALLERY_PROJECTS,
  ...STYLE_GALLERY_PROJECTS
];

interface StyleGallerySectionProps {
  onOpenConsultation?: () => void;
}

export const StyleGallerySection: React.FC<StyleGallerySectionProps> = ({ onOpenConsultation }) => {
  const [selectedProject, setSelectedProject] = useState<StyleGalleryProject | null>(null);
  const [isPausedManually, setIsPausedManually] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-[#faf9f6] border-t border-[#e8dfd1] relative overflow-hidden select-none">
      
      {/* Background Subtle Gradient & Grid matching the site theme */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#9a5d1b_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* Embedded CSS for 60fps GPU Hardware Accelerated Infinite Marquee */}
      <style>{`
        @keyframes continuousGalleryScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333333%, 0, 0);
          }
        }
        .animate-continuous-gallery {
          display: flex;
          width: max-content;
          animation: continuousGalleryScroll 42s linear infinite;
        }
        .animate-continuous-gallery:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full relative z-10">
        
        {/* Centered Section Header Matching The Other Sections Theme */}
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
          
          {/* Eyebrow Badge Pill Matching Contact & Services Sections */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-[11px] font-mono font-bold uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>ARCHITECTURAL TYPOLOGIES · PORTFOLIO</span>
          </div>

          {/* Heading with Brand Display Font & Safety Orange Highlight */}
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 font-display uppercase">
            DEFINE <span className="text-orange-500">OUR STYLE</span>
          </h2>

          {/* Subtitle Matching Site Typography */}
          <p className="mt-3 text-sm sm:text-base text-neutral-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Our portfolio showcases a diverse range of projects, from beautifully crafted residential spaces to functional and stylish commercial interiors.
          </p>

          {/* Live Continuous Scroll Status Indicator with Play/Pause Control */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-mono text-neutral-600 shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${isPausedManually ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
              <span>{isPausedManually ? 'Paused' : 'Continuous Smooth Loop · Hover card to inspect'}</span>
            </div>

            <button
              onClick={() => setIsPausedManually(!isPausedManually)}
              className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:text-orange-600 hover:border-orange-300 transition-colors shadow-sm cursor-pointer"
              title={isPausedManually ? "Resume continuous motion" : "Pause motion"}
              aria-label={isPausedManually ? "Resume continuous motion" : "Pause motion"}
            >
              {isPausedManually ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>

        </div>

        {/* Full-Bleed Continuous Loop Marquee Track */}
        <div className="w-full overflow-hidden py-4">
          <div 
            className="animate-continuous-gallery flex gap-6 sm:gap-8 items-start will-change-transform"
            style={isPausedManually ? { animationPlayState: 'paused' } : undefined}
          >
            {CONTINUOUS_PROJECTS.map((project, idx) => {
              // Alternating one up, one down staggered alignment
              const isDown = idx % 2 === 0;

              return (
                <div
                  key={`${project.id}-${idx}`}
                  className={`w-[270px] sm:w-[310px] md:w-[340px] shrink-0 group cursor-pointer transition-all duration-500 ${
                    isDown ? 'mt-10 sm:mt-16' : 'mt-0'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Card Image Container with Pill Badges & Centered View Button */}
                  <div className="relative h-[360px] sm:h-[400px] w-full rounded-[2rem] overflow-hidden bg-neutral-200 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-neutral-200/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle vignette gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 group-hover:from-black/65 transition-all duration-300" />

                    {/* Top Floating Category Pills */}
                    <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-10 pointer-events-none">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Center Circular "View" Button (matching reference) */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-neutral-900/85 backdrop-blur-md border border-white/25 text-white font-medium text-xs flex items-center justify-center shadow-2xl transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <span>View</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Project Meta following the up/down offset */}
                  <div className="mt-4 space-y-1">
                    <h3 className="text-base sm:text-lg font-bold font-display text-neutral-950 group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans">
                      {project.location}
                    </p>
                    <p className="text-[11px] font-mono text-neutral-400">
                      {project.year}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lightbox / Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-neutral-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close Project Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-72 md:h-full min-h-[340px] bg-neutral-900">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-mono font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{selectedProject.category}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-display text-neutral-950">
                      {selectedProject.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-sans pt-1 border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        <span>{selectedProject.year}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs font-mono text-orange-950">
                      <span className="font-bold text-orange-600 uppercase block text-[10px]">Specifications</span>
                      {selectedProject.specs}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
                    {onOpenConsultation && (
                      <button
                        onClick={() => {
                          setSelectedProject(null);
                          onOpenConsultation();
                        }}
                        className="flex-1 py-3 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                      >
                        <span>Consult For Similar Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-mono text-xs transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
