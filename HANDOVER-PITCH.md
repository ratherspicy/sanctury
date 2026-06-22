# Sanctury — Pre-Pitch Handover

**Date:** 16 June 2026 · **Branch:** main · **Latest commit:** `252f810`
**Live:** https://sanctury-five.vercel.app (auto-deploys on push to main)
**Status:** Build clean (`tsc --noEmit` + `next build` pass). All work committed, pushed, and deployed.

This document covers the run of sessions from the Day 5 mobile audit through the
final pre-pitch copy audit. Read CLAUDE.md and ARCHITECTURE.md for the rules and
data model before changing anything.

---

## 1. WHAT HAS BEEN DONE

### Mobile / layout
- Full 390px mobile audit of all Priority-1 routes. Fixed: landing header
  logo/button overlap, report mortgage-payoff label collisions, maintenance
  chart pill overlap + clipping, and Next 16 space-eating copy bugs.

### Homeowner experience (`/my-sanctury` + sub-pages)
- **Property Command Centre dashboard:** photography-led hero, agent-handover
  context, profile bar (Jane & David Thompson), Sanctury Score, priority
  actions, quick-nav tiles, property details, household section.
- **New pages:** `/my-sanctury/finances` (equity, LVR gauge, mortgage +
  insurance cards, toggleable payoff curve), `/my-sanctury/maintenance`
  (record, upcoming items, tradespeople), `/my-sanctury/marketplace`
  (personalised "For You" + category grid).
- **Persistent mobile bottom nav** across all `/my-sanctury/*` (Home, Finances,
  Documents, Maintenance, Marketplace).
- **Vault** (`/my-sanctury/vault`): handover note, 78% completion bar, dashed
  missing-doc slots, colour-coded document list, maintenance timeline.
- **Homeowner profile:** "Your Household" with Jane, David, Lily, Sam, and
  **Archie** (pet, paw icon); collapsible details.

### Visual redesign / design system (authenticated area)
- Shared components in `app/my-sanctury/(portal)/components/`: `icon-map.ts`
  (lucide), `status-system.ts` (4 states — urgent/attention/good/**unknown**,
  unknown deliberately quiet), `StatusCard`, `ListItem`, `HorizontalScroll`,
  `CategoryIconGrid`.
- **Sanctury Score = 5 pillars** (Insurance, Mortgage, Documents, **Safety**,
  **Planning**; the last two show quiet "—" / not-yet-assessed). The old
  standalone "Physical Safety — Coming soon" section was removed.
- Marketplace category section changed from a wall of "Coming soon" cards to a
  light icon grid (green dot marks the two active categories).

### Marketplace
- Public `/marketplace` (category-led hub) and `/marketplace/mortgages` stub.
- Insurance quotes all raised to **at/above the $1,063,290 rebuild cost**
  (Tower $1,064,000 / AMI $1,065,000 / Vero $1,150,000).

### Agent
- `/agent/dashboard/properties/new` — 5-step "create property record" handover
  flow (search → sale details → documents → invite → confirmation), all
  pre-filled for the demo.
- Dashboard CTA **"Create Property Record"** links into that flow.

### Email
- Resend integration: best-effort "Your Sanctury report is ready" email after
  the health check (`/api/report-email`). Skips gracefully with no API key.

### Data consistency (the big reconciliations)
- **Cover corrected to $900,000** everywhere (was $600K) so rebuild − cover = gap.
- **Property address unified to "14 Cameron Road, Tauranga"** (a stale
  "42 Mount Avenue" was leaking onto `/report` and `/marketplace/insurance` via
  the demo seed — now fixed).
- **Refix date unified to 1 October 2026**, day-count computed from one
  canonical `REFIX_DATE` so `/report` and the authenticated area always match
  (107 days today → ~100 at pitch; no hardcoded "115" left).
- **"Home Health Score" renamed to "Sanctury Score"** everywhere.
- Marketplace avatars localised; Sarah Mitchell consistently "Tower" (no "Eves").

### Copy / positioning (final pass)
- Site-wide shift from "AI-powered marketplace" to **peace-of-mind / home-
  intelligence** positioning. The word **"sorted" removed from all copy**
  (sorted.co.nz is a competitor). Tagline "Right from day one" kept.
- `/report` now leads with a **dominant red $163,290 gap callout** +
  rebuild-vs-cover context line; "Review your sum insured" is a filled purple
  button.

### Canonical demo data (locked — see CLAUDE.md rule 1)
14 Cameron Road, Tauranga · Cover **$900,000** · Rebuild **$1,063,290** ·
Gap **$163,290** · Mortgage **$480,000** · Purchase **$1,285,000** ·
Settlement **15 March 2024** · Refix **1 Oct 2026** · Equity $805,000 · LVR 37.4%.

---

## 2. WHAT NEEDS TO BE CHECKED (outstanding / manual)

### Must do by hand before the pitch (auth-gated — verified in code, not by live click)
The preview/browser MCP tools were down for several sessions, so authenticated
flows were verified via admin-minted sessions, SSR HTML, and headless
screenshots — **not** live human clicks. Walk these once on the live site:

1. **Homeowner magic-link login** — `/my-sanctury` is magic-link protected and
   **cannot be cold-opened**. Pre-login on a separate tab before any demo.
   Confirm the inbox receives the link (Supabase free tier).
2. **Health-check form (`/check`)** — live Addy address autocomplete, "Back"
   navigation between steps, and that empty required fields show an in-form
   message (not a browser popup).
3. **Insurance proposals** — the 3 adviser cards render only *after* clicking
   "Get free proposals" (client state); confirm they appear with correct
   amounts, then the **IPP11 consent modal → confirmed page** transition.
4. **My Sanctury** — bottom-nav between all 5 sections; vault "View" modals open.
5. **Agent "Generate message"** modal produces the warm, specific Sarah Chen
   message.

### Infrastructure / ops (from CLAUDE.md known issues)
6. **sanctury.co.nz DNS → Vercel** — not connected yet (manual, Day 10).
7. **Supabase free tier pauses on inactivity** — check it's running before any
   auth-dependent demo or rehearsal.
8. **Vercel deploy webhook has intermittently missed pushes** this run — twice a
   commit didn't auto-deploy until a follow-up push. Before the pitch, confirm
   the live site is on the latest commit (`252f810`); if not, push an empty
   commit or hit "Redeploy" in Vercel.
9. **Env vars for live email/AI:** `RESEND_API_KEY` (and `RESEND_FROM` once the
   domain is verified) and `ANTHROPIC_API_KEY` are **not set** — email currently
   no-ops by design; set them if those features are demoed.
10. **8 agent avatar photos** were on randomuser.me historically — verify all
    `/public/avatars/*` load (last check: all present and resolving).

### Light polish (non-blocking)
11. External **Unsplash hero/portrait images are hotlinked** at runtime (landing,
    My Sanctury hero, couple portraits, marketplace hero). They resolve today,
    but for pitch-day resilience consider downloading them into `/public`.

---

## 3. DECISIONS OUTSTANDING (need a human call)

1. **Agent name: Mark Johnson vs Mark Williams.** The agent *login persona* is
   "Mark Johnson" (`DEMO_AGENT`, dashboard greets "Good morning, Mark"), but the
   homeowner-facing handover everywhere says **"Mark Williams · Tall Poppy"**.
   Both appear within one demo. Pick one name and align. (I followed the spec's
   "Mark Williams" for handover surfaces; `DEMO_AGENT` left untouched as it's
   auth data.)

2. **Refix day-count is now live-computed** (107 today, drifting to ~100 by
   23 June). It's consistent across surfaces, but the number will differ from
   any slide/screenshot taken earlier. Confirm that's acceptable, or pin a fixed
   number for the pitch.

3. **Property-creation flow title.** The dashboard button is "Create Property
   Record" but the flow's internal heading is still "Prepare property handover".
   Intentional (two framings), but align if you want it identical.

4. **Agent value-prop emphasis.** `/agents` leads with the listing-pipeline
   ("Own the listing before it exists") and keeps referral income in the stats.
   If you want "disclosed referral income from every settlement" as the *lead*
   message, that's a rewrite to make.

5. **Marketplace "For You" reasoning vs brevity.** Cards currently show the full
   reasoning sentence (restored for the pitch story). If you prefer the tighter
   provider-only line from the redesign, that's a one-line revert.

6. **Homeowner marketplace quotes vs rebuild.** All three insurance quotes now
   sit at/above the $1,063,290 rebuild (correct for closing the gap). If the
   demo wants to *show* a cheaper-but-insufficient option for contrast, that's a
   product/story decision.

---

## 4. KEY FILES / WHERE THINGS LIVE
- Canonical demo numbers: `lib/my-sanctury/handover-data.ts` (`PROPERTY`,
  `FINANCES`, `HANDOVER`, `HOUSEHOLD`, `REFIX_DATE`, `HOME_HEALTH_SCORE`).
- Health-check seed (feeds `/report` + `/marketplace/insurance`):
  `lib/storage/demo-seed.ts`.
- Insurance quotes: `lib/marketplace/insurance-quotes.ts`. Partner lead (Jane):
  `lib/partner/dashboard-data.ts`. For-You recs: `lib/marketplace/for-you.ts`.
- Vault docs + maintenance: `lib/my-sanctury/vault-data.ts`.
- Shared homeowner UI: `app/my-sanctury/(portal)/components/`.
- Demo credentials: agent `agent@sanctury.co.nz` / partner
  `adviser@sanctury.co.nz`, both `demo1234`; homeowner = magic link.

---

## 5. DEMO FLOW QUICK REFERENCE
- **Act 2 (homeowner):** `/` → `/check` (type a Tauranga address) → `/report`
  (the big red $163,290) → `/marketplace/insurance` → consent → confirmed.
- **Act 3 (agent):** `/agent/login` → dashboard (Sarah Chen red row) →
  "Generate message".
- **Act 4 (handover):** agent dashboard → "Create Property Record" → 5 steps →
  homeowner arrives at pre-built `/my-sanctury`.
