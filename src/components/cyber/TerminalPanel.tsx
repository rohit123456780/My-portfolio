"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const storyLogs = [
  "SYSTEM INITIALIZED",
  "NEURAL LINK ESTABLISHED",
  "SCANNING SECTOR 7G...",
  "MAP GENERATED",
  "READY FOR NAVIGATION"
];

export default function TerminalPanel() {
  const [visibleLogs, setVisibleLogs] = useState<{ text: string, time: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < storyLogs.length) {
        setVisibleLogs(prev => [
          ...prev, 
          { 
            text: storyLogs[index], 
            time: new Date().toLocaleTimeString() 
          }
        ]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full font-code text-[10px] cyber-glass p-4 border-primary/10">
      <div className="flex items-center gap-2 border-b border-primary/20 pb-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-primary/30" />
        <span className="text-[8px] text-primary/30 tracking-widest uppercase">system_log.sh</span>
      </div>
      
      <div className="space-y-1 min-h-[100px]">
        {visibleLogs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -5 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <span className="text-primary/20">[{log.time}]</span>
            <span className="text-primary/60">{log.text}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-1.5 h-3 bg-primary/40 inline-block align-middle"
        />
      </div>
    </div>
  );
}
