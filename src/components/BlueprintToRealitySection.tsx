import React from 'react';

interface BlueprintToRealitySectionProps {
  onOpenConsultation?: () => void;
}

export const BlueprintToRealitySection: React.FC<BlueprintToRealitySectionProps> = () => {
  return (
    <section 
      id="blueprint-assembly"
      className="relative w-full h-screen min-h-[600px] bg-[#040810] overflow-hidden p-0 m-0 border-0"
    >
      <iframe
        src="/blueprint_to_reality_estate.html"
        title="CS Associates - Blueprint to Reality: Interactive Architectural Assembly"
        className="w-full h-full border-0 block p-0 m-0 select-none pointer-events-auto"
        loading="eager"
        allow="fullscreen"
      />
    </section>
  );
};
