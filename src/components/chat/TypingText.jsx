import React, { useState, useEffect } from "react";

export default function TypingText({ text, onDone }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const step = Math.max(1, Math.floor(text.length / 120));
    const id = setInterval(() => {
      i += step;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone && onDone();
      }
    }, 14);
    return () => clearInterval(id);
  }, [text]);

  return <span>{shown}</span>;
}
