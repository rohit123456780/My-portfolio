
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Linkedin, Phone, MapPin, Shield, Zap } from 'lucide-react';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function IdentityPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid relative overflow-hidden">
      <SpaceshipCursor />
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,hsla(var(--primary),0.1)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-12 font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-widest uppercase">BACK_TO_GALAXY_CORE</span>
        </Link>
        
        <div className="space-y-12">
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-primary/20 pb-12">
            <div className="relative group">
              <div className="w-48 h-48 border-2 border-primary/40 bg-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
                <User className="w-32 h-32 text-primary/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 animate-[scanline_3s_linear_infinite]" />
              </div>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h1 className="text-6xl font-headline tracking-tighter text-glow">ROHIT ROY</h1>
                <p className="text-xl font-code text-primary/80 uppercase tracking-widest">Technical Engineer | OT Engineering Administrator L1</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-code text-primary uppercase">Quantum Technology Specialist</span>
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-[10px] font-code text-accent uppercase">OT/ICS Security</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[10px] font-code text-blue-400 uppercase">SOC Expert</span>
              </div>
            </div>
          </div>

          {/* Intel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Operational Intel</h3>
              <div className="space-y-4">
                <IntelItem icon={MapPin} label="Deployment Hub" value="West Bengal, India" />
                <IntelItem icon={Mail} label="Secure Channel" value="dashingraj447@gmail.com" />
                <IntelItem icon={Phone} label="Comm Link" value="+91-6294067930" />
                <IntelItem icon={Linkedin} label="Professional Matrix" value="linkedin.com/in/rohit-roy-rrr" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Academic Node</h3>
              <div className="cyber-glass p-6 space-y-4 relative group">
                <div className="absolute top-0 right-0 p-2">
                  <Zap className="w-4 h-4 text-accent animate-pulse" />
                </div>
                <div>
                  <h4 className="text-lg font-headline text-glow">B.Sc. Networking & Cyber Security</h4>
                  <p className="text-xs font-code text-primary/60 uppercase">Brainware University | Kolkata</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-code text-primary/40">
                    <span>ACADEMIC PERFORMANCE</span>
                    <span>91%</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "91%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]" 
                    />
                  </div>
                  <p className="text-[10px] font-code text-accent uppercase tracking-widest mt-2">Status: Distinction Node Unlocked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Competency Matrix */}
          <div className="space-y-6">
            <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Core Competency Matrix</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['VAPT', 'SOC', 'ICS SECURITY', 'FORENSICS', 'GRC', 'CLOUD', 'AI', 'QUANTUM'].map((skill) => (
                <div key={skill} className="p-4 border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all text-center">
                  <Shield className="w-5 h-5 text-primary/40 mx-auto mb-2" />
                  <span className="text-[10px] font-code text-primary uppercase">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .cyber-grid {
          background-image: 
            linear-gradient(to right, hsla(var(--primary), 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(var(--primary), 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </main>
  );
}

function IntelItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-2 border border-primary/20 bg-primary/5 group-hover:bg-primary/20 group-hover:border-primary transition-all">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-code text-primary/80">{value}</p>
      </div>
    </div>
  );
}
