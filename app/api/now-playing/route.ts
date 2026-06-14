import { NextResponse } from "next/server";

/**
 * Live "now playing" from Spotify.
 *
 * Set these env vars (see SPOTIFY_SETUP note in the chat) to enable it:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * Without them the route returns { configured: false } and the UI shows a
 * graceful fallback, so the site never breaks.
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export const dynamic = "force-dynamic";

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN as string,
    }),
    cache: "no-store",
  });
  return res.json();
}

type Track = {
  name: string;
  artists?: { name: string }[];
  album?: { name?: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
};

function shape(track: Track, isPlaying: boolean) {
  return {
    configured: true,
    isPlaying,
    title: track.name,
    artist: (track.artists ?? []).map((a) => a.name).join(", "),
    album: track.album?.name ?? "",
    albumImageUrl: track.album?.images?.[0]?.url ?? "",
    songUrl: track.external_urls?.spotify ?? "https://open.spotify.com",
  };
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ configured: false, isPlaying: false });
  }

  try {
    const { access_token } = await getAccessToken();
    if (!access_token) {
      return NextResponse.json({ configured: true, isPlaying: false });
    }

    const headers = { Authorization: `Bearer ${access_token}` };
    const np = await fetch(NOW_PLAYING, { headers, cache: "no-store" });

    if (np.status === 200) {
      const data = await np.json();
      if (data?.item) return NextResponse.json(shape(data.item, !!data.is_playing));
    }

    // Nothing playing → show the most recent track instead.
    const recent = await fetch(RECENT, { headers, cache: "no-store" });
    if (recent.ok) {
      const data = await recent.json();
      const track = data?.items?.[0]?.track;
      if (track) return NextResponse.json(shape(track, false));
    }

    return NextResponse.json({ configured: true, isPlaying: false });
  } catch {
    return NextResponse.json({ configured: true, isPlaying: false });
  }
}
