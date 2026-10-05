import React from 'react';
import { ArrowUp, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-16">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/src/assets/images/cs_logo_transparent.png" 
                alt="CS Associates Logo" 
                className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(221,108,2,0.4)] group-hover:scale-105 transition-transform" 
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display group-hover:text-orange-400 transition-colors">
                  CS ASSOCIATES
                </span>
                <span className="text-[9px] text-orange-400 uppercase tracking-widest font-mono font-semibold">
                  A TRADITION OF TRUST
                </span>
              </div>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Project Management Consultancy (PMC) for bespoke residential villas, commercial complexes, and healthcare infrastructure. Led by Mr. Kiran Dikshit L with 25+ years of verified on-site mastery.
            </p>
            <div className="text-xs text-[#f7f4ee]/90 italic">
              "A Tradition of Trust, Built with Quality."
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/csassociates_blr/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Mr. Kiran Dikshit L</Link></li>
              <li><Link to="/process" className="hover:text-orange-400 transition-colors">7-Stage PMC Framework</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition-colors">Core Disciplines</Link></li>
              <li><Link to="/projects" className="hover:text-orange-400 transition-colors">Featured Projects & Sites</Link></li>
              <li><Link to="/calculator" className="hover:text-orange-400 transition-colors">Cost & Savings Calculator</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Consultation Desk</Link></li>
            </ul>
          </div>

          {/* Services Scope */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              PMC Scope
            </div>
            <ul className="space-y-2 text-xs">
              <li>Turnkey Project Management</li>
              <li>Civil & Architectural Quality Audits</li>
              <li>Luxury Finishing & Detailing</li>
              <li>Contractor Bill Measurement Audits</li>
              <li>NABH Healthcare Compliance</li>
              <li>WhatsApp Daily DPR System</li>
            </ul>
          </div>

          {/* Office Contact */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Studio & Desk
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar, Bengaluru 560098
            </p>
            <div className="space-y-1 text-xs">
              <div>Phone: <a href="tel:8095823483" className="text-white hover:text-orange-400">8095823483</a></div>
              <div>Secondary: <a href="tel:8296266389" className="text-white hover:text-orange-400">8296266389</a></div>
              <div>Email: <a href="mailto:csassociates321@gmail.com" className="text-white hover:text-orange-400">csassociates321@gmail.com</a></div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} CS Associates. All rights reserved. Registered PMC in Bengaluru, Karnataka.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-orange-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};

