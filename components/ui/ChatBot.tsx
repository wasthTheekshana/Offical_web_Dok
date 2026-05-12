// components/ui/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { qaEntries, quickTopics, findBestMatch, type QAEntry } from '@/lib/chatbot-data';

type Message = {
  role: 'bot' | 'user';
  text: string;
  link?: { label: string; href: string };
};

const WELCOME: Message = {
  role: 'bot',
  text: "Hello! I'm DOK Assistant. Ask me anything about our services, or pick a topic below.",
};

const FALLBACK: Message = {
  role: 'bot',
  text: "I'm not sure about that one! Our team can help — reach out directly.",
  link: { label: 'Go to Contact →', href: '/contact' },
};

function entryToMessage(entry: QAEntry): Message {
  return { role: 'bot', text: entry.answer, link: entry.link };
}

export default function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages]   = useState<Message[]>([WELCOME]);
  const [showTopics, setShowTopics] = useState(true);
  const [input, setInput]         = useState('');
  const threadRef                 = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  function open() {
    setIsOpen(true);
    setHasOpened(true);
  }

  function close() {
    setIsOpen(false);
  }

  function resetToTopics() {
    setMessages([WELCOME]);
    setShowTopics(true);
    setInput('');
  }

  function sendMessage(text: string) {
    const userMsg: Message = { role: 'user', text };
    const match = findBestMatch(text);
    const botMsg = match ? entryToMessage(match) : FALLBACK;

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setShowTopics(false);
    setInput('');
  }

  function handleChip(entry: QAEntry) {
    sendMessage(entry.buttonLabel ?? entry.question);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  }

  return (
    <>
      {/* ── Floating Bubble ───────────────────────────────────────── */}
      <motion.button
        onClick={open}
        aria-label="Open DOK Assistant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-navy text-white shadow-lg flex items-center justify-center ${!hasOpened ? 'animate-pulse' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* ── Chat Panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[350px] h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden bg-white border border-[#E8EDF5]"
          >
            {/* Header */}
            <div className="bg-brand-navy px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">DOK Assistant</p>
                  <p className="text-white/60 text-[10px] mt-0.5">Always here to help</p>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Close chat"
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message thread */}
            <div
              ref={threadRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-beige text-brand-dark rounded-[12px_0_12px_12px]'
                        : 'bg-brand-navy text-white rounded-[0_12px_12px_12px]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.link && (
                    <Link
                      href={msg.link.href}
                      className="text-[11px] font-semibold text-brand-navy border border-brand-navy rounded-full px-3 py-1 hover:bg-brand-navy hover:text-white transition-all"
                    >
                      {msg.link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Quick-topic chips */}
              {showTopics && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {quickTopics.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => handleChip(entry)}
                      className="text-[11px] font-medium border border-brand-navy text-brand-navy rounded-full px-3 py-1.5 hover:bg-brand-navy hover:text-white transition-all"
                    >
                      {entry.buttonLabel}
                    </button>
                  ))}
                </div>
              )}

              {/* Back to topics button — shown after answers */}
              {!showTopics && (
                <button
                  onClick={resetToTopics}
                  className="self-start flex items-center gap-1.5 text-[11px] font-medium text-brand-navy/60 hover:text-brand-navy transition-colors mt-1"
                >
                  <ArrowLeft size={12} />
                  Back to topics
                </button>
              )}
            </div>

            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 border-t border-[#E8EDF5] px-3 py-3 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={200}
                placeholder="Type your question…"
                className="flex-1 text-sm bg-[#F8FAFF] border border-[#E8EDF5] rounded-xl px-3 py-2 outline-none focus:border-brand-navy/40 focus:ring-2 focus:ring-brand-navy/10 transition-all placeholder:text-[#94A3B8]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-xl bg-brand-navy text-white flex items-center justify-center disabled:opacity-40 hover:bg-brand-navy/90 transition-all flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
