
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, CheckCircle2, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FULL_CERTIFICATIONS_LIST = [
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025" },
  { name: "Certified API Security Analyst", issuer: "APIsec University", category: "API & Web Security", date: "Apr 2025" },
  { name: "Certified REST Engineer", issuer: "Cyber NOW Education", category: "API & Web Security", date: "Jul 2024" },
  { name: "C)PTE: Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", date: "Oct 2023" },
  { name: "Google Cybersecurity Professional", issuer: "Google", category: "Cloud & AI", date: "May 2024" },
  { name: "Certified Network Security Practitioner", issuer: "The SecOps Group", category: "Infrastructure", date: "Jun 2024" },
  { name: "ISO/IEC 27001 Information Security Associate", issuer: "SkillFront", category: "GRC & Compliance", date: "Jan 2022" },
  { name: "SC-900: Microsoft Security Fundamentals", issuer: "Microsoft", category: "GRC & Compliance", date: "Jul 2025" },
  { name: "OCI Certified Multicloud Architect Associate", issuer: "Oracle", category: "Cloud & AI", date: "Jul 2025" },
  { name: "Generative AI Fundamentals", issuer: "Databricks", category: "Cloud & AI", date: "Apr 2026" }
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
        <Link href="/" className="inline-flex items-center gap-2 text-[#00ff9f] hover:text-[#00cfff] transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK_TO_COMMAND
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#00cfff]">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-code uppercase tracking-widest">Scanning Credential Nebula...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase text-[#00ff9f]">Credential Nebula</h1>
          <p className="text-xs font-code text-[#00ff9f]/40 uppercase tracking-widest">{certs.length}+ Professional Nodes Verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-[#00ff9f]/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-[#00ff9f] animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="space-y-16 pb-20">
          {groups.map((group, groupIdx) => (
            <section key={groupIdx} className="space-y-6">
              <h2 className="text-xs font-code text-[#00cfff] uppercase tracking-[0.5em] border-l-2 border-[#00cfff] pl-4">{group.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((cert: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-black/40 backdrop-blur-sm p-6 border border-[#00ff9f]/5 hover:border-[#00ff9f] group transition-all"
                  >
                    <div className="space-y-4">
                      <Award className="w-5 h-5 text-[#00ff9f]/40 group-hover:text-[#00ff9f]" />
                      <h3 className="text-sm font-headline uppercase leading-tight group-hover:text-glow text-[#00ff9f]">{cert.name}</h3>
                      <p className="text-[9px] font-code text-[#00ff9f]/40 uppercase">{cert.issuer}</p>
                      <div className="pt-4 border-t border-[#00ff9f]/5 flex justify-between items-center text-[7px] font-code uppercase">
                        <span className="text-[#00ff9f]/20">Verified</span>
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
