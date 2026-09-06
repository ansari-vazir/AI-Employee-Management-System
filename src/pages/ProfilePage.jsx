import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import TextField from "../components/ui/TextField.jsx";
import Toggle from "../components/ui/Toggle.jsx";
import Avatar from "../components/ui/Avatar.jsx";
import { storageGet, storageSet } from "../lib/storage.js";
import { DEPARTMENTS } from "../data/employees.js";

const DEFAULT_PROFILE = { name: "Vazir Ansari", email: "vazir.ansari@Social Wavez.co", position: "Software Engineer", dept: "Engineering" };
const DEFAULT_NOTIFS = { email: true, push: false, digest: true };

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState(() => storageGet("prefs:profile", DEFAULT_PROFILE));
  const [notifs, setNotifs] = useState(() => storageGet("prefs:notifications", DEFAULT_NOTIFS));
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    storageSet("prefs:profile", form);
    storageSet("prefs:notifications", notifs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar name={form.name} size={48} color="#C9782B" />
          <div>
            <h2 className="font-semibold">{form.name}</h2>
            <p className="text-sm text-[var(--muted)]">{form.position}</p>
          </div>
        </div>
        <form onSubmit={save} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Department</span>
              <select
                value={form.dept}
                onChange={(e) => setForm({ ...form, dept: e.target.value })}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" icon={saved ? Check : undefined}>
              {saved ? "Saved" : "Save changes"}
            </Button>
            <AnimatePresence>
              {saved && (
                <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-[var(--teal)]">
                  Your profile has been updated.
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-1">Appearance</h3>
        <p className="text-xs text-[var(--muted)] mb-2">Choose how the dashboard looks on this device.</p>
        <Toggle checked={theme === "dark"} onChange={toggleTheme} label="Dark mode" desc="Switch between light and dark theme" />
      </Card>

      <Card className="p-6 divide-y divide-[var(--border)]">
        <h3 className="font-semibold mb-1">Notifications</h3>
        <p className="text-xs text-[var(--muted)] mb-2">Decide what the assistant should notify you about.</p>
        <Toggle checked={notifs.email} onChange={(v) => setNotifs({ ...notifs, email: v })} label="Email notifications" desc="Get updates sent to your inbox" />
        <Toggle checked={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} label="Push notifications" desc="Real-time alerts on this device" />
        <Toggle checked={notifs.digest} onChange={(v) => setNotifs({ ...notifs, digest: v })} label="Weekly digest" desc="A short summary every Monday morning" />
      </Card>
    </div>
  );
}
