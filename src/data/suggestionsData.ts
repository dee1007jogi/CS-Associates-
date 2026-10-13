export interface SuggestionItem {
  id: string;
  type: 'interior' | 'construction';
  category: string;
  subcategory: string;
  title: string;
  shortDescription: string;
  detailedSpecs: string[];
  civilPrecautions?: string[];
  recommendedMaterials: string[];
  colorPalette: {
    name: string;
    hex: string;
    role: string;
  }[];
  primaryImage: string;
  secondaryImages?: string[];
  estimatedTimeline: string;
  architecturalStyle: string;
  proTip: string;
}

export interface CuratedColorTone {
  id: string;
  name: string;
  category: 'earth' | 'neutral' | 'bold' | 'mineral' | 'wood';
  hex: string;
  rgb: string;
  description: string;
  interiorMood: string;
  civilApplication: string;
  pairedWood: string;
  pairedMetal: string;
  pairedStone: string;
  harmony: {
    sixtyPercentDominant: { name: string; hex: string; desc: string };
    thirtyPercentSecondary: { name: string; hex: string; desc: string };
    tenPercentAccent: { name: string; hex: string; desc: string };
  };
  contrastingPalettes: {
    tonal: { name: string; hex: string }[];
    analogous: { name: string; hex: string }[];
    modernContrast: { name: string; hex: string }[];
    exteriorCivil: { name: string; hex: string }[];
  };
}

export const CURATED_COLOR_TONES: CuratedColorTone[] = [
  {
    id: 'warm-terracotta',
    name: 'Warm Terracotta',
    category: 'earth',
    hex: '#C86446',
    rgb: 'rgb(200, 100, 70)',
    description: 'Earthy fired-clay warmth rooted in vernacular masonry and Mediterranean tranquility.',
    interiorMood: 'Welcoming, tactile, sun-drenched sanctuary with grounded organic richness.',
    civilApplication: 'Exposed wire-cut brick cladding, baked clay roof shingles, and courtyard pavers.',
    pairedWood: 'Smoked Teak or Natural Fluted Oak',
    pairedMetal: 'Antique Brushed Brass or Raw Copper',
    pairedStone: 'Honed Travertine or Warm Sandstone',
    harmony: {
      sixtyPercentDominant: { name: 'Alabaster Chalk', hex: '#F4EFEB', desc: 'Airy lime-wash walls creating soft, light-filled contrast.' },
      thirtyPercentSecondary: { name: 'Warm Terracotta', hex: '#C86446', desc: 'Feature focal walls, clay tiling, and fluted joinery.' },
      tenPercentAccent: { name: 'Lustrous Antique Brass', hex: '#CAA148', desc: 'Sculptural light sconces and cabinet edge pulls.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Pale Terracotta Blush', hex: '#E6A896' },
        { name: 'Fired Sienna', hex: '#C86446' },
        { name: 'Deep Rust Ochre', hex: '#9E4429' },
      ],
      analogous: [
        { name: 'Desert Amber', hex: '#D97736' },
        { name: 'Terracotta Core', hex: '#C86446' },
        { name: 'Mulberry Plum', hex: '#8C3D4D' },
      ],
      modernContrast: [
        { name: 'Terracotta', hex: '#C86446' },
        { name: 'Nordic Slate Charcoal', hex: '#2B303A' },
        { name: 'Crisp Architectural White', hex: '#FFFFFF' },
      ],
      exteriorCivil: [
        { name: 'Terracotta Wire-Cut Brick', hex: '#B8583B' },
        { name: 'Off-Form Exposed Concrete', hex: '#9C9B98' },
        { name: 'Blackened Steel Louvers', hex: '#1C1917' },
      ],
    },
  },
  {
    id: 'sage-whisper',
    name: 'Sage Whisper',
    category: 'mineral',
    hex: '#7E9181',
    rgb: 'rgb(126, 145, 129)',
    description: 'Biophilic muted eucalyptus green that softens harsh daylight and promotes acoustic calm.',
    interiorMood: 'Botanical serenity, restorative and restful for bedrooms and wellness spaces.',
    civilApplication: 'Thermal insulation coating, exterior garden planter retaining walls, and zinc accents.',
    pairedWood: 'Bleached Ash or Light White Oak',
    pairedMetal: 'Brushed Champagne Gold or Satin Nickel',
    pairedStone: 'Verde Green Marble or Grey Basalt',
    harmony: {
      sixtyPercentDominant: { name: 'Parchment Linen', hex: '#F5F2EB', desc: 'Natural limewash ceiling and primary walls.' },
      thirtyPercentSecondary: { name: 'Sage Whisper', hex: '#7E9181', desc: 'Full-height kitchen cabinetry and wardrobe fascias.' },
      tenPercentAccent: { name: 'Burnished Bronze', hex: '#4A3B32', desc: 'Track fixtures, door levers, and linear picture rails.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Misty Mint', hex: '#B5C4B7' },
        { name: 'Sage Whisper', hex: '#7E9181' },
        { name: 'Forest Shadow', hex: '#445648' },
      ],
      analogous: [
        { name: 'Pale Olive', hex: '#9B9B68' },
        { name: 'Sage Whisper', hex: '#7E9181' },
        { name: 'Eucalyptus Teal', hex: '#588B8B' },
      ],
      modernContrast: [
        { name: 'Sage Whisper', hex: '#7E9181' },
        { name: 'Warm Terracotta Clay', hex: '#C86446' },
        { name: 'Chalk White', hex: '#FAFAF7' },
      ],
      exteriorCivil: [
        { name: 'Sage Micro-Cement Plaster', hex: '#7E9181' },
        { name: 'Charcoal Rough-Cut Granite', hex: '#333533' },
        { name: 'Pergola Teak Slats', hex: '#8F5734' },
      ],
    },
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate',
    category: 'neutral',
    hex: '#2E353B',
    rgb: 'rgb(46, 53, 59)',
    description: 'Deep architectural graphite charcoal that grounds bright spaces with confident modern luxury.',
    interiorMood: 'Sophisticated, theatrical, dramatic backdrop for art collections and task focus.',
    civilApplication: 'Powder-coated aluminum glazing mullions, structural steel I-beams, and granite coping.',
    pairedWood: 'American Black Walnut or Charred Shou Sugi Ban',
    pairedMetal: 'Satin Brass or Anodized Gunmetal',
    pairedStone: 'Nero Marquina or Flamed Black Granite',
    harmony: {
      sixtyPercentDominant: { name: 'Warm Greige', hex: '#E5DFD7', desc: 'Expansive micro-topping floor and ambient walls.' },
      thirtyPercentSecondary: { name: 'Nordic Slate', hex: '#2E353B', desc: 'Island counter monolith and bespoke study niche.' },
      tenPercentAccent: { name: 'Antigravity Vibrant Orange', hex: '#F97316', desc: 'Accent lounge cushions, art frames, and warm 2700K cove glow.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Steel Mist', hex: '#707C87' },
        { name: 'Nordic Slate', hex: '#2E353B' },
        { name: 'Obsidian Midnight', hex: '#16191C' },
      ],
      analogous: [
        { name: 'Deep Petroleum Blue', hex: '#203A43' },
        { name: 'Nordic Slate', hex: '#2E353B' },
        { name: 'Charcoal Olive', hex: '#2F342B' },
      ],
      modernContrast: [
        { name: 'Nordic Slate', hex: '#2E353B' },
        { name: 'Pure Architectural Ochre', hex: '#E09F3E' },
        { name: 'Statuario White', hex: '#F8F9FA' },
      ],
      exteriorCivil: [
        { name: 'Nordic Slate Facade Panels', hex: '#2E353B' },
        { name: 'Cast Concrete Boardform', hex: '#9E9D99' },
        { name: 'Reflective Low-E Glass', hex: '#6D8299' },
      ],
    },
  },
  {
    id: 'travertine-gold',
    name: 'Travertine Gold',
    category: 'mineral',
    hex: '#D1B47E',
    rgb: 'rgb(209, 180, 126)',
    description: 'Subtle mineral champagne limestone reminiscent of Roman architectural permanence.',
    interiorMood: 'Quiet luxury, opulent warmth, seamless indoor-outdoor transition.',
    civilApplication: 'Dry-clad facade stonework, swimming pool deck coping, and lobby columns.',
    pairedWood: 'Natural Bleached Oak or Rift Cut Elm',
    pairedMetal: 'Hand-Rubbed Antique Brass or Brushed Bronze',
    pairedStone: 'Navona Travertine or Botticino Marble',
    harmony: {
      sixtyPercentDominant: { name: 'Travertine Gold', hex: '#D1B47E', desc: 'Honed travertine floor slabs and fluted feature wall.' },
      thirtyPercentSecondary: { name: 'Ivory Sand', hex: '#F4EEDA', desc: 'Venetian plaster ceiling and linen upholstery.' },
      tenPercentAccent: { name: 'Charcoal Bronze', hex: '#2B2621', desc: 'Minimalist shadow gap reveals and recessed spotlights.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Limestone Cream', hex: '#EDE3CF' },
        { name: 'Travertine Gold', hex: '#D1B47E' },
        { name: 'Raw Ochre Earth', hex: '#997D47' },
      ],
      analogous: [
        { name: 'Caramel Amber', hex: '#C28240' },
        { name: 'Travertine Gold', hex: '#D1B47E' },
        { name: 'Celadon Sand', hex: '#B8BF9E' },
      ],
      modernContrast: [
        { name: 'Travertine Gold', hex: '#D1B47E' },
        { name: 'Deep Midnight Navy', hex: '#16233B' },
        { name: 'Pure White Linen', hex: '#FFFFFF' },
      ],
      exteriorCivil: [
        { name: 'Natural Travertine Slab', hex: '#D1B47E' },
        { name: 'Exposed Aggregate Concrete', hex: '#878378' },
        { name: 'Curtain Wall Anodized Bronze', hex: '#3E342B' },
      ],
    },
  },
  {
    id: 'deep-navy',
    name: 'Imperial Navy',
    category: 'bold',
    hex: '#1D2E44',
    rgb: 'rgb(29, 46, 68)',
    description: 'Commanding oceanic cobalt with timeless corporate and residential presence.',
    interiorMood: 'Executive confidence, contemplative sanctuary, deep luxury for master suites and libraries.',
    civilApplication: 'Water tank reflective coatings, external parapet waterproofing accent, weather-coat trims.',
    pairedWood: 'Quarter-Sawn White Oak or Rich Teak',
    pairedMetal: 'High-Polish Brass or Champagne Gold',
    pairedStone: 'Calacatta Gold with Honey Veins',
    harmony: {
      sixtyPercentDominant: { name: 'Chiffon Alabaster', hex: '#F6F4F0', desc: 'Primary light walls and reflective coffered ceiling.' },
      thirtyPercentSecondary: { name: 'Imperial Navy', hex: '#1D2E44', desc: 'Master bedroom accent backdrop and custom library wall.' },
      tenPercentAccent: { name: 'Polished Brass Glint', hex: '#DFBA5B', desc: 'Pendant armatures and flush floor transition strips.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Aegean Dusk', hex: '#4B6B94' },
        { name: 'Imperial Navy', hex: '#1D2E44' },
        { name: 'Abyssal Night', hex: '#0B131E' },
      ],
      analogous: [
        { name: 'Deep Spruce Pine', hex: '#1A3C38' },
        { name: 'Imperial Navy', hex: '#1D2E44' },
        { name: 'Regal Violet Slate', hex: '#342646' },
      ],
      modernContrast: [
        { name: 'Imperial Navy', hex: '#1D2E44' },
        { name: 'Burnt Persimmon Orange', hex: '#E75A24' },
        { name: 'Parchment White', hex: '#F8F6F0' },
      ],
      exteriorCivil: [
        { name: 'Imperial Navy Metal Cladding', hex: '#1D2E44' },
        { name: 'White Dolomite Stone', hex: '#EBEAE5' },
        { name: 'Structural Glazing Tint', hex: '#42586D' },
      ],
    },
  },
  {
    id: 'concrete-gray',
    name: 'Architectural Concrete',
    category: 'neutral',
    hex: '#969692',
    rgb: 'rgb(150, 150, 146)',
    description: 'Raw, honest Brutalist finish celebrating aggregate, formwork lines, and structural permanence.',
    interiorMood: 'Minimalist industrial zen, gallery purity, uncluttered mindfulness.',
    civilApplication: 'M25/M30 boardform RCC walls, polished micro-concrete flooring, precast lintels.',
    pairedWood: 'Reclaimed Railway Teak or Light Birch',
    pairedMetal: 'Blackened Patinated Mild Steel',
    pairedStone: 'Rough-Chiseled Sadahalli Grey Granite',
    harmony: {
      sixtyPercentDominant: { name: 'Architectural Concrete', hex: '#969692', desc: 'Cast-in-place ceiling and seamless floor screed.' },
      thirtyPercentSecondary: { name: 'Smoked Oak Carbon', hex: '#3A322B', desc: 'Low-slung joinery and acoustic slat wall.' },
      tenPercentAccent: { name: 'Safety Construction Orange', hex: '#F97316', desc: 'Accent light cord, cantilever shelf, and art canvas.' },
    },
    contrastingPalettes: {
      tonal: [
        { name: 'Mist Concrete', hex: '#C2C2BE' },
        { name: 'Architectural Concrete', hex: '#969692' },
        { name: 'Charcoal Aggregate', hex: '#474744' },
      ],
      analogous: [
        { name: 'Stone Greige', hex: '#A3998D' },
        { name: 'Architectural Concrete', hex: '#969692' },
        { name: 'Slate Blue Grey', hex: '#88939B' },
      ],
      modernContrast: [
        { name: 'Architectural Concrete', hex: '#969692' },
        { name: 'CS Brand Amber Orange', hex: '#F97316' },
        { name: 'Monolith Jet Black', hex: '#121212' },
      ],
      exteriorCivil: [
        { name: 'Off-Shutter Fair-Faced RCC', hex: '#969692' },
        { name: 'Rust Corten Steel Screen', hex: '#873E23' },
        { name: 'Clear Structural Glass', hex: '#CFDAE0' },
      ],
    },
  },
];

export const ALL_SUGGESTIONS: SuggestionItem[] = [
  // ─── 1. INTERIOR: LIVING & SOCIAL ───
  {
    id: 'sugg-living-herringbone',
    type: 'interior',
    category: 'Living & Social',
    subcategory: 'Flooring & Geometry',
    title: 'Calibrated French Oak Herringbone with Brass Inlays',
    shortDescription: 'Anchor fluid living rooms with 45-degree herringbone parquetry framed by 4mm flush brass demarcation trims.',
    detailedSpecs: [
      '14mm engineered multilayer French White Oak with UV cured matte lacquer',
      'Continuous acoustic underlayment mitigating footfall noise by 19dB',
      '4mm solid extruded brass transition strip separating tiled foyer from timber living room',
      'Expansion gap concealed by shadow-line baseboard detail instead of bulky skirting',
    ],
    civilPrecautions: [
      'Subfloor moisture content must be tested below 12% using pinless moisture meter prior to laying',
      'Laser-level screed flatness tolerance strictly capped at ≤2mm over a 2-meter straightedge',
    ],
    recommendedMaterials: ['Engineered French Oak', 'Extruded Brass', 'Acoustic Rubber Cork Pad'],
    colorPalette: [
      { name: 'Honey Oak', hex: '#C49767', role: 'Primary 60%' },
      { name: 'Antique Brass', hex: '#CAA148', role: 'Accent 10%' },
      { name: 'Linen Off-White', hex: '#FAF7F0', role: 'Secondary 30%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '8 - 12 Days for 1,200 sq.ft',
    architecturalStyle: 'Modern Organic Luxury',
    proTip: 'Always orient the apex of the herringbone chevron towards the primary floor-to-ceiling balcony window to draw daylight through the living area.',
  },
  {
    id: 'sugg-living-cove-lighting',
    type: 'interior',
    category: 'Living & Social',
    subcategory: 'Lighting Architecture',
    title: 'Floating Ceiling with Indirect 2700K Architectural Cove',
    shortDescription: 'Eliminate glare with dual-extrusion concealed plaster-in LED coves delivering 450 lumens per meter of warm ambient wash.',
    detailedSpecs: [
      'High CRI 95+ COB dotless LED strips running at 2700 Kelvin warm white',
      'Concealed aluminum profile with 45-degree diffused PMMA cover to prevent diode hot spots',
      'DALI-2 / 0-10V dimmable drivers centrally racked inside ventilated utility closet',
      'Drop perimeter ceiling dropped exactly 120mm with a 65mm recessed light throat',
    ],
    civilPrecautions: [
      'Gypsum framing must use GI studs with 0.55mm minimum gauge to avoid sagging over 4m spans',
      'Conduit wiring paths must be tested and isolated prior to closing gypsum boards',
    ],
    recommendedMaterials: ['Plaster-in Aluminum Channel', 'High-CRI COB LEDs', 'Saint-Gobain Gyproc'],
    colorPalette: [
      { name: 'Warm 2700K Glow', hex: '#FFE8C2', role: 'Accent 10%' },
      { name: 'Shadow Charcoal', hex: '#2B2B2A', role: 'Accent 10%' },
      { name: 'Chalk White', hex: '#F9F8F5', role: 'Primary 80%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '5 - 7 Days per Room',
    architecturalStyle: 'Minimalist Contemporary',
    proTip: 'Paint the inner surface of the cove with ultra-matte white paint (LRV 88+) to bounce 30% more soft ambient light into the central living volume.',
  },
  {
    id: 'sugg-living-fluted-panelling',
    type: 'interior',
    category: 'Living & Social',
    subcategory: 'Wall Treatments',
    title: 'Full-Height Fluted Charcoal & Travertine Media Wall',
    shortDescription: 'A seamless TV & fireplace credenza combining CNC-fluted acoustic MDF slats with bookmatched Navona travertine slabs.',
    detailedSpecs: [
      '20mm precision CNC milled fluted panels with sound-absorbing recycled PET backing',
      'Navona Travertine slabs honed and bookmatched with invisible mechanical stone brackets',
      'Recessed conduit chase engineered for 85" OLED TV, optical cables, and subwoofers',
      'Integrated cantilevered floating console with motorized soft-down drawers',
    ],
    civilPrecautions: [
      'Masonry wall must be checked with plumb bob; hollow-block walls require chemical anchors for stone cantilevers',
      'All HDMI/CAT-7 cables routed through 50mm smooth-bore rigid PVC pipe with pull-wires',
    ],
    recommendedMaterials: ['Navona Travertine', 'Acoustic Fluted MDF', 'Matte Black Aluminum'],
    colorPalette: [
      { name: 'Navona Travertine', hex: '#D1B47E', role: 'Secondary 30%' },
      { name: 'Charcoal Graphite', hex: '#2E353B', role: 'Secondary 30%' },
      { name: 'Smoked Oak', hex: '#4A3B32', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '10 - 14 Days',
    architecturalStyle: 'Warm Brutalist Luxury',
    proTip: 'Incorporate a 15mm negative shadow-line at the ceiling interface and floor to make the heavy travertine mass appear weightlessly floating.',
  },

  // ─── 2. INTERIOR: MODULAR KITCHENS & DINING ───
  {
    id: 'sugg-kitchen-monolith-island',
    type: 'interior',
    category: 'Kitchens & Dining',
    subcategory: 'Ergonomics & Stone',
    title: 'Cantilevered Calacatta Quartz Monolith Kitchen Island',
    shortDescription: 'Multi-functional entertaining island with 60mm mitred waterfall edge, flush induction hob, and hidden pop-up power towers.',
    detailedSpecs: [
      'Stain-proof engineered quartz with continuous grain waterfall miter along both ends',
      'Concealed internal structural steel RHS sub-frame supporting 600mm unsupported cantilever seating',
      'Flush-mount induction hob with downdraft ventilation removing grease at pan level',
      'Undermount composite granite sink with integrated workstation ledge and pull-down sprayer',
    ],
    civilPrecautions: [
      'Island floor stub-ups for electrical, plumbing, and 100mm exhaust core must be cast during slab pour',
      'Dedicated 32A MCB breaker on independent circuit for high-draw induction cooking',
    ],
    recommendedMaterials: ['Engineered Quartz', 'Internal RHS Steel Frame', 'Anti-Fingerprint Laminate'],
    colorPalette: [
      { name: 'Calacatta White', hex: '#F0EFEA', role: 'Primary 60%' },
      { name: 'Smoked Walnut', hex: '#3E2F26', role: 'Secondary 30%' },
      { name: 'Matte Gunmetal', hex: '#26282A', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '14 - 18 Days',
    architecturalStyle: 'Modern Architectural Kitchen',
    proTip: 'Maintain a minimum 1,050mm aisle clearance between the island and perimeter counters to allow two chefs to cook without bumping backs.',
  },
  {
    id: 'sugg-kitchen-handleless-cabinetry',
    type: 'interior',
    category: 'Kitchens & Dining',
    subcategory: 'Hardware & Joinery',
    title: 'Gola-Profile Handleless Cabinetry with Pocket Doors',
    shortDescription: 'Zero hardware visual clutter with continuous extruded aluminum J-pull channels and bi-fold pocket doors hiding appliance towers.',
    detailedSpecs: [
      'Blum LEGRABOX dark grey drawer runners rated for 70kg dynamic load with TIP-ON BLUMOTION',
      'FENIX NTM nano-tech thermal healing laminate resistant to micro-scratches and fingerprints',
      'HAWA Concepta 25/30 bi-fold pocket door systems for concealing espresso bar and toaster niche',
      'Interior drawer sensory LED illumination triggered automatically upon drawer slide extension',
    ],
    civilPrecautions: [
      'Perimeter walls must be certified 90-degree square using precision metal square before cabinet installation',
      'Tile splashback adhesive must be waterproof polymer-modified epoxy grout',
    ],
    recommendedMaterials: ['FENIX NTM Matte Surface', 'Blum Legrabox Hardware', 'Anodized Aluminum Gola'],
    colorPalette: [
      { name: 'Sage Green Matte', hex: '#7E9181', role: 'Primary 60%' },
      { name: 'Brushed Brass', hex: '#CAA148', role: 'Accent 10%' },
      { name: 'Light Concrete', hex: '#B8B7B2', role: 'Secondary 30%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '12 - 16 Days',
    architecturalStyle: 'Japandi Modernist',
    proTip: 'Install a dedicated water leak sensor probe with motorized solenoid shut-off valve beneath the sink to prevent costly hardwood damage.',
  },

  // ─── 3. INTERIOR: BEDROOMS & SUITES ───
  {
    id: 'sugg-bedroom-acoustic-headboard',
    type: 'interior',
    category: 'Bedrooms & Suites',
    subcategory: 'Sanctuary Design',
    title: 'Integrated Bouclé Bedhead with Fluted Sconces & Floating Nightstands',
    shortDescription: 'A cocoon-like acoustic upholstered wall with built-in wireless charging, touch dimmers, and floating drawer cantilevers.',
    detailedSpecs: [
      'Custom wall-to-wall acoustic upholstered panels in textured bouclé with fire-retardant foam core',
      'Integrated brass dual-articulated reading lights with independent toggle switches',
      'Solid oak nightstands floating 220mm off the floor with concealed wireless phone induction coils',
      'Recessed linear LED curtain pelmet washing textured linen drapes from floor to ceiling',
    ],
    civilPrecautions: [
      'Bed wall requires 2-way master bedside switching for room illumination',
      'Concealed conduit junction boxes installed at exact nightstand level (+550mm AFFL)',
    ],
    recommendedMaterials: ['Wool Bouclé Fabric', 'Natural White Oak', 'Hand-Spun Brass Sconces'],
    colorPalette: [
      { name: 'Oatmeal Bouclé', hex: '#EBE5D8', role: 'Primary 60%' },
      { name: 'Warm Terracotta Accent', hex: '#C86446', role: 'Secondary 30%' },
      { name: 'Champagne Brass', hex: '#D1B47E', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '7 - 10 Days',
    architecturalStyle: 'Quiet Luxury Scandinavian',
    proTip: 'Specify a motorized blackout roller blind recessed behind the decorative sheer linen curtain to ensure zero light bleed for restful circadian sleep.',
  },

  // ─── 4. INTERIOR: HOME OFFICES & COMPACT SPACES ───
  {
    id: 'sugg-office-concealed-ergonomics',
    type: 'interior',
    category: 'Home Offices & Compact',
    subcategory: 'Smart Productivity',
    title: 'Bespoke Oak Study Nook with Concealed Wire Architecture',
    shortDescription: 'Ergonomic dual-monitor workspace with cable chases, acoustic slat baffles, and built-in floating book display credenza.',
    detailedSpecs: [
      '28mm solid white oak desktop treated with natural hard-wax oil and bevelled shark-nose edge',
      'Integrated under-desk wire raceway with 6-socket surge protection and clean grommet exit',
      'Acoustic felt wall backing absorbing monitor keystrokes and video call reverberation',
      'Overhead 3000K high-CRI linear task light producing 500 lux across the active desk plane',
    ],
    civilPrecautions: [
      'Dedicated CAT-6 Ethernet drop directly terminated into the desk cable management tray',
      'Solid brick masonry fixing anchors capable of safely supporting 90kg desk cantilever loads',
    ],
    recommendedMaterials: ['Solid White Oak', 'Recycled PET Acoustic Slat', 'Black Powder-Coat Steel'],
    colorPalette: [
      { name: 'Nordic Slate', hex: '#2E353B', role: 'Secondary 30%' },
      { name: 'Natural Oak', hex: '#D4B26F', role: 'Primary 60%' },
      { name: 'Construction Amber', hex: '#F97316', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '6 - 8 Days',
    architecturalStyle: 'Nordic Functionalist',
    proTip: 'Position the study perpendicular to the window rather than directly facing it to prevent eye fatigue caused by harsh computer screen backlighting.',
  },

  // ─── 5. CIVIL & CONSTRUCTION: FOUNDATION & SOIL ───
  {
    id: 'sugg-civil-soil-investigation',
    type: 'construction',
    category: 'Foundation & Soil',
    subcategory: 'Geotechnical Engineering',
    title: 'Core Soil Testing & Safe Bearing Capacity (SBC) Footing Optimization',
    shortDescription: 'Borehole rotary core drilling and laboratory shear testing to eliminate structural foundation settlement risks before excavation begins.',
    detailedSpecs: [
      'Standard Penetration Test (SPT) conducted at 1.5m intervals up to hard strata depth',
      'Laboratory Atterberg limits and moisture content determination verifying expansive clay swelling index',
      'Foundation design customized between isolated trapezoidal footings vs combined raft slab',
      'Minimum Safe Bearing Capacity (SBC) certified by registered geotechnical engineer',
    ],
    civilPrecautions: [
      'Never commence foundation excavation based on adjacent plot soil assumptions; strata can shift within 15 meters',
      'Excavation de-watering pumps must be standing by on generator backup during monsoon season',
    ],
    recommendedMaterials: ['M25 Design Mix Concrete', 'Fe550D TMT Rebar', 'PPC Low-Heat Cement'],
    colorPalette: [
      { name: 'Soil Ochre', hex: '#A87948', role: 'Primary 50%' },
      { name: 'Concrete Gray', hex: '#969692', role: 'Secondary 40%' },
      { name: 'Safety Orange', hex: '#F97316', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '4 - 6 Days (Report & Engineering Design)',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'Conducting a ₹25,000 soil test frequently saves ₹3,00,000+ in over-designed foundation steel or prevents foundation cracking.',
  },
  {
    id: 'sugg-civil-anti-termite-barrier',
    type: 'construction',
    category: 'Foundation & Soil',
    subcategory: 'Subterranean Protection',
    title: '3-Stage Chemical Soil Anti-Termite Barrier (IS 6313 Part II)',
    shortDescription: 'Continuous chemical barrier along foundation trenches, plinth backfill, and masonry apron to safeguard woodwork for 25+ years.',
    detailedSpecs: [
      'Chlorpyrifos 20% EC or Imidacloprid 30.5% SC applied via calibrated low-pressure chemical power sprayer',
      'Stage 1: Trench bottom and sides treated at 5 litres per linear meter before footing pour',
      'Stage 2: Plinth backfill treated at 7.5 litres per square meter prior to sub-base compaction',
      'Stage 3: 300mm perimeter perimeter rodding around external plinth wall junction',
    ],
    civilPrecautions: [
      'Application strictly forbidden on waterlogged soil or during rainfall to avoid chemical dispersion',
      'Treated backfill must not be excavated or disturbed after treatment without localized re-application',
    ],
    recommendedMaterials: ['Imidacloprid 30.5% SC Emulsion', 'Calibrated Sprayer Lance', 'Chemical Safety Gear'],
    colorPalette: [
      { name: 'Earth Sienna', hex: '#7D4F32', role: 'Primary 60%' },
      { name: 'Lime Mortar', hex: '#EBE5D8', role: 'Secondary 30%' },
      { name: 'Amber Indicator', hex: '#D97706', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '1 - 2 Days per Construction Phase',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'Ensure plumbing pipe penetrations through the slab receive a dedicated chemical collar ring, as termites almost always enter through loose pipe sleeves.',
  },

  // ─── 6. CIVIL & CONSTRUCTION: WATERPROOFING & MOISTURE ───
  {
    id: 'sugg-civil-crystalline-waterproofing',
    type: 'construction',
    category: 'Waterproofing & Moisture',
    subcategory: 'Hydrostatic Sealing',
    title: 'Crystalline Waterproofing with 72-Hour Sunken Slab Flood Test',
    shortDescription: 'Self-healing crystalline waterproofing slurry reacting with moisture to block concrete micro-pores, tested by 72-hour ponding.',
    detailedSpecs: [
      'Penetron / Kryton catalytic crystalline coating penetrating up to 300mm into concrete capillaries',
      'Crack self-healing capability sealing future micro-cracks up to 0.4mm under continuous water pressure',
      'Minimum 100mm high cove filleting along all slab-to-brick masonry perimeter corners',
      'Ponding flood test filled to 75mm depth and marked with water gauge monitored over 72 continuous hours',
    ],
    civilPrecautions: [
      'Concrete surface must be pressure washed to expose open capillary pores; no oil or dust allowed',
      'All plumbing sleeves must be hydro-tested at 10-bar prior to pouring screed and tiles',
    ],
    recommendedMaterials: ['Crystalline Slurry Concentrate', 'Polymer Cementitious Mortar', 'Epoxy Joint Sealant'],
    colorPalette: [
      { name: 'Deep Aqua Seal', hex: '#2A5D74', role: 'Secondary 30%' },
      { name: 'Concrete Grey', hex: '#969692', role: 'Primary 60%' },
      { name: 'Orange Quality Seal', hex: '#F97316', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '5 - 7 Days (including 72hr test)',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'Sign off on zero seepage with your PMC on the underside of the slab before any false ceiling contractor is permitted to erect gypsum framing.',
  },
  {
    id: 'sugg-civil-damp-proof-course',
    type: 'construction',
    category: 'Waterproofing & Moisture',
    subcategory: 'Capillary Barrier',
    title: 'Continuous 50mm Bituminous Damp Proof Course (DPC) at Plinth Level',
    shortDescription: 'Stop ground capillary dampness and paint efflorescence with 1:1.5:3 waterproofed concrete topped with hot bitumen and membrane.',
    detailedSpecs: [
      '50mm thick M20 grade concrete layer with integral polymer waterproofing additive (Dr. Fixit Pidiproof)',
      'Single continuous layer of hot bitumen asphalt coat (grade 85/25) applied at 1.7 kg/sq.m',
      'Self-adhesive SBS modified elastomeric bituminous membrane sheet overlap of at least 100mm',
      'Absolute continuity across door frames and external wall steps without thermal bridge gaps',
    ],
    civilPrecautions: [
      'The DPC must sit at least 150mm above adjacent finished exterior ground level to prevent garden rain splashover',
      'Never allow brick masons to chip or puncture the DPC layer for temporary scaffolding ties',
    ],
    recommendedMaterials: ['Polymer Concrete M20', 'Hot Blown Bitumen', 'SBS Elastomeric Membrane'],
    colorPalette: [
      { name: 'Bitumen Black', hex: '#1C1917', role: 'Secondary 30%' },
      { name: 'Terracotta Brick', hex: '#C86446', role: 'Primary 60%' },
      { name: 'Mortar Grey', hex: '#D6D3D1', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '2 - 3 Days',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'A properly executed ₹15,000 DPC eliminates 90% of peeling paint, blistered wallpaper, and white powdery salts at the bottom of ground-floor walls forever.',
  },

  // ─── 7. CIVIL & CONSTRUCTION: MEP & CONCEALED CONDUITS ───
  {
    id: 'sugg-civil-pre-plaster-conduit-mapping',
    type: 'construction',
    category: 'MEP & Concealed Conduits',
    subcategory: 'Electromechanical Coordination',
    title: 'Pre-Plaster 3D Clash-Free Conduit Chasing with Chicken-Mesh Reinforcement',
    shortDescription: 'Diamond-blade wall chasing with GI chicken-mesh bridging across RCC and brick joints to guarantee zero plaster hairline cracking.',
    detailedSpecs: [
      'Heavy-duty FRLS (Flame Retardant Low Smoke) rigid PVC conduits recessed at least 15mm into masonry',
      'Twin-blade dustless diamond wall chaser used to maintain clean parallel slot edges without hammer fracturing',
      '20-gauge galvanized wire chicken-mesh installed with minimum 100mm overlap on either side of the chased slot',
      'Full as-built photographic and dimensional mapping documented for client records before plaster coat',
    ],
    civilPrecautions: [
      'Horizontal chasing in structural RCC columns or load-bearing beams is strictly prohibited by code',
      'Conduits must never share chased grooves with water supply or gas piping (minimum 150mm separation)',
    ],
    recommendedMaterials: ['FRLS Rigid PVC Conduits', 'GI Chicken Wire Mesh', 'Polymer Repair Mortar'],
    colorPalette: [
      { name: 'Masonry Terracotta', hex: '#B8583B', role: 'Primary 50%' },
      { name: 'Conduit Slate', hex: '#3B444B', role: 'Secondary 40%' },
      { name: 'Wire Amber', hex: '#F59E0B', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '6 - 10 Days',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'Always save a digital copy of the pre-plaster conduit photo map so future art hanging or carpentry screws never drill into live 230V electrical wires.',
  },

  // ─── 8. CIVIL & CONSTRUCTION: PLASTER, MASONRY & FINISH ───
  {
    id: 'sugg-civil-line-dori-curing',
    type: 'construction',
    category: 'Plaster, Masonry & Finish',
    subcategory: 'Dimensional Trueness',
    title: 'Line-Dori 90° Trueness Verification & 14-Day Wet Curing Logbook',
    shortDescription: 'Achieve plumb walls with 90° kitchen corners using string-line button marks, cured with sprinkler burlap for 14 continuous days.',
    detailedSpecs: [
      'Plaster thickness strictly regulated between 12mm - 15mm using pre-set button marks on plumb bob alignment',
      'Right-angle corner trueness verified using 3-4-5 Pythagorean theorem metal squares at all wardrobe and modular kitchen niches',
      'Washed manufactured sand (M-Sand) screened to remove silt fraction exceeding 5%',
      'Curing log maintained with mandatory morning, noon, and evening saturation for full hydration',
    ],
    civilPrecautions: [
      'Premature drying of plaster in direct sunlight causes spiderweb shrinkage cracks; cover walls with wet hessian burlap',
      'Paint or putty application must wait until moisture meter reads below 8% on finished plaster',
    ],
    recommendedMaterials: ['Graded Plastering M-Sand', 'Ordinary Portland Cement 43 Grade', 'Hessian Curing Burlap'],
    colorPalette: [
      { name: 'Plaster Grey', hex: '#A8A29E', role: 'Primary 70%' },
      { name: 'Burlap Jute', hex: '#D6C096', role: 'Secondary 20%' },
      { name: 'Plumb Orange', hex: '#EA580C', role: 'Accent 10%' },
    ],
    primaryImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    estimatedTimeline: '14 - 18 Days Curing & Finishing',
    architecturalStyle: 'Civil Engineering Standard',
    proTip: 'True 90° corners in the kitchen save tens of thousands in modular cabinet packing wedges and unsightly silicone filling gaps.',
  },
];
