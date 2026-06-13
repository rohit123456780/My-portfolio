
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, Lock, ChevronRight, Cpu, Globe, FileText, Briefcase, Zap, Crosshair } from 'lucide-react';
import Link from 'next/link';
import AttackGlobeWidget from '@/components/cyber/AttackGlobeWidget';

const BootSequence = dynamic(() => import('@/components/cyber/BootSequence'), { ssr: false });

export default function Home() {
  const { isBooted, mode } = useUIStore();
  const [typedText, setTypedText] = useState('');
  
  const content = {
    defensive: {
      headline: "DEFENDING INFRASTRUCTURE",
      subheading: "SECURE_LINK_STABLE // SYSTEM_MONITORING_ACTIVE",
      status: "RESILIENT_NODE",
      domain: "CYBER_DEFENSE",
      button: "IDENTITY CORE",
      cta: "Protecting systems from evolving threats with proactive OT security protocols."
    },
    offensive: {
      headline: "EXPOSING VULNERABILITIES",
      subheading: "TARGET_ACQUIRED // PENETRATION_INITIATED",
      status: "INFILTRATOR_NODE",
      domain: "OFFENSIVE_OPS",
      button: "STRIKE CORE",
      cta: "Identifying critical weak points through advanced infiltration and tactical analysis."
    }
  }[mode];

  useEffect(() => {
    if (isBooted) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(content.subheading.slice(0, i));
        i++;
        if (i > content.subheading.length) clearInterval(timer);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [isBooted, content.subheading]);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden cyber-grid">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      {isBooted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen p-6 md:p-12"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 min-h-[85vh]">
            <div className="w-full lg:w-2/3 space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-[10px] font-code text-accent tracking-[0.4em] uppercase"
                >
                  {mode === 'defensive' ? <Shield className="w-3 h-3" /> : <Crosshair className="w-3 h-3" />}
                  {mode === 'defensive' ? 'SECURE_ACCESS_ESTABLISHED' : 'BREACH_SUCCESSFUL_ACCESS_GRANTED'}
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-headline tracking-tighter text-primary leading-none text-glow uppercase">
                  ROHIT<br/>ROY
                </h1>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-headline text-primary/80 tracking-widest">{content.headline}</h2>
                  <div className="text-sm font-code text-primary/60 border-l-2 border-primary/40 pl-6 h-8 flex items-center">
                    <p>
                      {typedText}
                      <span className="w-2 h-5 bg-primary inline-block ml-1 animate-pulse" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatusCard icon={Activity} label="MISSION_STATUS" value={content.status} />
                <StatusCard icon={mode === 'defensive' ? Shield : Crosshair} label="PRIMARY_DOMAIN" value={content.domain} />
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href="/identity">
                  <button className="px-10 py-4 bg-primary text-primary-foreground font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-3 group shadow-[0_0_25px_hsla(var(--primary),0.3)]">
                    {content.button} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/resume">
                  <button className="px-10 py-4 border border-primary/40 text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all flex items-center gap-3 group">
                    <FileText className="w-4 h-4" /> RESUME SECTOR
                  </button>
                </Link>
              </div>

              <div className="flex gap-4 pt-4 relative">
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

          <footer className="max-w-7xl mx-auto w-full py-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-code text-primary/30 uppercase tracking-[0.2em]">
              © 2024 ROHIT ROY // {mode.toUpperCase()}_PROTOCOL // MISSION_SUCCESS
            </div>
            <div className="flex gap-6">
              <span className="text-[10px] font-code text-primary/20 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3" /> Integrity_Verified
              </span>
              <span className="text-[10px] font-code text-primary/20 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" /> Latency: 12ms
              </span>
            </div>
          </footer>
        </motion.div>
      )}

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 15px hsla(var(--primary), 0.4);
        }
      `}</style>
    </main>
  );
}

function StatusCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-black/60 border border-primary/10 p-5 group hover:border-primary transition-all border-l-4 border-l-primary/40 relative" style={{ borderRadius: 'var(--radius)' }}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-[9px] font-code text-primary/40 uppercase tracking-widest font-bold">{label}</span>
      </div>
      <div className="text-sm font-headline tracking-widest text-primary group-hover:text-accent transition-all uppercase">{value}</div>
    </div>
  );
}

function QuickLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 group">
      <div className="w-10 h-10 border border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all" style={{ borderRadius: 'var(--radius)' }}>
        <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary" />
      </div>
      <span className="text-[8px] font-code text-primary/40 uppercase tracking-tighter">{label}</span>
    </Link>
  );
}
