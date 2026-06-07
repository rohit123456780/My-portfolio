
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, CheckCircle2, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function CertificationsPage() {
  const [value, loading, error] = useCollection(
    query(collection(db, 'certifications'), orderBy('name', 'asc')),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const certs = useMemo(() => {
    return value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  }, [value]);

  // Grouping logic for the UI
  const groups = useMemo(() => {
    const map: Record<string, any[]> = {};
    certs.forEach((cert: any) => {
      if (!map[cert.category]) map[cert.category] = [];
      map[cert.category].push(cert);
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">{certs.length || 0}+ Professional Nodes Identified & Verified.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-code text-primary/40 uppercase">Decryption in progress...</p>
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
                    key={cert.id}
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
          
          {!loading && certs.length === 0 && (
            <div className="text-center py-20 border border-dashed border-primary/10">
              <p className="text-[10px] font-code text-primary/30 uppercase">No active nodes detected. Deploy intelligence via Obsidian.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
