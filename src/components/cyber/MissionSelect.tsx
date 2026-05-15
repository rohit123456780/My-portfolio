"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Terminal, Code, Database, Mail, Activity, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  org?: string;
  period: string;
  description: string;
  tools: string[];
  impact: string;
  details: string;
  category: 'Infrastructure' | 'Database' | 'Lab' | 'Web Sec' | 'Tools' | 'Crypto';
}

const PROJECTS: Project[] = [
  {
    title: "SquaredUp MSS Dashboard",
    org: "Radian Generation",
    period: "Feb 2026 – Present",
    description: "Built and validated site-level security dashboards integrating Zendesk and Splunk data.",
    tools: ["Splunk", "Zendesk", "SquaredUp", "Data Ingestion"],
    impact: "Improved visibility into security monitoring and enhanced incident detection reliability.",
    category: "Infrastructure",
    details: "Built site-level security and operations dashboards. Ensured accurate data ingestion, applied site mappings, and coordinated with teams to resolve telemetry gaps."
  },
  {
    title: "Baserow Database Transition",
    org: "Radian Generation",
    period: "Jan 2026 – Present",
    description: "Led the transformation of spreadsheet-based Ops Lists into a structured, role-based database.",
    tools: ["Baserow", "Database Normalization", "Security Roles"],
    impact: "Centralized system of record supporting MSS/MCS operations and compliance tracking.",
    category: "Database",
    details: "Led the migration from spreadsheets to a normalized database system. Linked contacts, assigned cybersecurity roles, and eliminated data duplicates."
  },
  {
    title: "Secure Mail Infrastructure",
    org: "Tech Trek Events",
    period: "Jun 2025 – Aug 2025",
    description: "Designed and configured domain-based email infrastructure with Outlook hardening.",
    tools: ["cPanel", "Outlook", "SSL/TLS", "SMTP/IMAP"],
    impact: "Ensured secure and reliable communication systems through port and SSL hardening.",
    category: "Infrastructure",
    details: "Implemented secure IMAP/SMTP configurations (ports 465/587). Resolved authentication and certificate issues for mission-critical email systems."
  },
  {
    title: "Cyber Ops & Threat Analysis Lab",
    org: "Independent / Springboard",
    period: "Mar 2023 – Dec 2023",
    description: "Built a full cybersecurity lab simulating real-world attack and defense scenarios.",
    tools: ["Python", "PowerShell", "SOC Labs", "Forensics"],
    impact: "Developed automation scripts and gained hands-on experience in defensive security.",
    category: "Lab",
    details: "Conducted vulnerability assessments, incident response simulations, and digital forensic analysis in a custom lab environment."
  },
  {
    title: "AI-Based XSS Detection",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    description: "Designed a machine learning-based system to detect XSS vulnerabilities.",
    tools: ["Machine Learning", "Python", "Payload Analysis"],
    impact: "Produced model insights to differentiate malicious inputs with high accuracy.",
    category: "Web Sec",
    details: "Trained ML models using labeled payloads to detect cross-site scripting. Produced technical documentation for model deployment."
  },
  {
    title: "Web Pentest – OWASP Juice Shop",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    description: "Full web application security assessment identifying critical vulnerabilities.",
    tools: ["Burp Suite", "OWASP ZAP", "CVSS", "XSS/SQLi"],
    impact: "Delivered detailed reports with CVSS ratings and remediation strategies.",
    category: "Web Sec",
    details: "Identified XSS, SQLi, IDOR, and Broken Authentication. Delivered PoC exploits and hardened remediation strategies."
  },
  {
    title: "Web Vulnerability Scanner",
    org: "Independent",
    period: "Jun 2024 – Jul 2024",
    description: "Developed a Python-based automated vulnerability scanner.",
    tools: ["Python", "Fuzzing", "Payload Dev"],
    impact: "Automated the detection of XSS, SQLi, and IDOR vulnerabilities.",
    category: "Tools",
    details: "Implemented fuzzing techniques for automated vulnerability discovery. Provided configurable scan depth and reporting outputs."
  },
  {
    title: "Network Packet Analyzer",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Built a Python tool to capture and analyze live network traffic.",
    tools: ["Python", "Networking", "Scapy", "Sniffing"],
    impact: "Enabled real-time security analysis of network behavior and protocol headers.",
    category: "Tools",
    details: "Extracted and displayed packet data including IP addresses, protocols, and payload information for live security monitoring."
  },
  {
    title: "Image Pixel Encryption",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Developed encryption system using pixel-level XOR manipulation.",
    tools: ["Cryptography", "Python", "Image Processing"],
    impact: "Ensured secure image storage through reversible encryption methods.",
    category: "Crypto",
    details: "Developed a system to securely store image data using XOR-based pixel manipulation techniques."
  },
  {
    title: "Secure Login Page",
    org: "Trimbak Infotech",
    period: "Jul 2024",
    description: "Built a secure authentication system with bcrypt hashing.",
    tools: ["Bcrypt", "Input Validation", "Rate Limiting"],
    impact: "Hardened systems against SQLi, XSS, and brute force attacks.",
    category: "Web Sec",
    details: "Implemented protections against major OWASP threats, including secure session management and cookie handling."
  }
];

export default function MissionSelect() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-xs font-code text-accent uppercase tracking-[0.3em]">Operational Readiness</span>
          </div>
          <h2 className="text-4xl font-headline text-glow">
            MISSION <span className="text-primary/50">SELECT</span>
          </h2>
          <p className="text-[10px] font-code text-primary/40 uppercase max-w-md">
            Execute detailed project analysis. Access technical narratives and impact reports for major deployments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj, idx) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedProject(proj)}
            className="group relative cyber-glass p-6 border border-primary/10 hover:border-primary transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                {proj.category === 'Infrastructure' && <Shield className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Database' && <Database className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Lab' && <Terminal className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Web Sec' && <Code className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Tools' && <Zap className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Crypto' && <Terminal className="w-5 h-5 text-primary group-hover:text-accent" />}
              </div>
              <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{proj.period}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-headline group-hover:text-glow transition-all">{proj.title}</h3>
              <p className="text-[11px] font-code text-primary/70 line-clamp-2">{proj.description}</p>
              
              <div className="flex flex-wrap gap-1 pt-2">
                {proj.tools.slice(0, 3).map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-primary/5 border border-primary/10 text-[8px] font-code text-primary/60">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-code text-accent uppercase">View Mission Specs</span>
              <Info className="w-3 h-3 text-accent" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl cyber-glass p-8 relative border-glow max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-primary/20 pb-6">
                  <div className="p-5 bg-primary/10 border border-primary/30">
                    <Activity className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline text-glow">{selectedProject.title}</h3>
                    <p className="text-accent font-code text-xs uppercase tracking-widest">
                      {selectedProject.org ? `${selectedProject.org} | ` : ''}{selectedProject.period}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Technical Narrative</h4>
                      <p className="text-sm font-code leading-relaxed opacity-90">{selectedProject.details}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Operational Impact</h4>
                      <p className="text-sm font-code leading-relaxed text-accent">{selectedProject.impact}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">System Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map(tool => (
                          <span key={tool} className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-code text-primary">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10">
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Mission Category</h4>
                      <p className="text-xs font-code font-bold uppercase tracking-widest">{selectedProject.category}</p>
                      <div className="h-1 w-full bg-primary/20 mt-4 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-accent w-full animate-[loading_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-full bg-primary text-primary-foreground py-4 font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all shadow-[0_0_20px_hsla(var(--primary),0.3)]"
                >
                  Close Data Stream
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
