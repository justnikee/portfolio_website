"use client";

import React, { useEffect, useState } from "react";

type NP = {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const SpotifyMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.5 17.32c-.21.34-.66.45-1 .24-2.74-1.67-6.19-2.05-10.25-1.13-.39.09-.78-.15-.87-.54-.09-.39.15-.78.54-.87 4.44-1.01 8.26-.58 11.33 1.3.34.21.45.66.25 1Zm1.47-3.27c-.27.42-.83.56-1.25.29-3.13-1.93-7.91-2.49-11.62-1.36-.47.14-.97-.12-1.11-.59-.14-.47.12-.97.59-1.11 4.24-1.29 9.51-.66 13.11 1.55.42.26.56.82.29 1.22Zm.13-3.41C15.05 8.36 8.7 8.13 5.03 9.25c-.56.17-1.16-.15-1.33-.71-.17-.56.15-1.16.71-1.33 4.22-1.28 11.24-1.03 15.68 1.6.51.3.67.96.37 1.46-.3.5-.96.67-1.46.37Z" />
  </svg>
);

const NowPlaying = () => {
  const [data, setData] = useState<NP | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const json = (await res.json()) as NP;
        if (alive) setData(json);
      } catch {
        if (alive) setData({ configured: false, isPlaying: false });
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const playing = data?.isPlaying && data?.title;
  const label = playing
    ? "Now playing"
    : data?.title
    ? "Last played"
    : "Now playing";

  return (
    <div>
      <span className="eyebrow mb-3 flex items-center gap-2">
        <SpotifyMark /> {label}
      </span>
      <a
        href={data?.songUrl || "https://open.spotify.com"}
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="now-playing"
      >
        {data?.albumImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.albumImageUrl}
            alt={data.album || "Album art"}
            className="now-playing__art"
          />
        ) : (
          <span className="now-playing__art now-playing__art--empty">
            <SpotifyMark />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-[outfit] text-sm font-medium text-[--ink]">
            {data?.title || "Not playing right now"}
          </p>
          <p className="truncate font-[outfit] text-xs text-[--ink-soft]">
            {data?.artist || "Catch me on Spotify"}
          </p>
        </div>

        <span className={`eq ${playing ? "" : "is-paused"}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </a>
    </div>
  );
};

export default NowPlaying;
