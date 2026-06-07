
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, ArrowLeft, CheckCircle2, Star } from 'lucide-react';
import Link from 'next/link';

const CERTS = [
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", featured: true },
  { name: "Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", featured: true },
  { name: "Google Cybersecurity Professional", issuer: "Google", category: "Cloud & AI", featured: true },
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API Security" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Pentesting" }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cyber-glass p-8 border border-primary/10 hover:border-primary/40 transition-all group relative"
            >
              {cert.featured && (
                <div className="absolute top-0 right-0 p-3">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                </div>
              )}
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 border border-primary/20 inline-block">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-headline uppercase leading-tight group-hover:text-glow">{cert.name}</h3>
                  <p className="text-[10px] font-code text-primary/60 uppercase">{cert.issuer}</p>
                </div>
                <div className="pt-6 border-t border-primary/10 flex justify-between items-center">
                  <span className="text-[8px] font-code text-accent uppercase tracking-widest">{cert.category}</span>
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
