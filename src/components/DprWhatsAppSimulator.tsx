import React, { useState } from 'react';
import { 
  MessageCircle, 
  CheckCheck, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Camera, 
  FileCheck, 
  MapPin, 
  HardHat, 
  FileText, 
  Play, 
  Pause,
  PhoneCall, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Smile, 
  Sparkles,
  TrendingUp,
  Sliders,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DprUpdate {
  day: number;
  date: string;
  project: string;
  shortName: string;
  location: string;
  gpsCoords: string;
  weather: string;
  stage: string;
  engineer: string;
  engineerRole: string;
  engineerAvatar: string;
  message: string;
  image: string;
  voiceNoteDuration: string;
  pdfAttachment: {
    name: string;
    size: string;
    pages: string;
  };
  metrics: {
    label: string;
    value: string;
    status: string;
  }[];
  checklist: string[];
  billingAudit: string;
  savingsAmount: string;
  savingsReason: string;
}

const SAMPLE_DPRS: DprUpdate[] = [
  {
    day: 42,
    date: 'Wednesday, 24th Oct 2024',
    project: 'Dr Lakshmi Residence, Abbigere',
    shortName: 'Dr Lakshmi Residence',
    location: 'Abbigere, North Bengaluru',
    gpsCoords: '13.0645° N, 77.5273° E',
    weather: '28°C · Ideal Curing Humidity 54%',
    stage: 'Substructure & Triple-Layer Waterproofing',
    engineer: 'Er. Rajesh M.',
    engineerRole: 'Resident Structural PMC',
    engineerAvatar: 'RM',
    message: 'Good evening Ma\'am. Today\'s 72-hour water ponding test for the basement retaining wall and sump tank concluded with ZERO seepage. M25 grade concrete cube samples collected for 7-day lab compression test.',
    image: '/src/assets/images/residence_abbigere_1790599648176.jpg',
    voiceNoteDuration: '0:42',
    pdfAttachment: {
      name: 'M25_Concrete_Cube_7Day_Compression_Audit.pdf',
      size: '1.4 MB',
      pages: '3 Pages · NABL Certified'
    },
    metrics: [
      { label: 'Ponding Test Seepage', value: '0.0 mm', status: 'Passed (72h)' },
      { label: 'Rebar Spacing Deviation', value: '< 2.0 mm', status: 'Compliant' },
      { label: 'Slump Flow Consistency', value: '115 mm', status: 'Optimal' }
    ],
    checklist: [
      'Ponding test: 72 hrs elapsed - 0 drop in water level',
      'Structural steel rebar spacing checked against drawing #ST-04',
      'Concrete vibrator compaction witnessed throughout pour'
    ],
    billingAudit: 'Cross-verified steel consignment bill #219: detected 380 kg excess billing over bar bending schedule.',
    savingsAmount: '₹24,700',
    savingsReason: 'BBS Steel Excess Billing Protected'
  },
  {
    day: 118,
    date: 'Tuesday, 14th Jan 2025',
    project: 'Site No 12 Opulence, Kanakapura Road',
    shortName: 'Site No 12 Opulence',
    location: 'Kanakapura Road, South Bengaluru',
    gpsCoords: '12.8719° N, 77.5451° E',
    weather: '26°C · Clear Sky · 58% RH',
    stage: 'Cantilever Slab Shuttering & MEP Conduit Routing',
    engineer: 'Er. Sandeep K.',
    engineerRole: 'Senior Quality & MEP PMC',
    engineerAvatar: 'SK',
    message: 'Sir, update on Opulence site: Cantilever slab shuttering level checked with Leica laser level instrument. Zero deflection detected. Electrical conduits for smart automation routed before rebar closure.',
    image: '/src/assets/images/opulence_kanakapura_1790599663999.jpg',
    voiceNoteDuration: '0:38',
    pdfAttachment: {
      name: 'Laser_Deflection_Audit_Cantilever_Slab.pdf',
      size: '2.1 MB',
      pages: '4 Pages · Laser Calibrated'
    },
    metrics: [
      { label: 'Laser Cantilever Deflection', value: '0.0 mm', status: '18ft Span Pass' },
      { label: 'Conduit Voltage Segregation', value: '100% OK', status: 'Fire-Safe' },
      { label: 'Soil Stack Pressure', value: '5.0 Bar', status: 'Zero Drop' }
    ],
    checklist: [
      'Laser level deviation: 0.0mm across 18ft cantilever span',
      'Automation low-voltage cables segregated from 230V mains',
      'Plumbing soil stack pressure tested at 5 bar'
    ],
    billingAudit: 'Contractor claimed 180 running meters conduit; actual physical joint measurement was 142 meters.',
    savingsAmount: '₹31,200',
    savingsReason: 'Conduit Over-Measurement Deduction'
  },
  {
    day: 196,
    date: 'Friday, 18th Apr 2025',
    project: 'Indiranagar Specialty Center',
    shortName: 'Indiranagar Specialty Center',
    location: '100ft Road, Indiranagar, East Bengaluru',
    gpsCoords: '12.9784° N, 77.6408° E',
    weather: '29°C · HVAC Balanced · Low Dust',
    stage: 'NABH Airflow Validation & Anti-Bacterial Finishes',
    engineer: 'Er. Kiran Dikshit L',
    engineerRole: 'Principal Project Director',
    engineerAvatar: 'KD',
    message: 'Doctor, site inspection completed with the NABH biomedical consultant. HEPA filter housings sealed in OT cleanroom. Medical gas pipeline manifold lines hydro-tested successfully at 12 kg/cm² pressure.',
    image: '/src/assets/images/healthcare_commercial_1790599676109.jpg',
    voiceNoteDuration: '0:54',
    pdfAttachment: {
      name: 'NABH_OT_Airflow_MGPS_Pressure_Cert.pdf',
      size: '3.4 MB',
      pages: '8 Pages · Biomedical Signed'
    },
    metrics: [
      { label: 'MGPS Hydrostatic Pressure', value: '12 kg/cm²', status: 'Certified Pass' },
      { label: 'HEPA Housing Seal Leakage', value: '0.00%', status: 'NABH Grade A' },
      { label: 'Vinyl Coved Mitre Seams', value: '100% Flush', status: 'Infection-Safe' }
    ],
    checklist: [
      'MGPS oxygen & vacuum line pressure integrity verified',
      'Anti-bacterial coved vinyl flooring mitre joints inspected',
      'Fire hydrant flow pressure verified at roof manifold'
    ],
    billingAudit: 'Audited medical HVAC ducting invoice against actual sheet gauge thickness. Prevented sub-gauge substitution claim.',
    savingsAmount: '₹78,000',
    savingsReason: 'HVAC Gauge Sub-specification Blocked'
  }
];

export const DprWhatsAppSimulator: React.FC = () => {
  const [activeDprIndex, setActiveDprIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const currentDpr = SAMPLE_DPRS[activeDprIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#070b0e] border-y border-neutral-800/80 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Creative Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Total Operational Transparency · WhatsApp DPR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Zero Guesswork. Daily Evening{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-400">
              WhatsApp Reports.
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed text-balance">
            You don’t have to battle Bengaluru traffic or stand under scorching dust. Our certified engineers inspect your site daily, run laser level audits, cross-verify contractor bills, and deliver geotagged WhatsApp reports every single evening.
          </p>
        </div>

        {/* 12-Column Creative Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Site Deck & Engineering Telemetry (5 cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project Site Selector Deck */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-orange-500" />
                  <span>Select Active Bengaluru Site</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Live Dispatch
                </span>
              </div>

              <div className="space-y-2.5">
                {SAMPLE_DPRS.map((dpr, idx) => {
                  const isActive = activeDprIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveDprIndex(idx);
                        setIsPlayingAudio(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-neutral-800/90 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/40'
                          : 'bg-neutral-950/60 border-neutral-800/80 hover:bg-neutral-800/50 hover:border-neutral-700 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isActive
                              ? 'bg-orange-500 text-neutral-950'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {dpr.engineerAvatar}
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                            {dpr.shortName}
                          </h4>
                          <p className="text-[11px] text-neutral-400 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                            <span>{dpr.location}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          Day #{dpr.day}
                        </span>
                        <div className="text-[10px] text-neutral-500 mt-1 font-mono">
                          {isActive ? '● VIEWING' : 'CLICK TO AUDIT'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live PMC Telemetry & Quality Gauges Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-5">
              
              {/* Site metadata banner */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-orange-400" />
                    <span>GPS Telemetry & Ambient Sensor</span>
                  </div>
                  <div className="text-xs font-mono text-neutral-200 mt-1">
                    {currentDpr.gpsCoords}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {currentDpr.weather}
                  </span>
                </div>
              </div>

              {/* Physical Audit & Lab Quality Metrics */}
              <div>
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-orange-500" />
                  <span>On-Site Tolerance & Compliance Tests</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentDpr.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-3 flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <div className="mt-1">
                        <span className="text-base font-extrabold text-white font-mono">
                          {metric.value}
                        </span>
                        <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{metric.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Financial Savings Protection Callout */}
              <div className="bg-gradient-to-br from-orange-950/40 via-neutral-900 to-emerald-950/30 border border-orange-500/30 rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Verified Client Capital Protected</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono mt-1">
                      {currentDpr.savingsAmount}
                    </div>
                    <p className="text-xs text-neutral-300 mt-1 leading-snug">
                      {currentDpr.savingsReason}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>PMC Bill Cross-Audit Result:</span>
                  <span className="text-emerald-400 font-semibold">100% Contractor Approved</span>
                </div>
              </div>

              {/* WhatsApp Quick Action CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20reviewed%20the%20live%20WhatsApp%20DPR%20demo%20for%20${encodeURIComponent(currentDpr.project)}%20and%20want%20to%20know%20how%20this%20works%20for%20my%20plot.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Request Sample DPR on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: Realistic WhatsApp Smartphone Mockup (7 cols) ================= */}
          <div className="lg:col-span-7">
            
            {/* Device Outer Frame */}
            <div className="relative mx-auto w-full max-w-2xl bg-[#0c1317] border-4 border-neutral-700/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10">
              
              {/* Dynamic Island / Device Notch */}
              <div className="bg-[#121b22] px-6 py-2.5 flex items-center justify-between border-b border-neutral-800 text-[11px] text-neutral-400 select-none">
                <span className="font-semibold text-neutral-200">6:45 PM</span>
                <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-3 h-full bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* WhatsApp App Top Header */}
              <div className="bg-[#1F2C34] px-4 py-3 flex items-center justify-between text-white border-b border-[#2A3942] z-20 relative">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 border border-emerald-400/50 flex items-center justify-center font-bold text-white font-display text-sm shadow-inner">
                      CS
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1F2C34] rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        CS Associates PMC · Site Desk
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                      <span>{currentDpr.engineer}</span>
                      <span className="opacity-60">·</span>
                      <span className="text-[#8696A0]">{currentDpr.engineerRole}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <button title="Voice Call" className="p-1.5 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </button>
                  <button title="Video Call" className="p-1.5 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button title="Options" className="p-1.5 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* WhatsApp Chat Canvas */}
              <div className="p-4 sm:p-5 bg-[#0B141A] min-h-[580px] space-y-4 relative bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* Date Divider Chip */}
                <div className="flex justify-center">
                  <span className="bg-[#182229] text-[#8696A0] text-[11px] font-medium px-3.5 py-1 rounded-lg shadow-sm border border-neutral-800">
                    {currentDpr.date}
                  </span>
                </div>

                {/* Animated DPR Main Bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDprIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Incoming Official DPR Bubble */}
                    <div className="max-w-xl bg-[#202C33] rounded-2xl rounded-tl-sm p-4 text-neutral-100 shadow-xl border border-[#2A3942] space-y-3.5">
                      
                      {/* DPR Header Bar */}
                      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-neutral-700/60">
                        <span className="font-bold text-emerald-400 truncate max-w-[280px]">
                          {currentDpr.project}
                        </span>
                        <span className="bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 border border-orange-500/30">
                          Day #{currentDpr.day} DPR
                        </span>
                      </div>

                      <div className="text-xs text-neutral-400 font-medium">
                        Stage: <strong className="text-neutral-200">{currentDpr.stage}</strong>
                      </div>

                      {/* Geo-tagged Inspection Photo */}
                      <div className="rounded-xl overflow-hidden border border-neutral-700/80 relative group shadow-md">
                        <img
                          src={currentDpr.image}
                          alt="Site inspection capture"
                          className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                          <Camera className="w-3 h-3 text-orange-400" />
                          <span>GPS TIMESTAMPED · {currentDpr.location}</span>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>PMC Inspected</span>
                        </div>
                      </div>

                      {/* Audio Note Memo Simulation */}
                      <div className="bg-[#111B21] border border-neutral-800 rounded-xl p-3 flex items-center gap-3">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shrink-0 transition-colors shadow-md cursor-pointer"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-semibold text-neutral-200 truncate">
                              Voice Note · {currentDpr.engineer}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {currentDpr.voiceNoteDuration}
                            </span>
                          </div>
                          {/* Simulated audio waveform */}
                          <div className="flex items-center gap-0.5 h-4">
                            {[40, 70, 95, 30, 80, 50, 100, 65, 85, 45, 90, 75, 60, 90, 40, 80, 65, 95, 35, 70, 50, 85, 60, 40, 75, 90].map((h, i) => (
                              <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className={`w-1 rounded-full transition-all duration-300 ${
                                  isPlayingAudio && i < 14
                                    ? 'bg-emerald-400 animate-pulse'
                                    : 'bg-neutral-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300 flex items-center justify-center border border-neutral-700">
                            {currentDpr.engineerAvatar}
                          </div>
                          <Mic className="w-3 h-3 text-emerald-400 absolute -bottom-1 -right-1 bg-[#111B21] rounded-full p-0.5" />
                        </div>
                      </div>

                      {/* Observation Text */}
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                        {currentDpr.message}
                      </p>

                      {/* Verified Quality Checklist Box */}
                      <div className="bg-[#111B21] p-3 rounded-xl border border-neutral-800 space-y-2">
                        <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>PMC Site Quality Audit Checklist:</span>
                        </div>
                        <div className="space-y-1.5">
                          {currentDpr.checklist.map((chk, cIdx) => (
                            <div key={cIdx} className="text-xs text-neutral-300 flex items-start gap-2">
                              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                              <span className="leading-snug">{chk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lab Test PDF Attachment Card */}
                      <div className="bg-[#182229] border border-neutral-700/80 rounded-xl p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-100 truncate">
                              {currentDpr.pdfAttachment.name}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {currentDpr.pdfAttachment.size} · {currentDpr.pdfAttachment.pages}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-md shrink-0">
                          Verified
                        </span>
                      </div>

                      {/* Financial & Billing Audit Note */}
                      <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 leading-relaxed">
                        <strong className="text-emerald-200 font-semibold">💰 Billing Audit: </strong>
                        {currentDpr.billingAudit}
                      </div>

                      {/* Timestamp & read ticks */}
                      <div className="flex items-center justify-end gap-1.5 text-[10px] text-[#8696A0] pt-1">
                        <span>6:45 PM</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                      </div>
                    </div>

                    {/* Client Response Bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-md bg-[#005C4B] rounded-2xl rounded-tr-sm p-3.5 text-white shadow-md text-xs sm:text-sm space-y-1.5">
                        <p className="leading-snug">
                          Thank you {currentDpr.engineer.split(' ')[1] || 'Sir'} and CS Associates team! Amazing to see the zero-leak water test report and the verified bill savings. Please proceed with the slab formwork.
                        </p>
                        <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200">
                          <span>6:52 PM</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>

              {/* WhatsApp Mock Input Bar */}
              <div className="bg-[#1F2C34] px-3 py-2.5 flex items-center gap-2 border-t border-[#2A3942]">
                <button className="text-[#8696A0] hover:text-white p-1">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="text-[#8696A0] hover:text-white p-1">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 bg-[#2A3942] rounded-xl px-3.5 py-2 text-xs text-[#8696A0]">
                  Type a reply or question for Er. {currentDpr.engineer}...
                </div>
                <button className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shrink-0 transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="bg-[#121b22] px-4 py-2 text-center border-t border-neutral-800 text-[11px] text-neutral-400">
                🔒 Official CS Associates WhatsApp Site Channel · Encrypted & Daily Archived
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

