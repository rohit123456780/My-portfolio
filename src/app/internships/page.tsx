'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Zap, Terminal, Activity, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern (VAPT)", period: "Sep 2025 – Sep 2025", domain: "VAPT" },
  { org: "Razz Security IT Services LLP", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "Cybersecurity" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "May 2025 – Jun 2025", domain: "Cybersecurity" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Mar 2025 – Apr 2025", domain: "Cybersecurity" },
  { org: "Hack Secure", role: "Cybersecurity Intern", period: "Jan 2025 – Feb 2025", domain: "Cybersecurity" },
  { org: "Navodita Infotech", role: "Cybersecurity Intern", period: "Nov 2024 – Dec 2024", domain: "Cybersecurity" },
  { org: "Brainwave Matrix Solutions", role: "Cybersecurity Intern", period: "Sep 2024 – Oct 2024", domain: "Ethical Hacking" },
  { org: "GrowIntern", role: "Cybersecurity Intern", period: "Aug 2024 – Aug 2024", domain: "Cybersecurity" },
  { org: "Edunet Foundation / IBM SkillsBuild", role: "AI & Cloud Intern", period: "Jun 2024 – Jul 2024", domain: "AI & Cloud" },
  { org: "BH Security Plus", role: "Penetration Testing Intern", period: "Apr 2024 – May 2024", domain: "Penetration Testing" },
  { org: "Sutantras.in", role: "Cyber Law Intern", period: "Feb 2024 – Mar 2024", domain: "Cyber Law" },
  { org: "Trimbak Infotech", role: "Cyber Security Intern", period: "Dec 2023 – Jan 2024", domain: "Cybersecurity" },
  { org: "TechnoTrench", role: "Ethical Hacking Intern", period: "Oct 2023 – Nov 2023", domain: "Ethical Hacking" },
  { org: "ITPS", role: "Cyber Security Intern", period: "Sep 2023 – Sep 2023", domain: "Cybersecurity" },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jul 2023 – Aug 2023", domain: "Cybersecurity" },
  { org: "StartHere", role: "Cybersecurity Intern", period: "Jun 2023 – Jun 2023", domain: "Cybersecurity" },
  { org: "NexaSynergy Innovations", role: "Cybersecurity Intern", period: "Apr 2023 – May 2023", domain: "Cybersecurity" },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "Feb 2023 – Mar 2023", domain: "Cybersecurity" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "Dec 2022 – Jan 2023", domain: "Cybersecurity" },
  { org: "Pinnacle Labs", role: "Cybersecurity Intern", period: "Oct 2022 – Nov 2022", domain: "Cybersecurity" },
  { org: "Let's We Hack", role: "Ethical Hacking Intern", period: "Aug 2022 – Sep 2022", domain: "Ethical Hacking" },
  { org: "SecureSphere Foundation", role: "Cybersecurity Intern", period: "May 2022 – Jul 2022", domain: "Cybersecurity" },
  { org: "Cyber Secured India", role: "Digital Forensics Intern", period: "Feb 2022 – Apr 2022", domain: "Digital Forensics" },
  { org: "DeltaClause", role: "Ethical Hacking Intern", period: "Dec 2021 – Jan 2022", domain: "Ethical Hacking" },
  { org: "TechnoHacks EduTech", role: "Cybersecurity Intern", period: "Oct 2021 – Nov 2021", domain: "Ethical Hacking" },
  { org: "Springboard", role: "Career Track Intern", period: "Jan 2021 – Sep 2021", domain: "Cybersecurity" },
  { org: "CyberDosti", role: "Ethical Hacking Intern", period: "Oct 2020 – Dec 2020", domain: "Ethical Hacking" }
];

export default function InternshipsPage() {
  const [value, loading] = useCollection(
    query(collection(db, 'internships'), orderBy('period', 'desc'))
  );

  const internships = useMemo(() => {
    const dbInterns = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    return dbInterns.length > 0 ? dbInterns : FALLBACK_INTERNSHIPS;
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
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">27+ Professional Deployments Identified in Neural Archives.</p>
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
              key={idx}
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
                   <span className="text-[7px] font-code text-primary/20 uppercase">Auth Verified Node</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
