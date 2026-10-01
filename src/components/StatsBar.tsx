import React from 'react';
import { Award, Building2, CheckCircle, Users2, Landmark, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsBarProps {
  theme?: 'dark' | 'white';
}

export const StatsBar: React.FC<StatsBarProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const stats = [
    {
      value: '25+',
      label: 'Years Industry Mastery',
      sub: 'Civil & Architectural PMC',
      icon: Award
    },
    {
      value: '300k+',
      label: 'Sq.Ft. Constructed',
      sub: 'Villas & Commercial Space',
      icon: Building2
    },
    {
      value: '150+',
      label: 'Projects Delivered',
      sub: 'Turnkey On-Time Completion',
      icon: CheckCircle
    },
    {
      value: '120+',
      label: 'Happy Families & Clients',
      sub: '100% Peace of Mind',
      icon: Users2
    },
    {
      value: '200+',
      label: 'Amenities Created',
      sub: 'Automation, Pools, Spas, OTs',
      icon: Landmark
    },
    {
      value: '8-15%',
      label: 'Direct Cost Savings',
      sub: 'Measurement & Billing Audits',
      icon: TrendingDown
    }
  ];

  return (
    <section className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all ${
          isWhite 
            ? 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-200/50' 
            : 'bg-neutral-900/90 border-neutral-800 text-white'
        }`}
      >
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x ${
          isWhite ? 'divide-neutral-200' : 'divide-neutral-800'
        }`}>
          {stats.map((item, idx) => {
            const Icon = item.icon;
            const initialX = idx < 3 ? -25 : 25;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: initialX, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.65, 
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`${idx > 0 ? 'pt-4 lg:pt-0' : ''} ${idx > 0 ? 'lg:pl-6' : ''} flex flex-col justify-between group`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl sm:text-3xl font-black font-display tabular-nums tracking-tight group-hover:text-orange-500 transition-colors ${
                    isWhite ? 'text-neutral-950' : 'text-white'
                  }`}>
                    {item.value}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isWhite ? 'text-neutral-800' : 'text-neutral-200'
                  }`}>
                    {item.label}
                  </h4>
                  <p className={`text-[11px] mt-0.5 ${
                    isWhite ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {item.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
