import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProjectPhilosophySectionProps {
  theme?: 'white' | 'dark';
}

export const ProjectPhilosophySection: React.FC<ProjectPhilosophySectionProps> = ({ 
  theme = 'dark' 
}) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id="philosophy"
      className={`w-full py-16 sm:py-24 relative overflow-hidden select-none font-sans transition-colors duration-300 ${
        isDark 
          ? 'bg-neutral-950 text-white border-y border-neutral-800' 
          : 'bg-white text-neutral-900 border-y border-neutral-200'
      }`}
    >
      {/* Background Subtle Architectural Radial Texture */}
      <div 
        aria-hidden="true" 
        className={`absolute inset-0 pointer-events-none [background-size:24px_24px] ${
          isDark 
            ? 'opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)]' 
            : 'opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)]'
        }`} 
      />

      {isDark && (
        <div 
          aria-hidden="true" 
          className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          
          {/* COLUMN 1: Eyebrow + Bold Display Headline (Span 4) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-3.5">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase shadow-sm ${
              isDark 
                ? 'bg-neutral-900/90 border border-neutral-800 text-orange-400' 
                : 'bg-orange-500/10 border border-orange-500/25 text-orange-600'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>OUR PHILOSOPHY</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.12] ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              Architecture for a <span className={isDark ? 'text-orange-500' : 'text-orange-600'}>Better Tomorrow.</span>
            </h2>
          </div>

          {/* COLUMN 2: Philosophy Narrative & Interactive Pill CTA (Span 4) */}
          <div className="md:col-span-4 lg:col-span-4 space-y-5 lg:pl-2">
            <p className={`text-sm sm:text-base font-sans leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              We believe great architecture goes beyond buildings. It shapes communities, enriches lives and creates a more sustainable future. Our designs are guided by context, craftsmanship and a deep respect for nature.
            </p>

            <div className="pt-1">
              <Link
                to="/about"
                className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-sm active:scale-95 ${
                  isDark
                    ? 'bg-white/10 hover:bg-orange-500 text-white border border-white/15 hover:border-orange-500'
                    : 'bg-neutral-950 hover:bg-orange-500 text-white'
                }`}
              >
                <span>More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* COLUMN 3: Architectural Estate Photo Preview with Badge (Span 3) */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className={`group relative w-full h-52 sm:h-60 lg:h-64 rounded-3xl overflow-hidden shadow-lg border ${
              isDark 
                ? 'border-neutral-800 bg-neutral-900 shadow-neutral-950/60' 
                : 'border-neutral-200/90 bg-neutral-100'
            }`}>
              <img
                src="/src/assets/images/project_opulence_tataguni_exterior.jpg"
                alt="Contemporary Architectural Entrance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              {/* Floating Pill Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>Delivered Landmark</span>
              </div>

              {/* Bottom Specs Caption */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                <span className="truncate text-white/90">Site 12 Opulence</span>
                <span className="text-orange-400 font-bold shrink-0">11,200 sq.ft.</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Subtle Divider & Stacked Brand Pillars (Span 1) */}
          <div className={`hidden md:flex md:col-span-1 flex-col items-start justify-center lg:pl-6 border-l pl-5 py-4 ${
            isDark ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div className="w-8 h-[2px] bg-orange-500 mb-6 rounded-full" />
            <div className={`flex flex-col space-y-4 text-[11px] font-mono tracking-[0.25em] uppercase font-bold ${
              isDark ? 'text-neutral-200' : 'text-neutral-800'
            }`}>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className={isDark ? 'group-hover:text-orange-400 transition-colors' : 'group-hover:text-orange-600 transition-colors'}>PEOPLE</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className={isDark ? 'group-hover:text-orange-400 transition-colors' : 'group-hover:text-orange-600 transition-colors'}>PLACES</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className={isDark ? 'group-hover:text-orange-400 transition-colors' : 'group-hover:text-orange-600 transition-colors'}>PURPOSE</span>
              </div>
            </div>
          </div>

          {/* Mobile view for stacked keywords */}
          <div className={`flex md:hidden items-center justify-between pt-6 border-t text-[11px] font-mono tracking-[0.2em] font-bold uppercase ${
            isDark ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'
          }`}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              PEOPLE
            </span>
            <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              PLACES
            </span>
            <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              PURPOSE
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
