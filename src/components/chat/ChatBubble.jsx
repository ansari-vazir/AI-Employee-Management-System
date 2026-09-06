import React from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import TypingText from "./TypingText.jsx";

export default function ChatBubble({ msg, onRetry }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 mb-1">
            <Sparkles size={13} className="text-[var(--accent)]" />
          </div>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-[var(--primary)] text-[var(--primary-ink)] rounded-br-sm"
              : msg.error
              ? "bg-[var(--danger-soft)] text-[var(--danger)] rounded-bl-sm"
              : "bg-[var(--surface)] border border-[var(--border)] rounded-bl-sm"
          }`}
        >
          {msg.error ? (
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <div>
                <p>{msg.text}</p>
                <button onClick={onRetry} className="inline-flex items-center gap-1 mt-2 text-xs font-medium underline underline-offset-2">
                  <RefreshCw size={12} /> Try again
                </button>
              </div>
            </div>
          ) : msg.typing ? (
            <TypingText text={msg.text} onDone={msg.onDone} />
          ) : (
            msg.text
          )}
        </div>
      </div>
    </motion.div>
  );
}
