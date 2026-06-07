
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Activity, ArrowLeft, ExternalLink, ShieldCheck, Database, Lock, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const PROJECTS = [
  {
    title: "SquaredUp MSS Dashboard",
    org: "Radian Generation",
    period: "Feb 2026 – Present",
    details: "Built site-level dashboards integrating Zendesk and Splunk data for Managed Security Service customers. Focused on data ingestion validation and telemetry troubleshooting in high-uptime environments.",
    tools: ["Splunk", "Zendesk", "SquaredUp", "SQL"],
    category: "Infrastructure",
    icon: Database
  },
  {
    title: "Baserow Database Transition",
    org: "Radian Generation",
    period: "Nov 2025 – Jan 2026",
    details: "Migrated operational spreadsheet workflows into structured Baserow databases, implementing complex data validation rules and relational mapping for mission-critical OT assets.",
    tools: ["Baserow", "PostgreSQL", "Data Mapping"],
    category: "Data Governance",
    icon: Cpu
  },
  {
    title: "Secure Mail Infrastructure",
    org: "Tech Trek Events",
    period: "May 2025 – Jul 2025",
    details: "Hardened cPanel and Outlook integration with SSL/TLS configurations. Implemented industry-standard SPF, DKIM, and DMARC records to prevent email spoofing and ensure mail deliverability.",
    tools: ["cPanel", "Outlook", "SSL/TLS", "DNS"],
    category: "Network Security",
    icon: ShieldCheck
  },
  {
    title: "Cyber Ops & Threat Analysis Lab",
    org: "Self-Initiated",
    period: "Aug 2024 – Present",
    details: "10-month hands-on lab environment for security operations training. Focused on SIEM log analysis, PCAP inspection, and realistic incident response simulations against advanced threat actors.",
    tools: ["Wazuh", "Wireshark", "Suricata", "Snort"],
    category: "SOC / Analysis",
    icon: Terminal
  },
  {
    title: "AI-Based XSS Detection",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    details: "Designed and trained ML classification models on extensive payload datasets. Implemented real-time inference for filtering malicious web inputs with 98% accuracy.",
    tools: ["Python", "TensorFlow", "Scikit-learn", "Flask"],
    category: "AI Security",
    icon: Cpu
  },
  {
    title: "Web Pentest - Juice Shop",
    org: "ShadowFox",
    period: "May 2024",
    details: "Comprehensive penetration test of OWASP Juice Shop. Identified SQLi, XSS, and Broken Auth vulnerabilities, producing detailed CVSS-based technical reports and PoC exploits.",
    tools: ["Burp Suite", "OWASP ZAP", "Ffuf"],
    category: "Offensive Security",
    icon: Lock
  },
  {
    title: "Web Vulnerability Scanner",
    org: "Msinterface Technologies",
    period: "Jul 2024",
    details: "Developed a Python-based automated fuzzer to detect common web vulnerabilities like XSS, SQLi, and IDOR in targeted web applications. Features multi-threaded scanning capabilities.",
    tools: ["Python", "Requests", "BeautifulSoup"],
    category: "Tool Development",
    icon: Terminal
  },
  {
    title: "Network Packet Analyzer",
    org: "Msinterface Technologies",
    period: "Jun 2024",
    details: "Built a real-time packet sniffer to extract IP/MAC addresses and protocol breakdowns for live security auditing and network troubleshooting using Scapy.",
    tools: ["Python", "Scapy", "Netifaces"],
    category: "Network Tools",
    icon: Globe
  },
  {
    title: "Image Encryption (Pixel XOR)",
    org: "Academic Project",
    period: "2023",
    details: "Implemented symmetric cryptography for visual data using bitwise XOR operations on image pixel values, ensuring secure image transmission and integrity.",
    tools: ["Python", "OpenCV", "NumPy"],
    category: "Cryptography",
    icon: Lock
  },
  {
    title: "Caesar Cipher Tool",
    org: "Educational Project",
    period: "2023",
    details: "Educational tool for text encryption/decryption using shift-based algorithms. Features interactive frequency analysis and brute-force decryption modules.",
    tools: ["HTML/JS", "CSS"],
    category: "Cryptography",
    icon: ShieldCheck
  },
  {
    title: "Password Complexity Checker",
    org: "Security Tool",
    period: "2023",
    details: "Entropy-based password strength evaluator that calculates the time-to-crack using brute force and provides actionable hardening suggestions based on zxcvbn patterns.",
    tools: ["JavaScript", "Regex"],
    category: "AppSec",
    icon: Lock
  },
  {
    title: "Secure Login Page",
    org: "Development Lab",
    period: "2023",
    details: "Authentication system featuring bcrypt-based hashing, salt generation, and session protection mechanisms aligned with OWASP Top 10 best practices.",
    tools: ["Node.js", "Express", "bcrypt", "JWT"],
    category: "DevSecOps",
    icon: ShieldCheck
  },
  {
    title: "Metasploit Payload Dev",
    org: "Offensive Security Lab",
    period: "2023",
    details: "Lab-based payload analysis and signature identification. Focused on bypassing basic AV signatures through encoding and obfuscation techniques.",
    tools: ["Metasploit", "Msfvenom", "Kali Linux"],
    category: "Red Teaming",
    icon: Terminal
  },
  {
    title: "Network Security Monitor",
    org: "Defensive Ops Lab",
    period: "2023",
    details: "IDS/IPS rule validation against simulated attack traffic. Configured and tested Snort rules for real-time alert generation and automated response.",
    tools: ["Snort", "Splunk", "PFsense"],
    category: "IDS / IPS",
    icon: Activity
  }
];

export default function ProjectsPage() {
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">14 High-impact technical case studies & tool developments verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {PROJECTS.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                <proj.icon className="w-32 h-32" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em] font-bold">{proj.category} Node</span>
                  <h3 className="text-3xl font-headline uppercase group-hover:text-glow transition-all tracking-tighter leading-none">{proj.title}</h3>
                  <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">{proj.org} | {proj.period}</p>
                </div>

                <p className="text-sm font-code text-primary/70 leading-relaxed min-h-[80px] border-l-2 border-primary/10 pl-4">
                  {proj.details}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tools.map(tool => (
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
                    <span className="text-[8px] font-code uppercase">mission_id: {idx + 4001}</span>
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
