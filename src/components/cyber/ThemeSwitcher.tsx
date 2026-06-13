
'use client';

import React, { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Shield, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const { mode, setMode } = useUIStore();

  useEffect(() => {
    const savedMode = localStorage.getItem('cyberdeck-mode') as 'defensive' | 'offensive';
    if (savedMode) {
      setMode(savedMode);
    }
  }, [setMode]);

  const toggleMode = () => {
    const nextMode = mode === 'defensive' ? 'offensive' : 'defensive';
    setMode(nextMode);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[7px] font-bold text-primary/40 uppercase tracking-[0.2em]">Operational_Matrix</span>
        <span className="text-[9px] font-code text-primary uppercase tracking-widest">
          {mode === 'defensive' ? 'Defensive Mode — Resilient' : 'Offensive Mode — Tactical'}
        </span>
      </div>
      
      <button 
        onClick={toggleMode}
        className="relative w-16 h-8 border-2 border-primary/20 bg-primary/5 transition-all flex items-center px-1"
        style={{ borderRadius: 'var(--radius)' }}
      >
        <motion.div 
          animate={{ x: mode === 'defensive' ? 0 : 32 }}
          className="w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground shadow-[0_0_15px_hsla(var(--primary),0.5)]"
          style={{ borderRadius: 'var(--radius)' }}
        >
          {mode === 'defensive' ? <Shield className="w-4 h-4" /> : <Crosshair className="w-4 h-4" />}
        </motion.div>
        
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none opacity-20">
          <Shield className="w-3 h-3 text-primary" />
          <Crosshair className="w-3 h-3 text-primary" />
        </div>
      </button>
    </div>
  );
}
