
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Activity, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "SquaredUp MSS Dashboard",
    org: "Radian Generation",
    period: "Feb 2026 – Present",
    details: "Built site-level dashboards integrating Zendesk and Splunk data. Focused on data ingestion validation and telemetry troubleshooting.",
    tools: ["Splunk", "Zendesk", "SquaredUp"],
    category: "Infrastructure"
  },
  {
    title: "AI-Based XSS Detection",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    details: "Designed classification models trained on extensive payload datasets. Implemented real-time inference for web input filtering.",
    tools: ["Python", "Machine Learning", "Payload Datasets"],
    category: "AI Security"
  },
  {
    title: "Network Packet Analyzer",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    details: "Built a packet sniffer to extract IP/MAC addresses and protocol breakdowns for live security auditing.",
    tools: ["Python", "Scapy", "Network Security"],
    category: "Tools"
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-5xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Mission Matrix</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">High-impact technical case studies & tool developments.</p>
          <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em]">{proj.category}</span>
                  <h3 className="text-3xl font-headline uppercase group-hover:text-glow transition-all">{proj.title}</h3>
                  <p className="text-[10px] font-code text-primary/40 uppercase">{proj.org} | {proj.period}</p>
                </div>

                <p className="text-sm font-code text-primary/70 leading-relaxed min-h-[80px]">
                  {proj.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tools.map(tool => (
                    <span key={tool} className="px-2 py-1 bg-primary/5 border border-primary/20 text-[8px] font-code text-primary uppercase">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-primary/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-[10px] font-code text-accent uppercase">Operational</span>
                  </div>
                  <Terminal className="w-4 h-4 text-primary/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
