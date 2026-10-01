import React, { useState } from 'react';
import { Send, MessageCircle, Lock, Phone, Mail, Check } from 'lucide-react';

interface ContactSectionProps {
  theme?: 'white' | 'dark';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme = 'white' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sector: 'Individual Luxury Villa',
    location: '',
    area: '',
    brief: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
    setFormData({
      name: '',
      phone: '',
      email: '',
      sector: 'Individual Luxury Villa',
      location: '',
      area: '',
      brief: ''
    });
  };

  return (
    <section 
      id="contact" 
      className="text-neutral-900 py-16 md:py-24 px-4 sm:px-6 relative border-t border-neutral-200 bg-white select-none"
    >
      {/* Background Dot Matrix Layer */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(rgba(0,0,0,0.065)_1.2px,transparent_1.2px)] [background-size:26px_26px] z-0" 
      />

      <div className="max-w-6xl mx-auto relative z-30">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 relative z-30">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 max-w-3xl mx-auto leading-tight font-display">
            LET’S BUILD WITH QUALITY &amp; COMPLETE TRUST
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Discuss your site parameters directly with Principal Consultant Mr. Kiran Dikshit L and our senior civil engineering auditors.
          </p>
        </div>

        {/* Main Dual-Pane Consultation Card */}
        <div 
          id="consultationCard" 
          className="bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] border border-neutral-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-30"
        >
          
          {/* Left Column: Architectural Visual & Trust Proof */}
          <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 bg-neutral-950 text-white overflow-hidden min-h-[520px]">
            
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Villa Construction Project" 
                className="w-full h-full object-cover object-center filter brightness-60 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/75" />
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>

            {/* Top Metadata Badges */}
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 text-[11px] font-bold tracking-wider uppercase font-mono">
              <span className="text-[#ff6a00]">
                SELECTED WORKS &bull; BENGALURU HQ
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/85 backdrop-blur-md border border-neutral-700 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Site Desk Active
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ff5500] text-white font-extrabold text-[10px]">
                  25+ YRS
                </span>
              </div>
            </div>

            {/* Center Emblem & Slogan */}
            <div className="relative z-10 my-auto py-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-neutral-900/95 border border-orange-500/40 p-2 shadow-2xl shadow-orange-950/50 flex items-center justify-center mb-4 backdrop-blur-md">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#ff5500] fill-none stroke-current" strokeWidth="3">
                  <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="currentColor" fill="rgba(255,85,0,0.12)" />
                  <path d="M30 75 V45 L50 30 L70 45 V75" stroke="currentColor" />
                  <path d="M42 75 V55 H58 V75" stroke="currentColor" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                  <text x="50" y="87" fontSize="7.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fill="#ff772e" textAnchor="middle" stroke="none">CS ASSOCIATES</text>
                </svg>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                CS ASSOCIATES
              </h3>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-[#ff6a00] uppercase mt-1">
                A TRADITION OF TRUST &bull; PMC
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-xs mt-3 leading-relaxed font-normal">
                Comprehensive Project Management, Multi-Stage Civil Quality Audits &amp; Contractor Bill Verification.
              </p>
            </div>

            {/* Bottom Metric Cards */}
            <div className="relative z-10 grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/10 font-mono">
              <div className="bg-black/60 backdrop-blur-md py-2 px-1 rounded-lg border border-neutral-700/60">
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-200 block truncate">100% Quality Audits</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md py-2 px-1 rounded-lg border border-neutral-700/60">
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-200 block truncate">8%–15% Cost Savings</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md py-2 px-1 rounded-lg border border-neutral-700/60">
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-200 block truncate">Zero Snag Handover</span>
              </div>
            </div>

          </div>

          {/* Right Column: Schedule Site Consultation Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white relative z-30">
            <div>
              {/* Top Bar: CS Associates PMC badge on left, working hours on right */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#fff2eb] border border-[#ffcca8] flex items-center justify-center shadow-xs">
                    <span className="text-[10px] font-black text-[#ff5500]">CS</span>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-neutral-900">
                    CS ASSOCIATES PMC
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-medium whitespace-nowrap font-mono">
                  Mon – Sat &bull; 9 AM – 7:30 PM
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                Schedule Site Consultation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 mb-5 font-normal">
                Fill in your project details for an itemized feasibility analysis and PMC scope review.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Your Full Name <span className="text-[#ff5500]">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Lakshmi / Arvind Kumar"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Phone / WhatsApp Number <span className="text-[#ff5500]">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9845012345"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Project Sector
                    </label>
                    <select 
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white cursor-pointer"
                    >
                      <option value="Individual Luxury Villa">Individual Luxury Villa</option>
                      <option value="Commercial Complex / Office">Commercial Complex / Office</option>
                      <option value="Residential Apartment / Enclave">Residential Apartment / Enclave</option>
                      <option value="Hospitality & Resort">Hospitality & Resort</option>
                      <option value="Turnkey Interior / Renovation">Turnkey Interior / Renovation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Site Location (Bengaluru / Region)
                    </label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Abbigere / Kanakapura Rd / Whitefield"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Approximate Area (Sq.Ft.)
                    </label>
                    <input 
                      type="text" 
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g. 5,000 sq.ft."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-neutral-50/60 hover:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Project Brief or Current Site Status
                  </label>
                  <textarea 
                    rows={2.5} 
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    placeholder="Mention whether drawings are ready, contractor quotes being compared, or site excavation starting..."
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition resize-none bg-neutral-50/60 hover:bg-white"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff6a00] hover:from-[#e04c00] hover:to-[#eb5900] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all transform active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST CONSULTATION &amp; SITE AUDIT</span>
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-neutral-200" />
                  <span className="flex-shrink mx-3 text-neutral-400 text-xs lowercase">or</span>
                  <div className="flex-grow border-t border-neutral-200" />
                </div>

                <a 
                  href="https://wa.me/918296266389?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20schedule%20a%20site%20consultation." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-5 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>CHAT DIRECTLY ON WHATSAPP (+91 8296266389)</span>
                </a>

                <div className="pt-1 text-center flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-700 tracking-wider uppercase font-mono">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>STRICT CLIENT FIDUCIARY PRIVACY &bull; NO SUBCONTRACTOR LEAKS</span>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Footer Contacts */}
        <div className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-600 font-medium">
          <a href="tel:+918296266389" className="flex items-center gap-2 hover:text-[#ff5500] transition-colors">
            <Phone className="w-4 h-4 text-orange-500" />
            <span>+91 8296266389</span>
          </a>
          <a href="tel:+918086823483" className="flex items-center gap-2 hover:text-[#ff5500] transition-colors">
            <Phone className="w-4 h-4 text-orange-500" />
            <span>+91 8086823483</span>
          </a>
          <a href="mailto:csassociates321@gmail.com" className="flex items-center gap-2 hover:text-[#ff5500] transition-colors">
            <Mail className="w-4 h-4 text-orange-500" />
            <span>csassociates321@gmail.com</span>
          </a>
        </div>

      </div>

      {/* Toast Confirmation */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 transition-all duration-300 pointer-events-none">
          <div className="bg-neutral-900 border border-neutral-700 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Consultation Request Received!</p>
              <p className="text-xs text-neutral-400">Our civil engineering auditor will contact you shortly.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
