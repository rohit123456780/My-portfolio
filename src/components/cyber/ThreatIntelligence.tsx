
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Zap, Globe, Terminal, Shield } from 'lucide-react';

const COUNTRIES_PATH = "M3.5,13.2l1.2,1.1l1.1-1.1v-2.2l-1.1-1.1L3.5,11V13.2z M12.4,14.3l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L12.4,11V14.3z M24.7,11.5l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L24.7,9.3V11.5z M35.8,16.5l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L35.8,14.3V16.5z M50.2,12.1l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L50.2,9.9V12.1z M65.7,18.7l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L65.7,16.5V18.7z M80.1,14.3l1.1,1.1h2.2l1.1-1.1v-2.2l-1.1-1.1h-2.2L80.1,12.1V14.3z"; // Very simplified world dots for demo

type AttackLog = {
  id: string;
  type: 'ALERT' | 'BLOCKED' | 'INFO';
  message: string;
  timestamp: string;
};

export default function ThreatIntelligence() {
  const [logs, setLogs] = useState<AttackLog[]>([]);
  const [activeArcs, setActiveArcs] = useState<{ id: number, x1: number, y1: number, x2: number, y2: number }[]>([]);

  // Generate random logs
  useEffect(() => {
    const logTypes = ['ALERT', 'BLOCKED', 'INFO'];
    const logMessages = [
      'Suspicious SSH login attempt from 185.x.x.x — Port 22',
      'Port scan detected from 91.x.x.x',
      'Honeypot interaction logged — Cowrie SSH',
      'DDoS mitigation triggered — Magnitude peak 450Mbps',
      'Unusual traffic pattern identified in Node 40',
      'Access denied for root user from local subnet',
      'Brute force attack blocked from 45.12.33.1',
      'Malicious payload identified and quarantined'
    ];

    const addLog = () => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)] as any;
      const message = logMessages[Math.floor(Math.random() * logMessages.length)];
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour12: false, second: '2-digit', minute: '2-digit' })
      };
      setLogs(prev => [newLog, ...prev].slice(0, 10));

      // Also trigger a random arc
      const arc = {
        id: Date.now(),
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
      };
      setActiveArcs(prev => [...prev, arc]);
      setTimeout(() => {
        setActiveArcs(prev => prev.filter(a => a.id !== arc.id));
      }, 3000);
    };

    const interval = setInterval(addLog, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="cyber-glass p-8 border-l-4 border-l-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Globe className="w-64 h-64 text-primary" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-5 h-5 text-primary animate-pulse" />
        <div>
          <h2 className="text-xl font-headline tracking-widest uppercase">Live Threat Intelligence</h2>
          <p className="text-[8px] font-code text-primary/40 uppercase tracking-[0.3em]">Operational Node: GLOBAL_SURVEILLANCE_v4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Animated Map */}
        <div className="relative aspect-video bg-black/40 border border-primary/10 rounded-sm overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 100 60" className="w-full h-full opacity-60">
            {/* Dots representing landmasses */}
            <rect x="0" y="0" width="100" height="60" fill="transparent" />
            <g fill="currentColor" className="text-primary/20">
              <circle cx="20" cy="20" r="0.5" />
              <circle cx="40" cy="30" r="0.5" />
              <circle cx="70" cy="25" r="0.5" />
              <circle cx="30" cy="45" r="0.5" />
              <circle cx="80" cy="45" r="0.5" />
              <circle cx="15" cy="40" r="0.5" />
              <circle cx="55" cy="15" r="0.5" />
              <circle cx="65" cy="50" r="0.5" />
            </g>
            
            {/* Attack Arcs */}
            <AnimatePresence>
              {activeArcs.map(arc => (
                <motion.path
                  key={arc.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={`M${arc.x1},${arc.y1} Q${(arc.x1 + arc.x2) / 2},${Math.min(arc.y1, arc.y2) - 10} ${arc.x2},${arc.y2}`}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  fill="transparent"
                  className="text-primary"
                />
              ))}
            </AnimatePresence>

            {/* Pulsing Nodes */}
            <g fill="currentColor" className="text-primary">
              <circle cx="70" cy="25" r="0.8" className="animate-ping" />
              <circle cx="20" cy="20" r="0.8" className="animate-ping" />
            </g>
          </svg>
          
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-code text-primary uppercase tracking-widest">Scanning_Global_Network...</span>
          </div>
        </div>

        {/* Live Logs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-primary/20 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase">Event_Log_Matrix</span>
            </div>
            <span className="text-[8px] font-code text-primary/40 uppercase">Mode: Real_Time_Sync</span>
          </div>

          <div className="h-[250px] overflow-hidden space-y-2 font-code text-[10px] no-scrollbar">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 p-2 bg-primary/5 border-l border-primary/20"
                >
                  <span className="text-primary/40 shrink-0">[{log.timestamp}]</span>
                  <span className={`font-bold shrink-0 ${
                    log.type === 'ALERT' ? 'text-red-500' : 
                    log.type === 'BLOCKED' ? 'text-yellow-500' : 'text-accent'
                  }`}>
                    [{log.type}]
                  </span>
                  <span className="text-primary/80 truncate">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[8px] font-code text-primary/30 uppercase max-w-md italic">
          Disclaimer: Simulated data for demonstration purposes — inspired by honeypot threat intelligence (Cowrie).
        </p>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <Shield className="w-3 h-3 text-primary/40" />
             <span className="text-[8px] font-code text-primary/40 uppercase">Secure_Node_Active</span>
           </div>
           <div className="flex items-center gap-2">
             <Zap className="w-3 h-3 text-accent animate-pulse" />
             <span className="text-[8px] font-code text-accent uppercase">Live_Feed_Enabled</span>
           </div>
        </div>
      </div>
    </section>
  );
}
