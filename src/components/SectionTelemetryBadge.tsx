import React, { useState } from 'react';
import { Play, Pause, Activity } from 'lucide-react';

interface SectionTelemetryBadgeProps {
  sectionNum: string;
  paradigmTitle: string;
  formula: string;
  telemetryText: string;
  theme?: 'dark' | 'white';
  onManualScrub?: (progress: number) => void;
  showScrubber?: boolean;
}

export const SectionTelemetryBadge: React.FC<SectionTelemetryBadgeProps> = ({
  sectionNum,
  paradigmTitle,
  formula,
  telemetryText,
  theme = 'dark',
  onManualScrub,
  showScrubber = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const isWhite = theme === 'white';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrubValue(val);
    if (onManualScrub) {
      onManualScrub(val / 100);
    }
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let curr = scrubValue;
      let dir = 1;
      const interval = setInterval(() => {
        curr += 1.5 * dir;
        if (curr >= 100) {
          curr = 100;
          dir = -1;
        } else if (curr <= 0) {
          curr = 0;
          dir = 1;
        }
        setScrubValue(curr);
        if (onManualScrub) {
          onManualScrub(curr / 100);
        }
      }, 25);

      const stopListener = () => {
        clearInterval(interval);
        setIsPlaying(false);
        window.removeEventListener('scroll', stopListener);
      };
      window.addEventListener('scroll', stopListener, { once: true });
    }
  };

  return (
    <div className={`p-2.5 sm:p-3 rounded-2xl border text-xs font-mono select-none transition-colors ${
      isWhite 
        ? 'bg-neutral-100/90 border-neutral-300 text-neutral-800 shadow-sm' 
        : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 backdrop-blur-md shadow-lg'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Section tag & Paradigm */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isWhite ? 'bg-orange-100 text-orange-800 border border-orange-400' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
          }`}>
            {sectionNum}
          </span>
          <span className={`text-[11px] font-semibold truncate ${isWhite ? 'text-neutral-900' : 'text-white'}`}>
            {paradigmTitle}
          </span>
        </div>

        {/* Right: Real-time Telemetry & Pulse */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className={`truncate font-mono ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
            {telemetryText}
          </span>
        </div>
      </div>

      {/* Mathematical formula strip */}
      {formula && (
        <div className={`mt-2 pt-2 border-t text-[10px] flex items-center justify-between gap-2 overflow-x-auto ${
          isWhite ? 'border-neutral-200 text-emerald-800' : 'border-neutral-800 text-emerald-400'
        }`}>
          <span className="truncate">{formula}</span>
          <span className={`text-[9px] uppercase tracking-wider shrink-0 ${isWhite ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Compositor Verified
          </span>
        </div>
      )}

      {/* Optional Scrub Slider & Auto Play Controller */}
      {showScrubber && onManualScrub && (
        <div className="mt-2 pt-2 border-t border-neutral-800/60 flex items-center gap-3">
          <button
            onClick={toggleAutoPlay}
            className="px-2 py-1 bg-orange-500 text-neutral-950 rounded text-[10px] font-bold flex items-center gap-1 active:scale-95 cursor-pointer shrink-0"
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>
          
          <input
            type="range"
            min="0"
            max="100"
            value={scrubValue}
            onChange={handleSliderChange}
            className="w-full accent-orange-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          />
          <span className="text-[10px] tabular-nums shrink-0 text-orange-500">
            {scrubValue}%
          </span>
        </div>
      )}
    </div>
  );
};
