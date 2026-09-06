import React from "react";
import { motion } from "framer-motion";
import { CAPABILITIES } from "../../data/content.js";

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {CAPABILITIES.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <c.icon size={20} className="text-[var(--accent)] mb-3" />
            <h3 className="font-semibold mb-1.5">{c.label}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
