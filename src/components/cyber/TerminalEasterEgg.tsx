
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Terminal as TerminalIcon, X, Shield, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const commands: Record<string, string> = {
  'help': 'AVAILABLE_VECTORS: identity, experience, projects, awards, internships, certs, resume, vault, clear, exit',
  'whoami': 'ID_RESOLVED: ROHIT_ROY | TECHNICAL_ENGINEER | OT/ICS_SPECIALIST | SOC_PRACTITIONER',
  'nmap': 'SCANNING_HOST... [DONE] FOUND_6_ACTIVE_NODES: IDENTITY, EXPERIENCE, PROJECTS, AWARDS, INTERNSHIPS, CERTS',
  'ls': 'TOTAL_OBJECTS: 7 | SECTORS: identity, experience, projects, awards, internships, certs, resume',
  'status': 'MISSION: ACTIVE | CONNECTIVITY: OPTIMAL | ENCRYPTION: AES-256 | LATENCY: 12ms',
};

export default function TerminalEasterEgg() {
  const { terminalOpen, setTerminalOpen } = useUIStore();
  const [input, setInput] = useState('');
  const router = useRouter();
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp' | 'error', text: string }[]>([
    { type: 'resp', text: 'ROHIT_ROY_OPS_CONSOLE [v4.2.1]' },
    { type: 'resp', text: 'KALI_LINUX_EMULATION_MODE: ACTIVE' },
    { type: 'resp', text: 'TYPE "help" TO LIST NAV_VECTORS.' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`inter' && e.ctrlKey) {
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
    
    const newHistory = [...history, { type: 'cmd' as const, text: `root@kali:~# ${input}` }];

    if (cmd === 'clear') {
      setHistory([{ type: 'resp', text: 'TERMINAL_SESSION_RESET.' }]);
    } else if (cmd === 'exit') {
      setTerminalOpen(false);
    } else if (['identity', 'experience', 'projects', 'awards', 'internships', 'certifications', 'certs', 'resume', 'vault'].includes(cmd)) {
      const path = cmd === 'certs' ? '/certifications' : `/${cmd}`;
      newHistory.push({ type: 'resp', text: `EXECUTING_NAVIGATION_PROTOCOL: REDIRECTING TO ${cmd.toUpperCase()}...` });
      setHistory(newHistory);
      setTimeout(() => {
        setTerminalOpen(false);
        router.push(path);
      }, 800);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'resp' as const, text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'error' as const, text: `ERR: CMD_NOT_FOUND: ${cmd}. TYPE "help" FOR VECTOR LIST.` });
      setHistory(newHistory);
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
          className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8 md:w-[700px] h-[450px] z-[500] cyber-glass flex flex-col font-code border-2 border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="bg-primary/20 border-b border-primary/30 p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-[1px] bg-primary/20 mx-1" />
              <TerminalIcon className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">root@kali_terminal:~</span>
            </div>
            <button onClick={() => setTerminalOpen(false)} className="text-primary/50 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 text-[13px] space-y-2 scrollbar-hide bg-black/40">
            {history.map((h, i) => (
              <div key={i} className={
                h.type === 'cmd' ? 'text-primary' : 
                h.type === 'error' ? 'text-red-400' : 'text-primary/60'
              }>
                {h.text}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex gap-3 text-primary">
              <span className="text-accent font-bold">root@kali:~#</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-primary placeholder:text-primary/20"
              />
            </form>
          </div>
          
          <div className="bg-primary/5 border-t border-primary/10 p-2 px-4 flex justify-between items-center text-[9px] text-primary/40 uppercase tracking-widest">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSH_SECURE</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> AES-256</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
              <span>[ SYSTEM_READY ]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
