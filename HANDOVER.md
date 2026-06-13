# Sanctury — Technical Build Handover
### Last updated: June 13 2026
### Status: Building phase. Architecture documented. Pitch sprint in progress.
### Next session: Dashboard layout fixes (Prompt C)
### Days to Tall Poppy pitch: ~11

---

## QUICK REFERENCE

| Item | Value |
|------|-------|
| Live site | sanctury-five.vercel.app |
| Target domain | sanctury.co.nz — Day 10, manual DNS |
| Local | cd Desktop/Sanctury && npm run dev → http://localhost:3000 |
| GitHub | github.com/ratherspicy/sanctury |
| Agent demo login | agent@sanctury.co.nz / demo1234 |
| Partner demo login | adviser@sanctury.co.nz / demo1234 |
| Supabase | nfzesfwumjzkaigvnenc.supabase.co — CHECK NOT PAUSED before every demo |

---

## ARCHITECTURE PRINCIPLES (READ BEFORE BUILDING)

Sanctury has a formal ARCHITECTURE.md in the project root (and in this handover package). Every build decision must respect it. The three core principles:

1. The PROPERTY is permanent — follows the house, accumulates history across all owners
2. The PERSON is portable — follows the individual through every property they ever touch. NEVER merged with another person's account.
3. The RELATIONSHIP is the thing that changes — typed (Owner-Occupier, Landlord, Tenant, Co-owner, Executor, Agent), lifecycled, and access-controlled.

The current POC uses hardcoded demo data. The schema does not yet implement this architecture. That is acceptable for the pitch. Post-pitch Sprint 1 is a clean schema rebuild.

---

## CODE GOTCHAS — READ BEFORE TOUCHING ANYTHING

1. Tailwind opacity: bg-[#hex]/72 does NOT work. Use style={{ backgroundColor: '#hex', opacity: 0.72 }}
2. Next.js 16 JSX space-eating: use explicit {" "} between inline expressions. Check rendered text on Vercel.
3. TypeScript is strict: Vercel rejects type errors. Run tsc --noEmit before committing.
4. Supabase free tier: pauses after inactivity. Check supabase.com before every demo.

---

## AGENT DASHBOARD COLOUR RULES (LOCKED)

Row borders: Urgent #DC2626 red | Default #3CB371 sea green
Badges: Urgent #FEE2E2 bg / #DC2626 text | Neutral #F3F4F6 bg / #374151 text
Red = call someone today. No other colours. Do not change.

---

## PERSONA COLOURS

Homeowner: #6D5FD8 purple — /, /check, /report, /my-sanctury/*, /marketplace/*
Agent: #3CB371 / #2E8B57 sea green — /agents, /agent/*
Partner: #0D9488 teal — /partners, /partners/*
Agent gradient: linear-gradient(135deg, #1a5c3a 0%, #2E8B57 50%, #3CB371 100%)
Partner gradient: linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)

---

## ALL ROUTES

| Route | Auth | Status |
|-------|------|--------|
| / | None | ✅ |
| /check | None | ✅ |
| /report | None | ✅ |
| /marketplace | None | ✅ |
| /marketplace/insurance | None | ✅ |
| /marketplace/insurance/confirmed | None | ✅ |
| /marketplace/mortgages | None | ✅ |
| /my-sanctury | Magic link | ✅ |
| /my-sanctury/vault | Magic link | ✅ |
| /my-sanctury/finances | Magic link | ✅ |
| /my-sanctury/maintenance | Magic link | ✅ |
| /my-sanctury/marketplace | Magic link | ✅ |
| /agents | None | ✅ |
| /agent/login | — | ✅ |
| /agent/dashboard | demo1234 | ✅ |
| /agent/dashboard/clients/[id] | demo1234 | ✅ |
| /agent/dashboard/properties/new | demo1234 | PROMPT D |
| /partners | None | ✅ |
| /partners/login | — | ✅ |
| /partners/dashboard | demo1234 | ✅ |
| /partners/dashboard/leads/jane | demo1234 | ✅ |
| /privacy | None | ✅ |
| /about | None | ✅ |
| /contact | None | ✅ |

---

## DEMO SEED DATA — DO NOT CHANGE

Property: 14 Cameron Road, Tauranga · 262m² · Above Standard · 1998 · Bay of Plenty
Rebuild cost: $1,063,290 · Cover: $900,000 · Gap: $163,290
Purchase price: $1,285,000 · Settlement: 15 March 2024
Mortgage: $480,000 · Equity: $805,000 · LVR: 37.4%
Refix: 1 October 2026 (115 days)
Revolving credit saving: $11,200 · Extra $500/mo saving: $153,891
Agent: Mark Williams · Tall Poppy Real Estate · Tauranga

Homeowner profile:
- Jane Thompson · Primary · jane@example.com
- David Thompson · Co-owner
- Lily Thompson · 14 · Dependent
- Sam Thompson · 9 · Dependent
- Archie · Golden Retriever · 3 years
- Owner-occupiers since March 2024 · Freehold · Owner-occupied
- Previous owner: 14 years

Marketplace quotes (all above rebuild cost):
- Sarah Mitchell · Tower · $1,064,000 · $241/mo
- Rachel Chen · AMI · $1,065,000 · $232/mo
- James Tauroa · Vero · $1,150,000 · $268/mo

---

## OUTSTANDING ISSUES

### Must fix before pitch
1. Dashboard layout fixes — Prompt C (next session)
2. Agent property record creation demo — Prompt D
3. sanctury.co.nz DNS — Day 10, manual
4. Agent avatar photos — 8 randomuser.me URLs to replace with Pexels photos
5. Session B marketplace — manual auth check on phone required

### Week 2 build
6. Claude API — Day 7, ANTHROPIC_API_KEY in Vercel first
7. Resend email — Day 8, RESEND_API_KEY in Vercel first
8. Report page polish — Day 9
9. QA sweep — Days 11-12
10. Data consistency check — Day 13

---

## SPRINT PROMPTS — RUN IN ORDER

| Prompt | Session | Focus | Status |
|--------|---------|-------|--------|
| Prompt C | Now | Dashboard layout fixes | Ready to run |
| Prompt D | Next | Agent property record creation | Ready to run |
| Prompt E | Day 7 | Claude API + personalised report | Needs ANTHROPIC_API_KEY in Vercel first |
| Prompt F | Day 8 | Resend email | Needs RESEND_API_KEY in Vercel first |
| Prompt G | Day 9 | Report polish + agent language | Ready to run after F |
| Prompt H | Days 11-12 | Pre-pitch QA sweep | Run after DNS connected |

All prompts are in the separate SPRINT_PROMPTS.md file.

---

## VERCEL ENV VARS

NEXT_PUBLIC_ADDY_API_KEY ✅ | ADDY_API_SECRET ✅
NEXT_PUBLIC_SUPABASE_URL ✅ | NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ✅ | SUPABASE_SECRET_KEY ✅
NEXT_PUBLIC_SITE_URL ✅ (sanctury-five.vercel.app)
ANTHROPIC_API_KEY ⚠️ Needed Day 7 | RESEND_API_KEY ⚠️ Needed Day 8

---

## GIT WORKFLOW

git add -A && git commit -m "description" && git push
Verify: vercel.com → deployments → green. Hard refresh: Cmd+Shift+R. Incognito for cache.
If Vercel fails: TypeScript type error. Fix, push again.

---

## DEMO SCRIPT

Pre-demo: Supabase up · My Sanctury logged in (separate tab) · Agent logged in · Health check pre-run · Hard refresh · Clear browser history (not logged-in tabs) · Charged laptop

Act 1 (2 min): Problem. Banks have data. Insurers have models. Homeowner has nothing.
Act 2 (5 min): Jane's journey. Health check → report → $163K gap → marketplace → adviser.
Act 3 (3 min): Mark's dashboard. Red row. Message. "That's a listing in 18 months."
Act 4 (2 min): Property Passport. Plumbing card. LIM modal. "When they sell, it transfers."
Act 5 (3 min): Sanctury Score. Architecture vision. The ask.

---

## STRATEGIC CONTEXT

The ask: 15–20% equity. Network deployment, co-marketing, agent onboarding. Franchise fee waived. All franchises recommend Sanctury within 12 months.

Key pitch lines:
- "Property Suite handles the transaction. Relab powers the appraisal. Sanctury owns what happens in the seven years between sales."
- "The property record travels with the house. The homeowner record travels with the person. Couples separate. Families restructure. The platform untangles cleanly because it was never tangled in the first place."
- "Every LIM stored is council risk patterns by region. Nobody else is building this. It compounds."

---

*Updated June 13 2026. ARCHITECTURE.md added. Schema rebuild is post-pitch Sprint 1.*

---

## PITCH NARRATIVE — THE SOUL OF SANCTURY (June 13 2026)

### The Core Insight
Nobody teaches you how to own a home. You learn by making expensive mistakes. 
By the time most homeowners know what they should have done, they're downsizing.
Sanctury changes that.

### The Trust Cascade (business model + narrative + moat)
1. AGENT opens the door — first trust event, most trusted person in the transaction
2. SANCTURY maintains the relationship — shows you where you stand, never leaves you guessing
3. THE RIGHT PARTNER at the right moment — not cold calls, not ads, intelligence-driven
4. TRUST COMPOUNDS — homeowner returns, recommends, stays. Agent stays relevant for life.

### The Founder Story (use in the pitch)
"I've owned homes. I've made the expensive mistakes. I've been underinsured, missed 
the refix window, had the thing go wrong that I didn't know could go wrong. Nobody 
is solving this. So I built it."

### The One Line
"Sanctury is where you feel safe, get help, get a good deal, and keep your HOME 
together. Peace of mind."

### Staging Framework

SHOW IT (demo, working):
- Health check → report → insurance gap → marketplace → adviser
- Agent dashboard → right client → right moment → message
- Property Passport → plumbing card → document modal
- Agent creating property record → Jane inheriting it
- Homeowner dashboard → Sanctury Score → what needs attention

SAY IT (Act 5, describe don't demo):
- Full 5-pillar Sanctury Score
- Document safe and lawyer proxy model
- Architecture (property travels, person travels, untangles cleanly on divorce/sale)
- Data moat
- Trust cascade flywheel

SAVE IT (post-pitch, do not build now):
- Document upload functionality
- Lawyer partner dashboard
- Multi-property portfolio view
- Physical safety full assessment
- Safety Mode implementation
- AI renovation renders
- Schema rebuild (post-funding Sprint 1)

### Updated Demo Script

Act 1 (2 min) — The problem nobody names
"Nobody teaches you how to own a home. Not what insurance you need. Not when to lock 
in your mortgage. Not what documents matter when something goes wrong. You learn by 
making mistakes. By the time most homeowners know what they should have done — 
they're downsizing. Sanctury changes that."

Act 2 (5 min) — Jane's experience
Health check → report → gap → marketplace → adviser.
"Jane didn't know she was underinsured. Sanctury did. And it connected her to someone 
who could fix it — before something went wrong."

Act 3 (3 min) — Mark's experience
Agent dashboard → red row → message.
"Mark didn't cold call. Sanctury told him who needed attention and gave him something 
genuine to say. That is a relationship, not a transaction."

Act 4 (2 min) — The property record
Agent creates it → Jane inherits it.
"The agent doesn't just hand over keys. They hand over the complete intelligence record 
of the home. Jane arrives knowing exactly what she owns."

Act 5 (3 min) — The vision
"The agent opens the door and provides trust. Sanctury keeps building that trust. 
Every partner that responds at the right moment compounds it. We're not building a 
property app. We're building the infrastructure for a trusted relationship between 
homeowners and their homes — for life."
Show roadmap. Make the ask.
