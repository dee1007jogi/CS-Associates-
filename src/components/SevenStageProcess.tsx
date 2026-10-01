import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PMC_7_STAGES } from '../data/servicesData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Smartphone,
  Plus
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { SectionTelemetryBadge } from './SectionTelemetryBadge';

interface SevenStageProcessProps {
  onOpenDprDemo: () => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'white';
  variant?: 'minimal' | 'full';
}

export const SevenStageProcess: React.FC<SevenStageProcessProps> = ({ 
  onOpenDprDemo, 
  onOpenConsultation,
  theme = 'white',
  variant = 'full'
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Stage 3 by default
  const activeStage = PMC_7_STAGES[activeStageIndex];
  const isWhite = theme === 'white';

  if (variant === 'minimal') {
    const shortNames = [
      'Pre-Construction',
      'Vendor Vetting',
      'Site Oversight',
      'Quality Control',
      'Material & Billing',
      'MEP & Finishes',
      'Handover'
    ];

    return (
      <section id="process" className="py-20 lg:py-24 relative overflow-hidden text-white">
        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/construction_bg_dark.jpg)' }}
        />
        {/* Dark Overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-neutral-950/85" />
        {/* Subtle amber glow from bottom */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header - Minimal, Refined, Clean (ENTRANCE FROM TOP) */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 text-orange-500 text-xs font-mono font-medium tracking-wider mb-4 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Methodology · 07 Stages
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              Our 7-Stage End-to-End PMC Process.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              A structured, milestone-driven framework ensuring zero contractor shortcuts, audited billings, and total transparency from blueprint to handover.
            </p>
          </motion.div>

          {/* Stepper Tabs - Glassmorphic horizontal rail (ENTRANCE FROM TOP) */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 min-w-max">
              {PMC_7_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.number}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 backdrop-blur-md text-white shadow-sm ring-1 ring-orange-500/50'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-orange-500' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
                      0{stage.number}
                    </span>
                    <span className="whitespace-nowrap">
                      {shortNames[idx]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Stage Details - Glassmorphism card (Landing Target for Hard Hat Rig) */}
          <div id="process-stage-card" className="relative rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-[0_24px_48px_-8px_rgba(0,0,0,0.5)]">
            
            {/* Landing Target Anchor for Fallen Hard Hat in Top Right Corner */}
            <div id="helmetRestAnchor" className="absolute -top-10 -right-2 sm:-top-14 sm:-right-4 w-28 sm:w-32 h-28 pointer-events-none z-30 flex items-center justify-center">
              {/* Expanding Shockwave Pulse on Touchdown */}
              <div id="landingImpactPulse" className="absolute inset-0 rounded-full border-2 border-orange-500 bg-orange-500/20 scale-0 transition-all duration-1000 ease-out pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Stage Details & Deliverables (ENTRANCE FROM LEFT) */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-orange-500 font-semibold tracking-wider uppercase mb-2">
                    <span>Stage 0{activeStage.number} of 07</span>
                    <span className="text-white/20">·</span>
                    <span className="text-neutral-300">{activeStage.tagline}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {activeStage.stageName}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {activeStage.description}
                  </p>
                </div>

                {/* Key Deliverables - Clean unboxed list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Key Deliverables & Rigor
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStage.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <button
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                    className="text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white/10"
                  >
                    ← Previous Stage
                  </button>
                  <div className="h-4 w-px bg-white/10" />
                  <button
                    disabled={activeStageIndex === PMC_7_STAGES.length - 1}
                    onClick={() => setActiveStageIndex(Math.min(PMC_7_STAGES.length - 1, activeStageIndex + 1))}
                    className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-400 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white/10"
                  >
                    <span>Next: Stage 0{Math.min(7, activeStage.number + 1)}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Glassmorphic Protection & Client Benefit Card (ENTRANCE FROM RIGHT) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="p-6 sm:p-7 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 space-y-5">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400/90 font-semibold mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Risk Neutralized</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                      {activeStage.keyRiskMitigated}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-orange-500 font-semibold mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                      <span>The Client Advantage</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                      {activeStage.clientBenefit}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2.5">
                    <button
                      onClick={onOpenDprDemo}
                      className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Explore Detailed Process Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenConsultation}
                      className="w-full py-2.5 px-4 bg-white/8 hover:bg-white/12 text-neutral-200 hover:text-white font-medium text-xs rounded-xl transition-all border border-white/10 cursor-pointer backdrop-blur-sm"
                    >
                      Book Free Technical Consultation
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>
    );
  }

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
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-30 transition-colors py-1 cursor-pointer"
                  >
                    ← Previous Stage
                  </button>

                  <button
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
