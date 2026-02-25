import React from 'react';
import { 
  Calculator, 
  LayoutGrid, 
  History, 
  Star, 
  Settings, 
  HelpCircle,
  ChevronRight,
  TrendingUp,
  HeartPulse,
  Wrench,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CalculatorCategory } from '../constants';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { id: 'all', name: 'All Calculators', icon: LayoutGrid },
  { id: 'Basic', name: 'Basic & Scientific', icon: Zap },
  { id: 'Finance', name: 'Financial', icon: TrendingUp },
  { id: 'Health', name: 'Health & Fitness', icon: HeartPulse },
  { id: 'Utility', name: 'Utility Tools', icon: Wrench },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 lg:top-[73px] left-0 z-50 h-screen lg:h-[calc(100vh-73px)] w-64 glass border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-4">
          <div className="space-y-1 mb-8">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCategory(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                  activeCategory === item.id 
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={cn(
                    "transition-colors",
                    activeCategory === item.id ? "text-teal-600 dark:text-teal-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {activeCategory === item.id && <ChevronRight size={14} />}
              </button>
            ))}
          </div>

          <div className="space-y-1 mb-8">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Personal
            </p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Star size={18} className="text-slate-400" />
              <span className="text-sm font-medium">Favorites</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <History size={18} className="text-slate-400" />
              <span className="text-sm font-medium">History</span>
            </button>
          </div>

          <div className="mt-auto space-y-1 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Settings size={18} className="text-slate-400" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <HelpCircle size={18} className="text-slate-400" />
              <span className="text-sm font-medium">Help Center</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
