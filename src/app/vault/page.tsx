"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldAlert, Lock, Unlock, ArrowLeft, Mail, Linkedin, Phone, Activity } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/lib/store';

export default function VaultPage() {
  const { isVaultUnlocked, setVaultUnlocked } = useUIStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp' | 'error' | 'success', text: string }[]>([
    { type: 'resp', text: 'ROHIT_ROY_SECURE_VAULT_v4.2.0' },
    { type: 'resp', text: 'ENCRYPTION: AES-256-GCM' },
    { type: 'resp', text: `STATUS: ${isVaultUnlocked ? 'UNLOCKED' : 'LOCKED'}` },
    { type: 'resp', text: isVaultUnlocked ? 'ACCESS_GRANTED. SECURE_INTEL_LOADED.' : 'TYPE "help" TO LIST AVAILABLE EXPLOIT COMMANDS.' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, (args: string[]) => void> = {
    'help': () => {
      setHistory(prev => [...prev, { type: 'resp', text: 'COMMANDS: help, ls, cat [file], crack --pin [code], clear, exit' }]);
    },
    'ls': () => {
      setHistory(prev => [...prev, { type: 'resp', text: 'FILE_SYSTEM: credentials.pkg, hint.txt, firewall.log' }]);
    },
    'cat': (args) => {
      const file = args[0];
      if (file === 'hint.txt') {
        setHistory(prev => [...prev, { type: 'resp', text: 'CLUE: The day of the middle of July. (DDMM)' }]);
      } else if (file === 'credentials.pkg') {
        setHistory(prev => [...prev, { type: 'error', text: 'ERR: FILE_ENCRYPTED. USE "crack" COMMAND.' }]);
      } else if (file === 'firewall.log') {
        setHistory(prev => [...prev, { type: 'resp', text: 'LOG: Unauthorized access detected from node 192.168.1.5' }]);
      } else {
        setHistory(prev => [...prev, { type: 'error', text: `ERR: FILE_NOT_FOUND: ${file || 'NULL'}` }]);
      }
    },
    'crack': (args) => {
      const pinIndex = args.indexOf('--pin');
      const pin = args[pinIndex + 1];
      if (pin === '1507') {
        setHistory(prev => [...prev, { type: 'success', text: 'ACCESS_GRANTED. DECRYPTING_VAULT...' }]);
        setTimeout(() => setVaultUnlocked(true), 1500);
      } else {
        setHistory(prev => [...prev, { type: 'error', text: 'ERR: INVALID_SIGNATURE. SYSTEM_LOCKDOWN_IMMINENT.' }]);
      }
    },
    'clear': () => setHistory([{ type: 'resp', text: 'SESSION_RESET.' }]),
    'exit': () => {
       window.location.href = '/';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setHistory(prev => [...prev, { type: 'cmd', text: `root@vault:~# ${input}` }]);

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `ERR: COMMAND_NOT_RECOGNIZED: ${cmd}` }]);
    }
    setInput('');
  };

  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24 cyber-grid flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-end border-b border-primary/20 pb-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline flex items-center gap-3">
              {isVaultUnlocked ? (
                <Unlock className="w-8 h-8 text-accent" />
              ) : (
                <Lock className="w-8 h-8 text-primary" />
              )}
              {isVaultUnlocked ? 'VAULT_UNLOCKED' : 'BLACK_OPS_VAULT'}
            </h1>
            <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">
              {isVaultUnlocked ? 'MISSION_SUCCESS: ALL_INTEL_DECRYPTED' : 'Capture The Flag: Bruteforce authorization to access secure intel.'}
            </p>
          </div>
          <Link href="/" className="text-[10px] font-code text-primary/60 hover:text-primary flex items-center gap-2 group transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
            {isVaultUnlocked ? 'RETURN_TO_BASE' : 'ABORT_MISSION'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
          <div className="lg:col-span-2 cyber-glass border-2 border-primary/20 flex flex-col relative overflow-hidden">
             {/* Terminal Header */}
             <div className="bg-primary/10 border-b border-primary/20 p-2 px-4 flex justify-between items-center text-[10px]">
               <div className="flex items-center gap-2">
                 <TerminalIcon className="w-3 h-3" />
                 <span className="font-code text-primary/60 uppercase">System_Exploit_Tool_v1</span>
               </div>
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/50" />
                 <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                 <div className="w-2 h-2 rounded-full bg-green-500/50" />
               </div>
             </div>

             <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 font-code text-xs">
               {history.map((h, i) => (
                 <div key={i} className={
                   h.type === 'cmd' ? 'text-primary/90' : 
                   h.type === 'error' ? 'text-red-400' : 
                   h.type === 'success' ? 'text-accent' : 'text-primary/60'
                 }>
                   {h.text}
                 </div>
               ))}
               {!isVaultUnlocked && (
                 <form onSubmit={handleSubmit} className="flex gap-2">
                   <span className="text-primary/40">root@vault:~#</span>
                   <input 
                     autoFocus
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     className="bg-transparent border-none outline-none flex-1 text-primary"
                   />
                 </form>
               )}
               {isVaultUnlocked && (
                 <div className="mt-4 p-4 border border-accent/20 bg-accent/5 space-y-2">
                   <div className="text-accent font-bold tracking-widest flex items-center gap-2">
                     <Activity className="w-4 h-4 animate-pulse" /> DECRYPTION_COMPLETE
                   </div>
                   <p className="text-[10px] font-code text-accent/60 uppercase">
                     ALL SECURE CONTACT NODES HAVE BEEN BROADCAST TO THE IDENTITY CORE.
                   </p>
                 </div>
               )}
             </div>
          </div>

          <div className="cyber-glass p-6 border-primary/20 flex flex-col justify-center items-center text-center space-y-6">
            <AnimatePresence mode="wait">
              {!isVaultUnlocked ? (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="relative inline-block">
                    <ShieldAlert className="w-16 h-16 text-red-500/20 animate-pulse" />
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-headline uppercase text-red-500/80">Payload Blocked</h3>
                  <p className="text-[10px] font-code text-primary/40">VAULT REQUIRES 4-DIGIT PIN AUTHENTICATION. USE COMMANDS TO DISCOVER VECTOR.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="unlocked"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-8 w-full"
                >
                  <Unlock className="w-16 h-16 text-accent mx-auto" />
                  <div className="space-y-4">
                    <IntelRow icon={Linkedin} label="MATRIX" value="linkedin.com/in/rohit-roy-rrr" />
                    <IntelRow icon={Mail} label="SECURE_MAIL" value="dashingraj447@gmail.com" />
                    <IntelRow icon={Phone} label="COMM_LINK" value="+91-6294067930" />
                  </div>
                  <Link href="/identity" className="block w-full py-3 bg-accent text-accent-foreground font-headline uppercase tracking-widest text-[10px] hover:bg-white transition-colors">
                    View Identity Core
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

function IntelRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div className="p-2 border border-accent/20 bg-accent/5 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all">
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[8px] font-code text-accent/40 uppercase tracking-widest">{label}</p>
      <p className="text-xs font-code text-primary break-all">{value}</p>
    </div>
  );
}