import React from 'react';
import { Send, PhoneCall, Globe, MessageCircle, Mail, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FounderSectionProps {
  onOpenConsultation: () => void;
  theme?: 'dark' | 'white' | 'gold';
  founderImage?: string;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ 
  onOpenConsultation, 
  theme = 'white',
  founderImage = '/src/assets/images/kiran_dikshit_founder.jpg'
}) => {
  return (
    <section 
      id="about" 
      className="min-h-screen w-full relative flex flex-col justify-center items-center py-12 sm:py-20 bg-white text-neutral-950 overflow-hidden border-y border-neutral-200"
    >
      {/* Background Subtle Blueprint Grid for Pure White Theme */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <div 
        aria-hidden="true" 
        className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-orange-500/8 rounded-full blur-[140px] pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-orange-600/8 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 flex-1 flex flex-col justify-center">

        {/* Master Poster Container (Full Screen Scale with Split Layout & Overlapping Banner) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-[32px] sm:rounded-[44px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.12)] border border-neutral-300/80 overflow-hidden flex-1 flex flex-col justify-between"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:min-h-[720px] flex-1">
            
            {/* LEFT HALF: Deep Obsidian & Walnut Wood Column with Founder Portrait (ENTRANCE FROM LEFT) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 bg-gradient-to-b from-[#211107] via-[#140b05] to-[#0a0502] p-5 sm:p-8 lg:p-8 xl:p-10 flex flex-col justify-between relative overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-orange-500/20"
            >
              
              {/* Radial atmospheric highlights */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#78350f]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top-Left: Logo & Brand Badge with Official Transparent Logo */}
              <div className="relative z-10 flex items-center gap-3">
                <img 
                  src="/src/assets/images/cs_logo_transparent.png" 
                  alt="CS Associates Official Logo" 
                  className="w-12 h-12 object-contain drop-shadow-[0_0_14px_rgba(221,108,2,0.45)]" 
                />
                <div>
                  <div className="text-xs sm:text-sm font-black tracking-widest font-mono text-white leading-tight">
                    CS ASSOCIATES
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-orange-400 font-mono">
                    A TRADITION OF TRUST
                  </div>
                </div>
              </div>

              {/* Center: Founder Portrait with Expanded Full-Width Frame */}
              <div className="relative z-10 my-4 sm:my-6 flex justify-center items-center w-full">
                <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px] aspect-[1448/1086] rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/50 bg-neutral-900 group">
                  <img
                    src={founderImage}
                    alt="Mr. Kiran Dikshit L - Founder & Proprietor"
                    className="w-full h-full object-contain object-center filter brightness-[1.0] contrast-[1.02] transition-transform duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Bottom-Left: Contact Dial Action Box */}
              <div className="relative z-10 pt-4 flex items-center gap-3.5 border-t border-orange-500/20">
                <a
                  href="tel:+918296266389"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform cursor-pointer"
                  title="Direct Phone Call"
                >
                  <PhoneCall className="w-5 h-5 fill-white" />
                </a>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-orange-400 font-mono">
                    Direct Consultation Dial
                  </div>
                  <a
                    href="tel:+918296266389"
                    className="text-base sm:text-xl font-black tracking-tight text-white hover:text-orange-300 transition-colors font-mono"
                  >
                    +91 8296266389
                  </a>
                </div>
              </div>

            </motion.div>

            {/* RIGHT HALF: Crisp Pure White Column with Halftone Orange Dots & Typography (ENTRANCE FROM RIGHT) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 bg-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden text-neutral-900"
            >
              
              {/* Halftone / Dot Matrix Pattern Overlay */}
              <div 
                aria-hidden="true" 
                className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none [background-image:radial-gradient(#dd6c02_1.5px,transparent_1.5px)] [background-size:16px_16px]"
              />
              <div 
                aria-hidden="true" 
                className="absolute bottom-0 right-0 w-52 h-52 opacity-15 pointer-events-none [background-image:radial-gradient(#dd6c02_1.5px,transparent_1.5px)] [background-size:16px_16px]"
              />

              {/* Top-Right: Social Action Links in Orange (ENTRANCE FROM TOP) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-end gap-2.5 relative z-10"
              >
                <a
                  href="https://wa.me/918296266389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20 hover:scale-110 transition-all cursor-pointer"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </a>
                <a
                  href="mailto:csassociates321@gmail.com"
                  className="w-9 h-9 rounded-full bg-orange-50 text-orange-800 border border-orange-300 flex items-center justify-center shadow-sm hover:scale-110 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="tel:+918095823483"
                  className="w-9 h-9 rounded-full bg-orange-50 text-orange-800 border border-orange-300 flex items-center justify-center shadow-sm hover:scale-110 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                  title="Call Office"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Center Content: Main Bold Typography Stack */}
              <div className="my-auto py-8 sm:py-12 relative z-10 space-y-5">
                
                {/* Main Heading Stack */}
                <div className="space-y-1.5">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 font-display leading-[1.02] tracking-tight">
                    Civil &amp; PMC
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-mono font-black text-base sm:text-xl tracking-widest uppercase shadow-lg shadow-orange-500/25">
                    EXPERT
                  </div>
                </div>

                {/* Subtitle / Bio Paragraph from official docx */}
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-lg pt-1">
                  Under the personal stewardship of <strong className="text-neutral-950 font-semibold">Mr. Kiran Dikshit L</strong> with over <strong className="text-orange-600 font-semibold">25+ years</strong> of hands-on civil & architectural PMC mastery across residential villas, commercial complexes, and healthcare projects.
                </p>

                {/* Trust Points in Orange */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-neutral-700 font-medium font-sans">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>300K+ Sq.Ft. Constructed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>8%–15% Direct Savings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>7-Stage Civil Governance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Zero-Leakage Handover</span>
                  </div>
                </div>

                {/* Register / Consultation Action Button */}
                <div className="pt-3">
                  <button
                    onClick={onOpenConsultation}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 cursor-pointer font-sans flex items-center gap-2"
                  >
                    <span>SCHEDULE A CONSULTATION</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom-Right: Website & Physical Office Badge (ENTRANCE FROM BOTTOM) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="relative z-10 pt-4 border-t border-neutral-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center border border-orange-200">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      csassociates321@gmail.com
                    </div>
                    <div className="text-xs font-bold text-orange-800 uppercase tracking-wider font-mono">
                      BENGALURU HEADQUARTERS
                    </div>
                  </div>
                </div>
                
                <div className="text-[10px] font-mono text-neutral-400 hidden sm:block">
                  BENGALURU · EST. 25+ YRS
                </div>
              </motion.div>

            </motion.div>

          </div>

          {/* OVERLAPPING HORIZONTAL QUOTE & SIGNATURE BANNER (ENTRANCE FROM BOTTOM) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:bottom-12 lg:left-8 lg:right-8 z-30 px-4 sm:px-6 lg:px-0 py-3 lg:py-0"
          >
            <div className="bg-neutral-950/95 backdrop-blur-2xl rounded-2xl lg:rounded-r-full lg:rounded-l-2xl border-2 border-orange-500 shadow-[0_16px_50px_rgba(0,0,0,0.3)] p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
              
              {/* Left Side: Cursive Signature & Title in Orange/Gold */}
              <div className="flex flex-col shrink-0 pr-4">
                <span className="font-signature text-3xl sm:text-5xl bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 bg-clip-text text-transparent font-bold leading-none tracking-wide drop-shadow-sm">
                  Kiran Dikshit L
                </span>
                <span className="text-[9px] uppercase tracking-widest text-orange-400 font-mono font-bold mt-1.5">
                  FOUNDER & PMC PROPRIETOR
                </span>
              </div>

              {/* Center Divider Line */}
              <div className="hidden md:block h-12 w-[2px] bg-orange-500/40 shrink-0" />

              {/* Right Side: Official Philosophy Quote from docx */}
              <div className="flex-1">
                <p className="text-xs sm:text-base font-medium text-neutral-200 italic leading-snug">
                  "A Tradition of Trust, Built with Quality. A project manager's job is not just to build, but to protect the client's money, time, and dream."
                </p>
              </div>

            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
