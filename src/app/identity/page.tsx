
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Shield, Lock, ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function IdentityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-widest uppercase">BACK_TO_BASE</span>
        </Link>
        
        <div className="space-y-12">
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-primary/20 pb-12">
            <div className="w-48 h-48 border-2 border-primary/40 bg-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
              <User className="w-32 h-32 text-primary/20" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 animate-[scanline_3s_linear_infinite]" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-6xl font-headline tracking-tighter text-glow uppercase">ROHIT ROY</h1>
                <p className="text-lg font-code text-primary/80 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                   <Terminal className="w-4 h-4 text-accent" /> Technical Engineer | OT/ICS Specialist
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 border border-primary/20 text-[10px] font-code text-primary uppercase bg-primary/5">Quantum Technology</span>
                <span className="px-3 py-1 border border-accent/20 text-[10px] font-code text-accent uppercase bg-accent/5">OT/ICS Security</span>
                <span className="px-3 py-1 border border-primary/20 text-[10px] font-code text-primary uppercase bg-primary/5">SOC Analyst</span>
              </div>
            </div>
          </div>

          {/* Academic & Location Intel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="cyber-glass p-8 space-y-6 border border-primary/10 hover:border-accent transition-all group">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Academic Node</h3>
              <div>
                <h4 className="text-xl font-headline text-glow uppercase">B.Sc. Networking & Cyber Security</h4>
                <p className="text-xs font-code text-primary/60 uppercase">Brainware University | Kolkata</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[10px] font-code text-primary/40 uppercase">
                    <span>Performance Matrix</span>
                    <span>91% (Distinction)</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1.5 }} className="h-full bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-glass p-8 space-y-6 border border-primary/10 hover:border-accent transition-all">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Deployment Intel</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 border border-primary/20 bg-primary/5">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">Operation Base</p>
                    <p className="text-sm font-code text-primary/80">West Bengal, India</p>
                  </div>
                </div>
                <Link href="/vault" className="block p-4 border border-primary/20 bg-primary/5 hover:border-accent group transition-all">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-primary group-hover:text-accent" />
                    <div>
                      <p className="text-[10px] font-code text-primary/40 uppercase">Protected Contact Intel</p>
                      <p className="text-xs font-code text-accent uppercase tracking-widest">SOLVE_CTF_FOR_ACCESS</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Skill Matrix */}
          <div className="space-y-8">
            <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Skill Matrix Alignment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['VAPT', 'SOC', 'ICS SECURITY', 'FORENSICS', 'GRC', 'CLOUD', 'AI', 'QUANTUM'].map((skill) => (
                <motion.div 
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 border border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all text-center group"
                >
                  <Shield className="w-6 h-6 text-primary/40 mx-auto mb-3 group-hover:text-primary group-hover:animate-pulse" />
                  <span className="text-[10px] font-code text-primary uppercase tracking-widest">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
