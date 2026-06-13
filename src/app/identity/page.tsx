
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Shield, Lock, ArrowLeft, Terminal, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FALLBACK_SKILLS = [
  { name: "Technical Engineering" },
  { name: "OT/ICS Security" },
  { name: "VAPT" },
  { name: "SOC Monitoring" },
  { name: "Python" },
  { name: "Kali Linux" },
  { name: "Wireshark" },
  { name: "Metasploit" },
  { name: "Quantum Technology" },
  { name: "GRC" }
];

const FALLBACK_EDU = [
  {
    degree: "B.Sc Honours in Advanced Networking and Cyber Security",
    school: "Brainware University, Kolkata",
    period: "2023 - 2027",
    score: "8.86 SGPA"
  }
];

export default function IdentityPage() {
  const [mounted, setMounted] = useState(false);

  const [skillsValue, skillsLoading] = useCollection(
    query(collection(db, 'skills'), orderBy('name', 'asc'))
  );
  const [eduValue, eduLoading] = useCollection(
    query(collection(db, 'education'), orderBy('period', 'desc'))
  );

  const skills = useMemo(() => {
    const dbSkills = skillsValue?.docs.map(d => ({ id: d.id, ...d.data() })) || [];
    return dbSkills.length > 0 ? dbSkills : FALLBACK_SKILLS;
  }, [skillsValue]);

  const education = useMemo(() => {
    const dbEdu = eduValue?.docs.map(d => ({ id: d.id, ...d.data() })) || [];
    return dbEdu.length > 0 ? dbEdu : FALLBACK_EDU;
  }, [eduValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-widest uppercase">BACK_TO_BASE</span>
        </Link>
        
        <div className="space-y-12">
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-primary/20 pb-12">
            <div className="w-48 h-48 border-2 border-primary/40 bg-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
              <User className="w-32 h-32 text-primary/20" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 animate-[scanline_3s_linear_infinite]" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-6xl font-headline tracking-tighter text-glow uppercase">ROHIT ROY</h1>
                <p className="text-lg font-code text-primary/80 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                   <Terminal className="w-4 h-4 text-accent" /> Technical Engineer | OT/ICS Specialist
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 border border-primary/20 text-[10px] font-code text-primary uppercase bg-primary/5">Quantum Technology</span>
                <span className="px-3 py-1 border border-accent/20 text-[10px] font-code text-accent uppercase bg-accent/5">OT/ICS Security</span>
                <span className="px-3 py-1 border border-primary/20 text-[10px] font-code text-primary uppercase bg-primary/5">SOC Analyst</span>
              </div>
            </div>
          </div>

          {/* Academic & Location Intel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="cyber-glass p-8 space-y-6 border border-primary/10 hover:border-accent transition-all group">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Academic Node</h3>
              <div className="space-y-8">
                {education.map((edu: any, idx: number) => (
                  <div key={edu.id || idx} className="space-y-2">
                    <h4 className="text-xl font-headline text-glow uppercase leading-tight">{edu.degree}</h4>
                    <p className="text-xs font-code text-primary/60 uppercase">{edu.school} | {edu.period}</p>
                    <div className="mt-2 text-[10px] font-code text-primary/40 uppercase">
                      Final Node Performance: {edu.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-glass p-8 space-y-6 border border-primary/10 hover:border-accent transition-all">
              <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Deployment Intel</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 border border-primary/20 bg-primary/5">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">Operation Base</p>
                    <p className="text-sm font-code text-primary/80">West Bengal, India</p>
                  </div>
                </div>
                <Link href="/vault" className="block p-4 border border-primary/20 bg-primary/5 hover:border-accent group transition-all">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-primary group-hover:text-accent" />
                    <div>
                      <p className="text-[10px] font-code text-primary/40 uppercase">Protected Contact Intel</p>
                      <p className="text-xs font-code text-accent uppercase tracking-widest">SOLVE_CTF_FOR_ACCESS</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Skill Matrix */}
          <div className="space-y-8">
            <h3 className="text-xs font-code text-primary/40 uppercase tracking-[0.5em] border-b border-primary/10 pb-2">Skill Matrix Alignment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill: any, idx: number) => (
                <motion.div 
                  key={skill.id || idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 border border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all text-center group"
                >
                  <Shield className="w-6 h-6 text-primary/40 mx-auto mb-3 group-hover:text-primary group-hover:animate-pulse" />
                  <span className="text-[10px] font-code text-primary uppercase tracking-widest">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
