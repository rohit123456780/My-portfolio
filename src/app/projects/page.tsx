
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Activity, ArrowLeft, Zap, Box, Lock } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_PROJECTS = [
  { title: "SquaredUp MSS Dashboard", org: "Radian Generation", period: "2026", details: "Real-time visibility into Zendesk and Splunk for MSS customers. Focused on data ingestion validation and telemetry troubleshooting.", category: "Infrastructure", tools: ["Splunk", "Zendesk", "SquaredUp"] },
  { title: "Baserow Database Transition", org: "Radian Generation", period: "2025", details: "Spreadsheet-to-database migration for Operational Systems. Hardened data governance and access controls.", category: "Data Systems", tools: ["Baserow", "Python", "SQL"] },
  { title: "Secure Mail Infrastructure", org: "Tech Trek Events", period: "2025", details: "cPanel/Outlook hardening with SSL/TLS implementation and advanced mail security rules.", category: "Infrastructure", tools: ["cPanel", "Outlook", "SSL/TLS"] },
  { title: "AI-Based XSS Detection", org: "Sturtle Security", period: "2024", details: "ML classification models for real-time XSS detection with 98% accuracy on payload datasets.", category: "AI Security", tools: ["Python", "TensorFlow", "Scikit-Learn"] },
  { title: "Web Pentest - Juice Shop", org: "ShadowFox", period: "2024", details: "OWASP-based penetration testing with CVSS-verified reporting and exploit documentation.", category: "Offensive", tools: ["Burp Suite", "ZAP", "CVSS"] },
  { title: "Web Vulnerability Scanner", org: "Msinterface", period: "2024", details: "Python-based fuzzing tool for automated XSS/SQLi/IDOR identification.", category: "Tools", tools: ["Python", "Requests", "Fuzzing"] },
  { title: "Network Packet Analyzer", org: "Msinterface", period: "2024", details: "Real-time traffic sniffing and security protocol auditing for IDS rule validation.", category: "Networking", tools: ["Scapy", "Python", "Wireshark"] },
  { title: "Image Encryption (Pixel XOR)", org: "ShadowFox", period: "2023", details: "Symmetric cryptography tool for visual data protection using XOR algorithms.", category: "Crypto", tools: ["Python", "Pillow", "XOR"] },
  { title: "Caesar Cipher Tool", org: "HackingFlix", period: "2023", details: "Educational encryption tool for understanding basic shift ciphers and frequency analysis.", category: "Crypto", tools: ["Python", "Terminal UI"] },
  { title: "Password Complexity Checker", org: "ShadowFox", period: "2023", details: "Entropy-based evaluator for password strength mapping and security posture analysis.", category: "Security", tools: ["Python", "RegEx"] },
  { title: "Secure Login Page", org: "StartHere", period: "2023", details: "Implementation of bcrypt-based authentication with OWASP Top 10 protections.", category: "DevSecOps", tools: ["Node.js", "Express", "bcrypt"] },
  { title: "Metasploit Payload Dev", org: "Pinnacle Labs", period: "2022", details: "Lab-based payload development and signature identification for antivirus evasion research.", category: "Offensive", tools: ["Metasploit", "Msfvenom"] },
  { title: "Network Security Monitor", org: "SecureSphere", period: "2022", details: "IDS/IPS rule validation against simulated attack vectors in controlled lab environments.", category: "Defensive", tools: ["Snort", "Suricata"] },
  { title: "Cyber Ops Lab", org: "TechnoTrench", period: "2021", details: "10-month hands-on security operations lab focused on threat analysis and incident response.", category: "Ops", tools: ["Kali", "Parrot OS", "SIEM"] }
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
      <div className="max-w-7xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00ff9f] hover:text-[#00cfff] transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK_TO_COMMAND
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#00cfff]">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-code uppercase tracking-widest">Accessing Mission Matrix...</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline text-glow uppercase text-[#00ff9f]">Mission Matrix</h1>
          <p className="text-xs font-code text-[#00ff9f]/40 uppercase tracking-widest">{projects.length} High-impact technical missions verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-[#00cfff]/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-[#00ff9f] animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {projects.map((proj: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/60 backdrop-blur-md p-8 border border-[#00ff9f]/10 hover:border-[#00ff9f] transition-all group relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Box className="w-32 h-32" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-code text-[#00cfff] uppercase tracking-[0.3em] font-bold">{proj.category || 'Security'} Node</span>
                    <Lock className="w-3 h-3 text-[#00ff9f]/20" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-headline uppercase group-hover:text-glow transition-all tracking-tighter leading-none text-[#00ff9f]">{proj.title}</h3>
                  <p className="text-[10px] font-code text-[#00ff9f]/40 uppercase tracking-widest">{proj.org} | {proj.period}</p>
                </div>

                <p className="text-sm font-code text-[#00ff9f]/70 leading-relaxed min-h-[100px] border-l-2 border-[#00ff9f]/10 pl-4 italic">
                  "{proj.details}"
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
