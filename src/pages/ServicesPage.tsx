import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Building2, 
  Home, 
  ShieldCheck, 
  Layers, 
  Activity, 
  ArrowRight, 
  Check, 
  Star, 
  Quote, 
  HardHat, 
  Phone, 
  MessageSquare,
  Clock,
  Sparkles,
  TrendingUp,
  Compass,
  Zap,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ProjectsPassionSection } from '../components/ProjectsPassionSection';
import { StyleGallerySection } from '../components/StyleGallerySection';

interface ServicesPageProps {
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

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const services = [
    {
      id: 'general-contracting',
      title: 'General Contracting & Civil PMC',
      category: 'Civil Execution',
      desc: 'From excavation to structural framing, we oversee all contractor trades with physical joint measurement audits and slump cube tests.',
      image: '/src/assets/images/gallery_site_engineering_1790601189950.jpg',
      icon: HardHat,
      features: ['Turnkey Site Execution', 'Joint Measurement Audits', 'Zero Rebar Sagging']
    },
    {
      id: 'renovation-remodeling',
      title: 'Renovation & Luxury Fitout',
      category: 'Interior & Millwork',
      desc: 'Transform your existing residence with book-matched Italian marble, acoustic fluted panels, and precision concealed MEP routing.',
      image: '/src/assets/images/gallery_luxury_interior_1790601175826.jpg',
      icon: Home,
      features: ['Bespoke Millwork Standards', 'Acoustic Ceiling Alignment', 'Zero-Crack Detailing']
    },
    {
      id: 'project-management',
      title: 'Project Management Consultancy',
      category: 'Governance & PMC',
      desc: 'Independent single-point governance. We audit contractor bills, manage milestone Gantt schedules, and save 8% to 15% on total budget.',
      image: '/src/assets/images/team_architectural_meeting.jpg',
      icon: ShieldCheck,
      features: ['Daily WhatsApp DPR Reports', 'Contractor Bill Auditing', 'Penalty-Linked Timelines']
    },
    {
      id: 'residential-villas',
      title: 'Residential Villa Construction',
      category: 'Luxury Architecture',
      desc: 'Bespoke private estates engineered with deflection-tested structural cantilevers, 72-hour ponding tests, and thermal facade glazing.',
      image: '/src/assets/images/opulence_kanakapura_1790599663999.jpg',
      icon: Building2,
      features: ['Architectural Plan Fidelity', 'Deflection-Tested Cantilevers', '100% Water Tightness']
    },
    {
      id: 'commercial-atrium',
      title: 'Commercial & Corporate Projects',
      category: 'Commercial PMC',
      desc: 'High-performance commercial facilities featuring structural curtain walls, clash-free HVAC routing, and fast-track occupancy certification.',
      image: '/src/assets/images/gallery_commercial_complex_1790601212975.jpg',
      icon: Building2,
      features: ['High-Load MEP Integration', 'Acoustic Glazing (42dB STC)', 'Fast-Track Handover']
    },
    {
      id: 'industrial-healthcare',
      title: 'Healthcare & Specialized Facilities',
      category: 'Specialized Infrastructure',
      desc: 'NABH-compliant healthcare and industrial installations requiring medical gas piping, cleanroom zoning, and heavy load vibration control.',
      image: '/src/assets/images/healthcare_commercial_1790599676109.jpg',
      icon: Activity,
      features: ['NABH Statutory Compliance', 'Anti-Vibration Concrete Slabs', 'Medical Gas Integration']
    }
  ];

  const clientReviews = [
    {
      name: 'Dr. Lakshmi',
      role: 'Villa Owner',
      location: 'Abbigere, Bengaluru',
      text: 'CS Associates delivered our dream home on time and exceeded our expectations. Their civil engineering team was professional, transparent, and saved us over ₹8 Lakhs.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80'
    },
    {
      name: 'Mr. Anand Rao',
      role: 'NRI Estate Client',
      location: 'Kanakapura Road',
      text: 'Excellent service and high-quality civil oversight. Managing a 11,000 sq.ft villa from the USA was stress-free with their daily WhatsApp video and photo reports.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    {
      name: 'Dr. K. Murthy',
      role: 'Healthcare Director',
      location: 'Indiranagar, Bengaluru',
      text: 'We hired CS Associates for our hospital facility. Their attention to detail and strict quality checks on MEP and concrete ensured we opened 3 weeks ahead of schedule.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (Matches reference design with PMC site inspection) */}
      {/* ========================================================================= */}
      <PageHero
        badge="Bengaluru PMC Direct Desk"
        title="Connecting Precision"
        highlightedTitle="Engineering To Your Living Spaces"
        description="Have architectural blueprints ready or an active construction site requiring independent civil supervision? Talk directly with Mr. Kiran Dikshit L for an unvarnished audit of your bill of quantities (BOQ) and structural schedule."
        backgroundImage="/src/assets/images/pmc_site_inspection_engineer.jpg"
        breadcrumbLabel="Services"
        primaryActionLabel="Schedule Discovery Call"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '100%', label: 'Joint Audits' },
          { value: 'Daily', label: 'WhatsApp DPR' },
          { value: 'Zero', label: 'Rebar Sagging' }
        ]}
      />

      {/* ========================================================================= */}
      {/* 2. SERVICES SECTION (Clean White Background + Rich Wood & Orange Lead Card) */}
      {/* ========================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* LEAD STANDOUT CARD: Rich Wood / Warm Walnut Background with Orange & Beige Accents */}
          <div className="lg:col-span-1 bg-[#78350f] text-white p-7 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border-2 border-[#92400e] relative overflow-hidden group">
            
            {/* Subtle Woodgrain Aesthetic Flare */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Hard Hat Icon in Circular Orange Badge */}
              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <HardHat className="w-7 h-7" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight leading-tight pt-2 text-[#faf8f5]">
                Professional and Reliable Services.
              </h3>

              <p className="text-xs sm:text-sm text-[#f7f4ee]/90 leading-relaxed font-sans font-medium">
                We deliver high-quality construction services with professional expertise, advanced engineering technology, and an unyielding commitment to excellence.
              </p>
            </div>

            <div className="pt-6 border-t border-white/20 relative z-10 space-y-3">
              <button
                onClick={onOpenConsultation}
                className="w-full py-3 bg-neutral-950 hover:bg-black text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Consult Our Engineers</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#f7f4ee]/80 font-semibold pt-1">
                <span>Bengaluru PMC</span>
                <span className="text-orange-300 font-bold">25+ Yrs Mastery</span>
              </div>
            </div>
          </div>

          {/* 6 Clean White Service Cards with Wood & Orange Badges */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComp = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white border border-[#e5dbcb] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Service Image Header with Wood / Orange Badge */}
                    <div className="relative h-44 w-full overflow-hidden bg-[#faf8f5]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Circular Wood / Deep Timber Icon Badge */}
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#451a03] text-white flex items-center justify-center shadow-lg border-2 border-orange-500">
                        <IconComp className="w-5 h-5 text-orange-400" />
                      </div>

                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/95 backdrop-blur-md text-[10px] font-mono text-neutral-900 font-bold shadow-sm border border-[#e5dbcb]">
                        {service.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2.5">
                      <h4 className="text-base font-bold text-neutral-950 font-display group-hover:text-orange-600 transition-colors leading-snug">
                        {service.title}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* "Learn More →" in Wood / Orange */}
                  <div className="p-5 pt-0 mt-2 border-t border-[#f3ede2] flex items-center justify-between">
                    <button
                      onClick={onOpenConsultation}
                      className="text-xs font-bold text-[#78350f] hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] font-mono text-neutral-400">#0{idx + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 3. ABOUT / WHY CHOOSE US (Warm Beige Background + Orange Frame) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="py-20 lg:py-28 bg-[#f7f4ee] border-t border-[#e5dbcb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left: Narrative & Black Button */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="flex items-center gap-2">
                <span className="w-6 h-1 bg-orange-500 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
                  About Our Standards
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight font-display leading-tight">
                We Build Strong Foundations for a Brighter Future
              </h2>

              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                CS Associates is a trusted Project Management Consultancy with over 25 years of engineering experience across Bengaluru. We dedicate ourselves to client safety, architectural precision, and uncompromising quality.
              </p>

              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-[#78350f] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>

            </div>

            {/* Center: Image with Orange Angular Accent Frame */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                
                {/* Vibrant Orange L-shaped / Angular Accent Frame behind the image */}
                <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 bg-orange-500 rounded-3xl -z-0 transform translate-x-2 translate-y-2 shadow-lg" />
                
                {/* Image Container with White Frame */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="/src/assets/images/residence_abbigere_1790599648176.jpg"
                    alt="Strong Foundation Construction"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                    <span className="text-orange-400 font-mono text-[10px] uppercase font-bold block">
                      Site Verified
                    </span>
                    <span className="font-bold text-sm font-display text-white">Zero Structural Compromise</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: 4 Features with Wood / Orange Icons */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#451a03] text-orange-400 flex items-center justify-center shrink-0 shadow-md border border-[#78350f]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 font-display">
                    Quality Workmanship
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Laser verified formwork plumbness, certified rebar spacing, and lab concrete cube crush testing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#451a03] text-orange-400 flex items-center justify-center shrink-0 shadow-md border border-[#78350f]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 font-display">
                    On-Time Delivery
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Milestone-linked contracts with contractor penalty clauses ensure strict scheduled handovers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#451a03] text-orange-400 flex items-center justify-center shrink-0 shadow-md border border-[#78350f]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 font-display">
                    Audited Cost Savings
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    8% to 15% direct savings through joint measurements, ledger audits, and zero contractor markup.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#451a03] text-orange-400 flex items-center justify-center shrink-0 shadow-md border border-[#78350f]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 font-display">
                    Customer Satisfaction
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Daily 6:00 PM WhatsApp photo and video DPR updates keeping you fully in control of your site.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 4. PROJECTS DESIGNED WITH PASSION AND CARE (ARCHITECTURAL METRICS)        */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <ProjectsPassionSection onOpenConsultation={onOpenConsultation} />
    </motion.div>

    {/* ========================================================================= */}
    {/* 5. "DEFINE OUR STYLE" PROJECT GALLERY CAROUSEL                             */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <StyleGallerySection onOpenConsultation={onOpenConsultation} />
    </motion.div>

    {/* ========================================================================= */}
    {/* 6. "OUR HAPPY CLIENTS!" TESTIMONIALS (Deep Black & Wood Tones) */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="py-20 lg:py-28 bg-[#120d09] text-white relative overflow-hidden border-t border-[#382012]">
        {/* Subtle patterned grid texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Row with Orange Eyebrow */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-1 bg-orange-500 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-tight">
                Our Happy Clients!
              </h2>
              <p className="text-sm text-[#f7f4ee]/80 max-w-xl font-sans">
                Hear what our clients have to say about their experience working with CS Associates Project Management Consultancy.
              </p>
            </div>

            {/* Slider Navigation Indicator Dots */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <span className="w-6 h-2 rounded-full bg-orange-500" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>

          {/* 3 Clean White Testimonial Cards with Orange Accents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientReviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white text-neutral-900 rounded-3xl p-7 sm:p-8 shadow-2xl flex flex-col justify-between border-t-4 border-orange-500"
              >
                <div className="space-y-4">
                  {/* Orange Quote Icon */}
                  <Quote className="w-9 h-9 text-orange-500 fill-orange-500" />

                  {/* 5 Golden Orange Stars */}
                  <div className="flex items-center gap-1 text-orange-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f3ede2] flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950 font-display">{rev.name}</h4>
                    <p className="text-[11px] text-[#78350f] font-mono font-semibold">{rev.role} · {rev.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </motion.div>

    {/* ========================================================================= */}
    {/* 7. CLEAN WHITE CONSULTATION CALLOUT BANNER                                 */}
    {/* ========================================================================= */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
    >
      <section className="bg-[#faf9f6] text-neutral-900 py-16 sm:py-20 border-t border-[#e8dfd1] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#e5dbcb] p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl relative overflow-hidden">
            {/* Subtle warm architectural flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Single-Point PMC Accountability</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 font-display">
                Need an Itemized PMC Scope Assessment for Your Site?
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Share your architectural drawings or schedule a direct site walk with Mr. Kiran Dikshit L. We detect structural, contractor, and ledger risks before ground breaks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 relative z-10">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>Schedule Site Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918296266389"
                className="px-5 py-3.5 rounded-xl border border-neutral-300 hover:border-orange-500 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-orange-600 transition-all flex items-center gap-2 bg-neutral-50 hover:bg-neutral-100 shadow-sm"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+91 82962 66389</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>

    </div>
  );
};
