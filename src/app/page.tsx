
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '@/components/cyber/Hero3D';
import BootSequence from '@/components/cyber/BootSequence';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, Zap, Lock, Terminal, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isBooted } = useUIStore();
  const [typedText, setTypedText] = useState('');
  const fullText = "TECHNICAL_ENGINEER | OT/ICS_SPECIALIST | CYBER_PRACTITIONER";

  useEffect(() => {
    if (isBooted) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(timer);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [isBooted]);

  return (
    <main className="relative min-h-screen bg-[#020408] selection:bg-primary/30 overflow-hidden">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      {isBooted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative min-h-screen flex items-center justify-center"
        >
          <Hero3D />

          <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Intel Feed Left */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-[10px] font-code text-accent tracking-[0.4em] uppercase"
                >
                  <Lock className="w-3 h-3" /> SECURE_NODE_01_ESTABLISHED
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-headline tracking-tighter text-glow glitch-text leading-none">
                  ROHIT_ROY
                </h1>
                
                <p className="text-sm font-code text-primary/80 border-l-2 border-primary/40 pl-6 leading-relaxed">
                  {typedText}
                  <span className="w-2 h-5 bg-primary inline-block ml-1 animate-pulse" />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatusCard icon={Activity} label="MISSION_STATUS" value="ACTIVE_NODE" />
                <StatusCard icon={Zap} label="PRIMARY_DOMAIN" value="OT/ICS_SECURITY" />
              </div>

              <div className="flex gap-6 pt-4">
                <Link href="/identity">
                  <button className="px-8 py-3 bg-primary text-primary-foreground font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-2 group shadow-[0_0_20px_hsla(var(--primary),0.3)]">
                    Identity Core <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/experience">
                  <button className="px-8 py-3 border border-primary/40 text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all">
                    Mission Logs
                  </button>
                </Link>
              </div>
            </div>

            {/* Terminal Preview Right */}
            <div className="hidden lg:block w-1/3">
              <div className="cyber-glass p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <span className="text-[10px] font-code text-primary/40 uppercase tracking-widest">System_Intel.v2</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-danger/40" />
                    <div className="w-2 h-2 rounded-full bg-accent-gold/40" />
                    <div className="w-2 h-2 rounded-full bg-accent-primary/40" />
                  </div>
                </div>
                <div className="space-y-2 text-[11px] font-code text-primary/70">
                  <p className="text-accent">> LOCATING_OPERATIVE...</p>
                  <p className="pl-4">IDENTITY: ROHIT ROY</p>
                  <p className="pl-4">LOCATION: WEST_BENGAL_INDIA</p>
                  <p className="pl-4">RANK: TECHNICAL_ENGINEER_L1</p>
                  <p className="text-accent">> SCANNING_CAPABILITIES...</p>
                  <p className="pl-4">OT/ICS: 94% [STABLE]</p>
                  <p className="pl-4">SOC_OPS: 89% [ACTIVE]</p>
                  <p className="pl-4">QUANTUM: 72% [INITIATING]</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed right-12 bottom-12 hidden lg:block z-20">
             <div className="text-[10px] font-code text-primary/30 uppercase rotate-90 origin-right translate-y-[-100%] tracking-[0.4em]">
               [ CTRL + ` SYSTEM_CONSOLE ]
             </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .glitch-text {
          animation: CharacterScramble 0.3s steps(2) infinite;
        }
        @keyframes CharacterScramble {
          0% { transform: translate(0); }
          25% { transform: translate(-1px, 0.5px); filter: hue-rotate(45deg); }
          50% { transform: translate(1px, -0.5px); filter: hue-rotate(90deg); }
          75% { transform: translate(-0.5px, -1px); filter: hue-rotate(135deg); }
          100% { transform: translate(0); }
        }
      `}</style>
    </main>
  );
}

function StatusCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="cyber-glass p-4 group hover:border-primary transition-all border-l-2 border-l-primary/40 relative">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-3 h-3 text-primary" />
        <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-xs font-headline tracking-widest text-primary group-hover:text-glow transition-all">{value}</div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/20" />
    </div>
  );
}
