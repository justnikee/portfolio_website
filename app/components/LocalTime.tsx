"use client";

import { useEffect, useState } from "react";

/** Live clock in Nikhil's timezone (Asia/Kolkata). */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Render a stable placeholder on the server to avoid hydration mismatch.
  return (
    <span className={className} suppressHydrationWarning>
      {time || "--:--:--"} IST
    </span>
  );
}
