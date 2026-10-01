export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'healthcare';
  categoryLabel: string;
  location: string;
  builtUpArea: string;
  status: 'Completed' | 'Ongoing' | 'Handover Complete';
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
    image: '/src/assets/images/residence_abbigere_1790599648176.jpg',
    highlights: [
      'Bespoke teak louver shading & courtyard ventilation',
      'Italian Statuario marble seamless dry-lay flooring',
      'Zero-leak triple-coat structural waterproofing',
      'Smart home automation for lighting and climate'
    ],
    scope: 'Complete Turnkey PMC, Vendor Selection & Luxury Finishing Management',
    completionYear: '2024',
    clientSavings: '12.4% Saved on Material & Contractor Billing',
    description: 'A bespoke multi-level residence crafted for Dr Lakshmi. CS Associates provided end-to-end management starting from architectural design realization to final styling handover. Strict bill verification against actual site measurements ensured zero over-invoicing.'
  },
  {
    id: 'site-12-opulence',
    title: 'Site No 12 Opulence',
    category: 'residential',
    categoryLabel: 'Contemporary Estate',
    location: 'Kanakapura Road, Tataguni, Bengaluru',
    builtUpArea: '11,200 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/opulence_kanakapura_1790599663999.jpg',
    highlights: [
      'Dramatic cantilever balconies with structural steel coordination',
      'Infinity edge lap pool with dedicated filtration MEP',
      'Soundproofed acoustic media lounge and private gym',
      'High-spec fenestration & thermally broken slimline glass'
    ],
    scope: 'PMC, Structural Coordination, MEP Engineering & Finishing Quality Assurance',
    completionYear: '2024',
    clientSavings: '₹18.6 Lakhs Audited & Saved on Bill Measurements',
    description: 'An architectural tour de force located in the serene surroundings of Tataguni off Kanakapura Road. CS Associates managed over 14 specialized subcontractors, ensuring perfect joint alignment, shadow gap detailing, and on-schedule delivery.'
  },
  {
    id: 'indiranagar-healthcare',
    title: 'Indiranagar Diagnostic & Specialty Center',
    category: 'healthcare',
    categoryLabel: 'Healthcare Facility',
    location: '100ft Road, Indiranagar, Bengaluru',
    builtUpArea: '16,500 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/healthcare_commercial_1790599676109.jpg',
    highlights: [
      'NABH and Fire Safety statutory compliance engineering',
      'Sterile airflow HVAC with HEPA filtration for minor OT & diagnostic labs',
      'Medical gas pipeline routing (MGPS) & bio-medical waste management',
      'Anti-bacterial, seamless chemical-resistant vinyl flooring'
    ],
    scope: 'Healthcare PMC, Statutory Compliance Audits, MEP & Cleanroom Coordination',
    completionYear: '2023',
    clientSavings: 'Delivered 35 days ahead of schedule for early clinical launch',
    description: 'A cutting-edge medical diagnostic facility built with zero margin for error. CS Associates led statutory approvals, clinical workflow MEP coordination, and infection-control architectural detailing to achieve flawless hospital licensing.'
  },
  {
    id: 'sadashivanagar-villa',
    title: 'Sadashivanagar Heritage Contemporary Villa',
    category: 'residential',
    categoryLabel: 'Luxury Villa',
    location: 'Sadashivanagar, Bengaluru',
    builtUpArea: '9,800 sq.ft.',
    status: 'Completed',
    image: '/src/assets/images/hero_luxury_architecture_1790599616170.jpg',
    highlights: [
      'Precision groove detailing, mitre joints & shadow gap ceilings',
      'Central green atrium with skylight thermal ventilation',
      'High-grade Vaastu compliance in orientation and zoning',
      'Dedicated on-site resident civil engineer throughout execution'
    ],
    scope: 'End-to-End PMC, Vaastu Compliance & Artisan Finishing Oversight',
    completionYear: '2023',
    clientSavings: '14.2% Cost Savings through direct vendor negotiations',
    description: 'Located in one of Bengaluru’s most prestigious avenues, this residence demanded the highest level of craftsmanship. CS Associates supervised all concrete shuttering, stone book-matching, and lighting automation.'
  }
];
