
'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Shield, Activity, Lock, Terminal, Mail, Linkedin, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Rohit Roy CV.pdf');
    } catch (error) {
      console.error('Tactical PDF Failure:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#02040a] p-4 pt-24 cyber-grid relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span className="tracking-widest uppercase">BACK_TO_COMMAND</span>
          </Link>

          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-primary text-primary-foreground py-3 px-8 font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_hsla(var(--primary),0.3)] disabled:opacity-50 disabled:cursor-not-allowed group text-sm"
          >
            {isDownloading ? (
              <Activity className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
            {isDownloading ? 'PROCESSING...' : 'DOWNLOAD CV'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {/* Printable Resume Container */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 pointer-events-none" />
            
            {/* The actual resume view */}
            <div 
              ref={resumeRef}
              className="bg-white text-slate-900 p-8 md:p-12 shadow-2xl mx-auto w-full max-w-[850px] font-sans selection:bg-primary/20"
              style={{ minHeight: '1100px' }}
            >
              {/* Header */}
              <header className="border-b-4 border-slate-900 pb-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tighter uppercase mb-1 text-slate-900">ROHIT ROY</h1>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">OT Security Engineer | Cybersecurity Practitioner | VAPT Specialist</p>
                  </div>
                  <div className="text-right text-[10px] space-y-0.5 font-medium text-slate-500 uppercase">
                    <p className="flex items-center md:justify-end gap-2"><Phone className="w-3 h-3" /> +91-6294067930</p>
                    <p className="flex items-center md:justify-end gap-2"><Mail className="w-3 h-3" /> dashingraj447@gmail.com</p>
                    <p className="flex items-center md:justify-end gap-2"><Linkedin className="w-3 h-3" /> linkedin.com/in/rohit-roy-rrr</p>
                    <p className="flex items-center md:justify-end gap-2"><MapPin className="w-3 h-3" /> West Bengal, India</p>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-10">
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> Professional Summary
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-700 text-justify">
                      Dedicated cybersecurity practitioner with hands-on experience in VAPT, incident response, network security, digital forensics, and OT/ICS environments. Skilled in managing secure IT infrastructures, email systems, cloud integrations, and segmentation-based network hardening across enterprise and industrial control system settings. Track record of real-world security assessments, exploit development, packet analysis, secure coding, and compliance-driven system administration. Backed by an extensive certification portfolio spanning AppSec, cloud, API security, and penetration testing.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                      <Shield className="w-3 h-3" /> Work Experience
                    </h2>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-sm font-bold uppercase text-slate-900">OT Engineering Administrator L1</h3>
                          <span className="text-[9px] font-bold text-slate-500">Oct 2025 – Present</span>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase mb-2">Radian Generation | Hybrid</p>
                        <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-4">
                          <li>Strengthen cybersecurity posture and documentation governance in renewable energy OT environments.</li>
                          <li>Develop and standardize OT security SOPs and change records to support audit readiness.</li>
                          <li>Govern engineering changes with a security-first approach, ensuring operational integrity.</li>
                          <li>Transitioned spreadsheet-based tracking to controlled databases to improve data governance.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-sm font-bold uppercase text-slate-900">IT Administrator</h3>
                          <span className="text-[9px] font-bold text-slate-500">May 2025 – Jul 2025</span>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase mb-2">Tech Trek Events | Remote</p>
                        <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-4">
                          <li>Managed secure email infrastructure using cPanel and Outlook integration.</li>
                          <li>Enforced domain-based security rules and handled SSL/TLS configurations.</li>
                          <li>Configured SKF and DKNIM rules for enhanced network governance.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-sm font-bold uppercase text-slate-900">Technical Support Administrator</h3>
                          <span className="text-[9px] font-bold text-slate-500">Jun 2023 – May 2025</span>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase mb-2">HackingFlix | Remote</p>
                        <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-4">
                          <li>Provided end-to-end technical support and access control management.</li>
                          <li>Gained exposure to Segregation of Duties (SoD) and security monitoring.</li>
                          <li>Collaborated on platform scalability and reliability initiatives.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                      <Activity className="w-3 h-3" /> Key Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                        <h4 className="text-[10px] font-bold uppercase mb-1">SquaredUp MSS Dashboard</h4>
                        <p className="text-[9px] text-slate-600 leading-relaxed italic">Real-time security visibility integrating Zendesk and Splunk data for MSS customers.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                        <h4 className="text-[10px] font-bold uppercase mb-1">AI-Based XSS Detection System</h4>
                        <p className="text-[9px] text-slate-600 leading-relaxed italic">Machine learning classification models to distinguish malicious web payloads with high accuracy.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                        <h4 className="text-[10px] font-bold uppercase mb-1">Cybersecurity Ops & Threat Analysis Lab</h4>
                        <p className="text-[9px] text-slate-600 leading-relaxed italic">10-month intensive lab environment focusing on threat detection, forensics, and IDS/IPS methodologies.</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-10 border-l border-slate-100 pl-6">
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Education</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 uppercase">B.Sc. (Hons) Advanced Networking & Cyber Security</p>
                        <p className="text-[9px] text-slate-500">Brainware University, Kolkata</p>
                        <p className="text-[9px] font-bold text-primary">2023 – 2027 | 8.86 SGPA</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 uppercase">Class XII (Science)</p>
                        <p className="text-[9px] text-slate-500">St. Joseph's Convent</p>
                        <p className="text-[9px] text-slate-500">Score: 59%</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Core Skills</h2>
                    <div className="flex flex-wrap gap-1">
                      {['VAPT', 'OT Security', 'Incident Response', 'Digital Forensics', 'Splunk', 'Metasploit', 'Python', 'Wireshark', 'ISO 27001', 'Cloud Security', 'API Security'].map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-900 text-white text-[8px] uppercase font-bold">{s}</span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Certifications</h2>
                    <div className="space-y-2">
                      <div className="text-[8px] uppercase">
                        <p className="font-bold text-slate-900">APISEC Certified Pro</p>
                        <p className="text-slate-400">APIsec University</p>
                      </div>
                      <div className="text-[8px] uppercase">
                        <p className="font-bold text-slate-900">C)PTE: Pen Testing Engineer</p>
                        <p className="text-slate-400">Mile2</p>
                      </div>
                      <div className="text-[8px] uppercase">
                        <p className="font-bold text-slate-900">OCI Multicloud Architect</p>
                        <p className="text-slate-400">Oracle</p>
                      </div>
                      <div className="text-[8px] uppercase">
                        <p className="font-bold text-slate-900">97+ Total Creds Verified</p>
                        <p className="text-primary italic">Verify on LinkedIn</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Achievements</h2>
                    <div className="space-y-3">
                      <p className="text-[9px] text-slate-600">Featured Contributor: Stronger Together Publication.</p>
                      <p className="text-[9px] text-slate-600">Global CTF Competitor since 2023.</p>
                      <p className="text-[9px] text-slate-600">TryHackMe Advanced Lab Mastery.</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Personal</h2>
                    <div className="text-[8px] uppercase text-slate-500 space-y-1">
                      <p>DOB: July 15, 2005</p>
                      <p>LANGS: EN, BN, HI</p>
                    </div>
                  </section>
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-12 pt-6 border-t border-slate-100 text-center">
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em]">Digitally Verified Intelligence Node • Rohit Roy CV</p>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media screen {
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        }
      `}</style>
    </main>
  );
}
