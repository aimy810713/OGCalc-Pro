import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  HeartPulse, 
  Wrench, 
  Star, 
  ArrowRight,
  Search,
  History as HistoryIcon,
  ChevronRight
} from 'lucide-react';
import { CALCULATORS, CalculatorInfo } from '../constants';
import { cn } from '../lib/utils';

interface CalculatorGridProps {
  searchQuery: string;
  activeCategory: string;
  onSelect: (calc: CalculatorInfo) => void;
}

export const CalculatorGrid: React.FC<CalculatorGridProps> = ({ searchQuery, activeCategory, onSelect }) => {
  const filteredCalculators = CALCULATORS.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredCalculators.map((calc, index) => (
          <motion.button
            key={calc.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(calc)}
            className="group relative flex flex-col p-6 glass rounded-[2rem] text-left hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Star size={18} className="text-slate-300 hover:text-yellow-400 transition-colors" />
            </div>

            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:rotate-6",
              calc.category === 'Basic' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
              calc.category === 'Finance' && "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
              calc.category === 'Health' && "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
              calc.category === 'Utility' && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            )}>
              <calc.icon size={28} />
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {calc.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
              {calc.description}
            </p>

            <div className="mt-auto flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              <span>Open Calculator</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </AnimatePresence>

      {filteredCalculators.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">No calculators found</h3>
          <p className="text-slate-500">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};
