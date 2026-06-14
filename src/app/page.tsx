
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, ChevronRight, Cpu, Globe, FileText, Briefcase, Crosshair, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';
import AttackGlobeWidget from '@/components/cyber/AttackGlobeWidget';
import Hero3D from '@/components/cyber/Hero3D';

const BootSequence = dynamic(() => import('@/components/cyber/BootSequence'), { ssr: false });

export default function Home() {
  const { isBooted, mode, setTerminalOpen, terminalOpen } = useUIStore();
  const [typedText, setTypedText] = useState('');
  
  const config = {
    defensive: {
      tag: "SECURE_ACCESS_ESTABLISHED",
      headline: "DEFENDING INFRASTRUCTURE",
      subheading: "SECURE_LINK_STABLE // SYSTEM_MONITORING_ACTIVE // GUARDIAN_PROTOCOL_ONLINE",
      status: "RESILIENT_NODE",
      domain: "CYBER_DEFENSE",
      button: "IDENTITY CORE",
      icon: Shield,
    },
    offensive: {
      tag: "BREACH_SUCCESSFUL_ACCESS_GRANTED",
      headline: "EXPOSING VULNERABILITIES",
      subheading: "TARGET_ACQUIRED // PENETRATION_INITIATED // ZERO_DAY_EXPLOIT_DEPLOYED",
      status: "INFILTRATOR_NODE",
      domain: "OFFENSIVE_OPS",
      button: "STRIKE CORE",
      icon: Crosshair,
    }
  }[mode];

  useEffect(() => {
    if (isBooted) {
      let i = 0;
      const text = config.subheading;
      const speed = mode === 'offensive' ? 20 : 40;
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
            transition={{ duration: 2 }}
            className="relative z-10 min-h-screen p-6 md:p-12 flex flex-col"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 flex-1">
              <div className="w-full lg:w-2/3 space-y-12">
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/20 bg-primary/5 text-[9px] font-code text-primary tracking-[0.5em] uppercase"
                  >
                    <ModeIcon className="w-3.5 h-3.5 animate-pulse" />
                    {config.tag}
                  </motion.div>
                  
                  <div className="relative">
                    <h1 className={`text-7xl md:text-[10rem] font-headline tracking-tighter text-primary leading-[0.8] text-glow uppercase ${mode === 'offensive' ? 'italic' : ''}`}>
                      ROHIT<br/>ROY
                    </h1>
                    <div className="absolute -top-4 -right-4 md:-right-12 text-[10px] font-code text-primary/20 vertical-text hidden md:block">
                      {Array(10).fill('SYSTEM_DIAGNOSTICS_OK ').join(' ')}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-5xl font-headline text-primary/90 tracking-[0.2em] flex items-center gap-6">
                      {mode === 'offensive' && <span className="text-red-500 animate-pulse">>>></span>}
                      {config.headline}
                    </h2>
                    <div className="text-base font-code text-primary/60 border-l-4 border-primary/40 pl-8 h-12 flex items-center bg-primary/5 italic">
                      <p>
                        {typedText}
                        <motion.span 
                          animate={{ opacity: [0, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="w-2.5 h-6 bg-primary inline-block ml-2 shadow-[0_0_10px_hsla(var(--primary),1)]" 
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatusCard icon={Activity} label="MISSION_STATUS" value={config.status} mode={mode} />
                  <StatusCard icon={ModeIcon} label="PRIMARY_DOMAIN" value={config.domain} mode={mode} />
                </div>

                <div className="flex flex-wrap gap-4 md:gap-8">
                  <Link href="/identity">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 md:px-12 py-5 bg-primary text-primary-foreground font-headline uppercase tracking-[0.3em] hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-4 group shadow-[0_0_40px_hsla(var(--primary),0.4)] text-xs md:text-base"
                    >
                      {config.button} <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </Link>

                  <motion.button 
                    onClick={() => setTerminalOpen(!terminalOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 md:px-12 py-5 border-2 border-accent/40 text-accent font-headline uppercase tracking-[0.3em] hover:bg-accent/10 transition-all flex items-center gap-4 group text-xs md:text-base"
                  >
                    <Terminal className="w-5 h-5" /> TERMINAL CONSOLE
                  </motion.button>

                  <Link href="/resume">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 md:px-12 py-5 border-2 border-primary/40 text-primary font-headline uppercase tracking-[0.3em] hover:bg-primary/10 transition-all flex items-center gap-4 group text-xs md:text-base"
                    >
                      <FileText className="w-5 h-5" /> RESUME SECTOR
                    </motion.button>
                  </Link>
                </div>

                <div className="flex gap-6 pt-8 relative overflow-x-auto pb-4 no-scrollbar">
                  <QuickLink href="/experience" icon={Briefcase} label="EXPERIENCE" />
                  <QuickLink href="/projects" icon={Cpu} label="PROJECTS" />
                  <QuickLink href="/internships" icon={Globe} label="INTERNSHIPS" />
                  <QuickLink href="/certifications" icon={Shield} label="CERTS" />
                </div>
              </div>

              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                <AttackGlobeWidget />
              </div>
            </div>

            <footer className="max-w-7xl mx-auto w-full py-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8 mt-auto">
              <div className="text-[11px] font-code text-primary/40 uppercase tracking-[0.3em]">
                © 2024 ROHIT ROY // {mode.toUpperCase()}_PROTOCOL // SECURITY_INTEGRITY_VERIFIED
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-code text-primary/20 uppercase tracking-widest">Latency</span>
                  <span className="text-[10px] font-code text-accent tracking-widest">12MS</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-code text-primary/20 uppercase tracking-widest">Encryption</span>
                  <span className="text-[10px] font-code text-primary tracking-widest">AES-256</span>
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

function StatusCard({ icon: Icon, label, value, mode }: { icon: any, label: string, value: string, mode: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, borderColor: 'hsla(var(--primary), 0.6)' }}
      className={`cyber-glass p-6 group transition-all relative ${mode === 'offensive' ? 'border-red-600' : 'border-primary/20'}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-2 rounded-sm ${mode === 'offensive' ? 'bg-red-500/10' : 'bg-primary/10'}`}>
          <Icon className={`w-4 h-4 ${mode === 'offensive' ? 'text-red-500' : 'text-primary'}`} />
        </div>
        <span className="text-[10px] font-code text-primary/40 uppercase tracking-[0.3em] font-bold">{label}</span>
      </div>
      <div className="text-xl font-headline tracking-[0.2em] text-primary group-hover:text-glow transition-all uppercase">{value}</div>
      <div className="absolute bottom-2 right-2 opacity-5">
        <Icon className="w-12 h-12" />
      </div>
    </motion.div>
  );
}

function QuickLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.1, y: -5 }}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 border-2 border-primary/20 bg-black/60 backdrop-blur-md flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ borderRadius: 'var(--radius)' }}>
          <Icon className="w-7 h-7 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
        <span className="text-[9px] font-code text-primary/40 uppercase tracking-widest group-hover:text-primary transition-colors">{label}</span>
      </motion.div>
    </Link>
  );
}
