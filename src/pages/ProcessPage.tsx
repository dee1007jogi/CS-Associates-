import React from 'react';
import { SevenStageProcess } from '../components/SevenStageProcess';
import { DprWhatsAppSimulator } from '../components/DprWhatsAppSimulator';
import { PageHero } from '../components/PageHero';
import { FlaskConical, ShieldCheck, Ruler, Droplets, HardHat } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface ProcessPageProps {
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

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenConsultation }) => {
  const qualityTests = [
    {
      title: '72-Hour Water Ponding Test',
      metric: '0.00 mm Drop Allowed',
      icon: Droplets,
      desc: 'All basements, sunken slabs, terraces, and bathroom wet zones are ponded with water for 72 continuous hours. Certified zero-leak before tiling.'
    },
    {
      title: 'Concrete Cube Compressive Testing',
      metric: '7-Day & 28-Day Strength',
      icon: FlaskConical,
      desc: 'Cubes cast on site for every concrete pour and tested at certified NABL laboratories to ensure design structural strength (M25/M30).'
    },
    {
      title: 'Laser Joint Measurement Audit',
      metric: '100% Bill Verification',
      icon: Ruler,
      desc: 'Contractor running invoices verified on site with digital laser distometers. Zero over-billing or unbuilt quantity claims.'
    },
    {
      title: 'Steel Bar-Bending Reconciliation',
      metric: '< 2.5% Scrap Wastage Cap',
      icon: HardHat,
      desc: 'Raw steel deliveries weighed against manufacturer test certificates. Cut lengths optimized to prevent contractor scrap dumping.'
    }
  ];

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* 1. Cinematic Page Hero with Engineering Backdrop */}
      <PageHero
        badge="Zero-Tolerance Quality Control"
        title="The 7-Stage End-to-End"
        highlightedTitle="PMC Execution Framework"
        description="From pre-construction drawing audits and technical contractor vetting to digital laser distometer verification, concrete slump testing, and daily WhatsApp DPR oversight."
        backgroundImage="/src/assets/images/process_hero_engineering.jpg"
        breadcrumbLabel="7-Stage Process"
        primaryActionLabel="Apply Framework to Project"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '07', label: 'Milestone Stages' },
          { value: '72 hrs', label: 'Ponding Verification' },
          { value: 'Daily', label: 'WhatsApp DPR' }
        ]}
      />

      {/* 7-Stage Process Component */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <SevenStageProcess
          onOpenDprDemo={() => {
            const el = document.getElementById('dpr-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={onOpenConsultation}
        />
      </motion.div>

      {/* Rigorous On-Site Quality Testing Protocols Matrix */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={sectionVariants}
          className="space-y-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-orange-500 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>ZERO COMPROMISE STANDARDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Multi-Tier Civil &amp; Structural Testing Protocols
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl font-sans">
              Contractors cannot conceal substandard works. We conduct mandatory physical and laboratory testing at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityTests.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-display mb-1">
                      {t.title}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-400 mb-2">
                      {t.metric}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* WhatsApp DPR Live Simulator Section */}
      <motion.div 
        id="dpr-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <DprWhatsAppSimulator />
      </motion.div>

    </div>
  );
};
