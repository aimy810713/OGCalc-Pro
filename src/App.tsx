import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CalculatorGrid } from './components/CalculatorGrid';
import { CalculatorInfo, CALCULATORS } from './constants';
import { StandardCalculator } from './components/calculators/StandardCalculator';
import { EMICalculator } from './components/calculators/EMICalculator';
import { BMICalculator } from './components/calculators/BMICalculator';
import { SIPCalculator } from './components/calculators/SIPCalculator';
import { PasswordGenerator } from './components/calculators/PasswordGenerator';
import { ChevronLeft, Share2, Star, Printer, History as HistoryIcon } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCalc, setSelectedCalc] = useState<CalculatorInfo | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input')?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedCalc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderCalculator = () => {
    if (!selectedCalc) return null;

    switch (selectedCalc.id) {
      case 'standard':
        return <StandardCalculator />;
      case 'emi':
        return <EMICalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'sip':
        return <SIPCalculator />;
      case 'password':
        return <PasswordGenerator />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 mb-6">
              <selectedCalc.icon size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedCalc.name}</h2>
            <p className="text-slate-500 max-w-md">
              This calculator is currently being optimized for the best experience. 
              Please check back soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchQuery} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 relative">
        <Sidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {!selectedCalc ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto"
              >
                <div className="mb-10">
                  <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
                    {activeCategory === 'all' ? 'Explore All Tools' : `${activeCategory} Calculators`}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
                    Professional grade tools for every calculation. Fast, accurate, and designed for modern workflows.
                  </p>
                </div>

                <CalculatorGrid 
                  searchQuery={searchQuery} 
                  activeCategory={activeCategory} 
                  onSelect={setSelectedCalc}
                />
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-5xl mx-auto"
              >
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedCalc(null)}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          selectedCalc.category === 'Finance' ? "bg-teal-100 text-teal-600" : "bg-blue-100 text-blue-600"
                        )}>
                          {selectedCalc.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Tool</span>
                      </div>
                      <h2 className="text-2xl font-black">{selectedCalc.name}</h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500" title="Add to Favorites">
                      <Star size={20} />
                    </button>
                    <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500" title="Share Results">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500" title="Print View">
                      <Printer size={20} />
                    </button>
                  </div>
                </div>

                <div className="glass rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/20 dark:border-slate-800/50">
                  {renderCalculator()}
                </div>

                {/* FAQ/SEO Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <h3 className="text-xl font-bold mb-4">How to use {selectedCalc.name}</h3>
                      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        <p>
                          Our {selectedCalc.name} is designed to provide quick and accurate results. 
                          Simply enter the required values in the input fields above. The results will 
                          update in real-time as you change the values.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                          <li>Adjust sliders or type directly into the input boxes.</li>
                          <li>View visual representations like charts for better understanding.</li>
                          <li>Export your results as PDF or share them with others.</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {[
                          { q: "Is this calculator accurate?", a: "Yes, our algorithms are based on standard mathematical and financial formulas used globally." },
                          { q: "Can I use this offline?", a: "Yes, OmniCalc Pro is a PWA and works offline once fully loaded." }
                        ].map((faq, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-sm mb-1">{faq.q}</h4>
                            <p className="text-xs text-slate-500">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-600 to-indigo-600 text-white shadow-xl">
                      <h4 className="font-bold mb-2">Need Help?</h4>
                      <p className="text-xs text-white/80 mb-4">Check out our detailed guide on {selectedCalc.name.toLowerCase()} calculations.</p>
                      <button className="w-full py-2 bg-white text-teal-600 rounded-xl font-bold text-xs hover:bg-teal-50 transition-colors">
                        Read Guide
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl glass border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 mb-4">
                        <HistoryIcon size={18} className="text-teal-500" />
                        <h4 className="font-bold text-sm">Recent Activity</h4>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-400 text-center py-4">No recent history for this calculator.</p>
                      </div>
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 z-50 group">
        <HistoryIcon size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
