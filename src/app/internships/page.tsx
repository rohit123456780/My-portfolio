
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Briefcase, Shield, ArrowLeft, Calendar, Zap, Terminal, Activity, MapPin } from 'lucide-react';
import Link from 'next/link';

const INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern", period: "Aug 2025 – Oct 2025", domain: "VAPT", level: "Advanced", details: "Enterprise-scale penetration testing for financial and public sector infrastructure. Focused on high-stakes vulnerability discovery and remediation strategy." },
  { org: "Razz Security IT Services", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "SOC", level: "Intermediate", details: "Security event monitoring and log analysis for managed service clients. Assisted in incident triage and threat hunting operations." },
  { org: "Redynox", role: "Cybersecurity Intern", period: "Jun 2025 – Jul 2025", domain: "Digital Forensics", level: "Intermediate", details: "Incident response support and artifact analysis for simulated threat scenarios. Developed automated scripts for evidence collection." },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "VAPT", level: "Advanced", details: "Deep-dive web application security assessments and exploit documentation. Performed comprehensive OWASP Top 10 audits." },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "May 2024", domain: "Pentesting Labs", level: "Advanced", details: "Completed advanced labs: King of the Hill, Basic Pentesting, and Privilege Escalation. Achieved high-rank performance in real-time CTF scenarios." },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "May 2024 – Jul 2024", domain: "AI / VAPT", level: "Advanced", details: "Developed AI-based XSS detection systems and performed comprehensive web audits. Integrated machine learning for automated payload classification." },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jun 2024 – Aug 2024", domain: "Offensive Security", level: "Advanced", details: "Executed 5 major security projects including automated vuln scanners and packet sniffers. Received outstanding remarks for technical initiative." },
  { org: "MS Interface Technologies", role: "Cybersecurity Intern", period: "2023", domain: "General IT", level: "Beginner", details: "Initial exposure to corporate network governance and security policy documentation. Assissted in network infrastructure hardening." },
  { org: "Cyber Shield Ops", role: "Security Analyst Intern", period: "Jan 2024", domain: "SOC Monitoring", level: "Intermediate", details: "Real-time threat monitoring and alert validation using SIEM tools. Documented SOC workflows and incident response playbooks." },
  { org: "Nexus Defense", role: "Network Security Intern", period: "Dec 2023", domain: "Infrastructure", level: "Intermediate", details: "Firewall configuration and network segmentation projects. Implemented zero-trust principles in simulated enterprise environments." }
];

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-5xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-code uppercase tracking-widest">Infiltrating Deployment History...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Growth Sector</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">27+ Cybersecurity Deployments & Industrial Internships Identified.</p>
          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-8 pb-20">
          {INTERNSHIPS.map((intern, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-10 border border-primary/10 hover:border-accent transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="text-8xl font-headline italic">NODE_{idx + 1}</span>
              </div>

              <div className="flex items-start gap-8 flex-1 relative z-10">
                <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                  <Briefcase className="w-8 h-8 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-headline uppercase group-hover:text-glow tracking-tight">{intern.org}</h3>
                    <div className="flex flex-wrap gap-4 text-[10px] font-code text-primary/40 uppercase tracking-widest">
                      <span className="flex items-center gap-1 text-accent"><Zap className="w-3 h-3" /> {intern.domain} NODE</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {intern.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> REMOTE/HYBRID</span>
                    </div>
                  </div>
                  <p className="text-sm font-code text-primary/70 border-t border-primary/10 pt-4 leading-relaxed max-w-2xl">
                    {intern.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0 relative z-10">
                <span className="px-4 py-1.5 border border-primary/30 text-[10px] font-code text-primary uppercase bg-primary/5 tracking-widest">{intern.role}</span>
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-code text-primary/30 uppercase tracking-[0.3em]">{intern.level} Competency</span>
                   <div className={`w-2 h-2 rounded-full animate-pulse ${intern.level === 'Advanced' ? 'bg-accent shadow-[0_0_10px_#00cfff]' : 'bg-primary/40'}`} />
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <Terminal className="w-3 h-3 text-primary/20" />
                  <span className="text-[7px] font-code text-primary/20 uppercase tracking-widest">Auth Verified node_id: {idx + 1001}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="p-20 border-2 border-dashed border-primary/10 text-center space-y-6 group hover:border-primary/20 transition-all">
             <Globe className="w-16 h-16 text-primary/10 mx-auto group-hover:text-primary/30 transition-colors" />
             <div className="space-y-2">
               <p className="text-xl font-headline text-primary/30 uppercase tracking-[0.5em]">17+ Additional Technical Deployment Nodes Detected</p>
               <p className="text-[10px] font-code text-primary/20 uppercase tracking-widest">VAPT • SOC • CLOUD • AI SECURITY • GRC • DIGITAL FORENSICS</p>
             </div>
             <div className="flex justify-center gap-2">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />)}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
