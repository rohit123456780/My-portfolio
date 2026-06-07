
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TerminalPanel() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full font-code text-[10px] cyber-glass p-4 border-primary/10">
      <div className="flex items-center gap-2 border-b border-primary/20 pb-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
        <span className="text-[8px] text-primary/30 tracking-widest uppercase">system_relay.log</span>
      </div>
      
      <div className="space-y-1 min-h-[60px]">
        <div className="flex gap-2">
          <span className="text-primary/20">[{currentTime}]</span>
          <span className="text-primary/60 tracking-tighter uppercase">SECURE_LINK_STABLE</span>
        </div>
        <div className="flex gap-2">
          <span className="text-primary/20">[{currentTime}]</span>
          <span className="text-primary/60 tracking-tighter uppercase">AETHER_SUBSYSTEM_ONLINE</span>
        </div>
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-1.5 h-3 bg-primary/40 inline-block align-middle ml-1"
        />
      </div>
    </div>
  );
}
