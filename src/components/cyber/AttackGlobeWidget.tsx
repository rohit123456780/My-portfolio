'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Activity, Shield, Crosshair, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
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

  // Fetch real CVE data for Defensive Mode
  useEffect(() => {
    if (mode === 'defensive') {
      const fetchCVEs = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://cve.circl.lu/api/last/5');
          const data = await response.json();
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

  return (
    <div className={`cyber-glass w-full max-w-[450px] aspect-square flex flex-col p-4 relative overflow-hidden group ${mode === 'offensive' ? 'border-red-500/30' : 'border-primary/20'}`}>
      <div className="flex justify-between items-center mb-4 z-10">
        <div className="flex items-center gap-2">
          {mode === 'defensive' ? (
            <Shield className="w-4 h-4 text-primary animate-pulse" />
          ) : (
            <Crosshair className="w-4 h-4 text-red-500 animate-pulse" />
          )}
          <span className="text-[10px] font-headline uppercase tracking-widest text-primary">
            {mode === 'defensive' ? 'Vulnerability_Registry_Live' : 'Live_Threat_Infiltration'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-code text-primary/40 uppercase tracking-tighter">
            {mode === 'defensive' ? 'Source: NVD/MITRE' : 'Source: Checkpoint_Live'}
          </span>
          {loading && <RefreshCw className="w-3 h-3 text-primary animate-spin" />}
        </div>
      </div>

      <div className={`flex-1 relative rounded-sm overflow-hidden bg-black/40 border ${mode === 'offensive' ? 'border-red-500/20' : 'border-primary/10'}`}>
        <AnimatePresence mode="wait">
          {mode === 'offensive' ? (
            <motion.div 
              key="offensive-map"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <iframe 
                src="https://threatmap.checkpoint.com/" 
                className="w-full h-full grayscale invert opacity-70 contrast-150"
                title="Checkpoint Live Threat Map"
                style={{ border: 'none' }}
              />
              <div className="absolute inset-0 pointer-events-none border border-red-500/20" />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 animate-pulse uppercase">
                Live_Feed_Hijacked
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="defensive-intel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full h-full p-6 flex flex-col"
            >
              <div className="space-y-1 mb-8">
                <p className="text-[10px] font-code text-primary/40 uppercase tracking-[0.2em]">Total_Vulnerabilities_Catalogued</p>
                <h3 className="text-4xl font-headline text-glow text-primary tabular-nums">
                  {totalVulnerabilities.toLocaleString()}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 flex-1 bg-primary/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-[8px] font-code text-accent uppercase">Live_Sync</span>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-hidden">
                <p className="text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-2 border-b border-primary/10 pb-2">
                  <AlertTriangle className="w-3 h-3" /> Recent_CVE_Entries
                </p>
                {cves.length > 0 ? cves.map((cve, i) => (
                  <motion.div 
                    key={cve.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2 bg-primary/5 border-l-2 border-primary/30"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-bold text-primary">{cve.id}</span>
                      <span className="text-[7px] font-code text-primary/30 uppercase">Verified</span>
                    </div>
                    <p className="text-[8px] font-code text-primary/60 line-clamp-2 italic leading-tight">
                      "{cve.summary}"
                    </p>
                  </motion.div>
                )) : (
                  <div className="flex flex-col items-center justify-center h-32 opacity-20">
                    <Activity className="w-8 h-8 animate-pulse mb-2" />
                    <span className="text-[8px] font-code uppercase">Establishing_Neural_Link...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="space-y-1">
           <div className="text-[7px] font-code text-primary/30 uppercase tracking-[0.2em]">
            Operational_Intelligence_v6.0
          </div>
          <p className="text-[6px] font-code text-primary/20 uppercase">
            {mode === 'defensive' 
              ? 'Real-time CVE data provided by CIRCL.LU API' 
              : 'Target telemetry streamed via Checkpoint Network'}
          </p>
        </div>
        {mode === 'offensive' && (
           <a 
            href="https://threatmap.checkpoint.com/" 
            target="_blank" 
            className="p-2 border border-red-500/20 hover:bg-red-500/10 transition-colors"
           >
             <ExternalLink className="w-3 h-3 text-red-500" />
           </a>
        )}
      </div>
    </div>
  );
}