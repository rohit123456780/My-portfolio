
'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Shield, Activity, Terminal, Mail, Linkedin, Phone, MapPin, Briefcase, GraduationCap, Cpu, Globe } from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const INTERNSHIPS = [
  { org: "Secuerium Technologies", role: "VAPT Intern", period: "Sep 2025" },
  { org: "Razz Security IT Services", role: "Security Intern", period: "Jul 2025" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "May 2025" },
  { org: "The Red Users", role: "VAPT Intern", period: "Mar 2025" },
  { org: "Hack Secure", role: "Cybersecurity Intern", period: "Jan 2025" },
  { org: "Navodita Infotech", role: "VAPT Intern", period: "Jun 2024" },
  { org: "Brainwave Matrix Solutions", role: "Ethical Hacking Intern", period: "Sep 2024" },
  { org: "GrowIntern", role: "Cybersecurity Intern", period: "Aug 2024" },
  { org: "Edunet / IBM SkillsBuild", role: "AI & Cloud Intern", period: "Jun 2024" },
  { org: "BH Security Plus", role: "Pentest Intern", period: "Apr 2024" },
  { org: "Sutantras.in", role: "Cyber Law Intern", period: "Feb 2024" },
  { org: "Trimbak Infotech", role: "Security Intern", period: "Dec 2023" },
  { org: "TechnoTrench", role: "Ethical Hacking Intern", period: "Oct 2023" },
  { org: "ITPS", role: "Cyber Security Intern", period: "Sep 2023" },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jul 2023" },
  { org: "StartHere", role: "Security Intern", period: "Jun 2023" },
  { org: "NexaSynergy Innovations", role: "Cybersecurity Intern", period: "Apr 2023" },
  { org: "Sturtle Security", role: "Cybersecurity Intern", period: "Feb 2023" },
  { org: "ShadowFox", role: "VAPT Intern", period: "May 2024" },
  { org: "Pinnacle Labs", role: "Cybersecurity Intern", period: "Oct 2022" },
  { org: "Let's We Hack", role: "Ethical Hacking Intern", period: "Aug 2022" },
  { org: "SecureSphere Foundation", role: "Security Intern", period: "May 2022" },
  { org: "Cyber Secured India", role: "Digital Forensics Intern", period: "Feb 2022" },
  { org: "DeltaClause", role: "Ethical Hacking Intern", period: "Dec 2021" },
  { org: "TechnoHacks EduTech", role: "Ethical Hacking Intern", period: "Oct 2021" },
  { org: "Springboard", role: "Career Track Intern", period: "Jan 2021" },
  { org: "CyberDosti", role: "Ethical Hacking Intern", period: "Oct 2020" }
];

const PROJECTS = [
  { title: "SquaredUp MSS Dashboard", desc: "Real-time visibility into Zendesk and Splunk for MSS customers." },
  { title: "Baserow Database Transition", desc: "Migration of Ops List into a role-based system for compliance." },
  { title: "Secure Mail & Outlook Hardening", desc: "cPanel email management and hardening Outlook via SSL/TLS." },
  { title: "AI-Based XSS Detection", desc: "ML models for real-time web attack identification." },
  { title: "Network Packet Analyzer", desc: "Python tool for real-time traffic extraction and protocol auditing." },
  { title: "Cybersecurity Ops Lab", desc: "10-month lab for threat detection, forensics, and IDS/IPS." },
  { title: "Web Vulnerability Scanner", desc: "Automated scanner for XSS, SQLi, and IDOR." },
  { title: "Image Encryption (Pixel XOR)", desc: "XOR-based pixel encryption for secure visual data." },
  { title: "Caesar Cipher Tool", desc: "Python tool for classical encryption and decryption." },
  { title: "Password Complexity Checker", desc: "Evaluator for password strength based on entropy." },
  { title: "Secure Login Page", desc: "Auth system with bcrypt hashing and session management." },
  { title: "Network Security Monitor", desc: "Traffic monitoring system using IDS/IPS methodologies." },
  { title: "Basic Keylogger", desc: "Python tool for recording keystrokes to analyze security risks." },
  { title: "Metasploit Payload Dev", desc: "Lab-based payload development and analysis." }
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

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
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
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 pointer-events-none" />
          
          <div 
            ref={resumeRef}
            className="bg-white text-slate-900 p-8 md:p-12 shadow-2xl mx-auto w-full max-w-[950px] font-sans selection:bg-primary/20"
            style={{ minHeight: '1300px' }}
          >
            {/* HEADER */}
            <header className="border-b-4 border-slate-900 pb-6 mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4 text-slate-900">ROHIT ROY</h1>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91-6294067930</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> dashingraj447@gmail.com</span>
                <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> linkedin.com/in/rohit-roy-rrr</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> West Bengal, India</span>
              </div>
            </header>

            <div className="space-y-8">
              {/* SUMMARY */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3 flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> Professional Summary
                </h2>
                <p className="text-[11px] leading-relaxed text-slate-700 text-justify">
                  Dedicated cybersecurity practitioner with hands-on experience in VAPT, incident response, network security, digital forensics, and OT/ICS environments. Skilled in managing secure IT infrastructures, email systems, cloud integrations, and segmentation-based network hardening across enterprise and industrial control system settings. Track record of real-world security assessments, exploit development, packet analysis, secure coding, and compliance-driven system administration.
                </p>
              </section>

              {/* EDUCATION */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-3 h-3" /> Education
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase">B.Sc. (Hons) Adv. Networking & Cyber Security</p>
                    <p className="text-[9px] text-slate-500">Brainware University, Kolkata</p>
                    <p className="text-[9px] font-bold text-primary">2023 – 2027 | 63% (Year 3)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase">Class XII (Arts)</p>
                    <p className="text-[9px] text-slate-500">St. Joseph's Convent</p>
                    <p className="text-[9px] font-bold text-slate-600">2022 – 2023 | 59%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase">Class X</p>
                    <p className="text-[9px] text-slate-500">D.A.V. Public School</p>
                    <p className="text-[9px] font-bold text-slate-600">2020 – 2021 | 70%</p>
                  </div>
                </div>
              </section>

              {/* WORK EXPERIENCE */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Work Experience
                </h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[11px] font-bold uppercase text-slate-900">OT Engineering Administrator L1</h3>
                      <span className="text-[9px] font-bold text-slate-500">Oct 2025 – Present</span>
                    </div>
                    <p className="text-[9px] font-bold text-primary uppercase mb-2">Radian Generation | Hybrid</p>
                    <p className="text-[9px] text-slate-600 mb-2 leading-relaxed">Working within OT and industrial control system (ICS) environments to strengthen cybersecurity posture, documentation governance, and compliance-driven engineering processes supporting renewable energy operations.</p>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      <p className="text-[9px] text-slate-700"><strong>OT / ICS Cybersecurity:</strong> Enforce security-aligned engineering practices across OT environments, emphasizing risk awareness, access governance, and operational integrity.</p>
                      <p className="text-[9px] text-slate-700"><strong>Security Documentation & SOPs:</strong> Develop, maintain, and standardize OT security documentation, SOPs, and change records to support audit readiness and regulatory compliance.</p>
                      <p className="text-[9px] text-slate-700"><strong>Change & Risk Management:</strong> Govern OT engineering changes with a security-first approach, ensuring traceability, approval control, and minimized operational risk.</p>
                      <p className="text-[9px] text-slate-700"><strong>Data Governance:</strong> Implement structured data management practices, transitioning from spreadsheet-based tracking to controlled databases.</p>
                      <p className="text-[9px] text-slate-700"><strong>Compliance Alignment:</strong> Support adherence to internal security standards and industry best practices relevant to OT/ICS environments.</p>
                      <p className="text-[9px] text-slate-700"><strong>Process Hardening:</strong> Continuously improve documentation, workflows, and controls to enhance resilience and reliability.</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[11px] font-bold uppercase text-slate-900">IT Administrator</h3>
                      <span className="text-[9px] font-bold text-slate-500">May 2025 – Jul 2025</span>
                    </div>
                    <p className="text-[9px] font-bold text-primary uppercase mb-2">Tech Trek Events | Remote</p>
                    <p className="text-[9px] text-slate-600 mb-2 leading-relaxed">Responsible for managing and securing the organization’s email and network infrastructure, ensuring smooth communication and reliable configurations.</p>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      <p className="text-[9px] text-slate-700"><strong>Email Administration:</strong> Created and configured Outlook accounts with secure incoming/outgoing mail servers.</p>
                      <p className="text-[9px] text-slate-700"><strong>cPanel & Domain Management:</strong> Integrated cPanel domain-based emails with Outlook mailboxes for delivery efficiency.</p>
                      <p className="text-[9px] text-slate-700"><strong>Policy & Rules Implementation:</strong> Designed and enforced security rules for domain-based emails.</p>
                      <p className="text-[9px] text-slate-700"><strong>Marketing Email Configuration:</strong> Set up marketing accounts with reliable delivery parameters.</p>
                      <p className="text-[9px] text-slate-700"><strong>Network Administration:</strong> Configured and maintained SKF and DKNIM rules for network governance.</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[11px] font-bold uppercase text-slate-900">Technical Support Administrator</h3>
                      <span className="text-[9px] font-bold text-slate-500">Jun 2023 – May 2025</span>
                    </div>
                    <p className="text-[9px] font-bold text-primary uppercase mb-2">HackingFlix | Remote</p>
                    <div className="grid grid-cols-1 gap-1.5 pl-4 mt-2">
                      <p className="text-[9px] text-slate-700">• Resolved technical issues and provided prompt support to a diverse user base.</p>
                      <p className="text-[9px] text-slate-700">• Contributed to technical documentation and knowledge content.</p>
                      <p className="text-[9px] text-slate-700">• Managed user accounts, access permissions, and security monitoring.</p>
                      <p className="text-[9px] text-slate-700">• Gained exposure to Segregation of Duties (SoD) and access control practices.</p>
                      <p className="text-[9px] text-slate-700">• Collaborated with cross-functional teams to enhance platform security.</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-8">
                {/* INTERNSHIPS */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Internships
                  </h2>
                  <div className="space-y-1">
                    {INTERNSHIPS.map((intern, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[8px] font-medium text-slate-600 uppercase border-b border-slate-50 pb-0.5">
                        <span className="truncate mr-2"><span className="text-slate-300 font-bold mr-1">[{idx + 1}]</span> {intern.org}</span>
                        <span className="text-slate-400 shrink-0">{intern.period}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PROJECTS */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Key Projects
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {PROJECTS.map((proj, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 border-l-2 border-slate-900">
                        <h4 className="text-[8px] font-bold uppercase text-slate-900 mb-0.5">{proj.title}</h4>
                        <p className="text-[7px] text-slate-500 leading-tight italic">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

            </div>

            <footer className="mt-auto pt-8 border-t border-slate-100 text-center">
              <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em]">Digitally Verified Intelligence Node • Rohit Roy CV</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
