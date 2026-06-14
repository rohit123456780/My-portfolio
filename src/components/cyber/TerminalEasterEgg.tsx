
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Terminal as TerminalIcon, X, Shield, Lock, Activity, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const helpText = `
KALI LINUX TACTICAL OVERRIDE v2.0
---------------------------------
identity      - Access identity core
experience    - View mission logs
projects      - Browse mission select
awards        - Distinction belt intel
internships   - View deployment atlas
certs         - Credential nebula access
resume        - Download briefing
vault         - Infiltrate secure vault
---------------------------------
SYSTEM COMMANDS:
whoami        - Print effective user id
nmap          - Scan local network
ls            - List sectors
clear         - Wipe console history
exit          - Terminate session
status        - View system integrity
`;

export default function TerminalEasterEgg() {
  const { terminalOpen, setTerminalOpen, mode } = useUIStore();
  const [input, setInput] = useState('');
  const router = useRouter();
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp' | 'error' | 'success', text: string }[]>([
    { type: 'resp', text: 'KALI LINUX OS [Version 2024.4]' },
    { type: 'resp', text: 'Kernel: Linux 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC' },
    { type: 'resp', text: '--------------------------------------------------' },
    { type: 'resp', text: 'Type "help" for a list of tactical commands.' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const fullCmd = input.trim().toLowerCase();
    const parts = fullCmd.split(' ');
    const cmd = parts[0];
    
    setHistory(prev => [...prev, { type: 'cmd', text: `root@kali:~# ${input}` }]);

    if (cmd === 'help') {
      setHistory(prev => [...prev, { type: 'resp', text: helpText }]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'exit') {
      setTerminalOpen(false);
    } else if (cmd === 'whoami') {
      setHistory(prev => [...prev, { type: 'success', text: 'rohit_roy (Clearance: Omni-Root)' }]);
    } else if (cmd === 'status') {
      setHistory(prev => [...prev, { type: 'resp', text: `MISSION: ACTIVE\nCONNECTIVITY: OPTIMAL\nMODE: ${mode.toUpperCase()}\nENCRYPTION: AES-256-GCM\nLATENCY: 14ms` }]);
    } else if (cmd === 'nmap') {
      setHistory(prev => [...prev, { type: 'resp', text: 'Starting Nmap 7.94 ( https://nmap.org ) at ' + new Date().toISOString() }]);
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'success', text: 'Scan report for 127.0.0.1\nPORT     STATE SERVICE\n80/tcp   open  http\n443/tcp  open  https\n22/tcp   open  ssh\n3306/tcp closed mysql' }]);
      }, 500);
    } else if (cmd === 'ls') {
      setHistory(prev => [...prev, { type: 'resp', text: 'drwxr-xr-x  identity\ndrwxr-xr-x  experience\ndrwxr-xr-x  projects\ndrwxr-xr-x  awards\ndrwxr-xr-x  internships\n-rw-r--r--  resume.pdf' }]);
    } else if (['identity', 'experience', 'projects', 'awards', 'internships', 'certifications', 'certs', 'resume', 'vault'].includes(cmd)) {
      const path = cmd === 'certs' ? '/certifications' : `/${cmd}`;
      setHistory(prev => [...prev, { type: 'success', text: `[OK] BOOTING SECTOR: ${cmd.toUpperCase()}...` }]);
      setTimeout(() => {
        setTerminalOpen(false);
        router.push(path);
      }, 800);
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `bash: ${cmd}: command not found` }]);
    }
    setInput('');
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className={`fixed inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8 md:w-[750px] h-[500px] z-[500] cyber-glass flex flex-col font-code border-2 ${mode === 'offensive' ? 'border-red-500/30 shadow-red-500/20' : 'border-primary/30 shadow-primary/20'}`}
        >
          {/* Header */}
          <div className="bg-black/80 border-b border-primary/20 p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-[1px] bg-primary/20 mx-1" />
              <TerminalIcon className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">root@kali:~</span>
            </div>
            <button onClick={() => setTerminalOpen(false)} className="text-primary/50 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 text-[12px] space-y-2 scrollbar-hide bg-black/90">
            {history.map((h, i) => (
              <div key={i} className={`whitespace-pre-wrap ${
                h.type === 'cmd' ? 'text-white' : 
                h.type === 'error' ? 'text-red-400 font-bold' : 
                h.type === 'success' ? 'text-accent font-bold' : 'text-primary/70'
              }`}>
                {h.text}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex gap-3 text-white">
              <span className="text-accent font-bold shrink-0">root@kali:~#</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-primary/10"
              />
            </form>
          </div>
          
          {/* Footer Bar */}
          <div className="bg-primary/5 border-t border-primary/10 p-2 px-4 flex justify-between items-center text-[9px] text-primary/40 uppercase tracking-widest">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSH_SECURE</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 14 MS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
              <span>[ SESSION_ESTABLISHED ]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
