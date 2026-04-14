# dev-browser — AI Browser Automation

Use `dev-browser` to control a headless Chromium browser for debugging and smoke-testing this app.

## When to use

- Visually verify a page renders correctly after a change
- Debug layout or interaction issues (screenshot the result)
- Smoke-test a user flow (navigate, fill, click, read DOM)
- Check the live site or local dev server without switching windows

## Usage

```bash
dev-browser --headless <<'EOF'
const page = await browser.getPage("main");
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
console.log(await page.title());
const snap = await page.snapshotForAI();
console.log(snap.full);
EOF
```

Remove `--headless` to watch the browser visually (requires display).

## Key API

```js
// Navigation
const page = await browser.getPage("name");   // persistent named page
await page.goto(url, { waitUntil: "networkidle" });

// Interaction
await page.click("button[type=submit]");
await page.fill("input[name=email]", "test@test.com");
await page.press("Enter");

// Assertions (manual — check return value)
const title = await page.title();
const text  = await page.textContent("h1");
const el    = await page.locator("text=Bienvenue").isVisible();

// AI-friendly page snapshot (ARIA tree + element refs)
const snap = await page.snapshotForAI();
console.log(snap.full);

// Screenshot
const buf  = await page.screenshot({ fullPage: true });
const path = await saveScreenshot(buf, "debug.png");
console.log("Saved:", path);   // ~/.dev-browser/tmp/debug.png

// Cleanup
await browser.closePage("name");
```

## Local dev server

Start the dev server first, then use `http://localhost:3000` as the URL.

```bash
# Terminal 1
pnpm dev

# Claude uses dev-browser against localhost:3000
```

## Notes

- Scripts run in a **QuickJS WASM sandbox** — no `require()`, no `process`, no `fs`
- File I/O is limited to `~/.dev-browser/tmp/`
- Pages are **persistent** across separate `dev-browser` invocations (daemon keeps them alive)
- The `linux-musl-x64` build is used on this machine (glibc 2.35 workaround)
