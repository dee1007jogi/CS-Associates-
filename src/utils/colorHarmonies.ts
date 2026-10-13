// Architectural Color Harmony Calculation Engine

export interface GeneratedColorPalette {
  baseHex: string;
  baseHsl: { h: number; s: number; l: number };
  isDark: boolean;
  sixtyPercentDominant: { name: string; hex: string; role: string; desc: string };
  thirtyPercentSecondary: { name: string; hex: string; role: string; desc: string };
  tenPercentAccent: { name: string; hex: string; role: string; desc: string };
  tonal: { name: string; hex: string }[];
  analogous: { name: string; hex: string }[];
  complementary: { name: string; hex: string }[];
  exteriorCivil: { name: string; hex: string }[];
  recommendedStone: string;
  recommendedWood: string;
  recommendedMetal: string;
  recommendedTextile: string;
  moodVerdict: string;
}

// Convert Hex to HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = Math.round(h * 60);
  }

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL back to Hex
export function hslToHex(h: number, s: number, l: number): string {
  h = (h % 360 + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n: number) => {
    const val = Math.round((n + m) * 255);
    return Math.max(0, Math.min(255, val)).toString(16).padStart(2, '0');
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Generate dynamic architectural harmonies for any color
export function generateArchitecturalPalette(hex: string, colorName?: string): GeneratedColorPalette {
  const { h, s, l } = hexToHsl(hex);
  const isDark = l < 50;

  // 60-30-10 Rule derivation
  // If base color is intense or dark, use a soft airy tone for 60%, base for 30%, bright metallic/vibrant for 10%
  let sixtyPercent: { name: string; hex: string; role: string; desc: string };
  let thirtyPercent: { name: string; hex: string; role: string; desc: string };
  let tenPercent: { name: string; hex: string; role: string; desc: string };

  if (l > 75) {
    // Light base color -> can serve directly as 60% dominant wall
    sixtyPercent = {
      name: colorName || 'Soft Ambient Canvas',
      hex: hex.toUpperCase(),
      role: 'Dominant Canvas (60%)',
      desc: 'Applied on primary living walls, ceilings, and large continuous plaster planes.',
    };
    thirtyPercent = {
      name: 'Architectural Shadow Joinery',
      hex: hslToHex(h, Math.min(s + 20, 70), Math.max(l - 45, 20)),
      role: 'Secondary Structure (30%)',
      desc: 'Anchors island cabinetry, fluted doors, and large modular wardrobes.',
    };
    tenPercent = {
      name: 'Lustrous Antique Brass',
      hex: '#CAA148',
      role: 'High-Impact Accent (10%)',
      desc: 'Architectural hardware, linear track fixtures, and sculpted lighting accents.',
    };
  } else if (l < 30) {
    // Very dark base color -> great as dramatic 30% feature wall or 60% moody suite
    sixtyPercent = {
      name: 'Calibrated Chalk Alabaster',
      hex: hslToHex(h, Math.min(s, 25), 94),
      role: 'Dominant Canvas (60%)',
      desc: 'Bright lime-wash walls providing breathable daylight dispersion.',
    };
    thirtyPercent = {
      name: colorName || 'Deep Architectural Mass',
      hex: hex.toUpperCase(),
      role: 'Secondary Feature (30%)',
      desc: 'Used for statement media wall, island monolith, and architectural window jambs.',
    };
    tenPercent = {
      name: 'Vibrant Amber Highlight',
      hex: hslToHex((h + 180) % 360, 85, 55),
      role: 'High-Impact Accent (10%)',
      desc: 'Cove lighting backwash, throw pillows, and art frame reveals.',
    };
  } else {
    // Mid-tone base color
    sixtyPercent = {
      name: 'Soft Tonal Plaster Tint',
      hex: hslToHex(h, Math.max(s - 30, 15), 93),
      role: 'Dominant Canvas (60%)',
      desc: 'Primary walls and hallway ceilings, keeping spaces expansive and bright.',
    };
    thirtyPercent = {
      name: colorName || 'Curated Signature Tone',
      hex: hex.toUpperCase(),
      role: 'Secondary Depth (30%)',
      desc: 'Applied across kitchen lower cabinets, bedhead acoustic panels, and floor rugs.',
    };
    tenPercent = {
      name: 'Brushed Brass / Champagne Glint',
      hex: hslToHex(45, 65, 52),
      role: 'High-Impact Accent (10%)',
      desc: 'Metallic hardware trims, minimalist door handles, and switch faceplates.',
    };
  }

  // Tonal Palette (same hue, varying lightness)
  const tonal = [
    { name: 'Feather Tint', hex: hslToHex(h, Math.max(s - 15, 10), Math.min(l + 32, 95)) },
    { name: 'Core Chroma', hex: hex.toUpperCase() },
    { name: 'Deep Shadow', hex: hslToHex(h, Math.min(s + 10, 85), Math.max(l - 28, 12)) },
  ];

  // Analogous Palette (+30 and -30 degrees)
  const analogous = [
    { name: 'Warm Companion', hex: hslToHex((h - 30 + 360) % 360, s, l) },
    { name: 'Chosen Base', hex: hex.toUpperCase() },
    { name: 'Cool Companion', hex: hslToHex((h + 30) % 360, s, l) },
  ];

  // Modern Complementary Palette (+180 degrees)
  const complementary = [
    { name: 'Selected Tone', hex: hex.toUpperCase() },
    { name: 'Harmonic Counterpart', hex: hslToHex((h + 180) % 360, Math.min(s, 75), Math.max(l, 40)) },
    { name: 'Matte Jet Black', hex: '#1C1917' },
  ];

  // Exterior Civil Harmony
  const exteriorCivil = [
    { name: 'Facade Element', hex: hex.toUpperCase() },
    { name: 'Off-Form Concrete Grey', hex: '#9E9D99' },
    { name: 'Wire-Cut Brick Clay', hex: '#B8583B' },
  ];

  // Material & Texture Pairings based on Hue & Warmth
  let recommendedStone = 'Honed Travertine or Warm Sandstone';
  let recommendedWood = 'Natural Fluted White Oak';
  let recommendedMetal = 'Lustrous Antique Brass';
  let recommendedTextile = 'Bouclé Oatmeal or Belgian Raw Linen';
  let moodVerdict = 'Warm, organic, and inviting with natural architectural grounding.';

  if (h >= 180 && h <= 260) {
    // Cool blues / cyan
    recommendedStone = 'Calacatta White with Honey Veining';
    recommendedWood = 'Smoked American Walnut';
    recommendedMetal = 'Brushed Champagne Bronze';
    recommendedTextile = 'Textured Slate Wool and Woven Jute';
    moodVerdict = 'Contemplative, serene executive atmosphere promoting focus and calm.';
  } else if (h >= 60 && h < 180) {
    // Greens / olives
    recommendedStone = 'Verde Antique or Grey Basalt Slabs';
    recommendedWood = 'Bleached European Ash or Light Oak';
    recommendedMetal = 'Satin Nickel or Brushed Matte Black';
    recommendedTextile = 'Washed Moss Linen and Slub Cotton';
    moodVerdict = 'Biophilic, restorative sanctuary bridging indoor living with courtyard gardens.';
  } else if (s < 20) {
    // Monochromatic / neutral grays
    recommendedStone = 'Statuario Marble or Sadahalli Granite';
    recommendedWood = 'Charred Shou Sugi Ban or Blackened Oak';
    recommendedMetal = 'Matte Black Stainless Steel';
    recommendedTextile = 'Chunky Ribbed Wool and Tailored Velvet';
    moodVerdict = 'Minimalist gallery aesthetic emphasizing dramatic volume and light play.';
  } else if (h < 50 || h > 330) {
    // Warm terracotta / red / amber
    recommendedStone = 'Roman Travertine or Desert Sandstone';
    recommendedWood = 'Natural Teak with Matte Polyurethane';
    recommendedMetal = 'Hand-Rubbed Antique Brass';
    recommendedTextile = 'Sun-Baked Terracotta Velvet and Raw Linen';
    moodVerdict = 'Tactile, earthy warmth celebrating craftsmanship and vernacular textures.';
  }

  return {
    baseHex: hex.toUpperCase(),
    baseHsl: { h, s, l },
    isDark,
    sixtyPercentDominant: sixtyPercent,
    thirtyPercentSecondary: thirtyPercent,
    tenPercentAccent: tenPercent,
    tonal,
    analogous,
    complementary,
    exteriorCivil,
    recommendedStone,
    recommendedWood,
    recommendedMetal,
    recommendedTextile,
    moodVerdict,
  };
}
