
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Terminal, Code, Database, Mail, Activity, Info, X, Eye, Lock, Globe, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  org?: string;
  period: string;
  description: string;
  tools: string[];
  impact: string;
  details: string;
  category: 'Infrastructure' | 'Database' | 'Lab' | 'Web Sec' | 'Tools' | 'Crypto' | 'Monitoring';
}

const PROJECTS: Project[] = [
  {
    title: "SquaredUp MSS Dashboard Project",
    org: "Radian Generation",
    period: "Feb 2026 – Present",
    description: "Build and validate site-level security and operations dashboards providing real-time visibility for MSS customers.",
    tools: ["Splunk", "Zendesk", "SquaredUp", "Data Ingestion", "Telemetry Mapping"],
    impact: "Supports administrative cybersecurity by ensuring accurate security monitoring and reliable incident visibility.",
    category: "Infrastructure",
    details: "Built site-level dashboards integrating Zendesk and Splunk data. Tasks include verifying data ingestion, applying filters/mappings, and troubleshooting telemetry gaps due to configuration issues."
  },
  {
    title: "Baserow Database Transition",
    org: "Radian Generation",
    period: "Jan 2026 – Present",
    description: "Driving administrative cybersecurity migration, transforming spreadsheet-based Ops Lists into role-based systems.",
    tools: ["Baserow", "Database Normalization", "Security Roles", "Access Management"],
    impact: "Created a reliable system of record supporting MSS/MCS operations and compliance tracking.",
    category: "Database",
    details: "Normalizing site data and assigning cybersecurity roles (Forwarder, Compliance, O&M). Linking contacts to entities and sites while eliminating duplicates to ensure data integrity."
  },
  {
    title: "Secure Mail Infrastructure & Hardening",
    org: "Tech Trek Events",
    period: "Jun 2025 – Aug 2025",
    description: "Designed and configured domain-based email infrastructure with Microsoft Outlook hardening.",
    tools: ["cPanel", "Outlook", "IMAP/SMTP", "SSL/TLS (Ports 465/587)"],
    impact: "Ensured smooth and secure email communication through hardening and protocol troubleshooting.",
    category: "Infrastructure",
    details: "Configured professional email accounts with manual Outlook setup. Handled troubleshooting for authentication failures and SSL configurations for mission-critical comms."
  },
  {
    title: "Cybersecurity Ops & Threat Analysis Lab",
    org: "Independent / Springboard",
    period: "Mar 2023 – Dec 2023",
    description: "10-month hands-on lab environment focusing on security operations and threat detection.",
    tools: ["Python", "PowerShell", "Forensics Tools", "SOC Simulation", "IDS/IPS"],
    impact: "Gained practical experience in incident response and defensive security by replicating real-world attack scenarios.",
    category: "Lab",
    details: "Built secure virtual infrastructures. Performed technical security assessments and remediation of web flaws. Established a digital forensics lab for investigating compromised systems."
  },
  {
    title: "AI-Based XSS Detection System",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    description: "Machine learning-based system to detect cross-site scripting (XSS) with high accuracy.",
    tools: ["Machine Learning", "Python", "Labeled Payloads", "Payload Classification"],
    impact: "Integrated ML models to distinguish malicious from benign inputs in real time.",
    category: "Web Sec",
    details: "Designed classification models trained on extensive payload datasets. Produced detailed methodology reports for high-accuracy detection deployment."
  },
  {
    title: "Web Pentest – OWASP Juice Shop",
    org: "Sturtle Security",
    period: "May 2024 – Jul 2024",
    description: "Thorough penetration testing on OWASP Juice Shop to identify critical vulnerabilities.",
    tools: ["OWASP ZAP", "Burp Suite", "CVSS", "XSS/SQLi", "IDOR"],
    impact: "Produced detailed findings reports with risk ratings and remediation recommendations.",
    category: "Web Sec",
    details: "Identified XSS, SQL Injection, IDOR, and Broken Authentication. Delivered PoC exploits and hardened remediation strategies based on CVSS scores."
  },
  {
    title: "Web Vulnerability Scanner",
    org: "Independent",
    period: "Jun 2024 – Jul 2024",
    description: "Automated scanner for crawling and testing web applications for common vulnerabilities.",
    tools: ["Python", "Fuzzing Techniques", "IDOR Detection", "XSS/SQLi Scans"],
    impact: "Automated the detection process for common web flaws with configurable depth.",
    category: "Tools",
    details: "Developed a custom scanner in Python implementing fuzzing for vulnerability discovery. Provided formatted output documentation for easy analysis."
  },
  {
    title: "Network Packet Analyzer & Sniffer",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Python-based tool to capture and analyze live network traffic for security auditing.",
    tools: ["Python", "Scapy", "Network Protocols", "Traffic Sniffing"],
    impact: "Enabled real-time security analysis of network behavior and protocol breakdowns.",
    category: "Tools",
    details: "Built a packet sniffer and analyzer to extract IP addresses, protocols, and payload information. Critical for monitoring suspicious network activities."
  },
  {
    title: "Image Encryption (Pixel XOR)",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Encryption system using pixel-level XOR operations to secure visual data.",
    tools: ["Python", "Cryptography", "Symmetric Encryption", "Image Processing"],
    impact: "Demonstrated practical application of symmetric cryptography for secure visual storage.",
    category: "Crypto",
    details: "Developed a reversible decryption system using pixel manipulation techniques. Focus on ensuring secure image storage and transmission."
  },
  {
    title: "Caesar Cipher Encryption Tool",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Python tool for text encryption/decryption using classical substitution ciphers.",
    tools: ["Python", "Classical Cryptography", "Substitution Ciphers"],
    impact: "Educational tool demonstrating foundational cryptographic principles.",
    category: "Crypto",
    details: "Created a customizable tool for text security using the Caesar algorithm. Allows user-defined shift values for learning-based encryption tests."
  },
  {
    title: "Password Complexity Checker",
    org: "Msinterface Technologies",
    period: "Jun 2024 – Jul 2024",
    description: "Evaluates password strength based on entropy, diversity, and length.",
    tools: ["Python", "Entropy Calculation", "Heuristics", "Visual Feedback"],
    impact: "Helps users understand and improve their password security practices through visual metrics.",
    category: "Tools",
    details: "Built a tool checking for special characters, character variety, and length. Integrated visual strength indicators for better user awareness."
  },
  {
    title: "Secure Login Page Development",
    org: "Trimbak Infotech",
    period: "Jul 2024",
    description: "Authentication system with input validation and bcrypt password hashing.",
    tools: ["Bcrypt", "PHP/SQL", "Input Validation", "Session Hardening"],
    impact: "Protected systems against SQL Injection, XSS, and brute force attacks.",
    category: "Web Sec",
    details: "Implemented rate limiting, secure cookie handling, and robust session management to prevent common OWASP authentication threats."
  },
  {
    title: "Metasploit Payload Development",
    org: "Trimbak Infotech",
    period: "Jul 2024",
    description: "Developed and tested custom payloads in controlled lab environments.",
    tools: ["Metasploit", "Payload Dev", "Detection Signatures", "Evasion"],
    impact: "Documented detection signatures and defensive recommendations for security teams.",
    category: "Lab",
    details: "Authorized lab testing of custom payloads. Focused on analyzing behavior and identifying how detection systems flag malicious activities."
  },
  {
    title: "Network Security Monitor",
    org: "Independent",
    period: "Jun 2024",
    description: "IDS/IPS monitoring systems set up to detect suspicious traffic patterns.",
    tools: ["IDS/IPS", "Alert Configuration", "Traffic Simulation", "Suricata/Snort"],
    impact: "Validated detection capabilities against simulated attack traffic.",
    category: "Monitoring",
    details: "Configured alert rules and tested them against simulated attacks to ensure robust monitoring and intrusion detection."
  }
];

export default function MissionSelect() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-xs font-code text-accent uppercase tracking-[0.3em]">Operational Readiness</span>
          </div>
          <h2 className="text-4xl font-headline text-glow">
            MISSION <span className="text-primary/50">SELECT</span>
          </h2>
          <p className="text-[10px] font-code text-primary/40 uppercase max-w-md">
            Tracing {PROJECTS.length} major deployments. Access technical narratives and impact reports for the complete project dataset.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj, idx) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedProject(proj)}
            className="group relative cyber-glass p-6 border border-primary/10 hover:border-primary transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                {proj.category === 'Infrastructure' && <Shield className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Database' && <Database className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Lab' && <Terminal className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Web Sec' && <Code className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Tools' && <Zap className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Crypto' && <Lock className="w-5 h-5 text-primary group-hover:text-accent" />}
                {proj.category === 'Monitoring' && <Eye className="w-5 h-5 text-primary group-hover:text-accent" />}
              </div>
              <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{proj.period}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-headline group-hover:text-glow transition-all leading-tight">{proj.title}</h3>
              <p className="text-[10px] font-code text-primary/70 line-clamp-2">{proj.description}</p>
              
              <div className="flex flex-wrap gap-1 pt-2">
                {proj.tools.slice(0, 3).map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-primary/5 border border-primary/10 text-[7px] font-code text-primary/60">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-code text-accent uppercase tracking-tighter">View Mission Specs</span>
              <Info className="w-3 h-3 text-accent" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl cyber-glass p-8 relative border-glow max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-primary/20 pb-6">
                  <div className="p-5 bg-primary/10 border border-primary/30">
                    <Activity className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline text-glow">{selectedProject.title}</h3>
                    <p className="text-accent font-code text-xs uppercase tracking-widest">
                      {selectedProject.org ? `${selectedProject.org} | ` : ''}{selectedProject.period}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Technical Narrative</h4>
                      <p className="text-sm font-code leading-relaxed opacity-90">{selectedProject.details}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Operational Impact</h4>
                      <p className="text-sm font-code leading-relaxed text-accent">{selectedProject.impact}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">System Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map(tool => (
                          <span key={tool} className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-code text-primary">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10">
                      <h4 className="text-[10px] font-code text-primary/50 uppercase mb-2">Mission Category</h4>
                      <p className="text-xs font-code font-bold uppercase tracking-widest">{selectedProject.category}</p>
                      <div className="h-1 w-full bg-primary/20 mt-4 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-accent w-full animate-[loading_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-full bg-primary text-primary-foreground py-4 font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all shadow-[0_0_20px_hsla(var(--primary),0.3)]"
                >
                  Close Data Stream
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
