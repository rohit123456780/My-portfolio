
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/lib/store';
import { Shield, Activity, Zap, Lock, ChevronRight, Cpu, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

const Hero3D = dynamic(() => import('@/components/cyber/Hero3D'), { ssr: false });
const BootSequence = dynamic(() => import('@/components/cyber/BootSequence'), { ssr: false });

export default function Home() {
  const { isBooted } = useUIStore();
  const [typedText, setTypedText] = useState('');
  const fullText = "OT SECURITY ENGINEER";

  useEffect(() => {
    if (isBooted) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(timer);
      }, 60);
      return () => clearInterval(timer);
    }
  }, [isBooted]);

  return (
    <main className="relative min-h-screen bg-[#020408] overflow-hidden">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      {isBooted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen flex items-center justify-center p-8"
        >
          <Hero3D />

          <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-[10px] font-code text-accent tracking-[0.4em] uppercase"
                >
                  <Lock className="w-3 h-3" /> SECURE_ACCESS_ESTABLISHED
                </motion.div>
                
                <h1 className="text-7xl md:text-9xl font-headline tracking-tighter text-primary leading-none text-glow uppercase">
                  ROHIT<br/>ROY
                </h1>
                
                <div className="text-sm font-code text-primary/80 border-l-2 border-primary/40 pl-6 h-12 flex items-center">
                  <p>
                    {typedText}
                    <span className="w-2 h-5 bg-primary inline-block ml-1 animate-pulse" />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatusCard icon={Activity} label="MISSION_STATUS" value="ACTIVE_NODE" />
                <StatusCard icon={Shield} label="PRIMARY_DOMAIN" value="OT_SECURITY" />
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href="/identity">
                  <button className="px-10 py-4 bg-primary text-primary-foreground font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-3 group shadow-[0_0_25px_hsla(var(--primary),0.3)]">
                    IDENTITY CORE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/resume">
                  <button className="px-10 py-4 border border-primary/40 text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all flex items-center gap-3 group">
                    <FileText className="w-4 h-4" /> RESUME SECTOR
                  </button>
                </Link>
              </div>

              <div className="flex gap-4 pt-4 relative">
                <QuickLink href="/projects" icon={Cpu} label="PROJECTS" />
                <QuickLink href="/internships" icon={Globe} label="INTERNSHIPS" />
                <QuickLink href="/certifications" icon={Shield} label="CERTS" />
              </div>
            </div>

            <div className="hidden lg:block w-1/3">
              <div className="bg-black/80 backdrop-blur-xl border border-primary/20 p-8 space-y-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="text-[10px] font-code text-primary/40 uppercase tracking-widest">TACTICAL_INTEL_v3</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                  </div>
                </div>
                <div className="space-y-4 text-[11px] font-code text-primary/70">
                  <div className="space-y-1">
                    <p className="text-accent">> DECRYPTING_BIOMETRICS...</p>
                    <p className="pl-4">SUBJECT: ROHIT ROY</p>
                    <p className="pl-4">ROLE: OT SECURITY ENGINEER</p>
                    <p className="pl-4">NODES: 111+ VERIFIED</p>
                    <p className="pl-4">LOC: WB_INDIA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <div className="bg-black/60 border border-primary/10 p-5 group hover:border-primary transition-all border-l-4 border-l-primary/40 relative">
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
      <div className="w-10 h-10 border border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
        <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary" />
      </div>
      <span className="text-[8px] font-code text-primary/40 uppercase tracking-tighter">{label}</span>
    </Link>
  );
}
