
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, Terminal as TerminalIcon, Cpu, Globe, Lock } from 'lucide-react';

const logs = [
  "HYPERVISOR_CORE_LOADED [v4.2.1]",
  "KERNEL_AUTHORIZATION_SEQUENCE... START",
  "SECURE_LAYER_DECRYPTED... [OK]",
  "NEURAL_LINK_ESTABLISHED: ROHIT_ROY",
  "IDENTITY_SIGNATURE: VERIFIED",
  "ACCESS_LEVEL: OMNI_ROOT",
  "INITIALIZING_TACTICAL_HUD...",
  "DDoS_MITIGATION_BYPASS... NEGATIVE",
  "THREAT_INTEL_STREAM_ACTIVE",
  "WELCOME_TO_THE_LAIR"
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
          setTimeout(() => setBooted(true), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [setBooted]);

  useEffect(() => {
    if (mounted) {
      const times = logs.map(() => new Date().toLocaleTimeString([], { hour12: false, second: '2-digit', fractionalSecondDigits: 3 }));
      setTimeStrings(times);
    }
  }, [mounted]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#010102] flex flex-col items-center justify-center p-8 font-code overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: "circIn" }}
    >
      <div className="noise-overlay" />
      
      <div className="w-full max-w-2xl space-y-12 relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
             <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 border-2 border-[#00ff9f]/30 bg-[#00ff9f]/5 relative"
            >
              <Shield className="w-16 h-16 text-[#00ff9f] animate-pulse" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ff9f]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ff9f]" />
            </motion.div>
            <div className="space-y-1">
              <h2 className="text-4xl font-headline tracking-[0.5em] text-[#00ff9f] uppercase text-glow">Cyber_Ops</h2>
              <p className="text-[10px] text-[#00ff9f]/60 uppercase tracking-[0.4em]">Node: IND_BARASAT_TERMINAL</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Diagnostic icon={Cpu} label="CPU_LOAD" value="12%" />
            <Diagnostic icon={Activity} label="SYNC" value="ACTIVE" />
            <Diagnostic icon={Globe} label="NET" value="ENCRYPTED" />
            <Diagnostic icon={Lock} label="AUTH" value="LEVEL_10" />
          </div>
        </div>

        <div className="h-64 overflow-hidden text-[10px] space-y-1.5 bg-black/90 p-8 border border-[#00ff9f]/20 font-code relative shadow-[0_0_50px_rgba(0,255,159,0.1)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff9f]/50 to-transparent animate-pulse" />
          {mounted && logs.slice(0, currentLog + 1).map((log, i) => (
            <div key={i} className="flex gap-6 items-center">
              <span className="text-[#00ff9f]/30 font-bold">[{timeStrings[i] || '00:00:00.000'}]</span>
              <span className={i === currentLog ? "text-[#00cfff] text-xs font-bold" : "text-[#00ff9f]/70"}>
                {i === currentLog ? ">> EXEC_COMMAND: " : ">> "} {log}
              </span>
            </div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.4 }}
            className="w-2.5 h-4 bg-[#00cfff] inline-block align-middle ml-2" 
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[8px] text-[#00ff9f]/40 uppercase tracking-widest">
            <span>Neural_Core_Syncing</span>
            <span>{Math.floor((currentLog / logs.length) * 100)}%</span>
          </div>
          <div className="w-full h-[1px] bg-[#00ff9f]/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#00ff9f] shadow-[0_0_20px_rgba(0,255,159,1)]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLog / logs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 text-[8px] text-[#00ff9f]/20 uppercase tracking-[0.5em] font-code">
        System_Authorization_Required // Do_Not_Disconnect
      </div>
    </motion.div>
  );
}

function Diagnostic({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="w-3.5 h-3.5 text-[#00ff9f]/40" />
      <span className="text-[7px] text-[#00ff9f]/30 uppercase font-bold">{label}</span>
      <span className="text-[9px] text-[#00ff9f] font-code">{value}</span>
    </div>
  );
}
