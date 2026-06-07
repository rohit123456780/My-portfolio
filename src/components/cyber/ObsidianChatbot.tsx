'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, X, Cpu, ShieldCheck, Lock, Unlock, Activity, Bot } from 'lucide-react';
import { obsidianChat } from '@/ai/flows/obsidian-agent';

type Message = {
  role: 'user' | 'obsidian' | 'system';
  text: string;
  type?: 'standard' | 'success' | 'update';
};

const OWNER_PASSWORD = "1507"; 

export default function ObsidianChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'obsidian', text: 'SYSTEM_ONLINE: Obsidian Intelligence Core active. I am Rohit Roy\'s personal GenAI assistant. How can I assist with your mission logs today?' }
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

    // Authentication Logic
    if (userMsg.toLowerCase().startsWith('obsidian --owner')) {
      const parts = userMsg.split(' ');
      const pass = parts[2];
      
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setIsTyping(true);
      
      setTimeout(() => {
        if (pass === OWNER_PASSWORD) {
          setIsOwner(true);
          setMessages(prev => [...prev, { 
            role: 'system', 
            text: 'AUTHENTICATION_SUCCESS: OWNER_CLEARANCE_GRANTED. WRITE_ACCESS_ENABLED.',
            type: 'success' 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'system', 
            text: 'AUTHENTICATION_FAILURE: INVALID_ACCESS_TOKEN.',
            type: 'standard' 
          }]);
        }
        setIsTyping(false);
      }, 600);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text || ''
        }));

      const response = await obsidianChat(userMsg, isOwner, history);
      
      setMessages(prev => [...prev, { role: 'obsidian', text: response.text }]);
      
      if (response.wasUpdated) {
        setMessages(prev => [...prev, { 
          role: 'system', 
          text: 'PORTFOLIO_UPDATED: Changes synchronized to Firestore matrix.', 
          type: 'update' 
        }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'obsidian', 
        text: `ERR: Neural link interrupted. [REASON: ${error.message || 'COMMUNICATION_ERROR'}]` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[200] p-4 bg-black border border-[#00ff9f]/30 text-[#00ff9f] rounded-full shadow-[0_0_20px_rgba(0,255,159,0.2)] hover:shadow-[0_0_30px_rgba(0,255,159,0.4)] hover:scale-110 transition-all group"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-12 right-0 bg-black/90 text-[#00ff9f] text-[8px] font-code px-2 py-1 border border-[#00ff9f]/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          Invoke Obsidian
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-8 w-[380px] h-[550px] z-[200] bg-black border-2 border-[#00ff9f]/30 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]"
          >
            <div className="bg-[#00ff9f]/10 p-4 flex justify-between items-center border-b border-[#00ff9f]/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-4 h-4 text-[#00ff9f]" />
                  {isOwner && <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ff9f] rounded-full animate-ping" />}
                </div>
                <span className="text-[12px] font-bold text-[#00ff9f] tracking-[0.5em] uppercase font-headline">OBSIDIAN_AI</span>
              </div>
              <div className="flex items-center gap-4">
                {isOwner ? (
                  <Unlock className="w-3 h-3 text-[#00ff9f] opacity-50" />
                ) : (
                  <Lock className="w-3 h-3 text-white/20" />
                )}
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-[#00ff9f]/40 hover:text-[#00ff9f]" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 font-code text-[11px] no-scrollbar bg-[#020408]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 border ${
                    m.role === 'user' 
                      ? 'bg-[#00ff9f]/5 border-[#00ff9f]/10 text-[#00ff9f]/70' 
                      : m.role === 'system'
                        ? m.type === 'update' 
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold tracking-widest'
                          : 'bg-white/5 border-white/10 text-white/50 italic'
                        : 'bg-[#00ff9f]/10 border-[#00ff9f]/20 text-[#00ff9f]'
                  }`}>
                    {m.role === 'system' && m.type === 'update' && <Activity className="w-3 h-3 inline mr-2 animate-pulse" />}
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 border border-[#00ff9f]/10 bg-[#00ff9f]/5">
                    <span className="text-[#00ff9f] animate-pulse">ANALYZING_CORE...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-[#00ff9f]/20 bg-[#00ff9f]/5">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff9f] font-bold">{'>'}</span>
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ISSUE COMMAND..."
                  className="bg-transparent border-none outline-none flex-1 text-[11px] text-[#00ff9f] placeholder:text-[#00ff9f]/20 uppercase font-code"
                />
                <button type="submit" disabled={isTyping}>
                  <Send className={`w-4 h-4 ${isTyping ? 'text-[#00ff9f]/20' : 'text-[#00ff9f]'}`} />
                </button>
              </div>
            </form>

            <div className="p-2 px-4 bg-black flex justify-between items-center text-[7px] text-[#00ff9f]/30 uppercase tracking-[0.2em] font-code">
              <span className="flex items-center gap-1">
                <ShieldCheck className={`w-2 h-2 ${isOwner ? 'text-[#00ff9f]' : 'text-white/10'}`} /> 
                {isOwner ? 'Clearance: Owner' : 'Clearance: Visitor'}
              </span>
              <span>Obsidian_GenAI_v2.5</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}