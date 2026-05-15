"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Shield, Zap, Info, Calendar, Globe, Cpu, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Internship {
  org: string;
  role: string;
  period: string;
  domain: 'VAPT' | 'Ethical Hacking' | 'SOC' | 'Digital Forensics' | 'Cloud' | 'AI' | 'GRC' | 'General';
  details: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const INTERNSHIPS: Internship[] = [
  { org: "CyberDosti", role: "Cybersecurity & Ethical Hacking Intern", period: "Dec 2021 – Mar 2022", domain: "Ethical Hacking", details: "Foundational cybersecurity and ethical hacking practices.", level: "Beginner" },
  { org: "Springboard", role: "Cybersecurity Career Track Intern", period: "Apr 2022 – Jan 2023", domain: "General", details: "380+ hrs program with comprehensive capstone project.", level: "Intermediate" },
  { org: "TechnoHacks EduTech", role: "Cybersecurity & Ethical Hacking Intern", period: "Mar 2023 – Apr 2023", domain: "Ethical Hacking", details: "Practical ethical hacking and security testing.", level: "Beginner" },
  { org: "DeltaClause", role: "Cybersecurity & Ethical Hacking Intern", period: "May 2023 – Jun 2023", domain: "Ethical Hacking", details: "Exploitation techniques and defensive strategies.", level: "Beginner" },
  { org: "Cyber Secured India", role: "Cybersecurity & Digital Forensics Intern", period: "Jul 2023 – Oct 2023", domain: "Digital Forensics", details: "Evidence collection and forensic analysis.", level: "Intermediate" },
  { org: "SecureSphere Foundation", role: "Cybersecurity Intern", period: "Nov 2023 – Jan 2024", domain: "General", details: "Organizational security governance and risk awareness.", level: "Intermediate" },
  { org: "Let’s We Hack", role: "Cybersecurity & Ethical Hacking Intern", period: "Feb 2024 – Mar 2024", domain: "Ethical Hacking", details: "Vulnerability assessment and bug bounty methodologies.", level: "Intermediate" },
  { org: "Pinnacle Labs", role: "Cybersecurity Intern", period: "Mar 2024", domain: "General", details: "Lab-based security testing and tools exposure.", level: "Intermediate" },
  { org: "ShadowFox", role: "Cybersecurity Intern", period: "May 2024", domain: "VAPT", details: "Multi-level program spanning beginner to advanced pentesting labs.", level: "Advanced" },
  { org: "Sturtle Security Pvt Ltd", role: "Cybersecurity Intern", period: "May 2024 – Jul 2024", domain: "AI", details: "Projects: AI-based XSS detection system + comprehensive web pentesting.", level: "Advanced" },
  { org: "NexaSynergy Innovations", role: "Cybersecurity Intern", period: "Jun 2024 – Jul 2024", domain: "General", details: "Network security protocols and hardening techniques.", level: "Intermediate" },
  { org: "StartHere", role: "Cybersecurity Intern", period: "Jun 2024", domain: "General", details: "Infrastructure security and cloud awareness.", level: "Beginner" },
  { org: "Msinterface Technologies", role: "Cybersecurity Intern", period: "Jun 2024 – Aug 2024", domain: "VAPT", details: "Execution of 5 major security projects in a corporate environment.", level: "Advanced" },
  { org: "ITPS", role: "Cyber Security Intern", period: "Jun 2024 – Jul 2024", domain: "General", details: "IT security problem solving and support operations.", level: "Intermediate" },
  { org: "TechnoTrench", role: "Cybersecurity & Ethical Hacking Intern", period: "Jun 2024 – Jul 2024", domain: "Ethical Hacking", details: "Scripting for security and automated pentesting tools.", level: "Intermediate" },
  { org: "Trimbak Infotech", role: "Cyber Security Intern", period: "Jul 2024 – Aug 2024", domain: "VAPT", details: "Secure login system development + payload development projects.", level: "Advanced" },
  { org: "Sutantras.in", role: "Cyber Security Intern", period: "Jul 2024 – Sep 2024", domain: "GRC", details: "Cyber Law & Information Security Framework analysis.", level: "Intermediate" },
  { org: "BH Security Plus", role: "Penetration Testing Intern", period: "Jul 2024 – Aug 2024", domain: "VAPT", details: "Deep-dive into offensive security and reporting.", level: "Advanced" },
  { org: "Edunet Foundation", role: "AI & Cloud Intern", period: "Jul 2024 – Aug 2024", domain: "Cloud", details: "IBM SkillsBuild: IBM Cloud + AI/ML training and deployment.", level: "Intermediate" },
  { org: "GrowIntern", role: "Cybersecurity Intern", period: "Aug 2024 – Sep 2024", domain: "General", details: "Emerging threat research and mitigation strategies.", level: "Intermediate" },
  { org: "Brainwave Matrix Solutions", role: "Cybersecurity & Ethical Hacking Intern", period: "Oct 2024 – Jan 2025", domain: "Ethical Hacking", details: "Network intrusion detection and defense labs.", level: "Intermediate" },
  { org: "Navodita Infotech", role: "Cybersecurity Intern", period: "Jan 2025 – Feb 2025", domain: "General", details: "Execution of 5 major cybersecurity implementation projects.", level: "Advanced" },
  { org: "Hack Secure", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "General", details: "Security audit practices and compliance checking.", level: "Intermediate" },
  { org: "The Red Users", role: "Cybersecurity Intern", period: "Apr 2025 – May 2025", domain: "VAPT", details: "SQLi/XSS pentesting + professional technical reports.", level: "Advanced" },
  { org: "Redynox", role: "Cybersecurity Intern", period: "Jun 2025 – Jul 2025", domain: "General", details: "Security architecture design and implementation.", level: "Intermediate" },
  { org: "Razz Security IT Services", role: "Cybersecurity Intern", period: "Jul 2025 – Aug 2025", domain: "General", details: "Data-driven security operations and analytics.", level: "Intermediate" },
  { org: "Secuerium Technologies", role: "Cybersecurity Intern", period: "Aug 2025 – Oct 2025", domain: "VAPT", details: "Advanced VAPT focus for enterprise client systems.", level: "Advanced" }
];

const CATEGORIES = ["ALL", "VAPT", "Ethical Hacking", "SOC", "Digital Forensics", "Cloud", "AI", "GRC"];

export default function InternshipAtlas() {
  const [filter, setFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedNode, setSelectedNode] = useState<Internship | null>(null);

  const filtered = useMemo(() => {
    return INTERNSHIPS.filter(i => {
      const matchesSearch = i.org.toLowerCase().includes(filter.toLowerCase()) || 
                            i.role.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || i.domain === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [filter, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-xs font-code text-accent uppercase tracking-[0.3em]">Deployment Atlas</span>
          </div>
          <h2 className="text-4xl font-headline text-glow">
            27+ INTERNSHIPS <span className="text-primary/50 text-2xl">MAP_SYNCED</span>
          </h2>
          <p className="text-[10px] font-code text-primary/40 uppercase max-w-md">
            Tracing professional growth from foundational ethics to advanced offensive security deployments.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input 
              type="text" 
              placeholder="QUERY NODE..." 
              className="bg-primary/5 border border-primary/20 p-3 pl-10 font-code text-xs uppercase focus:border-primary outline-none text-primary w-48 transition-all focus:w-64"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 text-[10px] font-code border transition-all uppercase tracking-widest",
              activeCategory === cat 
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsla(var(--primary),0.3)]" 
                : "bg-primary/5 border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Atlas Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <motion.div 
              key={item.org + item.period}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setSelectedNode(item)}
              className={cn(
                "group relative h-32 cyber-glass flex flex-col items-center justify-center p-4 text-center hover:border-accent transition-all cursor-pointer overflow-hidden",
                item.level === 'Advanced' && "border-primary/50 bg-primary/5"
              )}
            >
              <div className="absolute top-0 left-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity">
                {item.level === 'Advanced' ? <Zap className="w-3 h-3 text-accent" /> : <Shield className="w-2 h-2 text-primary" />}
              </div>
              
              <span className="text-[10px] font-headline tracking-tighter leading-tight group-hover:text-glow transition-all mb-1">{item.org}</span>
              <span className="text-[8px] font-code text-primary/40 uppercase line-clamp-1">{item.domain}</span>
              
              <div className="mt-3 w-8 h-[1px] bg-primary/20 group-hover:bg-accent group-hover:w-full transition-all duration-500" />
              
              {/* Animated Detail Hint */}
              <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Info className="w-2 h-2 text-accent" />
                <span className="text-[6px] font-code text-accent uppercase">Access Intel</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Node Intel Overlay (Modal) */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-full max-w-2xl cyber-glass p-8 relative border-glow"
            >
              <button 
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
              >
                <Terminal className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-primary/20 pb-4">
                  <div className="p-4 bg-primary/10 border border-primary/30">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline text-glow">{selectedNode.org}</h3>
                    <p className="text-accent font-code text-xs uppercase tracking-widest">{selectedNode.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-xs font-code">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-primary/40 uppercase flex items-center gap-2"><Calendar className="w-3 h-3" /> Mission Duration</p>
                      <p className="text-foreground">{selectedNode.period}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-primary/40 uppercase flex items-center gap-2"><Cpu className="w-3 h-3" /> Technical Domain</p>
                      <p className="text-foreground">{selectedNode.domain}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-primary/40 uppercase flex items-center gap-2"><Zap className="w-3 h-3" /> Difficulty Rating</p>
                      <p className={cn(
                        "font-bold",
                        selectedNode.level === 'Advanced' ? 'text-accent' : 'text-primary'
                      )}>{selectedNode.level.toUpperCase()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-primary/40 uppercase flex items-center gap-2"><Globe className="w-3 h-3" /> Status</p>
                      <p className="text-accent">MISSION COMPLETE</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 p-6">
                  <p className="text-[10px] text-primary/40 uppercase mb-2">Operational Debrief:</p>
                  <p className="text-sm leading-relaxed opacity-90 italic">
                    "{selectedNode.details}"
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedNode(null)}
                  className="w-full bg-primary text-primary-foreground py-3 font-headline uppercase tracking-widest hover:bg-accent transition-all"
                >
                  Return to Atlas
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}