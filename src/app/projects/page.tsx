"use client";

import React from 'react';
import MissionSelect from '@/components/cyber/MissionSelect';
import { useUIStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { mode } = useUIStore();

  if (mode === 'defensive') {
    return <MissionSelect />;
  }

  // Offensive View - Matrix style
  return (
    <main className="min-h-screen bg-[#020000] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" /> RETURN_TO_SHADOWS
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-headline text-glow uppercase italic animate-glitch">Exploit Matrix</h1>
          <p className="text-[10px] font-code text-primary/60 uppercase tracking-[0.4em]">14+ Attack vectors identified and executed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {[1,2,3,4,5,6].map((p) => (
            <motion.div 
              key={p}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-black border-2 border-primary/20 p-6 relative overflow-hidden group hover:border-primary/60"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary transition-colors" />
              <div className="flex items-center gap-4 mb-4">
                <Cpu className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-headline uppercase text-primary">Mission_Vector_0{p}</h3>
              </div>
              <p className="text-xs font-code text-primary/40 leading-relaxed mb-6">
                ENCRYPTED_DATA: Technical narrative for mission node 0{p} is restricted. Unauthorized access will trigger failsafe protocols.
              </p>
              <div className="flex justify-between items-center border-t border-primary/10 pt-4">
                 <span className="text-[8px] font-code text-primary/20">TARGET_STATUS: COMPROMISED</span>
                 <Lock className="w-4 h-4 text-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}