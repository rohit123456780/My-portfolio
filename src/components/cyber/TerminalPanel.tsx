"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const storyLogs = [
  "SYSTEM ACCESS GRANTED: LOGGED IN AS ADMIN@CYBERDECK",
  "RETRIEVING PROFILE DATA: ROHIT ROY...",
  "TITLE: OT ENGINEERING ADMINISTRATOR L1",
  "CORE COMPETENCIES: VAPT, SOC, ICS SECURITY, FORENSICS",
  "MISSION STATUS: ACTIVE",
  "LOCATION: BARASAT, WEST BENGAL, INDIA",
  "CONTACT SECURE: +91-6294067930",
  "EMAIL: DASHINGRAJ447@GMAIL.COM",
  "LINKEDIN: linkedin.com/in/rohit-roy-rrr"
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
    }, 150);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto font-code text-sm cyber-glass p-6 border-glow">
      <div className="flex items-center gap-2 border-b border-primary/20 pb-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-destructive/50" />
        <div className="w-3 h-3 rounded-full bg-accent/50" />
        <div className="w-3 h-3 rounded-full bg-primary/50" />
        <span className="ml-2 text-[10px] text-primary/50 tracking-widest uppercase">system_log.sh</span>
      </div>
      
      <div className="space-y-2 min-h-[200px]">
        {visibleLogs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <span className="text-primary/30">[{log.time}]</span>
            <span className={i === 0 ? "text-accent" : "text-foreground"}>{log.text}</span>
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-primary inline-block align-middle"
        />
      </div>
    </div>
  );
}
