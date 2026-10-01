import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  project: string;
  quote: string;
  location: string;
  savings: string;
  rating: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dr. Lakshmi K.',
    role: 'Chief Medical Consultant',
    project: 'Dr Lakshmi Residence',
    quote:
      '"CS Associates gave me total peace of mind. Every single evening, I received their WhatsApp DPR with verified photos of steel binding, waterproofing tests, and slump checks. They caught multiple contractor over-billing attempts and audited over ₹12 Lakhs in direct savings on our 7,400 sq.ft. estate."',
    location: 'Abbigere, Bengaluru',
    savings: '₹12.4L Audited Savings',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Rajesh & Sunita Menon',
    role: 'VP of Engineering',
    project: 'Menon Villa',
    quote:
      '"Managing construction while working 60-hour weeks felt impossible until CS Associates stepped in. Their strict quality audits flagged substandard cement batches and honeycombing before slab casting. Saved us ₹8.7 Lakhs in rework and finished 3 weeks ahead of schedule."',
    location: 'Whitefield, Bengaluru',
    savings: '₹8.7L Audited Savings',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Vikramaditya Reddy',
    role: 'Managing Director',
    project: 'Reddy Sky-Villa',
    quote:
      '"The transparency is unmatched. Detailed material testing reports, daily drone progress footage, and foolproof vendor bill reconciliation. They uncovered inflated steel reinforcement billing that would have cost us dearly. A true shield for any high-value construction."',
    location: 'Sarjapur Road, Bengaluru',
    savings: '₹16.2L Audited Savings',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideVariants: Variants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: 'easeOut' as const }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' as const }
    })
  };

  return (
    <section 
      id="testimonials"
      className="min-h-screen relative flex flex-col justify-between bg-[#0b0b0c] pb-12 pt-6 text-white overflow-hidden select-none"
    >
      {/* Dark Dot Matrix Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(rgba(255,255,255,0.08)_1.2px,transparent_1.2px)] [background-size:26px_26px]" 
      />

      {/* Top Ceiling Laser Emitter Pod */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-12 h-3.5 bg-neutral-900 border-x border-b border-orange-500/60 rounded-b-lg shadow-lg flex items-center justify-center">
          <div className="w-4 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#ff5500]" />
        </div>
        <div className="w-1.5 h-1 bg-gradient-to-b from-orange-500 to-transparent" />
      </div>

      {/* Ambient Radial Light at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-orange-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Ambient Centerline Guide */}
      <div 
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none z-[2] bg-gradient-to-b from-orange-500/50 via-orange-500/25 to-transparent"
      />

      {/* Section Header Protected with Dark Optical Shield Backdrop */}
      <header className="relative z-30 pt-16 md:pt-20 pb-4 text-center px-4 max-w-4xl mx-auto pointer-events-auto">
        <div className="inline-block px-6 sm:px-10 py-5 rounded-3xl bg-[#0b0b0c]/95 backdrop-blur-md border border-neutral-800/90 shadow-2xl shadow-black/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Verified Client Endorsements
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-2 drop-shadow-md">
            WHAT OUR CLIENTS SAY
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Hear directly from homeowners whose investments, quality, and timelines were safeguarded by CS Associates.
          </p>
        </div>
      </header>

      {/* Main Carousel Card Wrapper */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 my-auto py-4">
        <div className="relative w-full max-w-4xl flex items-center justify-center">

          {/* Navigation Arrow: Previous */}
          <button 
            onClick={handlePrev}
            type="button"
            aria-label="Previous testimonial"
            className="absolute -left-3 sm:-left-6 md:-left-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5500] hover:bg-[#e04c00] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/35 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Navigation Arrow: Next */}
          <button 
            onClick={handleNext}
            type="button"
            aria-label="Next testimonial"
            className="absolute -right-3 sm:-right-6 md:-right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5500] hover:bg-[#e04c00] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/35 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Testimonial Dark Card (Fully opaque background covering laser on the back) */}
          <div className="w-full rounded-2xl border border-neutral-800/90 p-5 sm:p-7 md:p-8 bg-[#161617] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative z-30">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
              >
                {/* Left Column: Portrait & 5-Star Overlay */}
                <div className="md:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-[280px] md:max-w-none aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800">
                    <img 
                      src={current.image} 
                      alt={current.name}
                      className="w-full h-full object-cover object-top grayscale filter contrast-115 brightness-95 transition-transform duration-500 hover:scale-105"
                    />

                    {/* Star Rating Badge */}
                    <div className="absolute bottom-3 left-3 bg-neutral-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/60 flex items-center gap-1.5 shadow-md">
                      <div className="flex text-[#ff5500]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#ff5500] text-[#ff5500]" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white ml-0.5">{current.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Details & Verified Savings Quote */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Client Name with Orange Underline */}
                    <div className="inline-block mb-1.5">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {current.name}
                      </h2>
                      <div className="h-1 w-12 bg-[#ff5500] rounded-full mt-1.5" />
                    </div>

                    {/* Role & Project */}
                    <p className="text-xs sm:text-sm font-semibold tracking-wide mt-2 mb-4">
                      <span className="text-[#ff6a00]">{current.role}</span>
                      <span className="text-neutral-500">, </span>
                      <span className="text-neutral-400 font-medium">{current.project}</span>
                    </p>

                    {/* Quote Paragraph */}
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal mb-6 sm:mb-8">
                      {current.quote}
                    </p>
                  </div>

                  {/* Card Bottom Bar: Location & Savings Badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-400">
                      <MapPin className="w-4 h-4 text-pink-500 stroke-[2.5]" />
                      <span>{current.location}</span>
                    </div>

                    <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#ff5500]/15 border border-[#ff5500]/30 text-[#ff772e] text-xs sm:text-sm font-bold tracking-wide">
                      <span>{current.savings}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Crosshair Accent & Pagination Dots */}
        <div className="relative z-30 flex flex-col items-center mt-6">
          {/* Precision Laser Reticle Indicator */}
          <div className="relative flex items-center justify-center my-2">
            <div className="w-8 h-[2px] bg-[#ff5500] shadow-[0_0_12px_#ff5500]" />
            <div className="absolute w-2 h-2 rounded-full border border-orange-400 bg-white shadow-[0_0_8px_#ff5500]" />
          </div>

          <div className="flex items-center space-x-2.5 mt-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'bg-[#ff5500] w-6' : 'bg-neutral-600 hover:bg-neutral-400 w-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Scroll Down CTA Prompt */}
      <div className="relative z-30 text-center pt-2">
        <a href="#contact" className="inline-flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors group">
          <span className="text-[11px] tracking-wider uppercase font-semibold text-neutral-500 group-hover:text-neutral-300">
            Scroll to Site Consultation
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#ff5500]" />
        </a>
      </div>
    </section>
  );
};
