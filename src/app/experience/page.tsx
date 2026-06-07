
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Terminal, Activity, ArrowLeft, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ICON_MAP: Record<string, any> = {
  Shield,
  Server,
  Terminal
};

export default function ExperiencePage() {
  const [value, loading] = useCollection(
    query(collection(db, 'experience'), orderBy('period', 'desc')),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const experiences = useMemo(() => {
    return value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  }, [value]);

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

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-12 pb-20">
          {experiences.map((exp: any, idx: number) => {
            const Icon = ICON_MAP[exp.icon || 'Shield'] || Shield;
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/10 group-hover:bg-accent/40 transition-colors" />
                <div className="cyber-glass p-10 border-l-4 border-l-primary hover:border-l-accent transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-32 h-32" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                        <Icon className="w-8 h-8 text-primary group-hover:text-accent" />
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
            );
          })}
          
          {!loading && experiences.length === 0 && (
            <div className="text-center py-20 border border-dashed border-primary/10">
              <p className="text-[10px] font-code text-primary/30 uppercase">No experience nodes detected. Synchronize via Obsidian.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
