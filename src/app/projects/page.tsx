
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
  { title: "AI-Based XSS Detection", org: "Sturtle Security", period: "2024", details: "ML classification models for real-time XSS detection.", category: "AI Security", tools: ["Python", "TensorFlow"] },
  { title: "Network Packet Analyzer", org: "Msinterface", period: "2024", details: "Real-time traffic sniffing and security analysis.", category: "Networking", tools: ["Scapy", "Python"] },
  { title: "Web Vulnerability Scanner", org: "Msinterface", period: "2024", details: "Python-based fuzzing tool for XSS/SQLi/IDOR.", category: "Offensive Security", tools: ["Python", "Requests"] },
  { title: "Secure Mail Infrastructure", org: "Tech Trek Events", period: "2025", details: "cPanel/Outlook hardening with SSL/TLS implementation.", category: "Infrastructure", tools: ["cPanel", "Outlook"] }
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
        <Link href="/" className="inline-flex items-center gap-2 text-[#00ff9f] hover:text-[#00cfff] transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK_TO_COMMAND
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#00cfff]">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-code uppercase tracking-widest">Accessing Mission Matrix...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase text-[#00ff9f]">Mission Matrix</h1>
          <p className="text-xs font-code text-[#00ff9f]/40 uppercase tracking-widest">{projects.length} High-impact missions verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-[#00cfff]/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-[#00ff9f] animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {projects.map((proj: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/60 backdrop-blur-md p-8 border border-[#00ff9f]/10 hover:border-[#00ff9f] transition-all group relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-code text-[#00cfff] uppercase tracking-[0.3em] font-bold">{proj.category || 'Security'} Node</span>
                  <h3 className="text-3xl font-headline uppercase group-hover:text-glow transition-all tracking-tighter leading-none text-[#00ff9f]">{proj.title}</h3>
                  <p className="text-[10px] font-code text-[#00ff9f]/40 uppercase tracking-widest">{proj.org} | {proj.period}</p>
                </div>

                <p className="text-sm font-code text-[#00ff9f]/70 leading-relaxed min-h-[80px] border-l-2 border-[#00ff9f]/10 pl-4">
                  {proj.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tools?.map((tool: string) => (
                    <span key={tool} className="px-2 py-1 bg-[#00ff9f]/5 border border-[#00ff9f]/20 text-[9px] font-code text-[#00ff9f] uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
