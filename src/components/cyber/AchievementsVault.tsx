
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Target, Award, Star, ShieldCheck, Zap, BookOpen, Home, ChevronRight } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-screen w-full bg-[#02040a] overflow-hidden">
      {/* Scroll Instruction */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50">
        <div className="flex items-center gap-2 text-primary">
          <ChevronRight className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-code uppercase tracking-[0.5em]">Scroll Sideways to Explore Distinction Belt</span>
          <ChevronRight className="w-4 h-4 animate-bounce rotate-180" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto h-full scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {ACHIEVEMENTS.map((ach, idx) => (
          <AchievementHouse key={idx} ach={ach} index={idx} />
        ))}

        {/* Ending Block */}
        <div className="min-w-[40vw] flex items-center justify-center snap-center">
          <div className="text-center space-y-4">
            <Trophy className="w-20 h-20 text-primary/20 mx-auto" />
            <p className="text-xs font-code text-primary/40 uppercase tracking-widest">End of Sector</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-12 left-12 right-12 h-[2px] bg-primary/10">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]"
          style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}

function AchievementHouse({ ach, index }: { ach: Achievement, index: number }) {
  return (
    <div className="min-w-screen md:min-w-[80vw] lg:min-w-[60vw] h-full flex items-center justify-center snap-center px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative group w-full max-w-2xl"
      >
        {/* The "House" Structure */}
        <div className="absolute -inset-8 border border-primary/10 bg-primary/5 -z-10 skew-x-3 group-hover:skew-x-0 transition-transform duration-700" />
        
        <div className="cyber-glass p-12 border-l-4 border-l-primary relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
            <span className="text-8xl font-headline italic">0{index + 1}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <ach.icon className="w-10 h-10 text-primary group-hover:text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em]">{ach.category}</span>
                <h3 className="text-3xl font-headline group-hover:text-glow transition-all">
                  {ach.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
              {ach.description}
            </p>

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-code text-accent uppercase">Operational Success</span>
              </div>
              {ach.isMajor && (
                <div className="px-3 py-1 border border-primary/30 text-[10px] font-code text-primary uppercase">
                  Major Milestone
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements to feel like a "House" façade */}
        <div className="absolute -bottom-4 left-4 right-4 h-1 bg-primary/20" />
        <div className="absolute top-4 -left-4 w-1 h-32 bg-primary/20" />
      </motion.div>
    </div>
  );
}
