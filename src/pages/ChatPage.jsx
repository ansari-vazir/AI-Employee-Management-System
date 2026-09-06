import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles, KeyRound, ChevronDown, Trash2, Loader2, Mic, MicOff, Send } from "lucide-react";
import ChatBubble from "../components/chat/ChatBubble.jsx";
import ChatSettingsPanel from "../components/chat/ChatSettingsPanel.jsx";
import Button from "../components/ui/Button.jsx";
import { storageGet, storageSet } from "../lib/storage.js";
import { callGemini, mockReply } from "../lib/gemini.js";
import { SUGGESTED_PROMPTS } from "../data/content.js";

export default function ChatPage() {
  const [messages, setMessages] = useState(() => storageGet("chat:history", []));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => storageGet("prefs:gemini-key", ""));
  const [showSettings, setShowSettings] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    storageSet("chat:history", messages.filter((m) => !m.typing));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const speechSupported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => setInput((prev) => (prev ? prev + " " : "") + e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  const finishTyping = (id, fullText) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, typing: false, text: fullText } : m)));
  };

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages.filter((m) => !m.error);
    try {
      const reply = apiKey
        ? await callGemini(apiKey, history, text)
        : await new Promise((r) => setTimeout(() => r(mockReply(text)), 700));
      const aiId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { id: aiId, role: "ai", text: reply, typing: true, onDone: () => finishTyping(aiId, reply) },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", error: true, text: err.message || "Something went wrong reaching the assistant.", lastQuery: text },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const retry = (msg) => {
    setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    send(msg.lastQuery);
  };

  const clearHistory = () => {
    setMessages([]);
    storageSet("chat:history", []);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          <KeyRound size={13} />
          {apiKey ? "Gemini connected" : "Demo mode"}
          <ChevronDown size={13} className={`transition-transform ${showSettings ? "rotate-180" : ""}`} />
        </button>
        {messages.length > 0 && (
          <button onClick={clearHistory} className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--danger)] transition-colors">
            <Trash2 size={13} /> Clear chat
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSettings && <ChatSettingsPanel apiKey={apiKey} setApiKey={setApiKey} onClose={() => setShowSettings(false)} />}
      </AnimatePresence>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-4">
              <Sparkles size={22} className="text-[var(--accent)]" />
            </div>
            <h2 className="font-semibold text-lg mb-1">Ask me anything about work</h2>
            <p className="text-sm text-[var(--muted)] max-w-sm mb-6">
              Policies, emails, meeting prep — start typing below or try one of these.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} onRetry={() => retry(m)} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-[var(--muted)] text-sm pl-9">
            <Loader2 size={14} className="animate-spin" /> Thinking…
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 pt-1 -mx-1 px-1">
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--ink)] transition-colors shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-2 mt-1"
      >
        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              listening ? "bg-[var(--danger-soft)] text-[var(--danger)]" : "hover:bg-[var(--surface-2)] text-[var(--muted)]"
            }`}
            aria-label="Voice input"
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message the assistant…"
          className="flex-1 bg-transparent outline-none text-sm px-1 min-w-0"
        />
        <Button type="submit" size="sm" disabled={!input.trim() || loading} icon={Send} className="shrink-0">
          Send
        </Button>
      </form>
    </div>
  );
}
