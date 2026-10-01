import React, { useEffect, useRef } from 'react';

export const TestimonialLaserRig: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const trunkAuraRef = useRef<SVGPathElement>(null);
  const trunkGlowRef = useRef<SVGPathElement>(null);
  const trunkCoreRef = useRef<SVGPathElement>(null);

  const leftBranchAuraRef = useRef<SVGPathElement>(null);
  const leftBranchGlowRef = useRef<SVGPathElement>(null);
  const leftBranchCoreRef = useRef<SVGPathElement>(null);

  const rightBranchAuraRef = useRef<SVGPathElement>(null);
  const rightBranchGlowRef = useRef<SVGPathElement>(null);
  const rightBranchCoreRef = useRef<SVGPathElement>(null);

  const trunkTipRef = useRef<SVGGElement>(null);
  const leftTipRef = useRef<SVGGElement>(null);
  const rightTipRef = useRef<SVGGElement>(null);

  const beamSplitterRef = useRef<HTMLDivElement>(null);
  const leftGroundRef = useRef<HTMLDivElement>(null);
  const rightGroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number | null = null;
    let trunkLength = 0;
    let branchLeftLength = 0;
    let branchRightLength = 0;

    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    let targetScroll = currentScroll;

    const cornerRadius = 26;
    const splitMarginAboveCard = 48;
    const cardBorderOffset = 14;

    let lastCalculatedTop = -1;
    let lastCalculatedHeight = -1;
    let lastClientWidth = -1;

    const handleScroll = () => {
      targetScroll = window.scrollY || document.documentElement.scrollTop;
    };

    const recalculateGeometry = () => {
      const testimonialsEl = document.getElementById('testimonials');
      const cardEl = document.getElementById('consultationCard');
      const svg = svgRef.current;

      if (!testimonialsEl || !cardEl || !svg) return;

      const clientWidth = document.documentElement.clientWidth;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      const testRect = testimonialsEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();

      const testAbsTop = testRect.top + scrollY;
      const cardAbsTop = cardRect.top + scrollY;
      const cardAbsBottom = cardAbsTop + cardRect.height;
      const cardAbsLeft = cardRect.left + scrollX;
      const cardAbsRight = cardAbsLeft + cardRect.width;

      const totalHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        cardAbsBottom + 200
      );

      svg.setAttribute('viewBox', `0 0 ${clientWidth} ${totalHeight}`);
      svg.style.height = `${totalHeight}px`;

      const centerX = clientWidth / 2;
      const splitY = cardAbsTop - splitMarginAboveCard;
      const leftTargetX = Math.max(16, cardAbsLeft - cardBorderOffset);
      const rightTargetX = Math.min(clientWidth - 16, cardAbsRight + cardBorderOffset);

      lastCalculatedTop = cardAbsTop;
      lastCalculatedHeight = cardRect.height;
      lastClientWidth = clientWidth;

      // Position Hardware Nodes
      if (beamSplitterRef.current) {
        beamSplitterRef.current.style.top = `${splitY - 16}px`;
      }
      if (leftGroundRef.current) {
        leftGroundRef.current.style.top = `${cardAbsBottom - 10}px`;
        leftGroundRef.current.style.left = `${leftTargetX - 10}px`;
      }
      if (rightGroundRef.current) {
        rightGroundRef.current.style.top = `${cardAbsBottom - 10}px`;
        rightGroundRef.current.style.left = `${rightTargetX - 10}px`;
      }

      // 1. Trunk Path: Starts at top of Testimonials section -> splitY
      const trunkD = `M ${centerX} ${testAbsTop} L ${centerX} ${splitY}`;
      if (trunkCoreRef.current) trunkCoreRef.current.setAttribute('d', trunkD);
      if (trunkGlowRef.current) trunkGlowRef.current.setAttribute('d', trunkD);
      if (trunkAuraRef.current) trunkAuraRef.current.setAttribute('d', trunkD);

      if (trunkCoreRef.current) {
        trunkLength = trunkCoreRef.current.getTotalLength();
        trunkCoreRef.current.style.strokeDasharray = `${trunkLength}`;
        if (trunkGlowRef.current) trunkGlowRef.current.style.strokeDasharray = `${trunkLength}`;
        if (trunkAuraRef.current) trunkAuraRef.current.style.strokeDasharray = `${trunkLength}`;
      }

      // 2. Left Branch
      const leftD = `M ${centerX} ${splitY} 
                     L ${leftTargetX + cornerRadius} ${splitY} 
                     A ${cornerRadius} ${cornerRadius} 0 0 0 ${leftTargetX} ${splitY + cornerRadius} 
                     L ${leftTargetX} ${cardAbsBottom}`;
      if (leftBranchCoreRef.current) leftBranchCoreRef.current.setAttribute('d', leftD);
      if (leftBranchGlowRef.current) leftBranchGlowRef.current.setAttribute('d', leftD);
      if (leftBranchAuraRef.current) leftBranchAuraRef.current.setAttribute('d', leftD);

      if (leftBranchCoreRef.current) {
        branchLeftLength = leftBranchCoreRef.current.getTotalLength();
        leftBranchCoreRef.current.style.strokeDasharray = `${branchLeftLength}`;
        if (leftBranchGlowRef.current) leftBranchGlowRef.current.style.strokeDasharray = `${branchLeftLength}`;
        if (leftBranchAuraRef.current) leftBranchAuraRef.current.style.strokeDasharray = `${branchLeftLength}`;
      }

      // 3. Right Branch
      const rightD = `M ${centerX} ${splitY} 
                      L ${rightTargetX - cornerRadius} ${splitY} 
                      A ${cornerRadius} ${cornerRadius} 0 0 1 ${rightTargetX} ${splitY + cornerRadius} 
                      L ${rightTargetX} ${cardAbsBottom}`;
      if (rightBranchCoreRef.current) rightBranchCoreRef.current.setAttribute('d', rightD);
      if (rightBranchGlowRef.current) rightBranchGlowRef.current.setAttribute('d', rightD);
      if (rightBranchAuraRef.current) rightBranchAuraRef.current.setAttribute('d', rightD);

      if (rightBranchCoreRef.current) {
        branchRightLength = rightBranchCoreRef.current.getTotalLength();
        rightBranchCoreRef.current.style.strokeDasharray = `${branchRightLength}`;
        if (rightBranchGlowRef.current) rightBranchGlowRef.current.style.strokeDasharray = `${branchRightLength}`;
        if (rightBranchAuraRef.current) rightBranchAuraRef.current.style.strokeDasharray = `${branchRightLength}`;
      }
    };

    const renderFrame = () => {
      currentScroll += (targetScroll - currentScroll) * 0.085;

      const testimonialsEl = document.getElementById('testimonials');
      const cardEl = document.getElementById('consultationCard');

      if (!testimonialsEl || !cardEl || trunkLength === 0) {
        animFrameId = requestAnimationFrame(renderFrame);
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const testRect = testimonialsEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const currentCardAbsTop = cardRect.top + scrollY;

      // Recalculate if layout shifted
      if (
        Math.abs(currentCardAbsTop - lastCalculatedTop) > 3 ||
        Math.abs(cardRect.height - lastCalculatedHeight) > 3 ||
        document.documentElement.clientWidth !== lastClientWidth
      ) {
        recalculateGeometry();
      }

      const testAbsTop = testRect.top + scrollY;
      const splitY = lastCalculatedTop - splitMarginAboveCard;
      const scrollSplitThreshold = Math.max(1, splitY - window.innerHeight * 0.45);
      const scrollEndThreshold = scrollSplitThreshold + lastCalculatedHeight * 0.85;

      // Visibility Gate: Only render laser when user is near Section 12 or 13
      const isNearSection = testRect.bottom > -100 && cardRect.top < window.innerHeight + 100;
      if (svgRef.current) {
        svgRef.current.style.opacity = isNearSection ? '1' : '0';
      }

      // Trunk Progress from top of testimonials to splitY
      const trunkStartScroll = Math.max(0, testAbsTop - window.innerHeight * 0.6);
      const trunkProgress = Math.min(
        Math.max((currentScroll - trunkStartScroll) / (scrollSplitThreshold - trunkStartScroll), 0.015),
        1
      );

      const trunkOffset = trunkLength * (1 - trunkProgress);
      if (trunkCoreRef.current) trunkCoreRef.current.style.strokeDashoffset = `${trunkOffset}`;
      if (trunkGlowRef.current) trunkGlowRef.current.style.strokeDashoffset = `${trunkOffset}`;
      if (trunkAuraRef.current) trunkAuraRef.current.style.strokeDashoffset = `${trunkOffset}`;

      // Trunk spark head
      if (trunkTipRef.current && trunkCoreRef.current) {
        if (trunkProgress > 0.01 && trunkProgress < 0.995 && isNearSection) {
          trunkTipRef.current.style.opacity = '1';
          const pt = trunkCoreRef.current.getPointAtLength(trunkLength * trunkProgress);
          trunkTipRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
        } else {
          trunkTipRef.current.style.opacity = '0';
        }
      }

      // Branch Progress
      let branchProgress = 0;
      if (currentScroll > scrollSplitThreshold) {
        branchProgress = Math.min(
          Math.max((currentScroll - scrollSplitThreshold) / (scrollEndThreshold - scrollSplitThreshold), 0),
          1
        );

        if (beamSplitterRef.current) {
          beamSplitterRef.current.style.opacity = isNearSection ? '1' : '0';
        }
      } else {
        if (beamSplitterRef.current) {
          beamSplitterRef.current.style.opacity = '0';
        }
      }

      const leftOffset = branchLeftLength * (1 - branchProgress);
      if (leftBranchCoreRef.current) leftBranchCoreRef.current.style.strokeDashoffset = `${leftOffset}`;
      if (leftBranchGlowRef.current) leftBranchGlowRef.current.style.strokeDashoffset = `${leftOffset}`;
      if (leftBranchAuraRef.current) leftBranchAuraRef.current.style.strokeDashoffset = `${leftOffset}`;

      const rightOffset = branchRightLength * (1 - branchProgress);
      if (rightBranchCoreRef.current) rightBranchCoreRef.current.style.strokeDashoffset = `${rightOffset}`;
      if (rightBranchGlowRef.current) rightBranchGlowRef.current.style.strokeDashoffset = `${rightOffset}`;
      if (rightBranchAuraRef.current) rightBranchAuraRef.current.style.strokeDashoffset = `${rightOffset}`;

      // Branch sparks
      if (leftTipRef.current && rightTipRef.current && leftBranchCoreRef.current && rightBranchCoreRef.current) {
        if (branchProgress > 0.02 && branchProgress < 0.995 && isNearSection) {
          leftTipRef.current.style.opacity = '1';
          rightTipRef.current.style.opacity = '1';

          const leftPt = leftBranchCoreRef.current.getPointAtLength(branchLeftLength * branchProgress);
          leftTipRef.current.setAttribute('transform', `translate(${leftPt.x}, ${leftPt.y})`);

          const rightPt = rightBranchCoreRef.current.getPointAtLength(branchRightLength * branchProgress);
          rightTipRef.current.setAttribute('transform', `translate(${rightPt.x}, ${rightPt.y})`);
        } else {
          leftTipRef.current.style.opacity = '0';
          rightTipRef.current.style.opacity = '0';
        }
      }

      // Ground nodes
      if (leftGroundRef.current && rightGroundRef.current) {
        if (branchProgress >= 0.995 && isNearSection) {
          leftGroundRef.current.style.opacity = '1';
          rightGroundRef.current.style.opacity = '1';
        } else {
          leftGroundRef.current.style.opacity = '0';
          rightGroundRef.current.style.opacity = '0';
        }
      }

      animFrameId = requestAnimationFrame(renderFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', recalculateGeometry);

    recalculateGeometry();
    animFrameId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', recalculateGeometry);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full pointer-events-none transition-opacity duration-300"
        style={{ zIndex: 20, overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ambientLaserGlowReact" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Vertical Trunk */}
        <path ref={trunkAuraRef} fill="none" stroke="#ff5500" strokeWidth="12" opacity="0.3" strokeLinecap="round" filter="url(#ambientLaserGlowReact)" />
        <path ref={trunkGlowRef} fill="none" stroke="#ff5500" strokeWidth="6" opacity="0.75" strokeLinecap="round" />
        <path ref={trunkCoreRef} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />

        {/* Left Branch */}
        <path ref={leftBranchAuraRef} fill="none" stroke="#ff5500" strokeWidth="12" opacity="0.3" strokeLinecap="round" filter="url(#ambientLaserGlowReact)" />
        <path ref={leftBranchGlowRef} fill="none" stroke="#ff5500" strokeWidth="6" opacity="0.75" strokeLinecap="round" />
        <path ref={leftBranchCoreRef} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />

        {/* Right Branch */}
        <path ref={rightBranchAuraRef} fill="none" stroke="#ff5500" strokeWidth="12" opacity="0.3" strokeLinecap="round" filter="url(#ambientLaserGlowReact)" />
        <path ref={rightBranchGlowRef} fill="none" stroke="#ff5500" strokeWidth="6" opacity="0.75" strokeLinecap="round" />
        <path ref={rightBranchCoreRef} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />

        {/* Sparks */}
        <g ref={trunkTipRef} className="transition-opacity duration-200" style={{ opacity: 0 }}>
          <circle r="16" fill="#ff5500" opacity="0.35" filter="url(#ambientLaserGlowReact)" />
          <circle r="8" fill="#ff6a00" opacity="0.85" />
          <circle r="4" fill="#ffffff" />
        </g>

        <g ref={leftTipRef} className="transition-opacity duration-200" style={{ opacity: 0 }}>
          <circle r="16" fill="#ff5500" opacity="0.35" filter="url(#ambientLaserGlowReact)" />
          <circle r="8" fill="#ff6a00" opacity="0.85" />
          <circle r="4" fill="#ffffff" />
        </g>

        <g ref={rightTipRef} className="transition-opacity duration-200" style={{ opacity: 0 }}>
          <circle r="16" fill="#ff5500" opacity="0.35" filter="url(#ambientLaserGlowReact)" />
          <circle r="8" fill="#ff6a00" opacity="0.85" />
          <circle r="4" fill="#ffffff" />
        </g>
      </svg>

      {/* Laser Hardware Elements (Prism & Ground Nodes) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 25, height: '100%' }}>
        {/* Optical Beam Splitter Prism */}
        <div
          ref={beamSplitterRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 flex flex-col items-center"
          style={{ top: '0px', opacity: 0 }}
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-950 border-2 border-orange-500 shadow-[0_0_24px_#ff5500] flex items-center justify-center transform rotate-45">
            <div className="w-2.5 h-2.5 bg-white rounded-sm shadow-[0_0_10px_#ffffff]" />
          </div>
          <div className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-orange-600 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-orange-400 shadow-md mt-2 whitespace-nowrap">
            BEAM SPLITTER // DUAL AUDIT
          </div>
        </div>

        {/* Terminal Ground Nodes */}
        <div
          ref={leftGroundRef}
          className="absolute pointer-events-none transition-opacity duration-300 flex items-center gap-1.5"
          style={{ top: '0px', left: '0px', opacity: 0 }}
        >
          <div className="w-5 h-5 rounded-full bg-neutral-950 border-2 border-orange-500 flex items-center justify-center shadow-[0_0_16px_#ff5500]">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        <div
          ref={rightGroundRef}
          className="absolute pointer-events-none transition-opacity duration-300 flex items-center gap-1.5"
          style={{ top: '0px', left: '0px', opacity: 0 }}
        >
          <div className="w-5 h-5 rounded-full bg-neutral-950 border-2 border-orange-500 flex items-center justify-center shadow-[0_0_16px_#ff5500]">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>
      </div>
    </>
  );
};
