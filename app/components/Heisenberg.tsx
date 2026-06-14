"use client";

import { useEffect, useState } from "react";

/**
 * Breaking Bad easter egg (homepage only).
 * - Logs a styled chemistry message to the console.
 * - Type "cook" or "heisenberg" anywhere to summon a short toast.
 */
export default function Heisenberg() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // console nod for the curious
    console.log(
      "%c Say my name. ",
      "background:#181512;color:#d83a1c;font:700 14px/1.6 monospace;padding:6px 10px;border-radius:4px;"
    );
    console.log(
      "%cYou're goddamn right. — built by Nikhil, the cook. Try typing 'cook'.",
      "color:#7a7468;font:12px/1.5 monospace;"
    );

    let buffer = "";
    let timer: ReturnType<typeof setTimeout>;

    const triggers: Record<string, string> = {
      cook: "You're goddamn right.",
      heisenberg: "Say my name.",
      saymyname: "Heisenberg.",
    };

    const show = (text: string) => {
      setMessage(text);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 3200);
    };

    const onKey = (e: KeyboardEvent) => {
      // ignore typing inside inputs/textareas
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))
        return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-12);
      for (const key of Object.keys(triggers)) {
        if (buffer.endsWith(key)) {
          show(triggers[key]);
          buffer = "";
          break;
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="heisenberg-toast" role="status" aria-live="polite">
      <span className="element-tile element-tile--sm">
        <span className="element-tile__num">2</span>
        <span className="element-tile__sym">He</span>
      </span>
      {message}
    </div>
  );
}
