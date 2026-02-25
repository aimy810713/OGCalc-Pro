import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  History, 
  Star, 
  Menu, 
  X,
  Globe,
  Command
} from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, toggleSidebar, isSidebarOpen }) => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Calculator size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400 hidden sm:block">
            OmniCalc Pro
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-4 relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
          <Search size={18} />
        </div>
        <input 
          type="text"
          placeholder="Search calculators... (Ctrl+K)"
          className="w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500 rounded-xl transition-all outline-none text-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded">
            <Command size={10} /> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400 hidden sm:block">
          <Globe size={20} />
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        <button className="flex items-center gap-2 p-1.5 pl-1.5 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs">
            JD
          </div>
          <span className="text-sm font-medium hidden md:block">John Doe</span>
        </button>
      </div>
    </header>
  );
};

import { Calculator } from 'lucide-react';
