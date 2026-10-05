import React, { useEffect, useRef } from 'react';

export const TestimonialLaserRig: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const trunkCoreRef = useRef<SVGPathElement>(null);
  const trunkGlowRef = useRef<SVGPathElement>(null);
  const leftBranchCoreRef = useRef<SVGPathElement>(null);
  const leftBranchGlowRef = useRef<SVGPathElement>(null);
  const rightBranchCoreRef = useRef<SVGPathElement>(null);
  const rightBranchGlowRef = useRef<SVGPathElement>(null);

  const trunkTipRef = useRef<SVGCircleElement>(null);
  const leftTipRef = useRef<SVGCircleElement>(null);
  const rightTipRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let trunkLength = 0;
    let branchLengthLeft = 0;
    let branchLengthRight = 0;

    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    let targetScroll = currentScroll;
    const cornerRadius = 24;
    const splitMarginAboveCard = 32;

    const recalculateLaserGeometry = () => {
      const zone = document.getElementById('testimonials-contact-zone');
      const consultationCard = document.getElementById('consultationCard');
      const svg = svgRef.current;
      const trunkCore = trunkCoreRef.current;
      const trunkGlow = trunkGlowRef.current;
      const leftBranchCore = leftBranchCoreRef.current;
      const leftBranchGlow = leftBranchGlowRef.current;
      const rightBranchCore = rightBranchCoreRef.current;
      const rightBranchGlow = rightBranchGlowRef.current;

      if (!zone || !consultationCard || !svg || !trunkCore || !trunkGlow || !leftBranchCore || !leftBranchGlow || !rightBranchCore || !rightBranchGlow) {
        return;
      }

      if (window.innerWidth < 768) {
        svg.style.display = 'none';
        return;
      }
      svg.style.display = 'block';

      const zoneRect = zone.getBoundingClientRect();
      const zoneWidth = zone.clientWidth || window.innerWidth;
      const zoneHeight = zone.clientHeight || zoneRect.height;

      svg.setAttribute('viewBox', `0 0 ${zoneWidth} ${zoneHeight}`);
      svg.style.height = `${zoneHeight}px`;

      const cardRect = consultationCard.getBoundingClientRect();
      const cardRelTop = cardRect.top - zoneRect.top;
      const cardRelBottom = cardRelTop + cardRect.height;
      const cardRelLeft = cardRect.left - zoneRect.left;
      const cardRelRight = cardRect.left - zoneRect.left + cardRect.width;

      const centerX = zoneWidth / 2;
      const splitY = cardRelTop - splitMarginAboveCard;

      // 1. Trunk Path: Starts at (centerX, 0) top of testimonials -> split point above card
      const trunkD = `M ${centerX} 0 L ${centerX} ${splitY}`;
      trunkCore.setAttribute('d', trunkD);
      trunkGlow.setAttribute('d', trunkD);
      trunkLength = trunkCore.getTotalLength();

      trunkCore.style.strokeDasharray = `${trunkLength}`;
      trunkGlow.style.strokeDasharray = `${trunkLength}`;

      // 2. Left Branch: From split point -> moves left to card edge -> turns 90deg down
      const leftTargetX = cardRelLeft;
      const leftD = `M ${centerX} ${splitY} 
                     L ${leftTargetX + cornerRadius} ${splitY} 
                     A ${cornerRadius} ${cornerRadius} 0 0 0 ${leftTargetX} ${splitY + cornerRadius} 
                     L ${leftTargetX} ${cardRelBottom}`;
      leftBranchCore.setAttribute('d', leftD);
      leftBranchGlow.setAttribute('d', leftD);
      branchLengthLeft = leftBranchCore.getTotalLength();

      leftBranchCore.style.strokeDasharray = `${branchLengthLeft}`;
      leftBranchGlow.style.strokeDasharray = `${branchLengthLeft}`;

      // 3. Right Branch: Offset outward (+20px outside card edge)
      const rightSideOffset = 20;
      const rightTargetX = Math.min(cardRelRight + rightSideOffset, zoneWidth - 12);
      const rightD = `M ${centerX} ${splitY} 
                      L ${rightTargetX - cornerRadius} ${splitY} 
                      A ${cornerRadius} ${cornerRadius} 0 0 1 ${rightTargetX} ${splitY + cornerRadius} 
                      L ${rightTargetX} ${cardRelBottom}`;
      rightBranchCore.setAttribute('d', rightD);
      rightBranchGlow.setAttribute('d', rightD);
      branchLengthRight = rightBranchCore.getTotalLength();

      rightBranchCore.style.strokeDasharray = `${branchLengthRight}`;
      rightBranchGlow.style.strokeDasharray = `${branchLengthRight}`;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY || document.documentElement.scrollTop;
    };

    const handleResize = () => {
      recalculateLaserGeometry();
    };

    let isMounted = true;

    const renderLaserFrame = () => {
      if (!isMounted || document.hidden) {
        animFrameId = 0;
        return;
      }

      currentScroll += (targetScroll - currentScroll) * 0.10;

      const zone = document.getElementById('testimonials-contact-zone');
      const consultationCard = document.getElementById('consultationCard');

      if (!zone || !consultationCard || trunkLength === 0 || window.innerWidth < 768) {
        animFrameId = requestAnimationFrame(renderLaserFrame);
        return;
      }

      const zoneRect = zone.getBoundingClientRect();
      const zoneAbsTop = zoneRect.top + window.scrollY;
      const cardRect = consultationCard.getBoundingClientRect();
      const cardRelTop = cardRect.top - zoneRect.top;
      const splitY = cardRelTop - splitMarginAboveCard;

      const currentScrollInZone = currentScroll - zoneAbsTop;

      // Split threshold: when top of Section 2 card is ~45% into viewport
      const scrollSplitThreshold = splitY - (window.innerHeight * 0.45);
      const scrollEndThreshold = scrollSplitThreshold + cardRect.height * 0.85;

      // Central Trunk progress
      const trunkProgress = Math.min(
        Math.max((currentScrollInZone + window.innerHeight * 0.3) / (scrollSplitThreshold + window.innerHeight * 0.3), 0.04),
        1
      );

      // Apply to trunk
      const trunkOffset = trunkLength * (1 - trunkProgress);
      if (trunkCoreRef.current) trunkCoreRef.current.style.strokeDashoffset = `${trunkOffset}`;
      if (trunkGlowRef.current) trunkGlowRef.current.style.strokeDashoffset = `${trunkOffset}`;

      const trunkTip = trunkTipRef.current;
      if (trunkTip && trunkCoreRef.current) {
        if (trunkProgress > 0.03 && trunkProgress < 0.998) {
          trunkTip.classList.remove('opacity-0');
          const pt = trunkCoreRef.current.getPointAtLength(trunkLength * trunkProgress);
          trunkTip.setAttribute('cx', `${pt.x}`);
          trunkTip.setAttribute('cy', `${pt.y}`);
        } else {
          trunkTip.classList.add('opacity-0');
        }
      }

      // Branch Progress: only active once trunk has arrived at split point
      let branchProgress = 0;
      if (currentScrollInZone > scrollSplitThreshold) {
        branchProgress = Math.min(
          Math.max((currentScrollInZone - scrollSplitThreshold) / (scrollEndThreshold - scrollSplitThreshold), 0),
          1
        );
      }

      // Apply to left & right branches
      const leftOffset = branchLengthLeft * (1 - branchProgress);
      if (leftBranchCoreRef.current) leftBranchCoreRef.current.style.strokeDashoffset = `${leftOffset}`;
      if (leftBranchGlowRef.current) leftBranchGlowRef.current.style.strokeDashoffset = `${leftOffset}`;

      const rightOffset = branchLengthRight * (1 - branchProgress);
      if (rightBranchCoreRef.current) rightBranchCoreRef.current.style.strokeDashoffset = `${rightOffset}`;
      if (rightBranchGlowRef.current) rightBranchGlowRef.current.style.strokeDashoffset = `${rightOffset}`;

      // Position glowing tip sparks
      const leftTip = leftTipRef.current;
      const rightTip = rightTipRef.current;

      if (leftTip && rightTip && leftBranchCoreRef.current && rightBranchCoreRef.current) {
        if (branchProgress > 0.02 && branchProgress < 0.99) {
          leftTip.classList.remove('opacity-0');
          rightTip.classList.remove('opacity-0');

          const leftPt = leftBranchCoreRef.current.getPointAtLength(branchLengthLeft * branchProgress);
          leftTip.setAttribute('cx', `${leftPt.x}`);
          leftTip.setAttribute('cy', `${leftPt.y}`);

          const rightPt = rightBranchCoreRef.current.getPointAtLength(branchLengthRight * branchProgress);
          rightTip.setAttribute('cx', `${rightPt.x}`);
          rightTip.setAttribute('cy', `${rightPt.y}`);
        } else {
          leftTip.classList.add('opacity-0');
          rightTip.classList.add('opacity-0');
        }
      }

      animFrameId = requestAnimationFrame(renderLaserFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = 0;
        }
      } else if (isMounted) {
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(renderLaserFrame);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const initTimer = setTimeout(() => {
      recalculateLaserGeometry();
      animFrameId = requestAnimationFrame(renderLaserFrame);
    }, 150);

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(initTimer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none select-none">
      {/* Ambient static axis guide line */}
      <div 
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 85, 0, 0.5) 0%, rgba(255, 85, 0, 0.25) 15%, rgba(255, 85, 0, 0.4) 50%, rgba(255, 85, 0, 0.15) 85%, transparent 100%)'
        }}
      />

      {/* Scroll-Animated Laser Canvas */}
      <svg 
        ref={svgRef} 
        id="laserCanvasOverlay" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5] overflow-visible"
      >
        <defs>
          <filter id="ambientLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Central Vertical Trunk */}
        <path 
          ref={trunkGlowRef} 
          id="trunkGlow" 
          fill="none" 
          stroke="#ff5500" 
          strokeWidth="7" 
          opacity="0.38" 
          strokeLinecap="round" 
        />
        <path 
          ref={trunkCoreRef} 
          id="trunkCore" 
          fill="none" 
          stroke="#ff772e" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 85, 0, 0.95)) drop-shadow(0 0 16px rgba(255, 85, 0, 0.6)) drop-shadow(0 0 28px rgba(255, 106, 0, 0.35))'
          }}
        />

        {/* 2. Left Branch */}
        <path 
          ref={leftBranchGlowRef} 
          id="leftBranchGlow" 
          fill="none" 
          stroke="#ff5500" 
          strokeWidth="7" 
          opacity="0.38" 
          strokeLinecap="round" 
        />
        <path 
          ref={leftBranchCoreRef} 
          id="leftBranchCore" 
          fill="none" 
          stroke="#ff772e" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 85, 0, 0.95)) drop-shadow(0 0 16px rgba(255, 85, 0, 0.6)) drop-shadow(0 0 28px rgba(255, 106, 0, 0.35))'
          }}
        />

        {/* 3. Right Branch */}
        <path 
          ref={rightBranchGlowRef} 
          id="rightBranchGlow" 
          fill="none" 
          stroke="#ff5500" 
          strokeWidth="7" 
          opacity="0.38" 
          strokeLinecap="round" 
        />
        <path 
          ref={rightBranchCoreRef} 
          id="rightBranchCore" 
          fill="none" 
          stroke="#ff772e" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 85, 0, 0.95)) drop-shadow(0 0 16px rgba(255, 85, 0, 0.6)) drop-shadow(0 0 28px rgba(255, 106, 0, 0.35))'
          }}
        />

        {/* Leading Glowing Spark Nodes */}
        <circle 
          ref={trunkTipRef} 
          id="trunkTip" 
          r="4.5" 
          fill="#ffffff" 
          stroke="#ff5500" 
          strokeWidth="2.5" 
          className="opacity-0 transition-opacity duration-150"
          style={{
            filter: 'drop-shadow(0 0 8px #ff772e) drop-shadow(0 0 20px #ff5500)'
          }}
        />
        <circle 
          ref={leftTipRef} 
          id="leftTip" 
          r="4.5" 
          fill="#ffffff" 
          stroke="#ff5500" 
          strokeWidth="2.5" 
          className="opacity-0 transition-opacity duration-150"
          style={{
            filter: 'drop-shadow(0 0 8px #ff772e) drop-shadow(0 0 20px #ff5500)'
          }}
        />
        <circle 
          ref={rightTipRef} 
          id="rightTip" 
          r="4.5" 
          fill="#ffffff" 
          stroke="#ff5500" 
          strokeWidth="2.5" 
          className="opacity-0 transition-opacity duration-150"
          style={{
            filter: 'drop-shadow(0 0 8px #ff772e) drop-shadow(0 0 20px #ff5500)'
          }}
        />
      </svg>
    </div>
  );
};
