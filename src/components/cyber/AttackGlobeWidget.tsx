'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useUIStore } from '@/lib/store';
import { Activity, Shield, Crosshair, AlertTriangle, ExternalLink, RefreshCw, Zap, Cpu, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CVE {
  id: string;
  summary: string;
  Published?: string;
}

export default function AttackGlobeWidget() {
  const { mode } = useUIStore();
  const [cveBuffer, setCveBuffer] = useState<CVE[]>([]);
  const [displayedCves, setDisplayedCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalVulnerabilities, setTotalVulnerabilities] = useState(250142);
  const [syncRate, setSyncRate] = useState(98.4);
  const [latency, setLatency] = useState(12);

  // Initial Fetch of real CVE data
  useEffect(() => {
    if (mode === 'defensive') {
      const fetchInitialData = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://cve.circl.lu/api/last/30');
          const data = await response.json();
          if (Array.isArray(data)) {
            setCveBuffer(data);
            setDisplayedCves(data.slice(0, 3));
          }
        } catch (error) {
          console.error('Failed to sync with CVE database', error);
          const fallback = [
            { id: "CVE-2024-4421", summary: "Critical buffer overflow in kernel subsystem discovered by Aether-Node-7." },
            { id: "CVE-2024-1192", summary: "Zero-day exploitation vector identified in legacy SSL protocols." },
            { id: "CVE-2024-0012", summary: "Unauthorized privilege escalation detected in cloud-native binaries." },
            { id: "CVE-2024-9981", summary: "Remote code execution found in widespread IoT gateway firmwares." },
            { id: "CVE-2024-7723", summary: "SQL injection vulnerability in enterprise resource planning modules." }
          ];
          setCveBuffer(fallback);
          setDisplayedCves(fallback.slice(0, 3));
        } finally {
          setLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [mode]);

  // Shuffling Logic
  useEffect(() => {
    if (mode === 'defensive' && cveBuffer.length > 0) {
      const shuffleInterval = setInterval(() => {
        const shuffled = [...cveBuffer].sort(() => 0.5 - Math.random());
        setDisplayedCves(shuffled.slice(0, 3));
        setTotalVulnerabilities(prev => prev + Math.floor(Math.random() * 2));
      }, 4000);

      return () => clearInterval(shuffleInterval);
    }
  }, [mode, cveBuffer]);

  useEffect(() => {
    const jitter = setInterval(() => {
      setSyncRate(prev => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Math.max(92, Math.min(99.9, prev + delta));
      });
      setLatency(prev => {
        const delta = (Math.random() - 0.5) * 6;
        return Math.max(4, Math.min(32, prev + delta));
      });
    }, 1200);
    return () => clearInterval(jitter);
  }, []);

  return (
    <div className={`cyber-glass w-full aspect-square max-w-[480px] flex flex-col p-4 md:p-5 relative overflow-hidden group ${mode === 'offensive' ? 'border-red-500/40' : 'border-primary/30'}`}>
      {/* Scanning Laser Beam */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className={`absolute left-0 right-0 h-0.5 z-20 pointer-events-none blur-[1px] ${mode === 'offensive' ? 'bg-red-500/60 shadow-[0_0_20px_red]' : 'bg-primary/60 shadow-[0_0_20px_cyan]'}`}
      />

      <div className="flex justify-between items-center mb-4 md:mb-6 z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {mode === 'defensive' ? (
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
            ) : (
              <Crosshair className="w-4 h-4 md:w-5 md:h-5 text-red-500 animate-pulse" />
            )}
            <span className="text-[8px] md:text-[10px] font-headline uppercase tracking-[0.2em] md:tracking-[0.3em] text-glow">
              {mode === 'defensive' ? 'Vulnerability_Registry_v4.5' : 'Infiltration_Matrix_v6.1'}
            </span>
          </div>
          <span className="text-[6px] md:text-[7px] font-code text-primary/30 uppercase mt-1 tracking-widest">
            {mode === 'defensive' ? 'Source: NVD / MITRE / CIRCL' : 'Node: Black_Ops_Proxy'}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[6px] md:text-[7px] font-code text-primary/40 uppercase">Latency</span>
            <span className="text-[8px] md:text-[9px] font-code text-primary tabular-nums">{latency.toFixed(1)}ms</span>
          </div>
          {loading ? <RefreshCw className="w-3 h-3 md:w-4 md:h-4 text-primary animate-spin" /> : <Zap className="w-3 h-3 md:w-4 md:h-4 text-accent animate-pulse" />}
        </div>
      </div>

      <div className={`flex-1 relative rounded-sm overflow-hidden bg-black/60 border backdrop-blur-md ${mode === 'offensive' ? 'border-red-500/20' : 'border-primary/20'}`}>
        {/* Background Grid Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none cyber-grid" />
        
        <AnimatePresence mode="wait">
          {mode === 'offensive' ? (
            <motion.div 
              key="offensive-map"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <iframe 
                src="https://threatmap.checkpoint.com/" 
                className="w-full h-full grayscale invert opacity-60 contrast-125 scale-110 pointer-events-none"
                title="Checkpoint Live Threat Map"
                style={{ border: 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
              <div className="absolute top-2 left-2 md:top-4 md:left-4 flex gap-2">
                <div className="bg-red-600 text-white text-[7px] md:text-[9px] font-bold px-2 md:px-3 py-1 animate-pulse uppercase tracking-widest border border-red-400">
                  Live_Infiltration_Active
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="defensive-intel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full p-4 md:p-6 flex flex-col relative z-10"
            >
              {/* Diagnostic Top Readout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-8">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[7px] md:text-[8px] font-code text-primary/40 uppercase tracking-widest">Global_Node_Registry</p>
                  <h3 className="text-2xl md:text-4xl font-headline text-glow text-primary tabular-nums tracking-tighter">
                    {totalVulnerabilities.toLocaleString()}
                  </h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[7px] md:text-[8px] font-code text-accent uppercase">Neural_Link</span>
                    <span className="text-[8px] md:text-[9px] font-code text-accent tabular-nums">{syncRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex gap-0.5 md:gap-1 h-1.5 md:h-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isActive = i / 12 < (syncRate - 80) / 20;
                      return (
                        <motion.div 
                          key={i}
                          animate={{ 
                            opacity: isActive ? [0.2, 1, 0.2] : 0.1,
                            scaleY: isActive ? [1, 1.5, 1] : 1,
                            backgroundColor: isActive ? 'hsla(var(--accent), 1)' : 'hsla(var(--primary), 0.2)'
                          }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                          className="flex-1 rounded-full"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic Decryption Feed */}
              <div className="flex-1 space-y-3 md:space-y-4 overflow-hidden">
                <div className="flex items-center justify-between border-b border-primary/20 pb-1 md:pb-2">
                  <p className="text-[7px] md:text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-1 md:gap-2">
                    <Activity className="w-2.5 h-2.5 md:w-3 md:h-3 animate-ping" /> Decrypting_Feed
                  </p>
                  <span className="text-[6px] md:text-[7px] font-code text-primary/30 uppercase">Sync_Active</span>
                </div>
                
                <div className="space-y-2 md:space-y-3 overflow-y-auto no-scrollbar max-h-[120px] md:max-h-[180px]">
                  <AnimatePresence initial={false} mode="popLayout">
                    {displayedCves.length > 0 ? displayedCves.map((cve, i) => (
                      <motion.div 
                        key={cve.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="p-2 md:p-3 bg-primary/5 border-l-2 border-primary/40 relative group hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-0.5 md:mb-1">
                          <span className="text-[8px] md:text-[10px] font-bold text-primary tracking-widest">{cve.id}</span>
                        </div>
                        <p className="text-[7px] md:text-[9px] font-code text-primary/70 line-clamp-1 md:line-clamp-2 leading-relaxed italic">
                          "{cve.summary}"
                        </p>
                      </motion.div>
                    )) : (
                      <div className="flex flex-col items-center justify-center h-24 md:h-40 space-y-2 md:space-y-4">
                        <Server className="w-6 h-6 md:w-10 md:h-10 text-primary/20 animate-pulse" />
                        <span className="text-[7px] md:text-[9px] font-code text-primary/40 uppercase tracking-[0.2em] md:tracking-[0.4em] animate-pulse">Syncing...</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 md:mt-5 flex justify-between items-end z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Cpu className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/30" />
            <span className="text-[6px] md:text-[8px] font-code text-primary/40 uppercase tracking-widest">Status: Optimal</span>
          </div>
          <p className="text-[6px] md:text-[7px] font-code text-primary/20 uppercase max-w-[200px] md:max-w-[280px] hidden sm:block">
            Simulated data stream via Global Vulnerability Registry (CIRCL).
          </p>
        </div>
      </div>
    </div>
  );
}
