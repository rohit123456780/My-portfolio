
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import BootSequence from '@/components/cyber/BootSequence';
import HeroScene from '@/components/cyber/HeroScene';
import TerminalPanel from '@/components/cyber/TerminalPanel';
import MissionLogs from '@/components/cyber/MissionLogs';
import CommandPalette from '@/components/cyber/CommandPalette';
import CertificationsVault from '@/components/cyber/CertificationsVault';
import { ChevronDown, Shield, Terminal as TerminalIcon, Award, Cpu, Globe, Mail } from 'lucide-react';

export default function Home() {
  const { isBooted } = useUIStore();

  return (
    <main className="relative min-h-screen">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      <CommandPalette />

      <div className={`transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        {/* HERO SECTION */}
        <section id="hero" className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <HeroScene />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isBooted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="z-10 relative space-y-4"
          >
            <span className="text-accent font-code tracking-[0.3em] uppercase text-xs">Access Level: Administrator</span>
            <h1 className="text-5xl md:text-8xl font-headline leading-tight tracking-tighter text-glow">
              ROHIT ROY
            </h1>
            <p className="max-w-2xl mx-auto text-sm md:text-lg font-code opacity-80 uppercase tracking-wide">
              OT Engineering Administrator L1 | Cybersecurity Practitioner | VAPT & Penetration Testing Specialist
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button 
                onClick={() => document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-primary text-primary-foreground font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all border-glow"
              >
                Start Mission
              </button>
              <button 
                onClick={() => useUIStore.getState().setCommandPaletteOpen(true)}
                className="px-8 py-3 border border-primary/50 text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all backdrop-blur-sm"
              >
                Command Palette
              </button>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* NARRATIVE SECTION */}
        <section id="about" className="py-24 px-6 relative cyber-grid">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Intelligence Brief
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <TerminalPanel />
          </div>
        </section>

        {/* MISSION LOGS SECTION */}
        <section id="missions" className="py-24 px-6 bg-background/50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-4 flex items-center gap-3">
                <TerminalIcon className="w-8 h-8 text-primary" />
                Mission Logs
              </h2>
              <p className="text-xs font-code text-primary/50 uppercase tracking-widest">Operational Work Experience & Deployments</p>
              <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent mt-4" />
            </div>
            <MissionLogs />
          </div>
        </section>

        {/* CERTIFICATIONS VAULT SECTION */}
        <section id="certs" className="py-24 px-6 border-t border-primary/10">
          <div className="max-w-7xl mx-auto">
            <CertificationsVault />
          </div>
        </section>

        {/* STATS HUD */}
        <section className="py-24 px-6 border-y border-primary/10 bg-primary/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <h4 className="text-4xl font-headline text-accent">27+</h4>
              <p className="text-[10px] font-code text-primary/60 uppercase tracking-widest">Internships Executed</p>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-4xl font-headline text-accent">97+</h4>
              <p className="text-[10px] font-code text-primary/60 uppercase tracking-widest">Certs Decrypted</p>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-4xl font-headline text-accent">2023</h4>
              <p className="text-[10px] font-code text-primary/60 uppercase tracking-widest">CTF Engagement Date</p>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-4xl font-headline text-accent">L1</h4>
              <p className="text-[10px] font-code text-primary/60 uppercase tracking-widest">OT Security Rank</p>
            </div>
          </div>
        </section>

        {/* EDUCATION & SKILLS TEASER */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-headline mb-8 flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                Training Academy
              </h2>
              <div className="space-y-6">
                <div className="cyber-glass p-4 border-l-4 border-primary">
                  <h4 className="font-headline text-sm">B.Sc. Networking & Cyber Security</h4>
                  <p className="text-xs font-code opacity-70">Brainware University | Kolkata</p>
                  <p className="text-[10px] text-accent font-code mt-2">YEAR 3 | CURRENT SCORE: 63%</p>
                </div>
                <div className="cyber-glass p-4 border-l-4 border-primary/40">
                  <h4 className="font-headline text-sm">Class XII - Science (CBSE)</h4>
                  <p className="text-xs font-code opacity-70">St. Joseph's Convent</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-headline mb-8 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-primary" />
                System Matrix
              </h2>
              <div className="flex flex-wrap gap-2">
                {["VAPT", "OT/ICS", "SOC", "PYTHON", "KALI LINUX", "WIRESHARK", "METASPLOIT", "NETWORKING", "CLOUD SEC", "GRC"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-code text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-crosshair">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FOOTER */}
        <footer id="contact" className="py-24 px-6 border-t border-primary/20 bg-background relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl font-headline tracking-tighter text-glow">Secure Channel</h2>
            <p className="font-code text-sm opacity-60">ENCRYPTED COMMUNICATION INTERFACE</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-8">
              <a href="mailto:dashingraj447@gmail.com" className="flex items-center gap-3 group">
                <div className="p-4 bg-primary/10 border border-primary/30 group-hover:border-primary transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-code opacity-50 uppercase">Transmission</p>
                  <p className="font-code text-sm">dashingraj447@gmail.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/rohit-roy-rrr" target="_blank" className="flex items-center gap-3 group">
                <div className="p-4 bg-primary/10 border border-primary/30 group-hover:border-primary transition-all">
                  < Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-code opacity-50 uppercase">Network Identity</p>
                  <p className="font-code text-sm">linkedin.com/in/rohit-roy-rrr</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-[8px] font-code opacity-20 uppercase tracking-[0.5em]">
            © 2025 CyberDeck OS v1.0.4 | Rohit Roy
          </div>
        </footer>
      </div>
    </main>
  );
}
