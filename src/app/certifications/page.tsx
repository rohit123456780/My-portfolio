
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, Shield, Activity, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FULL_CERTIFICATIONS_LIST = [
  // New Certifications (Added Jun 2026)
  { name: "Certified Cybersecurity Apprentice", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Cybersecurity Fundamentals", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Endpoint Security", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Network Security", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Cloud Security", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Security Operations & SOC Fundamentals", issuer: "Palo Alto Networks", category: "Palo Alto Nodes", date: "May 2026" },
  { name: "Nutanix Certified Professional – Network & Security 7", issuer: "Nutanix", category: "Nutanix Nodes", date: "Jun 2026" },
  { name: "Certified LLM Security Professional (CLLMSP)", issuer: "Red Team Leaders", category: "Next-Gen AI", date: "Jun 2026" },
  { name: "Certified Implementation Specialist – Data Foundations", issuer: "ServiceNow", category: "Data Ops", date: "Jun 2026" },
  { name: "Introduction to Networking for Cyber Professionals (EDU-101)", issuer: "Zscaler", category: "Zscaler Nodes", date: "Jun 2026" },
  { name: "Zscaler for Users – Administrator (EDU-200)", issuer: "Zscaler", category: "Zscaler Nodes", date: "Jun 2026" },
  { name: "Fundamentals of AI Security (EDU-111)", issuer: "Zscaler", category: "Zscaler Nodes", date: "Jun 2026" },
  { name: "Fundamentals of Cybersecurity (EDU-102)", issuer: "Zscaler", category: "Zscaler Nodes", date: "Jun 2026" },
  { name: "Zero Trust Cyber Associate (ZTCA)", issuer: "Zscaler", category: "Zscaler Nodes", date: "Jun 2026" },

  // API & Web Security
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025", id: "01733775-8dc0-41f1-8133-185e919d4e46" },
  { name: "Certified API Security Analyst", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025", id: "8c4bbbea-3e23-4c8d-9b49-469bf1c4c8a1" },
  { name: "API Security Fundamentals", issuer: "APIsec University", category: "API & Web Security", date: "2024" },
  { name: "Certified REST Engineer", issuer: "Cyber NOW Education", category: "API & Web Security", date: "Jul 2024", id: "2ec1040114748" },
  { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", category: "API & Web Security", date: "Feb 2024", id: "8366839" },

  // Penetration Testing & Ethical Hacking
  { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", date: "Oct 2023", id: "23231-169-796-7246" },
  { name: "Certified Red Team Operations Management (CRTOM)", issuer: "Red Team Leaders", category: "Offensive Security", date: "Dec 2025" },
  { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", category: "Offensive Security", date: "Dec 2025" },
  { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Hack & Fix", category: "Offensive Security", date: "Dec 2025", id: "2347-2827-4889-2127" },
  { name: "Certified Vulnerability Analyst (C-VA)", issuer: "Sturtle Security", category: "Offensive Security", date: "Apr 2024", id: "STURSEC/CVA/2024/009" },
  { name: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council", category: "Offensive Security", date: "Jul 2023", id: "233321" },
  { name: "Cyber Security White Hat Hacker Level 1", issuer: "MOCT College", category: "Offensive Security", date: "Jan 2022", id: "MTJ R6YLU8-CE000862" },
  { name: "Be A White Hat Hacker and Pen Tester", issuer: "EDUONIX", category: "Offensive Security", date: "Dec 2021" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Offensive Security", date: "Jan 2024" },

  // Network & Infrastructure Security
  { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group", category: "Infrastructure", date: "Jun 2024", id: "8813475" },
  { name: "Network Defense Essentials (NDE)", issuer: "EC-Council", category: "Infrastructure", date: "Jul 2023", id: "236975" },
  { name: "Networking Essentials", issuer: "Cisco Networking Academy", category: "Infrastructure", date: "Jan 2022" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", category: "Infrastructure", date: "Aug 2022" },
  { name: "CCNAv7: Enterprise Networking Security and Automation", issuer: "Cisco Networking Academy", category: "Infrastructure", date: "Apr 2024" },
  { name: "Cybersecurity Essentials (LFC108)", issuer: "The Linux Foundation", category: "Infrastructure", date: "Jul 2023", id: "LF-gqojdj219m" },
  { name: "Certified Linux File System Professional", issuer: "CCSSR", category: "Infrastructure", date: "Jul 2024", id: "TESTING92324615" },
  { name: "OPSWAT File Security Associate", issuer: "OPSWAT", category: "Infrastructure", date: "Apr 2025", id: "4iyCdoBD4g" },
  { name: "Introduction to Critical Infrastructure Protection", issuer: "OPSWAT Academy", category: "Infrastructure", date: "Jun 2024", id: "e8QYOZQPuQ" },
  { name: "Fortinet Certified Fundamentals", issuer: "Fortinet", category: "Infrastructure", date: "Jan 2024", id: "2469397420RR" },
  { name: "Fortinet Certified Associate", issuer: "Fortinet", category: "Infrastructure", date: "Feb 2024", id: "2001131314RR" },

  // SOC, Threat Intelligence & Digital Forensics
  { name: "Threat Intelligence Fundamentals", issuer: "SOCRadar", category: "SOC & Intel", date: "Dec 2025", id: "b3deb5fc-7c80-4cdd-a93b-d4c7287efe08" },
  { name: "Mastering Cyber Threat Intelligence", issuer: "SOCRadar", category: "SOC & Intel", date: "Dec 2025", id: "38a82901-c9f5-4ab7-ac7e-9e2b9034957d" },
  { name: "Mastering Gen AI Tools for SOC", issuer: "SOCRadar", category: "SOC & Intel", date: "Dec 2025", id: "118751be-dbe0-429d-872f-3bbe42898a86" },
  { name: "Fundamentals of Dark Web", issuer: "SOCRadar", category: "SOC & Intel", date: "Dec 2025", id: "217b7023-e555-4648-973d-4f73952a06c1" },
  { name: "Dark Web Crash Course", issuer: "SOCRadar", category: "SOC & Intel", date: "Dec 2025", id: "acfaa47a-8208-42e6-b336-a6a86b0782ad" },
  { name: "SOC Summit 2026", issuer: "Antisyphon Training", category: "SOC & Intel", date: "Mar 2026", id: "178121337" },
  { name: "Digital Forensics Essentials (DFE)", issuer: "EC-Council", category: "SOC & Intel", date: "Jul 2023", id: "235021" },
  { name: "Introduction to Dark Web & Crypto", issuer: "EC-Council", category: "SOC & Intel", date: "Jul 2023", id: "235030" },
  { name: "Introduction to OSINT", issuer: "Security Blue Team", category: "SOC & Intel", date: "Jun 2024", id: "349613448" },
  { name: "Cyber Threat Intelligence 101", issuer: "arcX", category: "SOC & Intel", date: "Feb 2024" },
  { name: "Cyber Security & Digital Forensics", issuer: "IIIT Kota", category: "SOC & Intel", date: "Aug 2022", id: "62f3898eb0b99700163bdcf" },
  { name: "CSI Linux Certified Investigator", issuer: "CSI Linux", category: "SOC & Intel", date: "Jul 2025" },

  // GRC, Compliance & Governance
  { name: "JGRC – Junior GRC Analyst", issuer: "VibeSecurity", category: "GRC & Compliance", date: "Apr 2026", id: "VS-JGRC-CERT7519" },
  { name: "CRPO - Resilience Professional", issuer: "ICTTF", category: "GRC & Compliance", date: "Dec 2025", id: "64d63660ac9488bbf50f3e76" },
  { name: "CSCSO - Security Officer", issuer: "ICTTF", category: "GRC & Compliance", date: "Dec 2025", id: "64d27672fd3cdf761404c8c5" },
  { name: "ISO/IEC 27001 Associate", issuer: "SkillFront", category: "GRC & Compliance", date: "Jan 2022", id: "63570328933086" },
  { name: "SC-900: Security Fundamentals", issuer: "Microsoft", category: "GRC & Compliance", date: "Jul 2025", id: "CU2x-uTE4" },
  { name: "Cybersecurity Awareness Prof.", issuer: "Certiprof", category: "GRC & Compliance", date: "Aug 2024", id: "Oabb8322" },
  { name: "Awareness Programme", issuer: "NIELIT", category: "GRC & Compliance", date: "Apr 2024", id: "NIELIT/LKO/CSAP/2024/000002449" },
  { name: "Exposure Management", issuer: "XM Cyber", category: "GRC & Compliance", date: "Apr 2024", id: "uptpita21f" },
  { name: "Identity Security for AI Age", issuer: "Saviynt", category: "GRC & Compliance", date: "Oct 2025", id: "163889219" },
  { name: "Identity Security Leader", issuer: "SailPoint", category: "GRC & Compliance", date: "Oct 2025", id: "utyftyrijzfk" },
  { name: "Global Cyber with Data Privacy", issuer: "DLA Piper", category: "GRC & Compliance", date: "Sep 2025", id: "Es27GLdqAJvnrsQ4M" },

  // Cloud, AI & Data Platforms
  { name: "OCI Multicloud Architect Associate", issuer: "Oracle", category: "Cloud & AI", date: "Jul 2025" },
  { name: "AgentForce Specialist", issuer: "Salesforce", category: "Cloud & AI", date: "Apr 2025", id: "6097365" },
  { name: "Databricks Fundamentals", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181008450" },
  { name: "Generative AI Fundamentals", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181008907" },
  { name: "AI Agent Fundamentals", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181010117" },
  { name: "Platform Administrator", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181013485" },
  { name: "AWS Databricks Architect", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181014913" },
  { name: "Azure Databricks Architect", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181016161" },
  { name: "GCP Databricks Architect", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026", id: "181017131" },
  { name: "JDE – Junior DevOps Engineer", issuer: "VibeSecurity", category: "Cloud & AI", date: "Apr 2026", id: "VS-JDE-CERT1485" },

  // Collaboration & Operations
  { name: "Baserow Fundamentals", issuer: "Baserow", category: "Collaboration", date: "Nov 2025", id: "USBOZo0TE0RIwY" },
  { name: "Baserow Advanced", issuer: "Baserow", category: "Collaboration", date: "Nov 2025" },
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", date: "Nov 2025" },
  { name: "Egnyte Collaboration Essentials", issuer: "Egnyte", category: "Collaboration", date: "Nov 2025", id: "x7vbbmpvsxcb" },
  { name: "Foundational Support", issuer: "Zendesk", category: "Collaboration", date: "Nov 2025" },

  // Google Cybersecurity
  { name: "Foundations of Cybersecurity", issuer: "Google/Coursera", category: "Google Prof.", date: "Jan 2024" },
  { name: "Play It Safe: Manage Security Risks", issuer: "Google/Coursera", category: "Google Prof.", date: "Jan 2024" },
  { name: "Connect and Protect: Networks", issuer: "Google/Coursera", category: "Google Prof.", date: "Jan 2024" },
  { name: "Tools and Trade: Linux and SQL", issuer: "Google/Coursera", category: "Google Prof.", date: "Jan 2024" },
  { name: "Assets, Threats & Vulnerabilities", issuer: "Google/Coursera", category: "Google Prof.", date: "2024" },
  { name: "Sound the Alarm: Detection", issuer: "Google/Coursera", category: "Google Prof.", date: "May 2024" },
  { name: "Automate Cybersecurity Tasks", issuer: "Google/Coursera", category: "Google Prof.", date: "May 2024" },
  { name: "Prepare for Cybersecurity Jobs", issuer: "Google/Coursera", category: "Google Prof.", date: "May 2024" },
  { name: "Google Cybersecurity Professional", issuer: "Coursera", category: "Google Prof.", date: "May 2024" },

  // Virtual Experience Programs
  { name: "Cyber Job Simulation", issuer: "Deloitte", category: "Simulations", date: "Jun 2025" },
  { name: "Fujitsu Cybersecurity Program", issuer: "Fujitsu/Springpod", category: "Simulations", date: "Sep 2025", id: "e7xe5a448tdo" },
  { name: "Cybersecurity Analyst Simulation", issuer: "Tata Consultancy Services / Forage", category: "Simulations", date: "Feb 2024", id: "YFxafzf9Rc2GnoFvh" },
  { name: "Cybersecurity Job Simulation", issuer: "Datacom / Forage", category: "Simulations", date: "Sep 2023", id: "kvBwSxWTYTetjpuFs" },
  { name: "Introduction to Cybersecurity Job Simulation", issuer: "Commonwealth Bank / Forage", category: "Simulations", date: "Nov 2023", id: "foope2QMmfstPu24c" },
  { name: "Shields Up Program", issuer: "AIG / Forage", category: "Simulations", date: "Nov 2022", id: "fLGFrMTAKhojS2zQs" },
  { name: "Cyber Security Consulting", issuer: "PwC / Forage", category: "Simulations", date: "May 2023", id: "5iHmbnE2DQGkax5vg" },
  { name: "Cybersecurity Virtual Case", issuer: "PwC / Forage", category: "Simulations", date: "Jan 2022", id: "qqd76m279JvhKGbYb" },
  { name: "Cybersecurity Experience", issuer: "Telstra / Forage", category: "Simulations", date: "May 2023", id: "mavdMjvK24sJApXWT" },
  { name: "Cybersecurity Virtual Program", issuer: "Mastercard / Forage", category: "Simulations", date: "Mar 2022", id: "M2P9pvryzaJmaJcqT" },
  { name: "Cybersecurity Virtual Program", issuer: "JPMorgan Chase & Co. / Forage", category: "Simulations", date: "Mar 2022", id: "YvHJsxmr5rCLmM8qy" },
  { name: "Cyber@ANZ Program", issuer: "ANZ / Forage", category: "Jan 2022", id: "ttZCNJdMfFHgq9kex" },
  { name: "Cyber Security Global Internship", issuer: "Clifford Chance", category: "Simulations", date: "Jan 2022", id: "WidqRupGNxtiBexvP" },

  // Cybersecurity Awareness (MeitY)
  { name: "Cyber Offences", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Cyber Ethics", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Password Security", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Cyber Stalking", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Whatsapp Security", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Facebook Security", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Email Security", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },
  { name: "Cyber Bullying", issuer: "MeitY", category: "Awareness", date: "Dec 2021" },

  // Specialist & Miscellaneous
  { name: "Geo-data Sharing and Cyber Security", issuer: "ISRO", category: "Specialist", date: "Dec 2023", id: "2023233862177" },
  { name: "IoT: Internet of Things", issuer: "SVS College", category: "Specialist", date: "Jan 2022", id: "GCBSQ8-CE001977" },
  { name: "Cybersecurity Specialist", issuer: "TheDigitalAdda", category: "Specialist", date: "Feb 2024", id: "DA/CSP/24/1187" },
  { name: "Certified Cyber Warrior", issuer: "HackingFlix", category: "Specialist", date: "Jan 2024", id: "01223493800975" }
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
      <div className="max-w-7xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00ff9f] hover:text-[#00cfff] transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK_TO_COMMAND
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#00cfff]">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-code uppercase tracking-widest">Scanning Credential Nebula...</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline text-glow uppercase text-[#00ff9f]">Credential Nebula</h1>
          <p className="text-xs font-code text-[#00ff9f]/40 uppercase tracking-widest">{certs.length} Operational Nodes Verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-[#00ff9f]/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-[#00ff9f] animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-24 pb-20">
          {groups.map((group, groupIdx) => (
            <section key={groupIdx} className="space-y-8">
              <h2 className="text-sm font-code text-[#00cfff] uppercase tracking-[0.6em] border-l-2 border-[#00cfff] pl-6">{group.category} Sector</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.items.map((cert: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black/40 backdrop-blur-md p-6 border border-[#00ff9f]/10 hover:border-[#00ff9f] group transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity">
                       <Award className="w-12 h-12" />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <h3 className="text-xs font-headline uppercase leading-tight group-hover:text-glow text-[#00ff9f]">{cert.name}</h3>
                      <div className="space-y-1">
                         <p className="text-[9px] font-code text-[#00ff9f]/60 uppercase tracking-tighter">{cert.issuer}</p>
                         {cert.id && (
                           <p className="text-[7px] font-code text-[#00cfff]/40 uppercase truncate">UID: {cert.id}</p>
                         )}
                      </div>
                      <div className="pt-4 border-t border-[#00ff9f]/5 flex justify-between items-center text-[7px] font-code uppercase">
                        <span className="flex items-center gap-1 text-[#00ff9f]/20">
                          <Activity className="w-2 h-2 animate-pulse" /> Verified
                        </span>
                        <span className="text-[#00cfff]/40">{cert.date}</span>
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
