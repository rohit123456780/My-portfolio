
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Briefcase, Shield, ArrowLeft, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

const INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern", period: "Aug 2025 – Oct 2025", domain: "VAPT", level: "Advanced" },
  { org: "Razz Security IT Services", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "General", level: "Intermediate" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "VAPT", level: "Advanced" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "May 2024", domain: "VAPT", level: "Advanced" },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "May 2024 – Jul 2024", domain: "AI", level: "Advanced" },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jun 2024 – Aug 2024", domain: "VAPT", level: "Advanced" }
];

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Growth Sector</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">27+ Cybersecurity Deployments & Industrial Internships.</p>
          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {INTERNSHIPS.map((intern, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-6 border border-primary/10 hover:border-accent transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 border border-primary/20 group-hover:text-accent transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-headline uppercase group-hover:text-glow">{intern.org}</h3>
                  <div className="flex flex-wrap gap-4 text-[10px] font-code text-primary/40 uppercase">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {intern.domain} Node</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {intern.period}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 border border-primary/30 text-[10px] font-code text-primary uppercase bg-primary/5">{intern.role}</span>
                <div className={`w-2 h-2 rounded-full animate-pulse ${intern.level === 'Advanced' ? 'bg-accent' : 'bg-primary/40'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
