import React from 'react';
import { CostCalculator } from '../components/CostCalculator';
import { PageHero } from '../components/PageHero';
import { motion, type Variants } from 'framer-motion';

interface CalculatorPageProps {
  onOpenConsultation: () => void;
}

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 44, 
    scale: 0.985 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      {/* 1. Cinematic Page Hero with Commercial Infrastructure Backdrop */}
      <PageHero
        badge="Feasibility & Cost Governance"
        title="Project Cost & Verified"
        highlightedTitle="Direct Savings Estimator"
        description="Simulate realistic construction budgets, execution timelines, and discover how our laser measurement audits and material controls generate 8% to 15% in net client savings."
        backgroundImage="/src/assets/images/calculator_hero_estimator.jpg"
        breadcrumbLabel="Cost Estimator"
        focusTag="BOQ ESTIMATION & RATE ANALYSIS"
        focusSubtitle="Direct Client Savings & Bill Verification"
        primaryActionLabel="Schedule Feasibility Call"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '8% - 15%', label: 'Direct Savings' },
          { value: '100%', label: 'Laser Bill Checks' },
          { value: 'Net (+)', label: 'ROI Exceeds Fee' }
        ]}
      />

      {/* Cost Calculator Tool with Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <CostCalculator onOpenConsultation={onOpenConsultation} />
      </motion.div>

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Explanatory Savings Anatomy Banner */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={sectionVariants}
          className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl"
        >
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
              Financial Transparency
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              How CS Associates Unlocks 8% to 15% in Direct Client Savings
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Without professional PMC, typical contractors routinely pad measurements by 10-18%, claim unauthorized rate escalations, or use scrap ratios of 8-10%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 space-y-2">
              <div className="text-emerald-400 font-bold font-mono text-sm">01. Laser Measurement Audits</div>
              <h4 className="text-sm font-semibold text-white">Physical Joint Checking</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Every running bill for shuttering, masonry, plaster, and painting is verified on site with laser instruments before sign-off.
              </p>
            </div>

            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 space-y-2">
              <div className="text-emerald-400 font-bold font-mono text-sm">02. Steel & Cement Reconciliation</div>
              <h4 className="text-sm font-semibold text-white">Zero Scrap Dumping</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Theoretical consumption vs. actual site usage is reconciled on every consignment. Contractor scrap claims are strictly capped.
              </p>
            </div>

            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 space-y-2">
              <div className="text-emerald-400 font-bold font-mono text-sm">03. Direct OEM Procurement</div>
              <h4 className="text-sm font-semibold text-white">Wholesale Trade Pricing</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We leverage 25+ years of trade connections to procure Italian marble, electrical cables, sanitaryware, and tiles at wholesale factory rates.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
