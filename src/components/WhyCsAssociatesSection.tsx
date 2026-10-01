import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Coins, 
  Sliders, 
  Clock, 
  UserCheck, 
  Wrench, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhyCsAssociatesSectionProps {
  onOpenConsultation: () => void;
}

interface WhyPillar {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  side: 'left' | 'right';
  deliverables: string[];
  metric: string;
  targetFocus: string;
}

const WHY_PILLARS: WhyPillar[] = [
  // Left Column (3 items)
  {
    id: 'complete-pmc',
    number: '01',
    title: 'Complete Project Management',
    shortDesc: 'Single-point custody from conceptual drawings, municipal approvals, vendor vetting, and item-rate contracting to turnkey move-in delivery.',
    fullDesc: 'We shoulder 100% fiduciary and engineering ownership of your site. We coordinate across design architects, structural engineers, MEP consultants, and over 14 specialized subcontractors so you never deal with finger-pointing, scope creep, or contractor disputes.',
    side: 'left',
    deliverables: [
      'Single point of accountability across all site agencies',
      'Milestone-driven Gantt schedule with critical path tracking',
      'Comprehensive master budget breakdown with zero hidden escalations'
    ],
    metric: '100% Custody',
    targetFocus: 'Full Lifecycle Governance'
  },
  {
    id: 'quality-assurance',
    number: '02',
    title: 'Quality Assurance',
    shortDesc: 'Multi-stage civil inspections covering concrete slump tests, laser level calibrations, rebar spacing, and triple-layer waterproofing.',
    fullDesc: 'Zero tolerance for substandard workmanship. Our certified civil engineers witness every concrete pour, collect 7-day and 28-day cube compression samples, verify rebar spacing against structural blueprints, and conduct 72-hour hydrostatic ponding tests before concealing any works.',
    side: 'left',
    deliverables: [
      'Pre-pour structural inspection checklists signed by lead PMC',
      'Laser-checked formwork plumbness and slab deflection audits',
      '100% genuine brand certification for cement and Fe550D TMT steel'
    ],
    metric: '0-Defect Standard',
    targetFocus: 'Multi-Stage Audits'
  },
  {
    id: 'cost-effective-solutions',
    number: '03',
    title: 'Cost Effective Solutions',
    shortDesc: 'Strict bill measurement audits against actual site work, preventing contractor over-invoicing and delivering 8%–15% verified client savings.',
    fullDesc: 'Contractors frequently inflate running bills with unexecuted quantities, unauthorized item variations, and wastage claims. We physically measure every running meter and square foot on site using laser instruments, auditing invoices before certifying payment—consistently saving clients more than our PMC fee.',
    side: 'left',
    deliverables: [
      'Joint physical laser measurements for every running contractor bill',
      'Bar bending schedule (BBS) reconciliation against actual consumption',
      'Contractor claim mitigation saving 8% to 15% on overall construction outflow'
    ],
    metric: '8-15% Saved',
    targetFocus: 'Capital Protection'
  },

  // Right Column (3 items - balanced with left side)
  {
    id: 'customizable-services',
    number: '04',
    title: 'Customizable Services',
    shortDesc: 'Tailored engagement models—from full turnkey PMC stewardship to standalone structural audits, MEP design, or interior quality assurance.',
    fullDesc: 'Every project has unique requirements. Whether you are building an ultra-luxury residential villa, a corporate commercial complex, or an NABH-compliant specialty hospital, our consultancy packages adapt seamlessly to your exact phase of construction.',
    side: 'right',
    deliverables: [
      'Flexible modular PMC packages tailored to client needs',
      'Specialized advisory for Vaastu, acoustic facades & high-load MEP',
      'Independent second-opinion structural and constructability reviews'
    ],
    metric: 'Bespoke Fit',
    targetFocus: 'Flexible Scope'
  },
  {
    id: 'efficient-timelines',
    number: '05',
    title: 'Efficient Timelines',
    shortDesc: 'Milestone-driven Gantt scheduling with critical path tracking, daily manpower monitoring, and zero avoidable handover delays.',
    fullDesc: 'Time is money in construction. We establish a realistic baseline schedule, track daily labor productivity, enforce material procurement lead times, and implement delay-penalty contract clauses so your handover date remains guaranteed.',
    side: 'right',
    deliverables: [
      'Critical path method (CPM) scheduling with automated milestone alerts',
      'Material procurement buffer planning to prevent site stoppages',
      'Contractor contractual SLA enforcement with milestone-linked payouts'
    ],
    metric: 'On-Schedule',
    targetFocus: 'Milestone Delivery'
  },
  {
    id: 'personalized-attention-support',
    number: '06',
    title: 'Personalized Attention & Support',
    shortDesc: 'Direct oversight by Principal Consultant Mr. Kiran Dikshit L with daily WhatsApp DPRs, 200+ point snag list resolution sign-off, and ongoing maintenance advisory.',
    fullDesc: 'You never deal with anonymous account managers. With CS Associates, your estate receives direct oversight from Mr. Kiran Dikshit L backed by 25+ years of civil authority, along with Daily Progress Reports (DPRs) with photos directly on your phone. Post-possession, we oversee defect liability (DLP), ensure 200+ snag points are resolved, and hand over a complete dossier of as-built architectural, structural, and MEP drawings.',
    side: 'right',
    deliverables: [
      'Direct stewardship of Principal Consultant Mr. Kiran Dikshit L',
      'Dedicated on-site civil engineer present during all work hours & daily WhatsApp DPRs',
      '200+ point snag list resolution sign-off & complete as-built drawings dossier'
    ],
    metric: 'Direct Custody',
    targetFocus: 'Executive Oversight & Handover'
  }
];

export const WhyCsAssociatesSection: React.FC<WhyCsAssociatesSectionProps> = ({
  onOpenConsultation
}) => {
  const [selectedPillar, setSelectedPillar] = useState<WhyPillar | null>(null);
  const [hoveredPillarId, setHoveredPillarId] = useState<string | null>(null);

  const leftPillars = WHY_PILLARS.filter(p => p.side === 'left');
  const rightPillars = WHY_PILLARS.filter(p => p.side === 'right');

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'complete-pmc': return Building2;
      case 'quality-assurance': return ShieldCheck;
      case 'cost-effective-solutions': return Coins;
      case 'customizable-services': return Sliders;
      case 'efficient-timelines': return Clock;
      case 'personalized-attention-support': return UserCheck;
      default: return CheckCircle2;
    }
  };

  return (
    <section 
      id="why-cs-associates" 
      className="w-full bg-[#f8f9fa] text-neutral-900 py-20 lg:py-28 relative overflow-hidden font-sans border-y border-neutral-200 select-none"
    >
      {/* Background Architectural Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* Subtle Atmospheric Gradients */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-200/15 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-12 lg:space-y-16">
        
        {/* ======================================================== */}
        {/* SECTION HEADER (ENTRANCE FROM TOP)                       */}
        {/* ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: -35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-[11px] font-mono font-bold uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>EXCELLENCE IN CIVIL GOVERNANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-display uppercase leading-tight">
            WHY CS ASSOCIATES
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-2xl mx-auto">
            We champion client interests through independent civil engineering audits, transparent contractor governance, and rigorous quality enforcement at every milestone.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* CENTER FLANKED 3-COLUMN SHOWCASE (Matching reference)   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: 3 Items with Right-Pointing Pointer Lines (ENTRANCE FROM LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-8 sm:space-y-10 order-2 lg:order-1"
          >
            {leftPillars.map((pillar) => {
              const Icon = getPillarIcon(pillar.id);
              const isHovered = hoveredPillarId === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredPillarId(pillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`group relative text-left lg:text-right p-5 rounded-2xl transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md border ${
                    isHovered ? 'border-orange-500/80 ring-2 ring-orange-400/20 shadow-lg' : 'border-neutral-200/90'
                  }`}
                >
                  {/* Subtle Connecting Pointer Line for Large Screens (Points towards center image) */}
                  <div className="hidden lg:flex items-center absolute -right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-300">
                    <div className={`h-[1.5px] w-6 transition-all ${
                      isHovered ? 'bg-orange-500 w-8' : 'bg-neutral-300'
                    }`} />
                    <div className={`w-2 h-2 rounded-full transition-all ${
                      isHovered ? 'bg-orange-500 scale-125' : 'bg-neutral-400'
                    }`} />
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    {/* Header with Icon and Title */}
                    <div className="flex items-center lg:flex-row-reverse gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                        isHovered 
                          ? 'bg-orange-500 text-white shadow-orange-500/30' 
                          : 'bg-orange-50 text-orange-600 border border-orange-200/70'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-neutral-950 font-display tracking-tight uppercase">
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      {pillar.shortDesc}
                    </p>

                    {/* READ MORE Action Link */}
                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedPillar(pillar)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 font-mono transition-all group-hover:gap-2 cursor-pointer"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* CENTER COLUMN: Focal Architectural Estate Visual (ENTRANCE FROM BOTTOM) */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center items-center relative"
          >
            
            {/* Visual Elevation Display Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border-2 border-neutral-300 bg-neutral-950 group">
              
              <img
                src="/src/assets/images/residence_abbigere_1790599648176.jpg"
                alt="CS Associates Delivered Luxury Estate"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Architectural Overlay Grid Lines */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Center Floating Status Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                <div className="px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PMC VERIFIED SITE</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-orange-500 text-white font-black text-[10px] font-mono tracking-wider shadow-sm">
                  25+ YRS
                </div>
              </div>

              {/* Bottom Architectural Identity Plate */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/15 text-white z-20">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-orange-400">
                  Delivered Luxury Estate
                </div>
                <div className="text-sm sm:text-base font-bold text-neutral-100 font-display mt-0.5">
                  Dr Lakshmi Residence · 7,400 sq.ft.
                </div>
                <div className="text-xs text-neutral-300 mt-1 flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span>Audited Savings</span>
                  <span className="text-emerald-400 font-mono font-bold">12.4% Direct Saved</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3 Balanced Items with Left-Pointing Pointer Lines (ENTRANCE FROM RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-8 sm:space-y-10 order-3"
          >
            {rightPillars.map((pillar) => {
              const Icon = getPillarIcon(pillar.id);
              const isHovered = hoveredPillarId === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredPillarId(pillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`group relative text-left p-5 rounded-2xl transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md border ${
                    isHovered ? 'border-orange-500/80 ring-2 ring-orange-400/20 shadow-lg' : 'border-neutral-200/90'
                  }`}
                >
                  {/* Subtle Connecting Pointer Line for Large Screens (Points towards center image) */}
                  <div className="hidden lg:flex items-center absolute -left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-300">
                    <div className={`w-2 h-2 rounded-full transition-all ${
                      isHovered ? 'bg-orange-500 scale-125' : 'bg-neutral-400'
                    }`} />
                    <div className={`h-[1.5px] w-6 transition-all ${
                      isHovered ? 'bg-orange-500 w-8' : 'bg-neutral-300'
                    }`} />
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                        isHovered 
                          ? 'bg-orange-500 text-white shadow-orange-500/30' 
                          : 'bg-orange-50 text-orange-600 border border-orange-200/70'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-neutral-950 font-display tracking-tight uppercase">
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                      {pillar.shortDesc}
                    </p>

                    {/* READ MORE Action Link */}
                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedPillar(pillar)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 font-mono transition-all group-hover:gap-2 cursor-pointer"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom Fast Action Banner (ENTRANCE FROM BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-neutral-950 text-white border border-neutral-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">Need Independent Project Management Oversight?</div>
              <div className="text-xs text-neutral-400">Protecting your capital, quality standards, and timelines across Bangalore.</div>
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer shrink-0"
          >
            <span>Consult With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>

      {/* ======================================================== */}
      {/* DETAILED PILLAR MODAL FOR "READ MORE"                    */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 text-neutral-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span>DISCIPLINE {selectedPillar.number}</span>
                  <span>·</span>
                  <span>{selectedPillar.metric}</span>
                </div>

                <h3 className="text-2xl font-black text-neutral-950 font-display">
                  {selectedPillar.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {selectedPillar.fullDesc}
                </p>

                <div className="pt-2 space-y-2 border-t border-neutral-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                    Key PMC Deliverables:
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {selectedPillar.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedPillar(null);
                      onOpenConsultation();
                    }}
                    className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-500/20"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedPillar(null)}
                    className="py-3 px-5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-bold text-xs uppercase tracking-wider font-mono transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
