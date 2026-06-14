'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Cpu, Globe, Trophy, User, Terminal, Lock, FileText, ShieldAlert, CpuIcon, Power, Radio, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/lib/store';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const navItems = [
  { label: 'IDENTITY', path: '/identity', id: '01', icon: User },
  { label: 'WORK_EXP', path: '/experience', id: '02', icon: Shield },
  { label: 'MISSIONS', path: '/projects', id: '03', icon: Cpu },
  { label: 'HONOURS', path: '/awards', id: '04', icon: Trophy },
  { label: 'DEPLOY', path: '/internships', id: '05', icon: Globe },
  { label: 'CERTS', path: '/certifications', id: '06', icon: Lock },
  { label: 'CV_GET', path: '/resume', id: '07', icon: FileText },
];

const alerts = [
  "INTRUSION_ATTEMPT_BLOCKED - IP: 192.168.1.44",
  "CVE-2024-4421_PATCHED_SUCCESSFULLY",
  "ENGINEER_NODE_STABLE_v4.2",
  "THREAT_LEVEL: MINIMAL",
  "FIREWALL_LATENCY: 12MS",
  "SECURE_ENCRYPTION_LINK_STABLE",
];

const breaches = [
  "SYSTEM_BREACH_INITIALIZED... ACCESSING_ROOT",
  "VULNERABILITY_XSS_FOUND_IN_TARGET_ALPHA",
  "GHOST_OPERATIVE_LINK_ESTABLISHED",
  "EXTRACTING_ENCRYPTED_PACKETS...",
  "DDoS_ATTACK_MITIGATION_BYPASSING...",
  "IDENTITY_MASK_ACTIVE_STABLE",
];

export default function HackerHUD() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isVaultUnlocked, setTerminalOpen, terminalOpen, mode } = useUIStore();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentAlert(prev => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const activeAlerts = mode === 'offensive' ? breaches : alerts;

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[100] bg-background/95 border-b backdrop-blur-xl h-8 flex items-center justify-between overflow-hidden font-code text-[9px] ${mode === 'offensive' ? 'border-red-600/30' : 'border-primary/20'}`}>
        <div className="flex items-center h-full flex-1 overflow-hidden">
          <div className={`px-4 h-full flex items-center font-bold tracking-[0.2em] shrink-0 uppercase ${mode === 'offensive' ? 'bg-red-600 text-white animate-pulse' : 'bg-primary text-primary-foreground'}`}>
            <span className="hidden sm:inline-flex items-center">
              {mode === 'offensive' ? <ShieldAlert className="w-3 h-3 mr-2" /> : <Power className="w-3 h-3 mr-2" />}
              {mode === 'offensive' ? 'BREACH_FEED' : 'SYS_RELAY'}
            </span>
            <span className="sm:hidden">
              {mode === 'offensive' ? <ShieldAlert className="w-3 h-3" /> : <Power className="w-3 h-3" />}
            </span>
          </div>
          <div className="flex-1 whitespace-nowrap pl-3 sm:pl-6 flex items-center gap-4 sm:gap-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${currentAlert}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex items-center gap-2 sm:gap-3 font-bold truncate ${mode === 'offensive' ? 'text-red-500' : 'text-primary/80'}`}
              >
                <Radio className={`w-3 h-3 shrink-0 ${mode === 'offensive' ? 'animate-ping' : 'animate-pulse'}`} />
                <span className="tracking-widest uppercase truncate text-[8px] sm:text-[9px]">{activeAlerts[currentAlert]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 pr-2 sm:pr-4 h-full shrink-0">
          <button 
            onClick={() => setTerminalOpen(!terminalOpen)}
            className={`flex items-center gap-1 sm:gap-2 transition-colors tracking-widest uppercase border-r h-full pr-2 sm:pr-4 ${mode === 'offensive' ? 'border-red-600/20 text-red-500/60 hover:text-red-500' : 'border-primary/10 text-primary/60 hover:text-primary'}`}
          >
            <Terminal className="w-3 h-3" />
            <span className="hidden sm:inline">CONSOLE</span>
          </button>
          
          <div className="scale-75 sm:scale-100">
            <ThemeSwitcher />
          </div>
          
          <AnimatePresence>
            {!isVaultUnlocked && (
              <Link href="/vault" className={`px-2 sm:px-6 flex items-center gap-2 tracking-widest border-l hover:bg-primary/5 transition-all group h-full ${mode === 'offensive' ? 'border-red-600/20 text-red-500/60 hover:text-red-500' : 'border-primary/10 text-primary/60 hover:text-primary'}`}>
                <Lock className={`w-3 h-3 group-hover:scale-110 transition-transform ${mode === 'offensive' ? 'animate-pulse' : ''}`} />
                <span className="hidden sm:inline">SECURE_VAULT</span>
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="fixed top-8 left-0 right-0 z-[90] p-3 sm:p-4 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4 group bg-black/40 p-1.5 sm:p-2 backdrop-blur-md" style={{ borderRadius: 'var(--radius)' }}>
            <div className={`w-8 h-8 sm:w-10 h-10 border flex items-center justify-center relative ${mode === 'offensive' ? 'border-red-600/40 bg-red-600/10' : 'border-primary/40 bg-black/90'}`}>
              <Zap className={`w-4 h-4 sm:w-5 h-5 transition-transform group-hover:scale-110 ${mode === 'offensive' ? 'text-red-500' : 'text-primary'}`} />
              <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l ${mode === 'offensive' ? 'border-red-600' : 'border-primary'}`} />
              <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r ${mode === 'offensive' ? 'border-red-600' : 'border-primary'}`} />
            </div>
            <div className={mode === 'offensive' ? 'animate-glitch' : ''}>
              <div className="text-xs sm:text-sm font-headline text-glow tracking-[0.2em] sm:tracking-[0.3em] uppercase">ROHIT_ROY</div>
              <div className={`text-[6px] sm:text-[7px] font-code tracking-[0.2em] uppercase ${mode === 'offensive' ? 'text-red-500/60' : 'text-primary/40'}`}>
                {mode === 'offensive' ? 'OPERATIVE_L1' : 'ENGINEER_L1'}
              </div>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div className={`px-4 py-1.5 border transition-all flex items-center gap-2 group relative overflow-hidden ${
                pathname === item.path 
                  ? mode === 'offensive' 
                    ? 'border-red-600 bg-red-600/20 text-red-500 shadow-[0_0_15px_rgba(255,0,0,0.3)] skew-x-[-10deg]'
                    : 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsla(var(--primary),0.2)]'
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
