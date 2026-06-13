
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Cpu, Globe, Trophy, User, Terminal, Lock, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/lib/store';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const navItems = [
  { label: 'IDENTITY', path: '/identity', id: '01', icon: User },
  { label: 'EXPERIENCE', path: '/experience', id: '02', icon: Shield },
  { label: 'PROJECTS', path: '/projects', id: '03', icon: Cpu },
  { label: 'AWARDS', path: '/awards', id: '04', icon: Trophy },
  { label: 'INTERNSHIPS', path: '/internships', id: '05', icon: Globe },
  { label: 'CERTS', path: '/certifications', id: '06', icon: Shield },
  { label: 'RESUME', path: '/resume', id: '07', icon: FileText },
];

const alerts = [
  "INTRUSION ATTEMPT BLOCKED - IP: 192.168.1.44",
  "CVE-2024-4421 PATCHED IN MAIN NODE",
  "OT_SECURITY_PROTOCOL_v3.0 ACTIVE",
  "THREAT_LEVEL: MINIMAL",
  "DDoS MITIGATION ACTIVE",
  "SECURE_ENCRYPTION_LINK_STABLE",
];

export default function HackerHUD() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isVaultUnlocked } = useUIStore();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentAlert(prev => (prev + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background/95 border-b border-primary/20 backdrop-blur-xl h-8 flex items-center justify-between overflow-hidden font-code text-[9px]">
        <div className="flex items-center h-full">
          <div className="bg-primary text-primary-foreground px-4 h-full flex items-center font-bold tracking-[0.2em] shrink-0 uppercase">
            LIVE_THREAT_FEED
          </div>
          <div className="flex-1 whitespace-nowrap pl-6 flex items-center gap-8 min-w-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAlert}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-3 text-primary/80"
              >
                <Activity className="w-3 h-3 text-accent animate-pulse" />
                <span className="tracking-widest uppercase font-bold">{alerts[currentAlert]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pr-4">
          <ThemeSwitcher />
          
          <AnimatePresence>
            {!isVaultUnlocked && (
              <Link href="/vault" className="px-6 text-primary/60 flex items-center gap-2 tracking-widest border-l border-primary/10 hover:text-primary transition-colors group h-full">
                <Lock className="w-3 h-3 group-hover:animate-pulse" />
                SECURE_VAULT
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="fixed top-8 left-0 right-0 z-[90] p-4 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-primary/40 bg-black/90 flex items-center justify-center relative">
              <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary" />
            </div>
            <div>
              <div className="text-xs font-headline text-glow tracking-[0.3em] uppercase">ROHIT_ROY</div>
              <div className="text-[7px] font-code text-primary/40 tracking-[0.2em] uppercase">OT_SECURITY_ENGINEER</div>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div className={`px-4 py-1.5 border transition-all flex items-center gap-2 group relative overflow-hidden ${
                pathname === item.path 
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsla(var(--primary),0.2)]' 
                  : 'border-white/5 text-primary/40 hover:border-primary/40 hover:text-primary'
              }`}>
                <span className="text-[8px] font-code opacity-40">[{item.id}]</span>
                <span className="text-[9px] font-headline tracking-[0.2em] uppercase">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 8px hsla(var(--primary), 0.5);
        }
      `}</style>
    </>
  );
}
