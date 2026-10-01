import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { PROJECTS_DATA, type ProjectItem } from '../data/projectsData';
import { PageHero } from '../components/PageHero';
import {
  MapPin, ShieldCheck, TrendingDown, Check, X, ArrowRight,
  Building2, Home, Activity, Filter
} from 'lucide-react';

interface ProjectsPageProps {
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

const FILTERS = [
  { key: 'all', label: 'All Projects', icon: Filter },
  { key: 'residential', label: 'Luxury Villas', icon: Home },
  { key: 'commercial', label: 'Commercial', icon: Building2 },
  { key: 'healthcare', label: 'Healthcare', icon: Activity },
] as const;

type FilterKey = 'all' | 'residential' | 'commercial' | 'healthcare';

function ProjectCard({ 
  project, 
  onClick, 
  theme = 'white' 
}: { 
  project: ProjectItem; 
  onClick: () => void; 
  theme?: 'white' | 'dark';
}) {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
        isDark
          ? 'bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_20px_40px_-12px_rgba(0,0,0,0.6)]'
          : 'bg-white border border-neutral-200/90 shadow-sm hover:border-orange-500/50 hover:shadow-xl'
      }`}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-950 shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold border border-white/15">
            {project.categoryLabel}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border backdrop-blur-sm flex items-center gap-1 ${
            project.status === 'Completed' || project.status === 'Handover Complete'
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
              : 'bg-orange-950/80 text-orange-400 border-orange-500/30'
          }`}>
            <ShieldCheck className="w-3 h-3" />
            {project.status}
          </span>
        </div>

        {/* Bottom location + area */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/15 text-white font-medium">
            <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
            {project.location}
          </div>
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/15 text-neutral-200 font-mono">
            {project.builtUpArea}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className={`text-base font-bold transition-colors font-display leading-snug ${
            isDark ? 'text-white group-hover:text-orange-400' : 'text-neutral-950 group-hover:text-orange-600'
          }`}>
            {project.title}
          </h3>
          <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">{project.scope}</p>
        </div>

        {/* Highlights - 2 bullets */}
        <div className={`space-y-1.5 pt-2 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
          {project.highlights.slice(0, 2).map((hl, i) => (
            <div key={i} className={`flex items-start gap-2 text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <span className="text-orange-500 mt-0.5 shrink-0">—</span>
              <span className="line-clamp-1">{hl}</span>
            </div>
          ))}
        </div>

        {/* Savings chip */}
        {project.clientSavings && (
          <div className="mt-auto pt-2">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium ${
              isDark 
                ? 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            }`}>
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{project.clientSavings}</span>
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-neutral-500 font-mono">{project.completionYear}</span>
          <span className={`text-[11px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            View Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onConsult }: { project: ProjectItem; onClose: () => void; onConsult: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8)] relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          <div className="absolute bottom-5 left-5 right-12">
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-widest block mb-1">
              {project.categoryLabel} · Bengaluru
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 space-y-5">

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Location', value: project.location },
              { label: 'Built-Up Area', value: project.builtUpArea, mono: true },
              { label: 'Status', value: project.status, green: true },
              { label: 'Handover', value: project.completionYear },
            ].map(({ label, value, mono, green }) => (
              <div key={label} className="bg-neutral-950 border border-neutral-800 rounded-xl p-3">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">{label}</span>
                <span className={`text-xs font-semibold block ${green ? 'text-emerald-400' : 'text-white'} ${mono ? 'font-mono' : ''}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Scope description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono mb-2">PMC Scope of Work</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">{project.scope}</p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2">Key Engineering Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-2.5">
                  <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300 leading-tight">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Savings Callout */}
          {project.clientSavings && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/25 flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-400 block">Verified Fiduciary Savings</span>
                <span className="text-xs text-neutral-300 mt-0.5 block">{project.clientSavings}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => { onClose(); onConsult(); }}
              className="w-full sm:flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <span>Request Consultation on Similar Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenConsultation }) => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">

      {/* ── 1. PAGE HERO (Dark Theme) ──────────────────────────────── */}
      <PageHero
        badge="Landmark Portfolio · 150+ Delivered"
        title="Realized Architectural &"
        highlightedTitle="Commercial Milestones."
        description="Explore over 150+ successfully delivered projects across Bengaluru — including Dr Lakshmi Residence (Abbigere), Site No 12 Opulence (Kanakapura Road), and Indiranagar Specialty Center."
        backgroundImage="/src/assets/images/projects_hero_luxury_estate.jpg"
        breadcrumbLabel="Projects"
        primaryActionLabel="Consult on Your Site"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '150+', label: 'Projects Delivered' },
          { value: '300K+ sqft', label: 'Constructed' },
          { value: '₹18L+', label: 'Audited Savings' },
        ]}
      />

      {/* ── 2. FEATURED PROJECTS GRID (White Theme) ────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05, margin: '0px 0px -50px 0px' }}
        variants={sectionVariants}
      >
        <section id="projects-grid" className="w-full bg-white text-neutral-900 border-b border-neutral-200 py-14 sm:py-20 relative select-none">
          {/* Subtle grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Section header + filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-orange-600 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>DELIVERED LANDMARKS · BENGALURU</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 font-display tracking-tight uppercase">
                  FEATURED <span className="text-orange-600">PROJECTS</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 font-sans mt-2 max-w-xl leading-relaxed">
                  Explore our realized luxury villas, commercial campuses, and healthcare infrastructure across Bengaluru. Click any project to view full specifications & audited savings.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                {FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as FilterKey)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      filter === key
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                        : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:text-neutral-950'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  theme="white"
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-neutral-400">
                <p className="text-sm">No projects in this category yet.</p>
              </div>
            )}

            {/* Bottom CTA Card */}
            <div className="mt-16 rounded-3xl bg-neutral-950 text-white border border-neutral-800 p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white font-display">Ready to Build Your Landmark?</h3>
                <p className="text-sm text-neutral-300 mt-1.5 max-w-md font-sans">
                  Get a free technical consultation and see how CS Associates can protect your investment from Day 1.
                </p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="relative z-10 inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </motion.div>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onConsult={onOpenConsultation}
        />
      )}
    </div>
  );
};
