
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, ArrowLeft, CheckCircle2, Star, Zap, Terminal, Activity, Lock } from 'lucide-react';
import Link from 'next/link';

const CERTS = [
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", featured: true },
  { name: "Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", featured: true },
  { name: "Google Cybersecurity Professional", issuer: "Google", category: "Cloud & AI", featured: true },
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API Security", featured: true },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Pentesting", featured: true },
  { name: "SOC Analyst", issuer: "Cybrary", category: "Defensive Ops", featured: true },
  { name: "Network Defense Professional", issuer: "Cisco", category: "Infrastructure" },
  { name: "Cloud Security Specialist", issuer: "AWS Training", category: "Cloud" },
  { name: "Digital Forensics Investigator", issuer: "Autopsy", category: "Forensics" },
  { name: "GRC Specialist", issuer: "Compliance Institute", category: "Governance" },
  { name: "API Security Expert", issuer: "Noname Security", category: "API Security" },
  { name: "Advanced Threat Hunter", issuer: "Splunk", category: "SOC" },
  { name: "Web Application Pentester", issuer: "TCM Security", category: "Pentesting" },
  { name: "Cloud Guardian", issuer: "Microsoft Azure", category: "Cloud Security" },
  { name: "Information Security Management", issuer: "IBM", category: "GRC" },
  { name: "Network Vulnerability Assessment", issuer: "Qualys", category: "VAPT" },
  { name: "Incident Response Mastery", issuer: "Fortinet", category: "SOC" },
  { name: "Container Security Expert", issuer: "Palo Alto Networks", category: "Cloud" }
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent animate-pulse">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-code uppercase tracking-widest">Scanning Credential Nebula...</span>
          </div>
          <h1 className="text-5xl font-headline text-glow uppercase">Credential Nebula</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">97+ Professional Nodes & Global Certifications Identified.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {CERTS.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-accent transition-all group relative"
            >
              {cert.featured && (
                <div className="absolute top-0 right-0 p-3">
                  <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
                </div>
              )}
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors inline-block">
                  <Award className="w-6 h-6 text-primary group-hover:text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-headline uppercase leading-tight group-hover:text-glow">{cert.name}</h3>
                  <p className="text-[10px] font-code text-primary/60 uppercase tracking-widest">{cert.issuer}</p>
                </div>
                <div className="pt-6 border-t border-primary/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Zap className="w-3 h-3 text-accent" />
                     <span className="text-[8px] font-code text-accent uppercase tracking-widest">{cert.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span className="text-[7px] font-code text-accent/50 uppercase">Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="lg:col-span-3 cyber-glass p-16 border-2 border-dashed border-primary/10 flex flex-col items-center justify-center space-y-6 group hover:border-primary/30 transition-all">
             <div className="relative">
               <Terminal className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors" />
               <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-accent/20" />
             </div>
             <div className="text-center space-y-2">
               <p className="text-2xl font-headline text-primary/40 uppercase tracking-widest">79+ Additional Credential Nodes Encrypted</p>
               <p className="text-xs font-code text-primary/20 uppercase max-w-lg mx-auto">
                 API SECURITY • CLOUD • SOC • GRC • PENTESTING • FORENSICS • QUANTUM SECURITY • NETWORK DEFENSE • THREAT HUNTING • MALWARE ANALYSIS
               </p>
             </div>
             <div className="flex gap-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-2 h-2 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
               ))}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
