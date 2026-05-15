
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  title: string;
  description: string;
  category: string;
  icon: any;
  isMajor?: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Featured Contributor – Stronger Together",
    description: "Recognized as a contributing professional in an international publication highlighting diverse voices in the cybersecurity domain.",
    category: "Publication",
    icon: BookOpen,
    isMajor: true
  },
  {
    title: "Global CTF Competitor (Since 2023)",
    description: "Active participation in TryHackMe and HackTheBox. Completed advanced labs: King of the Hill, Basic Pentesting, and Privilege Escalation.",
    category: "Offensive Security",
    icon: Target,
    isMajor: true
  },
  {
    title: "Advanced Cybersecurity Lab Mastery",
    description: "Recognized for completing advanced TryHackMe labs involving real-world penetration testing methodologies and exploit documentation.",
    category: "Skill Mastery",
    icon: Zap
  },
  {
    title: "27+ Cybersecurity Internships",
    description: "Extensive hands-on exposure across VAPT, Digital Forensics, SOC, and GRC domains, showcasing commitment to continuous learning.",
    category: "Experience",
    icon: ShieldCheck,
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
    title: "Letter of Recommendation – Msinterface Technologies",
    description: "Formally recognized for exceptional technical skills, initiative, and professional conduct during security internship projects.",
    category: "Recognition",
    icon: Star
  },
  {
    title: "Outstanding Remarks & Exceptional Dedication",
    description: "Multiple high-performance awards from various internship programs based on technical contribution quality and adaptability.",
    category: "Performance",
    icon: Trophy
  }
];

export default function AchievementsVault() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-xs font-code text-accent uppercase tracking-[0.3em]">Honours & Awards</span>
          </div>
          <h2 className="text-4xl font-headline text-glow">
            MISSION <span className="text-primary/50">MILESTONES</span>
          </h2>
          <p className="text-[10px] font-code text-primary/40 uppercase max-w-md">
            Verifying excellence across the global security theater. Recognition nodes synced.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "group relative p-6 cyber-glass border border-primary/10 hover:border-accent/50 transition-all cursor-default",
              ach.isMajor && "border-primary/30 bg-primary/5"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <ach.icon className="w-5 h-5 text-primary group-hover:text-accent" />
              </div>
              <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{ach.category}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-headline group-hover:text-glow transition-all">
                {ach.title}
              </h3>
              <p className="text-[11px] font-code text-primary/70 leading-relaxed">
                {ach.description}
              </p>
            </div>

            {ach.isMajor && (
              <div className="absolute top-0 right-0 p-1">
                <div className="w-1 h-1 bg-accent animate-ping" />
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-primary/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-code uppercase">Status: Verified</span>
              <div className="h-[1px] flex-1 bg-primary/10 mx-4" />
              <Zap className="w-3 h-3 text-accent" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
