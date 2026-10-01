import React from 'react';
import { Hero } from '../components/Hero';
import { ConstructionHero3D } from '../components/ConstructionHero3D';
import { StatsBar } from '../components/StatsBar';
import { ServicesGallerySection } from '../components/ServicesGallerySection';
import { FounderSection } from '../components/FounderSection';
import { BlueprintToRealitySection } from '../components/BlueprintToRealitySection';
import { WhyCsAssociatesSection } from '../components/WhyCsAssociatesSection';
import { WhiteThemeSection } from '../components/WhiteThemeSection';
import { HangingHardHatRig } from '../components/HangingHardHatRig';
import { Gallery3D } from '../components/Gallery3D';
import { SevenStageProcess } from '../components/SevenStageProcess';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { CostCalculator } from '../components/CostCalculator';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

interface HomePageProps {
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

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();

  const handleOpenDprDemo = () => {
    navigate('/process');
  };

  return (
    <div className="space-y-0 overflow-x-clip font-sans">
      {/* SECTION 01: Hero Section - 3D Architectural Metropolis Construction Simulation with Scroll Zoom */}
      <div id="top" className="bg-neutral-950 relative">
        <ConstructionHero3D onOpenConsultation={onOpenConsultation} nextSectionId="stats-overview" />
        <div id="stats-overview" className="relative z-20 pt-4 pb-12">
          <StatsBar theme="dark" />
        </div>
      </div>

      {/* SECTION 02: Services Interactive Gallery - As cards scroll below, top showcase dynamically updates */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        id="services-gallery"
      >
        <ServicesGallerySection onOpenConsultation={onOpenConsultation} />
      </motion.div>

      {/* SECTION 03: Executive Founder & Leadership - WHITE THEME POSTER with 3D Tilt */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        id="founder"
      >
        <FounderSection onOpenConsultation={onOpenConsultation} theme="gold" />
      </motion.div>

      {/* SECTION 04: 3D Architectural Assembly - Blueprint to Reality Sovereign Palace */}
      <div className="w-full relative p-0 m-0">
        <BlueprintToRealitySection onOpenConsultation={onOpenConsultation} />
      </div>

      {/* SECTION 05: WHY CS ASSOCIATES - Flanked Architectural Centerpiece Showcase */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        id="why-cs-associates"
      >
        <WhyCsAssociatesSection onOpenConsultation={onOpenConsultation} />
      </motion.div>

      {/* SECTION 06: 3D Spatial Architectural Gallery - Sticky Card Deck Compaction */}
      <div id="spatial-gallery" className="bg-neutral-950 border-t border-neutral-800 relative z-20">
        <Gallery3D />
      </div>

      {/* Hanging Chain Rigging & 3D Hard Hat Physics (Spans Section 07 to Section 08) */}
      <HangingHardHatRig />

      {/* SECTION 07: Quality Standard & Client Protection Matrix - WHITE THEME POSTER */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <WhiteThemeSection onOpenConsultation={onOpenConsultation} />
      </motion.div>

      {/* SECTION 08: 7-Stage Process & WhatsApp DPR Command - DARK THEME POSTER */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="bg-neutral-950 border-t border-neutral-800"
      >
        <SevenStageProcess 
          onOpenDprDemo={handleOpenDprDemo} 
          onOpenConsultation={onOpenConsultation} 
          theme="dark"
          variant="minimal"
        />
      </motion.div>

      {/* SECTION 09: Multi-Disciplinary Architecture & Engineering - WHITE THEME POSTER */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <ServicesSection onOpenConsultation={onOpenConsultation} theme="white" />
      </motion.div>

      {/* SECTION 10: Curated Realized Portfolio - DARK THEME POSTER with 3D Tilt */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="bg-neutral-950 border-t border-neutral-800"
      >
        <ProjectsSection onOpenConsultation={onOpenConsultation} variant="carousel" />
      </motion.div>

      {/* SECTION 11: PMC Investment & Direct Savings Estimator - WHITE THEME POSTER */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <CostCalculator onOpenConsultation={onOpenConsultation} theme="white" />
      </motion.div>

      {/* SECTION 12: Testimonials Showcase */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full border-t border-neutral-800 bg-neutral-950"
      >
        <TestimonialsSection />
      </motion.div>

      {/* SECTION 13: Bengaluru Headquarters Desk & Quick Consultation */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <ContactSection theme="white" />
      </motion.div>
    </div>
  );
};
