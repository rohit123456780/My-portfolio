
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, CheckCircle2, Zap, Terminal, Activity, Shield } from 'lucide-react';
import Link from 'next/link';

const CERT_GROUPS = [
  {
    category: "API & Web Security",
    certs: [
      { name: "APISEC Certified Professional", issuer: "APIsec University", id: "01733775-8dc0-41f1-8133-185e919d4e46" },
      { name: "Certified API Security Analyst", issuer: "APIsec University", id: "8c4bbbea-3e23-4c8d-9b49-469bf1c4c8a1" },
      { name: "API Security Fundamentals", issuer: "APIsec University" },
      { name: "Certified REST Engineer", issuer: "Cyber NOW Education", id: "2ec1040114748" },
      { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", id: "8366839" }
    ]
  },
  {
    category: "Penetration Testing & Ethical Hacking",
    certs: [
      { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2 Cybersecurity Institute", id: "23231-169-796-7246" },
      { name: "Certified Red Team Operations Management (CRTOM)", issuer: "Red Team Leaders" },
      { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders" },
      { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Hack & Fix", id: "2347-2827-4889-2127" },
      { name: "Certified Vulnerability Analyst (C-VA)", issuer: "Sturtle Security Pvt Ltd", id: "STURSEC/CVA/2024/009" },
      { name: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council", id: "233321" },
      { name: "Cyber Security White Hat Hacker Level 1", issuer: "MOCT College", id: "MTJ R6YLU8-CE000862" },
      { name: "Be A White Hat Hacker and Pen Tester", issuer: "EDUONIX" },
      { name: "Ethical Hacker", issuer: "Cisco Networking Academy" }
    ]
  },
  {
    category: "Network & Infrastructure Security",
    certs: [
      { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group", id: "8813475" },
      { name: "Network Defense Essentials (NDE)", issuer: "EC-Council", id: "236975" },
      { name: "Networking Essentials", issuer: "Cisco Networking Academy" },
      { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy" },
      { name: "CCNAv7: Enterprise Networking Security and Automation", issuer: "Cisco Networking Academy" },
      { name: "Cybersecurity Essentials (LFC108)", issuer: "The Linux Foundation", id: "LF-gqojdj219m" },
      { name: "Certified Linux File System Professional", issuer: "CCSR", id: "TESTING92324615" },
      { name: "OPSWAT File Security Associate", issuer: "OPSWAT", id: "4iyCdoBD4g" },
      { name: "Introduction to Critical Infrastructure Protection", issuer: "OPSWAT Academy", id: "e8QYOZQPuQ" },
      { name: "Fortinet Certified Fundamentals", issuer: "Fortinet", id: "2469397420RR" },
      { name: "Fortinet Certified Associate", issuer: "Fortinet", id: "2001131314RR" }
    ]
  },
  {
    category: "SOC, Threat Intel & Digital Forensics",
    certs: [
      { name: "Threat Intelligence Fundamentals", issuer: "SOCRadar", id: "b3deb5fc-..." },
      { name: "Mastering Cyber Threat Intelligence", issuer: "SOCRadar", id: "38a82901-..." },
      { name: "Mastering Gen AI Tools for SOC", issuer: "SOCRadar", id: "118751be-..." },
      { name: "Fundamentals of Dark Web", issuer: "SOCRadar" },
      { name: "Dark Web Crash Course", issuer: "SOCRadar" },
      { name: "SOC Summit 2026", issuer: "Antisyphon Training" },
      { name: "Digital Forensics Essentials (DFE)", issuer: "EC-Council" },
      { name: "Intro to Dark Web & Crypto", issuer: "EC-Council" },
      { name: "Introduction to OSINT", issuer: "Security Blue Team" },
      { name: "Cyber Threat Intelligence 101", issuer: "arcX" },
      { name: "Cyber Security & Digital Forensics", issuer: "IIIT Kota" },
      { name: "CSI Linux Certified Investigator", issuer: "CSI Linux" }
    ]
  },
  {
    category: "GRC, Compliance & Governance",
    certs: [
      { name: "JGRC – Junior GRC Analyst", issuer: "VibeSecurity" },
      { name: "CRPO – ICTTF United for Cyber Resilience", issuer: "ICTTF" },
      { name: "CSCSO – ICTTF United for Cyber Resilience", issuer: "ICTTF" },
      { name: "ISO/IEC 27001 Information Security Associate", issuer: "SkillFront" },
      { name: "SC-900: Microsoft Security Fundamentals", issuer: "Microsoft" },
      { name: "Cybersecurity Awareness (CAPC)", issuer: "Certiprof" },
      { name: "Cyber Security Awareness Programme", issuer: "NIELIT" },
      { name: "Exposure Management", issuer: "XM Cyber" },
      { name: "Saviynt Identity Security", issuer: "Saviynt" },
      { name: "SailPoint Identity Security Leader", issuer: "SailPoint" },
      { name: "DLA Piper – Global Cyber Simulation", issuer: "Forage" }
    ]
  },
  {
    category: "Cloud, AI & Platforms",
    certs: [
      { name: "OCI Certified Multicloud Architect Associate", issuer: "Oracle" },
      { name: "AgentForce Specialist", issuer: "Salesforce" },
      { name: "Databricks Fundamentals", issuer: "Databricks" },
      { name: "Generative AI Fundamentals", issuer: "Databricks" },
      { name: "AI Agent Fundamentals", issuer: "Databricks" },
      { name: "Platform Administrator", issuer: "Databricks" },
      { name: "AWS Databricks Platform Architect", issuer: "Databricks" },
      { name: "Azure Databricks Platform Architect", issuer: "Databricks" },
      { name: "GCP Databricks Platform Architect", issuer: "Databricks" },
      { name: "JDE – Junior DevOps Engineer", issuer: "VibeSecurity" },
      { name: "Baserow Expert", issuer: "Baserow" },
      { name: "Baserow Advanced", issuer: "Baserow" },
      { name: "Egnyte Collaboration Essentials", issuer: "Egnyte" },
      { name: "Foundational Support", issuer: "Zendesk" }
    ]
  },
  {
    category: "Google Cybersecurity (Professional Specialization)",
    certs: [
      { name: "Foundations of Cybersecurity", issuer: "Google/Coursera" },
      { name: "Play It Safe: Manage Security Risks", issuer: "Google/Coursera" },
      { name: "Connect and Protect: Networks", issuer: "Google/Coursera" },
      { name: "Tools and Trade: Linux and SQL", issuer: "Google/Coursera" },
      { name: "Assets, Threats & Vulnerabilities", issuer: "Google/Coursera" },
      { name: "Sound the Alarm: Detection & Response", issuer: "Google/Coursera" },
      { name: "Automate Tasks with Python", issuer: "Google/Coursera" },
      { name: "Prepare for Cybersecurity Jobs", issuer: "Google/Coursera" },
      { name: "Google Cybersecurity Professional Certificate", issuer: "Coursera" }
    ]
  },
  {
    category: "Virtual Experience Programs",
    certs: [
      { name: "Cyber Job Simulation", issuer: "Deloitte" },
      { name: "Cybersecurity Virtual Experience", issuer: "Fujitsu/Springpod" },
      { name: "Cybersecurity Analyst Simulation", issuer: "TCS / Forage" },
      { name: "Cybersecurity Job Simulation", issuer: "Datacom / Forage" },
      { name: "Intro to Cybersecurity Simulation", issuer: "Commonwealth Bank" },
      { name: "Shields Up Program", issuer: "AIG / Forage" },
      { name: "Cyber Security Consulting", issuer: "PwC / Forage" },
      { name: "Cybersecurity Virtual Case", issuer: "PwC / Forage" },
      { name: "Cybersecurity Experience", issuer: "Telstra / Forage" },
      { name: "Mastercard Program", issuer: "Mastercard / Forage" },
      { name: "JPMorgan Chase & Co. Simulation", issuer: "JPMorgan" },
      { name: "Cyber@ANZ Program", issuer: "ANZ / Forage" },
      { name: "Global Virtual Internship", issuer: "Clifford Chance" }
    ]
  },
  {
    category: "MeitY - Cybersecurity Awareness",
    certs: [
      { name: "Cyber Offences Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Cyber Ethics Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Password Security Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Cyber Stalking Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Whatsapp Security Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Facebook Security Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Email Security Awareness", issuer: "MeitY (Gov of India)" },
      { name: "Cyber Bullying Awareness", issuer: "MeitY (Gov of India)" }
    ]
  },
  {
    category: "Specialist & Misc",
    certs: [
      { name: "Geo-data Sharing and Cyber Security", issuer: "ISRO" },
      { name: "IoT: Internet of Things", issuer: "SVS College" },
      { name: "Cybersecurity Specialist", issuer: "TheDigitalAdda" },
      { name: "Certified Cyber Warrior", issuer: "HackingFlix" }
    ]
  }
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-code uppercase tracking-widest">Scanning Credential Nebula...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Credential Nebula</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">97+ Professional Nodes Identified & Verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-24 pb-20">
          {CERT_GROUPS.map((group, groupIdx) => (
            <section key={groupIdx} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/10" />
                <h2 className="text-xs font-code text-accent uppercase tracking-[0.5em]">{group.category}</h2>
                <div className="h-px flex-1 bg-primary/10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.certs.map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="cyber-glass p-6 border border-primary/5 hover:border-accent group transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Award className="w-5 h-5 text-primary/40 group-hover:text-accent transition-colors" />
                        <CheckCircle2 className="w-4 h-4 text-accent/20 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-headline uppercase leading-tight group-hover:text-glow">{cert.name}</h3>
                        <p className="text-[9px] font-code text-primary/40 uppercase">{cert.issuer}</p>
                      </div>
                      {cert.id && (
                        <div className="pt-4 border-t border-primary/5">
                          <p className="text-[7px] font-code text-primary/20 uppercase tracking-tighter">ID: {cert.id}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
          
          <div className="p-16 border border-primary/10 bg-primary/5 text-center space-y-4">
             <Activity className="w-8 h-8 text-primary/20 mx-auto animate-pulse" />
             <p className="text-[10px] font-code text-primary/30 uppercase tracking-[0.4em]">Aether Intelligence System: All 97 Nodes Successfully Synced.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
