// One-time helper: exchanges a Spotify authorization code for a refresh token.
//
// Usage:
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. Add "http://127.0.0.1:8888/callback" as a Redirect URI in the app settings
//   3. Make sure .env.local has SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET set
//   4. Run: node scripts/spotify-token.mjs
//   5. A browser tab opens with the Spotify login/account chooser — pick/log in
//      as the account you want to use (e.g. your Premium account) and click "Agree"
//   6. The refresh token prints in this terminal — copy it into .env.local

import http from "node:http";
import fs from "node:fs";
import { exec } from "node:child_process";

let envText = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
envText = envText.replace(/^﻿/, "");
const env = {};
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPE = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    show_dialog: "true",
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(`Authorization failed: ${error}`);
    console.error("Authorization failed:", error);
    server.close();
    return;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (data.refresh_token) {
    res.writeHead(200, { "Content-Type": "text/plain" }).end(
      "Success! You can close this tab and return to the terminal."
    );
    console.log("\nAdd these to your .env.local:\n");
    console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
    console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" }).end("Failed to get refresh token.");
    console.error("Token exchange failed:", data);
  }

  server.close();
});

server.listen(8888, () => {
  console.log("Opening browser for Spotify authorization...\n");
  console.log("If it doesn't open automatically, visit:\n" + authUrl + "\n");

  if (process.platform === "win32") {
    exec(`start "" "${authUrl}"`);
  } else if (process.platform === "darwin") {
    exec(`open "${authUrl}"`);
  } else {
    exec(`xdg-open "${authUrl}"`);
  }
});
