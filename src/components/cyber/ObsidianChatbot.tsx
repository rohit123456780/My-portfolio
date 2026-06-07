
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, X, Cpu, Sparkles, ShieldCheck } from 'lucide-react';
import { obsidianChat } from '@/ai/flows/obsidian-agent';

type Message = {
  role: 'user' | 'obsidian';
  text: string;
};

export default function ObsidianChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'obsidian', text: 'SYSTEM_ONLINE: Obsidian Intelligence Subsystem active. Awaiting mission parameters.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Map messages to Genkit history format
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: [{ text: m.text }]
      }));

      const response = await obsidianChat(userMsg, history);
      setMessages(prev => [...prev, { role: 'obsidian', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'obsidian', text: 'ERR: Neural link interrupted. Please retry.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[200] p-4 bg-primary text-primary-foreground rounded-full shadow-[0_0_20px_hsla(var(--primary),0.5)] hover:scale-110 transition-all group"
      >
        <Cpu className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-12 right-0 bg-black/80 text-primary text-[8px] font-code px-2 py-1 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          Invoke Obsidian
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-8 w-[350px] h-[500px] z-[200] cyber-glass border-2 border-primary/30 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="bg-primary/20 p-3 flex justify-between items-center border-b border-primary/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">Obsidian_Agent_v1</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-primary/60 hover:text-primary" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-code text-xs no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 border ${
                    m.role === 'user' 
                      ? 'bg-primary/5 border-primary/20 text-primary/80' 
                      : 'bg-accent/5 border-accent/20 text-accent'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 border border-accent/20 bg-accent/5">
                    <span className="text-accent animate-pulse">ANALYZING_INPUT...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-primary/20 bg-primary/5">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ISSUE COMMAND..."
                  className="bg-transparent border-none outline-none flex-1 text-xs text-primary placeholder:text-primary/20 uppercase font-code"
                />
                <button type="submit" disabled={isTyping}>
                  <Send className={`w-4 h-4 ${isTyping ? 'text-primary/20' : 'text-primary'}`} />
                </button>
              </div>
            </form>

            <div className="p-2 px-4 bg-primary/10 flex justify-between items-center text-[7px] text-primary/30 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-2 h-2" /> Authorized_Write_Access</span>
              <span>Obsidian_Link: Stable</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
