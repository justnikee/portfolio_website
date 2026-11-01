import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Track = {
  name: string;
  artists?: { name: string }[];
  album?: { name?: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
};
type Snapshot = {
  configured: boolean;
  isPlaying: boolean;
  unavailable?: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
let tokenCache: { token: string; expires: number } | null = null;
let tokenRequest: Promise<string | null> | null = null;
let snapshotCache: { data: Snapshot; expires: number } | null = null;
let snapshotRequest: Promise<Snapshot> | null = null;

async function getAccessToken(): Promise<string | null> {
  if (tokenCache && tokenCache.expires > Date.now()) return tokenCache.token;
  if (tokenRequest) return tokenRequest;
  tokenRequest = (async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: REFRESH_TOKEN! }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (typeof data.access_token !== "string") return null;
    tokenCache = { token: data.access_token, expires: Date.now() + Math.max(0, Number(data.expires_in || 3600) - 60) * 1000 };
    return tokenCache.token;
  })();
  try { return await tokenRequest; }
  finally { tokenRequest = null; }
}

function shape(track: Track, isPlaying: boolean): Snapshot {
  return {
    configured: true, isPlaying, title: track.name,
    artist: (track.artists || []).map(artist => artist.name).join(", "),
    album: track.album?.name || "",
    albumImageUrl: track.album?.images?.[0]?.url || "",
    songUrl: track.external_urls?.spotify || "https://open.spotify.com",
  };
}

async function readPlayback(): Promise<Snapshot> {
  const unavailable = { configured: true, isPlaying: false, unavailable: true };
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return unavailable;
    const options = { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" as const };
    const current = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { ...options, signal: AbortSignal.timeout(10000) });
    if (current.status === 200) {
      const data = await current.json();
      if (data?.item?.name && data.currently_playing_type === "track") return shape(data.item, !!data.is_playing);
    } else if (current.status !== 204) {
      if (current.status === 401) tokenCache = null;
      return unavailable;
    }
    const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { ...options, signal: AbortSignal.timeout(10000) });
    if (!recent.ok) return unavailable;
    const data = await recent.json();
    const track = data?.items?.[0]?.track;
    return track?.name ? shape(track, false) : { configured: true, isPlaying: false };
  } catch { return unavailable; }
}

export async function GET() {
  const respond = (data: Snapshot) => NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return respond({ configured: false, isPlaying: false });
  if (snapshotCache && snapshotCache.expires > Date.now()) return respond(snapshotCache.data);
  // Share concurrent requests and refresh playback at most once per 25 seconds.
  snapshotRequest ??= readPlayback();
  try {
    const data = await snapshotRequest;
    snapshotCache = { data, expires: Date.now() + (data.unavailable ? 10000 : 25000) };
    return respond(data);
  } finally { snapshotRequest = null; }
}
