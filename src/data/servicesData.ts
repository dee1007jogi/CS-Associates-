export interface StageProcess {
  number: number;
  stageName: string;
  tagline: string;
  description: string;
  deliverables: string[];
  keyRiskMitigated: string;
  clientBenefit: string;
}

export const PMC_7_STAGES: StageProcess[] = [
  {
    number: 1,
    stageName: 'Project Planning & Pre-Construction',
    tagline: 'Feasibility, Budgeting & Risk Identification',
    description: 'We establish the project foundation before the first shovel touches the ground. In-depth feasibility study, realistic item-rate budget estimation, comprehensive drawing review, and detailed baseline project schedule.',
    deliverables: [
      'Comprehensive master project budget breakdown',
      'Milestone Gantt chart with critical path scheduling',
      'Structural and architectural drawing constructability review',
      'Statutory checklist and municipal approval advisory'
    ],
    keyRiskMitigated: 'Scope creep and budget overruns before expenditure begins',
    clientBenefit: 'Predictable financial outflow and clear delivery timeline'
  },
  {
    number: 2,
    stageName: 'Design & Vendor Finalization',
    tagline: 'Consultant Synergy & Contractor Technical Vetting',
    description: 'Coordinating between Architect, Structural Engineer, MEP consultants, and Interior Designers. Assisting you in finalizing vendors through unbiased technical comparison matrices—never just the lowest price.',
    deliverables: [
      'Detailed Bill of Quantities (BOQ) with stringent specifications',
      'Comparative rate and credibility analysis of top contractors',
      'Contract agreement drafting with milestone-linked penalty clauses',
      'Material sample benchmarking against client approval'
    ],
    keyRiskMitigated: 'Substandard contractors using low bids to trap clients in later claims',
    clientBenefit: 'Right expertise hired at fair market rates with water-tight contracts'
  },
  {
    number: 3,
    stageName: 'Site Execution & Supervision',
    tagline: 'Daily Oversight & Transparent WhatsApp DPR',
    description: 'Daily on-site supervision by our qualified civil engineers. We monitor workmanship, safety protocols, and daily output. You receive Daily Work Progress Reports (DPR) with photos directly on your phone.',
    deliverables: [
      'Dedicated on-site engineer during working hours',
      'Daily Progress Report (DPR) with photo evidence on WhatsApp',
      'Concrete slump, cube testing, and steel tensile verification',
      'Zero deviation enforcement from architectural drawings'
    ],
    keyRiskMitigated: 'Unsupervised contractor shortcuts and hidden construction defects',
    clientBenefit: '100% peace of mind without having to leave your office or home'
  },
  {
    number: 4,
    stageName: 'Quality Control & Quality Assurance',
    tagline: 'Multi-Level Audits & Zero Compromise',
    description: 'Rigorous multi-stage inspection for excavation, reinforcement binding, concrete curing, brickwork plumb, plaster adhesion, and triple-layer waterproofing before concealing works.',
    deliverables: [
      'Pre-pour structural inspection checklists signed by lead PMC',
      '7-day and 28-day laboratory concrete test records',
      'Water ponding tests for all wet areas, terraces & basements (min 72 hrs)',
      'Electrical conduit and plumbing pressure testing prior to closure'
    ],
    keyRiskMitigated: 'Future dampness, structural cracks, and concealed pipe leaks',
    clientBenefit: 'Structural longevity and heirloom quality built to last generations'
  },
  {
    number: 5,
    stageName: 'Material & Billing Management',
    tagline: 'Wastage Control & Exact Site Measurements',
    description: 'We physically verify all consignments arriving on site, control wastage of steel, cement, and aggregates, and audit every contractor running invoice against actual laser site measurements.',
    deliverables: [
      'Consignment verification for genuine brand grades (cement/steel)',
      'Laser-verified joint measurement sheets for every contractor invoice',
      'Reconciliation of raw materials against theoretical consumption',
      'Cumulative expenditure vs. planned budget variance reports'
    ],
    keyRiskMitigated: 'Inflated contractor measurements, unauthorized rate hikes, and material pilferage',
    clientBenefit: 'Clients save 8% to 15% on total project cost—easily exceeding PMC fee'
  },
  {
    number: 6,
    stageName: 'MEP & Finishing Coordination',
    tagline: 'Clash-Free Services & Designer Precision',
    description: 'Seamless coordination across Electrical, Plumbing, HVAC, Fire Protection, Automation, Glazing, and Interiors to guarantee zero service clashes, flawless joint alignments, and zero rework.',
    deliverables: [
      'Coordinated service shop drawing reviews to eliminate pipe-duct clashes',
      'Groove detailing, mitre joints, shadow gaps & profile lighting execution',
      'Smart home automation & CCTV cabling seamless integration',
      'Precision marble book-matching and acoustic wall finish checks'
    ],
    keyRiskMitigated: 'Costly breakages or rework caused by lack of coordination between MEP and interior teams',
    clientBenefit: 'Magazine-grade luxury finish with zero unsightly exposed pipes or wires'
  },
  {
    number: 7,
    stageName: 'Snag List & Peaceful Handover',
    tagline: 'Zero-Defect Inspection & Documentation Dossier',
    description: 'Exhaustive 200+ point snag list verification, deep cleaning supervision, defect rectifications, compilation of as-built drawings, maintenance manuals, warranties, and ceremonial keys handover.',
    deliverables: [
      'Room-by-room snag list identification and contractor resolution sign-off',
      'Complete as-built drawings dossier (Architectural, Structural, MEP)',
      'Consolidated equipment warranties, AMC agreements & service contact booklet',
      'Ceremonial keys handover with complete satisfaction confirmation'
    ],
    keyRiskMitigated: 'Post-possession disputes, untraceable hidden wiring, and abandoned touch-ups',
    clientBenefit: 'A truly turnkey move-in experience without stress or unresolved repairs'
  }
];

export interface CoreServiceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  scopeList: string[];
}

export const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: 'turnkey-pmc',
    name: 'Turnkey Project Management',
    subtitle: 'From Concept to Key Handover',
    description: 'We shoulder 100% ownership of your project from planning, contractor sourcing, budgeting, day-to-day site supervision to move-in handover with guaranteed timelines and cost caps.',
    scopeList: [
      'Single point of accountability for all agencies',
      'Milestone-driven project scheduling & progress monitoring',
      'Comprehensive budget control with zero hidden escalations',
      'Final snag clearance and documented handover'
    ]
  },
  {
    id: 'pmc-consulting',
    name: 'Project Management Consultants',
    subtitle: 'Independent Client-Side PMC Audits',
    description: 'Acting strictly as the client’s advocate, our veteran engineers audit contractor workmanship, certify running bills with actual measurements, and enforce contractual SLA standards.',
    scopeList: [
      'Daily site supervision by certified civil engineers',
      'Contractor bill verification saving 8-15% on invoice amounts',
      'Daily Work Progress Reports (DPR) with photos on WhatsApp',
      'Constructability risk and timeline variance analysis'
    ]
  },
  {
    id: 'arch-interior',
    name: 'Architecture & Interior Design Coordination',
    subtitle: 'Design Realization Without Compromise',
    description: 'Bridging the critical gap between conceptual drawings and site reality. We ensure architectural intent is executed millimeter-perfect with no dimension cuts or finishing compromises.',
    scopeList: [
      'Coordination between design architects and field contractors',
      'Material curation (Italian marble, veneers, acoustic panels, glass)',
      'Luxury finishing: shadow gaps, mitre joints, flush baseboards',
      'Aesthetic lighting integration and false ceiling detailing'
    ]
  },
  {
    id: 'vaastu-consulting',
    name: 'Vaastu Consultants',
    subtitle: 'Harmonious Energy & Scientific Alignment',
    description: 'Integrating ancient Vaastu principles harmoniously with contemporary luxury architecture, ensuring ideal directional zoning, natural light flow, and positive spatial energy without structural awkwardness.',
    scopeList: [
      'Pancha-tattva spatial zoning and orientation audit',
      'Main entrance, master suite, kitchen & pooja space positioning',
      'Harmonious integration with modern architectural elevations',
      'Remedial planning for ongoing or existing layouts'
    ]
  },
  {
    id: 'mep-electrical',
    name: 'Electrical & MEP Consultants',
    subtitle: 'High-Load Infrastructure & Automation',
    description: 'Comprehensive engineering oversight for electrical loads, high-efficiency plumbing, HVAC ducting, solar panels, and intelligent home automation systems.',
    scopeList: [
      'Electrical load calculations, HT/LT substation & DG synchronisation',
      'Centralized VRV/VRF air conditioning and mechanical ventilation',
      'Pressurized water supply, solar water heaters, STP/WTP integration',
      'Medical gas (MGPS) and cleanroom airflow for healthcare projects'
    ]
  },
  {
    id: 'facade-fenestration',
    name: 'Facade & Fenestration Engineering',
    subtitle: 'Acoustic & Thermal High-Performance Envelopes',
    description: 'Specialized management of architectural glazing, slimline aluminum systems, curtain walls, louvers, and weatherproofing to withstand extreme monsoon and heat conditions.',
    scopeList: [
      'Slimline minimal sliding systems and double-glazed units (DGU)',
      'Acoustic insulation engineering against city noise',
      'Structural silicone glazing & ventilated facade cladding',
      'Wind load and water infiltration barrier certifications'
    ]
  },
  {
    id: 'joint-development',
    name: 'Joint Development Advisory',
    subtitle: 'Landowner Protection & Developer PMC',
    description: 'Protecting landowner equity in joint development agreements. We audit developer specifications, track milestone handovers, and ensure the owner receives their exact contractual share.',
    scopeList: [
      'Joint Development Agreement (JDA) technical specification auditing',
      'Owner share allocation and quality inspection during construction',
      'Independent escrow milestone certifications',
      'Handover verification of landowner apartments/villas'
    ]
  }
];

export const LUXURY_VILLA_PROMISES = [
  {
    title: 'Personalized Project Planning',
    desc: 'We start with your family’s lifestyle, space flow, Vastu, natural lighting, and future needs. Detailed budget breakdown before first brick.'
  },
  {
    title: 'Design Realization',
    desc: 'We work closely with your Architect to ensure what is drawn is executed with millimeter accuracy on site. No compromises in heights or finishes.'
  },
  {
    title: 'Premium Material Assistance',
    desc: 'Expert guidance in selecting genuine Italian marble, granite, natural wood veneers, designer tiles, and premium sanitaryware at best negotiated rates.'
  },
  {
    title: 'Dedicated Site Supervision',
    desc: 'Your home gets a dedicated civil engineer on site every day. Multi-level checks for structure, masonry, waterproofing, and woodwork.'
  },
  {
    title: 'Luxury Finishing Management',
    desc: 'Our specialty: groove detailing, mitre joints, shadow gaps, profile lighting, and zero-crack smooth plaster finish achieving magazine quality.'
  },
  {
    title: 'Smart Home & MEP Integration',
    desc: 'Seamless coordination of Home Automation, CCTV security, centralized AC, solar, electrical, and plumbing for a modern hassle-free lifestyle.'
  },
  {
    title: 'Transparent Billing & Cost Saving',
    desc: 'Every bag of cement, tile, and invoice is cross-checked against actual site measurements. Our clients save 10% to 15% overall on project cost.'
  },
  {
    title: 'Final Styling & Peaceful Handover',
    desc: 'Complete 200-point snag list clearance, deep chemical cleaning, touch-ups, warranties folder, and serene handover of your family’s dream keys.'
  }
];

export const HEALTHCARE_COMMERCIAL_PILLARS = {
  commercial: [
    { title: 'Space Optimization', desc: 'Maximum carpet area efficiency with smart spatial circulation' },
    { title: 'Brand & Aesthetics', desc: 'Flawless corporate finishing adhering strictly to brand guidelines' },
    { title: 'MEP for Business', desc: 'High-capacity power backup, server rooms, centralized HVAC & fire security' },
    { title: 'Fast-Track Handover', desc: 'Time-bound execution engineered for early tenant occupancy & immediate ROI' }
  ],
  healthcare: [
    { title: 'NABH & Statutory Norms', desc: 'Full compliance with NABH, Fire Safety, KSPCB, and Health Department standards' },
    { title: 'Infection Control in Critical Zones', desc: 'Sterile airflow, positive pressure for OTs, ICUs, Diagnostic Labs & Emergency units' },
    { title: 'Medical Services Engineering', desc: 'Medical Gas Pipeline Systems (MGPS), HT electrical sub-stations, bio-medical waste routing' },
    { title: 'Anti-Bacterial Finishes', desc: 'Seamless, chemical-resistant, high-traffic resilient flooring and antibacterial wall finishes' }
  ]
};
