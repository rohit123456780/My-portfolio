
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Terminal, Activity, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    title: "OT Engineering Administrator L1",
    org: "Radian Generation",
    period: "Oct 2025 – Present",
    type: "Hybrid",
    focus: "OT/ICS cybersecurity posture, security documentation & SOPs, change & risk governance, data governance migration, compliance alignment.",
    icon: Shield
  },
  {
    title: "IT Administrator",
    org: "Tech Trek Events",
    period: "May 2025 – Jul 2025",
    type: "Remote",
    focus: "Outlook email administration, cPanel domain email integration, email security rules, marketing email accounts, network governance rules.",
    icon: Server
  },
  {
    title: "Technical Support Administrator",
    org: "HackingFlix",
    period: "Jun 2023 – May 2025",
    type: "Remote",
    focus: "End-to-end technical support, documentation, access permissions, security monitoring exposure, segregation of duties awareness.",
    icon: Terminal
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Chronological deployment history & system maintenance records.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/20 group-hover:bg-primary/60 transition-colors" />
              <div className="cyber-glass p-8 border-l-4 border-l-primary hover:border-l-accent transition-all relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 group-hover:text-accent">
                      <exp.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline group-hover:text-glow uppercase">{exp.title}</h3>
                      <p className="text-xs font-code text-primary/60 uppercase">{exp.org} | {exp.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-code text-accent uppercase tracking-widest">{exp.period}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Activity className="w-3 h-3 text-accent animate-pulse" />
                      <span className="text-[8px] font-code text-accent/40 uppercase tracking-widest">Active Node</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
                  {exp.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
