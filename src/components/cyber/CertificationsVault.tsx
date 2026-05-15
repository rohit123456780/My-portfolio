
"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, Shield, CheckCircle2, Star, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Certification {
  name: string;
  issuer: string;
  category: string;
  featured?: boolean;
}

const ALL_CERTS: Certification[] = [
  // API & Web Security
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API & Web Security" },
  { name: "Certified API Security Analyst", issuer: "APIsec University", category: "API & Web Security" },
  { name: "API Security Fundamentals", issuer: "APIsec University", category: "API & Web Security" },
  { name: "Certified REST Engineer", issuer: "Cyber NOW Education", category: "API & Web Security" },
  { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", category: "API & Web Security" },
  
  // Penetration Testing
  { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2 Cybersecurity Institute", category: "Penetration Testing" },
  { name: "Certified Red Team Operations Management (CRTOM)", issuer: "Red Team Leaders", category: "Penetration Testing" },
  { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", category: "Penetration Testing" },
  { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Hack & Fix", category: "Penetration Testing" },
  { name: "Certified Vulnerability Analyst (C-VA)", issuer: "Sturtle Security Pvt Ltd", category: "Penetration Testing" },
  { name: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council", category: "Penetration Testing" },
  { name: "Cyber Security White Hat Hacker Level 1", issuer: "MOCT College", category: "Penetration Testing" },
  { name: "Be A White Hat Hacker and Pen Tester", issuer: "EDUONIX", category: "Penetration Testing" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Penetration Testing" },

  // Network & Infrastructure
  { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group", category: "Network & Infrastructure" },
  { name: "Network Defense Essentials (NDE)", issuer: "EC-Council", category: "Network & Infrastructure" },
  { name: "Networking Essentials", issuer: "Cisco Networking Academy", category: "Network & Infrastructure" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", category: "Network & Infrastructure" },
  { name: "CCNAv7: Enterprise Networking Security and Automation", issuer: "Cisco", category: "Network & Infrastructure" },
  { name: "Cybersecurity Essentials", issuer: "Linux Foundation", category: "Network & Infrastructure" },
  { name: "Certified Linux File System Professional", issuer: "Linux Foundation", category: "Network & Infrastructure" },
  { name: "OPSWAT File Security Associate", issuer: "OPSWAT", category: "Network & Infrastructure" },
  { name: "Critical Infrastructure Protection", issuer: "OPSWAT Academy", category: "Network & Infrastructure" },
  { name: "Fortinet Certified Fundamentals", issuer: "Fortinet", category: "Network & Infrastructure" },
  { name: "Fortinet Certified Associate", issuer: "Fortinet", category: "Network & Infrastructure" },

  // SOC / Intelligence
  { name: "Threat Intelligence Fundamentals", issuer: "SOCRadar", category: "SOC & Intelligence" },
  { name: "Mastering Cyber Threat Intelligence", issuer: "SOCRadar", category: "SOC & Intelligence" },
  { name: "Mastering GenAI Tools for SOC", issuer: "SOCRadar", category: "SOC & Intelligence" },
  { name: "Fundamentals of Dark Web", issuer: "SOCRadar", category: "SOC & Intelligence" },
  { name: "Dark Web Intelligence Crash Course", issuer: "SOCRadar", category: "SOC & Intelligence" },
  { name: "SOC Summit 2026", issuer: "Antisyphon Training", category: "SOC & Intelligence" },
  { name: "Digital Forensics Essentials (DFE)", issuer: "EC-Council", category: "SOC & Intelligence" },
  { name: "Dark Web, Anonymity and Cryptocurrency", issuer: "EC-Council", category: "SOC & Intelligence" },
  { name: "Introduction to OSINT", issuer: "Security Blue Team", category: "SOC & Intelligence" },
  { name: "Cyber Threat Intelligence 101", issuer: "arcX", category: "SOC & Intelligence" },
  { name: "Cyber Security & Digital Forensics", issuer: "IIIT Kota", category: "SOC & Intelligence" },
  { name: "CSI Linux Certified Investigator", issuer: "CSI Linux", category: "SOC & Intelligence" },

  // GRC & Compliance
  { name: "JGRC – Junior GRC Analyst", issuer: "VibeSecurity", category: "GRC & Compliance" },
  { name: "CRPO", issuer: "ICTTF", category: "GRC & Compliance" },
  { name: "CSCSO", issuer: "ICTTF", category: "GRC & Compliance" },
  { name: "ISO/IEC 27001 Information Security Associate", issuer: "ISO", category: "GRC & Compliance" },
  { name: "SC-900 Security, Compliance & Identity", issuer: "Microsoft", category: "GRC & Compliance" },
  { name: "Cybersecurity Awareness Professional Certificate", issuer: "CAPC", category: "GRC & Compliance" },
  { name: "Exposure Management", issuer: "XM Cyber", category: "GRC & Compliance" },
  { name: "Saviynt Identity Security Certification", issuer: "Saviynt", category: "GRC & Compliance" },
  { name: "SailPoint Identity Security Leader", issuer: "SailPoint", category: "GRC & Compliance" },

  // Cloud & AI
  { name: "OCI Certified Multicloud Architect Associate", issuer: "Oracle", category: "Cloud & AI" },
  { name: "AgentForce Specialist", issuer: "Salesforce", category: "Cloud & AI" },
  { name: "Databricks Fundamentals", issuer: "Databricks", category: "Cloud & AI" },
  { name: "Databricks Generative AI Fundamentals", issuer: "Databricks", category: "Cloud & AI" },
  { name: "Databricks AI Agent Fundamentals", issuer: "Databricks", category: "Cloud & AI" },
  { name: "Databricks Platform Administrator", issuer: "Databricks", category: "Cloud & AI" },
  { name: "JDE – Junior DevOps Engineer", issuer: "VibeSecurity", category: "Cloud & AI" },

  // Collaboration
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", featured: true },
  { name: "Baserow Fundamentals", issuer: "Baserow", category: "Collaboration" },
  { name: "Baserow Advanced", issuer: "Baserow", category: "Collaboration" },
  { name: "Egnyte Collaboration Essentials", issuer: "Egnyte", category: "Collaboration" },
  { name: "Zendesk Foundational Support", issuer: "Zendesk", category: "Collaboration" },

  // Google
  { name: "Google Cybersecurity Professional Certificate", issuer: "Google", category: "Google Track", featured: true },
  { name: "Foundations of Cybersecurity", issuer: "Google", category: "Google Track" },
  { name: "Manage Security Risks", issuer: "Google", category: "Google Track" },
  { name: "Networks and Network Security", issuer: "Google", category: "Google Track" },
  { name: "Linux and SQL", issuer: "Google", category: "Google Track" },
  { name: "Assets, Threats & Vulnerabilities", issuer: "Google", category: "Google Track" },
  { name: "Detection and Response", issuer: "Google", category: "Google Track" },
  { name: "Automate Cybersecurity with Python", issuer: "Google", category: "Google Track" },
  { name: "Prepare for Cybersecurity Jobs", issuer: "Google", category: "Google Track" },

  // Virtual Experience
  { name: "Deloitte Cyber Job Simulation", issuer: "Forage", category: "Virtual Experience" },
  { name: "Fujitsu Cybersecurity Program", issuer: "Forage", category: "Virtual Experience" },
  { name: "TCS Cybersecurity Simulation", issuer: "Forage", category: "Virtual Experience" },
  { name: "Datacom Cybersecurity Simulation", issuer: "Forage", category: "Virtual Experience" },
  { name: "Mastercard Cybersecurity Program", issuer: "Forage", category: "Virtual Experience" },
  { name: "JPMorgan Cybersecurity Program", issuer: "Forage", category: "Virtual Experience" },

  // Awareness (MeitY)
  { name: "Cyber Offences Awareness", issuer: "MeitY - Govt. of India", category: "Awareness" },
  { name: "Cyber Ethics Awareness", issuer: "MeitY - Govt. of India", category: "Awareness" },
  { name: "Password Security Awareness", issuer: "MeitY - Govt. of India", category: "Awareness" },
  { name: "WhatsApp & Facebook Security", issuer: "MeitY - Govt. of India", category: "Awareness" }
];

const CATEGORIES = [
  "ALL",
  "API & Web Security",
  "Penetration Testing",
  "Network & Infrastructure",
  "SOC & Intelligence",
  "GRC & Compliance",
  "Cloud & AI",
  "Collaboration",
  "Google Track",
  "Virtual Experience",
  "Awareness"
];

export default function CertificationsVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredCerts = useMemo(() => {
    return ALL_CERTS.filter(cert => {
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || cert.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="space-y-8 w-full">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-primary/20 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            <span className="text-xs font-code text-accent uppercase tracking-[0.3em]">Credentials Vault</span>
          </div>
          <h2 className="text-4xl font-headline text-glow">
            97+ CERTS <span className="text-primary/50 text-2xl">UNLOCKED</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-code text-primary/50 uppercase">Current Filter Status</p>
            <p className="text-sm font-code text-primary">{filteredCerts.length} Nodes Active</p>
          </div>
          <div className="p-2 border border-primary/20 bg-primary/5">
            <Shield className="w-8 h-8 text-primary/60" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input 
              type="text" 
              placeholder="SEARCH DATASET..." 
              className="w-full bg-primary/5 border border-primary/20 p-3 pl-10 font-code text-xs uppercase focus:border-primary outline-none text-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="cyber-glass p-4 space-y-4">
            <h4 className="text-[10px] font-code text-primary/50 uppercase flex items-center gap-2">
              <Filter className="w-3 h-3" /> Filter Categories
            </h4>
            <div className="flex flex-wrap lg:flex-col gap-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-left px-3 py-1.5 text-[10px] font-code transition-all border border-transparent",
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "text-primary/60 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vault Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, idx) => (
                <motion.div
                  key={cert.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.5) }}
                  className={cn(
                    "group relative p-4 cyber-glass border border-primary/10 hover:border-accent/50 transition-all cursor-crosshair overflow-hidden",
                    cert.featured && "border-accent/40 bg-accent/5 shadow-[0_0_15px_hsla(var(--accent),0.1)]"
                  )}
                >
                  {cert.featured && (
                    <div className="absolute top-0 right-0 p-1 bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-code text-primary/40 uppercase tracking-widest">{cert.category}</span>
                      {cert.featured ? <Zap className="w-3 h-3 text-accent animate-pulse" /> : <CheckCircle2 className="w-3 h-3 text-primary/30" />}
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-headline group-hover:text-glow transition-all line-clamp-2 min-h-[2rem]">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] font-code text-primary/60 uppercase mt-1">{cert.issuer}</p>
                    </div>

                    <div className="pt-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-code text-accent uppercase">Verified node</span>
                      <div className="w-8 h-[1px] bg-accent/30" />
                    </div>
                  </div>

                  {/* Decorative Scanline for Cards */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-[1px] bg-accent/20 absolute -top-1 animate-[scanline_2s_linear_infinite]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCerts.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-primary/20 opacity-40">
              <Terminal className="w-12 h-12 mb-4" />
              <p className="font-code text-sm uppercase">No matching nodes found in database</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
