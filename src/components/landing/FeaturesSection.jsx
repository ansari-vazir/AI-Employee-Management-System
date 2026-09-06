import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card.jsx";
import { FEATURES } from "../../data/content.js";

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-lg mb-12">
        <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl md:text-4xl font-medium mb-3">
          Everything you reach for during the workday
        </h2>
        <p className="text-[var(--muted)]">
          One assistant, four jobs — chat, people, numbers, and settings, in a shape that stays out of your way.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card accent className="p-6 h-full hover:shadow-md transition-shadow duration-200">
              <f.icon size={22} className="mb-4" style={{ color: "var(--teal)" }} />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
