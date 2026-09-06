import React, { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Check } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { storageSet } from "../../lib/storage.js";

export default function ChatSettingsPanel({ apiKey, setApiKey, onClose }) {
  const [draft, setDraft] = useState(apiKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      className="overflow-hidden"
    >
      <Card className="p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <KeyRound size={15} className="text-[var(--accent)]" />
          <p className="text-sm font-medium">Gemini API key</p>
        </div>
        <p className="text-xs text-[var(--muted)] mb-3">
          Stored only on this device. Leave empty to keep using demo answers.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste your Gemini API key"
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              icon={Check}
              onClick={() => {
                setApiKey(draft);
                storageSet("prefs:gemini-key", draft);
                onClose();
              }}
            >
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
