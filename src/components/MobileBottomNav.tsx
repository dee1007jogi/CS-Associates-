import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Layers, CheckSquare, Building2, Calculator, MessageCircle, Phone } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenConsultation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenConsultation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Services', path: '/services', icon: Layers },
    { label: '7-Stage', path: '/process', icon: CheckSquare },
    { label: 'Projects', path: '/projects', icon: Building2 },
    { label: 'Estimator', path: '/calculator', icon: Calculator },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-2xl border-t border-neutral-800/90 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      
      {/* 5-Tab Native Navigation Bar */}
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] relative py-1 transition-all active:scale-90 cursor-pointer"
            >
              {/* Active subtle pill glow */}
              {active && (
                <div className="absolute top-1.5 w-8 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              )}
              
              <div className={`p-1 rounded-xl transition-colors ${active ? 'text-orange-500' : 'text-neutral-400 hover:text-neutral-200'}`}>
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
              </div>

              <span className={`text-[10px] tracking-tight leading-none mt-0.5 ${active ? 'font-bold text-orange-500' : 'font-medium text-neutral-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
