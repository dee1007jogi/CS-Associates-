import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ScrollToTop } from './components/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { MinimalPreloader } from './components/MinimalPreloader';
import { ConstructionHero3D } from './components/ConstructionHero3D';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';

import { MessageCircle } from 'lucide-react';

function AppContent({
  isConsultationOpen,
  setIsConsultationOpen,
}: {
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
}) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative pb-20 md:pb-0">
      {/* Scroll to Top on Page Route Change */}
      <ScrollToTop />

      {/* Sticky Mobile/Desktop Top App Bar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Multi-Page Route Outlet with Persistent Background 3D Engine */}
      <main className="flex-1 relative">
        {/* Persistent 3D Hero Scene: Loaded once in background, stays warm in memory, zero reload lag */}
        <ConstructionHero3D
          isHome={isHome}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route
            path="/about"
            element={<AboutPage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route
            path="/process"
            element={<ProcessPage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route
            path="/projects"
            element={<ProjectsPage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route
            path="/calculator"
            element={<CalculatorPage onOpenConsultation={() => setIsConsultationOpen(true)} />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Quiet Authoritative Footer */}
      <Footer />

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Desktop Sticky Floating Quick WhatsApp Action */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2.5">
        <a
          href="https://wa.me/918095823483?text=Hello%20CS%20Associates%2C%20I%20would%20like%20to%20consult%20for%20my%20construction%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-full shadow-2xl transition-all hover:scale-105 border border-emerald-400/30 active:scale-95"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="font-sans">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Global Floating Back To Top Button */}
      <BackToTop />

      {/* Global Native Consultation Modal / Bottom Sheet */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Minimal Circle Logo Preloader */}
      <MinimalPreloader minDuration={2000} />

      {/* Lenis Smooth Virtual Scrolling Engine */}
      <SmoothScroll />

      <AppContent
        isConsultationOpen={isConsultationOpen}
        setIsConsultationOpen={setIsConsultationOpen}
      />
    </BrowserRouter>
  );
}
