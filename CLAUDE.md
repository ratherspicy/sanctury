# Sanctury — Claude Code Project Rules

## Read ARCHITECTURE.md
Before building anything new (new entities, data models, account/profile/document 
features), read ARCHITECTURE.md in the project root. It is the constitutional 
document for how Person, Property, and Relationship data is structured. The 
current build uses hardcoded demo data and does not yet implement it — that's 
fine for the pitch — but never build something that assumes a different model 
(e.g., never merge two people's data into one account, never store personal 
financial data on the property record).

## What This Project Is
Sanctury is a NZ property intelligence platform. It gives homeowners a free home health check (insurance gap, mortgage refix window, maintenance timeline), then connects them to relevant advisers and services via an AI-powered marketplace. Three personas: Homeowner, Agent (real estate), Partner (financial adviser/insurer). ~11 days to a major pitch (Tall Poppy, June 23). Every session must leave the project in a clean, deployable state.

## The One-Line Pitch
"Nobody teaches you how to own a home. Sanctury is where you feel safe, get 
help, get a good deal, and keep your home together. Right from day one."

## Current Focus
Pitch sprint. Sprint prompts C through H are defined in SPRINT_PROMPTS.md — run 
them in order, one session at a time, reviewing the live URL after each. 
Prompt C (dashboard layout fixes) is next.

---

## CRITICAL RULES — NEVER BREAK THESE

1. **Never change the demo seed data.** Property is 14 Cameron Road, Tauranga. Cover **$900,000** (corrected June 12 — was $600K, now reconciles with rebuild cost $1,063,290 minus gap $163,290 across every surface including the partner dashboard and the vault insurance document). Rebuild $1,063,290. Gap $163,290. Mortgage $480K. Purchase price $1,285,000. Settlement 15 March 2024. These numbers appear in many places — if you change one, you must change all. Safest: don't change any without explicit instruction.
2. **Always git commit after every session.** `git add -A && git commit -m "description" && git push`. No exceptions.
3. **TypeScript is strict.** Vercel will reject the build on type errors. Always check types before pushing. Fix type errors before committing.
4. **Never manually edit files** unless using `sed` for a targeted single-line fix. Use Cursor or Claude Code for all code changes.
5. **Verify on live Vercel URL after every push.** Hard refresh with Cmd+Shift+R. Use incognito to bypass cache.

---

## TECH STACK

- Next.js 16.2.6 — App Router, Turbopack
- TypeScript — strict mode
- Tailwind CSS — JIT
- Supabase — database + magic link auth
- Vercel — auto-deploys on git push
- Recharts — data visualisations
- Addy API — NZ address autocomplete
- Anthropic Claude API — not yet connected (Day 7)

### Tailwind opacity gotcha — CRITICAL
`bg-[#hex]/72` does **NOT** work for custom hex colours. Use inline style instead:
```jsx
// WRONG — will silently fail
<div className="bg-[#14532D]/72" />

// CORRECT
<div style={{ backgroundColor: '#14532D', opacity: 0.72 }} />
```

### Next.js 16 JSX space-eating bug — CRITICAL
Next 16 eats spaces after inline JSX expressions at build time. Symptoms look 
like "136days" or "Mitchellwithin" — the source has a space but the rendered 
output doesn't. Always use explicit `{" "}` between inline expressions — never 
rely on source whitespace. Always check rendered text on the live Vercel URL, 
not just the source code.

### Supabase
Free tier pauses after inactivity. Always check it's running before demos or auth-dependent testing: supabase.com → check project status.

### Vercel deployment failures
Most common cause: TypeScript type errors from generated code. Check build log, fix with sed or Cursor, push again.

---

## PERSONA COLOUR SYSTEM

| Persona | Routes | Primary | Secondary |
|---------|--------|---------|-----------|
| Homeowner | /, /check, /report, /my-sanctury, /marketplace | #6D5FD8 purple | #EEEDF8 |
| Agent | /agents, /agent/* | #3CB371 sea green | #2E8B57 |
| Partner | /partners, /partners/* | #0D9488 teal | — |

### Gradients
- Agent dashboard header: `linear-gradient(135deg, #1a5c3a 0%, #2E8B57 50%, #3CB371 100%)`
- Partner dashboard header: `linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)`

---

## AGENT DASHBOARD COLOUR RULES — LOCKED

Two states only. Do not add more colours.

**Row left borders:**
- Urgent: `#DC2626` red (refix imminent, critical insurance gap)
- Default: `#3CB371` sea green (everything else)

**Alert badge pills:**
- Urgent: bg `#FEE2E2` / text `#DC2626` (refix in X days, insurance gap $X, bright-line)
- Neutral: bg `#F3F4F6` / text `#374151` (all other states)

Red is the only colour that pulls the eye. Red means call someone today.

---

## DEMO CREDENTIALS

| Role | Email | Password |
|------|-------|----------|
| Agent | agent@sanctury.co.nz | demo1234 |
| Partner | adviser@sanctury.co.nz | demo1234 |
| Homeowner | Magic link auth — must pre-login before any demo |

**Property Passport (/my-sanctury/vault) is auth-protected.** Must be logged in on a separate tab before any demo. Cannot be cold-opened.

---

## ALL ROUTES

| Route | Persona | Auth |
|-------|---------|------|
| / | Homeowner | None |
| /check | Homeowner | None |
| /report | Homeowner | None |
| /marketplace/insurance | Homeowner | None |
| /marketplace/insurance/confirmed | Homeowner | None |
| /my-sanctury | Homeowner | Magic link |
| /my-sanctury/vault | Homeowner | Magic link |
| /agents | Agent | None |
| /agent/login | Agent | — |
| /agent/dashboard | Agent | demo1234 |
| /agent/dashboard/clients/[id] | Agent | demo1234 |
| /partners | Partner | None |
| /partners/login | Partner | — |
| /partners/dashboard | Partner | demo1234 |
| /partners/dashboard/leads/jane | Partner | demo1234 |
| /privacy | — | None |
| /about | — | None |
| /contact | — | None |

---

## ENVIRONMENT VARIABLES (Vercel)

| Variable | Status |
|----------|--------|
| NEXT_PUBLIC_ADDY_API_KEY | ✅ Set |
| ADDY_API_SECRET | ✅ Set |
| NEXT_PUBLIC_SUPABASE_URL | ✅ Set |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | ✅ Set |
| SUPABASE_SECRET_KEY | ✅ Set |
| NEXT_PUBLIC_SITE_URL | ✅ Set (sanctury-five.vercel.app) |
| ANTHROPIC_API_KEY | ⚠️ Not yet set — needed Day 7 |
| RESEND_API_KEY | ⚠️ Not yet set — needed Day 8 |

---

## GIT WORKFLOW

```bash
# End of every session — no exceptions:
git add -A && git commit -m "description" && git push

# Targeted single-line fix:
sed -i '' 's/old text/new text/' path/to/file.tsx
git add -A && git commit -m "fix: description" && git push

# Confirm fix applied:
grep -n "search term" path/to/file.tsx
```

---

## KNOWN OUTSTANDING ISSUES

**Blocking (must fix before pitch):**
- Sprint prompts C–H (SPRINT_PROMPTS.md) — run in order, this is the active build queue
- sanctury.co.nz DNS not connected to Vercel — Day 10, manual step
- 8 agent avatar photos still using randomuser.me — replace with Pexels photos in `/public/avatars/`, update `app/agent/dashboard/components/client-portfolio.tsx`
- Session B marketplace (public + personalised) needs a manual auth-check on phone

**Already done — do not redo:**
- Mobile responsiveness audit (Day 5) ✅
- Full QA sweep (Day 6) ✅ — /privacy and /about now have real content, middleware fixed
- Jane Thompson data reconciliation ✅ — cover is $900K everywhere, see rule #1
- Marketplace quotes all above rebuild cost ✅

**Week 2 / needs env vars first:**
- Connect Anthropic Claude API — Prompt E, needs ANTHROPIC_API_KEY in Vercel
- Resend email (report delivery) — Prompt F, needs RESEND_API_KEY in Vercel
- Report page polish — Prompt E
- Settlement meeting language on agent dashboard — Prompt G

---

## LINKS

- Live: https://sanctury-five.vercel.app
- GitHub: https://github.com/ratherspicy/sanctury
- Supabase: https://nfzesfwumjzkaigvnenc.supabase.co
- Vercel dashboard: https://vercel.com
