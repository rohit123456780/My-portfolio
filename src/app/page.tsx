'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, ChevronRight, Cpu, Globe, Briefcase, Crosshair, Terminal, Zap, ShieldAlert, ZapOff, Server, Lock, Database } from 'lucide-react';
import Link from 'next/link';
import AttackGlobeWidget from '@/components/cyber/AttackGlobeWidget';
import Hero3D from '@/components/cyber/Hero3D';

const BootSequence = dynamic(() => import('@/components/cyber/BootSequence'), { ssr: false });

export default function Home() {
  const { isBooted, mode, setTerminalOpen, terminalOpen } = useUIStore();
  const [typedText, setTypedText] = useState('');
  
  const config = {
    defensive: {
      tag: "INFRASTRUCTURE_STABLE",
      headline: "ENGINEERING RESILIENCE",
      subheading: "NETWORK_OPS_ACTIVE // SYSTEM_INTEGRITY_VERIFIED // GUARDIAN_LINK_ESTABLISHED",
      status: "STATIONARY_NODE",
      domain: "SYS_ADMIN_L1",
      button: "IDENTITY_CORE",
      icon: Shield,
      desc: "Architecting secure pathways and maintaining high-availability systems for the modern enterprise."
    },
    offensive: {
      tag: "INFILTRATION_PROTOCOL_V2",
      headline: "BREACHING PERIMETERS",
      subheading: "TARGET_LOCKED // EXPLOIT_PAYLOAD_READY // BYPASSING_FIREWALL...",
      status: "GHOST_OPERATIVE",
      domain: "OFFENSIVE_OPS",
      button: "EXECUTE_STRIKE",
      icon: Crosshair,
      desc: "Identifying structural weaknesses and exploiting digital fractures to strengthen future defense."
    }
  }[mode];

  useEffect(() => {
    if (isBooted) {
      let i = 0;
      const text = config.subheading;
      const speed = mode === 'offensive' ? 15 : 40;
      const timer = setInterval(() => {
        setTypedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(timer);
      }, speed);
      return () => clearInterval(timer);
    }
  }, [isBooted, config.subheading, mode]);

  const ModeIcon = config.icon;

  return (
    <main className="relative min-h-screen bg-background overflow-hidden cyber-grid font-body">
      <div className="noise-overlay" />
      
      <AnimatePresence>
        {!isBooted && <BootSequence key="boot" />}
      </AnimatePresence>

      {isBooted && (
        <>
          <Hero3D />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 min-h-screen p-4 md:p-12 flex flex-col"
          >
            {/* Background Parallax HUD Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden hidden lg:block">
               <div className="absolute top-1/4 left-10 text-[80px] font-headline select-none vertical-text tracking-tighter text-primary">
                 {mode === 'defensive' ? 'SYSTEM_STABLE' : 'BREACH_ACTIVE'}
               </div>
               <div className="absolute bottom-1/4 right-10 text-[80px] font-headline select-none vertical-text tracking-tighter text-primary rotate-180">
                 {mode === 'defensive' ? 'GUARD_LINK' : 'X_EXPLOIT'}
               </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-16 md:pt-24 flex-1 w-full">
              <div className="w-full lg:w-2/3 space-y-8 md:space-y-12">
                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`inline-flex items-center gap-3 px-4 py-1.5 border border-primary/20 bg-primary/5 text-[10px] font-code text-primary tracking-[0.5em] uppercase ${mode === 'offensive' ? 'animate-pulse bg-red-500/10' : ''}`}
                  >
                    <ModeIcon className={`w-4 h-4 ${mode === 'offensive' ? 'animate-bounce' : 'animate-pulse'}`} />
                    {config.tag}
                  </motion.div>
                  
                  <div className="relative group">
                    <h1 className={`text-6xl sm:text-7xl md:text-[11rem] font-headline tracking-tighter text-primary leading-[0.85] md:leading-[0.8] text-glow uppercase transition-all duration-700 ${mode === 'offensive' ? 'italic scale-100 md:scale-105' : 'group-hover:tracking-widest'}`}>
                      ROHIT<br/>ROY
                    </h1>
                    {mode === 'offensive' && (
                      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden text-[8px] font-code text-red-500 hidden md:flex flex-wrap gap-2">
                        {Array(100).fill('ERROR_404_DATA_CORRUPT ').map((t, i) => <span key={i}>{t}</span>)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <h2 className="text-xl sm:text-2xl md:text-5xl font-headline text-primary/90 tracking-[0.2em] flex items-center gap-4 md:gap-6">
                      {mode === 'offensive' ? (
                        <span className="text-red-500 flex gap-2">
                          <ZapOff className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                          <span className="animate-glitch">{config.headline}</span>
                        </span>
                      ) : (
                        <span className="text-cyan-400 flex gap-2">
                          <Server className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                          {config.headline}
                        </span>
                      )}
                    </h2>
                    
                    <div className={`text-xs md:text-base font-code text-primary/60 border-l-4 border-primary/40 pl-4 md:pl-8 h-auto md:h-12 flex items-center bg-primary/5 italic py-2 md:py-0 ${mode === 'offensive' ? 'bg-red-500/5' : ''}`}>
                      <p>
                        {typedText}
                        <motion.span 
                          animate={{ opacity: [0, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="w-2 md:w-2.5 h-4 md:h-6 bg-primary inline-block ml-2 shadow-[0_0_10px_hsla(var(--primary),1)]" 
                        />
                      </p>
                    </div>
                    
                    <p className="text-[10px] md:text-sm font-code text-primary/40 max-w-xl leading-relaxed">
                      {config.desc}
                    </p>
                  </div>
                </div>

                {/* Tactical Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <StatusCard icon={Activity} label="MISSION_STATUS" value={config.status} mode={mode} />
                  <StatusCard icon={mode === 'defensive' ? Shield : ShieldAlert} label="SECURITY_NODE" value={config.domain} mode={mode} />
                  <StatusCard icon={mode === 'defensive' ? Database : Lock} label="DATA_INTEGRITY" value="OPTIMAL" mode={mode} />
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8">
                  <Link href="/identity" className="w-full sm:w-auto">
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-8 md:px-12 py-4 md:py-5 bg-primary text-primary-foreground font-headline uppercase tracking-[0.3em] hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-4 group shadow-[0_0_40px_hsla(var(--primary),0.4)] text-xs md:text-base ${mode === 'offensive' ? 'skew-x-[-10deg]' : ''}`}
                    >
                      {config.button} <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </Link>

                  <motion.button 
                    onClick={() => setTerminalOpen(!terminalOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 border-2 border-accent/40 text-accent font-headline uppercase tracking-[0.3em] hover:bg-accent/10 transition-all flex items-center justify-center gap-4 group text-xs md:text-base ${mode === 'offensive' ? 'border-red-500/40 text-red-500' : ''}`}
                  >
                    <Terminal className="w-5 h-5" /> TERMINAL_CONSOLE
                  </motion.button>
                </div>

                {/* Quick Navigation Node Grid */}
                <div className="flex gap-4 md:gap-6 pt-4 md:pt-8 relative overflow-x-auto pb-4 no-scrollbar">
                  <QuickLink href="/experience" icon={Briefcase} label="HISTORY" />
                  <QuickLink href="/projects" icon={Cpu} label="NODES" />
                  <QuickLink href="/internships" icon={Globe} label="DEPLOY" />
                  <QuickLink href="/certifications" icon={Lock} label="KEYS" />
                </div>
              </div>

              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end pb-12 lg:pb-0">
                <div className="relative w-full max-w-[400px] lg:max-w-none">
                  <div className="absolute -inset-4 bg-primary/20 blur-2xl animate-pulse" />
                  <AttackGlobeWidget />
                </div>
              </div>
            </div>

            <footer className="max-w-7xl mx-auto w-full py-8 md:py-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8 mt-auto">
              <div className="text-[9px] md:text-[11px] font-code text-primary/40 uppercase tracking-[0.3em] text-center md:text-left">
                © 2024 ROHIT ROY // {mode.toUpperCase()}_PROTOCOL_v1.5 // SYSTEMS_GO
              </div>
              <div className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-[7px] md:text-[8px] font-code text-primary/20 uppercase tracking-widest">THREAT_LEVEL</span>
                  <span className={`text-[8px] md:text-[10px] font-code tracking-widest ${mode === 'offensive' ? 'text-red-500 animate-pulse' : 'text-accent'}`}>
                    {mode === 'offensive' ? 'CRITICAL' : 'MINIMAL'}
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-[7px] md:text-[8px] font-code text-primary/20 uppercase tracking-widest">Encryption</span>
                  <span className="text-[8px] md:text-[10px] font-code text-primary tracking-widest">RSA-4096</span>
                </div>
              </div>
            </footer>
          </motion.div>
        </>
      )}

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .animate-glitch {
          animation: glitch-text 0.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-text {
          0% { text-shadow: 2px 0 red, -2px 0 cyan; }
          50% { text-shadow: -2px 0 red, 2px 0 cyan; }
          100% { text-shadow: 1px 0 red, -1px 0 cyan; }
        }
      `}</style>
    </main>
  );
}

function StatusCard({ icon: Icon, label, value, mode }: { icon: any, label: string, value: string, mode: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`cyber-glass p-4 md:p-6 group transition-all relative overflow-hidden ${mode === 'offensive' ? 'border-red-600' : 'border-primary/20'}`}
    >
      <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
        <div className={`p-1.5 md:p-2 ${mode === 'offensive' ? 'bg-red-500/10' : 'bg-primary/10'}`}>
          <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${mode === 'offensive' ? 'text-red-500' : 'text-primary'}`} />
        </div>
        <span className="text-[8px] md:text-[10px] font-code text-primary/40 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">{label}</span>
      </div>
      <div className="text-sm sm:text-lg md:text-xl font-headline tracking-[0.1em] md:tracking-[0.2em] text-primary group-hover:text-glow transition-all uppercase truncate">{value}</div>
      <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity hidden md:block">
        <Icon className="w-16 h-16 md:w-24 md:h-24" />
      </div>
    </motion.div>
  );
}

function QuickLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  const { mode } = useUIStore();
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.1, y: -5 }}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className={`w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] ${mode === 'offensive' ? 'border-red-500/20 bg-red-500/5 group-hover:border-red-500' : 'border-primary/20 bg-black/60 group-hover:border-primary group-hover:bg-primary/20'}`} style={{ borderRadius: 'var(--radius)' }}>
          <Icon className={`w-5 h-5 md:w-7 md:h-7 transition-colors ${mode === 'offensive' ? 'text-red-500/60 group-hover:text-red-500' : 'text-primary/60 group-hover:text-primary'}`} />
        </div>
        <span className="text-[7px] md:text-[9px] font-code text-primary/40 uppercase tracking-widest group-hover:text-primary transition-colors">{label}</span>
      </motion.div>
    </Link>
  );
}
