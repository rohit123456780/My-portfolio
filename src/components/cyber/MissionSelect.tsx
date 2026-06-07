
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Terminal, Zap, Shield, ChevronRight, Activity, Database, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  org: string;
  period: string;
  description: string;
  tools: string[];
  impact: string;
  details: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: "SquaredUp MSS Dashboard",
    org: "Radian Generation",
    period: "Feb 2026 – Present",
    description: "Security and operations dashboards for MSS customers.",
    tools: ["Splunk", "Zendesk", "SquaredUp"],
    impact: "Enhanced incident visibility for high-stakes OT environments.",
    category: "Infrastructure",
    details: "Built site-level dashboards integrating Zendesk and Splunk data. Focused on data ingestion validation and telemetry troubleshooting."
  },
  {
    title: "AI-Based XSS Detection",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    description: "Machine learning system for real-time web attack classification.",
    tools: ["Python", "Machine Learning", "Payload Datasets"],
    impact: "98% accuracy in distinguishing malicious XSS payloads.",
    category: "AI Security",
    details: "Designed classification models trained on extensive payload datasets. Implemented real-time inference for web input filtering."
  },
  {
    title: "Network Packet Analyzer",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Real-time traffic sniffing and security protocol auditing tool.",
    tools: ["Python", "Scapy", "Network Security"],
    impact: "Enabled immediate detection of suspicious lateral movement.",
    category: "Tools",
    details: "Built a packet sniffer to extract IP/MAC addresses and protocol breakdowns for live security auditing."
  }
];

export default function MissionSelect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-screen w-full bg-[#02040a] overflow-hidden">
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50">
        <div className="flex items-center gap-2 text-primary">
          <ChevronRight className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-code uppercase tracking-[0.5em]">Scroll Sideways to Browse Mission Matrix</span>
          <ChevronRight className="w-4 h-4 animate-bounce rotate-180" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto h-full scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {PROJECTS.map((proj, idx) => (
          <ProjectHouse key={idx} proj={proj} index={idx} />
        ))}

        <div className="min-w-[40vw] flex items-center justify-center snap-center">
          <div className="text-center space-y-4">
            <Cpu className="w-20 h-20 text-primary/20 mx-auto" />
            <p className="text-xs font-code text-primary/40 uppercase tracking-widest">End of Matrix</p>
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

function ProjectHouse({ proj, index }: { proj: Project, index: number }) {
  return (
    <div className="min-w-screen md:min-w-[80vw] lg:min-w-[60vw] h-full flex items-center justify-center snap-center px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="relative group w-full max-w-2xl"
      >
        <div className="absolute -inset-8 border border-primary/10 bg-primary/5 -z-10 skew-x-3 group-hover:skew-x-0 transition-transform duration-700" />
        
        <div className="cyber-glass p-12 border-l-4 border-l-accent relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
            <span className="text-8xl font-headline italic">MSSN_{index + 1}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-accent/10 border border-accent/20 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                <Cpu className="w-10 h-10 text-accent group-hover:text-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-code text-primary uppercase tracking-[0.3em]">{proj.category}</span>
                <h3 className="text-3xl font-headline group-hover:text-glow transition-all">
                  {proj.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-code text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
              {proj.details}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {proj.tools.map(tool => (
                <span key={tool} className="px-2 py-1 bg-primary/5 border border-primary/20 text-[8px] font-code text-primary uppercase">
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-accent animate-pulse" />
                <span className="text-[10px] font-code text-accent uppercase tracking-widest">{proj.org}</span>
              </div>
              <div className="text-[10px] font-code text-primary/60 uppercase">
                {proj.period}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
