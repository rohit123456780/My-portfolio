
"use client";

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Shield, Server, Terminal, Activity, ChevronRight, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: "OT Engineering Administrator L1",
    org: "Radian Generation",
    period: "Oct 2025 – Present",
    type: "Hybrid",
    focus: "OT/ICS cybersecurity posture, security documentation & SOPs, change & risk governance, data governance migration, compliance alignment, process hardening.",
    icon: Shield
  },
  {
    id: 2,
    title: "IT Administrator",
    org: "Tech Trek Events",
    period: "May 2025 – Jul 2025",
    type: "Remote",
    focus: "Outlook email administration, incoming/outgoing servers, cPanel domain email integration, email security rules, marketing email accounts, network governance rules.",
    icon: Server
  },
  {
    id: 3,
    title: "Technical Support Administrator",
    org: "HackingFlix",
    period: "Jun 2023 – May 2025",
    type: "Remote",
    focus: "End-to-end technical support, documentation, access permissions, security monitoring exposure, segregation of duties awareness, cross-team collaboration.",
    icon: Terminal
  }
];

export default function MissionLogs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-screen w-full bg-[#02040a] overflow-hidden">
      {/* Scroll Instruction */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50">
        <div className="flex items-center gap-2 text-primary">
          <ChevronRight className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-code uppercase tracking-[0.5em]">Scroll Sideways to Navigate Mission Logs</span>
          <ChevronRight className="w-4 h-4 animate-bounce rotate-180" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto h-full scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {experiences.map((exp, idx) => (
          <MissionHouse key={exp.id} exp={exp} index={idx} />
        ))}

        {/* Ending Block */}
        <div className="min-w-[40vw] flex items-center justify-center snap-center">
          <div className="text-center space-y-4">
            <Briefcase className="w-20 h-20 text-primary/20 mx-auto" />
            <p className="text-xs font-code text-primary/40 uppercase tracking-widest">End of Log</p>
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

function MissionHouse({ exp, index }: { exp: any, index: number }) {
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
            <span className="text-8xl font-headline italic">LOG_{index + 1}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <exp.icon className="w-10 h-10 text-primary group-hover:text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em]">{exp.type} DEPLOYMENT</span>
                <h3 className="text-3xl font-headline group-hover:text-glow transition-all">
                  {exp.title}
                </h3>
                <p className="text-xs font-code text-primary/60 uppercase">{exp.org}</p>
              </div>
            </div>

            <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
              {exp.focus}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-[10px] font-code text-accent uppercase">{exp.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-primary/40" />
                <span className="text-[8px] font-code text-primary/40 uppercase">Aether Verified Log</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
