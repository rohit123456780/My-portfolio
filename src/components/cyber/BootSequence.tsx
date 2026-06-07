
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Shield, Lock } from 'lucide-react';

const logs = [
  "SYSTEM_BOOT_INIT [v2.5.0]",
  "LOADING_KERNEL_MODULES... DONE",
  "DECRYPTING_NEURAL_INTERFACE... DONE",
  "ESTABLISHING_SECURE_TUNNEL_01... DONE",
  "AUTHORIZING_USER: ROHIT_ROY... GRANTED",
  "ACCESS_GRANTED_v2.5.0",
  "SYNCING_MISSION_MATRIX..."
];

export default function BootSequence() {
  const { setBooted } = useUIStore();
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLog(prev => {
        if (prev >= logs.length - 1) {
          clearInterval(timer);
          setTimeout(() => setBooted(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [setBooted]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#020408] flex flex-col items-center justify-center p-8 font-code overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-lg space-y-12 relative z-10">
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-6 border border-primary/20 bg-primary/5 rounded-full relative"
          >
            <Shield className="w-16 h-16 text-primary animate-pulse" />
            <div className="absolute inset-0 border border-primary/10 rounded-full animate-ping" />
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-headline tracking-[0.4em] text-glow glitch-text">ROHIT_ROY_OPS</h2>
            <div className="flex justify-center items-center gap-4 text-[10px] text-primary/40 uppercase tracking-[0.3em]">
              <span>NODE: WB_INDIA</span>
              <span className="w-1 h-1 bg-primary/20 rounded-full" />
              <span>LEVEL: ADMIN</span>
            </div>
          </div>
        </div>

        <div className="h-48 overflow-hidden text-[11px] space-y-2 bg-black/60 p-6 border border-white/5 font-code relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/10" />
          {logs.slice(0, currentLog + 1).map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-primary/20">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className={i === currentLog ? "text-accent" : "text-primary/70"}>
                {i === currentLog ? "> " : ">> "}{log}
              </span>
            </div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-primary/40 inline-block align-middle ml-1" 
          />
        </div>

        <div className="flex justify-center pt-8">
          <div className="w-full h-[2px] bg-primary/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(0,255,159,1)]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLog / logs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
