/**
 * Prerender script for Vite SPA
 * -----------------------------
 * Yeh script `vite build` ke baad chalti hai. Yeh dist/ folder ko
 * local static server pe serve karti hai, Puppeteer se har route
 * ko open karke uska final rendered HTML nikalti hai, aur usko
 * dist/<route>/index.html me save kar deti hai.
 *
 * Result: jab Google/Bing/AI bot https://reviewninjapro.com/pricing
 * request karega, usko poora content-filled HTML milega,
 * "enable JavaScript" wala blank page nahi.
 *
 * SETUP:
 *   npm install --save-dev puppeteer serve
 *
 * PACKAGE.JSON me script add karo:
 *   "build:prerender": "vite build && node prerender.js"
 *
 * Phir deploy ke waqt `npm run build:prerender` use karo instead of `vite build`.
 */

import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

// ===== YAHAN APNE ACTUAL PUBLIC ROUTES HAIN (App.js routing se liye) =====
const ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/terms-and-condition",
  "/privacy-policy",
  "/refund-policy",
  // Naye public pages (blog, pricing landing) banao toh yaha add karte jao
];

const DIST_DIR = path.resolve("dist");
const PORT = 4173; // vite preview ka default port
const BASE_URL = `http://localhost:${PORT}`;

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("dist/ folder nahi mila. Pehle `vite build` chalao.");
    process.exit(1);
  }

  console.log("Local server start ho raha hai (vite preview)...");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "inherit",
    shell: true,
  });

  // Server ko start hone ka time do
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of ROUTES) {
    console.log(`Prerendering: ${route}`);
    const page = await browser.newPage();

    // IMPORTANT: Facebook Pixel ko block karo, warna har prerender crawl
    // ek fake "PageView" event Facebook ko bhej dega aur analytics data ganda ho jayega.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("connect.facebook.net") ||
        url.includes("facebook.com/tr") ||
        url.includes("checkout.razorpay.com") ||
        url.includes("cdn.razorpay.com") ||
        url.includes("api.razorpay.com")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // DEBUG: browser console aur JS errors ko terminal me print karo
    page.on("console", (msg) => {
      console.log(`  [browser console] ${msg.type()}: ${msg.text()}`);
    });
    page.on("pageerror", (err) => {
      console.log(`  [browser JS ERROR] ${err.message}`);
    });

    try {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "networkidle2", // networkidle0 fonts/pixel ki wajah se hang ho sakta tha
        timeout: 30000,
      });

      // React ko render hone ka thoda extra time do (agar data fetch ho raha ho)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const html = await page.content();

      const outDir =
        route === "/" ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

      console.log(`  ✓ Saved: ${path.join(outDir, "index.html")}`);
    } catch (err) {
      console.error(`  ✗ Failed for ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.kill();
  console.log("Prerendering complete!");
  process.exit(0);
}

main();