import React from 'react';
import { ContactCards, ContactGoogleMaps } from '../components/ContactDetailsAndMap';
import { ContactSection } from '../components/ContactSection';
import { PageHero } from '../components/PageHero';
import { motion, type Variants } from 'framer-motion';

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

export const ContactPage: React.FC = () => {
  const scrollToContactForm = () => {
    const el = document.getElementById('consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#f4f5f7] min-h-screen text-neutral-900 overflow-hidden select-none">
      {/* 1. Cinematic Page Hero with Studio Interior Backdrop */}
      <PageHero
        badge="Bengaluru Headquarters & Site Desk"
        title="Connect With Our Civil"
        highlightedTitle="Engineering Advisory Desk"
        description="Visit our Rajarajeshwarinagar head office or request an on-site feasibility inspection. Speak directly with Principal Consultant Mr. Kiran Dikshit L."
        backgroundImage="/src/assets/images/contact_hero_consultation.jpg"
        breadcrumbLabel="Contact Us"
        primaryActionLabel="Schedule Site Visit"
        onPrimaryAction={scrollToContactForm}
        stats={[
          { value: 'Bengaluru', label: 'BEML Layout' },
          { value: '6 Days/Wk', label: 'Site Desk Open' },
          { value: 'WhatsApp', label: 'Instant Connect' }
        ]}
      />

      {/* 2. Direct Contact Cards on Pure White Theme */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <ContactCards />
      </motion.div>

      {/* 3. Site Consultation Booking & Scope Review Section (Moved below the contact cards) */}
      <motion.div
        id="consultation-form"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <ContactSection theme="dark" />
      </motion.div>

      {/* 4. Interactive Google Maps & Office Accessibility / Transit Hub */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
        className="w-full"
      >
        <ContactGoogleMaps />
      </motion.div>
    </div>
  );
};
