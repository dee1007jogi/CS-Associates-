import React from 'react';
import { ShieldCheck, TrendingDown, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import commercialBuildingImg from '../assets/images/gallery_commercial_complex_1790601212975.jpg';

interface WhiteThemeSectionProps {
  onOpenConsultation: () => void;
}

export const WhiteThemeSection: React.FC<WhiteThemeSectionProps> = ({ onOpenConsultation }) => {

  const posterStats = [
    { value: '25+', label: 'Years Civil Mastery', sub: 'Hands-on site engineering' },
    { value: '300k+', label: 'Sq.Ft. Supervised', sub: 'High-end villas & commercial' },
    { value: '150+', label: 'Turnkey Handled', sub: 'Zero litigation track record' },
    { value: '8-15%', label: 'Verified Direct Savings', sub: 'Audited contractor bills' }
  ];

  const coreServices = [
    {
      title: 'Verified Cost Savings',
      desc: '8% – 15% saved on contractor invoices via laser audits',
      icon: TrendingDown
    },
    {
      title: 'Daily WhatsApp Supervision',
      desc: 'Geo-tagged site photos & lab test logs every evening',
      icon: Clock
    },
    {
      title: 'Zero-Snag Keys Handover',
      desc: '200+ point quality inspection & warranty dossier',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="protection-matrix" className="bg-white text-neutral-900 py-16 lg:py-24 relative overflow-hidden border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern 3-Column Showcase */}
        <div className="bg-white rounded-3xl p-2 sm:p-4 border border-neutral-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Architectural Photo with Rounded Corners (ENTRANCE FROM LEFT) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 h-full"
            >
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                <img 
                  src={commercialBuildingImg} 
                  alt="CS Associates Architectural & Civil Engineering Excellence" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Middle Column: Kicker, Title, Description, and Rounded Pill CTA (ENTRANCE FROM TOP) */}
            <motion.div 
              initial={{ opacity: 0, y: -35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col justify-center py-2 lg:py-4"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 uppercase tracking-wide mb-3">
                <span className="text-[10px]">▶</span>
                <span>About CS Associates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-neutral-950 tracking-tight leading-tight">
                The Difference Between Building & Building With Trust.
              </h2>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                Construction without independent PMC leads to budget escalation and structural anxiety. CS Associates specializes in turnkey project management, civil quality audits, and contractor bill verification—protecting your family's investment with daily on-site supervision and zero compromises.
              </p>
              <div className="mt-6">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-full shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  <span>Request PMC Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: Services / Protections Card with Clickable Rows (ENTRANCE FROM RIGHT) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 h-full"
            >
              <div className="bg-neutral-50/90 border border-neutral-200/80 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between shadow-xs">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 font-display">
                    Our Services
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 mb-4">
                    A team of veteran civil engineers at your service
                  </p>
                  
                  <div className="space-y-3">
                    {coreServices.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={idx}
                          onClick={onOpenConsultation}
                          className="bg-white rounded-xl p-3.5 border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-orange-400 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-500 transition-colors">
                                {service.title}
                              </div>
                              <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                                {service.desc}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-orange-500/70 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Clean 4-Metric Strip (ENTRANCE FROM BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-12"
        >
          {posterStats.map((st, sIdx) => (
            <div key={sIdx} className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-md transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display tabular-nums tracking-tight">
                {st.value}
              </div>
              <div className="text-xs font-bold text-neutral-900 mt-1">
                {st.label}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">
                {st.sub}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
