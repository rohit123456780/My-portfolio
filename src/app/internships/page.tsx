
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Briefcase, Shield, ArrowLeft, Calendar, Zap, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

const INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern", period: "Aug 2025 – Oct 2025", domain: "VAPT", level: "Advanced", details: "Enterprise-scale penetration testing for financial and public sector infrastructure." },
  { org: "Razz Security IT Services", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "SOC", level: "Intermediate", details: "Security event monitoring and log analysis for managed service clients." },
  { org: "Redynox", role: "Cybersecurity Intern", period: "Jun 2025 – Jul 2025", domain: "Digital Forensics", level: "Intermediate", details: "Incident response support and artifact analysis for simulated threat scenarios." },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "VAPT", level: "Advanced", details: "Deep-dive web application security assessments and exploit documentation." },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "May 2024", domain: "Pentesting Labs", level: "Advanced", details: "Completed advanced labs: King of the Hill, Basic Pentesting, and Privilege Escalation." },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "May 2024 – Jul 2024", domain: "AI / VAPT", level: "Advanced", details: "Developed AI-based XSS detection systems and performed comprehensive web audits." },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jun 2024 – Aug 2024", domain: "Offensive Security", level: "Advanced", details: "Executed 5 major security projects including automated vuln scanners and packet sniffers." },
  { org: "MS Interface Technologies", role: "Cybersecurity Intern", period: "2023", domain: "General IT", level: "Beginner", details: "Initial exposure to corporate network governance and security policy documentation." }
];

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Growth Sector</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">27+ Cybersecurity Deployments & Industrial Internships.</p>
          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 pb-20">
          {INTERNSHIPS.map((intern, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-10 border border-primary/10 hover:border-accent transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="flex items-start gap-8 flex-1">
                <div className="p-4 bg-primary/10 border border-primary/20 group-hover:text-accent transition-colors shrink-0">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-headline uppercase group-hover:text-glow">{intern.org}</h3>
                    <div className="flex flex-wrap gap-4 text-[10px] font-code text-primary/40 uppercase tracking-widest">
                      <span className="flex items-center gap-1 text-accent"><Zap className="w-3 h-3" /> {intern.domain} Node</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {intern.period}</span>
                    </div>
                  </div>
                  <p className="text-sm font-code text-primary/70 border-t border-primary/10 pt-4 leading-relaxed">
                    {intern.details}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="px-3 py-1 border border-primary/30 text-[10px] font-code text-primary uppercase bg-primary/5">{intern.role}</span>
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-code text-primary/30 uppercase tracking-[0.3em]">{intern.level}</span>
                   <div className={`w-2 h-2 rounded-full animate-pulse ${intern.level === 'Advanced' ? 'bg-accent shadow-[0_0_10px_#00cfff]' : 'bg-primary/40'}`} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Activity className="w-3 h-3 text-primary/20" />
                  <span className="text-[7px] font-code text-primary/20 uppercase">Aether Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="p-12 border-2 border-dashed border-primary/10 text-center space-y-4">
             <Globe className="w-12 h-12 text-primary/10 mx-auto" />
             <p className="text-xs font-code text-primary/30 uppercase tracking-[0.5em]">20+ Additional Technical Deployment Nodes Detected</p>
          </div>
        </div>
      </div>
    </main>
  );
}
