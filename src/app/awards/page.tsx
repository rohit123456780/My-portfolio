
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, ShieldCheck, Zap, BookOpen, ArrowLeft, Activity, Terminal } from 'lucide-react';
import Link from 'next/link';

const ACHIEVEMENTS = [
  {
    title: "Featured Contributor – Stronger Together",
    description: "Formally recognized as a contributing professional in an international cybersecurity publication highlighting diverse technical voices and professional journeys.",
    category: "Publication",
    icon: BookOpen,
    isMajor: true,
    meta: "GLOBAL_EDITION_2024"
  },
  {
    title: "Global CTF Competitor (Active)",
    description: "High-tier performance in TryHackMe and HackTheBox. Successfully cleared 150+ rooms including advanced King of the Hill and Windows PrivEsc labs.",
    category: "Offensive Security",
    icon: Target,
    isMajor: true,
    meta: "RANK_TOP_5_PERCENT"
  },
  {
    title: "97+ Industry Certifications",
    description: "Deep domain competency across API Security, Cloud, SOC, and Network Defense, verified by Mile2, Cisco, Google, and APIsec University.",
    category: "Credentials",
    icon: Award,
    isMajor: true,
    meta: "MULTI_DOMAIN_EXPERT"
  },
  {
    title: "Letter of Recommendation – Security Ops",
    description: "Formally recognized for exceptional technical initiative, professional ethics, and rapid skill acquisition during security internship projects at Msinterface Technologies.",
    category: "Recognition",
    icon: Star,
    isMajor: true,
    meta: "DIRECTOR_COMMENDATION"
  },
  {
    title: "Advanced TryHackMe Mastery",
    description: "Recognized for completing rigorous security labs involving real-world penetration testing methodologies and detailed technical exploit documentation.",
    category: "Skill Mastery",
    icon: Zap,
    meta: "LAB_COMPLETION_v4"
  },
  {
    title: "Outstanding Remarks – Internship Program",
    description: "Received 'Exceptional Dedication' awards across multiple industrial training programs for high-quality technical contribution and adaptability.",
    category: "Performance",
    icon: Trophy,
    meta: "TRAINEE_OF_THE_QUARTER"
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Major Professional Milestones & Global Recognition.</p>
          <div className="h-px w-full bg-gradient-to-r from-yellow-500/50 to-transparent" />
        </div>

        <div className="space-y-8 pb-20">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-10 border border-primary/10 hover:border-accent transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="p-5 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                  <ach.icon className="w-10 h-10 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-6 flex-1">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-code text-accent uppercase tracking-widest">{ach.category} Node</span>
                      <span className="text-[8px] font-code text-primary/30 uppercase tracking-[0.2em]">ID: {ach.meta}</span>
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
          ))}
        </div>
      </div>
    </main>
  );
}
