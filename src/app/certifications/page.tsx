'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, CheckCircle2, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FULL_CERTIFICATIONS_LIST = [
  // API & Web Security
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025", id: "01733775-8dc0-41f1-8133-185e919d4e46" },
  { name: "Certified API Security Analyst", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025", id: "8c4bbbea-3e23-4c8d-9b49-469bf1c4c8a1" },
  { name: "API Security Fundamentals", issuer: "APIsec University", category: "API & Web Security" },
  { name: "Certified REST Engineer", issuer: "Cyber NOW Education", category: "API & Web Security", date: "Jul 2024", id: "2ec1040114748" },
  { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", category: "API & Web Security", date: "Feb 2024", id: "8366839" },

  // Penetration Testing & Ethical Hacking
  { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2", category: "Penetration Testing & Ethical Hacking", date: "Oct 2023", id: "23231-169-796-7246" },
  { name: "Certified Red Team Operations Management (CRTOM)", issuer: "Red Team Leaders", category: "Penetration Testing & Ethical Hacking", date: "Dec 2025" },
  { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", category: "Penetration Testing & Ethical Hacking", date: "Dec 2025" },
  { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Hack & Fix", category: "Penetration Testing & Ethical Hacking", date: "Dec 2025", id: "2347-2827-4889-2127" },
  { name: "Certified Vulnerability Analyst (C-VA)", issuer: "Sturtle Security", category: "Penetration Testing & Ethical Hacking", date: "Apr 2024", id: "STURSEC/CVA/2024/009" },
  { name: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council", category: "Penetration Testing & Ethical Hacking", date: "Jul 2023", id: "233321" },
  { name: "Cyber Security White Hat Hacker Level 1", issuer: "MOCT College", category: "Penetration Testing & Ethical Hacking", date: "Jan 2022", id: "MTJ R6YLU8-CE000862" },
  { name: "Be A White Hat Hacker and Pen Tester", issuer: "EDUONIX", category: "Penetration Testing & Ethical Hacking", date: "Dec 2021" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Penetration Testing & Ethical Hacking", date: "Jan 2024" },

  // Network & Infrastructure Security
  { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group", category: "Network & Infrastructure Security", date: "Jun 2024", id: "8813475" },
  { name: "Network Defense Essentials (NDE)", issuer: "EC-Council", category: "Network & Infrastructure Security", date: "Jul 2023", id: "236975" },
  { name: "Networking Essentials", issuer: "Cisco Networking Academy", category: "Network & Infrastructure Security", date: "Jan 2022" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", category: "Network & Infrastructure Security", date: "Aug 2022" },
  { name: "CCNAv7: Enterprise Networking Security and Automation", issuer: "Cisco Networking Academy", category: "Network & Infrastructure Security", date: "Apr 2024" },
  { name: "Cybersecurity Essentials (LFC108)", issuer: "The Linux Foundation", category: "Network & Infrastructure Security", date: "Jul 2023", id: "LF-gqojdj219m" },
  { name: "Certified Linux File System Professional", issuer: "CCSSR", category: "Network & Infrastructure Security", date: "Jul 2024", id: "TESTING92324615" },
  { name: "OPSWAT File Security Associate", issuer: "OPSWAT", category: "Network & Infrastructure Security", date: "Apr 2025", id: "4iyCdoBD4g" },
  { name: "Introduction to Critical Infrastructure Protection", issuer: "OPSWAT Academy", category: "Network & Infrastructure Security", date: "Jun 2024", id: "e8QYOZQPuQ" },
  { name: "Fortinet Certified Fundamentals", issuer: "Fortinet", category: "Network & Infrastructure Security", date: "Jan 2024", id: "2469397420RR" },
  { name: "Fortinet Certified Associate", issuer: "Fortinet", category: "Network & Infrastructure Security", date: "Feb 2024", id: "2001131314RR" },

  // SOC, Threat Intelligence & Digital Forensics
  { name: "Threat Intelligence Fundamentals", issuer: "SOCRadar", category: "SOC, Threat Intelligence & Digital Forensics", date: "Dec 2025", id: "b3deb5fc-7c80-4cdd-a93b-d4c7287efe08" },
  { name: "Mastering Cyber Threat Intelligence", issuer: "SOCRadar", category: "SOC, Threat Intelligence & Digital Forensics", date: "Dec 2025", id: "38a82901-c9f5-4ab7-ac7e-9e2b9034957d" },
  { name: "Mastering Gen AI for SOC", issuer: "SOCRadar", category: "SOC, Threat Intelligence & Digital Forensics", date: "Dec 2025", id: "118751be-dbe0-429d-872f-3bbe42898a86" },
  { name: "Fundamentals of Dark Web", issuer: "SOCRadar", category: "SOC, Threat Intelligence & Digital Forensics", date: "Dec 2025", id: "217b7023-e555-4648-973d-4f73952a06c1" },
  { name: "SOC Summit 2026", issuer: "Antisyphon Training", category: "SOC, Threat Intelligence & Digital Forensics", date: "Mar 2026", id: "178121337" },
  { name: "Digital Forensics Essentials (DFE)", issuer: "EC-Council", category: "SOC, Threat Intelligence & Digital Forensics", date: "Jul 2023", id: "235021" },
  { name: "Introduction to OSINT", issuer: "Security Blue Team", category: "SOC, Threat Intelligence & Digital Forensics", date: "Jun 2024", id: "349613448" },
  { name: "Cyber Threat Intelligence 101", issuer: "arcX", category: "SOC, Threat Intelligence & Digital Forensics", date: "Feb 2024" },
  { name: "CSI Linux Certified Investigator", issuer: "CSI Linux", category: "SOC, Threat Intelligence & Digital Forensics", date: "Jul 2025" },

  // GRC & Compliance
  { name: "JGRC – Junior GRC Analyst", issuer: "VibeSecurity", category: "GRC, Compliance & Governance", date: "Apr 2026", id: "VS-JGRC-CERT7519" },
  { name: "CRPO – ICTTF United for Cyber Resilience", issuer: "ICTTF", category: "GRC, Compliance & Governance", date: "Dec 2025", id: "64d63660ac9488bbf50f3e76" },
  { name: "CSCSO – ICTTF United for Cyber Resilience", issuer: "ICTTF", category: "GRC, Compliance & Governance", date: "Dec 2025", id: "64d27672fd3cdf761404c8c5" },
  { name: "ISO/IEC 27001 Information Security Associate", issuer: "SkillFront", category: "GRC, Compliance & Governance", date: "Jan 2022", id: "63570328933086" },
  { name: "SC-900: Microsoft Security Fundamentals", issuer: "Microsoft", category: "GRC, Compliance & Governance", date: "Jul 2025", id: "CU2x-uTE4" },
  { name: "Cybersecurity Awareness Professional (CAPC)", issuer: "Certiprof", category: "GRC, Compliance & Governance", date: "Aug 2024", id: "Oabb8322" },
  { name: "SailPoint Identity Security Leader", issuer: "SailPoint", category: "GRC, Compliance & Governance", date: "Oct 2025" },

  // Cloud, AI & Data
  { name: "OCI Certified Multicloud Architect Associate", issuer: "Oracle", category: "Cloud, AI & Data Platforms", date: "Jul 2025" },
  { name: "AgentForce Specialist", issuer: "Salesforce", category: "Cloud, AI & Data Platforms", date: "Apr 2025", id: "6097365" },
  { name: "Generative AI Fundamentals", issuer: "Databricks", category: "Cloud, AI & Data Platforms", date: "Apr 2026", id: "181008907" },
  { name: "AI Agent Fundamentals", issuer: "Databricks", category: "Cloud, AI & Data Platforms", date: "Apr 2026", id: "181010117" },
  { name: "JDE – Junior DevOps Engineer", issuer: "VibeSecurity", category: "Cloud, AI & Data Platforms", date: "Apr 2026", id: "VS-JDE-CERT1485" },

  // Google Professional
  { name: "Foundations of Cybersecurity", issuer: "Google", category: "Google Cybersecurity Professional", date: "Jan 2024" },
  { name: "Play It Safe: Manage Security Risks", issuer: "Google", category: "Google Cybersecurity Professional", date: "Jan 2024" },
  { name: "Connect and Protect: Networks", issuer: "Google", category: "Google Cybersecurity Professional", date: "Jan 2024" },
  { name: "Tools and Trade: Linux and SQL", issuer: "Google", category: "Google Cybersecurity Professional", date: "Jan 2024" },
  { name: "Assets, Threats & Vulnerabilities", issuer: "Google", category: "Google Cybersecurity Professional" },
  { name: "Sound the Alarm: Detection", issuer: "Google", category: "Google Cybersecurity Professional", date: "May 2024" },
  { name: "Automate Tasks with Python", issuer: "Google", category: "Google Cybersecurity Professional", date: "May 2024" },
  { name: "Google Cybersecurity Professional", issuer: "Coursera", category: "Google Cybersecurity Professional", date: "May 2024" },

  // Specialist & Gov
  { name: "Geo-data Sharing", issuer: "ISRO", category: "Specialist Certifications", date: "Dec 2023", id: "2023233862177" },
  { name: "IoT: Internet of Things", issuer: "SVS College", category: "Specialist Certifications", date: "Jan 2022", id: "GCBSQ8-CE001977" },
  { name: "Certified Cyber Warrior", issuer: "HackingFlix", category: "Specialist Certifications", date: "Jan 2024", id: "01223493800975" }
];

export default function CertificationsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'certifications'), orderBy('name', 'asc'))
  );

  const certs = useMemo(() => {
    const dbCerts = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbCerts.length > 0 ? dbCerts : FULL_CERTIFICATIONS_LIST;
  }, [value]);

  const groups = useMemo(() => {
    const map: Record<string, any[]> = {};
    certs.forEach((cert: any) => {
      const cat = cert.category || 'General';
      if (!map[cat]) map[cat] = [];
      map[cat].push(cert);
    });
    return Object.entries(map).map(([category, items]) => ({ category, items }));
  }, [certs]);

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_BASE
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-code uppercase tracking-widest">Scanning Credential Nebula...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Credential Nebula</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">97+ Professional Nodes Verified in Neural Matrix.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-24 pb-20">
          {groups.map((group, groupIdx) => (
            <section key={groupIdx} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/10" />
                <h2 className="text-xs font-code text-accent uppercase tracking-[0.5em]">{group.category}</h2>
                <div className="h-px flex-1 bg-primary/10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((cert: any, idx: number) => (
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
                      <div className="pt-4 border-t border-primary/5 flex justify-between items-center">
                        <p className="text-[7px] font-code text-primary/20 uppercase tracking-tighter">Verified Node</p>
                        <p className="text-[7px] font-code text-accent/40 uppercase">{cert.date || 'ACTIVE'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}