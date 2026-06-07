
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Zap, Terminal, Activity, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function InternshipsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'internships'), orderBy('period', 'desc')),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const internships = useMemo(() => {
    return value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  }, [value]);

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-5xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-code uppercase tracking-widest">Infiltrating Deployment History...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Growth Sector</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">{internships.length || 0} Professional Deployments Identified.</p>
          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        {loading && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 pb-20">
          {internships.map((intern: any, idx: number) => (
            <motion.div 
              key={intern.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-accent transition-colors">
                  <Briefcase className="w-6 h-6 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-headline uppercase group-hover:text-glow tracking-tight">{intern.org}</h3>
                  <div className="flex flex-wrap gap-4 text-[9px] font-code text-primary/40 uppercase">
                    <span className="flex items-center gap-1 text-accent"><Zap className="w-3 h-3" /> {intern.domain || 'Cybersecurity'}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {intern.period}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <span className="px-3 py-1 border border-primary/30 text-[9px] font-code text-primary uppercase bg-primary/5">{intern.role}</span>
                <div className="flex items-center gap-2">
                   <Terminal className="w-3 h-3 text-primary/20" />
                   <span className="text-[7px] font-code text-primary/20 uppercase">Deployment Node: {idx + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {!loading && internships.length === 0 && (
            <div className="p-16 border-2 border-dashed border-primary/10 text-center space-y-4">
               <Globe className="w-12 h-12 text-primary/10 mx-auto" />
               <p className="text-sm font-headline text-primary/30 uppercase tracking-[0.3em]">Awaiting Data Feed Initialization...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
