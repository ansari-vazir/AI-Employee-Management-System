
export async function callGemini(apiKey, history, userMessage) {
  const body = {
    contents: [
      ...history.map((m) => ({ role: m.role === "ai" ? "model" : "user", parts: [{ text: m.text }] })),
      { role: "user", parts: [{ text: userMessage }] },
    ],
    generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.error?.message || `Gemini request failed (${res.status})`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  if (!text) throw new Error("The assistant returned an empty response.");
  return text;
}

// Used when no API key is configured, so the app is still fully demo-able.
export function mockReply(userMessage) {
  const m = userMessage.toLowerCase();
  if (m.includes("wfh") || m.includes("work from home") || m.includes("remote")) {
    return "Social Wavez's policy allows up to 3 remote days a week — just mark them on the team calendar so your manager can see your schedule.";
  }
  if (m.includes("leave") || m.includes("vacation") || m.includes("pto")) {
    return "Full-time employees get 24 paid leave days a year, accrued monthly. You can check your exact balance under Profile & Settings once HR sync is enabled.";
  }
  if (m.includes("email") || m.includes("draft")) {
    return "Happy to help draft that — tell me who it's for and the key point you want to make, and I'll put together a few lines you can send.";
  }
  if (m.includes("1:1") || m.includes("one on one") || m.includes("manager")) {
    return "Good questions for a 1:1: what's the team's top priority this quarter, where could I be more useful, and is there feedback you've been holding back?";
  }
  return "I'm running in demo mode right now — add a Gemini API key in the settings panel above the message box to get live answers grounded in your question.";
}
