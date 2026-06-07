
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Briefcase, Calendar, Zap, Shield, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Internship {
  org: string;
  role: string;
  period: string;
  domain: string;
  details: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const INTERNSHIPS: Internship[] = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern", period: "Aug 2025 – Oct 2025", domain: "VAPT", details: "Advanced VAPT focus for enterprise client systems.", level: "Advanced" },
  { org: "Razz Security IT Services", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "General", details: "Data-driven security operations and analytics.", level: "Intermediate" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "Jun 2025 – Jul 2025", domain: "General", details: "Security architecture design and implementation.", level: "Intermediate" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "VAPT", details: "SQLi/XSS pentesting + professional technical reports.", level: "Advanced" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "May 2024", domain: "VAPT", details: "Multi-level program spanning beginner to advanced pentesting labs.", level: "Advanced" },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "May 2024 – Jul 2024", domain: "AI", details: "Projects: AI-based XSS detection system + comprehensive web pentesting.", level: "Advanced" },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jun 2024 – Aug 2024", domain: "VAPT", details: "Execution of 5 major security projects in a corporate environment.", level: "Advanced" }
];

export default function InternshipAtlas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-screen w-full bg-[#02040a] overflow-hidden">
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50">
        <div className="flex items-center gap-2 text-primary">
          <ChevronRight className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-code uppercase tracking-[0.5em]">Scroll Sideways to Navigate Growth Sector</span>
          <ChevronRight className="w-4 h-4 animate-bounce rotate-180" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto h-full scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {INTERNSHIPS.map((intern, idx) => (
          <InternshipHouse key={idx} intern={intern} index={idx} />
        ))}

        <div className="min-w-[40vw] flex items-center justify-center snap-center">
          <div className="text-center space-y-4">
            <Globe className="w-20 h-20 text-primary/20 mx-auto" />
            <p className="text-xs font-code text-primary/40 uppercase tracking-widest">End of Sector</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-12 right-12 h-[2px] bg-primary/10">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]"
          style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}

function InternshipHouse({ intern, index }: { intern: Internship, index: number }) {
  return (
    <div className="min-w-screen md:min-w-[80vw] lg:min-w-[60vw] h-full flex items-center justify-center snap-center px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="relative group w-full max-w-2xl"
      >
        <div className="absolute -inset-8 border border-primary/10 bg-primary/5 -z-10 skew-x-3 group-hover:skew-x-0 transition-transform duration-700" />
        
        <div className="cyber-glass p-12 border-l-4 border-l-primary relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
            <span className="text-8xl font-headline italic">NODE_0{index + 1}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <Briefcase className="w-10 h-10 text-primary group-hover:text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em]">{intern.domain} Deployment</span>
                <h3 className="text-3xl font-headline group-hover:text-glow transition-all">
                  {intern.org}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[10px] font-code text-primary/60 uppercase border-y border-primary/10 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {intern.period}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" /> {intern.level} Node
              </div>
            </div>

            <p className="text-sm font-code text-primary/70 leading-relaxed pt-2">
              {intern.details}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-code text-accent uppercase">Growth Sector Active</span>
              </div>
              <div className="px-3 py-1 border border-primary/30 text-[10px] font-code text-primary uppercase">
                {intern.role}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
