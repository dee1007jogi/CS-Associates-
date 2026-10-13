import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Palette,
  Sun, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Sparkles,
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Briefcase,
  Compass,
  HardHat,
  Droplets,
  Wrench,
  Ruler,
  Download,
  FileCheck2,
  PhoneCall,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface KeyholeInteriorSectionProps {
  onOpenConsultation: () => void;
}

interface SuggestionCardItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  description: string;
  accents: string[];
  actionLabel: string;
  image: string;
  icon: React.ElementType;
  targetUrl: string;
}

interface ConstructionPillarItem {
  id: string;
  pillar: string;
  focusArea: string;
  keyStandard: string;
  recommendationTitle: string;
  recommendationText: string;
  specDetails: string[];
  icon: React.ElementType;
  image: string;
  targetUrl: string;
}

const INTERIOR_SUGGESTIONS: SuggestionCardItem[] = [
  {
    id: 'living-lounge',
    category: 'Living & Lounge Spaces',
    tag: 'Aesthetic & Social',
    title: 'Fluid Living & Layered Textures',
    description: 'Open-concept layouts grounded by tactile textiles, sculptural lighting, and conversational seating arrangements that prioritize natural light.',
    accents: ['Warm neutrals', 'Fluted oak panels', 'Matte architectural hardware'],
    actionLabel: 'Explore Living Concepts',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    icon: Sofa,
    targetUrl: '/design-studio?discipline=interior&category=Living%20%26%20Social#suggestions-catalogue',
  },
  {
    id: 'modular-kitchen',
    category: 'Modular Kitchens & Dining',
    tag: 'Function & Precision',
    title: 'Ergonomic Flow & Concealed Utility',
    description: 'Seamless cabinetry with integrated handles, durable quartz countertops, and dedicated work triangles designed for clutter-free entertaining.',
    accents: ['Soft-close Blum hardware', 'Anti-fingerprint acrylic', 'Hidden pantry zones'],
    actionLabel: 'View Kitchen Layouts',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    icon: UtensilsCrossed,
    targetUrl: '/design-studio?discipline=interior&category=Kitchens%20%26%20Dining#suggestions-catalogue',
  },
  {
    id: 'bedrooms-suites',
    category: 'Master & Guest Bedrooms',
    tag: 'Rest & Retreat',
    title: 'Calming Proportions & Acoustic Comfort',
    description: 'Quiet luxury focused on ambient, indirect cove lighting, built-in floor-to-ceiling storage, and warm earthy tones to induce deep relaxation.',
    accents: ['Upholstered headboards', 'Warm 2700K lighting', 'Concealed wardrobe organizers'],
    actionLabel: 'Discover Bedroom Themes',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    icon: BedDouble,
    targetUrl: '/design-studio?discipline=interior&category=Bedrooms%20%26%20Suites#suggestions-catalogue',
  },
  {
    id: 'compact-offices',
    category: 'Compact Spaces & Home Offices',
    tag: 'Smart Space Planning',
    title: 'Multi-Functional & Clutter-Free Utility',
    description: 'Bespoke study nooks and storage niches engineered with concealed cable management, ergonomic desk heights, and floating shelves.',
    accents: ['Floating credenzas', 'Task track lighting', 'Acoustic wall slats'],
    actionLabel: 'See Smart Solutions',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
    icon: Briefcase,
    targetUrl: '/design-studio?discipline=interior&category=Home%20Offices%20%26%20Compact#suggestions-catalogue',
  },
];

const CONSTRUCTION_PILLARS: ConstructionPillarItem[] = [
  {
    id: 'soil-foundation',
    pillar: '1. Soil & Foundation',
    focusArea: 'Load-Bearing Integrity',
    keyStandard: 'Conduct core soil testing before footing design. Always apply 3-stage anti-termite treatment at the plinth level.',
    recommendationTitle: 'Precision Plinth & Damp Proofing (DPC)',
    recommendationText: 'Lay a continuous Damp Proof Course (DPC) at the plinth level to block capillary groundwater rise into internal walls.',
    specDetails: ['IS 1904/2911 Soil Standards', '3-Stage Imidacloprid Barrier', 'Cast-in-situ reinforced plinth beam'],
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '/design-studio?discipline=construction&category=Foundation%20%26%20Soil#suggestions-catalogue',
  },
  {
    id: 'moisture-waterproofing',
    pillar: '2. Moisture & Waterproofing',
    focusArea: 'Leakage Prevention & Durability',
    keyStandard: 'Install multi-layer elastomeric coating across all sunken slabs, wet areas, and parapet joints before screeding.',
    recommendationTitle: 'Thermal & Acoustic Envelope',
    recommendationText: 'In warm climates, use Autoclaved Aerated Concrete (AAC) blocks for exterior walls or apply thermal reflective roof coatings to drop ambient indoor cooling loads by 3–5°C.',
    specDetails: ['Triple-Coat Polyurethane / Bitumen', '72-Hour Standing Water Flood Test', 'Polymer-modified corner fillets'],
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '/design-studio?discipline=construction&category=Waterproofing%20%26%20Moisture#suggestions-catalogue',
  },
  {
    id: 'mep-coordination',
    pillar: '3. MEP Coordination',
    focusArea: 'Electrical & Plumbing Conduits',
    keyStandard: 'Map conduit runs, switchboards, and AC drain lines before brickwork plastering to eliminate wall chipping rework.',
    recommendationTitle: 'Concealed Plumbing Pressure Testing',
    recommendationText: 'Pressure-test all CPVC/PEX concealed plumbing lines at 8–10 bar for at least 24 hours prior to closing conduit chases and tiling.',
    specDetails: ['Zero-break structural core cutting', 'Clash-free HVAC & drainage paths', 'RCCB & surge protection grounding'],
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '/design-studio?discipline=construction&category=MEP%20%26%20Concealed%20Conduits#suggestions-catalogue',
  },
  {
    id: 'plaster-surface-curing',
    pillar: '4. Plaster & Surface Curing',
    focusArea: 'Structural Finishing & Precision',
    keyStandard: 'Maintain strict 14-day wet curing for slabs/masonry, and enforce 90-degree wall trueness for modular kitchen fitment.',
    recommendationTitle: 'True Plastering for Modular Furniture',
    recommendationText: 'Modular wardrobes and cabinetry require exact 90° right angles (line-dori check) on all corners; standard manual plastering often leaves tapers that cause unsightly gaps.',
    specDetails: ['Line-Dori 90° right-angle audit', 'Chicken-mesh at RCC joints', '14-Day Hessian cloth curing regimen'],
    icon: Ruler,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '/design-studio?discipline=construction&category=Plaster%2C%20Masonry%20%26%20Finish#suggestions-catalogue',
  },
];

const CIVIL_CHECKLIST_ITEMS = [
  'Geotechnical soil core test verified against column loads',
  '3-Stage anti-termite chemical barrier at plinth trench',
  'Continuous Damp Proof Course (DPC) 50mm bitumen barrier',
  'M25 grade concrete mix design batching audit',
  '72-Hour flood test on all sunken toilets & utility slabs',
  'Elastomeric waterproofing on parapet joints & terrace deck',
  'Concealed plumbing hydro-tested at 8-10 bar for 24 hours',
  'Pre-plaster conduit mapping for zero subsequent wall chipping',
  'Chicken-mesh installation along all RCC-to-brick masonry joints',
  'Line-Dori 90-degree corner trueness check for modular cabinetry',
  '14-Day wet curing logbook maintained with daily sign-off',
  'Level-check of finished flooring thresholds with spirit level',
];

const ROTATING_THEMES = [
  {
    title: 'INTERIOR',
    badge: 'Curated For You • Personal Guide',
    sideTag: 'INTERIOR • 2026',
    description: (
      <>
        We suggest <span className="text-orange-500 font-semibold">natural daylight alignment</span>, anchoring your living space with <span className="text-orange-400 font-semibold">calibrated French oak herringbone</span>, and curating warm tactile fabrics that make modern minimalist spaces feel deeply serene and inviting.
      </>
    ),
  },
  {
    title: 'CONSTRUCTION',
    badge: 'Civil & Structural • Quality Guide',
    sideTag: 'CONSTRUCTION • 2026',
    description: (
      <>
        We ensure <span className="text-orange-500 font-semibold">certified M25 grade concrete</span>, zero capillary dampness via <span className="text-orange-400 font-semibold">crystalline waterproofing</span>, and 3D clash-free MEP conduits that safeguard your structure for 50+ years.
      </>
    ),
  },
];

export const KeyholeInteriorSection: React.FC<KeyholeInteriorSectionProps> = ({ 
  onOpenConsultation 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated looping title state (INTERIOR <-> CONSTRUCTION)
  const [rotatingThemeIndex, setRotatingThemeIndex] = useState(0);

  useEffect(() => {
    const loopTimer = setInterval(() => {
      setRotatingThemeIndex((prev) => (prev + 1) % ROTATING_THEMES.length);
    }, 3200);
    return () => clearInterval(loopTimer);
  }, []);

  const currentTheme = ROTATING_THEMES[rotatingThemeIndex];

  // SVG and DOM refs for 3D Keyhole
  const maskPathRef = useRef<SVGPathElement>(null);
  const rimTunnelDeepRef = useRef<SVGPathElement>(null);
  const rimExtrusionWallRef = useRef<SVGPathElement>(null);
  const rimContactShadowRef = useRef<SVGPathElement>(null);
  const rimBrassOuterRef = useRef<SVGPathElement>(null);
  const rimBrassCoreRef = useRef<SVGPathElement>(null);
  const rimSpecularNeedleRef = useRef<SVGPathElement>(null);
  const goldSealRef = useRef<HTMLDivElement>(null);

  const keyholeWrapperRef = useRef<HTMLDivElement>(null);
  const roomContainerRef = useRef<HTMLDivElement>(null);
  const roomTypographyRef = useRef<HTMLDivElement>(null);
  const outerTopLeftRef = useRef<HTMLDivElement>(null);
  const outerTopRightRef = useRef<HTMLDivElement>(null);
  const outerMiddleRightRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const promptLabelRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  // Guidance Suite Tab State ('interior' | 'construction')
  const [activeTab, setActiveTab] = useState<'interior' | 'construction'>('interior');

  // Sticky Horizontal Scroll Refs & Calculation
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const containerTrackRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Recalculate horizontal scroll travel distance on load, tab switch, & resize
  useEffect(() => {
    const updateDistance = () => {
      if (cardsTrackRef.current && containerTrackRef.current) {
        const trackWidth = cardsTrackRef.current.scrollWidth;
        const containerWidth = containerTrackRef.current.clientWidth;
        const distance = Math.max(0, trackWidth - containerWidth);
        setMaxScrollDistance(distance);
      }
    };
    updateDistance();
    const timer = setTimeout(updateDistance, 150);
    window.addEventListener('resize', updateDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDistance);
    };
  }, [activeTab]);

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ['start start', 'end end']
  });

  const translateX = useTransform(
    horizontalProgress,
    [0, 1],
    [0, -maxScrollDistance]
  );

  useMotionValueEvent(horizontalProgress, 'change', (latest) => {
    setCurrentSlideIndex(latest >= 0.5 ? 1 : 0);
  });

  const handleSlideJump = (targetSlide: number) => {
    if (!horizontalScrollRef.current) return;
    const container = horizontalScrollRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    if (scrollableDistance > 0) {
      const targetScroll = containerTop + (targetSlide === 1 ? 0.95 : 0.05) * scrollableDistance;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('General Consultation');
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Checklist modal state
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    let animId: number;
    let currentZoom = 0;
    let targetZoom = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const ZOOM_COMPLETION_THRESHOLD = 0.72;

    // Calculate & Update Keyhole Geometry
    const updateKeyholeGeometry = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scaled comfortably to give generous bottom padding above prompt text
      const khHeight = Math.min(h * 0.80, 750);
      const khTop = Math.max(h * 0.05, 30);
      const khBottom = khTop + khHeight;
      const cx = w / 2;

      const topRadius = Math.min(khHeight * 0.28, Math.min(w * 0.22, 220));
      const waistWidth = topRadius * 0.72;
      const bottomFlareWidth = topRadius * 1.08;

      const topCircleCenterY = khTop + topRadius;
      const waistY = khTop + khHeight * 0.50;
      const bottomCurveRadius = bottomFlareWidth * 0.50;

      const pathD = `
        M ${cx}, ${khTop}
        A ${topRadius}, ${topRadius} 0 0, 1 ${cx + topRadius}, ${topCircleCenterY}
        C ${cx + topRadius}, ${waistY - 30} ${cx + waistWidth}, ${waistY - 15} ${cx + waistWidth}, ${waistY}
        C ${cx + waistWidth}, ${waistY + 25} ${cx + bottomFlareWidth}, ${khBottom - bottomCurveRadius} ${cx + bottomFlareWidth}, ${khBottom - bottomCurveRadius}
        C ${cx + bottomFlareWidth}, ${khBottom} ${cx - bottomFlareWidth}, ${khBottom} ${cx - bottomFlareWidth}, ${khBottom - bottomCurveRadius}
        C ${cx - bottomFlareWidth}, ${khBottom - bottomCurveRadius} ${cx - waistWidth}, ${waistY + 25} ${cx - waistWidth}, ${waistY}
        C ${cx - waistWidth}, ${waistY - 15} ${cx - topRadius}, ${waistY - 30} ${cx - topRadius}, ${topCircleCenterY}
        A ${topRadius}, ${topRadius} 0 0, 1 ${cx}, ${khTop}
        Z
      `;

      if (maskPathRef.current) maskPathRef.current.setAttribute('d', pathD);
      if (rimTunnelDeepRef.current) rimTunnelDeepRef.current.setAttribute('d', pathD);
      if (rimExtrusionWallRef.current) rimExtrusionWallRef.current.setAttribute('d', pathD);
      if (rimContactShadowRef.current) rimContactShadowRef.current.setAttribute('d', pathD);
      if (rimBrassOuterRef.current) rimBrassOuterRef.current.setAttribute('d', pathD);
      if (rimBrassCoreRef.current) rimBrassCoreRef.current.setAttribute('d', pathD);
      if (rimSpecularNeedleRef.current) rimSpecularNeedleRef.current.setAttribute('d', pathD);

      if (goldSealRef.current) {
        const currentWaistX = cx - waistWidth - 8;
        const currentWaistY = waistY + 16;
        goldSealRef.current.style.left = `${currentWaistX}px`;
        goldSealRef.current.style.top = `${currentWaistY}px`;
      }
    };

    updateKeyholeGeometry();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spacerHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (spacerHeight <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, -rect.top / spacerHeight));
      targetZoom = Math.min(1, rawProgress / ZOOM_COMPLETION_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateKeyholeGeometry);

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      currentZoom += (targetZoom - currentZoom) * 0.12;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const pct = Math.round(currentZoom * 100);
      if (progressLineRef.current) {
        progressLineRef.current.style.width = `${pct}%`;
      }

      if (keyholeWrapperRef.current) {
        const scale = 1 + Math.pow(currentZoom, 2.2) * 32.0;
        keyholeWrapperRef.current.style.transform = `scale(${scale.toFixed(3)})`;

        if (currentZoom > 0.48) {
          const fade = Math.max(0, 1 - (currentZoom - 0.48) / 0.28);
          keyholeWrapperRef.current.style.opacity = fade.toFixed(3);
        } else {
          keyholeWrapperRef.current.style.opacity = '1';
        }
      }

      if (roomContainerRef.current) {
        const roomScale = 1.0 + currentZoom * 0.20;
        const parallaxX = mouseX * (1 - currentZoom * 0.8) * 12;
        const parallaxY = mouseY * (1 - currentZoom * 0.8) * 10;
        roomContainerRef.current.style.transform = `translate3d(${parallaxX.toFixed(2)}px, ${parallaxY.toFixed(2)}px, 0) scale(${roomScale.toFixed(3)})`;
      }

      const outerFade = Math.min(1, currentZoom / 0.22);
      const outerOpacity = (1 - outerFade).toFixed(3);
      const outerShiftX = outerFade * -40;
      const outerShiftRightX = outerFade * 40;

      if (outerTopLeftRef.current) {
        outerTopLeftRef.current.style.opacity = outerOpacity;
        outerTopLeftRef.current.style.transform = `translateX(${outerShiftX.toFixed(1)}px)`;
      }

      if (outerTopRightRef.current) {
        outerTopRightRef.current.style.opacity = outerOpacity;
        outerTopRightRef.current.style.transform = `translateX(${outerShiftRightX.toFixed(1)}px)`;
      }

      if (outerMiddleRightRef.current) {
        outerMiddleRightRef.current.style.opacity = outerOpacity;
        outerMiddleRightRef.current.style.transform = `translateY(-50%) translateX(${outerShiftRightX.toFixed(1)}px)`;
      }

      if (roomTypographyRef.current) {
        const textFade = Math.min(1, currentZoom / 0.35);
        roomTypographyRef.current.style.opacity = (1 - textFade).toFixed(3);
        roomTypographyRef.current.style.transform = `scale(${(1 + textFade * 0.08).toFixed(3)})`;
      }

      if (goldSealRef.current) {
        const sealFade = Math.min(1, currentZoom / 0.25);
        const sealScale = Math.max(0, 1 - sealFade);
        goldSealRef.current.style.transform = `translate(-50%, -50%) scale(${sealScale.toFixed(3)})`;
        goldSealRef.current.style.opacity = (1 - sealFade).toFixed(3);
        goldSealRef.current.style.pointerEvents = sealScale > 0.15 ? 'auto' : 'none';
      }

      if (scrollPromptRef.current && promptLabelRef.current) {
        if (currentZoom >= 0.95) {
          promptLabelRef.current.textContent = "Scroll down for guidance";
          scrollPromptRef.current.style.opacity = "0.85";
        } else if (currentZoom > 0.12) {
          scrollPromptRef.current.style.opacity = "0";
        } else {
          promptLabelRef.current.textContent = "Scroll to peek inside";
          scrollPromptRef.current.style.opacity = "0.75";
        }
      }
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateKeyholeGeometry);
    };
  }, []);

  const handleSealClick = () => {
    if (!containerRef.current) return;
    const targetScroll = containerRef.current.offsetTop + (containerRef.current.offsetHeight - window.innerHeight) * 0.75;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const openInquiryFor = (topicTitle: string) => {
    setModalTopic(topicTitle);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setTimeout(() => setModalSubmitted(false), 400);
    }, 2200);
  };

  return (
    <div id="interior-keyhole-showcase" className="relative w-full bg-[#0b0908] text-white">
      
      {/* ── 1. SCROLL-DRIVEN KEYHOLE APERTURE VIEWER (Sticky 100vh inside 260vh spacer) ── */}
      <div ref={containerRef} className="relative w-full h-[260vh] bg-[#0b0908]">
        
        {/* Sticky Full-Viewport Container */}
        <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#0b0908] select-none z-10">

          {/* ROOM INTERIOR BACKGROUND LAYER */}
          <div 
            ref={roomContainerRef}
            className="absolute inset-0 w-full h-full z-10 flex items-center justify-center overflow-hidden gpu-layer origin-center pointer-events-none"
          >
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2560&q=90" 
                alt="Nordic Living Room Interior"
                className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-950/40 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,250,240,0.12)_0%,rgba(15,12,10,0.4)_100%)] pointer-events-none" />
            </div>

            {/* Room Typography Overlay */}
            <div 
              ref={roomTypographyRef}
              className="absolute inset-0 z-10 flex flex-col items-center justify-between py-12 sm:py-16 px-6 text-center select-none pointer-events-none transition-opacity duration-300 max-w-xl mx-auto"
            >
              <div className="pt-8 sm:pt-10 flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-orange-600 font-sans font-semibold mb-1.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                  BESPOKE INTERIORS &bull; PMC
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2a221b] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  CS Associates
                </h1>
                <span className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-stone-600 font-light mt-1.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                  REAL ESTATE &bull; ARCHITECTURE &bull; INTERIORS
                </span>
              </div>

              <div className="pb-10 sm:pb-14 flex flex-col items-center">
                <div className="flex items-center justify-center gap-6 text-[10px] sm:text-[11px] font-mono text-stone-700 mb-1.5">
                  <span className="font-light text-stone-500">20</span>
                  <span className="tracking-[0.24em] uppercase font-sans text-stone-900 font-semibold text-[9px] sm:text-[10px] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                    DEVELOPMENTS &bull; PMC &bull; TURNKEY
                  </span>
                  <span className="font-light text-stone-500">26</span>
                </div>
                <p className="text-xs sm:text-sm italic font-serif text-stone-800 tracking-wider drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                  Bengaluru &bull; Karnataka &bull; India
                </p>
              </div>
            </div>
          </div>

          {/* PHOTOREALISTIC KEYHOLE APERTURE SVG WITH 3D GOLDEN BORDER LINE */}
          <div 
            ref={keyholeWrapperRef}
            className="absolute inset-0 w-full h-full z-20 pointer-events-none flex items-center justify-center gpu-layer origin-center"
          >
            <svg id="keyhole-svg" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="keyhole-cutout-mask">
                  <rect width="100%" height="100%" fill="#ffffff" />
                  <path ref={maskPathRef} d="" fill="#000000" />
                </mask>

                {/* 1. Deep 3D Chamber Extrusion Shading */}
                <linearGradient id="inner-wall-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#050403" stopOpacity="0.99" />
                  <stop offset="28%" stopColor="#140e09" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#342211" stopOpacity="0.80" />
                  <stop offset="80%" stopColor="#120c07" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#020202" stopOpacity="0.99" />
                </linearGradient>

                {/* 2. Wide Antique Gold/Brass Cylindrical Surface Gradient */}
                <linearGradient id="brass-outer-ridge" x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor="#7a551e" />
                  <stop offset="15%" stopColor="#c99e46" />
                  <stop offset="32%" stopColor="#fedc8c" />
                  <stop offset="48%" stopColor="#8a6122" />
                  <stop offset="68%" stopColor="#eec772" />
                  <stop offset="85%" stopColor="#644314" />
                  <stop offset="100%" stopColor="#2a1a06" />
                </linearGradient>

                {/* 3. Raised Highlight Core (Brilliant Gold & Specular White) */}
                <linearGradient id="brass-luminous-core" x1="0%" y1="0%" x2="100%" y2="90%">
                  <stop offset="0%" stopColor="#ffecb8" />
                  <stop offset="25%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f8d684" />
                  <stop offset="75%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e3b455" />
                </linearGradient>

                {/* 4. Radial Vignette */}
                <radialGradient id="door-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="40%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
                </radialGradient>

                <filter id="deep-inner-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id="soft-inner-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" />
                </filter>
              </defs>

              <rect width="100%" height="100%" mask="url(#keyhole-cutout-mask)" fill="#0b0908" className="door-finish" />
              <rect width="100%" height="100%" mask="url(#keyhole-cutout-mask)" fill="url(#door-glow)" opacity="0.94" />

              {/* Multi-Layer 3D Depth Rim Elements - GOLDEN BORDER LINE */}
              <path ref={rimTunnelDeepRef} d="" fill="none" stroke="#000000" strokeWidth="36" opacity="0.88" filter="url(#deep-inner-blur)" />
              <path ref={rimExtrusionWallRef} d="" fill="none" stroke="url(#inner-wall-gradient)" strokeWidth="20" opacity="0.95" />
              <path ref={rimContactShadowRef} d="" fill="none" stroke="#060402" strokeWidth="13" opacity="0.9" filter="url(#soft-inner-blur)" />
              <path ref={rimBrassOuterRef} d="" fill="none" stroke="url(#brass-outer-ridge)" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" />
              <path ref={rimBrassCoreRef} d="" fill="none" stroke="url(#brass-luminous-core)" strokeWidth="3.8" opacity="0.95" />
              <path ref={rimSpecularNeedleRef} d="" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
            </svg>
          </div>

          {/* Monogram Wax Seal Stamp (CS Monogram with Metallic Gold Tone) */}
          <div 
            ref={goldSealRef}
            onClick={handleSealClick}
            className="absolute z-30 wax-seal w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95 shadow-2xl gpu-layer -translate-x-1/2 -translate-y-1/2"
            title="Click to peek inside"
          >
            <div className="border border-amber-950/45 rounded-full w-[84%] h-[84%] flex flex-col items-center justify-center text-[#37250c] select-none shadow-inner">
              <div className="flex items-center justify-center leading-none">
                <span className="font-serif font-bold text-base sm:text-xl tracking-wider text-[#37250c]">C</span>
                <span className="font-serif font-bold text-sm sm:text-lg -ml-0.5 text-amber-950/80">S</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[7px] font-mono tracking-widest text-[#4e350f] uppercase font-bold">2026</span>
              </div>
            </div>
          </div>

          {/* Top-Left Heading */}
          <div 
            ref={outerTopLeftRef}
            className="absolute top-9 sm:top-12 lg:top-14 left-5 sm:left-8 lg:left-10 z-30 max-w-[calc(50vw-80px)] sm:max-w-[calc(50vw-180px)] lg:max-w-[calc(50vw-200px)] pointer-events-none transition-all duration-300"
          >
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTheme.title}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] uppercase tracking-[0.25em] text-orange-300 font-mono font-semibold"
                >
                  {currentTheme.badge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Animated Title Loop: INTERIOR <-> CONSTRUCTION */}
            <div className="relative overflow-hidden py-1 min-h-[1.18em] flex items-center">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentTheme.title}
                  initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-black font-sans tracking-tighter text-white uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] whitespace-nowrap leading-[0.92] ${
                    currentTheme.title === 'CONSTRUCTION'
                      ? 'text-[clamp(1.75rem,3.2vw,3.9rem)]'
                      : 'text-[clamp(2.1rem,4.2vw,5.0rem)]'
                  }`}
                >
                  {currentTheme.title}
                </motion.h1>
              </AnimatePresence>
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-sans tracking-tight text-white/95 mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              What We Suggest For You ?
            </h2>
          </div>

          {/* Top-Right Vertical Editorial Label */}
          <div 
            ref={outerTopRightRef}
            className="absolute top-10 right-8 sm:right-12 z-30 pointer-events-none transition-all duration-300 flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-orange-500/60 to-orange-400" />
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentTheme.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="writing-vertical font-mono text-[10px] tracking-[0.35em] uppercase text-orange-400 drop-shadow"
              >
                {currentTheme.sideTag}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Middle-Right Suggestion Content */}
          <div 
            ref={outerMiddleRightRef}
            className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-14 z-30 max-w-[32vw] sm:max-w-xs lg:max-w-sm pointer-events-auto transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTheme.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-stone-200 font-sans font-light drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                  {currentTheme.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Action Prompt */}
          <div 
            ref={scrollPromptRef}
            className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-2 pointer-events-none text-white/80 text-[11px] uppercase tracking-[0.25em] font-sans"
          >
            <span ref={promptLabelRef} className="transition-all duration-300 drop-shadow">Scroll to peek inside</span>
            <div className="w-5 h-8 border border-white/40 rounded-full flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm shadow-md">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            </div>
          </div>

          {/* Live Bidirectional Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-700/40 z-40">
            <div ref={progressLineRef} className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-300 w-0" />
          </div>

        </div>
      </div>

      {/* ── 2. GUIDANCE & SUGGESTIONS SUITE (Sticky Horizontal Scroll with 2 Cards Per Slide) ── */}
      <div 
        ref={horizontalScrollRef} 
        id="suggestions-content" 
        className="relative h-[240vh] bg-[#FAF7F2] text-neutral-900 border-t border-[#E5DACB]"
      >
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen max-h-[100dvh] flex flex-col justify-between py-3 sm:py-8 lg:py-10 px-3 sm:px-8 lg:px-12 overflow-hidden select-none">
          
          {/* Subtle architectural drafting grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#d4c7b8 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full justify-between">
            
            {/* Header + Mode Switcher & Slide Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DACB] pb-3 sm:pb-4 mb-2 sm:mb-3 gap-2.5 sm:gap-4 shrink-0">
              <div>
                {/* Pill Switcher */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('interior')}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                      activeTab === 'interior'
                        ? 'bg-neutral-950 text-white shadow-md'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300/80'
                    }`}
                  >
                    <Sofa className={`w-3.5 h-3.5 ${activeTab === 'interior' ? 'text-orange-500' : 'text-neutral-500'}`} />
                    <span>Interior Suggestions</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'interior' ? 'bg-orange-500 text-neutral-950' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      4 Spaces
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('construction')}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                      activeTab === 'construction'
                        ? 'bg-neutral-950 text-white shadow-md'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300/80'
                    }`}
                  >
                    <HardHat className={`w-3.5 h-3.5 ${activeTab === 'construction' ? 'text-orange-500' : 'text-neutral-500'}`} />
                    <span>Construction Suggestions</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'construction' ? 'bg-orange-500 text-neutral-950' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      4 Pillars
                    </span>
                  </button>

                  <Link
                    to="/design-studio"
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-all active:scale-95 ml-auto sm:ml-0"
                    title="Open Full Design & Color Studio"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Color Studio</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>

                {/* Dynamic Title */}
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-950 leading-tight">
                  {activeTab === 'interior' ? (
                    <>Curated Interior Suggestions <span className="text-orange-600">for Every Corner</span></>
                  ) : (
                    <>Solid Foundations, <span className="text-orange-600">Flawless Finishes</span></>
                  )}
                </h2>
              </div>

              {/* Slide Navigation Controls (2 Images Per View) */}
              <div className="flex items-center gap-2.5 sm:gap-3 self-end md:self-auto shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-[#E5DACB] text-[11px] sm:text-xs font-mono font-bold text-neutral-700 shadow-xs">
                  <span className="text-orange-600">0{currentSlideIndex + 1}</span>
                  <span className="text-neutral-400">/</span>
                  <span>02</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSlideJump(0)}
                    disabled={currentSlideIndex === 0}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      currentSlideIndex === 0
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                        : 'bg-white border-[#E5DACB] text-neutral-800 hover:border-orange-500 hover:text-orange-600 shadow-xs active:scale-95'
                    }`}
                    title="Slide 1 (Cards 1 & 2)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSlideJump(1)}
                    disabled={currentSlideIndex === 1}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      currentSlideIndex === 1
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                        : 'bg-white border-[#E5DACB] text-neutral-800 hover:border-orange-500 hover:text-orange-600 shadow-xs active:scale-95'
                    }`}
                    title="Slide 2 (Cards 3 & 4)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Cards Viewport Track (Exactly 2 Cards Per View on Desktop) */}
            <div 
              ref={containerTrackRef}
              className="relative w-full overflow-hidden flex-1 flex items-center py-1 sm:py-2"
            >
              <motion.div
                ref={cardsTrackRef}
                style={{ x: translateX }}
                className="flex gap-4 sm:gap-6 w-max will-change-transform"
              >
                {activeTab === 'interior' ? (
                  INTERIOR_SUGGESTIONS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="w-[86vw] sm:w-[calc(50vw-40px)] md:w-[calc(50vw-48px)] lg:w-[580px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#E5DACB] hover:border-orange-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Visual Image */}
                        <div className="relative h-36 sm:h-52 overflow-hidden bg-neutral-950 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between">
                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono font-semibold border border-white/15">
                              {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-orange-950/80 text-orange-300 text-[9px] sm:text-[10px] font-mono font-semibold border border-orange-500/30">
                              {item.tag}
                            </span>
                          </div>

                          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-md">
                            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
                          <div>
                            <h3 className="text-sm sm:text-lg font-bold font-display text-neutral-950 leading-snug mb-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          {/* Key Accents */}
                          <div className="pt-2 border-t border-neutral-100 space-y-1">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                              Key Accents
                            </span>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                              {item.accents.map((acc, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#FAF7F2] text-neutral-700 text-[9px] sm:text-[10px] font-medium border border-[#E5DACB]"
                                >
                                  {acc}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link
                            to={item.targetUrl}
                            className="pt-1 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-all text-left cursor-pointer group"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  CONSTRUCTION_PILLARS.map((pillar) => {
                    const IconComp = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className="w-[86vw] sm:w-[calc(50vw-40px)] md:w-[calc(50vw-48px)] lg:w-[580px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#E5DACB] hover:border-orange-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Image */}
                        <div className="relative h-36 sm:h-52 overflow-hidden bg-neutral-950 shrink-0">
                          <img
                            src={pillar.image}
                            alt={pillar.pillar}
                            className="w-full h-full object-cover brightness-90"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between">
                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono font-bold border border-white/20">
                              {pillar.pillar}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 text-[9px] sm:text-[10px] font-mono font-semibold border border-emerald-500/30">
                              {pillar.focusArea}
                            </span>
                          </div>

                          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-md">
                            <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-orange-600 block font-bold mb-1">
                              Key Standard / Suggestion
                            </span>
                            <p className="text-xs text-neutral-800 font-medium leading-relaxed mb-2 line-clamp-2">
                              {pillar.keyStandard}
                            </p>
                          </div>

                          {/* Recommendation & Specs */}
                          <div className="pt-2 border-t border-neutral-100 space-y-1">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                              Execution Checklist
                            </span>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                              {pillar.specDetails.slice(0, 2).map((spec, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#FAF7F2] text-neutral-700 text-[9px] sm:text-[10px] font-medium border border-[#E5DACB] line-clamp-1"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link
                            to={pillar.targetUrl}
                            className="pt-1 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-all text-left cursor-pointer group"
                          >
                            <span>Inspect Technical Standard</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </div>

            {/* Bottom Progress Scrub Strip */}
            <div className="pt-2.5 border-t border-[#E5DACB] flex items-center justify-between text-[11px] font-mono text-neutral-500 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>Scroll vertically to scrub horizontally &bull; 2 Cards per slide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={currentSlideIndex === 0 ? 'text-orange-600 font-bold' : ''}>Slide 01</span>
                <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${(currentSlideIndex + 1) * 50}%` }}
                  />
                </div>
                <span className={currentSlideIndex === 1 ? 'text-orange-600 font-bold' : ''}>Slide 02</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 2.5. BOTTOM BANNER CALLOUT (Appears smoothly after sticky horizontal scroll) ── */}
      <section className="relative z-30 bg-[#FAF7F2] px-6 sm:px-12 md:px-20 py-12 sm:py-16 border-t border-[#E5DACB]">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'interior' ? (
            <div className="rounded-3xl bg-neutral-950 text-white border border-neutral-800 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 mb-2">
                  <Compass className="w-3.5 h-3.5 text-orange-500" />
                  <span>BESPOKE 3D SPACE PLANNING &bull; ITEMISED ESTIMATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
                  Have a unique floor plan in mind?
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 mt-2 font-sans leading-relaxed">
                  Let our interior specialists build a custom 3D visualization and itemized budget estimate based on your exact layout.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => openInquiryFor('3D Moodboard & Space Plan')}
                  className="px-6 py-3.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-200 font-mono text-xs uppercase tracking-wider font-bold transition-all text-center cursor-pointer shadow-sm active:scale-95"
                >
                  Request 3D Moodboard
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Book a Free Design Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-neutral-950 text-white border border-neutral-800 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 mb-2">
                  <FileCheck2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>ON-SITE STRUCTURAL AUDIT &bull; 24-POINT CIVIL CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
                  Planning a build or major structural overhaul?
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 mt-2 font-sans leading-relaxed">
                  Protect your capital with rigorous on-site PMC supervision before masonry, plumbing, and finishing works commence.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsChecklistOpen(true)}
                  className="px-6 py-3.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-200 font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <Download className="w-4 h-4 text-orange-400" />
                  <span>Download Civil Checklist</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Book On-Site Structural Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. INQUIRY MODAL (Interior / Construction) ────────────────── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div className="bg-neutral-900 border border-orange-500/30 w-full max-w-md rounded-2xl p-6 sm:p-8 text-neutral-200 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-bold mx-auto flex items-center justify-center mb-3">
                CS
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">Project Consultation</h3>
              <p className="text-neutral-400 text-xs mt-1">
                Selected Focus: <span className="text-orange-400 font-semibold">{modalTopic}</span>
              </p>
            </div>

            {!modalSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-orange-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Dr. Lakshmi or Kiran" 
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-orange-400 mb-1">Phone / WhatsApp</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="+91 98450 00000" 
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-orange-400 mb-1">Scope</label>
                  <select 
                    defaultValue={modalTopic}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-neutral-300 outline-none transition-colors"
                  >
                    <option>Living &amp; Lounge Spaces</option>
                    <option>Modular Kitchens &amp; Dining</option>
                    <option>Master &amp; Guest Bedrooms</option>
                    <option>Compact Spaces &amp; Home Offices</option>
                    <option>Soil &amp; Foundation Testing</option>
                    <option>Moisture &amp; Waterproofing Audit</option>
                    <option>MEP Coordination &amp; Conduits</option>
                    <option>Plaster &amp; 90-Degree Trueness Check</option>
                    <option>Full Turnkey PMC Execution</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xl transition-all shadow-lg shadow-orange-500/25 mt-2 cursor-pointer active:scale-95"
                >
                  Submit Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <h4 className="font-display font-bold text-xl text-white">Thank You for Inquiring</h4>
                <p className="text-xs text-neutral-400 mt-2">Principal Consultant Mr. Kiran Dikshit L will be in touch with you promptly with audit details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 4. CIVIL CHECKLIST DOWNLOAD / VIEW MODAL ────────────────── */}
      {isChecklistOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsChecklistOpen(false); }}
        >
          <div className="bg-neutral-900 border border-orange-500/30 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 text-neutral-200 shadow-2xl relative">
            <button 
              onClick={() => setIsChecklistOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-orange-400 font-bold tracking-wider block">
                  CS ASSOCIATES QUALITY ASSURANCE
                </span>
                <h3 className="text-xl font-display font-extrabold text-white">
                  24-Point Civil &amp; Structural Checklist
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mb-5 leading-relaxed font-sans">
              Critical on-site inspection parameters enforced by CS Associates engineers prior to interior handover:
            </p>

            <div className="space-y-2 mb-6">
              {CIVIL_CHECKLIST_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-neutral-950/70 border border-neutral-800/80 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsChecklistOpen(false);
                  onOpenConsultation();
                }}
                className="w-full sm:flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book On-Site PMC Audit</span>
              </button>
              <button
                type="button"
                onClick={() => setIsChecklistOpen(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
