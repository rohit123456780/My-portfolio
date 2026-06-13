'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft, Terminal, Cpu, Globe, Zap, Lock, User, Shield, Linkedin, Mail, Phone, Unlock } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUIStore } from '@/lib/store';

const SKILL_CATEGORIES = [
  {
    title: "Enterprise & OT Nodes",
    skills: [
      "Zendesk", "Atlassian Suite", "Jira", "Egnyte", "1Password", "Splunk Cloud", 
      "Splunk Enterprise Security", "Splunk ITSI", "Baserow", "Palo Alto Networks", 
      "SquaredUp", "Database Administration", "Renewable Energy Systems", 
      "Project Management", "Microsoft Project"
    ]
  },
  {
    title: "Infrastructure & IT Ops",
    skills: [
      "Email Security", "Email Administration", "Network Administration", 
      "IT Infrastructure Management", "Domain & DNS Configuration", 
      "Help Desk Support", "System Administration", "Segregation of Duties", 
      "Systems Management", "PHP", "Technical Support", "Network Systems"
    ]
  },
  {
    title: "Security & GRC Sector",
    skills: [
      "ISO 27001", "Information Security Management", "Security Auditing", 
      "IT Audit", "Incident Management", "Phishing Defense", "Risk Operations", 
      "Cyber Security Risk", "Cyber Defense", "Internet Security"
    ]
  },
  {
    title: "Offensive & Tactical Tools",
    skills: [
      "Malware Analysis", "Malware Detection", "Virus Removal", "Malwarebytes", 
      "Social Engineering", "Security Operations", "Application Security", 
      "Cloud Security", "SIEM", "Linux", "Ethical Hacking", "CEH", 
      "Penetration Testing", "Metasploit", "Vulnerability Scanning", 
      "OWASP", "Cyber Warfare", "Nmap", "Kali Linux", "Burp Suite", 
      "Threat Management"
    ]
  }
];

const FALLBACK_EDU = [
  {
    degree: "B.Sc Honours in Advanced Networking and Cyber Security",
    school: "Brainware University, Kolkata",
    period: "2023 - 2027",
    score: "8.86 SGPA"
  }
];

export default function IdentityPage() {
  const [mounted, setMounted] = useState(false);
  const { isVaultUnlocked } = useUIStore();

  const [eduValue] = useCollection(
    query(collection(db, 'education'), orderBy('period', 'desc'))
  );

  const education = useMemo(() => {
    const dbEdu = eduValue?.docs.map(d => ({ id: d.id, ...d.data() })) || [];
    return dbEdu.length > 0 ? dbEdu : FALLBACK_EDU;
  }, [eduValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-widest uppercase">BACK_TO_BASE</span>
        </Link>
        
        <div className="space-y-12">
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-primary/20 pb-12">
            <div className="w-44 h-56 border-2 border-primary/40 bg-primary/5 relative overflow-hidden group flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                <Terminal className="w-20 h-20 text-primary opacity-10 absolute" />
                <Shield className="w-24 h-24 text-primary opacity-5 absolute animate-pulse" />
                <div className="relative z-10 flex flex-col items-center">
                  <User className="w-24 h-24 text-primary group-hover:text-glow transition-all" />
                  <div className="text-[8px] font-code text-primary/40 mt-2 uppercase tracking-[0.2em]">Authorized_Identity</div>
                </div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 animate-[scanline_3s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 border border-primary/20 pointer-events-none" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-glow uppercase text-primary">ROHIT ROY</h1>
                <p className="text-base md:text-lg font-code text-accent uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
                   <Terminal className="w-4 h-4" /> OT Security Engineer
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 border border-primary/40 text-[10px] font-code text-primary uppercase bg-primary/5 tracking-widest">
                  Active Node
                </span>
                <span className="px-3 py-1 border border-accent/40 text-[10px] font-code text-accent uppercase bg-accent/5 tracking-widest">
                  Verified Intel
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Location Intel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cyber-glass p-6 space-y-4 border border-primary/10 hover:border-accent transition-all group">
              <h3 className="text-[10px] font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2 flex items-center gap-2">
                <Globe className="w-3 h-3" /> Academic Node
              </h3>
              <div className="space-y-4">
                {education.map((edu: any, idx: number) => (
                  <div key={edu.id || idx} className="space-y-1">
                    <h4 className="text-lg font-headline text-glow uppercase leading-tight text-primary">{edu.degree}</h4>
                    <p className="text-[10px] font-code text-primary/60 uppercase">{edu.school} | {edu.period}</p>
                    <div className="text-[10px] font-code text-accent uppercase flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Performance: {edu.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-glass p-6 space-y-4 border border-primary/10 hover:border-accent transition-all">
              <h3 className="text-[10px] font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Deployment Intel
              </h3>
              
              <AnimatePresence mode="wait">
                {!isVaultUnlocked ? (
                  <motion.div 
                    key="locked"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center gap-3 p-3 border border-primary/20 bg-primary/5">
                       <MapPin className="w-4 h-4 text-primary" />
                       <div>
                         <p className="text-[8px] font-code text-primary/40 uppercase">Base Location</p>
                         <p className="text-xs font-code text-primary/80">West Bengal, India</p>
                       </div>
                    </div>
                    <Link href="/vault" className="block p-3 border border-primary/20 bg-primary/5 hover:border-accent group transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                      <div className="flex items-center gap-3 relative z-10">
                        <Lock className="w-4 h-4 text-primary group-hover:text-glow" />
                        <div>
                          <p className="text-[8px] font-code text-primary/40 uppercase">Secure Contact Intel</p>
                          <p className="text-[10px] font-code text-accent uppercase tracking-widest">SOLVE_CTF_FOR_ACCESS</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="unlocked"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center gap-3 p-3 border border-accent/20 bg-accent/5">
                      <Unlock className="w-4 h-4 text-accent" />
                      <span className="text-[10px] font-code text-accent uppercase tracking-widest">SECURE_INTEL_DECRYPTED</span>
                    </div>
                    <div className="space-y-2 p-3 border border-primary/10 bg-black/40">
                      <div className="flex items-center gap-3 group">
                        <div className="p-1.5 border border-primary/20 bg-primary/5 group-hover:bg-accent/10 transition-colors">
                          <Linkedin className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs font-code text-primary/80">linkedin.com/in/rohit-roy-rrr</span>
                      </div>
                      <div className="flex items-center gap-3 group">
                        <div className="p-1.5 border border-primary/20 bg-primary/5 group-hover:bg-accent/10 transition-colors">
                          <Mail className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs font-code text-primary/80">dashingraj447@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3 group">
                        <div className="p-1.5 border border-primary/20 bg-primary/5 group-hover:bg-accent/10 transition-colors">
                          <Phone className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs font-code text-primary/80">+91-6294067930</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Skill Matrix Alignment */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2 flex items-center gap-2">
              <Cpu className="w-3 h-3" /> Skill Matrix Alignment (111+ Points)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[8px] font-code text-accent uppercase tracking-widest border-l border-accent/40 pl-2">
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.span 
                        key={sIdx}
                        whileHover={{ scale: 1.05, borderColor: 'hsla(var(--primary), 0.5)', backgroundColor: 'hsla(var(--primary), 0.1)' }}
                        className="px-2 py-0.5 border border-primary/10 bg-primary/5 text-[9px] font-code text-primary/70 uppercase transition-colors hover:text-primary cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  );
}