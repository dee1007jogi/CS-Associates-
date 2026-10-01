import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ProjectsPassionSectionProps {
  onOpenConsultation?: () => void;
}

export const ProjectsPassionSection: React.FC<ProjectsPassionSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="w-full bg-[#1c1c1e] text-white border-t border-neutral-800 relative overflow-hidden select-none py-16 sm:py-24 lg:py-28">
      
      {/* Subtle Top-Left Architectural Tab Notch / Cut-out matching section above */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-28 sm:w-44 h-4 sm:h-5 bg-[#f7f4ee] rounded-br-2xl pointer-events-none z-20"
      />

      {/* Background Ambient Blueprint Sheen */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
      />
      <div 
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* Edge-to-Edge Container with Responsive Padding */}
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* TOP ROW: Headline & Narrative Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 pb-12 lg:pb-16">
            
            {/* Headline */}
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.12]">
                Projects Designed With <br className="hidden sm:inline" />
                Passion And Care.
              </h2>
            </div>

            {/* Subtitle / Paragraph */}
            <div className="max-w-md lg:pt-3">
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                From modern homes and commercial buildings to urban planning and interior concepts, CS Associates delivers timeless structural engineering.
              </p>
            </div>

          </div>

          {/* BOTTOM ROW: Stats Columns + Stepped Blueprint Line + Thumbnail Previews */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            
            {/* 3 STATS COLUMNS with Stepped Baseline */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
              
              {/* Stepped Blueprint Contour Line across Stats (Desktop/Tablet) */}
              <div 
                aria-hidden="true" 
                className="hidden sm:block absolute inset-0 pointer-events-none"
              >
                <svg 
                  className="w-full h-full overflow-visible" 
                  preserveAspectRatio="none" 
                  viewBox="0 0 600 120"
                >
                  {/* Stepped Architectural Path: Start under Stat 1, drop under Stat 2, rise under Stat 3 */}
                  <path 
                    d="M 0 35 L 175 35 L 175 75 L 375 75 L 375 30 L 600 30" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.12)" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Stat 1: 50% */}
              <div className="relative space-y-2 pt-2 sm:pt-0">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                  50%
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-sans max-w-[200px] leading-relaxed">
                  We believe architecture is not just about structures
                </p>
              </div>

              {/* Stat 2: 12.0K (Stepped Down) */}
              <div className="relative space-y-2 sm:pt-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                  12.0K
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-sans max-w-[200px] leading-relaxed">
                  We believe architecture is not just about structures
                </p>
              </div>

              {/* Stat 3: 23M+ (Stepped Up) */}
              <div className="relative space-y-2 sm:pt-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                  23M+
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-sans max-w-[200px] leading-relaxed">
                  We believe architecture is not just about structures
                </p>
              </div>

            </div>

            {/* RIGHT SIDE: Two Thumbnail Previews + "Learn more" */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-end md:items-start lg:items-end justify-between gap-5 pt-4 md:pt-0">
              
              {/* Dual Photo Thumbnails with Rounded Frames */}
              <div className="flex items-center gap-3">
                
                {/* Photo 1: Double-Height Grand Living / Foyer */}
                <div className="group relative w-24 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-white/15 bg-neutral-900 shrink-0 cursor-pointer">
                  <img
                    src="/src/assets/images/gallery_luxury_interior_1790601175826.jpg"
                    alt="Grand Living Foyer Interior"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Photo 2: Luxury Classical / Contemporary Reception Lounge */}
                <div className="group relative w-24 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-white/15 bg-neutral-900 shrink-0 cursor-pointer">
                  <img
                    src="/src/assets/images/hero_luxury_architecture_1790599616170.jpg"
                    alt="Contemporary Luxury Architecture"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

              </div>

              {/* Learn More Action Link */}
              <div className="pt-2 sm:pt-0">
                <button
                  onClick={onOpenConsultation}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-sans">Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
