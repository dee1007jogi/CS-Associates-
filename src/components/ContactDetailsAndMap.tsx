import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Train,
  Car,
  Compass,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowUpRight,
  Globe,
  Plane,
  CheckCircle2,
  CheckSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const fullAddress = '1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar, Bengaluru 560098';
const primaryPhone = '+91 8095823483';
const secondaryPhone = '+91 8296266389';
const emailAddress = 'csassociates321@gmail.com';
const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

// ========================================================
// 1. FOUR CONTACT CARDS COMPONENT (CLEAN WHITE THEME)
// ========================================================
export const ContactCards: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const handleWhatsAppChat = () => {
    const text = 'Hello CS Associates, I would like to consult with Mr. Kiran Dikshit L regarding PMC and site management for my project.';
    window.open(`https://wa.me/918095823483?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">

      {/* ======================================================== */}
      {/* 4 CORE CONTACT CARDS (CRISP WHITE DESIGN)                */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* Card 1: Direct Calling Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-orange-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                Direct Advisory
              </div>
              <h3 className="text-lg font-bold text-neutral-950 font-display mt-0.5">
                Principal Support
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Direct line to Mr. Kiran Dikshit L &amp; senior civil audit engineers.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/70 transition-colors">
                <a
                  href="tel:8095823483"
                  className="text-xs sm:text-sm font-mono font-bold text-neutral-900 hover:text-orange-600 transition-colors"
                >
                  {primaryPhone}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard('8095823483', 'phone1')}
                  className="p-1.5 rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                  title="Copy Primary Number"
                >
                  {copiedField === 'phone1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/70 transition-colors">
                <a
                  href="tel:8296266389"
                  className="text-xs sm:text-sm font-mono font-bold text-neutral-800 hover:text-orange-600 transition-colors"
                >
                  {secondaryPhone}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard('8296266389', 'phone2')}
                  className="p-1.5 rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                  title="Copy Secondary Number"
                >
                  {copiedField === 'phone2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>Hours: 9 AM – 7:30 PM</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Card 2: WhatsApp Desk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 font-bold">
                Instant Messaging
              </div>
              <h3 className="text-lg font-bold text-neutral-950 font-display mt-0.5">
                WhatsApp Desk
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Fastest way to share site drawings, BOQ, or contractor quotes.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider font-mono text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Response in ~20 Mins</span>
              </div>
              <p className="text-[11px] text-emerald-800/80 mt-1 leading-relaxed">
                Send blueprints, photos, or GPS locations directly.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </motion.div>

        {/* Card 3: Corporate Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-orange-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                Official Proposals
              </div>
              <h3 className="text-lg font-bold text-neutral-950 font-display mt-0.5">
                Corporate Email
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                For RFP submissions, developer tender audits &amp; vendor scopes.
              </p>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/70 transition-colors">
              <span className="text-xs font-mono font-bold text-neutral-900 truncate pr-1">
                {emailAddress}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(emailAddress, 'email')}
                className="p-1.5 rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-800 transition-colors shrink-0 cursor-pointer"
                title="Copy Email Address"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-neutral-100">
            <a
              href={`mailto:${emailAddress}?subject=${encodeURIComponent('PMC Inquiry - CS Associates')}`}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-900 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>Send Official Email</span>
            </a>
          </div>
        </motion.div>

        {/* Card 4: Office Location & Timings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-orange-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                Bengaluru HQ
              </div>
              <h3 className="text-lg font-bold text-neutral-950 font-display mt-0.5">
                Head Office &amp; Studio
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                BEML Layout 5th Stage, Rajarajeshwarinagar, Bengaluru 560098.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-700 font-mono">
              <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-neutral-100">
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface LocationPin {
  name: string;
  region: 'karnataka' | 'tamilnadu' | 'telangana' | 'bengaluru' | 'pan-india';
  state: string;
  badge?: string;
  featured?: boolean;
}

const REGION_TABS = [
  { id: 'all', label: 'All India (40+ Locations)' },
  { id: 'karnataka', label: 'Karnataka (Mysore, Tumkur...)' },
  { id: 'tamilnadu', label: 'Tamil Nadu (Chennai, Coimbatore...)' },
  { id: 'telangana', label: 'Telangana & AP (Hyderabad...)' },
  { id: 'bengaluru', label: 'Bengaluru Core (HQ)' },
  { id: 'pan-india', label: 'Pan-India Metros' },
] as const;

type RegionFilter = typeof REGION_TABS[number]['id'];

const PAN_INDIA_LOCATIONS: LocationPin[] = [
  // Karnataka Regional Hubs (Mysore, Tumkur...)
  { name: 'Mysore (Mysuru)', region: 'karnataka', state: 'Karnataka', badge: 'Active PMC Sites', featured: true },
  { name: 'Tumkur (Tumakuru)', region: 'karnataka', state: 'Karnataka', badge: 'Active Projects', featured: true },
  { name: 'Mangalore (Mangaluru)', region: 'karnataka', state: 'Karnataka', badge: 'Coastal PMC' },
  { name: 'Hubli-Dharwad', region: 'karnataka', state: 'Karnataka' },
  { name: 'Belgaum (Belagavi)', region: 'karnataka', state: 'Karnataka' },
  { name: 'Shimoga (Shivamogga)', region: 'karnataka', state: 'Karnataka' },
  { name: 'Hassan', region: 'karnataka', state: 'Karnataka' },
  { name: 'Mandya', region: 'karnataka', state: 'Karnataka' },
  { name: 'Udupi & Manipal', region: 'karnataka', state: 'Karnataka' },

  // Tamil Nadu (Chennai, Coimbatore, Hosur...)
  { name: 'Chennai', region: 'tamilnadu', state: 'Tamil Nadu', badge: 'Major Metro Hub', featured: true },
  { name: 'Coimbatore', region: 'tamilnadu', state: 'Tamil Nadu', badge: 'Commercial & Villas', featured: true },
  { name: 'Hosur', region: 'tamilnadu', state: 'Tamil Nadu', badge: 'Border Corridor' },
  { name: 'Madurai', region: 'tamilnadu', state: 'Tamil Nadu' },
  { name: 'Salem', region: 'tamilnadu', state: 'Tamil Nadu' },
  { name: 'Tiruchirappalli (Trichy)', region: 'tamilnadu', state: 'Tamil Nadu' },
  { name: 'Vellore', region: 'tamilnadu', state: 'Tamil Nadu' },

  // Telangana & Andhra Pradesh (Hyderabad...)
  { name: 'Hyderabad', region: 'telangana', state: 'Telangana', badge: 'Major PMC Hub', featured: true },
  { name: 'Cyberabad & HITEC City', region: 'telangana', state: 'Telangana', badge: 'High-Rise & Luxury' },
  { name: 'Gachibowli & Financial District', region: 'telangana', state: 'Telangana' },
  { name: 'Secunderabad', region: 'telangana', state: 'Telangana' },
  { name: 'Warangal', region: 'telangana', state: 'Telangana' },
  { name: 'Visakhapatnam (Vizag)', region: 'telangana', state: 'Andhra Pradesh', badge: 'Coastal Infrastructure' },
  { name: 'Vijayawada', region: 'telangana', state: 'Andhra Pradesh' },

  // Bengaluru Core (Headquarters)
  { name: 'Rajarajeshwarinagar', region: 'bengaluru', state: 'Bengaluru HQ', badge: 'Head Office', featured: true },
  { name: 'Kanakapura Road', region: 'bengaluru', state: 'Bengaluru', badge: 'Luxury Villas' },
  { name: 'Sadashivanagar', region: 'bengaluru', state: 'Bengaluru', badge: 'Ultra-Luxury' },
  { name: 'Indiranagar', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Whitefield', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Sarjapur Road', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'JP Nagar & Jayanagar', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Banashankari', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Koramangala', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Hebbal & Yelahanka', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Electronic City & HSR Layout', region: 'bengaluru', state: 'Bengaluru' },
  { name: 'Devanahalli Airport Corridor', region: 'bengaluru', state: 'Bengaluru' },

  // Pan-India Metros
  { name: 'Mumbai & MMR', region: 'pan-india', state: 'Maharashtra', badge: 'NRI Estates' },
  { name: 'Pune', region: 'pan-india', state: 'Maharashtra' },
  { name: 'Delhi NCR & Gurugram', region: 'pan-india', state: 'Delhi NCR' },
  { name: 'Kochi & Trivandrum', region: 'pan-india', state: 'Kerala' },
  { name: 'Goa', region: 'pan-india', state: 'Goa', badge: 'Holiday Luxury Villas' },
  { name: 'Pan-India On-Demand Dispatch', region: 'pan-india', state: 'All Over India', badge: 'Anywhere in India', featured: true },
];

// ========================================================
// 2. GOOGLE MAPS & ACCESSIBILITY COMPONENT (WHITE THEME)
// ========================================================
export const ContactGoogleMaps: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* GOOGLE MAPS SHOWCASE & LOCATION HUB */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white rounded-[2.5rem] border border-neutral-200/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.08)] overflow-hidden mb-12 sm:mb-16"
      >
        {/* Header Bar of Map Section */}
        <div className="px-6 py-5 sm:px-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-neutral-950 font-display uppercase tracking-tight">
                  CS Associates Head Office Map
                </h3>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Location
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-sans">
                Rajarajeshwarinagar (RR Nagar), Bengaluru · Verified Coordinates
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => copyToClipboard(fullAddress, 'fullAddress')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {copiedField === 'fullAddress' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/25 active:scale-95"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">

          {/* Left: Google Maps Iframe */}
          <div className="lg:col-span-8 relative min-h-[380px] lg:min-h-[500px] w-full bg-neutral-100">
            <iframe
              title="CS Associates Bengaluru Office Google Map"
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.03] opacity-98"
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl text-xs max-w-sm">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-neutral-950 font-display">CS Associates PMC HQ</div>
                <div className="text-[11px] text-neutral-600 font-sans truncate">BEML Layout 5th Stage, RR Nagar</div>
              </div>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-orange-600 hover:text-orange-700 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Get Directions"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Studio Visiting & Transit Guide */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-neutral-50/70 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div className="space-y-5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                  Accessibility &amp; Transit
                </div>
                <h4 className="text-xl font-black text-neutral-950 font-display tracking-tight mt-0.5">
                  Plan Your Office Visit
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Located in the serene, wide-avenue BEML Layout of South-West Bengaluru with seamless connectivity.
                </p>
              </div>

              {/* Transit Options */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                    <Train className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-950 font-display">Namma Metro (Purple Line)</div>
                    <p className="text-[11px] text-neutral-600 mt-0.5">RR Nagar Metro Station is just 8 mins (~2.2 km) away. Auto &amp; cab stands available.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                  <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-950 font-display">By Road &amp; NICE Corridor</div>
                    <p className="text-[11px] text-neutral-600 mt-0.5">Quick access from Mysore Road, Kanakapura Road, and NICE Ring Road via RR Nagar 80-feet main double road.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-950 font-display">Free Client Parking &amp; Privacy</div>
                    <p className="text-[11px] text-neutral-600 mt-0.5">Dedicated visitor parking space. Confidential boardroom for project drawing discussions and contractor negotiation.</p>
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/90 shadow-sm space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  Official Postal Address:
                </div>
                <p className="text-xs text-neutral-800 font-sans leading-relaxed">{fullAddress}</p>
              </div>
            </div>

            {/* Navigation CTA */}
            <div className="pt-6 mt-4 border-t border-neutral-200">
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Turn-by-Turn Navigation</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* PAN-INDIA & ALL OVER INDIA PMC COVERAGE HUB              */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
      >
        {/* Subtle orange accent glow behind */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-orange-500/10 blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Globe className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          <span>Working All Over India · Pan-India On-Site Feasibility Inspections</span>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-950 font-display tracking-tight">
          Can't Make It To Our Office? We Visit Your Project Site Anywhere in India.
        </h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-neutral-600 max-w-3xl mx-auto mt-2 leading-relaxed">
          Headquartered in Bengaluru with rapid deployment across all of India. Our senior civil engineers and Principal Consultant <strong className="text-neutral-900 font-semibold">Mr. Kiran Dikshit L</strong> conduct on-site inspections, PMC audits, and quality governance across <strong className="text-orange-600 font-semibold">Mysore, Tumkur, Tamil Nadu (Chennai), Hyderabad</strong>, and all premier regions nationwide within 24–48 hours.
        </p>

        {/* Interactive Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 p-1.5 bg-neutral-100/80 border border-neutral-200/90 rounded-2xl max-w-3xl mx-auto">
          {REGION_TABS.map((tab) => {
            const isActive = selectedRegion === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filtered Location Pins Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-6 max-w-5xl mx-auto min-h-[140px] items-center">
          {PAN_INDIA_LOCATIONS
            .filter((loc) => selectedRegion === 'all' || loc.region === selectedRegion)
            .map((loc) => (
              <div
                key={loc.name}
                className={`group px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                  loc.featured
                    ? 'bg-orange-50/70 border-orange-300/80 text-neutral-900 shadow-xs hover:border-orange-500 hover:bg-orange-50'
                    : 'bg-neutral-50 border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:border-orange-500/40 hover:bg-white'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 shrink-0 ${loc.featured ? 'text-orange-600' : 'text-neutral-400 group-hover:text-orange-500'}`} />
                <span className="font-semibold">{loc.name}</span>
                {loc.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                    loc.featured
                      ? 'bg-orange-500 text-white'
                      : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    {loc.badge}
                  </span>
                )}
              </div>
            ))}
        </div>

        {/* 3 Nationwide Service Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-neutral-200/80 text-left">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
            <div className="flex items-center gap-2 text-neutral-950 font-bold text-xs font-display">
              <Car className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Karnataka Hubs (Mysore, Tumkur)</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
              Same-day & 24h rapid on-site civil engineer dispatch. We conduct physical site audits, soil tests, and contractor bill measurements across Karnataka.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
            <div className="flex items-center gap-2 text-neutral-950 font-bold text-xs font-display">
              <Plane className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Inter-State PMC (Chennai, Hyderabad)</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
              Dedicated PMC audit teams deployed for luxury villa layouts, multi-specialty hospitals, and commercial developments across Tamil Nadu, Telangana, and Pan-India.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
            <div className="flex items-center gap-2 text-neutral-950 font-bold text-xs font-display">
              <CheckSquare className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Remote NRI & Out-of-State Governance</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
              WhatsApp Daily Progress Reports (DPR), high-res photo/video logs, and laser bill reconciliation—ideal for NRI owners and out-of-state developers.
            </p>
          </div>
        </div>

        {/* WhatsApp Quick Dispatch Action */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20am%20planning%20a%20project%20and%20need%20an%20on-site%20PMC%20feasibility%20inspection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request On-Site Inspection Anywhere in India</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// ========================================================
// COMBINED WRAPPER (FOR RETRO-COMPATIBILITY)
// ========================================================
export const ContactDetailsAndMap: React.FC = () => {
  return (
    <div className="w-full bg-[#f4f5f7] border-t border-neutral-200">
      <ContactCards />
      <ContactGoogleMaps />
    </div>
  );
};