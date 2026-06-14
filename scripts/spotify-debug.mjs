// Temporary diagnostic: tests the Spotify token exchange + API calls using
// credentials from .env.local, without printing secrets.
import fs from "node:fs";

let envText = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
envText = envText.replace(/^﻿/, ""); // strip BOM if present
const env = {};
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = env;

console.log("CLIENT_ID present:", !!SPOTIFY_CLIENT_ID, "len:", SPOTIFY_CLIENT_ID?.length);
console.log("CLIENT_SECRET present:", !!SPOTIFY_CLIENT_SECRET, "len:", SPOTIFY_CLIENT_SECRET?.length);
console.log("REFRESH_TOKEN present:", !!SPOTIFY_REFRESH_TOKEN, "len:", SPOTIFY_REFRESH_TOKEN?.length);

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  }),
});

const tokenData = await tokenRes.json();
console.log("\nToken exchange status:", tokenRes.status);
console.log("Token exchange body:", JSON.stringify({ ...tokenData, access_token: tokenData.access_token ? "<present>" : undefined, refresh_token: tokenData.refresh_token ? "<present>" : undefined }));

if (!tokenData.access_token) {
  console.log("\nStopped: no access token returned.");
  process.exit(0);
}

const headers = { Authorization: `Bearer ${tokenData.access_token}` };

const np = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers });
console.log("\nCurrently-playing status:", np.status);
if (np.status !== 204) {
  const npBody = await np.json().catch(() => null);
  console.log("Currently-playing body:", JSON.stringify(npBody)?.slice(0, 300));
}

const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { headers });
console.log("\nRecently-played status:", recent.status);
const recentBody = await recent.json().catch(() => null);
console.log("Recently-played body:", JSON.stringify(recentBody)?.slice(0, 400));
