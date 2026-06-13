'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Shield, Activity, Lock, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate fetch/auth process before download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/Rohit_Roy_Resume.pdf';
      link.download = 'Rohit_Roy_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-widest uppercase">BACK_TO_COMMAND</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Action Panel */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] font-code uppercase tracking-[0.3em]">Authorized Access Only</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline text-glow uppercase text-primary leading-none">
                Mission<br/>Briefing
              </h1>
              <p className="text-xs font-code text-primary/40 uppercase tracking-widest leading-relaxed">
                Subject: Rohit Roy<br/>
                Role: OT Security Engineer<br/>
                Intel: CV_v4.2.0_SECURE
              </p>
            </div>

            <div className="cyber-glass p-6 border border-primary/20 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <FileText className="w-16 h-16" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-code text-primary/40 uppercase border-b border-primary/10 pb-2">
                   <Lock className="w-3 h-3" /> Tactical Download
                </div>
                
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_hsla(var(--primary),0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isDownloading ? (
                    <Activity className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  )}
                  {isDownloading ? 'ENCRYPTING...' : 'DOWNLOAD CV'}
                </button>
                
                <div className="text-[8px] font-code text-primary/30 uppercase text-center italic">
                  Format: PDF (A4) | Encryption: AES-256-RSC
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-[9px] font-code text-primary/60 uppercase">
                  <span>File Integrity</span>
                  <span className="text-accent">VERIFIED</span>
                </div>
                <div className="h-1 w-full bg-primary/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border border-primary/10 bg-primary/5 text-[9px] font-code text-primary/40 uppercase space-y-2">
              <p className="flex items-center gap-2"><Terminal className="w-3 h-3" /> Primary Node: WB_INDIA</p>
              <p className="flex items-center gap-2"><Activity className="w-3 h-3" /> System Status: OPTIMAL</p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 h-[800px] cyber-glass border border-primary/20 relative group">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors" />
            
            {/* Tactics UI Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
              <div className="bg-black/80 px-3 py-1 border border-primary/20 text-[8px] font-code text-primary uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live_Preview_Stream
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 border border-primary/20 bg-primary/10" />
                <div className="w-2 h-2 border border-primary/20 bg-primary/10" />
              </div>
            </div>

            <iframe 
              src="/Rohit_Roy_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
              className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity rounded-sm"
              title="Resume Preview"
            />
            
            {/* Scanning line for visual effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-[scanline_4s_linear_infinite] pointer-events-none" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(800px); }
        }
      `}</style>
    </main>
  );
}
