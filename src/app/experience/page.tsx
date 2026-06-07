
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Terminal, Activity, ArrowLeft, ChevronRight, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

const EXPERIENCES = [
  {
    title: "OT Engineering Administrator L1",
    org: "Radian Generation",
    period: "Oct 2025 – Present",
    type: "Hybrid",
    focus: "Management of OT/ICS cybersecurity posture across critical infrastructure. Developing security documentation, Standard Operating Procedures (SOPs), and managing change & risk governance. Facilitating data governance migrations and ensuring continuous compliance alignment with international security standards.",
    icon: Shield,
    location: "West Bengal, India"
  },
  {
    title: "IT Administrator",
    org: "Tech Trek Events",
    period: "May 2025 – Jul 2025",
    type: "Remote",
    focus: "End-to-end Outlook email administration and cPanel domain integration. Managed incoming/outgoing mail server security rules, supervised marketing email infrastructure, and enforced strict network governance policies to maintain system integrity during high-traffic events.",
    icon: Server,
    location: "Remote Operations"
  },
  {
    title: "Technical Support Administrator",
    org: "HackingFlix",
    period: "Jun 2023 – May 2025",
    type: "Remote",
    focus: "Provided end-to-end technical support and system documentation. Managed complex access permissions, monitored security exposure nodes, and promoted segregation of duties (SoD) awareness. Collaborated cross-functionally to resolve critical technical incidents.",
    icon: Terminal,
    location: "Remote Operations"
  }
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Mission Logs</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Chronological deployment history & primary operational roles.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-12 pb-20">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/10 group-hover:bg-accent/40 transition-colors" />
              <div className="cyber-glass p-10 border-l-4 border-l-primary hover:border-l-accent transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <exp.icon className="w-32 h-32" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                      <exp.icon className="w-8 h-8 text-primary group-hover:text-accent" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-headline group-hover:text-glow uppercase tracking-tight">{exp.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="text-[10px] font-code text-accent uppercase tracking-widest">{exp.org}</span>
                        <span className="text-[10px] font-code text-primary/40 uppercase">[{exp.type}]</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:text-right shrink-0">
                    <p className="text-sm font-code text-accent uppercase tracking-widest">{exp.period}</p>
                    <p className="text-[9px] font-code text-primary/30 uppercase mt-1">{exp.location}</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                   <div className="flex items-center gap-2 text-[10px] font-code text-primary/40 uppercase tracking-[0.2em] border-b border-primary/10 pb-2">
                     <Lock className="w-3 h-3" /> Focus Parameters
                   </div>
                   <p className="text-sm font-code text-primary/70 leading-relaxed">
                    {exp.focus}
                   </p>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-[10px] font-code text-accent uppercase tracking-widest">Active Node Verified</span>
                  </div>
                  <div className="flex gap-2">
                     <Zap className="w-4 h-4 text-primary/20" />
                     <Terminal className="w-4 h-4 text-primary/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
