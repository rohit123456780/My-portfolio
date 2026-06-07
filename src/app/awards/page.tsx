
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, ShieldCheck, Zap, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ACHIEVEMENTS = [
  {
    title: "Featured Contributor – Stronger Together",
    description: "Recognized as a contributing professional in an international publication highlighting diverse voices in the cybersecurity domain.",
    category: "Publication",
    icon: BookOpen,
    isMajor: true
  },
  {
    title: "Global CTF Competitor",
    description: "Active participation in TryHackMe and HackTheBox. Completed advanced labs: King of the Hill, Basic Pentesting, and Privilege Escalation.",
    category: "Offensive Security",
    icon: Target,
    isMajor: true
  },
  {
    title: "97+ Industry Certifications",
    description: "Deep domain competency across API Security, Cloud, SOC, and Network Defense, verified by global certifying bodies.",
    category: "Credentials",
    icon: Award,
    isMajor: true
  },
  {
    title: "Letter of Recommendation",
    description: "Formally recognized for exceptional technical skills, initiative, and professional conduct during security internship projects at Msinterface Technologies.",
    category: "Recognition",
    icon: Star
  }
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Distinction Belt</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Awards, Honours & Major Professional Milestones.</p>
          <div className="h-px w-full bg-gradient-to-r from-yellow-500/50 to-transparent" />
        </div>

        <div className="space-y-8">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-10 border border-primary/10 hover:border-accent/40 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent transition-all shrink-0">
                  <ach.icon className="w-8 h-8 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-code text-accent uppercase tracking-widest">{ach.category} Node</span>
                    <h3 className="text-3xl font-headline uppercase group-hover:text-glow transition-all">{ach.title}</h3>
                  </div>
                  <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-4">
                    {ach.description}
                  </p>
                  {ach.isMajor && (
                    <div className="inline-block px-3 py-1 border border-yellow-500/30 text-[8px] font-code text-yellow-500 uppercase tracking-widest">
                      Priority Milestone Detected
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
