export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'healthcare';
  categoryLabel: string;
  location: string;
  builtUpArea: string;
  status: 'Completed' | 'Ongoing' | 'Handover Complete' | 'Upcoming';
  image: string;
  highlights: string[];
  scope: string;
  completionYear: string;
  clientSavings?: string;
  description: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'dr-lakshmi-residence',
    title: 'Dr Lakshmi Residence',
    category: 'residential',
    categoryLabel: 'Luxury Villa',
    location: 'Abbigere, Bengaluru',
    builtUpArea: '7,400 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_dr_lakshmi_residence.jpg',
    highlights: [
      'Bespoke teak louver shading & courtyard ventilation',
      'Italian Statuario marble seamless dry-lay flooring',
      'Zero-leak triple-coat structural waterproofing',
      'Smart home automation for lighting and climate'
    ],
    scope: 'Complete Turnkey PMC, Vendor Selection & Luxury Finishing Management',
    completionYear: '2024',
    clientSavings: '12.4% Saved on Material & Contractor Billing',
    description: 'A bespoke multi-level residence crafted for Dr Lakshmi in Abbigere. CS Associates provided end-to-end management starting from architectural design realization to final styling handover. Strict bill verification against actual site measurements ensured zero over-invoicing.'
  },
  {
    id: 'site-12-opulence',
    title: 'Site No 12 Opulence',
    category: 'residential',
    categoryLabel: 'Contemporary Estate',
    location: 'Kanakapura Road, Tataguni, Bengaluru',
    builtUpArea: '11,200 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_opulence_tataguni_exterior.jpg',
    highlights: [
      'Dramatic cantilever balconies with structural steel coordination',
      'Sculptural floating steps and open sunlit courtyard',
      'Soundproofed acoustic media lounge and private gym',
      'High-spec fenestration & thermally broken slimline glass'
    ],
    scope: 'PMC, Structural Coordination, MEP Engineering & Finishing Quality Assurance',
    completionYear: '2024',
    clientSavings: '₹18.6 Lakhs Audited & Saved on Bill Measurements',
    description: 'An architectural tour de force located in the serene surroundings of Tataguni off Kanakapura Road. CS Associates managed over 14 specialized subcontractors, ensuring perfect joint alignment, shadow gap detailing, and on-schedule delivery.'
  },
  {
    id: 'timber-wood-chalet',
    title: 'Sovereign Timber Chalet & Estate',
    category: 'residential',
    categoryLabel: 'Ultra-Luxury Retreat',
    location: 'Nandi Hills Foothills, Bengaluru',
    builtUpArea: '14,500 sq.ft.',
    status: 'Upcoming',
    image: '/src/assets/images/project_timber_wood_chalet_day.png',
    highlights: [
      'Engineered mass timber framing & exposed glulam trusses',
      'Passive solar climate design & geothermal floor conditioning',
      'Triple-glazed panoramic alpine curtain walling',
      'Zero-carbon construction management & native stone masonry'
    ],
    scope: 'Turnkey Architectural PMC, Timber Engineering & Sustainable Execution',
    completionYear: 'Target Q4 2025',
    clientSavings: 'Projected 14% Savings via pre-fabricated timber scheduling',
    description: 'An ultra-exclusive architectural chalet retreat nestled in the Nandi Hills foothills. Features sustainable glulam trusses, passive bioclimatic cooling, and full turnkey PMC stewardship.'
  },
  {
    id: 'chirag-global-hospital',
    title: 'Chirag Global Hospital',
    category: 'healthcare',
    categoryLabel: 'Multi-Specialty Hospital',
    location: 'Bengaluru',
    builtUpArea: '28,000 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_chirag_global_hospital.jpg',
    highlights: [
      'NABH and Fire Safety statutory compliance engineering',
      'Sterile airflow HVAC with HEPA filtration for minor OT & ICU units',
      'Medical gas pipeline routing (MGPS) & bio-medical waste management',
      'Anti-bacterial, seamless chemical-resistant vinyl flooring'
    ],
    scope: 'Healthcare Infrastructure PMC, Cleanroom Engineering & Statutory Approvals',
    completionYear: '2023',
    clientSavings: 'Delivered 35 days ahead of schedule for early clinical launch',
    description: 'A major multi-specialty healthcare facility built with zero margin for error. CS Associates led statutory approvals, clinical workflow MEP coordination, and infection-control architectural detailing to achieve flawless hospital licensing.'
  },
  {
    id: 'sovereign-commercial-tower',
    title: 'Apex Sovereign Tech Center',
    category: 'commercial',
    categoryLabel: 'Commercial Tech Park',
    location: 'Outer Ring Road, Bengaluru',
    builtUpArea: '62,000 sq.ft.',
    status: 'Upcoming',
    image: '/src/assets/images/gallery_commercial_complex_1790601212975.jpg',
    highlights: [
      'LEED Platinum green building certification engineering',
      'Double-skin low-E solar glass facade with dynamic louvers',
      'High-capacity central chiller plants & automated BMS monitoring',
      'Multi-tier seismic structural resilience and deep basement shoring'
    ],
    scope: 'High-Rise Commercial PMC, Facade Engineering & MEP Commissioning',
    completionYear: 'Target Q2 2026',
    clientSavings: 'Projected ₹42 Lakhs Cost Reduction through automated BOQ tracking',
    description: 'Next-generation commercial technology park designed for high-density tech operations. CS Associates oversees deep basement diaphragm shoring, facade structural coordination, and green accreditation.'
  },
  {
    id: 'acharya-sushrutha-hospital',
    title: 'Acharya Sushrutha Ayurvedic Medical College & Hospital',
    category: 'healthcare',
    categoryLabel: 'Medical Institution & Hospital',
    location: 'Bengaluru',
    builtUpArea: '45,000 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_acharya_sushrutha_hospital.jpg',
    highlights: [
      'Campus-wide structural framing & clinical block execution',
      'Specialized herbal pharmacy & therapeutic treatment wing MEP',
      'Heavy-load acoustic isolation and high-capacity electrical substations',
      'Comprehensive fire safety and hospital accreditation standards'
    ],
    scope: 'Complete Institutional PMC, Civil Construction Governance & MEP Coordination',
    completionYear: '2023',
    clientSavings: '15.2% Cost Savings through material reconciliation',
    description: 'Expansive medical college and hospital campus. CS Associates executed strict civil quality governance, multi-stage concrete cube testing, and seamless statutory alignment throughout execution.'
  },
  {
    id: 'sadashivanagar-luxury-palace',
    title: 'The Courtyard Pavilion Villa',
    category: 'residential',
    categoryLabel: 'Signature Private Palace',
    location: 'Sadashivanagar, Bengaluru',
    builtUpArea: '16,800 sq.ft.',
    status: 'Upcoming',
    image: '/src/assets/images/projects_hero_luxury_estate.jpg',
    highlights: [
      'Monumental double-cantilevered entry portico with Italian travertine',
      'Triple-height central atrium with internal cascading water feature',
      'Sub-basement temperature-controlled vintage cellar & tasting lounge',
      'Full home automation, KNX lighting control and acoustic barriers'
    ],
    scope: 'Comprehensive Luxury PMC, Material Sourcing & High-End Interior Execution',
    completionYear: 'Target Q1 2026',
    clientSavings: 'Projected 16% Savings through direct stone quarry procurement',
    description: 'A sovereign palace residence located in Sadashivanagar. Engineered with monumental stone cladding, bespoke bronze architectural screens, and subterranean leisure suites.'
  },
  {
    id: 'opulence-courtyard',
    title: 'Tataguni Courtyard & Villa Interiors',
    category: 'residential',
    categoryLabel: 'Luxury Interiors',
    location: 'Tataguni, Bengaluru',
    builtUpArea: '11,200 sq.ft.',
    status: 'Handover Complete',
    image: '/src/assets/images/project_opulence_tataguni_courtyard.jpg',
    highlights: [
      'Double-height open skylight courtyard with natural ventilation',
      'Artisan crafted timber pillars and floating stone steps',
      'Concealed ambient LED profiles and micro-topping plaster',
      'Custom acoustic insulation for living retreats'
    ],
    scope: 'Interior PMC, Bespoke Millwork Coordination & Stone Dry-Lays',
    completionYear: '2024',
    clientSavings: 'Zero rework through 3D BIM coordinate cross-checks',
    description: 'The internal sanctum of the Opulence Estate. Engineered to harmonize traditional courtyard spatial aesthetics with minimalist modern luxury, featuring custom woodwork and skylight daylighting.'
  },
  {
    id: 'luxury-villa-308',
    title: 'Contemporary Private Villa 308',
    category: 'residential',
    categoryLabel: 'Private Residence',
    location: 'Bengaluru',
    builtUpArea: '6,800 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_villa_308_luxury.jpg',
    highlights: [
      'Minimalist geometric elevation with cantilever roof plane',
      'Thermal-break slimline aluminum sliding windows',
      'Triple-layer terrace waterproofing with 10-year warranty',
      'High-speed EV charging integration and solar backup'
    ],
    scope: 'Turnkey Civil PMC, Structural Shuttering & Handover Management',
    completionYear: '2023',
    clientSavings: '11.8% Saved on Contractor Running Invoices',
    description: 'Modernist private residence engineered with sharp geometry and luxury finishes. CS Associates oversaw all structural pours, MEP concealment, and snag-free key handover.'
  },
  {
    id: 'circular-aperture-villa',
    title: 'Architectural Aperture Villa',
    category: 'residential',
    categoryLabel: 'Signature Architecture',
    location: 'Bengaluru',
    builtUpArea: '8,200 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_circular_aperture_villa.jpg',
    highlights: [
      'Iconic circular ocular facade aperture framing natural greens',
      'Reinforced fair-face architectural concrete finishes',
      'Curved structural formwork with laser plumbness verification',
      'Custom fabricated brass pivot entry doors'
    ],
    scope: 'Complex Formwork PMC, Structural Quality Assurance & Facade Engineering',
    completionYear: '2024',
    clientSavings: 'Prevented critical structural shuttering defects',
    description: 'A striking architectural home defined by circular facade geometry. CS Associates ensured complex curved formwork was cast with zero honeycombing or deflection.'
  },
  {
    id: 'commercial-healthcare-complex',
    title: 'Healthcare Specialty Center Elevation',
    category: 'commercial',
    categoryLabel: 'Commercial & Clinic Infrastructure',
    location: 'Bengaluru',
    builtUpArea: '18,500 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/project_hospital_elevation.jpg',
    highlights: [
      'Structural glazing with acoustic insulation STC 42dB',
      'Centralized VRV air-conditioning with multi-zone digital control',
      'Wheelchair ramp accessibility and automatic sliding entrances',
      'High-traffic anti-microbial wall cladding'
    ],
    scope: 'Facade Coordination, Commercial Fitting-Out & Statutory Approvals',
    completionYear: '2023',
    clientSavings: 'Fast-tracked approvals for immediate tenant occupancy',
    description: 'High-performance commercial and clinic facility delivering seamless public access, robust structural envelopes, and full municipal regulatory compliance.'
  }
];
