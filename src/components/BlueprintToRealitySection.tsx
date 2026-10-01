import React, { useRef, useEffect } from 'react';

interface BlueprintToRealitySectionProps {
  onOpenConsultation?: () => void;
}

export const BlueprintToRealitySection: React.FC<BlueprintToRealitySectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'SET_VISIBILITY',
                isVisible
              },
              '*'
            );
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="blueprint-assembly"
      className="relative w-full h-screen min-h-[600px] bg-[#040810] overflow-hidden p-0 m-0 border-0"
    >
      <iframe
        ref={iframeRef}
        src="/blueprint_to_reality_estate.html"
        title="CS Associates - Blueprint to Reality: Interactive Architectural Assembly"
        className="w-full h-full border-0 block p-0 m-0 select-none pointer-events-auto"
        loading="lazy"
        allow="fullscreen"
      />
    </section>
  );
};
