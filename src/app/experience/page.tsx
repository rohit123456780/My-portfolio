"use client";

import React from 'react';
import MissionLogs from '@/components/cyber/MissionLogs';
import { useUIStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencePage() {
  const { mode } = useUIStore();

  if (mode === 'defensive') {
    return <MissionLogs />;
  }

  // Offensive View - More raw/terminal style
  return (
    <main className="min-h-screen bg-[#020000] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" /> EXIT_TO_MAIN
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-headline text-glow uppercase italic animate-glitch">Breach Logs</h1>
          <p className="text-[10px] font-code text-primary/60 uppercase tracking-[0.4em]">Infiltrated operational history nodes.</p>
        </div>

        <div className="space-y-6 pb-20">
          {[
            { title: "OT_SEC_ADMIN", org: "Radian Generation", date: "OCT 2025 - PRES" },
            { title: "IT_ADMIN", org: "Tech Trek", date: "MAY 2025 - JUL 2025" },
            { title: "TECH_SUPPORT", org: "HackingFlix", date: "JUN 2023 - MAY 2025" }
          ].map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-red-950/20 border-2 border-primary/20 p-8 group hover:border-primary transition-all relative"
            >
              <div className="absolute top-2 right-2 text-[8px] font-code text-primary/20">TARGET_EXTRACTED</div>
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-3xl font-headline uppercase text-primary mb-1">{exp.title}</h3>
                   <p className="text-xs font-code text-primary/60">{exp.org} // {exp.date}</p>
                 </div>
                 <Activity className="w-6 h-6 text-primary/40 group-hover:animate-ping" />
              </div>
              <p className="text-sm font-code text-primary/40 italic">Decrypting full node data requires owner clearance.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}