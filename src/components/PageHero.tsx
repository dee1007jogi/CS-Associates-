import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

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
  onPrimaryAction
}) => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-black text-white border-b border-neutral-800">
      {/* Background Image: Focused on the right side with crisp clarity */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-[78%_center] filter brightness-[0.88] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Directional Overlay: Solid black on the left for text clarity, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-45% to-transparent pointer-events-none" />
        {/* Right-edge subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:hidden pointer-events-none" />
      </div>

      {/* Subtle Warm Orange Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-orange-600/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          
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

          {/* Action Buttons matching screenshot */}
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
                href="https://wa.me/918296266389?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20consult%20on%20my%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer font-sans uppercase tracking-wider"
              >
                <span>{primaryActionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            <a
              href="tel:+918296266389"
              className="px-5 py-3.5 rounded-xl border border-neutral-700/80 hover:border-orange-500/60 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 backdrop-blur-md flex items-center gap-2 transition-colors font-mono"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>+91 82962 66389</span>
            </a>

            {/* Optional Stats */}
            {stats && stats.length > 0 && (
              <div className="hidden lg:flex items-center gap-4 bg-neutral-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
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
      </div>
    </section>
  );
};
