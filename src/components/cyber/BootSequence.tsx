
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Shield } from 'lucide-react';

const logs = [
  "SYSTEM_BOOT_INIT [v3.0.0]",
  "KERNEL_AUTHORIZATION... GRANTED",
  "SECURE_LAYER_DECRYPTED... DONE",
  "PRIMARY_LINK_ESTABLISHED: ROHIT_ROY",
  "ACCESS_LEVEL: ADMIN_ROOT",
  "INITIALIZING_TACTICAL_HUD...",
  "MISSION_PARAMETERS_LOADED"
];

export default function BootSequence() {
  const { setBooted } = useUIStore();
  const [currentLog, setCurrentLog] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [timeStrings, setTimeStrings] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentLog(prev => {
        if (prev >= logs.length - 1) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [setBooted]);

  useEffect(() => {
    if (mounted) {
      // Generate a fresh set of timestamps only once on the client
      const times = logs.map(() => new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' }));
      setTimeStrings(times);
    }
  }, [mounted]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#020408] flex flex-col items-center justify-center p-8 font-code overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-lg space-y-12 relative z-10">
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-6 border border-[#00ff9f]/20 bg-[#00ff9f]/5 rounded-full relative"
          >
            <Shield className="w-16 h-16 text-[#00ff9f] animate-pulse" />
            <div className="absolute inset-0 border border-[#00ff9f]/10 rounded-full animate-ping" />
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-headline tracking-[0.4em] text-[#00ff9f] uppercase text-glow">Cyber_Ops</h2>
            <div className="flex justify-center items-center gap-4 text-[10px] text-[#00ff9f]/40 uppercase tracking-[0.3em]">
              <span>NODE: INDIA_WB</span>
              <span className="w-1 h-1 bg-[#00ff9f]/20 rounded-full" />
              <span>SIG: AUTHORIZED</span>
            </div>
          </div>
        </div>

        <div className="h-48 overflow-hidden text-[11px] space-y-2 bg-black/80 p-6 border border-[#00ff9f]/10 font-code relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ff9f]/10" />
          {mounted && logs.slice(0, currentLog + 1).map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-[#00ff9f]/20">[{timeStrings[i] || '--:--:--'}]</span>
              <span className={i === currentLog ? "text-[#00cfff]" : "text-[#00ff9f]/70"}>
                {i === currentLog ? "> " : ">> "}{log}
              </span>
            </div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[#00ff9f]/40 inline-block align-middle ml-1" 
          />
        </div>

        <div className="flex justify-center pt-8">
          <div className="w-full h-[1px] bg-[#00ff9f]/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#00ff9f] shadow-[0_0_15px_rgba(0,255,159,1)]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLog / logs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
