# Sanctury — Handover Document
### Date: June 2026
### Status: POC complete. Tall Poppy pitch ready. Vision fully defined.

---

## Session Summary — June 4 2026

### What was built this session

**My Sanctury dashboard — complete redesign**
- Removed tab-based layout, replaced with single scrollable page
- New section order: Property card → Active requests → Home status grid → For you nudges
- Property card: address, estimated value, equity bar, gain since purchase, refix date
- Active requests: live status, expandable quote panel for Sarah Mitchell, start new request
- Home status: 2x2 visual grid — Insurance, Mortgage, Maintenance, Market — each with status, value, and action link
- For you: lightweight nudge feed with coloured dots and plain English sentences

**Login page — redesigned**
- Card on grey background, logo centred above
- "Good to have you back." as hero
- "New to Sanctury? Run your free Home Health Check" below card

**Logo wordmark — updated**
- Lowercase "sanctury" with letter-spacing -0.04em — cleaner, more confident

**Demo data seed — fixed**
- Created lib/storage/demo-seed.ts
- Seeds sessionStorage from dashboard on first load
- Floor area set to 262m² Above Standard to produce ~$1,063,290 rebuild cost
- Consistent numbers throughout: dashboard, report, insurance marketplace
- Previously report showed $706K rebuild cost and no gap — now consistent $163K gap

**Roadmap and handover — fully updated**
- ROADMAP.md rewritten with full vision, platform principles, GaaS definition, homeowner journey, agent proposition, integration partners, build priorities, manifesto
- HANDOVER.md created as standalone handover document
- Both committed to GitHub

**Vercel deployment — fixed**
- Environment variables added to Vercel dashboard
- sanctury-five.vercel.app now live and current

### What still needs fixing

**Before Tall Poppy pitch:**
- [ ] Connect sanctury.co.nz domain to Vercel
- [ ] Add privacy notice to health check form
- [ ] Create /privacy page
- [ ] Fix "46days" spacing bug in mortgage section copy
- [ ] Full QA sweep of demo flow — every page, every button, every link

**Known broken links on dashboard:**
- "Find tradie" → currently goes to /check, no tradie marketplace yet
- "Review" under Mortgage → currently goes to /marketplace/insurance, mortgage marketplace not built
- "See detail" under Market → goes to /report, works

**Technical debt (logged in ROADMAP.md):**
- Persist health check data to Supabase — currently sessionStorage only
- Agent dashboard uses hardcoded credentials
- Supabase free tier pauses — needs upgrade or keep-alive
- Middleware deprecation warning

### Key decisions made this session

1. **GaaS not SaaS** — Sanctury is Guidance as a Service. AI is the product, not a feature.

2. **Agnostic platform** — Tall Poppy gets first mover advantage, not permanent exclusivity. Platform must work for any agent, any adviser, any vendor.

3. **Data ownership** — homeowner owns their data always. Sanctury stewards it, never sells it.

4. **The agent proposition** — before settlement sit-down + 3 month return visit replaces the gift basket. Agent becomes the onboarding experience and physical data gatherer for the platform.

5. **Plays with others** — Sanctury integrates with Wise Move, Builderscrack, TradeMe, Relab, banks, energy providers via API. Completes the ecosystem, doesn't compete with it.

6. **Climate risk** — every property profile includes flood, coastal, liquefaction, and insurance withdrawal risk. Homeowners deserve this information.

7. **The renewal calendar** — because settlement data captures every contract start date, Sanctury can predict every renewal event. Each one is a revenue opportunity and a reason to return to the platform.

8. **Report stays as conversion tool** — /report page kept as the hook that converts health check completions into My Sanctury signups. Dashboard absorbs report content for logged-in users via expandable home status tiles (Phase 1 build priority).

### Next session should start with

1. Connect sanctury.co.nz to Vercel (DNS settings at domain registrar)
2. Fix the 46days spacing bug
3. Add privacy notice to /check form
4. Full QA sweep
5. Then start Phase 1 builds:
   - Settlement onboarding flow for agents
   - Renewal calendar
   - Mortgage marketplace
   - Claude API for personalised insights

### The vision in one line

Sanctury builds trust so normal Kiwis can make decisions that work for them — transparently, in plain language, with full understanding. Free for homeowners. Forever.

---

## What Sanctury Is

Sanctury builds trust so normal Kiwis can make decisions that work for them — transparently, in plain language, with full understanding of what they are signing up for.

It takes the smoke and mirrors out of insurance, mortgages, utilities, and property services — and keeps it real.

**Tagline:** Get your home in order — for free.

**The one-paragraph vision:** Sanctury is the financial co-pilot for New Zealand homeowners. For a generation that bought their homes in the most complex property market in history, Sanctury gives them the transparency, intelligence, and trusted professional connections they need to protect their biggest asset, grow their wealth, and navigate every decision that comes with owning a home. Free for homeowners. Powered by the professionals who serve them. Built for the generation that expects more.

---

## Who Is Building This

Bay of Plenty, NZ-based founder who:
- Has previously run a tech startup
- Does not want to operate another one
- Has board-level relationships with Tall Poppy CEO and GM
- Wants to build the vision, POC, and roadmap — pitch to Tall Poppy, structure JV deals, sit on the board while the right team executes

---

## The Platform Principles

1. **Homeowner first** — every feature serves the homeowner, not the vendor or agent
2. **Radical transparency** — homeowners see what advisers are paid, what products cost, what their options are
3. **Data ownership** — homeowner data belongs to the homeowner, always
4. **Agnostic by design** — works with any agent, any adviser, any vendor. No single interest owns it
5. **Plain language always** — no jargon, no complexity theatre
6. **Climate aware** — every property decision includes risk context
7. **Plays with others** — integrates with TradeMe, Wise Move, Builderscrack, Relab, banks, insurers via API

---

## What Is Built and Working

### sanctury-five.vercel.app
- Landing page with full design system
- Home Health Check — 4-step form, NZ address autocomplete, regional rebuild rates
- Report page — insurance gap visualisation, mortgage strategy charts, maintenance timeline
- Insurance marketplace — job posting, adviser proposals, selection, confirmation, review flow
- My Sanctury dashboard — property overview, active requests, home status grid, alerts, nudges
- Agent dashboard — client portfolio, alert feed, personalised message generator
- Magic link authentication via Supabase

### Design system
- Primary: Purple #6D5FD8
- Secondary: Green #16A34A
- Typography: Inter, tight tracking on wordmark
- Voice: Warm, direct, plain English. Like a trusted friend who understands property finance.

---

## The Demo Flow (15 minutes)

**Act 1 — The problem (2 min)**
"Every agent works hard to build a relationship over six weeks. Settlement closes. The relationship ends. Three years later the client lists with someone else. This is the industry's biggest unsolved problem."

**Act 2 — Jane's experience (5 min)**
Open sanctury.co.nz. Type a Tauranga address. Fill in the form. Show the report. Show the $163K insurance gap. Show the mortgage payoff curve. Show the maintenance timeline. Click Review your sum insured. Show quotes arriving. Show Sarah's profile. Show confirmation.
"Jane just discovered she's $163,000 underinsured. In five minutes. For free. No sales pitch."

**Act 3 — Mark's experience (3 min)**
Open /agent/login. Sign in as agent@sanctury.co.nz / demo1234. Show client portfolio. Show alerts. Click Generate message on Sarah Chen. Show the personalised message.
"Mark didn't cold call. Sanctury told him who needed attention and gave him something genuine to say."

**Act 4 — The vision (3 min)**
"Property Suite handles the transaction. Relab powers the appraisal. Sanctury owns what happens in the seven years between sales. And it serves the generation — Millennials and Gen Z — who expect this."

**Act 5 — The ask (2 min)**
Show ROADMAP.md. Explain JV structure. Make the ask.

---

## The Tall Poppy Pitch

**The ask:** 15–20% equity in Sanctury Limited in exchange for network deployment, co-marketing, agent onboarding support, and franchise fee waived.

**The agent proposition:**
- Before settlement — sit down with homeowner, open Sanctury together, enrol the property. 20 minutes. Homeowner gets complete picture of their new home.
- 3 months post-settlement — return visit. Review dashboard. Answer questions. Cement the relationship.
- Annually — Sanctury generates property maximiser review. Agent delivers it.
- At sale — agent who enrolled them wins the listing.

**Cost:** Two visits and an hour of the agent's time.
**Return:** Warm client relationship for 7–10 years and a near-certain listing.

---

## The Business Model

Homeowners: free. Always.

Vendors pay:
- Insurance advisers: $199/month + $150–300/lead
- Mortgage advisers: $299/month + $500–900/lead
- Energy providers: $99/month + $50–100/switch
- Tradies: $99/month + $20–80/job
- Moving companies: $99/month + $30–60/job

---

## Known Issues (fix before pitch)

### High priority
1. sanctury.co.nz not connected to Vercel
2. Supabase pauses on free tier
3. Privacy notice missing from form
4. Consent modal before adviser receives contact details
5. Addy API keys not in Vercel environment variables

### Medium priority
6. Middleware deprecation warning
7. No /privacy page
8. No /about page
9. No /contact page
10. 136days spacing bug in mortgage copy

### Low priority
11. Agent dashboard uses hardcoded credentials
12. Message generator uses hardcoded messages
13. No PDF download of report
14. No email delivery of report

---

## How to Run Locally

```bash
cd Desktop/sunctury
npm install
npm run dev
# http://localhost:3000
```

**Common issues:**
- Port 3000 in use — kill [PID] then npm run dev
- Magic link fails — Supabase project may be paused, restore at supabase.com
- Address autocomplete not working on live — check Addy keys in Vercel env vars
- Email rate limit — wait 1 hour

---

## Next Conversation Should Start With

1. Connect sanctury.co.nz to Vercel
2. Fix privacy notice and consent modal
3. Fix all known bugs
4. Full QA sweep
5. Then: settlement onboarding flow, renewal calendar, mortgage marketplace

The full vision, principles, and roadmap are in ROADMAP.md.
The product manifesto is in ROADMAP.md under The Manifesto.
