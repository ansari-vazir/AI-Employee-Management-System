# Social Wavez Assistant — Employee Assistant Dashboard

A modern, AI-powered employee dashboard built with React, Vite, Tailwind CSS,
Framer Motion, and Recharts. No backend — all data is mocked and all
preferences persist to `localStorage`.

## Getting started

```bash
npm install
npm run dev
```


## Using the AI chat

The Assistant page works out of the box in **demo mode** (canned, topic-aware
replies). To get live answers, open the settings panel above the message box
on the Assistant page and paste a Gemini API key — get one at
[aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey). The
key is stored only in your browser's `localStorage`.

> Note: this calls the Gemini API directly from the browser.

## Features

- **Landing page** — hero, capability highlights, feature grid, CTA, all with
  Framer Motion entrance/scroll animations
- **AI chat assistant** — message history, loading state, typing animation,
  error handling with retry, voice input (Web Speech API), suggested prompts,
  chat history persisted locally
- **Employee directory** — search, department filter, skeleton loading,
  empty state
- **Analytics dashboard** — stat cards, bar chart (headcount/department) and
  pie chart (status mix) via Recharts, mock data
- **Profile & settings** — editable profile form, dark mode toggle,
  notification preferences, all persisted to `localStorage`

## Tech stack

- React 18 + Vite
- React Router
- Tailwind CSS (with CSS-variable theme tokens for light/dark)
- Framer Motion
- Recharts
- lucide-react icons
