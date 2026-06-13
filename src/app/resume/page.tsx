
'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Shield, Activity, Terminal, Mail, Linkedin, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const FULL_INTERNSHIP_LIST = [
  { org: "Secuerium Technologies", role: "Cybersecurity Intern (VAPT)", period: "Sep 2025 – Sep 2025" },
  { org: "Razz Security IT Services LLP", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "May 2025 – Jun 2025" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Mar 2025 – Apr 2025" },
  { org: "Hack Secure", role: "Cybersecurity Intern", period: "Jan 2025 – Feb 2025" },
  { org: "Navodita Infotech", role: "Cybersecurity Intern", period: "Nov 2024 – Dec 2024" },
  { org: "Brainwave Matrix Solutions", role: "Cybersecurity & Ethical Hacking Intern", period: "Sep 2024 – Oct 2024" },
  { org: "GrowIntern", role: "Cybersecurity Intern", period: "Aug 2024 – Aug 2024" },
  { org: "Edunet Foundation / IBM SkillsBuild", role: "AI & Cloud Intern", period: "Jun 2024 – Jul 2024" },
  { org: "BH Security Plus", role: "Penetration Testing Intern", period: "Apr 2024 – May 2024" },
  { org: "Sutantras.in", role: "Cyber Law & Information Security Framework Intern", period: "Feb 2024 – Mar 2024" },
  { org: "Trimbak Infotech", role: "Cyber Security Intern", period: "Dec 2023 – Jan 2024" },
  { org: "TechnoTrench", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2023 – Nov 2023" },
  { org: "ITPS", role: "Cyber Security Intern", period: "Sep 2023 – Sep 2023" },
  { org: "Msinterface Technologies Pvt Ltd", role: "Cybersecurity Intern", period: "Jul 2023 – Aug 2023" },
  { org: "StartHere", role: "Cybersecurity Intern", period: "Jun 2023 – Jun 2023" },
  { org: "NexaSynergy Innovations", role: "Cybersecurity Intern", period: "Apr 2023 – May 2023" },
  { org: "Sturtle Security Pvt Ltd", role: "Cybersecurity Intern", period: "Feb 2023 – Mar 2023" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "Dec 2022 – Jan 2023" },
  { org: "Pinnacle Labs", role: "Cybersecurity Intern", period: "Oct 2022 – Nov 2022" },
  { org: "Let's We Hack", role: "Cybersecurity & Ethical Hacking Intern", period: "Aug 2022 – Sep 2022" },
  { org: "SecureSphere Foundation / CFCS2R", role: "Cybersecurity Intern", period: "May 2022 – Jul 2022" },
  { org: "Cyber Secured India", role: "Cybersecurity & Digital Forensics Intern", period: "Feb 2022 – Apr 2022" },
  { org: "DeltaClause", role: "Cybersecurity & Ethical Hacking Intern", period: "Dec 2021 – Jan 2022" },
  { org: "TechnoHacks EduTech", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2021 – Nov 2021" },
  { org: "Springboard", role: "Cybersecurity Career Track Intern", period: "Jan 2021 – Sep 2021" },
  { org: "CyberDosti", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2020 – Dec 2020" }
];

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
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 pointer-events-none" />
            
            <div 
              ref={resumeRef}
              className="bg-white text-slate-900 p-8 md:p-12 shadow-2xl mx-auto w-full max-w-[850px] font-sans selection:bg-primary/20"
              style={{ minHeight: '1100px' }}
            >
              <header className="border-b-4 border-slate-900 pb-6 mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4 text-slate-900">ROHIT ROY</h1>
                <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91-6294067930</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> dashingraj447@gmail.com</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> linkedin.com/in/rohit-roy-rrr</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> West Bengal, India</span>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-10">
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> Professional Summary
                  </h2>
                  <p className="text-[11px] leading-relaxed text-slate-700 text-justify">
                    Dedicated cybersecurity practitioner with hands-on experience in VAPT, incident response, network security, digital forensics, and OT/ICS environments. Skilled in managing secure IT infrastructures, email systems, cloud integrations, and segmentation-based network hardening across enterprise and industrial control system settings. Track record of real-world security assessments, exploit development, packet analysis, secure coding, and compliance-driven system administration. Backed by an extensive certification portfolio spanning AppSec, cloud, API security, and penetration testing.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                      <Shield className="w-3 h-3" /> Work Experience
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xs font-bold uppercase text-slate-900">OT Engineering Administrator L1</h3>
                          <span className="text-[8px] font-bold text-slate-500">Oct 2025 – Present</span>
                        </div>
                        <p className="text-[9px] font-bold text-primary uppercase mb-1">Radian Generation | Hybrid</p>
                        <p className="text-[9px] text-slate-600 leading-tight">Strengthen cybersecurity posture and documentation governance in renewable energy OT environments. Develop and standardize OT security SOPs and support audit readiness.</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xs font-bold uppercase text-slate-900">IT Administrator</h3>
                          <span className="text-[8px] font-bold text-slate-500">May 2025 – Jul 2025</span>
                        </div>
                        <p className="text-[9px] font-bold text-primary uppercase mb-1">Tech Trek Events | Remote</p>
                        <p className="text-[9px] text-slate-600 leading-tight">Managed secure email infrastructure using cPanel and Outlook integration. Enforced domain-based security rules and handled SSL/TLS configurations.</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xs font-bold uppercase text-slate-900">Technical Support Administrator</h3>
                          <span className="text-[8px] font-bold text-slate-500">Jun 2023 – May 2025</span>
                        </div>
                        <p className="text-[9px] font-bold text-primary uppercase mb-1">HackingFlix | Remote</p>
                        <p className="text-[9px] text-slate-600 leading-tight">Provided end-to-end technical support and access control management. Gained exposure to Segregation of Duties (SoD) and security monitoring.</p>
                      </div>
                    </div>
                  </section>

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
                </div>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> Internship Atlas (Operational History)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 border-t border-slate-100 pt-4">
                    {FULL_INTERNSHIP_LIST.map((intern, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[8px] font-medium text-slate-600 uppercase">
                        <span className="truncate mr-2"><span className="text-slate-400 font-bold mr-1">[{idx + 1}]</span> {intern.org} – {intern.role}</span>
                        <span className="text-slate-400 shrink-0">{intern.period}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Key Projects (Strategic Narrative)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                      <h4 className="text-[9px] font-bold uppercase mb-1">SquaredUp MSS Dashboard</h4>
                      <p className="text-[8px] text-slate-600 leading-relaxed italic">Real-time security visibility integrating Zendesk and Splunk data for MSS customers.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                      <h4 className="text-[9px] font-bold uppercase mb-1">AI-Based XSS Detection System</h4>
                      <p className="text-[8px] text-slate-600 leading-relaxed italic">Machine learning classification models to distinguish malicious web payloads with high accuracy.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                      <h4 className="text-[9px] font-bold uppercase mb-1">Cybersecurity Ops & Threat Analysis Lab</h4>
                      <p className="text-[8px] text-slate-600 leading-relaxed italic">10-month intensive lab environment focusing on threat detection, forensics, and IDS/IPS methodologies.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border-l-2 border-slate-900">
                      <h4 className="text-[9px] font-bold uppercase mb-1">Network Packet Analyzer & Sniffer</h4>
                      <p className="text-[8px] text-slate-600 leading-relaxed italic">Python-based real-time traffic extraction and protocol auditing tool for security analysis.</p>
                    </div>
                  </div>
                </section>
              </div>

              <footer className="mt-12 pt-6 border-t border-slate-100 text-center">
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em]">Digitally Verified Intelligence Node • Rohit Roy CV</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
