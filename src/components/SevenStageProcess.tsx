import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { PMC_7_STAGES } from '../data/servicesData';
import { 
  HelpCircle,
  Wrench,
  HardHat,
  ClipboardCheck,
  Search,
  Layers,
  Rocket,
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Plus
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface SevenStageProcessProps {
  onOpenDprDemo: () => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'white' | 'beige';
  variant?: 'minimal' | 'full';
}

interface MinimalStageItem {
  number: number;
  title: string;
  shortTag: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const MINIMAL_STAGES: MinimalStageItem[] = [
  {
    number: 1,
    title: 'Planning & Feasibility',
    shortTag: 'Hypothesis & Planning',
    tagline: 'Feasibility, Master Budgeting & Risk Review',
    description: 'Master project budget breakdown, constructability review, and baseline milestone scheduling before breaking ground.',
    highlights: ['Comprehensive Master Budget', 'Milestone Gantt Scheduling'],
    icon: HelpCircle
  },
  {
    number: 2,
    title: 'Design & Vendor Vetting',
    shortTag: 'Contractor Sourcing',
    tagline: 'Consultant Synergy & Contractor Vetting',
    description: 'Unbiased technical contractor comparative matrices, milestone-linked penalty SLAs, and material sample benchmarking.',
    highlights: ['Comparative Contractor Matrices', 'Milestone-Linked Contracts'],
    icon: Wrench
  },
  {
    number: 3,
    title: 'Daily Site Supervision',
    shortTag: 'Site Oversight',
    tagline: 'Daily Site Oversight & Transparent WhatsApp DPR',
    description: 'Dedicated on-site qualified civil engineers with photo-verified Daily Progress Reports (DPR) sent directly to your phone.',
    highlights: ['Dedicated On-Site Engineer', 'Daily WhatsApp DPR Updates'],
    icon: HardHat
  },
  {
    number: 4,
    title: 'Zero-Defect Quality Control',
    shortTag: 'Quality Assurance',
    tagline: 'Multi-Tier Audits & Laboratory Testing',
    description: 'Mandatory concrete slump tests, 72-hour ponding leak tests, and pre-pour structural inspection checklists.',
    highlights: ['72-Hour Water Ponding Test', 'Laboratory Concrete Strength'],
    icon: ClipboardCheck
  },
  {
    number: 5,
    title: 'Material & Billing Audit',
    shortTag: 'Wastage & Cost Audit',
    tagline: 'Wastage Control & Laser Bill Audits',
    description: 'Joint laser distometer site measurements for every contractor bill, saving clients 8% to 15% on total build cost.',
    highlights: ['Laser Joint Bill Audits', '8%–15% Verified Savings'],
    icon: Search
  },
  {
    number: 6,
    title: 'MEP & Finishes Coordination',
    shortTag: 'Designer Precision',
    tagline: 'Clash-Free Services & Designer Precision',
    description: 'Coordinated electrical, plumbing, HVAC, and interior detailing to ensure zero pipe clashes and flawless joint finishes.',
    highlights: ['Zero Pipe & Duct Clashes', 'Designer Precision Detailing'],
    icon: Layers
  },
  {
    number: 7,
    title: 'Snag Clearance & Handover',
    shortTag: 'Zero-Defect Handover',
    tagline: '200+ Point Inspection & Keys Delivery',
    description: 'Exhaustive 200+ point snag list verification, complete as-built documentation dossier, and peaceful ceremonial keys handover.',
    highlights: ['200+ Point Snag Audit', 'Ceremonial Keys Handover'],
    icon: Rocket
  }
];

export const SevenStageProcess: React.FC<SevenStageProcessProps> = ({ 
  onOpenDprDemo, 
  onOpenConsultation,
  theme = 'white',
  variant = 'full'
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive Wheel Radius & Node Dimensions
  const [wheelRadius, setWheelRadius] = useState(190);
  const [nodeDimension, setNodeDimension] = useState(56);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWheelRadius(115);
        setNodeDimension(42);
      } else if (width < 1024) {
        setWheelRadius(155);
        setNodeDimension(48);
      } else {
        setWheelRadius(195);
        setNodeDimension(56);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Tracking for Rotating Wheel (Variant === 'minimal')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (variant === 'minimal') {
      const step = Math.min(6, Math.max(0, Math.floor(progress * 7)));
      if (step !== activeStageIndex) {
        setActiveStageIndex(step);
      }
    }
  });

  const handleSelectStage = (index: number) => {
    setActiveStageIndex(index);
    if (containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = scrollTop + rect.top;
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetScroll = containerTop + (index / 6.5) * scrollableDistance;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // =========================================================================
  // =========================================================================
  // MINIMAL ROTATING WHEEL VARIANT (HOME PAGE)
  // Light clean background with signature Orange & Black Box styling
  // =========================================================================
  if (variant === 'minimal') {
    const currentStage = MINIMAL_STAGES[activeStageIndex];
    // Rotate so active stage aligns with the focal angle pointing to the right content card (0 deg)
    const wheelRotation = -activeStageIndex * (360 / 7);

    return (
      <section 
        id="process" 
        ref={containerRef}
        className="relative min-h-[340vh] bg-[#FAF9F6] text-neutral-900 select-none"
      >
        {/* Helmet landing anchor to preserve HangingHardHatRig physics */}
        <div id="helmetRestAnchor" className="absolute top-12 right-12 w-20 h-20 pointer-events-none opacity-0" />

        {/* Sticky Presentation Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-6 sm:py-10 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F5F3EC]">
          
          {/* Subtle Clean Dot Matrix Blueprint Grid */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#d4d4d8 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Faint, airy warmth ambient glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"
          />
          <div 
            aria-hidden="true"
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"
          />

          {/* Architectural White Building Skyline Overlay (Left Bottom Corner) */}
          <div 
            aria-hidden="true" 
            className="absolute -bottom-4 -left-4 sm:bottom-0 sm:left-0 w-[55vw] max-w-[620px] h-[36vh] sm:h-[44vh] max-h-[460px] pointer-events-none select-none z-0 overflow-hidden"
          >
            <img 
              src="/white_building_skyline.jpg"
              alt="Architectural Skyline Overlay"
              className="w-full h-full object-cover object-left-bottom filter brightness-[1.06] contrast-[0.92] opacity-50 mix-blend-multiply"
            />
            {/* Soft gradient fades to blend seamlessly into light background */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FAF9F6]/30 to-[#FAF9F6]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF9F6]/40 to-[#FAF9F6]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center h-full max-h-[920px]">
            
            {/* Header: Minimal, Clean, Light & Orange */}
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 text-xs font-mono font-bold tracking-wider uppercase mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                METHODOLOGY · 7-STAGE PMC PROCESS
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 font-display tracking-tight leading-tight">
                Our 7-Stage End-to-End PMC Process
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                Scroll to rotate through each milestone. Zero contractor shortcuts, audited billings, and daily WhatsApp transparency.
              </p>
            </div>

            {/* Interactive Stage Hub & Minimal Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              
              {/* Left Column: Rotating Wheel with Orange Badges */}
              <div className="lg:col-span-6 flex items-center justify-center relative">
                
                {/* Wheel Container */}
                <div 
                  className="relative flex items-center justify-center"
                  style={{
                    width: `${wheelRadius * 2 + nodeDimension + 40}px`,
                    height: `${wheelRadius * 2 + nodeDimension + 40}px`
                  }}
                >
                  
                  {/* Dashed Circular Orbit Track */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                  >
                    {/* Outer Dashed Orbit Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#d4d4d8"
                      strokeWidth="0.8"
                      strokeDasharray="2.5 2.5"
                    />
                    {/* Inner Architectural Ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="28"
                      fill="none"
                      stroke="#e4e4e7"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {/* Center Hub: "CS Associates 7-Stage Process" */}
                  <div className="absolute z-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-white border-2 border-neutral-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center p-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
                      CS ASSOCIATES
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-extrabold text-neutral-900 font-display leading-tight">
                      PMC Execution
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-extrabold text-orange-500 font-display leading-tight">
                      Process
                    </span>
                    <span className="mt-1 text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest">
                      07 STAGES
                    </span>
                  </div>

                  {/* Active Focal Guide Beam pointing towards right content card */}
                  <div 
                    aria-hidden="true"
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-14 h-0.5 bg-gradient-to-r from-orange-500 to-transparent pointer-events-none opacity-80"
                  />

                  {/* Rotating Wheel Group */}
                  <motion.div
                    animate={{ rotate: wheelRotation }}
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto"
                  >
                    {MINIMAL_STAGES.map((stage, idx) => {
                      const isActive = idx === activeStageIndex;
                      const Icon = stage.icon;
                      
                      // Calculate polar coordinates (Angle 0 is pointing East / Right)
                      const angleDeg = idx * (360 / 7);
                      const angleRad = (angleDeg * Math.PI) / 180;
                      const x = Math.cos(angleRad) * wheelRadius;
                      const y = Math.sin(angleRad) * wheelRadius;

                      return (
                        <div
                          key={stage.number}
                          style={{
                            position: 'absolute',
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            width: `${nodeDimension}px`,
                            height: `${nodeDimension}px`
                          }}
                          className="flex items-center justify-center"
                        >
                          {/* Node Icon Circle with Counter-Rotation to keep upright */}
                          <motion.button
                            type="button"
                            onClick={() => handleSelectStage(idx)}
                            animate={{ 
                              rotate: -wheelRotation,
                              scale: isActive ? 1.15 : 0.92
                            }}
                            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                            className={`relative rounded-full flex items-center justify-center transition-shadow cursor-pointer select-none focus:outline-none ${
                              isActive
                                ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_0_28px_rgba(242,84,0,0.6)] ring-4 ring-orange-500/35 z-30'
                                : 'bg-white hover:bg-orange-50 text-neutral-700 hover:text-orange-600 border-2 border-neutral-200 hover:border-orange-400 shadow-sm z-20'
                            }`}
                            style={{
                              width: `${nodeDimension}px`,
                              height: `${nodeDimension}px`
                            }}
                            title={`Stage 0${stage.number}: ${stage.title}`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />

                            {/* Number Tag Pill */}
                            <span 
                              className={`absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                                isActive 
                                  ? 'bg-neutral-950 text-orange-400 ring-1 ring-orange-500' 
                                  : 'bg-neutral-800 text-neutral-200'
                              }`}
                            >
                              0{stage.number}
                            </span>
                          </motion.button>
                        </div>
                      );
                    })}
                  </motion.div>

                </div>

              </div>

              {/* Right Column: Sleek Black Box with Orange Accents */}
              <div className="lg:col-span-6">
                
                <div className="relative rounded-3xl p-6 sm:p-8 lg:p-9 bg-neutral-950 text-white border border-neutral-800/90 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
                  
                  {/* Vibrant orange decorative glow in corner */}
                  <div 
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 w-56 h-56 bg-orange-500/12 rounded-full blur-3xl pointer-events-none"
                  />

                  {/* Watermark Stage Number */}
                  <div 
                    aria-hidden="true"
                    className="absolute -right-2 -bottom-6 text-[8rem] sm:text-[10rem] font-bold font-display text-white/[0.04] select-none pointer-events-none"
                  >
                    0{currentStage.number}
                  </div>

                  {/* Active Stage Content with Slide-Up Transition from downside */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStageIndex}
                      initial={{ opacity: 0, y: 36 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 space-y-4 sm:space-y-5"
                    >
                      {/* Category & Stage Meta Tag */}
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          STAGE 0{currentStage.number} OF 07
                        </span>
                        <span className="text-white/20">·</span>
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                          {currentStage.shortTag}
                        </span>
                      </div>

                      {/* Heading & Tagline */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-snug">
                          {currentStage.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-orange-400 font-mono font-medium">
                          {currentStage.tagline}
                        </p>
                      </div>

                      {/* Minimal Content */}
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                        {currentStage.description}
                      </p>

                      {/* Minimal Key Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {currentStage.highlights.map((item, hIdx) => (
                          <div 
                            key={hIdx}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200"
                          >
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="font-medium leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 sm:pt-4 border-t border-neutral-800">
                        {currentStage.number === 3 && (
                          <button
                            type="button"
                            onClick={onOpenDprDemo}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                          >
                            <Smartphone className="w-4 h-4" />
                            <span>View Sample WhatsApp DPR</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={onOpenDprDemo}
                          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 active:scale-95 uppercase tracking-wider"
                        >
                          <span>Explore Full Process</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={onOpenConsultation}
                          className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-xs rounded-xl transition-all border border-neutral-700/80 cursor-pointer"
                        >
                          Book Free Consultation
                        </button>
                      </div>

                    </motion.div>
                  </AnimatePresence>

                  {/* Stage Step Controller Footer */}
                  <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectStage(Math.max(0, activeStageIndex - 1))}
                      disabled={activeStageIndex === 0}
                      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer py-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev Stage</span>
                    </button>

                    {/* Step Dots */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {MINIMAL_STAGES.map((s, sIdx) => (
                        <button
                          type="button"
                          key={s.number}
                          onClick={() => handleSelectStage(sIdx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            sIdx === activeStageIndex
                              ? 'w-7 bg-orange-500'
                              : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                          }`}
                          title={`Stage 0${s.number}: ${s.title}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectStage(Math.min(MINIMAL_STAGES.length - 1, activeStageIndex + 1))}
                      disabled={activeStageIndex === MINIMAL_STAGES.length - 1}
                      className="flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer py-1"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    );
  }

  // =========================================================================
  // FULL DETAILED PROCESS VARIANT (PROCESS PAGE)
  // Comprehensive technical breakdown with BOQs, testing protocols, & risk audits
  // =========================================================================
  const activeStage = PMC_7_STAGES[activeStageIndex];
  const isWhite = theme === 'white';

  return (
    <section 
      id="process" 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors ${
        isWhite ? 'bg-neutral-50 text-neutral-900 border-y border-neutral-300' : 'bg-neutral-950 text-white'
      }`}
    >
      {/* Editorial Poster Corner Marks */}
      {isWhite && (
        <>
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <div className="hidden lg:flex absolute top-6 left-6 text-neutral-400 items-center gap-1 text-[10px] font-mono select-none">
            <Plus className="w-3.5 h-3.5" />
            <span>STAGE-PROTOCOL // 07-STEPS-PMC</span>
          </div>
          <div className="hidden lg:flex absolute top-6 right-6 text-neutral-400 items-center gap-1 text-[10px] font-mono select-none">
            <span>ISO-AUDIT-COMPLIANCE</span>
            <Plus className="w-3.5 h-3.5" />
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Poster Header */}
        <div className={`pb-8 mb-10 ${isWhite ? 'border-b-2 border-neutral-950' : 'border-b border-neutral-800'}`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 font-mono">
            <span className={isWhite ? 'text-orange-700' : 'text-orange-500'}>SECTION 04</span>
            <span className="text-neutral-400">·</span>
            <span className={isWhite ? 'text-neutral-700' : 'text-neutral-300'}>EXECUTION FRAMEWORK POSTER</span>
            <span className="text-neutral-400">·</span>
            <span className={isWhite ? 'text-orange-700' : 'text-orange-500'}>ZERO-DEFECT ROADMAP</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-balance ${
            isWhite ? 'text-neutral-950' : 'text-white'
          }`}>
            Our 7-Stage End-to-End PMC Process.
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-3xl ${
            isWhite ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            From initial drawing reviews and technical vendor comparative matrices to daily WhatsApp DPR supervision and the ceremonial handover of your family's keys.
          </p>
        </div>

        {/* Horizontal Step Tabs / Nav Selector - Native Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 overflow-x-auto scrollbar-none pb-2 snap-x">
          {PMC_7_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                type="button"
                key={stage.number}
                onClick={() => setActiveStageIndex(idx)}
                className={`min-w-[125px] sm:min-w-0 flex-shrink-0 p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 sm:h-24 snap-start active:scale-95 ${
                  isActive
                    ? isWhite
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-xl'
                      : 'bg-neutral-800 border-orange-500 text-white shadow-lg ring-1 ring-orange-500/20'
                    : isWhite
                      ? 'bg-white border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold tabular-nums ${
                    isActive ? (isWhite ? 'text-orange-500' : 'text-orange-500') : (isWhite ? 'text-neutral-400' : 'text-neutral-500')
                  }`}>
                    0{stage.number}
                  </span>
                  {idx === 2 && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <span className={`text-[11px] sm:text-xs font-semibold line-clamp-2 leading-snug ${
                  isActive ? 'text-white' : (isWhite ? 'text-neutral-800' : 'text-neutral-300')
                }`}>
                  {stage.stageName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Stage Showcase Card with 3D Depth */}
        <TiltCard3D maxTilt={4}>
          <div className={`rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border ${
            isWhite 
              ? 'bg-white border-neutral-300 text-neutral-900' 
              : 'bg-neutral-900 border-neutral-800 text-white'
          }`}>
            
            {/* Stage Number Glow Backdrop */}
            <div 
              aria-hidden="true" 
              className={`absolute -right-4 -bottom-10 select-none pointer-events-none text-[10rem] sm:text-[14rem] font-bold font-display ${
                isWhite ? 'text-neutral-900/[0.04]' : 'text-white/[0.03]'
              }`}
            >
              0{activeStage.number}
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Stage Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider mb-2">
                    <span className={isWhite ? 'text-orange-800 font-bold' : 'text-orange-500'}>
                      Stage 0{activeStage.number} of 07
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className={isWhite ? 'text-neutral-600' : 'text-neutral-300'}>{activeStage.tagline}</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold font-display ${isWhite ? 'text-neutral-950' : 'text-white'}`}>
                    {activeStage.stageName}
                  </h3>
                  <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isWhite ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    {activeStage.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3">
                  <h4 className={`text-xs font-semibold uppercase tracking-wider ${isWhite ? 'text-neutral-500 font-mono' : 'text-neutral-400'}`}>
                    Key Stage Deliverables & Rigor
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStage.deliverables.map((item, dIdx) => (
                      <div 
                        key={dIdx} 
                        className={`flex items-start gap-2.5 p-3.5 rounded-xl border ${
                          isWhite 
                            ? 'bg-neutral-50 border-neutral-200/90' 
                            : 'bg-neutral-950/60 border-neutral-800/80'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className={`text-xs font-medium leading-relaxed ${isWhite ? 'text-neutral-800' : 'text-neutral-200'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Callout for Stage 3 (WhatsApp DPR) */}
                {activeStage.number === 3 && (
                  <div className={`p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border ${
                    isWhite 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : 'bg-emerald-950/30 border-emerald-500/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-500/20 text-emerald-600 rounded-xl">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className={`text-sm font-semibold ${isWhite ? 'text-emerald-950' : 'text-emerald-300'}`}>
                          Live WhatsApp DPR Site Updates
                        </h5>
                        <p className={`text-xs ${isWhite ? 'text-emerald-800' : 'text-neutral-300'}`}>
                          See how our clients receive real daily site photos, checklists & material audits.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenDprDemo}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
                    >
                      View Sample DPR
                    </button>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className={`flex items-center justify-between pt-4 border-t ${isWhite ? 'border-neutral-200' : 'border-neutral-800'}`}>
                  <button
                    type="button"
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors py-1 cursor-pointer"
                  >
                    ← Previous Stage
                  </button>

                  <button
                    type="button"
                    disabled={activeStageIndex === PMC_7_STAGES.length - 1}
                    onClick={() => setActiveStageIndex(Math.min(PMC_7_STAGES.length - 1, activeStageIndex + 1))}
                    className="flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 transition-colors py-1 cursor-pointer"
                  >
                    <span>Next: Stage 0{Math.min(7, activeStage.number + 1)}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Risk Mitigation & Client Outcomes */}
              <div className="lg:col-span-5 space-y-4">
                {/* Risk Mitigation Card */}
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isWhite ? 'bg-rose-50/70 border-rose-200' : 'bg-neutral-950 border-neutral-800/90'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Critical Risk We Neutralize</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isWhite ? 'text-rose-950' : 'text-neutral-200'}`}>
                    {activeStage.keyRiskMitigated}
                  </p>
                </div>

                {/* Client Value Proposition Card */}
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isWhite ? 'bg-orange-50/70 border-orange-200' : 'bg-neutral-950 border-neutral-800/90'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-800">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>The Client Advantage</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isWhite ? 'text-orange-950' : 'text-neutral-200'}`}>
                    {activeStage.clientBenefit}
                  </p>
                </div>

                {/* Bottom summary box */}
                <div className={`p-6 rounded-2xl space-y-3.5 border ${
                  isWhite 
                    ? 'bg-neutral-900 text-white border-neutral-800 shadow-lg' 
                    : 'bg-gradient-to-br from-neutral-800/50 to-neutral-900 border-neutral-700/60'
                }`}>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-orange-500 font-mono">
                    CS ASSOCIATES GUARANTEE
                  </h5>
                  <div className="space-y-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>One Single Point of Contact (No contractor runaround)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Daily Absolute Transparency on WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>8% - 15% Verified Cost Savings on Total Build</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Contractual On-Time Handover Guarantee</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenConsultation}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Apply 7-Stage Process to Your Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </TiltCard3D>
      </div>
    </section>
  );
};
