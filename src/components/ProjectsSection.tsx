import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectsSectionProps {
  onOpenConsultation: () => void;
  variant?: 'carousel' | 'grid';
  theme?: 'dark' | 'beige' | 'white';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onOpenConsultation,
  variant = 'carousel',
  theme = 'beige'
}) => {
  const [statusTab, setStatusTab] = useState<'finished' | 'upcoming' | 'all'>('finished');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerView(3);
      } else if (width >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const finishedCount = PROJECTS_DATA.filter(p => p.status === 'Completed' || p.status === 'Handover Complete').length;
  const upcomingCount = PROJECTS_DATA.filter(p => p.status === 'Upcoming' || p.status === 'Ongoing').length;
  const allCount = PROJECTS_DATA.length;

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (statusTab === 'finished') {
      return p.status === 'Completed' || p.status === 'Handover Complete';
    }
    if (statusTab === 'upcoming') {
      return p.status === 'Upcoming' || p.status === 'Ongoing';
    }
    return true;
  });

  // Maximum scroll step so the last full view of cards remains cleanly aligned
  const maxIndex = Math.max(0, filteredProjects.length - cardsPerView);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  const isBeige = theme === 'beige' || theme === 'white';

  // Calculate sliding transform offset for 1, 2, or 3 cards per view with 24px gap
  const getSlideTransform = () => {
    if (cardsPerView === 3) {
      return `translateX(calc(-${currentIndex} * ((100% + 24px) / 3)))`;
    }
    if (cardsPerView === 2) {
      return `translateX(calc(-${currentIndex} * ((100% + 24px) / 2)))`;
    }
    return `translateX(calc(-${currentIndex} * (100% + 24px)))`;
  };

  // =========================================================================
  // ENHANCED 3-CARDS PER VIEW CAROUSEL (HOMEPAGE)
  // =========================================================================
  if (variant === 'carousel') {
    return (
      <section 
        id="projects" 
        className={`py-20 lg:py-24 relative overflow-hidden transition-colors ${
          isBeige ? 'bg-[#FAF7F2] text-neutral-900' : 'bg-neutral-950 text-white'
        }`}
      >
        {/* Delicate architectural drafting grid for beige theme */}
        {isBeige && (
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#d4c7b8 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with Carousel Navigation Controls & Finished / Upcoming Tabs */}
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b ${
            isBeige ? 'border-[#E5DACB]' : 'border-neutral-800'
          }`}>
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 text-xs font-mono font-bold tracking-wider mb-3 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Portfolio · Verified Track Record
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display ${
                isBeige ? 'text-neutral-950' : 'text-white'
              }`}>
                Featured Projects
              </h2>
              <p className={`mt-2 text-sm sm:text-base max-w-xl ${
                isBeige ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                Architectural precision and audited financial savings across Bengaluru’s landmark residences and healthcare facilities.
              </p>

              {/* Finished Works & Upcoming Projects Tab Buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => { setStatusTab('finished'); setCurrentIndex(0); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                    statusTab === 'finished'
                      ? 'bg-neutral-950 text-white shadow-md'
                      : isBeige
                        ? 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300/80'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${statusTab === 'finished' ? 'text-orange-500' : 'text-emerald-500'}`} />
                  <span>Finished Works</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    statusTab === 'finished'
                      ? 'bg-orange-500 text-neutral-950'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {finishedCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setStatusTab('upcoming'); setCurrentIndex(0); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                    statusTab === 'upcoming'
                      ? 'bg-neutral-950 text-white shadow-md'
                      : isBeige
                        ? 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300/80'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${statusTab === 'upcoming' ? 'text-orange-500' : 'text-amber-500'}`} />
                  <span>Upcoming Projects</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    statusTab === 'upcoming'
                      ? 'bg-orange-500 text-neutral-950'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {upcomingCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setStatusTab('all'); setCurrentIndex(0); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    statusTab === 'all'
                      ? 'bg-neutral-950 text-white shadow-md'
                      : isBeige
                        ? 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-300/80'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  <span>All Works</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    statusTab === 'all'
                      ? 'bg-orange-500 text-neutral-950 font-bold'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {allCount}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Stepper / Arrow Controls */}
            <motion.div 
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 shrink-0 self-start lg:self-end"
            >
              <span className={`text-xs font-mono font-bold tabular-nums mr-2 ${
                isBeige ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                0{currentIndex + 1} <span className="opacity-40">/</span> 0{filteredProjects.length}
              </span>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous project"
                className={`p-3 rounded-full border transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isBeige 
                    ? 'border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800' 
                    : 'border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next project"
                className={`p-3 rounded-full border transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isBeige 
                    ? 'border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800' 
                    : 'border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Carousel Sliding Track (3 Cards Per View on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: getSlideTransform()
                }}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] shrink-0 group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isBeige
                        ? 'bg-white border border-neutral-200/90 shadow-[0_8px_24px_rgba(44,24,14,0.06)] hover:shadow-[0_20px_40px_rgba(242,84,0,0.12)] hover:border-orange-500/50 hover:-translate-y-1.5'
                        : 'bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center filter brightness-[0.93] group-hover:scale-108 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                        <span className="px-3 py-1 rounded-full bg-neutral-950/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/15">
                          {project.categoryLabel}
                        </span>
                        {project.status === 'Upcoming' ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/25 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-500/40 flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                            <span>Upcoming Site</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md text-emerald-400 text-[11px] font-medium border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{project.status}</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Location & Area Overlay */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-neutral-300">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-white/10">
                          <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                          <span className="text-white font-medium truncate max-w-[150px]">{project.location}</span>
                        </div>
                        <span className="px-2 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md text-white font-mono text-[11px] border border-white/10">
                          {project.builtUpArea}
                        </span>
                      </div>
                    </div>

                    {/* Clean Project Content */}
                    <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold font-display transition-colors line-clamp-1 ${
                          isBeige ? 'text-neutral-950 group-hover:text-orange-600' : 'text-white group-hover:text-orange-500'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                          isBeige ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>
                          {project.scope}
                        </p>
                      </div>

                      {/* Verified Metric & Action CTA */}
                      <div className={`pt-3 border-t flex items-center justify-between gap-2.5 ${
                        isBeige ? 'border-neutral-100' : 'border-neutral-800/80'
                      }`}>
                        {project.clientSavings ? (
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold truncate ${
                            isBeige 
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          }`}>
                            <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{project.clientSavings}</span>
                          </div>
                        ) : project.status === 'Upcoming' ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700">
                            <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                            <span>{project.completionYear}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400 font-mono">100% Quality Audited</span>
                        )}

                        <span className="text-xs font-bold text-orange-600 group-hover:text-orange-500 flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Pagination Dots & All Projects Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx 
                        ? 'w-8 bg-orange-500' 
                        : isBeige
                          ? 'w-2 bg-neutral-300 hover:bg-neutral-400'
                          : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                    }`}
                  />
                ))}
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-orange-600 uppercase tracking-wider font-mono transition-colors"
              >
                <span>View Full Portfolio &amp; Site Archives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Modal is shared below */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                    {selectedProject.categoryLabel} · Bengaluru
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Location</span>
                    <span className="font-semibold text-white mt-0.5 block">{selectedProject.location}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Built-Up Area</span>
                    <span className="font-semibold text-white mt-0.5 block font-mono">{selectedProject.builtUpArea}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Status</span>
                    <span className={`font-semibold mt-0.5 block ${selectedProject.status === 'Upcoming' ? 'text-amber-400' : 'text-emerald-400'}`}>{selectedProject.status}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Handover</span>
                    <span className="font-semibold text-white mt-0.5 block">{selectedProject.completionYear}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-2">
                    Project PMC Overview
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-3">
                    Key PMC Engineering Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-neutral-200">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedProject.clientSavings && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      Direct Financial Stewardship:
                    </div>
                    <p className="text-sm text-emerald-200 font-medium">
                      {selectedProject.clientSavings} through laser verification of contractor bills and steel scrap management.
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
                  <span className="text-xs text-neutral-400">
                    Want similar execution and savings for your project?
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenConsultation();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Consult on Similar Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // Grid view for dedicated Projects Page
  return (
    <section id="projects" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="border-b border-neutral-800 pb-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-2 font-mono">
          <span>PORTFOLIO</span>
          <span className="text-neutral-600">//</span>
          <span className="text-neutral-400">ARCHITECTURAL PORTFOLIO & RECENT SITES</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              Featured Projects & Realized Milestones
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              A portfolio of meticulous execution across Bengaluru’s premier locales — Abbigere, Kanakapura Road, Indiranagar, and Sadashivanagar.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0 self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-orange-500 text-neutral-950 shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'residential'
                  ? 'bg-orange-500 text-neutral-950 shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Luxury Villas
            </button>
            <button
              onClick={() => setFilter('healthcare')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'healthcare'
                  ? 'bg-orange-500 text-neutral-950 shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Healthcare & Commercial
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden shadow-xl transition-all cursor-pointer flex flex-col justify-between h-full"
          >
            {/* Project Image */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="glass-panel text-white px-3 py-1 rounded-lg text-[11px] font-semibold border border-white/10">
                  {project.categoryLabel}
                </span>
                <span className="glass-panel text-emerald-400 px-3 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{project.status}</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-1.5 glass-panel px-3 py-1 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-medium text-white">{project.location}</span>
                </div>
                <div className="glass-panel px-3 py-1 rounded-lg text-white font-mono border border-white/10">
                  {project.builtUpArea}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {project.scope}
                </p>

                <div className="space-y-1.5 pt-3 mt-3 border-t border-neutral-800">
                  {project.highlights.slice(0, 2).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="text-orange-500">·</span>
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.clientSavings && (
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between text-xs mt-4">
                  <div className="flex items-center gap-2 text-emerald-300 font-medium">
                    <TrendingDown className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{project.clientSavings}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">Verified Audit</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider block mb-1">
                  {selectedProject.categoryLabel} · Bengaluru
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block">Location</span>
                  <span className="font-semibold text-white mt-0.5 block">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Built-Up Area</span>
                  <span className="font-semibold text-white mt-0.5 block font-mono">{selectedProject.builtUpArea}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Status</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{selectedProject.status}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Handover</span>
                  <span className="font-semibold text-white mt-0.5 block">{selectedProject.completionYear}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-2">
                  Project PMC Overview
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-3">
                  Key PMC Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-200">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.clientSavings && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    Direct Financial Stewardship:
                  </div>
                  <p className="text-sm text-emerald-200 font-medium">
                    {selectedProject.clientSavings} through laser verification of contractor bills and steel scrap management.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
                <span className="text-xs text-neutral-400">
                  Want similar execution and savings for your project?
                </span>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenConsultation();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Consult on Similar Project
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
