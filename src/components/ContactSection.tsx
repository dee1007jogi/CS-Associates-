import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  theme?: 'dark' | 'white';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Luxury Residential Villa',
    location: '',
    area: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Hello CS Associates,%0A%0AMy Name: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email || 'N/A'}%0AProject Sector: ${formData.projectType}%0ALocation: ${formData.location || 'Bengaluru'}%0AApprox Area: ${formData.area || 'N/A'}%0AMessage: ${formData.message || 'I would like to schedule a PMC consultation.'}`;
    window.open(`https://wa.me/918296266389?text=${text}`, '_blank');
  };

  const inputClass = isDark
    ? "w-full rounded-xl px-4 py-2.5 text-xs bg-neutral-950 border border-neutral-800 focus:bg-neutral-950 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-neutral-100 placeholder:text-neutral-500 transition-all outline-none"
    : "w-full rounded-xl px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-neutral-900 transition-all outline-none";

  const labelClass = isDark
    ? "block text-xs font-semibold text-neutral-300 mb-1 font-sans"
    : "block text-xs font-semibold text-neutral-700 mb-1 font-sans";

  return (
    <section 
      id="contact" 
      className={`py-16 sm:py-24 lg:py-28 relative overflow-hidden select-none transition-colors duration-300 ${
        isDark 
          ? 'bg-neutral-950 text-neutral-100 border-t border-neutral-850' 
          : 'bg-white text-neutral-900 border-t border-neutral-200'
      }`}
    >
      {/* Background Architectural Grid Pattern */}
      <div 
        aria-hidden="true" 
        className={`absolute inset-0 pointer-events-none [background-size:24px_24px] ${
          isDark 
            ? 'opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)]' 
            : 'opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)]'
        }`} 
      />

      {isDark && (
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none"
        />
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (ENTRANCE FROM TOP) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest shadow-sm ${
            isDark 
              ? 'bg-neutral-900/90 border border-neutral-800 text-orange-400' 
              : 'bg-orange-500/10 border border-orange-500/25 text-orange-600'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>DIRECT PMC ENGAGEMENT DESK</span>
          </div>

          <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display uppercase ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            LET’S BUILD WITH QUALITY & COMPLETE TRUST
          </h2>

          <p className={`mt-2 text-sm sm:text-base font-sans max-w-2xl mx-auto ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Discuss your site parameters directly with Principal Consultant Mr. Kiran Dikshit L and our senior civil engineering auditors.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* MAIN UNIFIED CARD CONTAINER                               */}
        {/* ======================================================== */}
        <div className={`w-full rounded-[2.5rem] overflow-hidden transition-all duration-300 ${
          isDark 
            ? 'bg-neutral-900/95 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] border border-neutral-800' 
            : 'bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.08)] border border-neutral-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN: Relevant Luxury Estate Visual + Brand Logo (ENTRANCE FROM LEFT) */}
            {/* ======================================================== */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 text-white min-h-[420px] lg:min-h-full"
            >
              
              {/* High-Resolution Luxury Architectural Background */}
              <img
                src="/src/assets/images/opulence_kanakapura_1790599663999.jpg"
                alt="CS Associates Delivered Luxury Estate"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 hover:scale-105"
              />

              {/* Rich Multi-Layer Gradient Overlay for Optimal Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/40 pointer-events-none" />
              <div 
                aria-hidden="true" 
                className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px]" 
              />

              {/* Top Bar over Image */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-orange-400 uppercase">
                  <span>Selected Works</span>
                  <span>·</span>
                  <span className="text-white/80">Bengaluru HQ</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Site Desk Active</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-orange-500 text-white font-black text-[10px] font-mono tracking-wider shadow-sm">
                    25+ YRS
                  </div>
                </div>
              </div>

              {/* Center Focal Point: Brand Logo & Title on Image */}
              <div className="relative z-10 my-auto py-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-md p-3.5 border border-white/25 shadow-2xl mb-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img
                    src="/src/assets/images/cs_logo_transparent.png"
                    alt="CS Associates Official Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display uppercase tracking-tight">
                  CS ASSOCIATES
                </h3>
                
                <p className="text-xs sm:text-sm text-orange-400 font-mono tracking-widest uppercase mt-1 font-semibold">
                  A Tradition of Trust · PMC
                </p>

                <div className="w-14 h-0.5 bg-orange-500 my-3 rounded-full" />

                <p className="text-xs sm:text-sm text-neutral-200 max-w-sm leading-relaxed font-sans">
                  Comprehensive Project Management, Multi-Stage Civil Quality Audits & Contractor Bill Verification.
                </p>

                {/* Key Deliverables Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200">
                    100% Quality Audits
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200">
                    8%–15% Cost Savings
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200">
                    Zero Snag Handover
                  </span>
                </div>
              </div>

              {/* Bottom Bar: Founder Avatar Badge */}
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 shadow-lg shrink-0">
                    <img
                      src="/src/assets/images/kiran_dikshit_founder.jpg"
                      alt="Mr. Kiran Dikshit L"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">
                      Kiran Dikshit L
                    </div>
                    <div className="text-xs text-neutral-300 font-sans">
                      Principal Consultant & Founder
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <span>Bengaluru, KA</span>
                </div>
              </div>

            </motion.div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: Consultation Form (ENTRANCE FROM RIGHT)    */}
            {/* ======================================================== */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between transition-colors duration-300 ${
                isDark 
                  ? 'bg-neutral-900 border-t lg:border-t-0 lg:border-l border-neutral-800' 
                  : 'bg-white'
              }`}
            >
              
              {/* Header with Mini Brand Tag */}
              <div className={`flex items-center justify-between pb-4 border-b ${
                isDark ? 'border-neutral-800' : 'border-neutral-100'
              }`}>
                <div className="flex items-center gap-2.5">
                  <img
                    src="/src/assets/images/cs_logo_transparent.png"
                    alt="CS Associates"
                    className="w-7 h-7 object-contain"
                  />
                  <span className={`font-extrabold font-display text-sm tracking-tight uppercase ${
                    isDark ? 'text-white' : 'text-neutral-950'
                  }`}>
                    CS Associates PMC
                  </span>
                </div>

                <span className={`text-[11px] font-mono ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Mon – Sat · 9 AM – 7:30 PM
                </span>
              </div>

              {/* Form Content / Submission State */}
              <div className="py-6">
                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                      isDark 
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className={`text-2xl font-black font-display ${
                      isDark ? 'text-white' : 'text-neutral-950'
                    }`}>
                      Consultation Request Received
                    </h3>

                    <p className={`text-sm max-w-md mx-auto leading-relaxed font-sans ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      Thank you, <strong className={isDark ? 'text-white' : 'text-neutral-950'}>{formData.name}</strong>. Mr. Kiran Dikshit L and our lead civil engineers will review your project parameters and contact you at <strong className={isDark ? 'text-white' : 'text-neutral-950'}>{formData.phone}</strong> within 4 business hours.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleSendToWhatsApp}
                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Forward Details to WhatsApp</span>
                      </button>

                      <button
                        onClick={() => setSubmitted(false)}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer font-mono ${
                          isDark 
                            ? 'text-neutral-300 bg-neutral-800 hover:bg-neutral-700' 
                            : 'text-neutral-700 bg-neutral-100 hover:bg-neutral-200'
                        }`}
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${
                        isDark ? 'text-white' : 'text-neutral-950'
                      }`}>
                        Schedule Site Consultation
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 font-sans ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Fill in your project details for an itemized feasibility analysis and PMC scope review.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div>
                        <label className={labelClass}>
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Lakshmi / Arvind Kumar"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 9845012345"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. client@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Project Sector
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Luxury Residential Villa">Individual Luxury Villa</option>
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Independent Home">Independent Family Residence</option>
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Commercial Complex">Commercial / Office Complex</option>
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Healthcare Facility">Healthcare / Hospital Facility</option>
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Joint Development">Joint Development Landowner PMC</option>
                          <option className={isDark ? "bg-neutral-900 text-neutral-100" : ""} value="Interior PMC">Luxury Interior PMC & Finishing</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>
                          Site Location (Bengaluru / Region)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Abbigere / Kanakapura Rd / Whitefield"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Approximate Area (Sq.Ft.)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 5,000 sq.ft."
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Project Brief or Current Site Status
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Mention whether drawings are ready, contractor quotes being compared, or site excavation starting..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Primary Orange Submit Button */}
                    <div className="pt-2 space-y-2.5">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Consultation & Site Audit</span>
                      </button>

                      {/* "or" divider */}
                      <div className="flex items-center gap-3">
                        <div className={`h-[1px] flex-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                        <span className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>or</span>
                        <div className={`h-[1px] flex-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                      </div>

                      {/* Direct WhatsApp Action Button */}
                      <button
                        type="button"
                        onClick={handleSendToWhatsApp}
                        className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-mono transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                          isDark
                            ? 'bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-400'
                            : 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800'
                        }`}
                      >
                        <MessageCircle className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span>Chat Directly on WhatsApp (+91 8296266389)</span>
                      </button>
                    </div>

                    <div className={`text-[10px] text-center font-mono pt-1 ${
                      isDark ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      🔒 STRICT CLIENT FIDUCIARY PRIVACY · NO SUBCONTRACTOR LEAKS
                    </div>
                  </form>
                )}
              </div>

              {/* Bottom Quick Contact Bar & Socials (ENTRANCE FROM BOTTOM) */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`pt-4 border-t flex flex-col gap-3 text-xs ${
                  isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-600'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="tel:8296266389" className={`transition-colors flex items-center gap-1 font-mono font-medium ${
                      isDark ? 'text-neutral-300 hover:text-orange-400' : 'text-neutral-700 hover:text-orange-600'
                    }`}>
                      <Phone className="w-3.5 h-3.5 text-orange-500" />
                      <span>+91 8296266389</span>
                    </a>
                    <a href="tel:8095823483" className={`transition-colors flex items-center gap-1 font-mono font-medium ${
                      isDark ? 'text-neutral-300 hover:text-orange-400' : 'text-neutral-700 hover:text-orange-600'
                    }`}>
                      <Phone className="w-3.5 h-3.5 text-orange-500" />
                      <span>+91 8095823483</span>
                    </a>
                    <a href="mailto:csassociates321@gmail.com" className={`transition-colors flex items-center gap-1 font-mono font-medium ${
                      isDark ? 'text-neutral-300 hover:text-orange-400' : 'text-neutral-700 hover:text-orange-600'
                    }`}>
                      <Mail className="w-3.5 h-3.5 text-orange-500" />
                      <span className="hidden sm:inline">csassociates321@gmail.com</span>
                      <span className="sm:hidden">Email</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/csassociates_blr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isDark 
                          ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60' 
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      }`}
                      title="Instagram @csassociates_blr"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isDark 
                          ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60' 
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      }`}
                      title="Facebook"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className={`flex items-center justify-between gap-2 pt-2 border-t text-[11px] ${
                  isDark ? 'border-neutral-800/80 text-neutral-400' : 'border-neutral-100 text-neutral-500'
                }`}>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar, Bengaluru 560098</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1678+NISARGA+4th+Cross+5th+Stage+First+Phase+BEML+Layout+Rajarajeshwarinagar+Bengaluru+560098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono font-semibold shrink-0 flex items-center gap-1 hover:underline ${
                      isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
                    }`}
                  >
                    <span>View Map</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
