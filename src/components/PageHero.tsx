import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Crosshair } from 'lucide-react';

interface PageHeroProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  backgroundImage: string;
  breadcrumbLabel: string;
  stats?: { label: string; value: string }[];
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  focusTag?: string;
  focusSubtitle?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  highlightedTitle,
  description,
  backgroundImage,
  breadcrumbLabel,
  stats,
  primaryActionLabel = 'Schedule Discovery Call',
  onPrimaryAction,
  focusTag,
  focusSubtitle = 'Independent Quality & Audit Standards'
}) => {
  const activeFocusTag = focusTag || `${breadcrumbLabel.toUpperCase()} · FIELD FOCUS`;

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-neutral-950 text-white border-b border-neutral-800/80">
      {/* Background Image: Strongly anchored to the right side with crisp clarity & vibrancy */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-[88%_center] sm:object-[92%_center] md:object-[95%_center] lg:object-right filter brightness-[1.04] contrast-[1.08] saturate-[1.06]"
          referrerPolicy="no-referrer"
        />

        {/* Directional Overlay: Solid black on the left for crisp text contrast, tapering completely to 100% transparent before the right-side subject */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/92 via-35% md:via-42% to-transparent to-68% lg:to-60% pointer-events-none" />

        {/* Subtle Bottom Transition Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent pointer-events-none" />

        {/* Mobile bottom readability tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent sm:hidden pointer-events-none" />
      </div>

      {/* Subtle Warm Orange Ambient Backlight behind the focal area */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[320px] bg-orange-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[250px] bg-orange-600/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            
            {/* Eyebrow Badge & Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <span>{badge}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-300">
                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                <span className="text-neutral-600">/</span>
                <span className="text-orange-400 font-bold">{breadcrumbLabel}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display text-balance"
            >
              {title} {highlightedTitle && <span className="text-orange-500 underline decoration-orange-500/50 decoration-4 underline-offset-8">{highlightedTitle}</span>}
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl"
            >
              {description}
            </motion.p>

            {/* Action Buttons with Primary Phone: 8095823483 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {onPrimaryAction ? (
                <button
                  onClick={onPrimaryAction}
                  className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans uppercase tracking-wider"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20consult%20on%20my%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans uppercase tracking-wider"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              <a
                href="tel:+918095823483"
                className="px-5 py-3.5 rounded-xl border border-neutral-700/80 hover:border-orange-500/60 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 backdrop-blur-md flex items-center gap-2 transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 80958 23483</span>
              </a>

              {/* Optional Stats */}
              {stats && stats.length > 0 && (
                <div className="hidden sm:flex items-center gap-4 bg-neutral-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  {stats.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {idx > 0 && <span className="text-neutral-700">·</span>}
                      <span className="font-bold text-orange-400 font-mono">{s.value}</span>
                      <span className="text-neutral-300">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

          {/* Right Column: Architectural Engineering Viewfinder Reticle Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-end"
          >
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl border border-white/20 bg-neutral-950/20 backdrop-blur-[2px] p-4 flex flex-col justify-between shadow-2xl overflow-hidden group">
              {/* Corner Precision Alignment Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500/80 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-500/80 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-500/80 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-500/80 pointer-events-none" />

              {/* Center Micro Crosshair Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-orange-400/50">
                <Crosshair className="w-8 h-8 animate-pulse" />
              </div>

              {/* Top Viewfinder Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 border border-white/15 backdrop-blur-md shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                    {activeFocusTag}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-300 bg-neutral-950/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                  IS 456 · NBC
                </div>
              </div>

              {/* Bottom Bar of Viewfinder */}
              <div className="relative z-10 flex items-end justify-between gap-3">
                <div className="bg-neutral-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 max-w-[240px] shadow-lg">
                  <p className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                    PMC DIRECT FIELD SUPERVISION
                  </p>
                  <p className="text-[11px] text-neutral-300 font-sans leading-tight mt-0.5">
                    {focusSubtitle}
                  </p>
                </div>
                <div className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-2 rounded-xl border border-white/10 flex flex-col items-end shadow-md">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    PRECISION
                  </span>
                  <span className="text-xs font-mono font-extrabold text-white">
                    ZERO DEFECT
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
