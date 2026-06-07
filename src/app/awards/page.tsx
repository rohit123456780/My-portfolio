
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, BookOpen, ArrowLeft, Activity, Terminal, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ICON_MAP: Record<string, any> = {
  Trophy, Target, Award, Star, BookOpen, Zap, ShieldCheck
};

export default function AwardsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'achievements'), orderBy('title', 'asc')),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const achievements = useMemo(() => {
    return value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  }, [value]);

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Distinction Belt</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Major Professional Milestones & Global Recognition.</p>
          <div className="h-px w-full bg-gradient-to-r from-yellow-500/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-8 pb-20">
          {achievements.map((ach: any, idx: number) => {
            const Icon = ICON_MAP[ach.icon || 'Award'] || Award;
            return (
              <motion.div 
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="cyber-glass p-10 border border-primary/10 hover:border-accent transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="p-5 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                    <Icon className="w-10 h-10 text-primary group-hover:text-accent" />
                  </div>
                  <div className="space-y-6 flex-1">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-code text-accent uppercase tracking-widest">{ach.category || 'Node'} Node</span>
                        <span className="text-[8px] font-code text-primary/30 uppercase tracking-[0.2em]">ID: {ach.meta || ach.id}</span>
                      </div>
                      <h3 className="text-4xl font-headline uppercase group-hover:text-glow transition-all">{ach.title}</h3>
                    </div>
                    <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
                      {ach.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {ach.isMajor && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-yellow-500/30 text-[8px] font-code text-yellow-500 uppercase tracking-widest">
                          <Activity className="w-3 h-3 animate-pulse" /> Priority Milestone Detected
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-primary/20" />
                        <span className="text-[7px] font-code text-primary/20 uppercase">Auth Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {!loading && achievements.length === 0 && (
            <div className="text-center py-20 border border-dashed border-primary/10">
              <p className="text-[10px] font-code text-primary/30 uppercase">No distinctions detected. Deploy milestones via Obsidian.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
