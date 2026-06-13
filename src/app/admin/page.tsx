"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Terminal } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background cyber-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md cyber-glass p-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <Terminal className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-2xl font-headline tracking-widest">OT SECURITY CONSOLE</h1>
          <p className="text-[10px] font-code text-primary/50 uppercase">RESTRICTED ACCESS - ADMINISTRATOR ONLY</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-code uppercase text-primary/60 flex items-center gap-2">
              <User className="w-3 h-3" /> Identity Signature
            </label>
            <input 
              type="text" 
              placeholder="ROHIT@OT_SEC"
              className="w-full bg-primary/5 border border-primary/20 p-3 font-code text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-code uppercase text-primary/60 flex items-center gap-2">
              <Lock className="w-3 h-3" /> Access Token
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-primary/5 border border-primary/20 p-3 font-code text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3 font-headline uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all shadow-[0_0_20px_hsla(var(--primary),0.3)]">
          Authorize Access
        </button>

        <div className="text-[8px] text-center font-code text-primary/30 uppercase pt-4">
          Warning: Unauthorized access attempts are logged and transmitted to primary node.
        </div>
      </motion.div>
    </main>
  );
}
