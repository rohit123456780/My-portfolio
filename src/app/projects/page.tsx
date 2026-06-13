
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Activity, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_PROJECTS = [
  { title: "SquaredUp MSS Dashboard", org: "Radian Generation", period: "2026", details: "Real-time visibility into Zendesk and Splunk for MSS customers.", category: "Infrastructure", tools: ["Splunk", "Zendesk", "SquaredUp"] },
  { title: "Baserow Database Transition", org: "Radian Generation", period: "2025", details: "Spreadsheet-to-database migration for Ops Lists.", category: "Data Architecture", tools: ["Baserow", "Python"] },
  { title: "Secure Mail Infrastructure", org: "Tech Trek Events", period: "2025", details: "cPanel/Outlook hardening with SSL/TLS implementation.", category: "Infrastructure", tools: ["cPanel", "Outlook"] },
  { title: "AI-Based XSS Detection", org: "Sturtle Security", period: "2024", details: "ML classification models for real-time XSS detection.", category: "AI Security", tools: ["Python", "TensorFlow"] },
  { title: "Web Pentest - Juice Shop", org: "Msinterface", period: "2024", details: "CVSS-based reporting and PoC exploits for OWASP Juice Shop.", category: "Offensive Security", tools: ["Burp Suite", "OWASP"] },
  { title: "Web Vulnerability Scanner", org: "Msinterface", period: "2024", details: "Python-based fuzzing tool for XSS/SQLi/IDOR.", category: "Offensive Security", tools: ["Python", "Requests"] },
  { title: "Network Packet Analyzer", org: "Msinterface", period: "2024", details: "Real-time traffic sniffing and security analysis.", category: "Networking", tools: ["Scapy", "Python"] },
  { title: "Image Encryption (Pixel XOR)", org: "Personal", period: "2023", details: "Symmetric cryptography for visual data using Pixel XOR.", category: "Cryptography", tools: ["Python", "PIL"] },
  { title: "Password Complexity Checker", org: "Personal", period: "2023", details: "Entropy-based password strength evaluator.", category: "Security Tools", tools: ["Python"] },
  { title: "Secure Login Page", org: "Personal", period: "2023", details: "bcrypt-based authentication with OWASP protections.", category: "Web Security", tools: ["NodeJS", "bcrypt"] },
  { title: "Metasploit Payload Dev", org: "Personal", period: "2022", details: "Lab-based payload analysis and signature identification.", category: "Offensive Security", tools: ["Metasploit"] },
  { title: "Network Security Monitor", org: "Personal", period: "2022", details: "IDS/IPS rule validation against simulated attacks.", category: "Security Ops", tools: ["Snort", "Zeek"] }
];

export default function ProjectsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'projects'), orderBy('period', 'desc'))
  );

  const projects = useMemo(() => {
    const dbProjects = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbProjects.length > 0 ? dbProjects : FALLBACK_PROJECTS;
  }, [value]);

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-code uppercase tracking-widest">Accessing Mission Matrix...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Mission Matrix</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">{projects.length} High-impact missions verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {projects.map((proj: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em] font-bold">{proj.category || 'Security'} Node</span>
                  <h3 className="text-3xl font-headline uppercase group-hover:text-glow transition-all tracking-tighter leading-none">{proj.title}</h3>
                  <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">{proj.org} | {proj.period}</p>
                </div>

                <p className="text-sm font-code text-primary/70 leading-relaxed min-h-[80px] border-l-2 border-primary/10 pl-4">
                  {proj.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tools?.map((tool: string) => (
                    <span key={tool} className="px-2 py-1 bg-primary/5 border border-primary/20 text-[9px] font-code text-primary uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-primary/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-[10px] font-code text-accent uppercase tracking-widest">Operational Success</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-20">
                    <Terminal className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
