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

const FALLBACK_ACHIEVEMENTS = [
  {
    title: "Featured Contributor – Stronger Together",
    description: "Recognized as a contributing professional in an international publication highlighting diverse voices in the cybersecurity domain.",
    category: "Publication",
    meta: "ISBN-Verified",
    isMajor: true,
    icon: "BookOpen"
  },
  {
    title: "Global CTF Competitor (Since 2023)",
    description: "Active participation in TryHackMe and HackTheBox. Completed advanced labs: King of the Hill, Basic Pentesting, and Privilege Escalation.",
    category: "Offensive Security",
    isMajor: true,
    icon: "Target"
  },
  {
    title: "27+ Cybersecurity Internships",
    description: "Extensive hands-on exposure across VAPT, Digital Forensics, SOC, and GRC domains, showcasing commitment to continuous learning.",
    category: "Professional Growth",
    isMajor: true,
    icon: "ShieldCheck"
  },
  {
    title: "97+ Industry Certifications",
    description: "Deep domain competency across API Security, Cloud, SOC, and Network Defense, verified by global certifying bodies.",
    category: "Credentials",
    isMajor: true,
    icon: "Award"
  }
];

export default function AwardsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'achievements'), orderBy('title', 'asc'))
  );

  const achievements = useMemo(() => {
    const dbAch = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbAch.length > 0 ? dbAch : FALLBACK_ACHIEVEMENTS;
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
                key={ach.id || idx}
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
        </div>
      </div>
    </main>
  );
}