import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Sparkles, 
  Search, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sliders, 
  Eye, 
  HardHat, 
  Sofa, 
  Compass, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  X,
  Share2,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  Building,
  Ruler,
  Droplets,
  Wrench,
  Sun
} from 'lucide-react';
import { 
  ALL_SUGGESTIONS, 
  CURATED_COLOR_TONES, 
  SuggestionItem, 
  CuratedColorTone 
} from '../data/suggestionsData';
import { 
  generateArchitecturalPalette, 
  GeneratedColorPalette 
} from '../utils/colorHarmonies';
import { PageHero } from '../components/PageHero';

interface DesignSuggestionsPageProps {
  onOpenConsultation: () => void;
}

export const DesignSuggestionsPage: React.FC<DesignSuggestionsPageProps> = ({ 
  onOpenConsultation 
}) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  // Active Tab Filter ('all' | 'interior' | 'construction' | specific subcategory)
  const [selectedDiscipline, setSelectedDiscipline] = useState<'all' | 'interior' | 'construction'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Color Studio States
  const [selectedCuratedTone, setSelectedCuratedTone] = useState<CuratedColorTone>(CURATED_COLOR_TONES[0]);
  const [customHex, setCustomHex] = useState<string>(CURATED_COLOR_TONES[0].hex);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<'interior' | 'facade'>('interior');

  // Detail Modal State
  const [selectedModalItem, setSelectedModalItem] = useState<SuggestionItem | null>(null);

  // Deep-linking from card action links: auto-select category & discipline and smooth-scroll
  useEffect(() => {
    const cat = searchParams.get('category');
    const disc = searchParams.get('discipline') as 'all' | 'interior' | 'construction' | null;
    if (cat) {
      setSelectedCategory(cat);
    }
    if (disc) {
      setSelectedDiscipline(disc);
    }
    if (cat || disc || window.location.hash) {
      const scrollTimer = setTimeout(() => {
        const targetId = window.location.hash.replace('#', '') || 'suggestions-catalogue';
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(scrollTimer);
    }
  }, [searchParams]);

  // Compute Active Palette dynamically
  const activePalette: GeneratedColorPalette = useMemo(() => {
    return generateArchitecturalPalette(
      customHex, 
      isCustomMode ? 'Custom Chosen Tone' : selectedCuratedTone.name
    );
  }, [customHex, isCustomMode, selectedCuratedTone]);

  // Handle color change from curated list
  const handleSelectCuratedColor = (tone: CuratedColorTone) => {
    setSelectedCuratedTone(tone);
    setCustomHex(tone.hex);
    setIsCustomMode(false);
  };

  // Handle custom color input
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    setIsCustomMode(true);
  };

  // Copy hex helper
  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    return ALL_SUGGESTIONS.filter((item) => {
      // Discipline filter
      if (selectedDiscipline !== 'all' && item.type !== selectedDiscipline) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesMaterials = item.recommendedMaterials.some(m => m.toLowerCase().includes(query));
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesMaterials || matchesCategory;
      }
      return true;
    });
  }, [selectedDiscipline, selectedCategory, searchQuery]);

  // Categories list for pills
  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(ALL_SUGGESTIONS.map(s => s.category)));
    return ['all', ...categories];
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-orange-500 selection:text-white pb-28">
      
      {/* ── 1. CINEMATIC PAGE HERO (Matching all other pages) ── */}
      <PageHero
        badge="Design & Civil Studio · Curated Library"
        title="Curated Interior Concepts &"
        highlightedTitle="Civil Engineering Guidance"
        description="Explore an extensive catalogue of living spaces, ergonomic kitchens, and structural engineering checkpoints. Use our interactive Color Combo Studio to select base tones and generate calibrated 60-30-10 architectural harmonies, material pairings, and contractor specifications."
        backgroundImage="/src/assets/images/gallery_luxury_interior_1790601175826.jpg"
        breadcrumbLabel="Design Studio"
        focusTag="COLOR & CIVIL MATRIX · DESIGN STUDIO"
        focusSubtitle="Curated 60-30-10 Harmonies & Field Checkpoints"
        primaryActionLabel="Schedule Design Call"
        onPrimaryAction={onOpenConsultation}
        stats={[
          { value: '60-30-10', label: 'Color Ratio' },
          { value: `${ALL_SUGGESTIONS.length}+`, label: 'Design Concepts' },
          { value: 'IS 456', label: 'Civil Specs' }
        ]}
      >
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 pt-2 w-full">
          <a 
            href="#color-studio"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm text-center"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Launch Color Studio</span>
          </a>

          <a 
            href="#suggestions-catalogue"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 text-xs font-mono font-semibold transition-all shadow-sm text-center"
          >
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>Browse All Suggestions ({ALL_SUGGESTIONS.length})</span>
          </a>
        </div>
      </PageHero>

      {/* ── 2. INTERACTIVE COLOR COMBO SUGGESTION STUDIO ── */}
      <section id="color-studio" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 mb-16 sm:mb-20 scroll-mt-24">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#E5DACB] p-4 sm:p-8 lg:p-12 shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-medium mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Architectural Color Harmony Engine</span>
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-sans tracking-tight text-stone-900 uppercase">
                Choose a Colour &mdash; Get Curated Combos
              </h2>
              <p className="text-stone-600 text-xs sm:text-base mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
                Select one of our curated architectural base tones or pick any custom shade with the color dropper. The studio dynamically calculates the 60-30-10 distribution, material pairings, and tonal contrasts.
              </p>
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-3 bg-stone-50 p-2 sm:p-2.5 rounded-2xl border border-stone-200 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-inner border border-stone-300">
                <input 
                  type="color" 
                  value={customHex} 
                  onChange={handleCustomColorChange}
                  className="absolute -inset-4 w-20 h-20 cursor-pointer border-0"
                  title="Pick custom color"
                />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 font-semibold">Custom Picker</span>
                <span className="font-mono font-bold text-sm text-stone-800 uppercase">{customHex}</span>
              </div>
            </div>
          </div>

          {/* Quick-Pick Curated Tones Swatch Bar (Edge-to-edge scroll on mobile) */}
          <div className="py-4 sm:py-6 border-b border-stone-100">
            <span className="block text-[11px] sm:text-xs uppercase tracking-widest font-mono text-stone-500 mb-2.5 font-semibold">
              Or Select from Signature Architectural Shades:
            </span>
            <div className="flex items-center gap-2 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {CURATED_COLOR_TONES.map((tone) => {
                const isSelected = !isCustomMode && selectedCuratedTone.id === tone.id;
                return (
                  <button
                    key={tone.id}
                    onClick={() => handleSelectCuratedColor(tone)}
                    className={`group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all flex-shrink-0 ${
                      isSelected 
                        ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-black/15 shadow-sm transition-transform group-hover:scale-110" 
                      style={{ backgroundColor: tone.hex }} 
                    />
                    <span className="text-[11px] sm:text-xs font-medium whitespace-nowrap">{tone.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 60-30-10 Dynamic Rule Breakdown & Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 sm:pt-8">
            
            {/* Left Column: 60-30-10 Harmony Cards (7 Cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-mono text-orange-600 font-bold block mb-1">
                  The Golden Interior Standard
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-sans text-stone-900">
                  60-30-10 Balanced Room Breakdown
                </h3>
              </div>

              {/* 3 Tier Swatch Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                
                {/* 60% Dominant Canvas */}
                <div className="flex flex-col rounded-2xl bg-stone-50 border border-stone-200 p-3.5 sm:p-4 relative overflow-hidden transition-all hover:shadow-md">
                  <div 
                    className="w-full h-20 sm:h-24 rounded-xl shadow-inner border border-black/10 flex items-end justify-between p-2.5 transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: activePalette.sixtyPercentDominant.hex }}
                  >
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded backdrop-blur-md font-bold ${
                      activePalette.isDark ? 'bg-black/40 text-white' : 'bg-white/70 text-stone-900'
                    }`}>
                      60%
                    </span>
                    <button 
                      onClick={() => handleCopyHex(activePalette.sixtyPercentDominant.hex)}
                      className="p-1 rounded bg-black/40 text-white hover:bg-black/60 transition-colors"
                      title="Copy Hex"
                    >
                      {copiedHex === activePalette.sixtyPercentDominant.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="mt-2.5 sm:mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                      Dominant Canvas
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {activePalette.sixtyPercentDominant.name}
                    </h4>
                    <span className="text-xs font-mono text-stone-600 mt-0.5 block">
                      {activePalette.sixtyPercentDominant.hex}
                    </span>
                    <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                      {activePalette.sixtyPercentDominant.desc}
                    </p>
                  </div>
                </div>

                {/* 30% Secondary Furniture & Millwork */}
                <div className="flex flex-col rounded-2xl bg-stone-50 border border-stone-200 p-3.5 sm:p-4 relative overflow-hidden transition-all hover:shadow-md">
                  <div 
                    className="w-full h-20 sm:h-24 rounded-xl shadow-inner border border-black/10 flex items-end justify-between p-2.5 transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: activePalette.thirtyPercentSecondary.hex }}
                  >
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-md font-bold">
                      30%
                    </span>
                    <button 
                      onClick={() => handleCopyHex(activePalette.thirtyPercentSecondary.hex)}
                      className="p-1 rounded bg-black/40 text-white hover:bg-black/60 transition-colors"
                      title="Copy Hex"
                    >
                      {copiedHex === activePalette.thirtyPercentSecondary.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="mt-2.5 sm:mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                      Secondary Tone
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {activePalette.thirtyPercentSecondary.name}
                    </h4>
                    <span className="text-xs font-mono text-stone-600 mt-0.5 block">
                      {activePalette.thirtyPercentSecondary.hex}
                    </span>
                    <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                      {activePalette.thirtyPercentSecondary.desc}
                    </p>
                  </div>
                </div>

                {/* 10% High-Impact Accent */}
                <div className="flex flex-col rounded-2xl bg-stone-50 border border-stone-200 p-3.5 sm:p-4 relative overflow-hidden transition-all hover:shadow-md">
                  <div 
                    className="w-full h-20 sm:h-24 rounded-xl shadow-inner border border-black/10 flex items-end justify-between p-2.5 transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: activePalette.tenPercentAccent.hex }}
                  >
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-md font-bold">
                      10%
                    </span>
                    <button 
                      onClick={() => handleCopyHex(activePalette.tenPercentAccent.hex)}
                      className="p-1 rounded bg-black/40 text-white hover:bg-black/60 transition-colors"
                      title="Copy Hex"
                    >
                      {copiedHex === activePalette.tenPercentAccent.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="mt-2.5 sm:mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                      Metallic / Accent
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {activePalette.tenPercentAccent.name}
                    </h4>
                    <span className="text-xs font-mono text-stone-600 mt-0.5 block">
                      {activePalette.tenPercentAccent.hex}
                    </span>
                    <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                      {activePalette.tenPercentAccent.desc}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Live Interactive Room Swatch Simulator (5 Cols on desktop, placed right below swatches on mobile) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-mono text-orange-600 font-bold block">
                    Interactive Preview
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-stone-900">
                    Live Room Harmony Simulation
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 text-xs">
                  <button 
                    onClick={() => setPreviewMode('interior')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full transition-all text-xs ${
                      previewMode === 'interior' ? 'bg-white font-bold text-stone-900 shadow-sm' : 'text-stone-600'
                    }`}
                  >
                    Living Room
                  </button>
                  <button 
                    onClick={() => setPreviewMode('facade')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full transition-all text-xs ${
                      previewMode === 'facade' ? 'bg-white font-bold text-stone-900 shadow-sm' : 'text-stone-600'
                    }`}
                  >
                    Facade
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Architectural Canvas */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-stone-300 shadow-lg flex flex-col justify-between p-4 sm:p-6">
                
                {/* Simulated Wall Color */}
                <div 
                  className="absolute inset-0 transition-colors duration-500 z-0"
                  style={{ backgroundColor: activePalette.sixtyPercentDominant.hex }}
                />

                {/* Ceiling Shadow Line */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/15 to-transparent z-10 pointer-events-none" />

                {/* Simulated Feature Wall Panel (30% secondary) */}
                <div 
                  className="absolute top-6 bottom-14 left-6 right-16 sm:top-8 sm:bottom-16 sm:left-8 sm:right-24 rounded-xl shadow-xl transition-colors duration-500 z-10 border border-black/10 flex flex-col justify-end p-3 sm:p-4"
                  style={{ backgroundColor: activePalette.thirtyPercentSecondary.hex }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePalette.tenPercentAccent.hex }} />
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white/90 drop-shadow line-clamp-1">
                      Feature Joinery &bull; {activePalette.thirtyPercentSecondary.name}
                    </span>
                  </div>
                </div>

                {/* Simulated Floor Strip */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-[#C49767] shadow-inner z-20 border-t border-black/15 flex items-center justify-between px-3.5 sm:px-6"
                >
                  <span className="text-[9px] sm:text-[10px] font-mono text-stone-900 font-bold bg-white/80 px-2 py-0.5 rounded backdrop-blur truncate max-w-[150px] sm:max-w-none">
                    Flooring: {activePalette.recommendedWood}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/20" style={{ backgroundColor: activePalette.tenPercentAccent.hex }} />
                    <span className="text-[9px] sm:text-[10px] font-mono text-stone-900 font-bold bg-white/80 px-2 py-0.5 rounded backdrop-blur">
                      Accent
                    </span>
                  </div>
                </div>

                {/* Floating Brass Sconce Light */}
                <div className="absolute top-8 right-6 sm:top-12 sm:right-12 z-30 flex flex-col items-center">
                  <div 
                    className="w-3.5 h-8 sm:w-4 sm:h-10 rounded-full shadow-lg transition-colors duration-500"
                    style={{ backgroundColor: activePalette.tenPercentAccent.hex }}
                  />
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-md opacity-70 -mt-2 pointer-events-none"
                    style={{ backgroundColor: activePalette.tenPercentAccent.hex }}
                  />
                </div>

                {/* Badge Overlay */}
                <div className="relative z-30 self-start">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-neutral-900/80 text-white backdrop-blur-md shadow">
                    Live Palette Render
                  </span>
                </div>
              </div>

              {/* Palette Quick Action CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
                <button
                  onClick={() => {
                    const fullText = `CS Associates Architectural Palette:\nDominant (60%): ${activePalette.sixtyPercentDominant.name} (${activePalette.sixtyPercentDominant.hex})\nSecondary (30%): ${activePalette.thirtyPercentSecondary.name} (${activePalette.thirtyPercentSecondary.hex})\nAccent (10%): ${activePalette.tenPercentAccent.name} (${activePalette.tenPercentAccent.hex})\nStone: ${activePalette.recommendedStone}\nWood: ${activePalette.recommendedWood}`;
                    navigator.clipboard.writeText(fullText);
                    setCopiedHex('ALL');
                    setTimeout(() => setCopiedHex(null), 2500);
                  }}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  {copiedHex === 'ALL' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied All Hex Codes!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-orange-400" />
                      <span>Copy Full Palette Specs</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  <span>Apply to My Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Full-Width Section: 4 Coordinate Palettes & Material Matrix */}
          <div className="mt-8 pt-6 sm:pt-8 border-t border-stone-200">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-mono text-orange-600 font-bold block mb-1">
                Architectural Color Coordination
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-sans text-stone-900 mb-4">
                4 Harmonic Palettes for Every Lighting Condition
              </h3>
            </div>

            {/* 4 Coordinate Palettes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Tonal Calm */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800">Tonal Monochromatic</span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Single Hue</span>
                </div>
                <div className="flex h-10 rounded-xl overflow-hidden shadow-sm border border-stone-300">
                  {activePalette.tonal.map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="flex-1 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 group relative"
                      style={{ backgroundColor: swatch.hex }}
                      title={`${swatch.name} (${swatch.hex}) - Tap to copy`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-black/60 text-white transition-opacity">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analogous Organic */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800">Analogous Earth</span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">&plusmn;30&deg; Neighboring</span>
                </div>
                <div className="flex h-10 rounded-xl overflow-hidden shadow-sm border border-stone-300">
                  {activePalette.analogous.map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="flex-1 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 group relative"
                      style={{ backgroundColor: swatch.hex }}
                      title={`${swatch.name} (${swatch.hex}) - Tap to copy`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-black/60 text-white transition-opacity">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Contrast */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800">Modern Contrast</span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Complementary</span>
                </div>
                <div className="flex h-10 rounded-xl overflow-hidden shadow-sm border border-stone-300">
                  {activePalette.complementary.map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="flex-1 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 group relative"
                      style={{ backgroundColor: swatch.hex }}
                      title={`${swatch.name} (${swatch.hex}) - Tap to copy`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-black/60 text-white transition-opacity">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exterior & Civil */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800">Civil & Exterior Facade</span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Concrete & Brick</span>
                </div>
                <div className="flex h-10 rounded-xl overflow-hidden shadow-sm border border-stone-300">
                  {activePalette.exteriorCivil.map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="flex-1 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 group relative"
                      style={{ backgroundColor: swatch.hex }}
                      title={`${swatch.name} (${swatch.hex}) - Tap to copy`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-black/60 text-white transition-opacity">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Material Pairing Matrix */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900 to-neutral-900 text-white mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-orange-300 font-semibold">
                  Architectural Material & Texture Pairing Matrix
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-mono block">Recommended Stone</span>
                  <span className="font-semibold text-stone-200 mt-1 block truncate">{activePalette.recommendedStone}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-mono block">Recommended Wood</span>
                  <span className="font-semibold text-stone-200 mt-1 block truncate">{activePalette.recommendedWood}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-mono block">Recommended Metal</span>
                  <span className="font-semibold text-stone-200 mt-1 block truncate">{activePalette.recommendedMetal}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-mono block">Textile Accent</span>
                  <span className="font-semibold text-stone-200 mt-1 block truncate">{activePalette.recommendedTextile}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. SUGGESTIONS & INSPIRATION CATALOGUE (N NO OF SUGGESTIONS) ── */}
      <section id="suggestions-catalogue" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-900 text-xs font-mono font-semibold mb-2.5">
              <Layers className="w-3.5 h-3.5 text-orange-600" />
              <span>Comprehensive Architectural & Civil Library</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-sans tracking-tight text-stone-900 uppercase">
              Curated Suggestions Library ({filteredSuggestions.length})
            </h2>
            <p className="text-stone-600 text-xs sm:text-base mt-1 leading-relaxed">
              Filter by room category, engineering discipline, or search by material keywords.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search oak, travertine, MEP, plaster..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Discipline Master Switcher: All vs Interior vs Construction */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => { setSelectedDiscipline('all'); setSelectedCategory('all'); }}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
              selectedDiscipline === 'all'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            All ({ALL_SUGGESTIONS.length})
          </button>

          <button
            onClick={() => { setSelectedDiscipline('interior'); setSelectedCategory('all'); }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
              selectedDiscipline === 'interior'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Sofa className="w-3.5 h-3.5" />
            <span>Interior ({ALL_SUGGESTIONS.filter(s => s.type === 'interior').length})</span>
          </button>

          <button
            onClick={() => { setSelectedDiscipline('construction'); setSelectedCategory('all'); }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
              selectedDiscipline === 'construction'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Civil &amp; Construction ({ALL_SUGGESTIONS.filter(s => s.type === 'construction').length})</span>
          </button>
        </div>

        {/* Category Pills - Smooth touch scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {availableCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                  isSelected 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-sm' 
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>

        {/* Suggestion Cards Grid (N No of Suggestions) */}
        {filteredSuggestions.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-6 sm:p-8">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-stone-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-stone-800">No suggestions match your search</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Try adjusting your search terms or clearing the filter to explore our complete catalogue.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDiscipline('all'); }}
              className="mt-4 sm:mt-5 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filteredSuggestions.map((item) => {
              const isInterior = item.type === 'interior';

              return (
                <div 
                  key={item.id}
                  className="group flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-[#E5DACB] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Image with Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img 
                      src={item.primaryImage} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold shadow-md ${
                        isInterior 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-amber-700 text-white'
                      }`}>
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono bg-black/60 text-stone-200 backdrop-blur-md border border-white/10">
                        {item.architecturalStyle}
                      </span>
                    </div>

                    {/* Bottom overlay: Color Swatches & Subcategory */}
                    <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-3.5 sm:right-3.5 flex items-center justify-between text-white">
                      <span className="text-[10px] sm:text-[11px] font-mono font-medium text-stone-200 truncate max-w-[170px] sm:max-w-none">
                        {item.subcategory}
                      </span>
                      <div className="flex items-center -space-x-1 shrink-0">
                        {item.colorPalette.map((col, idx) => (
                          <span 
                            key={idx}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: col.hex }}
                            title={`${col.name} (${col.role})`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-sans text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {item.shortDescription}
                      </p>

                      {/* Specs Highlights */}
                      <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-stone-100 flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold tracking-wider">
                          Key Specifications:
                        </span>
                        <ul className="text-xs text-stone-700 space-y-1">
                          {item.detailedSpecs.slice(0, 2).map((spec, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pro Tip Callout Box */}
                      <div className="mt-3.5 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-950 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">
                          <strong>Pro Tip:</strong> {item.proTip}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-stone-100 flex items-center justify-between gap-2.5">
                      <button
                        onClick={() => setSelectedModalItem(item)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-orange-600 transition-colors py-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full Spec</span>
                      </button>

                      <button
                        onClick={onOpenConsultation}
                        className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-orange-600 text-white text-[11px] font-semibold uppercase tracking-wider transition-colors active:scale-95"
                      >
                        Consult PMC
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* ── 4. DETAILED SPECIFICATION LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 my-4 sm:my-8 border border-stone-200 max-h-[92vh] flex flex-col"
            >
              {/* Modal Header Bar with Close Button */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-200 bg-stone-50">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold ${
                    selectedModalItem.type === 'interior' ? 'bg-orange-500 text-white' : 'bg-amber-700 text-white'
                  }`}>
                    {selectedModalItem.category}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-stone-500 font-medium truncate max-w-[160px] sm:max-w-none">
                    {selectedModalItem.subcategory}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedModalItem(null)}
                  className="p-1.5 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6">
                
                {/* Image Banner */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={selectedModalItem.primaryImage} 
                    alt={selectedModalItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white">
                    <h2 className="text-lg sm:text-2xl font-bold font-sans">
                      {selectedModalItem.title}
                    </h2>
                    <span className="text-[11px] sm:text-xs text-stone-300 font-mono mt-1 block">
                      Style: {selectedModalItem.architecturalStyle} &bull; Timeline: {selectedModalItem.estimatedTimeline}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
                  {selectedModalItem.shortDescription}
                </p>

                {/* Color Swatches Grid */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono uppercase font-bold text-stone-600 block mb-3">
                    Curated Color Palette for this Space
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedModalItem.colorPalette.map((col, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-3 p-2 rounded-xl bg-white border border-stone-200">
                        <span className="w-8 h-8 rounded-lg border border-black/10 shadow-sm" style={{ backgroundColor: col.hex }} />
                        <div>
                          <span className="text-xs font-bold text-stone-800 block">{col.name}</span>
                          <span className="text-[10px] font-mono text-stone-500 uppercase">{col.hex} &bull; {col.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-orange-600 font-bold mb-2">
                    Architectural & Engineering Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedModalItem.detailedSpecs.map((spec, spIdx) => (
                      <div key={spIdx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-stone-700 leading-relaxed">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Civil Precautions */}
                {selectedModalItem.civilPrecautions && selectedModalItem.civilPrecautions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-amber-700 font-bold mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Civil Engineering Precautions & Checks</span>
                    </h3>
                    <div className="space-y-2 text-xs">
                      {selectedModalItem.civilPrecautions.map((prec, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950 flex items-start gap-2">
                          <span className="font-bold text-amber-700">&bull;</span>
                          <span className="leading-relaxed">{prec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Materials */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-stone-600 font-bold mb-2">
                    Recommended Materials & Finishes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalItem.recommendedMaterials.map((mat, mIdx) => (
                      <span key={mIdx} className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Inside Modal */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-500">
                    Need technical execution or 3D visualization for your plot?
                  </div>
                  <button
                    onClick={() => {
                      setSelectedModalItem(null);
                      onOpenConsultation();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Consult CS Associates for this Space
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
