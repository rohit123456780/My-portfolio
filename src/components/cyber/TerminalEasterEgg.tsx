
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { Terminal as TerminalIcon, X, Shield, Lock, Terminal as PromptIcon } from 'lucide-react';

const commands: Record<string, string> = {
  'help': 'AVAILABLE_CMDS: whoami, nmap, decrypt, projects, status, clear, exit',
  'whoami': 'ID_RESOLVED: ROHIT_ROY | TECHNICAL_ENGINEER | OT/ICS_SPECIALIST | SOC_PRACTITIONER',
  'nmap': 'SCANNING... [DONE] FOUND_6_ACTIVE_NODES: IDENTITY, EXPERIENCE, PROJECTS, AWARDS, INTERNSHIPS, CERTS',
  'decrypt': 'DECRYPTING_SECURE_PAYLOAD... ACCESS_GRANTED. WELCOME_TO_THE_LAIR.',
  'projects': 'MISSIONS: SQUAREDUP_MSS, AI_XSS_DETECT, PACKET_ANALYZER, VULN_SCANNER, PIXEL_XOR, CAESAR_CRYPT',
  'status': 'MISSION: ACTIVE | CONNECTIVITY: OPTIMAL | ENCRYPTION: AES-256 | LATENCY: 12ms',
};

export default function TerminalEasterEgg() {
  const { terminalOpen, setTerminalOpen } = useUIStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp', text: string }[]>([
    { type: 'resp', text: 'ROHIT_ROY_OPS_CONSOLE [v2.5.0]' },
    { type: 'resp', text: 'INITIALIZING_SECURE_LINK... DONE.' },
    { type: 'resp', text: 'TYPE "help" TO LIST COMMANDS.' }
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

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'cmd' as const, text: `user@rohit_roy:~$ ${input}` }];

    if (cmd === 'clear') {
      setHistory([{ type: 'resp', text: 'TERMINAL_SESSION_RESET.' }]);
    } else if (cmd === 'exit') {
      setTerminalOpen(false);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'resp' as const, text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'resp' as const, text: `ERR: CMD_NOT_FOUND: ${cmd}` });
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
          className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8 md:w-[600px] h-[400px] z-[500] cyber-glass flex flex-col font-code border-2 border-primary/20"
        >
          <div className="bg-primary/20 border-b border-primary/30 p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-danger/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-gold/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-primary/50" />
              </div>
              <div className="h-4 w-[1px] bg-primary/20 mx-1" />
              <TerminalIcon className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">ROHIT_ROY@CYBER_OPS:~</span>
            </div>
            <button onClick={() => setTerminalOpen(false)} className="text-primary/50 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 text-[12px] space-y-1.5 scrollbar-hide">
            {history.map((h, i) => (
              <div key={i} className={h.type === 'cmd' ? 'text-primary/90' : 'text-primary/60'}>
                {h.text}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex gap-3 text-primary">
              <span className="text-accent">user@rohit_roy:~$</span>
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
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SECURE_LINK</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> AES-256</span>
            </div>
            <span>[ SESSION_ACTIVE ]</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
