import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Quote, 
  MessageSquare, 
  Building2, 
  Users, 
  HeartHandshake, 
  Check, 
  ArrowRight, 
  Star, 
  Clock, 
  Target, 
  Eye, 
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

interface AboutPageProps {
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

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'goals' | 'fiduciary'>('mission');
  const [activePin, setActivePin] = useState<number | null>(1);

  // Bengaluru landmark locations matching the PMC portfolio
  const locations = [
    {
      id: 1,
      name: 'Sadashivanagar',
      project: 'Double-Height Grand Villa',
      area: '7,400 sq.ft.',
      type: 'Luxury Residential',
      x: 48,
      y: 35
    },
    {
      id: 2,
      name: 'Kanakapura Road',
      project: 'Site No 12 Opulence',
      area: '11,200 sq.ft.',
      type: 'Contemporary Architecture',
      x: 38,
      y: 68
    },
    {
      id: 3,
      name: 'Indiranagar',
      project: 'Multi-Specialty Center',
      area: '18,500 sq.ft.',
      type: 'Healthcare Infrastructure',
      x: 62,
      y: 44
    },
    {
      id: 4,
      name: 'Abbigere',
      project: 'Dr. Lakshmi Residence',
      area: '6,200 sq.ft.',
      type: 'Bespoke Private Villa',
      x: 32,
      y: 24
    },
    {
      id: 5,
      name: 'Whitefield',
      project: 'Corporate Atrium Complex',
      area: '24,000 sq.ft.',
      type: 'Commercial PMC',
      x: 78,
      y: 52
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Lakshmi',
      location: 'Abbigere, Bengaluru',
      role: 'Villa Owner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      text: 'CS Associates audited every structural delivery and contractor claim. Through laser joint measurements and steel rebar verification, Mr. Kiran saved us over ₹8.5 Lakhs in unauthorized contractor billings.',
      rating: 5,
      badge: 'Verified Civil Audit'
    },
    {
      name: 'Mr. Anand Rao',
      location: 'Kanakapura Road',
      role: 'NRI Estate Client',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      text: 'Managing a 11,000 sq.ft. villa while living in California seemed impossible until we engaged CS Associates. Their daily WhatsApp DPRs with high-res photos and slump test results gave us 100% peace of mind.',
      rating: 5,
      badge: 'Turnkey Handover'
    },
    {
      name: 'Dr. K. Murthy',
      location: 'Indiranagar, Bengaluru',
      role: 'Healthcare Facility Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      text: 'Complex medical MEP pipelines require zero tolerance for error. CS Associates coordinated between structural engineers, medical gas vendors, and civil teams to deliver 3 weeks ahead of schedule.',
      rating: 5,
      badge: 'Healthcare PMC'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO HEADER WITH BREADCRUMB */}
      {/* ========================================================================= */}
      <PageHero
        badge="Established 1999 · Bengaluru PMC"
        title="A Tradition of Trust &"
        highlightedTitle="Fiduciary Civil Leadership"
        description="Bengaluru’s authoritative Project Management Consultancy — safeguarding capital, guaranteeing structural perfection, and delivering turnkey peace of mind for over 25 years under the direct stewardship of Mr. Kiran Dikshit L."
        backgroundImage="/src/assets/images/about_hero_leadership.jpg"
        breadcrumbLabel="About Us"
        focusTag="DIRECTOR'S DESK · ENGINEERING LEADERSHIP"
        focusSubtitle="25+ Years Safeguarding Bengaluru Capital"
        primaryActionLabel="Schedule Discovery Call"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '25+', label: 'Years of Trust' },
          { value: '150+', label: 'Delivered Projects' },
          { value: '₹18L+', label: 'Audited Savings' }
        ]}
      />

      {/* ========================================================================= */}
      {/* 2. COMPANY ABOUT / MAIN INTRODUCTION (Clean WHITE Background) */}
      {/* ========================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Images + Orange / Wood Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Photo with Black Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-neutral-900 bg-neutral-950 group">
                <img
                  src="/src/assets/images/kiran_dikshit_founder.jpg"
                  alt="Mr. Kiran Dikshit L - Founder & Proprietor"
                  className="w-full h-[420px] sm:h-[460px] object-cover object-top filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-xs text-neutral-200">
                  <div className="text-white font-bold text-base font-display">Mr. Kiran Dikshit L</div>
                  <div className="text-orange-400 font-mono text-[11px] font-semibold">Founder & Proprietor · CS Associates</div>
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 h-48 sm:h-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 hidden sm:block">
                <img
                  src="/src/assets/images/architect_consultant_executive.jpg"
                  alt="Architectural Project Management Team"
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] text-orange-400 font-mono font-semibold">
                  Site Engineering Desk
                </div>
              </div>

              {/* Floating Badge (Black & Orange) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-6 -left-4 sm:-left-8 bg-neutral-950 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-orange-500 flex flex-col items-center justify-center text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-orange-400">
                  25+
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-200 font-bold mt-0.5 leading-tight">
                  Years of<br />Experience
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Company Story & Core Services */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Small Eyebrow Tag with Orange Accent */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-700 text-xs font-mono font-bold tracking-wider uppercase">
              Company About
            </div>

            {/* Display Headline in Dark Neutral / Black */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight font-display leading-tight">
              Complete Construction Peace of Mind.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
              CS Associates is an independent Project Management Consultancy (PMC) dedicated to safeguarding property owners, luxury homeowners, and commercial developers across Karnataka. We operate strictly as your fiduciary advocate — eliminating contractor shortcuts, inflated invoices, and structural discrepancies.
            </p>

            {/* Core Services Header */}
            <div className="pt-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#78350f] mb-4">
                Core Speciality Services & Fiduciary Safeguards
              </h4>

              {/* 2-Column Checklist with Orange Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-800 font-semibold">
                    Independent Civil & Structural Audits
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-800 font-semibold">
                    Audited 8%–15% Raw Material Savings
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-800 font-semibold">
                    Strict Milestone Gantt Schedules
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-800 font-semibold">
                    Reliable & Veteran Site Engineers
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button: Vibrant Orange */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>GET A FREE PROJECT AUDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20consult%20on%20my%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl border border-[#e5dbcb] hover:border-neutral-900 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-neutral-950 transition-all flex items-center gap-2 bg-[#f7f4ee] hover:bg-[#ebe3d5]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Directly</span>
              </a>
            </div>

          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 3. FULL-WIDTH BLACK STATISTICS RIBBON BAR WITH ORANGE HIGHLIGHTS */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="w-full bg-black text-white border-y border-neutral-800 py-12 sm:py-16 relative overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start px-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-orange-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-display tabular-nums">
                  25+
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 font-mono tracking-wide mt-0.5">
                  Years of PMC Mastery
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start px-4 pt-6 lg:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-orange-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <Building2 className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-display tabular-nums">
                  150+
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 font-mono tracking-wide mt-0.5">
                  Delivered Projects
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start px-4 pt-6 lg:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-orange-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-display tabular-nums">
                  68+
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 font-mono tracking-wide mt-0.5">
                  Vetted Contractors
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start px-4 pt-6 lg:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-orange-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-display tabular-nums">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 font-mono tracking-wide mt-0.5">
                  Defect-Free Guarantee
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 4. INTERACTIVE MISSION, VISION & GOAL (Clean WHITE Background) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission Description & Interactive Tabs with Orange Theme */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-700 text-xs font-mono font-bold tracking-wider uppercase">
              About Mission
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight font-display leading-tight">
              Our Core Goal: Protecting Client Capital & Architectural Fidelity
            </h2>

            {/* Interactive Tab Switcher Pills with Orange Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'mission'
                    ? 'bg-orange-500 text-white shadow-md border border-orange-600'
                    : 'bg-[#f7f4ee] hover:bg-[#ebe3d5] text-neutral-700 border border-[#e5dbcb]'
                }`}
              >
                Our Mission
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-orange-500 text-white shadow-md border border-orange-600'
                    : 'bg-[#f7f4ee] hover:bg-[#ebe3d5] text-neutral-700 border border-[#e5dbcb]'
                }`}
              >
                Our Vision
              </button>

              <button
                onClick={() => setActiveTab('goals')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'goals'
                    ? 'bg-orange-500 text-white shadow-md border border-orange-600'
                    : 'bg-[#f7f4ee] hover:bg-[#ebe3d5] text-neutral-700 border border-[#e5dbcb]'
                }`}
              >
                Our Goal
              </button>

              <button
                onClick={() => setActiveTab('fiduciary')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'fiduciary'
                    ? 'bg-orange-500 text-white shadow-md border border-orange-600'
                    : 'bg-[#f7f4ee] hover:bg-[#ebe3d5] text-neutral-700 border border-[#e5dbcb]'
                }`}
              >
                Fiduciary Promise
              </button>
            </div>

            {/* Dynamic Tab Content with Smooth Animation */}
            <AnimatePresence mode="wait">
              {activeTab === 'mission' && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2"
                >
                  <h3 className="text-xl font-bold text-neutral-950 font-display">
                    Our Company Mission
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                    To deliver uncompromising single-point accountability for construction projects across Bengaluru. From municipal approval coordination to foundation excavation, MEP rough-ins, and turnkey finishing, we protect every rupee our client invests with rigorous site supervision and transparent ledger audits.
                  </p>
                  <div className="bg-[#faf8f5] border border-[#e5dbcb] p-4 rounded-xl text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold font-mono">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span>Zero-Defect Commitment</span>
                    </div>
                    <p className="text-neutral-600">
                      Laser verification of all formwork plumbness, 72-hour hydrostatic ponding tests, and concrete slump cube crush certification before billing approval.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2"
                >
                  <h3 className="text-xl font-bold text-neutral-950 font-display">
                    Our Long-Term Vision
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                    To be recognized as Karnataka’s benchmark Project Management Consultancy — a firm synonymous with integrity, technical brilliance, and unyielding defense of client interests against dishonest industry practices.
                  </p>
                  <div className="bg-[#faf8f5] border border-[#e5dbcb] p-4 rounded-xl text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold font-mono">
                      <Eye className="w-4 h-4 text-orange-500" />
                      <span>Architectural Fidelity</span>
                    </div>
                    <p className="text-neutral-600">
                      Ensuring every millimeter of an architect’s blueprint is brought to life on site without structural compromises or unauthorized contractor substitutions.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'goals' && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2"
                >
                  <h3 className="text-xl font-bold text-neutral-950 font-display">
                    Our Deliverable Goals
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                    Every project is managed like a precision manufacturing deck. We target 0% budget overruns, 0% unauthorized material wastage, and 100% on-time handover backed by penalty-linked contract agreements.
                  </p>
                  <div className="bg-[#faf8f5] border border-[#e5dbcb] p-4 rounded-xl text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold font-mono">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Guaranteed Timeline Delivery</span>
                    </div>
                    <p className="text-neutral-600">
                      Gantt tracking updated daily. Daily WhatsApp Progress Reports (DPR) sent directly to owners every evening at 6:00 PM.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'fiduciary' && (
                <motion.div
                  key="fiduciary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2"
                >
                  <h3 className="text-xl font-bold text-neutral-950 font-display">
                    Zero-Kickback Fiduciary Oath
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                    Unlike conventional contractors or middlemen, CS Associates strictly charges a transparent professional consulting fee. We never accept supplier kickbacks, contractor margins, or vendor commissions.
                  </p>
                  <div className="bg-[#faf8f5] border border-[#e5dbcb] p-4 rounded-xl text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold font-mono">
                      <HeartHandshake className="w-4 h-4 text-orange-500" />
                      <span>100% Client Loyalty</span>
                    </div>
                    <p className="text-neutral-600">
                      Every rupee in vendor discounts negotiated is passed directly back to your project ledger, saving our clients hundreds of thousands of rupees.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: High-End Team Photo with Warm Wood Border */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#e5dbcb] bg-[#faf8f5] group">
              <img
                src="/src/assets/images/team_architectural_meeting.jpg"
                alt="CS Associates Architectural & Civil Engineering Review"
                className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e5dbcb] shadow-xl">
                <div>
                  <div className="text-neutral-950 font-bold font-display text-sm">Daily Drawing & Milestone Audit</div>
                  <div className="text-neutral-600 font-mono text-[11px]">CS Associates Bengaluru Headquarters</div>
                </div>
                <div className="px-3 py-1 rounded bg-orange-500 text-white font-mono text-[11px] font-bold shadow-sm">
                  Verified Team
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 5. BENGALURU FOOTPRINT & GEOGRAPHIC PRESENCE (Warm Beige Background) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="py-20 lg:py-28 bg-[#f7f4ee] border-y border-[#e5dbcb] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Metric Callout & Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-700 text-xs font-mono font-bold tracking-wider uppercase">
                Geographic Presence
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight font-display leading-tight">
                Over 300,000+ Sq.Ft. Managed Across Bengaluru’s Prime Belts
              </h2>

              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                From high-density cantilevers in Kanakapura Road to heritage villa restoration in Sadashivanagar and multi-specialty healthcare centers in Indiranagar — our on-ground civil supervisors protect your sites everywhere.
              </p>

              {/* 3 Metric Summary Cards matching with Orange / Wood Accents */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white border border-[#e5dbcb] p-4 rounded-xl text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-neutral-950 font-display">300K+</div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500 font-mono uppercase mt-1">Sq.Ft. Built</div>
                </div>

                <div className="bg-white border border-[#e5dbcb] p-4 rounded-xl text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-orange-500 font-display">150+</div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500 font-mono uppercase mt-1">Sites Audited</div>
                </div>

                <div className="bg-white border border-[#e5dbcb] p-4 rounded-xl text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[#78350f] font-display">₹18L+</div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500 font-mono uppercase mt-1">Avg. Savings</div>
                </div>
              </div>

              {/* Pin Selection Details with Orange Accent */}
              {activePin !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white border-2 border-orange-500 shadow-md text-xs font-mono"
                >
                  <div className="text-neutral-950 font-bold text-sm flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    {locations.find(l => l.id === activePin)?.name}
                  </div>
                  <div className="text-neutral-700 mt-1">
                    Project: {locations.find(l => l.id === activePin)?.project}
                  </div>
                  <div className="text-neutral-500 mt-0.5 flex items-center justify-between">
                    <span>Scope: {locations.find(l => l.id === activePin)?.area}</span>
                    <span className="text-orange-600 font-bold">{locations.find(l => l.id === activePin)?.type}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Technical Vector Map with Glowing Orange Pins */}
            <div className="lg:col-span-7 bg-white border border-[#e5dbcb] rounded-3xl p-6 sm:p-8 relative min-h-[380px] flex items-center justify-center overflow-hidden shadow-md">
              
              {/* Coordinate Grid Background */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative w-full max-w-lg aspect-[4/3] border border-[#e5dbcb] rounded-2xl bg-[#faf8f5] p-4">
                
                {/* SVG Radial Map Overlay */}
                <svg className="w-full h-full text-neutral-300" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  
                  <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />

                  <polyline points="48,35 62,44 78,52 38,68 32,24" fill="none" stroke="rgba(234, 88, 12, 0.45)" strokeWidth="1.2" />
                </svg>

                {/* Location Interactive Glowing ORANGE Pins */}
                {locations.map((loc) => {
                  const isSelected = activePin === loc.id;

                  return (
                    <button
                      key={loc.id}
                      onClick={() => setActivePin(isSelected ? null : loc.id)}
                      onMouseEnter={() => setActivePin(loc.id)}
                      style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isSelected ? 'bg-orange-500' : 'bg-orange-400'
                        }`} />
                        <span className={`relative inline-flex rounded-full h-3.5 w-3.5 shadow-lg border-2 border-white ${
                          isSelected ? 'bg-neutral-950 scale-125' : 'bg-orange-500 group-hover:scale-125'
                        } transition-transform`} />
                      </span>

                      {/* Tooltip Label */}
                      <span className="absolute top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none group-hover:block transition-all z-20">
                        {loc.name}
                      </span>
                    </button>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-neutral-500">
                  BENGALURU URBAN & RURAL SECTORS // CS-PMC
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 6. CLIENT TESTIMONIALS & SOCIAL PROOF (Clean WHITE Background) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-700 text-xs font-mono font-bold tracking-wider uppercase">
            Our Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight font-display leading-tight">
            Trusted By Discerning Villa Owners & Corporate Builders
          </h2>
          <p className="text-sm text-neutral-600 font-sans">
            Real feedback from property owners whose time, funds, and architectural visions were fiercely protected.
          </p>
        </div>

        {/* Testimonial Cards Grid with Orange Stars & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#e5dbcb] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative hover:shadow-xl hover:border-orange-500 transition-all"
            >
              <div className="space-y-4">
                {/* 5 Orange Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-neutral-300" />

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-sans">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Verified Badge */}
              <div className="pt-6 mt-6 border-t border-[#f3ede2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#e5dbcb]"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-950 font-display">{t.name}</h4>
                    <p className="text-[11px] text-neutral-500 font-mono">{t.role} · {t.location}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-[10px] font-mono text-orange-800 font-bold">
                  {t.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 7. WIDE ENGINEERING SUPERVISOR CALLOUT BANNER (BLACK Background) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="relative py-20 sm:py-28 overflow-hidden bg-black text-white border-t border-neutral-800">
        {/* Background Site Engineer Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/pmc_site_inspection_engineer.jpg"
            alt="Bengaluru Skyscraper Civil Supervision"
            className="w-full h-full object-cover object-[78%_center] filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Left-only gradient overlay for text readability, right side clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-45% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-mono font-bold tracking-wider uppercase">
              Bengaluru PMC Direct Desk
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Connecting Precision Engineering To Your Living Spaces
            </h2>

            <p className="text-sm sm:text-base text-[#f7f4ee] leading-relaxed font-sans">
              Have architectural blueprints ready or an active construction site requiring independent civil supervision? Talk directly with Mr. Kiran Dikshit L for an unvarnished audit of your bill of quantities (BOQ) and structural schedule.
            </p>

            {/* Buttons: Vibrant Orange Primary + Dark Accent Secondary */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>SCHEDULE DISCOVERY CALL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918095823483"
                className="px-5 py-3.5 rounded-xl border border-neutral-700 hover:border-orange-500 text-xs sm:text-sm font-semibold text-[#f7f4ee] hover:text-white transition-all flex items-center gap-2 bg-neutral-900/80"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 80958 23483</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </motion.div>

    </div>
  );
};
