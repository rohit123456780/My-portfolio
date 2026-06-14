'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useUIStore } from '@/lib/store';
import { Activity, Shield, Crosshair, AlertTriangle, ExternalLink, RefreshCw, Zap, Cpu, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CVE {
  id: string;
  summary: string;
  Published: string;
}

export default function AttackGlobeWidget() {
  const { mode } = useUIStore();
  const [cves, setCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalVulnerabilities, setTotalVulnerabilities] = useState(250142);
  const [syncRate, setSyncRate] = useState(98.4);
  const [latency, setLatency] = useState(12);

  // Fetch real CVE data for Defensive Mode
  useEffect(() => {
    if (mode === 'defensive') {
      const fetchCVEs = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://cve.circl.lu/api/last/5');
          const data = await response.json();
          // Simulate "decryption" delay for each entry
          setCves(data);
          setTotalVulnerabilities(prev => prev + Math.floor(Math.random() * 5));
        } catch (error) {
          console.error('Failed to sync with CVE database', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCVEs();
      const interval = setInterval(fetchCVEs, 30000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  // Jitter effect for diagnostics
  useEffect(() => {
    const jitter = setInterval(() => {
      setSyncRate(prev => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5))));
      setLatency(prev => Math.max(8, Math.min(24, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(jitter);
  }, []);

  return (
    <div className={`cyber-glass w-full max-w-[480px] aspect-square flex flex-col p-5 relative overflow-hidden group ${mode === 'offensive' ? 'border-red-500/40' : 'border-primary/30'}`}>
      {/* Scanning Laser Beam */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className={`absolute left-0 right-0 h-1 z-20 pointer-events-none blur-[2px] ${mode === 'offensive' ? 'bg-red-500/50 shadow-[0_0_15px_red]' : 'bg-primary/50 shadow-[0_0_15px_cyan]'}`}
      />

      <div className="flex justify-between items-center mb-6 z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {mode === 'defensive' ? (
              <Shield className="w-5 h-5 text-primary animate-pulse" />
            ) : (
              <Crosshair className="w-5 h-5 text-red-500 animate-pulse" />
            )}
            <span className="text-xs font-headline uppercase tracking-[0.3em] text-glow">
              {mode === 'defensive' ? 'Vulnerability_Registry_v4' : 'Infiltration_Matrix_v6'}
            </span>
          </div>
          <span className="text-[7px] font-code text-primary/30 uppercase mt-1 tracking-widest">
            {mode === 'defensive' ? 'Node: Global_Surveillance_Aether' : 'Node: Black_Ops_Proxy'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[7px] font-code text-primary/40 uppercase">Latency</span>
            <span className="text-[9px] font-code text-primary">{latency.toFixed(1)}ms</span>
          </div>
          {loading ? <RefreshCw className="w-4 h-4 text-primary animate-spin" /> : <Zap className="w-4 h-4 text-accent animate-pulse" />}
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
                className="w-full h-full grayscale invert opacity-60 contrast-125 scale-110"
                title="Checkpoint Live Threat Map"
                style={{ border: 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-red-600 text-white text-[9px] font-bold px-3 py-1 animate-pulse uppercase tracking-widest border border-red-400">
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
              className="w-full h-full p-6 flex flex-col relative z-10"
            >
              {/* Diagnostic Top Readout */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-code text-primary/40 uppercase tracking-widest">Global_Node_Registry</p>
                  <h3 className="text-4xl font-headline text-glow text-primary tabular-nums tracking-tighter">
                    {totalVulnerabilities.toLocaleString()}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] font-code text-accent uppercase">Neural_Link</span>
                    <span className="text-[9px] font-code text-accent">{syncRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          opacity: i / 12 < (syncRate - 90) / 10 ? [0.2, 1, 0.2] : 0.1,
                          scaleY: i / 12 < (syncRate - 90) / 10 ? [1, 1.5, 1] : 1
                        }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                        className="h-2 flex-1 bg-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Decryption Feed */}
              <div className="flex-1 space-y-4 overflow-hidden">
                <div className="flex items-center justify-between border-b border-primary/20 pb-2">
                  <p className="text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3 h-3 animate-ping" /> Decrypting_Latest_Nodes
                  </p>
                  <span className="text-[7px] font-code text-primary/30 uppercase">Auth_Verified</span>
                </div>
                
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {cves.length > 0 ? cves.map((cve, i) => (
                      <motion.div 
                        key={cve.id}
                        initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        transition={{ delay: i * 0.15 }}
                        className="p-3 bg-primary/5 border-l-2 border-primary/40 relative group hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-primary tracking-widest">{cve.id}</span>
                          <span className="text-[8px] font-code text-primary/20 uppercase">Vector_Verified</span>
                        </div>
                        <p className="text-[9px] font-code text-primary/70 line-clamp-2 leading-relaxed italic">
                          "{cve.summary}"
                        </p>
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-2 h-2 text-primary" />
                        </div>
                      </motion.div>
                    )) : (
                      <div className="flex flex-col items-center justify-center h-40 space-y-4">
                        <div className="relative">
                          <Server className="w-10 h-10 text-primary/20" />
                          <Activity className="absolute inset-0 w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <span className="text-[9px] font-code text-primary/40 uppercase tracking-[0.4em] animate-pulse">Syncing_Neural_Registry...</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex justify-between items-end z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-primary/30" />
            <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">Operational_Status: Optimal</span>
          </div>
          <p className="text-[7px] font-code text-primary/20 uppercase max-w-[280px]">
            Simulated intelligence feed inspired by Cowrie Honeypot telemetry. Data integrity secured by Guardian Protocol v4.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="p-2 border border-primary/20 hover:bg-primary/5 transition-colors cursor-help group relative">
             <InfoNode label="NVD_SYNC" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoNode({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-1 h-1 bg-primary mb-1 animate-pulse" />
      <span className="text-[6px] font-code text-primary/40 uppercase tracking-tighter">{label}</span>
    </div>
  );
}
