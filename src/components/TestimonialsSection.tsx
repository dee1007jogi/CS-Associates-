import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  image: string;
  rating: number;
  highlightMetric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dr-lakshmi',
    name: 'Dr. Lakshmi K.',
    role: 'Chief Medical Consultant',
    company: 'Dr Lakshmi Residence',
    location: 'Abbigere, Bengaluru',
    quote:
      'CS Associates gave me total peace of mind. Every single evening, I received their WhatsApp DPR with verified photos of steel binding, waterproofing tests, and slump checks. They caught multiple contractor over-billing attempts and audited over ₹12 Lakhs in direct savings on our 7,400 sq.ft. estate.',
    image: '/src/assets/images/client_portrait_lakshmi.jpg',
    rating: 5,
    highlightMetric: '₹12.4L Audited Savings'
  },
  {
    id: 'sagar',
    name: 'Sagar',
    role: 'Home Construction Client',
    company: 'Bespoke Luxury Villa',
    location: 'Bengaluru',
    quote:
      'Very reliable and trustworthy construction company. They used good materials and maintained clear communication throughout. Finding a team that defends your blueprint specifications against contractor shortcuts is rare. I would definitely recommend them for any home construction project.',
    image: '/src/assets/images/client_portrait_sagar.jpg',
    rating: 5,
    highlightMetric: '100% On-Time Delivery'
  },
  {
    id: 'lavlesh',
    name: 'Lavlesh',
    role: 'Homeowner & Entrepreneur',
    company: 'Turnkey Luxury Residence',
    location: 'Kanakapura Road, Bengaluru',
    quote:
      'Finding the right contractor to build our house was a massive challenge, but thanks to CS Associates, we now have our perfect dream home. Their PMC engineers supervised every concrete pour, laser-checked formwork plumbness, and ensured zero avoidable handover delays.',
    image: '/src/assets/images/client_portrait_lavlesh.jpg',
    rating: 5,
    highlightMetric: 'Zero Handover Snags'
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

  // Keyboard navigation
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
      x: direction === 'right' ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' as const }
    })
  };

  return (
    <section 
      id="testimonials"
      className="relative w-full py-8 lg:py-12 text-white overflow-hidden select-none bg-neutral-950"
    >


      {/* Subtle noise / grain texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Amber ambient glow */}
      <div 
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-32 sm:w-44 md:w-56 bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent pointer-events-none blur-3xl opacity-60"
      />

      {/* Vertical Orange Accent Bar — decorative centerline */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 sm:w-16 pointer-events-none z-0"
      >
        {/* Top segment */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] bg-gradient-to-b from-orange-500 via-orange-500 to-transparent" style={{ height: '45%' }} />
        {/* Bottom segment */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[6px] bg-gradient-to-t from-orange-500 via-orange-500 to-transparent" style={{ height: '18%' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Optical Shield Backdrop (Laser passes cleanly behind) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 relative z-20"
        >
          <div className="inline-block px-6 sm:px-10 py-5 rounded-3xl bg-neutral-950/95 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-orange-500 text-[11px] font-mono font-bold uppercase tracking-widest shadow-sm mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>CLIENT ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 font-sans max-w-xl mx-auto">
              Hear directly from homeowners whose investments, quality, and timelines were safeguarded by CS Associates.
            </p>
          </div>
        </motion.div>

        {/* Carousel Showcase Container (ENTRANCE FROM BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Center Testimonial Card */}
          <div className="w-full mx-10 sm:mx-12">
            <div className="relative bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.55)] border border-white/10 backdrop-blur-xl overflow-hidden">
              {/* Inner glow top-left corner */}
              <div aria-hidden="true" className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
              <div aria-hidden="true" className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-8 items-center"
                >
                  
                  {/* Left Column: Portrait (ENTRANCE FROM LEFT) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -35 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-4 flex justify-center"
                  >
                    <div className="relative w-full max-w-[160px] sm:max-w-[180px] md:max-w-none aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-white/10 bg-white/5">
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-full h-full object-cover object-top filter grayscale contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Rating pill on image corner */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md shadow-sm border border-white/10 flex items-center gap-1">
                        <div className="flex text-orange-500">
                          {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-neutral-200 ml-1">5.0</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Author Info & Quote (ENTRANCE FROM RIGHT) */}
                  <motion.div 
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-8 flex flex-col justify-center space-y-3"
                  >
                    
                    {/* Header: Name, Colored Accent Line, and Role */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                        {current.name}
                      </h3>
                      <div className="w-12 h-0.5 bg-orange-500 my-2 rounded-full" />
                      <div className="text-xs sm:text-sm font-semibold text-orange-500 font-mono tracking-wide">
                        {current.role}, <span className="text-neutral-400 font-normal">{current.company}</span>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <div className="relative">
                      <p className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed font-sans">
                        "{current.quote}"
                      </p>
                    </div>

                    {/* Footer Details: Location & Highlight Metric */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="text-neutral-400">
                        📍 {current.location}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 text-orange-500 font-bold">
                        {current.highlightMetric}
                      </div>
                    </div>

                  </motion.div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

        </motion.div>

        {/* Carousel Pagination Dots — centered below card, sits on orange bar */}
        <div className="flex items-center justify-center gap-2 mt-8 relative z-10">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                idx === currentIndex 
                  ? 'w-8 bg-orange-500 shadow-sm shadow-orange-500/50' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
