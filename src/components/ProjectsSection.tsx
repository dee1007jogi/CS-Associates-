import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { MapPin, ShieldCheck, ArrowRight, TrendingDown, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectsSectionProps {
  onOpenConsultation: () => void;
  variant?: 'carousel' | 'grid';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onOpenConsultation,
  variant = 'carousel'
}) => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'healthcare'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filteredProjects = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  const maxIndex = isDesktop ? Math.max(0, PROJECTS_DATA.length - 2) : PROJECTS_DATA.length - 1;

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

  // Minimal Clean Carousel View for Homepage
  if (variant === 'carousel') {
    return (
      <section id="projects" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 mb-8 border-b border-neutral-800">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-mono font-medium tracking-wider mb-3 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Portfolio · Recent Works
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Featured Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Architectural precision and audited financial savings across Bengaluru’s landmark residences and healthcare facilities.
            </p>
          </motion.div>

          {/* Clean Stepper / Arrow Controls (ENTRANCE FROM RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="text-xs font-mono font-semibold text-neutral-400 tabular-nums mr-2">
              0{currentIndex + 1} <span className="text-neutral-600">/</span> 0{maxIndex + 1}
            </span>
            <button
              onClick={prevSlide}
              aria-label="Previous project"
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next project"
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Carousel Sliding Track (ENTRANCE FROM BOTTOM) */}
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
                transform: `translateX(calc(-${currentIndex} * (${isDesktop ? '50% + 12px' : '100% + 24px'})))`
              }}
            >
              {PROJECTS_DATA.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="w-full md:w-[calc(50%-12px)] shrink-0 group bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  {/* Project Image */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full bg-neutral-950/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                        {project.categoryLabel}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-medium border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{project.status}</span>
                      </span>
                    </div>

                    {/* Bottom Location & Area Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-white/10">
                        <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                        <span className="text-white font-medium truncate">{project.location}</span>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md text-white font-mono text-[11px] border border-white/10">
                        {project.builtUpArea}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Clean Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                        {project.scope}
                      </p>
                    </div>

                    {/* Minimal Bottom Row: Verified Metric & Action */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                      {project.clientSavings ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{project.clientSavings}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-500 font-mono">100% Quality Audited</span>
                      )}

                      <span className="text-xs font-semibold text-orange-500 group-hover:text-orange-400 flex items-center gap-1 shrink-0">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

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
