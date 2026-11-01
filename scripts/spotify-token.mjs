// One-time local connection: node scripts/spotify-token.mjs
// Register http://127.0.0.1:8888/callback in Spotify first.
// Saves the refresh token directly to ignored .env.local; never prints credentials.
import http from "node:http";
import fs from "node:fs";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { parseEnv } from "node:util";

const envPath = new URL("../.env.local", import.meta.url);
let env;
try { env = parseEnv(fs.readFileSync(envPath, "utf8")); }
catch { console.error("Create .env.local with your Spotify client ID and secret first."); process.exit(1); }
const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local.");
  process.exit(1);
}

const redirectUri = "http://127.0.0.1:8888/callback";
const state = randomBytes(32).toString("hex");
const authorize = new URL("https://accounts.spotify.com/authorize");
authorize.search = new URLSearchParams({
  response_type: "code", client_id: clientId,
  scope: "user-read-currently-playing user-read-recently-played",
  redirect_uri: redirectUri, state, show_dialog: "true",
}).toString();
let exchanging = false;

const server = http.createServer(async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const url = new URL(req.url || "/", redirectUri);
  if (req.method !== "GET") { res.writeHead(405).end(); return; }
  if (url.pathname === "/start") {
    res.writeHead(302, { Location: authorize.toString() }).end();
    return;
  }
  if (url.pathname === "/connected") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end('<!doctype html><html lang="en"><meta charset="utf-8"><title>Spotify connected</title><body style="background:#e7e1d3;color:#181512;font:18px system-ui;padding:12vh 8vw"><h1>Spotify connected.</h1><p>Your token was saved locally. You can close this tab and return to your portfolio.</p></body></html>');
    return;
  }
  if (url.pathname !== "/callback") { res.writeHead(404).end(); return; }
  const receivedState = url.searchParams.get("state") || "";
  if (!/^[a-f0-9]{64}$/.test(receivedState) || !timingSafeEqual(Buffer.from(receivedState), Buffer.from(state))) {
    res.writeHead(400).end("This connection attempt is invalid. Return to /start and try again.");
    return;
  }
  if (url.searchParams.has("error")) {
    res.writeHead(400).end("Spotify permission was not granted. Return to /start to try again.");
    console.log("Spotify permission was not granted. The local setup is still available.");
    return;
  }
  const code = url.searchParams.get("code");
  if (!code || exchanging) { res.writeHead(400).end("Missing code or connection already in progress."); return; }
  exchanging = true;
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    if (!response.ok || typeof data.refresh_token !== "string" || !data.refresh_token) {
      console.error(`Spotify token exchange failed (HTTP ${response.status}). Check the app credentials and redirect URI.`);
      res.writeHead(400).end("Could not connect. Check your app credentials and redirect URI, then return to /start.");
      return;
    }
    // Re-read at save time so changes to other settings made during login survive.
    const existing = fs.readFileSync(envPath, "utf8");
    const line = `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`;
    const updated = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(existing)
      ? existing.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, () => line)
      : `${existing.trimEnd()}\n${line}\n`;
    const tempPath = new URL(`../.env.spotify-${randomBytes(8).toString("hex")}`, import.meta.url);
    try {
      fs.writeFileSync(tempPath, updated, { mode: 0o600, flag: "wx" });
      fs.renameSync(tempPath, envPath);
    } finally {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    console.log("Spotify connected. Refresh token saved to .env.local (value not displayed).");
    // Remove the authorization code from the address bar before showing success.
    res.writeHead(303, { Location: "/connected" }).end();
    clearTimeout(timeout);
    setTimeout(() => server.close(), 10000).unref();
  } catch {
    console.error("Spotify connection could not be completed. No credentials were displayed.");
    res.writeHead(500).end("Connection failed. Return to /start to try again.");
  } finally { exchanging = false; }
});

const timeout = setTimeout(() => {
  console.log("Spotify setup timed out. Run the script again to restart.");
  server.close();
}, 15 * 60 * 1000);
timeout.unref();
server.on("error", error => {
  console.error(error.code === "EADDRINUSE" ? "Port 8888 is already in use. Close the previous setup process first." : "Could not start the local Spotify setup server.");
  clearTimeout(timeout);
  process.exitCode = 1;
});
server.listen(8888, "127.0.0.1", () => console.log("Spotify setup ready: http://127.0.0.1:8888/start"));
