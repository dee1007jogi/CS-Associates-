import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Eye, 
  Database, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Printer, 
  ArrowRight, 
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';
import { PageHero } from '../components/PageHero';

interface PrivacyPolicyPageProps {
  onOpenConsultation: () => void;
}

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onOpenConsultation }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const tableOfContents = [
    { id: 'overview', title: '1. Fiduciary Overview & Entity Scope' },
    { id: 'collection', title: '2. Information We Collect' },
    { id: 'purpose', title: '3. Legal Grounds & Purpose of Processing' },
    { id: 'zero-leak', title: '4. Zero-Leak Fiduciary Independence' },
    { id: 'security', title: '5. Technical Safeguards & Data Storage' },
    { id: 'retention', title: '6. Retention Schedules & Audit Trails' },
    { id: 'rights', title: '7. Your Rights under Indian DPDP Act 2023' },
    { id: 'cookies', title: '8. Cookies, LocalStorage & Calculator State' },
    { id: 'third-parties', title: '9. Third-Party Platforms (WhatsApp, Maps)' },
    { id: 'grievance', title: '10. Statutory Grievance & Compliance Officer' },
  ];

  return (
    <div className="w-full bg-neutral-950 min-h-screen text-neutral-100 selection:bg-orange-500 selection:text-white">
      {/* 1. Cinematic Page Hero */}
      <PageHero
        badge="Legal & Client Confidentiality Charter"
        title="Privacy Policy & Fiduciary"
        highlightedTitle="Data Governance"
        description="Our unyielding commitment to safeguarding your proprietary architectural blueprints, financial cost estimates, structural audit reports, and personal information under India's DPDP Act 2023."
        backgroundImage="/src/assets/images/about_hero_leadership.jpg"
        breadcrumbLabel="Privacy Policy"
        focusTag="FIDUCIARY CONFIDENTIALITY & DPDP COMPLIANCE"
        focusSubtitle="Principal Consultant Desk · BEML Layout HQ"
        primaryActionLabel="Schedule Private Advisory Call"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '100%', label: 'Fiduciary Non-Disclosure' },
          { value: 'DPDP 2023', label: 'Statutory Compliance' },
          { value: 'Zero-Leak', label: 'Tender Rate Isolation' }
        ]}
      />

      {/* 2. Main Content Container */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Top Meta Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-800/80 mb-10 text-xs text-neutral-400 font-mono">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Effective Date: November 01, 2026</span>
            </span>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Version 2.4 · DPDP Act (India) Compliant</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 hover:text-orange-400 text-neutral-300 text-xs transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <Link
              to="/terms-and-conditions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs transition-colors"
            >
              <span>View Terms of Service</span>
              <ArrowRight className="w-3 h-3 text-orange-500" />
            </Link>
          </div>
        </div>

        {/* Layout: Sidebar ToC (Desktop) + Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Table of Contents Navigation */}
          <aside className="lg:col-span-4 xl:col-span-3 sticky top-28 hidden lg:block space-y-4">
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-orange-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Policy Directory
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">10 SECTIONS</span>
              </div>

              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-sans transition-all flex items-center justify-between group cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-orange-500/15 text-orange-400 font-semibold border-l-2 border-orange-500 pl-2.5'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-neutral-800 text-neutral-400 text-[11px] leading-relaxed">
                <p className="font-semibold text-white mb-1">Direct Fiduciary Question?</p>
                <p className="mb-3">Speak directly with our Principal Consultant regarding NDA agreements or technical data security.</p>
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-[11px] uppercase tracking-wider font-mono transition-all text-center block shadow-md cursor-pointer"
                >
                  Request NDA / Consultation
                </button>
              </div>
            </div>
          </aside>

          {/* Main Legal Content Articles */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* Highlight Banner: Fiduciary Privilege */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-neutral-900 to-neutral-900 border border-orange-500/30 text-xs sm:text-sm text-neutral-300 leading-relaxed shadow-lg relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    Our Core Fiduciary Doctrine: "Owner-Only Representation"
                  </h4>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    CS Associates operates under a strict, uncompromised fiduciary duty. Unlike turnkey builders, broker networks, or material suppliers who monetize client inquiries, <strong className="text-white">we act exclusively as the property owner’s independent advocate</strong>. Your budgets, architectural blueprints, contractor quotations, and personal details are protected by full civil engineering confidentiality and non-disclosure standards.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 1 */}
            <motion.section
              id="overview"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Fiduciary Overview & Registered Entity Scope
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  This Privacy Policy governs the collection, processing, storage, and fiduciary protection of personal, technical, and property-related data by <strong>CS Associates</strong> ("Firm", "we", "us", or "our"), having its registered head office at:
                </p>
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 font-mono text-xs text-neutral-200 space-y-1">
                  <div className="text-orange-400 font-semibold font-sans">CS ASSOCIATES — Project Management Consultancy</div>
                  <div>1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar</div>
                  <div>Bengaluru 560098, Karnataka, India</div>
                  <div>Official Desk Phone: +91 80958 23483 / +91 82962 66389</div>
                  <div>Official Email: csassociates321@gmail.com</div>
                </div>
                <p>
                  This policy applies to all visitors, prospective home builders, villa owners, commercial developers, healthcare facility administrators, and architectural partners across Bengaluru, Mysore, Tumkur, Tamil Nadu (Chennai), Hyderabad, and all over India who interact with our website (<span className="text-orange-400 font-mono">csassociates.in</span>), utilize our interactive Cost & Savings Estimator, engage our Design Studio, or consult with our engineering desk.
                </p>
              </div>
            </motion.section>

            {/* Section 2 */}
            <motion.section
              id="collection"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Information We Collect & Field Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                In delivering high-precision Project Management Consultancy (PMC), we collect only the necessary data required to evaluate feasibility, calculate accurate quantities, audit billing, and inspect on-site execution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>Client Identity & Contact Records</span>
                  </div>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    <li>Full Name and preferred title</li>
                    <li>Direct phone number and WhatsApp contact</li>
                    <li>Official/personal email address</li>
                    <li>Site cadastral address and GPS coordinates (Bengaluru, Mysore, Tumkur, Chennai, Hyderabad, or Pan-India)</li>
                    <li>Meeting notes and consultation appointment history</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    <span>Architectural & Engineering Data</span>
                  </div>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    <li>CAD / Revit drawings, architectural floor plans, 3D renders</li>
                    <li>Structural drawings, soil bearing capacity (SBC) reports</li>
                    <li>Bill of Quantities (BOQ), material grade specifications</li>
                    <li>Contractor tender bids submitted for rate audits</li>
                    <li>Target project budget and planned delivery milestones</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                    <Database className="w-4 h-4 text-orange-500" />
                    <span>Field Inspection & Quality Telemetry</span>
                  </div>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    <li>Laser distance meter physical measurement records</li>
                    <li>Compressive cube strength test lab certificates (7 & 28-day)</li>
                    <li>Site inspection photographs and drone survey visual captures</li>
                    <li>WhatsApp Daily Progress Report (DPR) broadcast archives</li>
                    <li>Snag lists, non-conformance notices (NCRs), and handover punch-lists</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                    <Eye className="w-4 h-4 text-orange-500" />
                    <span>Digital & Technical Analytics</span>
                  </div>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    <li>IP address, browser user-agent, operating system</li>
                    <li>Inputs entered into the online Cost & Savings Estimator</li>
                    <li>Color palettes and material selections configured in the Studio</li>
                    <li>Referral URLs and navigation paths within our platform</li>
                    <li>Time stamps and interaction telemetry to maintain site speed</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3 */}
            <motion.section
              id="purpose"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Legal Grounds & Purpose of Data Processing
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  We process personal and technical information strictly in accordance with lawful grounds defined under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act, India)</strong> and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>:
                </p>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Contractual Performance & Feasibility Delivery:</strong>
                      <span className="text-neutral-400 text-xs">Conducting structural audits, verifying steel/cement bills, generating BOQs, coordinating MEP clashes, and fulfilling our 7-stage PMC mandate.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Explicit Client Consent:</strong>
                      <span className="text-neutral-400 text-xs">When you book a site feasibility consultation, request an estimation call, or reach out to us via WhatsApp, we process your submitted information to address your inquiry.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Fiduciary Protection of Client Capital:</strong>
                      <span className="text-neutral-400 text-xs">Cross-referencing contractor claims against physical site measurements to prevent overbilling, material diversion, or fraudulent quantity declarations.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Statutory Building Code & Warranty Compliance:</strong>
                      <span className="text-neutral-400 text-xs">Maintaining structural test records, concrete batching reports, and NABH healthcare compliance dossiers required under Indian Standards (IS 456, NBC 2016) and RERA audit provisions.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 4 */}
            <motion.section
              id="zero-leak"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Zero-Leak Fiduciary Independence: No Third-Party Commercialization
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p className="text-neutral-200">
                  The construction industry is frequently plagued by lead-sharing rings, contractor kickbacks, and architectural blueprint leaks. CS Associates maintains an uncompromising wall of fiduciary isolation:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-red-500/20 text-center space-y-1.5">
                    <div className="text-red-400 font-bold text-xs uppercase font-mono">NEVER SOLD</div>
                    <div className="text-neutral-300 text-xs font-semibold">Zero Data Brokerage</div>
                    <p className="text-[11px] text-neutral-500">We do not sell, rent, or lease your contact information or project briefs to any third-party marketing network.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/20 text-center space-y-1.5">
                    <div className="text-amber-400 font-bold text-xs uppercase font-mono">NO KICKBACKS</div>
                    <div className="text-neutral-300 text-xs font-semibold">Vendor Independence</div>
                    <p className="text-[11px] text-neutral-500">We accept zero supplier commissions, ensuring our material quality audits remain completely unbiased.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/20 text-center space-y-1.5">
                    <div className="text-emerald-400 font-bold text-xs uppercase font-mono">BLINDED TENDERS</div>
                    <div className="text-neutral-300 text-xs font-semibold">Bidder Cartel Prevention</div>
                    <p className="text-[11px] text-neutral-500">Drawings shared with prospective bidders are released only with your written sign-off in controlled, watermarked formats.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 5 */}
            <motion.section
              id="security"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Technical Safeguards & Digital Infrastructure
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  We implement enterprise-grade technical and physical security mechanisms compliant with ISO/IEC 27001 best practices and the IT (Reasonable Security Practices) Rules:
                </p>
                <div className="space-y-2 pt-1">
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                    <Lock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm">Cryptographic Data Transmission:</strong>
                      <p className="text-neutral-400 text-xs">All website communication, calculator submissions, and consultation requests are encrypted using industry-standard TLS 1.3 / 256-bit SSL protocols.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                    <Database className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm">Restricted Digital Repository:</strong>
                      <p className="text-neutral-400 text-xs">CAD drawings, structural calculations, and contractor billing spreadsheets are stored on role-restricted cloud repositories accessible exclusively to assigned PMC site engineers.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm">Physical Office & Field Security:</strong>
                      <p className="text-neutral-400 text-xs">Paper measurement books, contractor guarantee bonds, and physical approval registers are archived in locked repositories at our BEML Layout headquarters.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 6 */}
            <motion.section
              id="retention"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Data Retention Schedules & Construction Audit Trails
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Because civil engineering projects involve long-term structural warranties and statutory occupancy requirements, our retention schedules are structured as follows:
                </p>
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-xs border border-neutral-800 rounded-xl overflow-hidden">
                    <thead className="bg-neutral-900 text-neutral-300 font-mono text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="p-3 border-b border-neutral-800">Data Category</th>
                        <th className="p-3 border-b border-neutral-800">Retention Period</th>
                        <th className="p-3 border-b border-neutral-800">Regulatory Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-sans">
                      <tr className="bg-neutral-950/50">
                        <td className="p-3 font-medium text-white">Preliminary Web Inquiries / Estimator Sessions</td>
                        <td className="p-3 text-orange-400 font-mono">12 to 24 Months</td>
                        <td className="p-3 text-neutral-400">Consultation follow-up; erased upon client request.</td>
                      </tr>
                      <tr className="bg-neutral-950/30">
                        <td className="p-3 font-medium text-white">Active Project BOQs & Measurement Books</td>
                        <td className="p-3 text-emerald-400 font-mono">7 Years Post-Handover</td>
                        <td className="p-3 text-neutral-400">Statutory defect-liability auditing & GST/income tax compliance.</td>
                      </tr>
                      <tr className="bg-neutral-950/50">
                        <td className="p-3 font-medium text-white">Structural Stability Reports & Cube Test Logs</td>
                        <td className="p-3 text-emerald-400 font-mono">10 to 15 Years</td>
                        <td className="p-3 text-neutral-400">National Building Code (NBC) structural integrity audits & RERA records.</td>
                      </tr>
                      <tr className="bg-neutral-950/30">
                        <td className="p-3 font-medium text-white">WhatsApp DPR Broadcasts & Photo Logs</td>
                        <td className="p-3 text-orange-400 font-mono">5 Years Post-Completion</td>
                        <td className="p-3 text-neutral-400">Dispute resolution and contractor warranty verification.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>

            {/* Section 7 */}
            <motion.section
              id="rights"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Your Rights Under the Indian DPDP Act 2023
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  As a Data Principal under the Digital Personal Data Protection Act, 2023, you hold statutory rights regarding your personal information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      Right to Access & Information
                    </span>
                    <p className="text-[11px] text-neutral-400">You may request a summary of the personal data we hold about you and the processing activities undertaken.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      Right to Correction & Rectification
                    </span>
                    <p className="text-[11px] text-neutral-400">You have the right to correct outdated contact details, updated site dimensions, or revised project drawings.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      Right to Erasure / Deletion
                    </span>
                    <p className="text-[11px] text-neutral-400">You may request the deletion of preliminary inquiries, subject to our statutory obligation to maintain audited construction records.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      Right to Nominate & Withdraw Consent
                    </span>
                    <p className="text-[11px] text-neutral-400">You can revoke processing consent at any time or nominate an authorized representative in the event of death or incapacity.</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 pt-1">
                  To exercise any of these rights, email our Grievance Officer at <a href="mailto:csassociates321@gmail.com" className="text-orange-400 underline">csassociates321@gmail.com</a> with the subject line <em>"DPDP Data Subject Request"</em>.
                </p>
              </div>
            </motion.section>

            {/* Section 8 */}
            <motion.section
              id="cookies"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Cookies, LocalStorage & Calculator State
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Our digital platform prioritizes fast, privacy-friendly interactions. We do not use third-party invasive behavioral advertising cookies or tracking pixels.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-400">
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block">Client-Side LocalStorage:</strong>
                    We use your browser's local storage exclusively to preserve state when using our interactive tools:
                    <ul className="list-disc list-inside mt-1 space-y-1 text-neutral-300">
                      <li>Saving your selected sq.ft. and luxury specifications in the Cost Calculator so you do not lose your calculation upon page refresh.</li>
                      <li>Saving chosen architectural color harmonies in the Design Studio.</li>
                      <li>Smooth scrolling state and presentation settings.</li>
                    </ul>
                  </div>
                  <p>
                    You can clear your local storage or disable cookies at any time via your browser settings without impacting your ability to browse our project portfolio.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 9 */}
            <motion.section
              id="third-parties"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Third-Party Platforms (WhatsApp, Google Maps, External Links)
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  To provide immediate responsiveness, our website provides direct integrations with trusted third-party services:
                </p>
                <ul className="space-y-2 text-xs text-neutral-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">WhatsApp (Meta Platforms):</strong> When you click "Chat on WhatsApp" or send an instant consultation message, your communication is processed through WhatsApp's end-to-end encrypted messaging infrastructure and is governed by Meta's Privacy Policy.
                  </li>
                  <li>
                    <strong className="text-white">Google Maps:</strong> Used to display our Rajarajeshwarinagar office coordinates and transit directions. Interactions with maps are subject to Google's Privacy Policy.
                  </li>
                  <li>
                    <strong className="text-white">Social Media Channels:</strong> Links to our verified Instagram profile (<span className="text-orange-400 font-mono">@csassociates_blr</span>) and Facebook pages are outbound links governed by respective platform policies.
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 10 */}
            <motion.section
              id="grievance"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-orange-500/30 backdrop-blur-sm space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Section 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Statutory Grievance Redressal & Designated Privacy Officer
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  In compliance with Section 8(10) of the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, CS Associates has designated a senior compliance lead as the <strong>Grievance & Data Protection Officer</strong>:
                </p>

                <div className="p-5 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                      KD
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm font-display">Mr. Kiran Dikshit L</div>
                      <div className="text-orange-400 text-[11px]">Principal Consultant & Designated Grievance Officer</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-neutral-300 font-sans">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>CS Associates, 1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar, Bengaluru 560098</span>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                        <a href="mailto:csassociates321@gmail.com" className="text-white hover:text-orange-400 underline">
                          csassociates321@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                        <a href="tel:8095823483" className="text-white hover:text-orange-400">
                          +91 80958 23483 / +91 82962 66389
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-emerald-400 font-mono border-t border-neutral-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Grievance Redressal SLA: Initial acknowledgement within 24 hours, resolution within 15 working days.</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400">
                  If any grievance is not satisfactorily redressed by our Grievance Officer, you hold the right to appeal to the <strong>Data Protection Board of India</strong> pursuant to the provisions of the DPDP Act, 2023.
                </p>
              </div>
            </motion.section>

            {/* Bottom Call to Action */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 text-center space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                CONFIDENTIAL CIVIL ENGINEERING CONSULTATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Ready to Review Your Project with Complete Fiduciary Protection?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Connect directly with Mr. Kiran Dikshit L for an initial feasibility assessment, BOQ rate audit, or site inspection in Bengaluru.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs uppercase tracking-wider font-mono transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  Book Feasibility Review
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider font-mono transition-all"
                >
                  Visit Rajarajeshwarinagar Desk
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};
