import React from 'react';
import { motion } from 'framer-motion';
import { CORE_SERVICES } from '../data/servicesData';
import {
  Building,
  ShieldCheck,
  Layers,
  Compass,
  Zap,
  Home,
  Handshake,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  activeSectorTab?: string;
  theme?: 'dark' | 'white';
}

const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'turnkey-pmc': Building,
  'pmc-consulting': ShieldCheck,
  'arch-interior': Layers,
  'vaastu-consulting': Compass,
  'mep-electrical': Zap,
  'facade-fenestration': Home,
  'joint-development': Handshake,
};

// Short display names for the minimal cards
const SHORT_NAMES: Record<string, { line1: string; line2: string }> = {
  'turnkey-pmc':          { line1: 'Turnkey Project', line2: 'Management' },
  'pmc-consulting':       { line1: 'Project Management', line2: 'Consultants' },
  'arch-interior':        { line1: 'Architecture &', line2: 'Interior Design' },
  'vaastu-consulting':    { line1: 'Vaastu', line2: 'Consultants' },
  'mep-electrical':       { line1: 'Electrical &', line2: 'MEP Consultants' },
  'facade-fenestration':  { line1: 'Luxury Homes', line2: '& Villas PMC' },
  'joint-development':    { line1: 'Commercial &', line2: 'Healthcare PMC' },
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenConsultation,
  theme = 'white'
}) => {
  const isWhite = theme === 'white';

  return (
    <section
      id="services"
      className={`py-16 lg:py-24 relative overflow-hidden transition-colors ${
        isWhite ? 'bg-white text-neutral-900' : 'bg-neutral-950 text-white'
      }`}
    >
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${
          isWhite
            ? 'opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:28px_28px]'
            : 'opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (ENTRANCE FROM TOP) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <div className={`inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${
            isWhite ? 'text-orange-500' : 'text-orange-500'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            Our Services
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display ${
            isWhite ? 'text-neutral-950' : 'text-white'
          }`}>
            Our Services &amp; Sector Disciplines.
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl leading-relaxed ${
            isWhite ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            From turnkey project management to specialized MEP, facade engineering, and statutory NABH hospital compliance — engineered excellence for every sector.
          </p>
        </motion.div>

        {/* Minimal Icon-Card Grid (DIRECTIONAL ENTRANCE PER CARD) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {CORE_SERVICES.map((srv, idx) => {
            const Icon = SERVICE_ICONS[srv.id] ?? Building;
            const names = SHORT_NAMES[srv.id] ?? { line1: srv.name, line2: '' };
            const isLeft = idx % 2 === 0;
            const initialX = isLeft ? -35 : 35;

            return (
              <motion.button
                key={srv.id}
                initial={{ opacity: 0, x: initialX, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={onOpenConsultation}
                className={`group flex flex-col items-start gap-4 p-5 sm:p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isWhite
                    ? 'bg-white border-neutral-200 hover:border-orange-400 hover:shadow-md shadow-sm'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-orange-500/50 hover:bg-neutral-900'
                }`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  isWhite
                    ? 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                    : 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                }`}>
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>

                {/* Label */}
                <div>
                  <p className={`text-sm sm:text-base font-semibold leading-snug ${
                    isWhite ? 'text-neutral-800 group-hover:text-neutral-950' : 'text-neutral-200 group-hover:text-white'
                  }`}>
                    {names.line1}
                    {names.line2 && (
                      <>
                        <br />
                        {names.line2}
                      </>
                    )}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom CTA row (ENTRANCE FROM BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-8 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isWhite ? 'border-neutral-200' : 'border-neutral-800'
          }`}
        >
          <p className={`text-sm ${isWhite ? 'text-neutral-500' : 'text-neutral-400'}`}>
            All services delivered by qualified civil engineers with 15+ years of on-site PMC experience.
          </p>
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
