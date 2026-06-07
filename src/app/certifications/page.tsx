
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, CheckCircle2, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_CERTS = [
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025" },
  { name: "Certified API Security Analyst", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025" },
  { name: "API Security Fundamentals", issuer: "APIsec University", category: "API & Web Security" },
  { name: "Certified REST Engineer", issuer: "Cyber NOW Education", category: "API & Web Security", date: "Jul 2024" },
  { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", category: "API & Web Security", date: "Feb 2024" },
  { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2 Cybersecurity Institute", category: "Penetration Testing & Ethical Hacking", date: "Oct 2023" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Penetration Testing & Ethical Hacking", date: "Jan 2024" },
  { name: "Fortinet Certified Associate in Cybersecurity", issuer: "Fortinet", category: "Network & Infrastructure Security", date: "Feb 2024" },
  { name: "Google Cybersecurity Professional Certificate", issuer: "Coursera", category: "Google Cybersecurity Professional (Coursera)", date: "May 2024" },
  { name: "CSI Linux Certified Investigator", issuer: "CSI Linux", category: "SOC, Threat Intelligence & Digital Forensics", date: "Jul 2025" },
  { name: "JGRC – Junior GRC Analyst", issuer: "VibeSecurity", category: "GRC, Compliance & Governance", date: "Apr 2026" },
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration & Operations Platforms", date: "Nov 2025" },
  { name: "Geo-data Sharing and Cyber Security", issuer: "ISRO", category: "Specialist & Miscellaneous Certifications", date: "Dec 2023" }
];

export default function CertificationsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'certifications'), orderBy('name', 'asc'))
  );

  const certs = useMemo(() => {
    const dbCerts = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbCerts.length > 0 ? dbCerts : FALLBACK_CERTS;
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
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
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
