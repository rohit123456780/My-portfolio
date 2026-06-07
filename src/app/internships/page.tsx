
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Zap, Terminal, Activity, MapPin, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';

const INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern (VAPT)", period: "Sep 2025 – Sep 2025", domain: "VAPT" },
  { org: "Razz Security IT Services LLP", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "SOC" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "May 2025 – Jun 2025", domain: "General" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Mar 2025 – Apr 2025", domain: "General" },
  { org: "Hack Secure", role: "Cybersecurity Intern", period: "Jan 2025 – Feb 2025", domain: "General" },
  { org: "Navodita Infotech", role: "Cybersecurity Intern", period: "Nov 2024 – Dec 2024", domain: "General" },
  { org: "Brainwave Matrix Solutions", role: "Cybersecurity & Ethical Hacking Intern", period: "Sep 2024 – Oct 2024", domain: "Pentesting" },
  { org: "GrowIntern", role: "Cybersecurity Intern", period: "Aug 2024 – Aug 2024", domain: "General" },
  { org: "Edunet Foundation / IBM SkillsBuild", role: "AI & Cloud Intern", period: "Jun 2024 – Jul 2024", domain: "Cloud & AI" },
  { org: "BH Security Plus", role: "Penetration Testing Intern", period: "Apr 2024 – May 2024", domain: "VAPT" },
  { org: "Sutantras.in", role: "Cyber Law & Information Security Framework Intern", period: "Feb 2024 – Mar 2024", domain: "GRC" },
  { org: "Trimbak Infotech", role: "Cyber Security Intern", period: "Dec 2023 – Jan 2024", domain: "General" },
  { org: "TechnoTrench", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2023 – Nov 2023", domain: "Pentesting" },
  { org: "ITPS", role: "Cyber Security Intern", period: "Sep 2023 – Sep 2023", domain: "General" },
  { org: "Msinterface Technologies Pvt Ltd", role: "Cybersecurity Intern", period: "Jul 2023 – Aug 2023", domain: "General" },
  { org: "StartHere", role: "Cybersecurity Intern", period: "Jun 2023 – Jun 2023", domain: "General" },
  { org: "NexaSynergy Innovations", role: "Cybersecurity Intern", period: "Apr 2023 – May 2023", domain: "General" },
  { org: "Sturtle Security Pvt Ltd", role: "Cybersecurity Intern", period: "Feb 2023 – Mar 2023", domain: "General" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "Dec 2022 – Jan 2023", domain: "General" },
  { org: "Pinnacle Labs", role: "Cybersecurity Intern", period: "Oct 2022 – Nov 2022", domain: "General" },
  { org: "Let's We Hack", role: "Cybersecurity & Ethical Hacking Intern", period: "Aug 2022 – Sep 2022", domain: "Pentesting" },
  { org: "SecureSphere Foundation / CFCS2R", role: "Cybersecurity Intern", period: "May 2022 – Jul 2022", domain: "General" },
  { org: "Cyber Secured India", role: "Cybersecurity & Digital Forensics Intern", period: "Feb 2022 – Apr 2022", domain: "Forensics" },
  { org: "DeltaClause", role: "Cybersecurity & Ethical Hacking Intern", period: "Dec 2021 – Jan 2022", domain: "Pentesting" },
  { org: "TechnoHacks EduTech", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2021 – Nov 2021", domain: "Pentesting" },
  { org: "Springboard", role: "Cybersecurity Career Track Intern", period: "Jan 2021 – Sep 2021", domain: "General" },
  { org: "CyberDosti", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2020 – Dec 2020", domain: "Pentesting" }
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">27 Full-Cycle Cybersecurity Deployments Identified.</p>
          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 pb-20">
          {INTERNSHIPS.map((intern, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-accent transition-colors">
                  <Briefcase className="w-6 h-6 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-headline uppercase group-hover:text-glow tracking-tight">{intern.org}</h3>
                  <div className="flex flex-wrap gap-4 text-[9px] font-code text-primary/40 uppercase">
                    <span className="flex items-center gap-1 text-accent"><Zap className="w-3 h-3" /> {intern.domain}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {intern.period}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <span className="px-3 py-1 border border-primary/30 text-[9px] font-code text-primary uppercase bg-primary/5">{intern.role}</span>
                <div className="flex items-center gap-2">
                   <Terminal className="w-3 h-3 text-primary/20" />
                   <span className="text-[7px] font-code text-primary/20 uppercase">Auth node_id: {1000 + idx}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="p-16 border-2 border-dashed border-primary/10 text-center space-y-4">
             <Globe className="w-12 h-12 text-primary/10 mx-auto" />
             <p className="text-sm font-headline text-primary/30 uppercase tracking-[0.3em]">Full Deployment History Verified</p>
          </div>
        </div>
      </div>
    </main>
  );
}
