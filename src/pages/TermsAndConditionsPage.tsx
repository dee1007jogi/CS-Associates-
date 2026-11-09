import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  Calculator, 
  CheckCircle2, 
  HardHat, 
  ShieldCheck, 
  Building2, 
  Lock, 
  Printer, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { PageHero } from '../components/PageHero';

interface TermsAndConditionsPageProps {
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

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({ onOpenConsultation }) => {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

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
    { id: 'acceptance', title: '1. Acceptance of Terms & Engagement Scope' },
    { id: 'pmc-nature', title: '2. Nature of Project Management Consultancy' },
    { id: 'calculator-disclaimer', title: '3. Cost Estimator & Savings Disclaimer' },
    { id: 'intellectual-property', title: '4. Intellectual Property & 7-Stage Methodology' },
    { id: 'contractor-liability', title: '5. Division of Roles & Contractor Liability' },
    { id: 'client-responsibilities', title: '6. Client Obligations & Site Access' },
    { id: 'fees-billing', title: '7. Professional Fees, Retainers & GST' },
    { id: 'liability-cap', title: '8. Limitation of Liability & Force Majeure' },
    { id: 'dispute-arbitration', title: '9. Dispute Resolution & Arbitration' },
    { id: 'governing-law', title: '10. Governing Law & Bengaluru Jurisdiction' },
    { id: 'contact-notices', title: '11. Legal Notices & Desk Communications' },
  ];

  return (
    <div className="w-full bg-neutral-950 min-h-screen text-neutral-100 selection:bg-orange-500 selection:text-white">
      {/* 1. Cinematic Page Hero */}
      <PageHero
        badge="Governance & Advisory Agreement"
        title="Terms & Conditions of Service"
        highlightedTitle="PMC Advisory Charter"
        description="The operational guidelines, contractual covenants, and liability boundaries governing your use of the CS Associates platform, digital cost calculators, and engineering advisory services."
        backgroundImage="/src/assets/images/process_hero_engineering.jpg"
        breadcrumbLabel="Terms & Conditions"
        focusTag="LEGAL COVENANTS & ADVISORY CHARTER"
        focusSubtitle="Principal Consultant Desk · BEML Layout HQ"
        primaryActionLabel="Schedule Project Review"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: 'Independent', label: 'Owner-Only Fiduciary' },
          { value: 'Advisory', label: 'Estimator Benchmark Notice' },
          { value: 'Bengaluru', label: 'Karnataka Jurisdiction' }
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
            <span className="flex items-center gap-1.5 text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
              <Scale className="w-3.5 h-3.5" />
              <span>Standard Civil Engineering PMC Terms</span>
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
              to="/privacy-policy"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs transition-colors"
            >
              <span>View Privacy Policy</span>
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
                  <Scale className="w-3.5 h-3.5" />
                  Terms Directory
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">11 CLAUSES</span>
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
                <p className="font-semibold text-white mb-1">Contract Inquiry?</p>
                <p className="mb-3">To review a customized bilateral PMC Agreement for your villa or commercial development:</p>
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-[11px] uppercase tracking-wider font-mono transition-all text-center block shadow-md cursor-pointer"
                >
                  Request PMC Contract Draft
                </button>
              </div>
            </div>
          </aside>

          {/* Main Legal Content Articles */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* Highlight Alert: PMC Advisory Distinction */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 text-xs sm:text-sm text-neutral-300 leading-relaxed shadow-lg relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    Fundamental Regulatory Notice: Project Management Consultancy (PMC)
                  </h4>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    CS Associates acts as an <strong className="text-white">independent Project Management Consultant (PMC), client fiduciary representative, and technical quality auditor</strong>. Visiting this website, using our online Cost Calculator, or submitting an initial inquiry establishes an advisory informational dialogue, but does not constitute an executed turnkey construction contract until a formal, written Bilateral PMC Agreement / Work Order is signed by both parties.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Clause 1 */}
            <motion.section
              id="acceptance"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Acceptance of Terms & Engagement Scope
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("Client", "User", "Visitor", or "Property Owner") and <strong>CS Associates</strong> ("Firm", "we", "us", or "our"), governing your access to and use of our website (<span className="text-orange-400 font-mono">csassociates.in</span>), our digital tools, cost calculators, design studio, and all preliminary consultations conducted via phone, email, WhatsApp, or on-site visits across Bengaluru, Mysore, Tumkur, Tamil Nadu (Chennai), Hyderabad, and all over India.
                </p>
                <p>
                  By browsing this site, entering parameters into our cost calculators, or submitting consultation requests, you expressly confirm that you are at least 18 years of age, legally competent to enter into contracts under the Indian Contract Act, 1872, and agree to abide by these Terms in full. If you do not agree with any part of these Terms, please discontinue use immediately.
                </p>
              </div>
            </motion.section>

            {/* Clause 2 */}
            <motion.section
              id="pmc-nature"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Nature of Project Management Consultancy (PMC) Services
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  CS Associates delivers professional technical advisory, site supervision, quality assurance, quantity auditing, and timeline governance under our proprietary 7-Stage PMC Framework:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                      <ShieldCheck className="w-4 h-4 text-orange-400" />
                      <span>Fiduciary Owner Representation</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      We represent the property owner exclusively. We do not act as the civil construction contractor, labor broker, or material merchant. Our technical allegiance remains 100% with the client to verify drawings, audit bills, and enforce quality.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                      <FileSpreadsheet className="w-4 h-4 text-orange-400" />
                      <span>Requirement for Formal Work Order</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      No client-consultant contractual liability attaches to CS Associates for on-site execution until a formal written PMC Agreement detailing specific site deliverables, payment schedules, and liability limits has been executed.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clause 3 */}
            <motion.section
              id="calculator-disclaimer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Online Cost & Savings Calculator: Advisory Disclaimer
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Our digital <strong>Cost & Savings Estimator</strong> and <strong>Design Studio</strong> provide simulated approximations based on standard Bengaluru residential and commercial construction market indices (as of Q4 2026).
                </p>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                  <div className="text-orange-400 font-semibold font-mono uppercase tracking-wider">
                    Factors Impacting Actual Construction Costs:
                  </div>
                  <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                    <li><strong className="text-white">Soil Bearing Capacity (SBC):</strong> Hard rock requiring blasting, or loose soil requiring deep pile foundations or soil stabilization drastically alters substructure expenditure.</li>
                    <li><strong className="text-white">Architectural Elevation & Cantilevers:</strong> Complex double-height voids, expansive structural glass facades, and post-tensioned slabs incur higher structural steel and formwork costs.</li>
                    <li><strong className="text-white">Material Commodity Volatility:</strong> Unforeseen market fluctuations in TMT steel grades (Fe 550D), 53-grade OPC/PPC cement, sand, copper electrical wiring, and diesel.</li>
                    <li><strong className="text-white">Statutory Sanctions:</strong> Approval fees for BBMP, BDA, BMRDA, BESCOM power installations, BWSSB sanitary connections, and Karnataka Fire & Emergency approvals.</li>
                  </ul>
                </div>

                <p className="text-xs text-neutral-400">
                  Estimator outputs are strictly advisory planning aids. CS Associates disclaims all liability for budgetary variance between automated web figures and a finalized, engineer-stamped Bill of Quantities (BOQ).
                </p>
              </div>
            </motion.section>

            {/* Clause 4 */}
            <motion.section
              id="intellectual-property"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Intellectual Property Rights & 7-Stage Methodology
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  All proprietary content on this platform—including but not limited to our registered wordmarks, CS Associates emblems, the <strong>7-Stage PMC Framework</strong>, laser measurement audit protocols, photographic portfolios of completed estates, 3D interactive models, calculation algorithms, and codebases—is the exclusive intellectual property of CS Associates under the Indian Copyright Act, 1957 and Trade Marks Act, 1999.
                </p>
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                  <div className="text-white font-semibold">Strict Prohibitions:</div>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400">
                    <li>Copying, scraping, reproducing, or republishing our project portfolios, photographs, or case studies without written consent.</li>
                    <li>Reverse-engineering our cost algorithms or white-labeling our 7-Stage PMC inspection checklists for unauthorized commercial exploitation.</li>
                    <li>Using automated bots, crawlers, or scrapers to extract site data or project pricing models.</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Clause 5 */}
            <motion.section
              id="contractor-liability"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Division of Roles & Third-Party Contractor Liability
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  To ensure complete transparency and eliminate conflict of interest, the operational roles on a project are clearly demarcated:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-orange-400 font-semibold text-xs uppercase font-mono mb-1">
                      Role of CS Associates (PMC)
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      We audit, inspect, verify physical measurements, benchmark material quality, issue non-conformance reports, and recommend bill deductions. We do not manufacture building materials, nor do we employ the contractor’s daily construction laborers directly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-neutral-200 font-semibold text-xs uppercase font-mono mb-1">
                      Direct Contractor Liability & Site Safety
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      The executing general civil contractor, structural sub-contractors, and MEP specialists remain solely and independently responsible for: (a) Direct construction warranties and workmanship guarantees; (b) Site worker safety, scaffolding stability, and PPE compliance under the Building and Other Construction Workers (BOCW) Act, 1996; (c) Compliance with statutory labor laws, ESI, PF, and Workmen’s Compensation insurance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clause 6 */}
            <motion.section
              id="client-responsibilities"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Client Obligations & Site Access
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  To enable effective quality surveillance and measurement auditing, the property owner agrees to:
                </p>
                <ul className="space-y-2 text-xs text-neutral-300 list-disc list-inside">
                  <li>Provide legitimate, unobstructed access to the property site for CS Associates inspection engineers.</li>
                  <li>Furnish unencumbered land ownership deeds, sanctioned architectural plans, and structural calculations.</li>
                  <li>Review and act upon PMC audit reports, billing deduction advisories, and snag lists in a timely manner.</li>
                  <li>Ensure contractors and vendors are contractually bound to comply with CS Associates quality audit instructions.</li>
                </ul>
              </div>
            </motion.section>

            {/* Clause 7 */}
            <motion.section
              id="fees-billing"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Professional Fees, Retainers & Statutory GST
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Professional PMC fees are customized per project scope (percentage of audited construction value, fixed stage milestone billing, or monthly site supervision retainer):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block text-xs font-medium mb-1">Applicable Taxes:</strong>
                    <p className="text-[11px] text-neutral-400">All professional invoices are subject to statutory Goods and Services Tax (GST @ 18%) under Karnataka State GST (SGST) and Central GST (CGST) provisions.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block text-xs font-medium mb-1">Contractor Bill Deduction Protocol:</strong>
                    <p className="text-[11px] text-neutral-400">When CS Associates flags an overbilled quantity or sub-standard concrete pour, our deduction certification is forwarded directly to the client's account desk.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clause 8 */}
            <motion.section
              id="liability-cap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Limitation of Liability & Force Majeure
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  To the maximum extent permitted by applicable Indian laws:
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block">Aggregate Liability Cap:</strong>
                    CS Associates' total cumulative liability for any claim arising out of our preliminary website use or advisory consultations shall not exceed the fees actually paid to us for the specific preliminary engagement, or INR 5,000 for free digital tool usage.
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block">Exclusion of Consequential Damages:</strong>
                    In no event shall CS Associates be liable for indirect, incidental, punitive, or consequential damages, including loss of rental revenue, market depreciation, or structural failure caused by unapproved contractor deviations from structural drawings.
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <strong className="text-white block">Force Majeure:</strong>
                    Neither party shall be liable for project schedule delays caused by natural acts (severe monsoons, earthquakes, floods), municipal stop-work orders, pandemics, regional labor strikes, or sand/quarry supply bans ordered by the National Green Tribunal (NGT) or Karnataka state authorities.
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clause 9 */}
            <motion.section
              id="dispute-arbitration"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Dispute Resolution & Sole Arbitration Protocol
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Any dispute, difference, or technical disagreement arising out of these Terms or PMC consultancy services shall be resolved through the following progressive mechanism:
                </p>
                <div className="space-y-2.5 text-xs pt-1">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono font-bold text-[10px]">STEP 1</span>
                    <p className="text-neutral-300"><strong className="text-white">Amicable Technical Conciliation:</strong> The parties shall first attempt to resolve the issue through technical discussions between the client and Principal Consultant Mr. Kiran Dikshit L within 30 days.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono font-bold text-[10px]">STEP 2</span>
                    <p className="text-neutral-300"><strong className="text-white">Binding Arbitration:</strong> If unresolved, the dispute shall be referred to arbitration in Bengaluru before a sole arbitrator appointed by mutual consent in accordance with the <em>Arbitration and Conciliation Act, 1996</em>. The seat and venue of arbitration shall be Bengaluru, Karnataka, and proceedings shall be conducted in English.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clause 10 */}
            <motion.section
              id="governing-law"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Governing Law & Bengaluru Judicial Jurisdiction
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  These Terms and any bilateral contracts entered into shall be governed by and construed in accordance with the <strong>laws of the Republic of India</strong>. Subject to the arbitration clause above, the competent civil courts situated exclusively in <strong>Bengaluru, Karnataka, India</strong> shall have exclusive jurisdiction over all matters arising out of or related to these Terms.
                </p>
              </div>
            </motion.section>

            {/* Clause 11 */}
            <motion.section
              id="contact-notices"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Clause 11</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Formal Legal Notices & Desk Communications
              </h2>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
                <p>
                  All formal notices, contract requisitions, or legal communications to CS Associates must be transmitted in writing to:
                </p>

                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-xs text-neutral-300">
                  <div className="text-white font-bold font-sans text-sm">CS ASSOCIATES — Legal & Contracts Administration</div>
                  <div>Attn: Mr. Kiran Dikshit L, Principal Consultant</div>
                  <div>1678, NISARGA 4th Cross 5th Stage First Phase, BEML Layout, Rajarajeshwarinagar</div>
                  <div>Bengaluru 560098, Karnataka, India</div>
                  <div className="pt-2 flex flex-wrap gap-4 text-orange-400">
                    <a href="mailto:csassociates321@gmail.com" className="hover:underline">csassociates321@gmail.com</a>
                    <span>·</span>
                    <a href="tel:8095823483" className="hover:underline">+91 80958 23483</a>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Bottom Call to Action */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 text-center space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                BUILD WITH COMPLETE CONTRACTUAL CLARITY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Looking to Protect Your Construction Investment?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Schedule a 1-on-1 consultation with Mr. Kiran Dikshit L to review your architectural plans, contractor bids, and customize a transparent PMC agreement.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs uppercase tracking-wider font-mono transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  Schedule Feasibility Audit
                </button>
                <Link
                  to="/process"
                  className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider font-mono transition-all"
                >
                  Explore 7-Stage Framework
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};
