
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Cpu, Globe, Trophy, User, Terminal, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'IDENTITY', path: '/identity', id: '01', icon: User },
  { label: 'EXPERIENCE', path: '/experience', id: '02', icon: Shield },
  { label: 'PROJECTS', path: '/projects', id: '03', icon: Cpu },
  { label: 'AWARDS', path: '/awards', id: '04', icon: Trophy },
  { label: 'INTERNSHIPS', path: '/internships', id: '05', icon: Globe },
  { label: 'CERTS', path: '/certifications', id: '06', icon: Shield },
];

const alerts = [
  "INTRUSION ATTEMPT BLOCKED - IP: 192.168.1.44",
  "CVE-2024-4421 PATCHED IN MAIN NODE",
  "FIREWALL RULE UPDATED: PORT 8080 RESTRICTED",
  "THREAT_LEVEL: MINIMAL",
  "DDoS MITIGATION ACTIVE",
  "QUANTUM_ENCRYPTION_LINK_STABLE",
];

export default function HackerHUD() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentAlert(prev => (prev + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="fixed top-0 left-0 right-0 z-[100] h-8 bg-background border-b border-primary/20" />;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#020408]/95 border-b border-[#00ff9f]/20 backdrop-blur-xl h-8 flex items-center overflow-hidden font-code text-[9px]">
        <div className="bg-[#00ff9f] text-[#020408] px-4 h-full flex items-center font-bold tracking-[0.2em] shrink-0 uppercase">
          LIVE_THREAT_FEED
        </div>
        <div className="flex-1 whitespace-nowrap pl-6 flex items-center gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAlert}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-3 text-[#00ff9f]/80"
            >
              <Activity className="w-3 h-3 text-[#00cfff] animate-pulse" />
              <span className="tracking-widest uppercase font-bold">{alerts[currentAlert]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <Link href="/vault" className="px-6 text-[#00ff9f]/60 flex items-center gap-2 tracking-widest border-l border-[#00ff9f]/10 hover:text-[#00ff9f] transition-colors">
          <Lock className="w-3 h-3" />
          SECURE_VAULT
        </Link>
      </div>

      <nav className="fixed top-8 left-0 right-0 z-[90] p-4 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-[#00ff9f]/40 bg-black/90 flex items-center justify-center relative">
              <Terminal className="w-5 h-5 text-[#00ff9f] group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#00ff9f]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#00ff9f]" />
            </div>
            <div>
              <div className="text-xs font-headline text-glow tracking-[0.3em] uppercase">ROHIT_ROY</div>
              <div className="text-[7px] font-code text-[#00ff9f]/40 tracking-[0.2em] uppercase">CYBER_OPS_COMMAND</div>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div className={`px-4 py-1.5 border transition-all flex items-center gap-2 group relative overflow-hidden ${
                pathname === item.path 
                  ? 'border-[#00ff9f] bg-[#00ff9f]/10 text-[#00ff9f]' 
                  : 'border-white/5 text-[#00ff9f]/40 hover:border-[#00ff9f]/40 hover:text-[#00ff9f]'
              }`}>
                <span className="text-[8px] font-code opacity-40">[{item.id}]</span>
                <span className="text-[9px] font-headline tracking-[0.2em]">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 8px rgba(0, 255, 159, 0.5);
        }
      `}</style>
    </>
  );
}
