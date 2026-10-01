import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Zap, 
  Handshake, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Star,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export interface ServiceGalleryItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  heroHeadline: string;
  description: string;
  longDescription: string;
  image: string;
  stats: {
    label: string;
    value: string;
  };
  metrics: {
    icon: 'award' | 'star' | 'shield' | 'clock';
    value: string;
    label: string;
  }[];
  keyBenefits: string[];
  scopeHighlight: string;
}

export const SERVICES_GALLERY_DATA: ServiceGalleryItem[] = [
  {
    id: 'turnkey-project-management',
    number: '01',
    title: 'Turnkey Project Management',
    shortTitle: 'Turnkey Project Management',
    tagline: 'Concept to Move-In Key Handover',
    heroHeadline: 'End-to-End Civil & Architectural Stewardship',
    description: 'We shoulder 100% single-point accountability from foundation excavation to ceremonial move-in handover with strict cost caps and guaranteed milestone schedules.',
    longDescription: 'CS Associates assumes full fiduciary and engineering custody of your estate. We eliminate contractor disputes, synchronize over 15 specialized subcontractors, and enforce strict item-rate contracts so you never suffer scope creep or hidden budget escalations.',
    image: '/src/assets/images/hero_luxury_architecture_1790599616170.jpg',
    stats: {
      value: '100%',
      label: 'Single-Point Accountability'
    },
    metrics: [
      { icon: 'award', value: '25+ Years', label: 'Civil Authority' },
      { icon: 'star', value: '200+', label: 'Delivered Sites' },
      { icon: 'shield', value: '100%', label: 'Quality Guarantee' },
      { icon: 'clock', value: '24/7', label: 'WhatsApp DPR' }
    ],
    keyBenefits: ['Single Point of Custody', 'Strict Milestone Timelines', 'Zero Hidden Cost Overruns'],
    scopeHighlight: 'Complete turnkey execution, vendor coordination & certified zero-defect handover.'
  },
  {
    id: 'project-management-consultants',
    number: '02',
    title: 'Project Management Consultants',
    shortTitle: 'Project Management Consultants',
    tagline: 'Independent Client-Side Audits & Governance',
    heroHeadline: 'Guarding Your Capital with Independent PMC Oversight',
    description: 'Acting strictly as the client’s fiduciary advocate, our civil engineers audit daily workmanship, verify running bills with actual laser measurements, and prevent over-invoicing.',
    longDescription: 'Construction contractors frequently inflate bar bending schedules, overestimate conduit runs, and claim non-existent plaster variations. Our resident engineers audit every consignment and measure every cubic meter before certifying a single rupee for payment.',
    image: '/src/assets/images/gallery_site_engineering_1790601189950.jpg',
    stats: {
      value: '8-15%',
      label: 'Direct Audited Client Savings'
    },
    metrics: [
      { icon: 'award', value: '8-15%', label: 'Audited Bill Savings' },
      { icon: 'star', value: '₹1.8 Cr+', label: 'Cumulative Client Capital Saved' },
      { icon: 'shield', value: '0-Defect', label: 'SLA Quality Audits' },
      { icon: 'clock', value: 'Daily', label: 'Photo DPR on Phone' }
    ],
    keyBenefits: ['Rigorous Bill Measurement Audits', 'Daily Concrete Cube Testing', 'Defect Rectification Before Payment'],
    scopeHighlight: 'Independent site supervision, material wastage control & running bill certification.'
  },
  {
    id: 'architecture-interior-design',
    number: '03',
    title: 'Architecture & Interior Design Consultants',
    shortTitle: 'Architecture & Interior Design',
    tagline: 'Design Realization Without Compromise',
    heroHeadline: 'Bridging Drawing Board Vision with Flawless Site Reality',
    description: 'We ensure architectural intent is executed millimeter-perfect with Italian marble dry-lays, seamless shadow gap detailing, fluted timber coordination, and acoustic isolation.',
    longDescription: 'High-end luxury estates often suffer during interior fit-outs when subcontractors cut corners on joint alignments or shadow gaps. CS Associates acts as the technical bridge, executing sophisticated fenestration, recessed profile lighting, and custom millwork with zero aesthetic compromises.',
    image: '/src/assets/images/gallery_luxury_interior_1790601175826.jpg',
    stats: {
      value: '0.0 mm',
      label: 'Shadow Gap Alignment Tolerance'
    },
    metrics: [
      { icon: 'award', value: 'Bespoke', label: 'Material Dry-Lays' },
      { icon: 'star', value: '50+ Villas', label: 'Luxury Finishes' },
      { icon: 'shield', value: '100%', label: 'Design Fidelity' },
      { icon: 'clock', value: 'Precision', label: 'Laser Mitre Joints' }
    ],
    keyBenefits: ['Warehouse Dry-Lay Italian Marble', 'Acoustic Soundproofing Integrity', 'Seamless MEP-Interior Coordination'],
    scopeHighlight: 'Flawless execution of custom veneers, Statuario marble, acoustic ceilings & fenestration.'
  },
  {
    id: 'vaastu-consultants',
    number: '04',
    title: 'Vaastu Consultants',
    shortTitle: 'Vaastu Consultants',
    tagline: 'Harmonious Energy & Scientific Alignment',
    heroHeadline: 'Harmonizing Vedic Spatial Energy with Modern Architecture',
    description: 'Integrating ancient Vaastu principles harmoniously with contemporary luxury architecture—orienting natural sunlight, airflow, and directional zoning without awkward structural compromises.',
    longDescription: 'True Vaastu is an architectural science of solar paths, magnetic fields, and airflow gradients. We work directly with your design architects from the concept stage to ensure sacred directional placements (Brahmasthan, Ishanya, Nairutya) blend gracefully with cutting-edge minimalist architecture.',
    image: '/src/assets/images/residence_abbigere_1790599648176.jpg',
    stats: {
      value: '100%',
      label: 'Scientific Vedic Harmony'
    },
    metrics: [
      { icon: 'award', value: 'Pancha', label: 'Tattva Balance' },
      { icon: 'star', value: 'Vedic', label: 'Grid Orientation' },
      { icon: 'shield', value: 'Zero', label: 'Structural Awkwardness' },
      { icon: 'clock', value: 'Harmonic', label: 'Sunlight & Energy' }
    ],
    keyBenefits: ['Sacred Directional Zoning', 'Optimal Solar & Cross-Ventilation', 'Remedial Planning for Ongoing Sites'],
    scopeHighlight: 'Integrated spatial zoning for main entrances, master retreats, water bodies & spiritual hubs.'
  },
  {
    id: 'electrical-consultants',
    number: '05',
    title: 'Electrical Consultants',
    shortTitle: 'Electrical & MEP Consultants',
    tagline: 'High-Load Infrastructure & Intelligent Automation',
    heroHeadline: 'Clash-Free High-Load Distribution & Automation Engineering',
    description: 'Comprehensive engineering oversight for electrical loads, high-efficiency plumbing, centralized VRV/VRF air conditioning, medical gas piping, and smart automation systems.',
    longDescription: 'Modern luxury villas and commercial healthcare facilities demand complex MEP backbones. We verify electrical breaker cascades, solar net-metering synchronization, DG generator auto-transfer switches, and soundproof plumbing stacks before any walls are closed up.',
    image: '/src/assets/images/healthcare_commercial_1790599676109.jpg',
    stats: {
      value: 'Clash-Free',
      label: '3D BIM Service Routing'
    },
    metrics: [
      { icon: 'award', value: 'HT / LT', label: 'Substation Design' },
      { icon: 'star', value: '100% DG', label: 'Auto-Synchronized' },
      { icon: 'shield', value: 'NABH / CE', label: 'Compliance Standards' },
      { icon: 'clock', value: 'Smart', label: 'KNX / IoT Automation' }
    ],
    keyBenefits: ['Concealed Low-Voltage Segregation', 'Solar & Hybrid Backup Architecture', 'Medical Gas & Cleanroom MEP'],
    scopeHighlight: 'Substation load engineering, centralized HVAC, acoustic plumbing & smart home integration.'
  },
  {
    id: 'facade-fenestration',
    number: '06',
    title: 'Facade & Fenestration',
    shortTitle: 'Facade & Fenestration',
    tagline: 'Acoustic & Thermal High-Performance Envelopes',
    heroHeadline: 'Weather-Tite Glazing & Monumental Structural Facades',
    description: 'Specialized management of architectural glazing, slimline minimal aluminum systems, cantilever glass curtain walls, and weatherproofing to withstand extreme monsoon and heat.',
    longDescription: 'Large spans of architectural glass are the hallmark of contemporary luxury, but require meticulous engineering to avoid deflection, heat gain, or monsoon leaks. We oversee structural silicone bonding, thermal-break slimline profiles, and wind-load deflection testing.',
    image: '/src/assets/images/gallery_facade_fenestration_1790601203004.jpg',
    stats: {
      value: '42 dB',
      label: 'Acoustic Sound Transmission Class'
    },
    metrics: [
      { icon: 'award', value: 'DGU / Low-E', label: 'Thermal Envelope' },
      { icon: 'star', value: '18ft Span', label: 'Floating Cantilevers' },
      { icon: 'shield', value: 'Zero-Leak', label: 'Wind-Pressure Tested' },
      { icon: 'clock', value: 'Slimline', label: 'Minimalist Profiles' }
    ],
    keyBenefits: ['Double-Glazed Acoustic Protection', 'Slimline Flush Thresholds', '100% Water-Tite Monsoonal Sealing'],
    scopeHighlight: 'Structural silicone glazing, motorized louvers, slimline glass sliders & thermal envelope.'
  },
  {
    id: 'joint-development',
    number: '07',
    title: 'Joint Development',
    shortTitle: 'Joint Development Advisory',
    tagline: 'Landowner Legal, Technical & Equity Protection',
    heroHeadline: 'Safeguarding Landowner Equity in Joint Development',
    description: 'Protecting landowner equity in joint development agreements (JDA). We audit developer specifications, track milestone handovers, and ensure you receive your exact contractual share.',
    longDescription: 'In high-stakes joint development agreements, landowners often find themselves at a disadvantage against large developers who degrade material specifications or delay possession handovers. CS Associates acts as your vigilant PMC, ensuring every square foot meets promised luxury standards.',
    image: '/src/assets/images/gallery_commercial_complex_1790601212975.jpg',
    stats: {
      value: '100%',
      label: 'Landowner Contractual Protection'
    },
    metrics: [
      { icon: 'award', value: 'JDA Audit', label: 'Technical Spec Vetting' },
      { icon: 'star', value: 'Milestone', label: 'Delivery Tracking' },
      { icon: 'shield', value: 'Equity', label: 'Asset Share Allocation' },
      { icon: 'clock', value: 'Legal / PMC', label: 'Dispute Prevention' }
    ],
    keyBenefits: ['Developer Material Specification Audits', 'Strict Delay Penalty Enforcement', 'Independent Handover Quality Checks'],
    scopeHighlight: 'Comprehensive JDA advisory, technical drawing review & landowner asset handover governance.'
  }
];

interface ServicesGallerySectionProps {
  onOpenConsultation: () => void;
}

export const ServicesGallerySection: React.FC<ServicesGallerySectionProps> = ({
  onOpenConsultation
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const activeItem = SERVICES_GALLERY_DATA[activeIndex] || SERVICES_GALLERY_DATA[0];

  // Sync active item when the user scrolls the horizontal cards container
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    // Each card is ~360px + 24px gap = 384px approx
    const cardWidth = container.firstElementChild 
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24 
      : 360;

    const newIndex = Math.min(
      SERVICES_GALLERY_DATA.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);

  // Programmatically scroll to specific index when clicked or navigated
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setActiveIndex(index);
    isProgrammaticScroll.current = true;

    const card = container.children[index] as HTMLElement;
    if (card) {
      const scrollPos = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: 'smooth'
      });
    }

    // Reset flag after animation completes
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 550);
  }, []);

  const handlePrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : SERVICES_GALLERY_DATA.length - 1;
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = activeIndex < SERVICES_GALLERY_DATA.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(next);
  };

  const renderMetricIcon = (icon: 'award' | 'star' | 'shield' | 'clock') => {
    switch (icon) {
      case 'award':
        return <Award className="w-5 h-5 text-neutral-800" />;
      case 'star':
        return <Star className="w-5 h-5 text-neutral-800" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-neutral-800" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-neutral-800" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-neutral-800" />;
    }
  };

  return (
    <section 
      id="services-gallery" 
      className="w-full bg-[#fbf9f5] text-neutral-900 py-16 sm:py-24 border-y border-neutral-200/90 relative overflow-hidden font-sans select-none"
    >
      {/* Background Subtle Architect Grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] [background-size:28px_28px]" 
      />

      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-14 sm:space-y-20">
        
        {/* ======================================================== */}
        {/* TOP SHOWCASE SECTION (Changes dynamically with scroll)   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Top Left: Text Narrative & 4 Metric Badges (ENTRANCE FROM LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8"
          >
            
            {/* Header Eyebrow with Line Accent */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-widest uppercase font-mono text-neutral-500">
                OUR SERVICES
              </span>
              <span className="w-12 h-[1.5px] bg-neutral-400" />
              <span className="text-xs font-mono font-semibold text-orange-600 bg-orange-100/70 px-2 py-0.5 rounded-md">
                DISCIPLINE {activeItem.number} / 07
              </span>
            </div>

            {/* Dynamic Headline & Narrative */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id + '-text'}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
                    {activeItem.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-orange-700 uppercase font-mono">
                    {activeItem.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans pt-1">
                    {activeItem.longDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Metric Badges Row (as seen in reference design) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-neutral-200/90">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id + '-metrics'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="contents"
                >
                  {activeItem.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col items-start space-y-1.5">
                      <div className="w-9 h-9 rounded-xl bg-neutral-200/70 flex items-center justify-center text-neutral-800 shadow-sm border border-neutral-300/60">
                        {renderMetricIcon(m.icon)}
                      </div>
                      <div className="text-base sm:text-lg font-black text-neutral-950 tracking-tight font-display">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-medium text-neutral-500 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Top Right: Large Featured Showcase Image (ENTRANCE FROM RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border-2 border-neutral-200 bg-neutral-900 group">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03]"
                />
              </AnimatePresence>

              {/* Elegant Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Status Pill on Top Image */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>ACTIVE SHOWCASE // {activeItem.number}</span>
              </div>

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/15 text-white">
                <div>
                  <div className="text-xs uppercase tracking-wider text-orange-500 font-mono font-semibold">
                    Core PMC Highlight
                  </div>
                  <div className="text-sm sm:text-base font-bold text-neutral-100 font-sans mt-0.5 line-clamp-1">
                    {activeItem.stats.label}: <span className="text-orange-400 font-mono">{activeItem.stats.value}</span>
                  </div>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-400 hover:to-orange-500 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <span>Consult</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM SECTION: Header & Horizontal Scrollable Cards    */}
        {/* ======================================================== */}
        <div className="space-y-6 sm:space-y-8 pt-6 border-t border-neutral-200">
          
          {/* Header Row: Title & Action Button (ENTRANCE FROM TOP) */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase font-mono text-neutral-500 mb-1.5">
                <span>OUR SOLUTIONS</span>
                <span className="w-8 h-[1px] bg-neutral-400" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
                Architectural & Engineering Disciplines
              </h3>
            </div>

            {/* Right Side: View All Services Pill + Arrow Nav Buttons */}
            <div className="flex items-center gap-3">
              {/* Prev / Next buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 flex items-center justify-center transition-all shadow-sm active:scale-90"
                  aria-label="Previous Service"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 flex items-center justify-center transition-all shadow-sm active:scale-90"
                  aria-label="Next Service"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* View All Button matching reference dark pill */}
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-full bg-[#1e231f] hover:bg-neutral-900 text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>View all solutions</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </motion.div>

          {/* Cards Horizontal Scrollable Container (ENTRANCE FROM BOTTOM) */}
          {/* As the user scrolls through these cards, handleScroll dynamically updates activeIndex and the top image! */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
            {SERVICES_GALLERY_DATA.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={service.id}
                  onClick={() => scrollToIndex(index)}
                  className={`snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[370px] rounded-3xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? 'bg-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12)] border-2 border-orange-500/80 ring-4 ring-orange-500/15 scale-[1.01]' 
                      : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md border border-neutral-200/90 hover:border-neutral-300 opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Card Image Banner */}
                  <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-900 mb-3.5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isActive ? 'scale-105' : 'hover:scale-105'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Discipline Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-neutral-950/70 backdrop-blur-md text-[11px] font-mono font-bold text-orange-400 border border-white/10">
                      {service.number}
                    </div>

                    {isActive && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-orange-500 text-neutral-950 text-[10px] font-mono font-black uppercase tracking-wider shadow">
                        VIEWING
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 px-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-neutral-950 font-display leading-tight line-clamp-1">
                        {service.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold">
                      <span className={`flex items-center gap-1.5 transition-colors ${
                        isActive ? 'text-orange-700 font-bold' : 'text-neutral-700 group-hover:text-neutral-950'
                      }`}>
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                      <span className="text-[11px] font-mono text-neutral-400">
                        {service.stats.value}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex sm:hidden justify-center items-center gap-1.5 pt-2">
            {SERVICES_GALLERY_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeIndex 
                    ? 'w-6 bg-orange-500' 
                    : 'w-1.5 bg-neutral-300'
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
