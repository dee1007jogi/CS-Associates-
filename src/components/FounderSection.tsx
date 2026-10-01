import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, PhoneCall, Globe, MessageCircle, Mail, Award, CheckCircle2, ArrowUpRight, RotateCcw } from 'lucide-react';
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
  const [isUnrolled, setIsUnrolled] = useState(false);
  const [cylinderTop, setCylinderTop] = useState('0%');
  const [cylinderOpacity, setCylinderOpacity] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const sheetWrapperRef = useRef<HTMLDivElement>(null);

  const unrollSheet = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    setCylinderTop('0%');
    setCylinderOpacity(1);
    setIsUnrolled(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsUnrolled(true);
        setCylinderTop('100%');

        setTimeout(() => {
          setCylinderOpacity(0);
          setIsRolling(false);
        }, 3950);
      }, 140);
    });
  }, [isRolling]);

  const rollUpSheet = useCallback((callback?: () => void) => {
    if (isRolling) return;
    setIsRolling(true);
    setCylinderOpacity(1);
    setCylinderTop('100%');

    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsUnrolled(false);
        setCylinderTop('0%');

        setTimeout(() => {
          setIsRolling(false);
          if (callback) callback();
        }, 3650);
      }, 100);
    });
  }, [isRolling]);

  useEffect(() => {
    const el = sheetWrapperRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            unrollSheet();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [unrollSheet]);

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
            
            {/* LEFT HALF: Deep Obsidian & Walnut Wood Column with Founder Portrait */}
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

            {/* RIGHT HALF: Architectural Rolled Sheet Unfurl */}
            <div 
              ref={sheetWrapperRef}
              className="lg:col-span-6 relative sheet-wrapper bg-white flex flex-col justify-between overflow-hidden"
            >
              {/* Dynamic 3D Roller Rod / Paper Cylinder that rolls down along the sheet edge */}
              <div 
                className="roll-cylinder pointer-events-none"
                style={{
                  top: cylinderTop,
                  opacity: cylinderOpacity
                }}
              >
                {/* Rotating surface sheen simulating rolling motion */}
                <div className="roll-cylinder-surface" />
                {/* Trailing Paper Curl Soft Shadow */}
                <div className="roll-curl-shadow" />
                {/* Architectural Turned Copper Caps */}
                <div className="roll-cylinder-cap-left" />
                <div className="roll-cylinder-cap-right" />
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-white/50" />
              </div>

              {/* Main Rolled Sheet Card */}
              <div 
                className={`rolled-sheet ${isUnrolled ? 'is-unrolled' : 'is-rolled'} w-full h-full relative overflow-hidden bg-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-neutral-900`}
              >
                {/* Background Dot Pattern (Top & Right) */}
                <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_65%_60%_at_85%_25%,#000_30%,transparent_100%)]" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-100/40 via-transparent to-stone-200/30" />

                {/* Inner Sheet Content */}
                <div className="sheet-content relative z-10 flex flex-col justify-between h-full space-y-6">
                  
                  {/* Top Header Row with Re-Roll trigger & Action Icons */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <button
                      onClick={() => rollUpSheet(() => setTimeout(unrollSheet, 200))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer shadow-sm"
                      title="Replay Architectural Unfurl Animation"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#f25400]" />
                      <span className="hidden sm:inline">Re-Roll Blueprint</span>
                    </button>

                    {/* Top Right Action Icons */}
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={onOpenConsultation}
                        aria-label="Direct Chat"
                        title="Direct Chat"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f25400] text-white flex items-center justify-center hover:bg-[#d94700] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </button>

                      <a 
                        href="mailto:csassociates321@gmail.com"
                        aria-label="Send Email"
                        title="Email Office"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-orange-200 bg-white text-[#f25400] flex items-center justify-center hover:bg-orange-50 hover:border-[#f25400] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Mail className="w-5 h-5" />
                      </a>

                      <a 
                        href="tel:+918296266389"
                        aria-label="Call Office"
                        title="Direct Call"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-orange-200 bg-white text-[#f25400] flex items-center justify-center hover:bg-orange-50 hover:border-[#f25400] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <PhoneCall className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Main Title Group */}
                  <div className="space-y-3 my-auto py-2">
                    <div className="space-y-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-none">
                        Civil &amp; PMC
                      </h2>
                      <div className="inline-block">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-[#f25400] text-white text-sm sm:text-base font-bold tracking-wider uppercase orange-badge-glow">
                          EXPERT
                        </span>
                      </div>
                    </div>

                    <p className="text-stone-700 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl pt-2">
                      Under the personal stewardship of <strong className="text-neutral-900 font-bold">Mr. Kiran Dikshit L</strong> with over <strong className="text-[#f25400] font-bold">25+ years</strong> of hands-on civil &amp; architectural PMC mastery across residential villas, commercial complexes, and healthcare projects.
                    </p>

                    {/* Trust Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 max-w-2xl py-3 text-stone-700 text-sm sm:text-base font-medium">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#f25400]" />
                        <span>300K+ Sq.Ft. Constructed</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#f25400]" />
                        <span>8%–15% Direct Savings</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#f25400]" />
                        <span>7-Stage Civil Governance</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#f25400]" />
                        <span>Zero-Leakage Handover</span>
                      </div>
                    </div>

                    {/* Schedule Consultation Button */}
                    <div className="pt-2">
                      <button 
                        onClick={onOpenConsultation}
                        type="button"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-[#f25400] text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase orange-glow hover:bg-[#d94700] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                      >
                        <span>SCHEDULE A CONSULTATION</span>
                        <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Footer Info & WhatsApp Trigger */}
                  <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 relative">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center border border-orange-200">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          csassociates321@gmail.com
                        </div>
                        <div className="text-xs font-bold text-[#f25400] uppercase tracking-wider font-mono">
                          BENGALURU HEADQUARTERS
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://wa.me/918296266389?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20consult%20for%20my%20construction%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>

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
