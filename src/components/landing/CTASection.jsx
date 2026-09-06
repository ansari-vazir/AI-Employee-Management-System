import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <Card className="relative overflow-hidden bg-[var(--primary)] border-none p-10 md:p-14 text-center">
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" aria-hidden />
        <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl md:text-4xl font-medium text-[var(--primary-ink)] mb-4">
          Your next question is one message away.
        </h2>
        <p className="text-[color-mix(in_srgb,var(--primary-ink)_75%,transparent)] max-w-md mx-auto mb-8">
          No setup, no tickets. Open the assistant and ask it what you'd normally ask a teammate.
        </p>
        <Button size="lg" onClick={() => navigate("/app/chat")} icon={MessageSquare}>
          Start a conversation
        </Button>
      </Card>
    </section>
  );
}
