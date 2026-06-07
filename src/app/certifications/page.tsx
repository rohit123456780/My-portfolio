
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, ArrowLeft, CheckCircle2, Star, Zap, Terminal } from 'lucide-react';
import Link from 'next/link';

const CERTS = [
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", featured: true },
  { name: "Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", featured: true },
  { name: "Google Cybersecurity Professional", issuer: "Google", category: "Cloud & AI", featured: true },
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API Security", featured: true },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Pentesting", featured: true },
  { name: "SOC Analyst", issuer: "Cybrary", category: "Defensive Ops" },
  { name: "Network Defense Professional", issuer: "Cisco", category: "Infrastructure" },
  { name: "Cloud Security Specialist", issuer: "AWS Training", category: "Cloud" },
  { name: "Digital Forensics Investigator", issuer: "Autopsy", category: "Forensics" },
  { name: "GRC Specialist", issuer: "Compliance Institute", category: "Governance" },
  { name: "API Security Expert", issuer: "Noname Security", category: "API Security" },
  { name: "Advanced Threat Hunter", issuer: "Splunk", category: "SOC" }
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid">
      <div className="max-w-5xl mx-auto space-y-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-headline text-glow uppercase">Credential Nebula</h1>
          <p className="text-xs font-code text-primary/40 uppercase tracking-widest">97+ Professional Nodes & Global Certifications.</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {CERTS.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="lg:col-span-3 cyber-glass p-12 border-2 border-dashed border-primary/10 flex flex-col items-center justify-center space-y-4">
             <Terminal className="w-12 h-12 text-primary/20" />
             <div className="text-center">
               <p className="text-xl font-headline text-primary/40 uppercase tracking-widest">85+ Additional Credential Nodes Encrypted</p>
               <p className="text-[10px] font-code text-primary/20 uppercase mt-2">API SECURITY | CLOUD | SOC | GRC | PENTESTING | FORENSICS</p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
