import React, { useState, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, SlidersHorizontal, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTelemetryBadge } from './SectionTelemetryBadge';

interface HeroProps {
  onOpenConsultation: () => void;
  onSelectSector?: (sector: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [selectedType, setSelectedType] = useState('residential');
  const [selectedScale, setSelectedScale] = useState('villa');
  const navigate = useNavigate();

  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layered parallax transformations
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['-50%', '-20%']);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.8], [0.04, 0.01]);
  const floatingCardsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.5]);

  const handleFilterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/services');
  };

  const mobilePills = [
    { label: 'Luxury Villas', path: '/services' },
    { label: '7-Stage PMC', path: '/process' },
    { label: 'Cost Estimator', path: '/calculator' },
    { label: 'Past Projects', path: '/projects' }
  ];

  return (
    <section 
      ref={containerRef}
      id="top" 
      className="relative pt-3 sm:pt-6 pb-12 sm:pb-16 lg:pt-10 lg:pb-24 overflow-hidden"
    >
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Mobile Quick Action Pill Scroller (Native App Feel) */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto scrollbar-none pb-3 pt-1 px-1">
          {mobilePills.map((p, idx) => (
            <button
              key={idx}
              onClick={() => navigate(p.path)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-neutral-200 border border-white/10 shrink-0 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <span>{p.label}</span>
              <ChevronRight className="w-3 h-3 text-orange-500" />
            </button>
          ))}
        </div>

        {/* Top subtle meta indicators (Desktop) */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-200">CS Associates</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Project Management Consultancy (PMC)</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-orange-500/90 font-medium">Bengaluru & Pan-Karnataka</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <span>Civil & Architectural PMC</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Est. 25+ Years Experience</span>
          </div>
        </div>

        {/* Outer Framed Architectural Showcase Canvas */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
          
          {/* Hero Architectural Photography Asset with Parallax */}
          <div className="relative h-[500px] sm:h-[620px] lg:h-[720px] w-full overflow-hidden">
            
            {/* Parallax Background Layer */}
            <motion.div 
              style={{ y: bgY, scale: bgScale }}
              className="absolute inset-0 w-full h-[125%] -top-[12%] will-change-transform pointer-events-none"
            >
              <img
                src="/src/assets/images/hero_luxury_architecture_1790599616170.jpg"
                alt="Bespoke luxury architectural villa project managed by CS Associates"
                className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Subtle Gradient Scrim ensuring legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/40 to-transparent" />

            {/* Architectural Title Overlay with Bottom Blur (Pure White Theme & Refined Scale) */}
            <motion.div 
              aria-hidden="true"
              style={{ y: watermarkY, opacity: watermarkOpacity }}
              className="absolute top-[36%] left-1/2 -translate-x-1/2 select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/20 text-[3.5rem] sm:text-[7rem] lg:text-[11rem] font-black font-display tracking-widest whitespace-nowrap will-change-transform [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)] filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            >
              CS ASSOCIATES
            </motion.div>

            {/* Desktop Interactive Filter Bar */}
            <div className="absolute top-6 left-6 right-6 z-20 hidden md:block">
              <form 
                onSubmit={handleFilterSearch}
                className="max-w-3xl mx-auto glass-panel rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-2xl border border-white/10"
              >
                <div className="flex-1 px-3 border-r border-white/10">
                  <label className="block text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                    Project Sector
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer py-1"
                  >
                    <option value="residential" className="bg-neutral-900 text-white">Individual Homes & Luxury Villas</option>
                    <option value="commercial" className="bg-neutral-900 text-white">Commercial & Corporate Infrastructure</option>
                    <option value="healthcare" className="bg-neutral-900 text-white">Hospitals & Diagnostic Centers</option>
                    <option value="joint-dev" className="bg-neutral-900 text-white">Joint Development Landowner PMC</option>
                  </select>
                </div>

                <div className="flex-1 px-3 border-r border-white/10">
                  <label className="block text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                    Execution Scale
                  </label>
                  <select
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(e.target.value)}
                    className="w-full bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer py-1"
                  >
                    <option value="villa" className="bg-neutral-900 text-white">Bespoke Villa (4,000 - 15,000 sq.ft.)</option>
                    <option value="large-home" className="bg-neutral-900 text-white">Large Estate (15,000+ sq.ft.)</option>
                    <option value="commercial-bldg" className="bg-neutral-900 text-white">Commercial Complex (20,000+ sq.ft.)</option>
                    <option value="hospital" className="bg-neutral-900 text-white">NABH Healthcare Facility</option>
                  </select>
                </div>

                <div className="px-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
                  >
                    <span>Explore Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Main Content Area within Image Card */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-10 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                
                {/* Left Typography Layer */}
                <motion.div 
                  style={{ y: contentY, opacity: contentOpacity }}
                  className="lg:col-span-7 space-y-3 sm:space-y-4 will-change-transform"
                >
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-orange-500">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 shrink-0" />
                    <span className="bg-gradient-to-r from-orange-500/25 via-orange-500/15 to-transparent px-2 py-0.5 rounded-full border border-orange-500/30">
                      Single-Point Ownership from Planning to Handover
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] sm:leading-[1.08] font-display text-balance">
                    A Tradition of Trust, Built with Quality.
                  </h1>

                  <p className="text-neutral-300 text-xs sm:text-base max-w-xl leading-relaxed">
                    Under the leadership of <strong className="text-white font-semibold">Mr. Kiran Dikshit L</strong>, CS Associates protects your money, time, and architectural dream through rigorous 7-stage civil supervision and transparent WhatsApp daily progress tracking.
                  </p>

                  {/* Mobile Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                    <button
                      onClick={onOpenConsultation}
                      className="min-h-[46px] flex-1 sm:flex-initial px-5 py-3 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Book Feasibility Review</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <a
                      href="https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20discuss%20PMC%20for%20my%20construction%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-4 py-3 glass-panel text-white hover:text-orange-400 border border-white/15 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">Direct: 8095823483</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </a>
                  </div>

                  {/* Trust checklist */}
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[10px] sm:text-xs text-neutral-300 pt-2">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Zero Extra Billing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp Photo DPR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>8% - 15% Cost Savings</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Floating Metric Cards - Native App Grid on Mobile */}
                <motion.div 
                  style={{ y: floatingCardsY }}
                  className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 will-change-transform"
                >
                  
                  {/* Floating Metric 1 */}
                  <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl sm:text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                          25+ <span className="text-orange-500 text-sm sm:text-2xl font-normal">Yrs</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-neutral-300 mt-0.5 sm:mt-1 font-medium leading-tight">
                          PMC Mastery
                        </p>
                      </div>
                      <div className="hidden sm:block p-2 rounded-xl bg-white/5 border border-white/10 text-orange-500">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-400">
                      <span>150+ Projects</span>
                      <span className="text-neutral-500">·</span>
                      <span>120+ Clients</span>
                    </div>
                  </div>

                  {/* Floating Metric 2 */}
                  <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl sm:text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                          300k+ <span className="text-emerald-400 text-sm sm:text-2xl font-normal">sqft</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-neutral-300 mt-0.5 sm:mt-1 font-medium leading-tight">
                          Supervised
                        </p>
                      </div>
                      <div className="hidden sm:block p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                        <SlidersHorizontal className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-400">
                      <span className="text-emerald-400 font-medium">8-15% Saved</span>
                      <span className="text-neutral-500">·</span>
                      <span>200+ Amenities</span>
                    </div>
                  </div>

                </motion.div>

              </div>
            </div>

          </div>
        </div>

        {/* Real-time Kinematic Telemetry Badge from Scroll Guide */}
        <div className="mt-4">
          <SectionTelemetryBadge
            sectionNum="#01"
            paradigmTitle="MULTI-TIER SPEED PARALLAX & DEPTH PLUNGE"
            formula="y_bg = p * 22%; y_mid = p * 6%; y_fg = p * -10%; scale = 1 + p * 0.08"
            telemetryText="Matrix: translate3d(0, 22%, 0) scale(1.08)"
            theme="dark"
          />
        </div>

      </div>
    </section>
  );
};
