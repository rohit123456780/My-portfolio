
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Activity, ArrowLeft, Zap, Box, Lock } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_PROJECTS = [
  { 
    title: "SquaredUp MSS Dashboard", 
    org: "Radian Generation", 
    period: "Feb 2026 – Present", 
    details: "Creating and validating site-level security and operations dashboards for real-time visibility into Zendesk and Splunk data. Involves building dashboards, applying filters/mappings, and identifying telemetry gaps.", 
    category: "Infrastructure", 
    tools: ["SquaredUp", "Splunk", "Zendesk", "Data Validation"] 
  },
  { 
    title: "Baserow Database Transition", 
    org: "Radian Generation", 
    period: "Jan 2026 – Present", 
    details: "Administrative cybersecurity migration in Baserow, transforming the Ops List into a clean, role-based Sites and Contacts system for compliance tracking and security administration.", 
    category: "Data Systems", 
    tools: ["Baserow", "Data Governance", "RBAC", "Normalization"] 
  },
  { 
    title: "Secure Mail Infrastructure & Outlook Hardening", 
    org: "Tech Trek Events", 
    period: "Jun 2025 – Aug 2025", 
    details: "Deployment of domain-based email systems using cPanel and hardening Microsoft Outlook via IMAP/SMTP secure ports and SSL configurations.", 
    category: "Infrastructure", 
    tools: ["cPanel", "Outlook", "IMAP/SMTP", "SSL/TLS", "DNS"] 
  },
  { 
    title: "AI-Based XSS Detection System", 
    org: "Sturtle Security", 
    period: "May 2024 – Jul 2024", 
    details: "Designed a machine learning-based system to detect cross-site scripting (XSS) vulnerabilities in web applications.", 
    category: "AI Security", 
    tools: ["Python", "Machine Learning", "TensorFlow", "Web Security"] 
  },
  { 
    title: "Basic Keylogger", 
    org: "Personal Lab", 
    period: "Jun 2024 – Jul 2024", 
    details: "Developed a basic keylogging application to record keystrokes for educational purposes in understanding security risks.", 
    category: "Offensive", 
    tools: ["Python", "Pynput", "Security Awareness"] 
  },
  { 
    title: "Caesar Cipher Encryption Tool", 
    org: "HackingFlix", 
    period: "Jun 2024 – Jul 2024", 
    details: "Created a Python tool for encrypting and decrypting text using the Caesar Cipher algorithm with customizable shift values.", 
    category: "Crypto", 
    tools: ["Python", "Cryptography", "Algorithms"] 
  },
  { 
    title: "Image Encryption using Pixel Manipulation", 
    org: "ShadowFox", 
    period: "Jun 2024 – Jul 2024", 
    details: "Developed an image encryption system using pixel-level XOR operations to secure visual data and allow reversible decryption.", 
    category: "Crypto", 
    tools: ["Python", "Pillow", "XOR Operations"] 
  },
  { 
    title: "Network Packet Analyzer", 
    org: "Msinterface Technologies", 
    period: "Jun 2024 – Jul 2024", 
    details: "Created a tool to analyze captured packets and display relevant network details such as source/destination IPs and protocols.", 
    category: "Networking", 
    tools: ["Scapy", "Python", "Wireshark"] 
  },
  { 
    title: "Network Sniffer", 
    org: "Msinterface Technologies", 
    period: "Jun 2024 – Jul 2024", 
    details: "Built a Python-based packet sniffer to capture and analyze real-time network traffic, extracting IP/protocol data.", 
    category: "Networking", 
    tools: ["Python", "Raw Sockets", "Packet Capture"] 
  },
  { 
    title: "Password Complexity Checker", 
    org: "ShadowFox", 
    period: "Jun 2024 – Jul 2024", 
    details: "Built a tool to evaluate password strength based on criteria such as length, character diversity, and entropy.", 
    category: "Security", 
    tools: ["Python", "Regex", "Entropy Analysis"] 
  },
  { 
    title: "Secure Login Page Development", 
    org: "StartHere", 
    period: "Jul 2024 – Jul 2024", 
    details: "Developed a secure authentication system implementing input validation, password hashing (bcrypt), and session management.", 
    category: "DevSecOps", 
    tools: ["Node.js", "bcrypt", "Session Management"] 
  },
  { 
    title: "Web Vulnerability Scanner", 
    org: "Msinterface Technologies", 
    period: "Jun 2024 – Jul 2024", 
    details: "Developed an automated scanner capable of crawling web applications for XSS, SQLi, and IDOR vulnerabilities using custom fuzzing.", 
    category: "Offensive", 
    tools: ["Python", "Fuzzing", "Requests", "Vuln Scanning"] 
  },
  { 
    title: "Network Security Monitor", 
    org: "SecureSphere", 
    period: "Jun 2024 – Jun 2024", 
    details: "Set up monitoring systems to detect suspicious traffic and respond to potential intrusions using IDS/IPS methodologies.", 
    category: "Defensive", 
    tools: ["Snort", "IDS/IPS", "Monitoring"] 
  },
  { 
    title: "Cybersecurity Operations & Threat Analysis Lab", 
    org: "TechnoTrench", 
    period: "Mar 2023 – Dec 2023", 
    details: "Designed and implemented a comprehensive 10-month lab environment focusing on security operations, threat detection, and digital forensics.", 
    category: "Ops", 
    tools: ["Virtualization", "SIEM", "Python", "Digital Forensics", "PowerShell"] 
  }
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
