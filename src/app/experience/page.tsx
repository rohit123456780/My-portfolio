
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Terminal, Activity, ArrowLeft, Lock, Zap, Briefcase, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ICON_MAP: Record<string, any> = {
  Shield,
  Server,
  Terminal,
  Briefcase
};

const FALLBACK_EXP = [
  {
    title: "OT Engineering Administrator L1",
    org: "Radian Generation",
    period: "Oct 2025 – Present",
    duration: "9 mos",
    type: "Full-time",
    location: "Chennai, Tamil Nadu, India · Hybrid",
    overview: "Working within OT and industrial control system (ICS) environments to strengthen cybersecurity posture, documentation governance, and compliance-driven engineering processes supporting renewable energy operations.",
    responsibilities: [
      { label: "OT / ICS Cybersecurity", detail: "Enforce security-aligned engineering practices across OT environments, emphasizing risk awareness, access governance, and operational integrity." },
      { label: "Security Documentation & SOPs", detail: "Develop, maintain, and standardize OT security documentation, SOPs, and change records to support audit readiness and regulatory compliance." },
      { label: "Change & Risk Management", detail: "Govern OT engineering changes with a security-first approach, ensuring traceability, approval control, and minimized operational risk." },
      { label: "Data Governance", detail: "Implement structured data management practices, transitioning from spreadsheet-based tracking to controlled databases to reduce exposure and improve integrity." },
      { label: "Compliance Alignment", detail: "Support adherence to internal security standards and industry best practices relevant to OT/ICS environments." },
      { label: "Process Hardening", detail: "Continuously improve documentation, workflows, and controls to enhance resilience, reliability, and cybersecurity maturity of OT systems." }
    ],
    skills: "System Administration, Network Administration and +23 skills",
    icon: "Shield"
  },
  {
    title: "IT Administrator",
    org: "Tech Trek Events",
    period: "May 2025 – Jul 2025",
    duration: "3 mos",
    type: "Full-time",
    location: "India · Remote",
    overview: "Responsible for managing and securing the organization’s email and network infrastructure. Focused on ensuring smooth communication channels, reliable configurations, and enforcing governance rules.",
    responsibilities: [
      { label: "Email Administration", detail: "Created and configured Outlook accounts with both incoming and outgoing mail servers, ensuring seamless communication." },
      { label: "cPanel & Domain Management", detail: "Integrated cPanel domain-based emails with Outlook mailboxes, improving accessibility and delivery efficiency." },
      { label: "Policy & Rules Implementation", detail: "Designed and enforced rules for domain-based emails to enhance security, compliance, and organized workflows." },
      { label: "Marketing Email Configuration", detail: "Set up and managed marketing email accounts, ensuring proper configuration and reliable delivery." },
      { label: "Network Administration", detail: "Configured and maintained SKF and DKNIM rules for network governance, contributing to system stability and security." }
    ],
    skills: "Email Security, Email Administration and +3 skills",
    icon: "Server"
  },
  {
    title: "Technical Support Administrator",
    org: "HackingFlix",
    period: "Jun 2023 – May 2025",
    duration: "2 yrs",
    type: "Full-time",
    location: "India · Remote",
    overview: "Responsible for providing end-to-end technical assistance to students and professionals, ensuring smooth platform operations and high-quality learning experiences.",
    responsibilities: [
      { label: "Technical Support", detail: "Assisting users in resolving technical issues, clarifying doubts, and providing prompt support." },
      { label: "Documentation", detail: "Contributing to technical documentation and engaging knowledge content to make concepts more accessible." },
      { label: "System Administration", detail: "Supporting system administration tasks, including user account management, access permissions, and monitoring for security and performance." },
      { label: "Governance (SoD)", detail: "Gaining exposure to Segregation of Duties (SoD) and access control practices, ensuring compliance and preventing unauthorized activities." },
      { label: "Cross-functional Collaboration", detail: "Collaborating with cross-functional teams on technical projects to enhance the reliability, scalability, and security of the platform." }
    ],
    skills: "Information Technology Infrastructure, Technical Support and +3 skills",
    icon: "Terminal"
  }
];

export default function ExperiencePage() {
  const [value, loading] = useCollection(
    query(collection(db, 'experience'), orderBy('period', 'desc')),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const experiences = useMemo(() => {
    const dbExp = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbExp.length > 0 ? dbExp : FALLBACK_EXP;
  }, [value]);

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Work Experience</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">Authorized operational logs & deployment history.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-12 pb-20">
          {experiences.map((exp: any, idx: number) => {
            const Icon = ICON_MAP[exp.icon || 'Shield'] || Shield;
            return (
              <motion.div 
                key={exp.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/10 group-hover:bg-accent/40 transition-colors" />
                <div className="cyber-glass p-8 md:p-10 border-l-4 border-l-primary hover:border-l-accent transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-48 h-48" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all shrink-0">
                        <Icon className="w-8 h-8 text-primary group-hover:text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-headline group-hover:text-glow uppercase tracking-tight">{exp.title}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                          <span className="text-[10px] font-code text-accent uppercase tracking-widest flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {exp.org} · {exp.type || 'Full-time'}
                          </span>
                          <span className="text-[10px] font-code text-primary/40 uppercase flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {exp.period} {exp.duration && `· ${exp.duration}`}
                          </span>
                        </div>
                        <p className="text-[9px] font-code text-primary/30 uppercase mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                     <p className="text-sm font-code text-primary/80 leading-relaxed border-l border-primary/20 pl-4 italic">
                      {exp.overview}
                     </p>

                     {exp.responsibilities && (
                       <div className="space-y-4">
                         <div className="text-[10px] font-code text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                           <Zap className="w-3 h-3" /> Key Responsibilities
                         </div>
                         <div className="grid grid-cols-1 gap-3">
                           {exp.responsibilities.map((resp: any, rIdx: number) => (
                             <div key={rIdx} className="space-y-1">
                               <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{resp.label}:</span>
                               <p className="text-[11px] font-code text-primary/60 leading-tight">{resp.detail}</p>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}

                     {exp.skills && (
                       <div className="pt-4 border-t border-primary/10">
                         <div className="text-[9px] font-code text-primary/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                           <Terminal className="w-3 h-3" /> Endorsed Skills
                         </div>
                         <p className="text-[10px] font-code text-primary/70">{exp.skills}</p>
                       </div>
                     )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-primary/10 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-accent animate-pulse" />
                      <span className="text-[10px] font-code text-accent uppercase tracking-widest">Active Node Verified</span>
                    </div>
                    <div className="flex gap-2">
                       <Lock className="w-4 h-4 text-primary/20" />
                       <Terminal className="w-4 h-4 text-primary/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
