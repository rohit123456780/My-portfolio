
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Award, CheckCircle2, Zap, ChevronRight, Star, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Cert {
  name: string;
  issuer: string;
  category: string;
  featured?: boolean;
}

const CERTS: Cert[] = [
  { name: "Baserow Expert", issuer: "Baserow", category: "Collaboration", featured: true },
  { name: "Certified Penetration Testing Engineer", issuer: "Mile2", category: "Offensive Security", featured: true },
  { name: "Google Cybersecurity Professional", issuer: "Google", category: "Cloud & AI", featured: true },
  { name: "APISEC Certified Professional", issuer: "APIsec University", category: "API Security" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", category: "Pentesting" }
];

export default function CertificationsVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-screen w-full bg-[#02040a] overflow-hidden">
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50">
        <div className="flex items-center gap-2 text-primary">
          <ChevronRight className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-code uppercase tracking-[0.5em]">Scroll Sideways to Explore Credential Nebula</span>
          <ChevronRight className="w-4 h-4 animate-bounce rotate-180" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto h-full scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {CERTS.map((cert, idx) => (
          <CertHouse key={idx} cert={cert} index={idx} />
        ))}

        <div className="min-w-[40vw] flex items-center justify-center snap-center">
          <div className="text-center space-y-4">
            <Shield className="w-20 h-20 text-primary/20 mx-auto" />
            <p className="text-xs font-code text-primary/40 uppercase tracking-widest">End of Nebula</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-12 right-12 h-[2px] bg-primary/10">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]"
          style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}

function CertHouse({ cert, index }: { cert: Cert, index: number }) {
  return (
    <div className="min-w-screen md:min-w-[80vw] lg:min-w-[60vw] h-full flex items-center justify-center snap-center px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        className="relative group w-full max-w-2xl"
      >
        <div className="absolute -inset-8 border border-primary/10 bg-primary/5 -z-10 skew-x-3 group-hover:skew-x-0 transition-transform duration-700" />
        
        <div className="cyber-glass p-12 border-l-4 border-l-primary relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
            <span className="text-8xl font-headline italic">CERT_{index + 1}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <Award className="w-10 h-10 text-primary group-hover:text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-code text-accent uppercase tracking-[0.3em]">{cert.category} Node</span>
                <h3 className="text-3xl font-headline group-hover:text-glow transition-all">
                  {cert.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-primary/10">
              <Terminal className="w-5 h-5 text-primary/40" />
              <div className="flex-1">
                <p className="text-[10px] font-code text-primary/40 uppercase">Authority Issuer</p>
                <p className="text-sm font-code text-primary">{cert.issuer}</p>
              </div>
              {cert.featured && (
                <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 border border-accent/20">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-[8px] font-code text-accent uppercase">Featured Node</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-code text-accent uppercase">Verification Status: Confirmed</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary/40" />
                <span className="text-[8px] font-code text-primary/40 uppercase">Aether Verified</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
