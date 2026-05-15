"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';

const logs = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL INTERFACE...",
  "MOUNTING MISSION_LOGS...",
  "DECRYPTING CREDENTIALS...",
  "ESTABLISHING SECURE CHANNEL...",
  "SYNCING SKILL_GALAXY...",
  "AUTHENTICATING AS ROHIT_ROY...",
  "SYSTEMS READY."
];

export default function BootSequence() {
  const { setBooted } = useUIStore();
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const logTimer = setInterval(() => {
      setCurrentLog((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  if (progress === 100) {
    setTimeout(() => setBooted(true), 800);
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center p-8 font-code"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-primary mb-1">
            <span>[ SYSTEM_BOOT_SEQUENCE ]</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-primary/20 overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="h-24 overflow-hidden text-xs space-y-1 opacity-70">
          {logs.slice(0, currentLog + 1).map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-accent">{">>"}</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setBooted(true)}
          className="text-[10px] text-primary/50 hover:text-primary underline uppercase tracking-widest mt-8 transition-colors"
        >
          [ SKIP_INITIALIZATION ]
        </button>
      </div>
    </motion.div>
  );
}
