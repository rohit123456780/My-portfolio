
'use client';

import React, { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Shield, Crosshair, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('cyberdeck-theme') as 'blue-team' | 'red-team';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'blue-team' ? 'red-team' : 'blue-team';
    setTheme(nextTheme);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[7px] font-bold text-primary/40 uppercase tracking-[0.2em]">Operational_Theme</span>
        <span className="text-[9px] font-code text-primary uppercase tracking-widest">
          {theme === 'blue-team' ? 'Blue Team Mode — Defensive' : 'Red Team Mode — Offensive'}
        </span>
      </div>
      
      <button 
        onClick={toggleTheme}
        className={`relative w-16 h-8 border-2 transition-all flex items-center px-1 ${
          theme === 'blue-team' ? 'border-primary/40 bg-primary/5' : 'border-primary/40 bg-primary/5'
        }`}
      >
        <motion.div 
          animate={{ x: theme === 'blue-team' ? 0 : 32 }}
          className={`w-6 h-6 flex items-center justify-center ${
            theme === 'blue-team' ? 'bg-primary text-primary-foreground shadow-[0_0_10px_hsla(var(--primary),0.5)]' : 'bg-primary text-primary-foreground shadow-[0_0_10px_hsla(var(--primary),0.5)]'
          }`}
        >
          {theme === 'blue-team' ? <Shield className="w-4 h-4" /> : <Crosshair className="w-4 h-4" />}
        </motion.div>
        
        {/* Background Icons */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none opacity-20">
          <Shield className="w-3 h-3 text-primary" />
          <Crosshair className="w-3 h-3 text-primary" />
        </div>
      </button>
    </div>
  );
}
