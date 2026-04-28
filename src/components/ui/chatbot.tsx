"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const SUGGESTIONS = [
  "What roles can you help me hire?",
  "How fast can I get a VA?",
  "What does it cost?",
  "How are VAs vetted?",
];

const AI_RESPONSES: Record<string, string> = {
  default:
    "Great question! Our team matches you with pre-vetted, top-1% virtual professionals — typically within 48 hours. Would you like to tell me more about the role you're looking to fill?",
  role: "We place Executive Assistants, Admin VAs, Social Media Managers, Customer Support, Bookkeepers, Tech/Dev specialists, Content Marketers, and Research analysts. What type of professional are you looking for?",
  fast: "Most clients meet their first shortlisted candidates within 48 hours of posting a role. Full placement typically happens within 5–7 business days — no weeks of waiting.",
  cost: "Our plans start at $97/month with no upfront platform fees. You only pay once you're happy with your VA. See our Pricing section for full details, or book a free strategy call.",
  vet: "Every candidate completes a rigorous 12-step vetting process: skills assessments, English proficiency testing, background checks, culture-fit interviews, and live task trials. Only the top 1% pass.",
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("role") || lower.includes("hire") || lower.includes("position")) return AI_RESPONSES.role;
  if (lower.includes("fast") || lower.includes("quick") || lower.includes("48") || lower.includes("long")) return AI_RESPONSES.fast;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("fee") || lower.includes("pay")) return AI_RESPONSES.cost;
  if (lower.includes("vet") || lower.includes("screen") || lower.includes("check") || lower.includes("qualif")) return AI_RESPONSES.vet;
  return AI_RESPONSES.default;
}

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: 12, scale: 0.96 },
};

export function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm your AI Talent Advisor. How can I help you find the perfect virtual professional today?" },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "ai", text: getResponse(text) }]);
    }, 1200);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
                   bg-navy-900 shadow-xl ring-2 ring-gold/30 transition-all
                   hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gold/40"
        aria-label={open ? "Close AI Talent Advisor" : "Open AI Talent Advisor"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-5 w-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6 text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbot-panel"
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/8"
            style={{
              width: "clamp(320px, 384px, calc(100vw - 48px))",
              maxHeight: "min(560px, calc(100vh - 120px))",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-navy-900 px-4 py-3.5 flex-shrink-0">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Talent Advisor</p>
                <p className="text-[11px] text-white/50">Powered by virtualpersonal.ai</p>
              </div>
              <div className="ml-auto flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                      ${m.role === "user"
                        ? "bg-navy-900 text-white rounded-br-sm"
                        : "bg-neutral-100 text-neutral-800 rounded-bl-sm"
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                        style={{
                          animation: `chatbot-bounce 1s ease ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips — shown only before user has sent anything */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3 flex-shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary
                               transition-colors hover:bg-primary/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center gap-2 border-t border-neutral-100 px-3 py-3 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask about hiring a VA…"
                className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm
                           outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-900
                           text-white transition-all hover:bg-navy-800 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
