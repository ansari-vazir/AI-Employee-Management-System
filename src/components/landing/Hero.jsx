import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

export default function Hero() {
  const navigate = useNavigate();
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="inline-flex items-center gap-1.5 text-sm text-[var(--teal)] font-medium mb-5">
            <Sparkles size={14} /> Built for the people at Social Wavez
          </motion.span>
          <motion.h1
            variants={item}
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-medium mb-6"
          >
            The workday assistant that actually knows your workplace.
          </motion.h1>
          <motion.p variants={item} className="text-lg text-[var(--muted)] max-w-lg mb-8 leading-relaxed">
            Ask a question, find a colleague, or check how the team is growing — one dashboard replaces
            the scattered tabs you open every morning.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button size="lg" icon={ArrowUpRight} iconRight onClick={() => navigate("/app/chat")}>
              Talk to the assistant
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate("/app/directory")}>
              Browse the directory
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-[var(--accent)] opacity-[0.08] blur-2xl" aria-hidden />
          <Card className="relative p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--teal)]" />
              <span className="ml-auto text-xs text-[var(--muted)]">Assistant</span>
            </div>
            <div className="space-y-3">
              <div className="ml-auto max-w-[80%] bg-[var(--surface-2)] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                How many people are on the Engineering team?
              </div>
              <div className="max-w-[85%] bg-[var(--primary)] text-[var(--primary-ink)] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                Engineering has 3 people right now — Ananya, Rohit, and Zara. Want their contact details?
              </div>
              <div className="ml-auto max-w-[70%] bg-[var(--surface-2)] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                Yes please
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
