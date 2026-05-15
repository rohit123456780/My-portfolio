"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Terminal, Activity } from 'lucide-react';

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
  return (
    <div className="space-y-12 py-12">
      {experiences.map((exp, idx) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
          className="relative pl-12 border-l border-primary/20"
        >
          <div className="absolute left-[-21px] top-0 p-2 bg-background border border-primary/40 rounded-sm">
            <exp.icon className="w-6 h-6 text-primary" />
          </div>
          
          <div className="cyber-glass p-6 group hover:border-primary/50 transition-all">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div>
                <span className="text-[10px] text-accent font-code tracking-widest uppercase mb-1 block">MISSION REPORT #{idx + 1}</span>
                <h3 className="text-xl font-headline text-glow">{exp.title}</h3>
                <p className="text-primary/70 font-code text-xs uppercase">{exp.org} | {exp.period}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/10 text-[10px] text-primary border border-primary/20 font-code">{exp.type}</span>
                <Activity className="w-4 h-4 text-accent animate-pulse" />
              </div>
            </div>
            
            <p className="text-sm leading-relaxed opacity-80 mb-4 border-l-2 border-accent/30 pl-4 py-1">
              {exp.focus}
            </p>
            
            <div className="flex gap-4 mt-4 opacity-50 text-[10px] font-code uppercase">
              <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Artifacts: Logs, SOPs</span>
              <span className="flex items-center gap-1"><Server className="w-3 h-3" /> Systems: Hardened</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
