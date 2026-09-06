import { MessageSquare, Users, BarChart3, Settings, Zap, ShieldCheck, CircleUserRound } from "lucide-react";

export const FEATURES = [
  { icon: MessageSquare, title: "Ask anything, get it done", desc: "Chat with the assistant about policies, leave balances, or drafting an email — it responds in plain language, instantly." },
  { icon: Users, title: "Find anyone on the team", desc: "Search the full directory by name, role, or department, and reach the right person in a couple of taps." },
  { icon: BarChart3, title: "See the org at a glance", desc: "Headcount, active status, and department mix — laid out as charts you can actually read in five seconds." },
  { icon: Settings, title: "Make it yours", desc: "Switch themes, tune notifications, and keep your profile current, all from one settings screen." },
];

export const SUGGESTED_PROMPTS = [
  "What's our work-from-home policy?",
  "Draft a polite follow-up email to my manager",
  "How many leave days do I have left?",
  "Help me prep three questions for my 1:1",
];

export const CAPABILITIES = [
  { icon: Zap, label: "Answers in seconds", text: "No ticket queues — ask a question and get a grounded answer right away." },
  { icon: ShieldCheck, label: "Knows company context", text: "Trained on the kind of questions employees actually ask, day to day." },
  { icon: CircleUserRound, label: "Picks up where you left off", text: "Your conversation stays with you, so you never repeat yourself." },
];
