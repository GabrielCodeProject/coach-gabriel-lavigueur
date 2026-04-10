# TODO — Coach Gabriel Lavigueur site

Actionable checklist for finishing the site. Designed to be picked up by any future session (Claude or otherwise).

## Current state (as of 2026-04-10)

- ✅ Site is **live** at `https://gabrielcodeproject.github.io/coach-gabriel-lavigueur/`
- ✅ Decap CMS is **working** at `/admin/` (GitHub OAuth via Render proxy)
- ✅ Questionnaire wired to Web3Forms (emails submissions to the configured inbox)
- ✅ Full MVC architecture, strict TypeScript, shadcn `base-nova` preset, TanStack Form, Zod, Next 16 static export
- ✅ GitHub Actions CI/CD on every push to `main`

All code works end-to-end. What's left is **real data** replacing placeholders, plus a few small maintenance items.

**Reference docs to read first** (for a fresh Claude session):
- `README.md` — project overview, architecture, TODO list, migration paths
- `CLAUDE.md` → `AGENTS.md` — project-level Claude guidance
- The user's global rules in `~/.claude/rules/` (mvc, ssot, workflow, typescript, nextjs-patterns, styling, forms)

---

## P1 — Blocking before sharing publicly

These items prevent the site from being production-ready. Fill them in before promoting the URL anywhere.

### P1.1 — Fill in real business data
**File:** `src/lib/business-data.ts`

```bash
grep -n "TODO" src/lib/business-data.ts
```

Required fields:
- [ ] `location.streetAddress` — exact street address of the Nutrition Suprême store in Sainte-Thérèse
- [ ] `location.postalCode` — exact postal code
- [ ] `location.coordinates.latitude` and `location.coordinates.longitude` — precise store coordinates (get from Google Maps by right-clicking the store pin → copy lat/long)
- [ ] `location.googleMapsEmbedSrc` — iframe embed URL (Google Maps → Share → Embed a map → copy the `src=` value)
- [ ] `contact.email` — real email (ALSO update the GitHub secret `WEB3FORMS_ACCESS_KEY`'s destination on web3forms.com to match)
- [ ] `contact.phone` — real phone number in E.164 format (e.g. `+1-450-555-1234`)
- [ ] `businessHours.schedule` — consultation hours at the store
- [ ] `coach.certifications` — real array of certifications (remove TODO placeholders)
- [ ] `coach.yearsOfExperience` — actual number (currently 0)

**Why it matters:** The `LocalBusiness` JSON-LD schema pulls from these fields. If they're still `TODO`, Google's structured data validator will flag them and local SEO suffers. The `/contact/` Google Maps embed also falls back to a "carte à venir" placeholder until `googleMapsEmbedSrc` is set.

After editing, run: `pnpm build` → confirm no errors → commit + push.

### P1.2 — Replace default assets in `public/images/default/`
- [ ] `logo.png` — real logo (currently referenced in schema + footer but file doesn't exist yet)
- [ ] `share-default.jpg` — 1200×630 default OG share image (currently referenced in `constants.ts`)
- [ ] `hero-placeholder.jpg` — home page hero image (referenced in `content/pages/accueil.md` frontmatter)

These can also be uploaded via Decap at `/admin/` by editing the relevant page's `hero_image` field.

### P1.3 — Add at least one real client transformation via Decap
- [ ] Go to `/admin/` → **Transformations** collection → **New Transformation**
- [ ] Get explicit written consent from the client before publishing (required by the privacy policy and Quebec Law 25)
- [ ] Fill in: client name (initials are fine), before/after photos, duration, goal tag, metrics, testimonial, featured flag
- [ ] **Delete the "exemple-marie-l" entry** once a real one exists (or keep it as an example — up to you)

### P1.4 — Test the full questionnaire flow end-to-end
- [ ] Visit `/contact/` on the live site
- [ ] Fill out the questionnaire with real data
- [ ] Submit
- [ ] Check the destination email inbox — the submission should arrive within seconds
- [ ] Verify the success card appears on the page
- [ ] If email doesn't arrive: check spam folder, then check Web3Forms dashboard for the submission log

---

## P2 — Nice to have before launch

### P2.1 — Dark mode toggle
The CSS variables in `src/app/globals.css` already support dark mode (`.dark` class), but there's no UI toggle. To add one:
- Install `next-themes` (`pnpm add next-themes`)
- Wrap the layout with `<ThemeProvider>`
- Add a toggle button in `SiteHeader`

Optional — skip if dark mode isn't a priority for a coaching site.

### P2.2 — Image optimization pipeline
Currently images go through Next.js `images.unoptimized: true` (required for static export). For large hero/transformation images, create a `scripts/optimize-images.ts` using `sharp` that runs before build and compresses anything in `public/images/uploads/` above 500KB. Add it as a `prebuild` npm script.

### P2.3 — Analytics
The site intentionally has **zero analytics** right now (no cookies, no tracking, simpler RGPD compliance). If you want to add Plausible / Umami / Fathom (all privacy-friendly, cookie-free):
- Add a `<script>` tag in `app/layout.tsx`
- Document it in `content/pages/politique-confidentialite.md` — update the "pas de cookie analytique" claim accordingly

Skip Google Analytics — it would require a cookie banner and legal work.

### P2.4 — Favicon + manifest
Current `public/favicon.ico` is the default Next.js one. Generate a real favicon set (16, 32, 48, apple-touch-icon) from your logo using [realfavicongenerator.net](https://realfavicongenerator.net) and drop them in `public/`. Optionally add `public/manifest.json` for PWA installability.

---

## P3 — Later / future

### P3.1 — Custom domain migration
When you buy a real domain (e.g. `coachgabriellavigueur.ca`):

1. Point the domain's DNS `CNAME` record to `gabrielcodeproject.github.io` (or `A` records for apex domain per [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
2. In the repo, create `public/CNAME` with the bare domain (one line, no protocol)
3. Settings → Pages → Custom domain → enter your domain + check "Enforce HTTPS" (may take ~30 min for cert)
4. Update `src/lib/business-data.ts` → `contact.website` to the new URL
5. Update `.github/workflows/deploy.yml` → **remove** the `NEXT_PUBLIC_BASE_PATH: /coach-gabriel-lavigueur` line (site becomes root instead of subpath)
6. Update `public/admin/config.yml` → `site_url` + `display_url` + `public_folder` (change `/coach-gabriel-lavigueur/images/uploads` to `/images/uploads`)
7. On **web3forms.com** dashboard → edit the form → update "Domain name" to your new domain
8. On **Render** → `coach-gabriel-oauth` service → Environment → `ORIGINS` → add new domain comma-separated (e.g. `gabrielcodeproject.github.io,coachgabriellavigueur.ca`)
9. On **GitHub OAuth App** (client_id `Ov23ligi2eXKnfEgfPdZ`) → update Homepage URL to the new domain (cosmetic; callback URL stays the same)

Commit all code changes in one PR titled `feat: migrate to custom domain {domain}`.

### P3.2 — Self-host on Ubuntu VPS (if you decide to leave GitHub Pages)
See `README.md` → "Migration future vers VPS" section. Rough steps:
1. Build the site in CI → `rsync` the `out/` directory to the VPS
2. Serve with Caddy or nginx behind TLS
3. Re-deploy the Decap OAuth proxy as a Docker container on the VPS (instead of Render)
4. Update the GitHub OAuth App callback URL to the new proxy address
5. Update `config.yml` → `base_url` to the new proxy URL

### P3.3 — Node.js 20 → 24 action migration
**Deadline:** September 16, 2026 (warning from GitHub Actions).

All actions in `.github/workflows/deploy.yml` run on Node 20, which will be forced to 24 on June 2, 2026 and removed on September 16, 2026. Action versions to bump when new releases are available:
- `actions/checkout@v4`
- `pnpm/action-setup@v4`
- `actions/setup-node@v4`
- `actions/configure-pages@v5`
- `actions/cache@v4`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

Most of these will release v5+ with Node 24 support before the deadline. A single PR updating all of them is enough.

### P3.4 — Decap CMS proxy maintenance
The current proxy is `coach-gabriel-oauth` on Render (free tier, sleeps after 15 min idle). Implications:
- First admin login after idle takes ~30 seconds to wake up
- Render free tier may add bandwidth limits or change policy

If it becomes annoying:
- Upgrade to Render paid tier ($7/mo) for always-on
- OR migrate the proxy to a Cloudflare Worker (free, always-on, faster)
- OR self-host on the VPS

### P3.5 — FAQ, legal pages, About — content review
The seed content in `content/pages/*.md` is a solid starting point but will likely need polish:
- Tone check on `/a-propos/` — does it match Gabriel's voice?
- FAQ items — add/remove based on actual questions clients ask
- Privacy policy — get a lawyer's eyes on it if you expect EU traffic (RGPD) or want ironclad Quebec Law 25 compliance

All editable via `/admin/` without touching code.

---

## Key references

| Thing | Where |
|---|---|
| Main repo | https://github.com/GabrielCodeProject/coach-gabriel-lavigueur |
| Live site | https://gabrielcodeproject.github.io/coach-gabriel-lavigueur/ |
| Admin | https://gabrielcodeproject.github.io/coach-gabriel-lavigueur/admin/ |
| OAuth proxy (Render) | https://coach-gabriel-oauth.onrender.com/ |
| GitHub OAuth App client_id | `Ov23ligi2eXKnfEgfPdZ` (public, already in `config.yml`) |
| Web3Forms dashboard | https://web3forms.com/ (logged in as `gabop2000@gmail.com` based on earlier screenshot) |
| Planning doc (Linux machine only) | `/home/gabrieldev/.claude/plans/enchanted-spinning-crown.md` |

## Key files to re-read when resuming

```
src/lib/business-data.ts          # All TODO placeholders live here
src/app/globals.css               # Theme palette (warm orange + charcoal)
src/app/layout.tsx                # Root layout with fonts and schema injection
.github/workflows/deploy.yml      # CI/CD — has the basePath env var
public/admin/config.yml           # Decap collections + OAuth proxy config
README.md                         # Full project documentation
```

## Commands a fresh session should know

```bash
pnpm install                                                        # Install deps
pnpm dev                                                            # Start dev server
pnpm build                                                          # Production build (required before declaring done)
pnpm typecheck                                                      # tsc --noEmit
pnpm lint                                                           # ESLint
fuser -k 3000/tcp 3001/tcp 3002/tcp 3003/tcp 2>/dev/null            # Kill dev servers (always run after testing)

# GitHub CLI — check deploy status
gh run list --limit 5 --repo GabrielCodeProject/coach-gabriel-lavigueur
gh run view <run-id> --log-failed --repo GabrielCodeProject/coach-gabriel-lavigueur
```

---

*Last updated: 2026-04-10. Update this file whenever a task is completed or a new one surfaces.*
