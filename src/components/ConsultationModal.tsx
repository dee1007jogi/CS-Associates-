import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('Luxury Villa');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello CS Associates,%0A%0AMy Name: ${name}%0APhone: ${phone}%0AProject Sector: ${sector}%0AEstimated Area: ${area || 'Not specified'}%0AI would like to schedule a PMC feasibility consultation with Mr. Kiran Dikshit L.`;
    window.open(`https://wa.me/918296266389?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md transition-all">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal / Bottom Sheet Container */}
      <div className="relative z-10 w-full sm:max-w-lg bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Mobile Native Drag Handle Bar */}
        <div className="sm:hidden w-10 h-1 bg-neutral-700 rounded-full mx-auto mb-4" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Consultation Scheduled
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Mr. Kiran Dikshit L has received your inquiry. We will connect with you at <strong className="text-white">{phone}</strong> shortly.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full h-12 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs rounded-xl transition-all cursor-pointer active:scale-98"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-500 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CS Associates PMC</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Book a PMC Feasibility Review
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Direct engagement with Principal Consultant Mr. Kiran Dikshit L.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 8296266389"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Project Sector
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Luxury Villa">Individual Luxury Villa</option>
                  <option value="Residential Home">Independent Home</option>
                  <option value="Commercial Complex">Commercial / Office</option>
                  <option value="Healthcare Facility">Healthcare Facility / Lab</option>
                  <option value="Joint Development">Joint Development PMC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Approx. Area (Sq.Ft.)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8,000 sq.ft."
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5 pb-safe">
              <button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Consultation Request</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full h-12 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect on WhatsApp Instantly</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
