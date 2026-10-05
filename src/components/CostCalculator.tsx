import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, ArrowRight, CheckCircle2, MessageCircle, Plus } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { SectionTelemetryBadge } from './SectionTelemetryBadge';

interface CostCalculatorProps {
  onOpenConsultation: () => void;
  theme?: 'dark' | 'white';
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ 
  onOpenConsultation,
  theme = 'white'
}) => {
  const [projectType, setProjectType] = useState<'villa' | 'commercial' | 'healthcare'>('villa');
  const [areaSqFt, setAreaSqFt] = useState<number>(6500);
  const [specGrade, setSpecGrade] = useState<'premium' | 'ultra' | 'bespoke'>('ultra');
  const isWhite = theme === 'white';

  const rates = {
    premium: 2800,
    ultra: 4200,
    bespoke: 6000
  };

  const estimatedBuildCost = areaSqFt * rates[specGrade];
  const pmcFee = estimatedBuildCost * 0.038;
  const projectedSavings = estimatedBuildCost * 0.115;
  const netSavings = projectedSavings - pmcFee;
  const estimatedMonths = Math.min(24, Math.max(10, Math.round(areaSqFt / 550)));
  const dprCount = estimatedMonths * 26;

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  const shareEstimateToWhatsApp = () => {
    const text = `Hello CS Associates, I calculated an estimate on your website:%0A- Project: ${projectType.toUpperCase()}%0A- Area: ${areaSqFt.toLocaleString()} sq.ft.%0A- Grade: ${specGrade}%0A- Est. Cost: ${formatLakhs(estimatedBuildCost)}%0A- Projected Savings: ${formatLakhs(projectedSavings)}%0AI would like to discuss my project.`;
    window.open(`https://wa.me/918095823483?text=${text}`, '_blank');
  };

  return (
    <section 
      id="calculator" 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors ${
        isWhite ? 'bg-neutral-50 text-neutral-900 border-y border-neutral-300' : 'bg-neutral-950 text-white'
      }`}
    >
      {/* Blueprint Grid Texture for White Theme */}
      {isWhite && (
        <>
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <div className="hidden lg:flex absolute top-6 left-6 text-neutral-400 items-center gap-1 text-[10px] font-mono select-none">
            <Plus className="w-3.5 h-3.5" />
            <span>ESTIMATOR-CALC // ROI-MODEL</span>
          </div>
          <div className="hidden lg:flex absolute top-6 right-6 text-neutral-400 items-center gap-1 text-[10px] font-mono select-none">
            <span>SAVINGS-AUDIT-INDEX</span>
            <Plus className="w-3.5 h-3.5" />
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Poster Style (ENTRANCE FROM TOP) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className={`pb-8 mb-10 ${isWhite ? 'border-b-2 border-neutral-950' : 'border-b border-neutral-800'}`}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 font-mono">
            <span className={isWhite ? 'text-orange-700' : 'text-orange-500'}>PMC FINANCIAL AUDIT</span>
            <span className="text-neutral-400">·</span>
            <span className={isWhite ? 'text-neutral-700' : 'text-neutral-300'}>FEASIBILITY &amp; SAVINGS</span>
            <span className="text-neutral-400">·</span>
            <span className={isWhite ? 'text-orange-700' : 'text-orange-500'}>ROI ESTIMATOR</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-tight ${
            isWhite ? 'text-neutral-950' : 'text-white'
          }`}>
            PMC Cost & Direct Savings Estimator.
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-3xl ${
            isWhite ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            Professional PMC does not cost you extra money — it <strong className="text-neutral-950">saves</strong> you money. Our bill audits and wastage control routinely save 8% to 15%, easily surpassing our consultancy fee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Controls Column (ENTRANCE FROM LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Project Sector */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider font-mono ${
                isWhite ? 'text-neutral-700' : 'text-neutral-300'
              }`}>
                01. Project Typology
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setProjectType('villa')}
                  className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'villa'
                      ? isWhite ? 'bg-neutral-950 text-white border-neutral-950 shadow-md' : 'bg-orange-500 text-neutral-950 border-orange-500 shadow-md'
                      : isWhite ? 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  Luxury Villa
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('commercial')}
                  className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'commercial'
                      ? isWhite ? 'bg-neutral-950 text-white border-neutral-950 shadow-md' : 'bg-orange-500 text-neutral-950 border-orange-500 shadow-md'
                      : isWhite ? 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  Commercial Office
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('healthcare')}
                  className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'healthcare'
                      ? isWhite ? 'bg-neutral-950 text-white border-neutral-950 shadow-md' : 'bg-orange-500 text-neutral-950 border-orange-500 shadow-md'
                      : isWhite ? 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  Healthcare Facility
                </button>
              </div>
            </div>

            {/* Built-up Area Slider */}
            <div className={`p-6 rounded-2xl border space-y-3 ${
              isWhite ? 'bg-white border-neutral-300 shadow-sm' : 'bg-neutral-950 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between">
                <label className={`text-xs font-bold uppercase tracking-wider font-mono ${
                  isWhite ? 'text-neutral-700' : 'text-neutral-300'
                }`}>
                  02. Built-Up Area (Sq.Ft.)
                </label>
                <span className={`text-lg font-bold font-mono tabular-nums ${
                  isWhite ? 'text-orange-800' : 'text-orange-500'
                }`}>
                  {areaSqFt.toLocaleString()} sq.ft.
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={30000}
                step={500}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className={`w-full cursor-pointer h-2 rounded-lg ${
                  isWhite ? 'accent-neutral-950 bg-neutral-200' : 'accent-orange-500 bg-neutral-800'
                }`}
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                <span>2,000 sq.ft.</span>
                <span>15,000 sq.ft.</span>
                <span>30,000 sq.ft.</span>
              </div>
            </div>

            {/* Specification Grade */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider font-mono ${
                isWhite ? 'text-neutral-700' : 'text-neutral-300'
              }`}>
                03. Specification & Finishing Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSpecGrade('premium')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    specGrade === 'premium'
                      ? isWhite ? 'bg-white border-neutral-950 shadow-md ring-1 ring-neutral-950' : 'bg-neutral-800 border-orange-500 text-white'
                      : isWhite ? 'bg-white/80 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className={`text-xs font-bold ${isWhite ? 'text-neutral-950' : 'text-white'}`}>Premium Grade</div>
                  <div className={`text-[11px] mt-1 font-mono font-semibold ${isWhite ? 'text-orange-800' : 'text-neutral-400'}`}>₹2,800 / sq.ft.</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">High-quality branded civil</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSpecGrade('ultra')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    specGrade === 'ultra'
                      ? isWhite ? 'bg-white border-neutral-950 shadow-md ring-1 ring-neutral-950' : 'bg-neutral-800 border-orange-500 text-white'
                      : isWhite ? 'bg-white/80 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className={`text-xs font-bold ${isWhite ? 'text-neutral-950' : 'text-white'}`}>Ultra Luxury</div>
                  <div className={`text-[11px] mt-1 font-mono font-semibold ${isWhite ? 'text-orange-800' : 'text-orange-500'}`}>₹4,200 / sq.ft.</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Italian marble, VRV AC</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSpecGrade('bespoke')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    specGrade === 'bespoke'
                      ? isWhite ? 'bg-white border-neutral-950 shadow-md ring-1 ring-neutral-950' : 'bg-neutral-800 border-orange-500 text-white'
                      : isWhite ? 'bg-white/80 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className={`text-xs font-bold ${isWhite ? 'text-neutral-950' : 'text-white'}`}>Bespoke Iconic</div>
                  <div className={`text-[11px] mt-1 font-mono font-semibold ${isWhite ? 'text-orange-800' : 'text-orange-500'}`}>₹6,000 / sq.ft.</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Custom cantilevers & pool</div>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Real-Time Outcome Summary Card with 3D Depth (ENTRANCE FROM RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <TiltCard3D maxTilt={6}>
              <div className={`rounded-3xl p-6 sm:p-8 space-y-6 border shadow-xl ${
                isWhite ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-neutral-950 border-neutral-800 text-white'
              }`}>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isWhite ? 'border-neutral-200' : 'border-neutral-800'
                }`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isWhite ? 'text-neutral-900' : 'text-white'
                  }`}>
                    Estimated Project Financial Breakdown
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">
                    BENCHMARK-AUDIT
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Construction Cost */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-500 block">Estimated Base Construction</span>
                      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${
                        isWhite ? 'text-neutral-950' : 'text-white'
                      }`}>
                        {formatLakhs(estimatedBuildCost)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-500 block">Est. Duration</span>
                      <span className={`text-sm font-bold font-mono ${isWhite ? 'text-neutral-800' : 'text-neutral-200'}`}>
                        ~{estimatedMonths} Months
                      </span>
                    </div>
                  </div>

                  {/* Direct Savings Box */}
                  <div className={`p-4 rounded-2xl border space-y-1 ${
                    isWhite 
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-800">
                        <TrendingDown className="w-4 h-4" />
                        <span>Projected Direct Savings (8-15%):</span>
                      </span>
                      <span className="text-xl font-extrabold font-mono tabular-nums text-emerald-900">
                        {formatLakhs(projectedSavings)}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isWhite ? 'text-emerald-800' : 'text-emerald-200/80'}`}>
                      Saved through our laser measurement checks of contractor invoices, steel scrap control, and direct material negotiation.
                    </p>
                  </div>

                  {/* Estimated PMC Fee */}
                  <div className={`flex items-center justify-between text-xs py-1 border-t ${
                    isWhite ? 'border-neutral-200 text-neutral-600' : 'border-neutral-800 text-neutral-400'
                  }`}>
                    <span>CS Associates PMC Fee (Approx ~3.8%):</span>
                    <span className={`font-bold font-mono tabular-nums ${isWhite ? 'text-neutral-900' : 'text-neutral-300'}`}>
                      {formatLakhs(pmcFee)}
                    </span>
                  </div>

                  {/* Net Positive ROI */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isWhite 
                      ? 'bg-orange-50/60 border-orange-400 text-neutral-950' 
                      : 'bg-neutral-900 border-neutral-800 text-white'
                  }`}>
                    <div>
                      <span className={`text-xs font-bold block uppercase tracking-wider ${
                        isWhite ? 'text-orange-900 font-mono' : 'text-orange-500'
                      }`}>
                        Net Client Economic Gain:
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        (Savings exceed PMC fee)
                      </span>
                    </div>
                    <span className={`text-xl font-black font-mono tabular-nums ${
                      isWhite ? 'text-neutral-950' : 'text-white'
                    }`}>
                      +{formatLakhs(netSavings)}
                    </span>
                  </div>

                  {/* Transparency features */}
                  <div className={`space-y-1.5 pt-2 text-xs ${isWhite ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Includes ~{dprCount} Daily WhatsApp DPR Photo Reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Dedicated On-Site Civil Engineer</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className={`pt-4 border-t flex flex-col sm:flex-row gap-3 ${
                  isWhite ? 'border-neutral-200' : 'border-neutral-800'
                }`}>
                  <button
                    onClick={shareEstimateToWhatsApp}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Estimate to WhatsApp</span>
                  </button>
                  <button
                    onClick={onOpenConsultation}
                    className={`py-3.5 px-5 font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      isWhite 
                        ? 'bg-neutral-950 hover:bg-neutral-800 text-white' 
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    Feasibility Call
                  </button>
                </div>

              </div>
            </TiltCard3D>
          </motion.div>

        </div>

        {/* Real-time Kinematic Telemetry Badge from Scroll Guide (ENTRANCE FROM BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <SectionTelemetryBadge
            sectionNum="#08"
            paradigmTitle="FINANCIAL HARMONIC WAVEFORM RIBBON & AUDIT CALCULATOR"
            formula="y = base_y + sin(x * freq + phase) * amp * (0.4 + p * 0.8); ROI = (projectedSavings - pmcFee)"
            telemetryText={`Formula: Est. Build ${formatLakhs(estimatedBuildCost)} | Net Client Savings ${formatLakhs(netSavings)}`}
            theme={isWhite ? 'white' : 'dark'}
          />
        </motion.div>

      </div>
    </section>
  );
};
