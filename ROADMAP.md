# Sanctury Product Roadmap
## Last updated: June 2026

---

## The Vision

Sanctury builds trust so normal Kiwis can make decisions that work for them — transparently, in plain language, with full understanding of what they are signing up for.

It takes the smoke and mirrors out of insurance, mortgages, utilities, and property services — and keeps it real.

Free for homeowners. Forever. Paid for by the professionals who want to serve them.

---

## The Platform Principles

1. **Homeowner first** — every feature, every decision, every integration is evaluated by whether it serves the homeowner. Not the agent, not the vendor, not Sanctury.

2. **Radical transparency** — homeowners see exactly what advisers are paid, what products cost, and what their options are. No hidden commissions, no preferred partners, no smoke and mirrors.

3. **Data ownership** — homeowner data belongs to the homeowner. They can view it, export it, and delete it. Sanctury uses it to serve them, not to sell to third parties.

4. **Agnostic by design** — Sanctury works with any agent, any adviser, any vendor. No single commercial interest can own or steer the platform. Tall Poppy gets first mover advantage, not exclusivity forever.

5. **Plain language always** — no jargon, no fine print, no complexity theatre. If a 25-year-old first home buyer can't understand it, rewrite it.

6. **Climate aware** — every property decision includes climate and flood risk context. Homeowners deserve to know what risks they are taking on and where.

7. **Plays with others** — Sanctury integrates with TradeMe, realestate.co.nz, Wise Move, Builderscrack, Relab, Cotality, banks, insurers, and energy providers via API. We complete the ecosystem, not compete with it.

---

## The Business Model

**Homeowners:** Free. Always. No subscription, no premium tier, no upsell.

**Vendors pay to participate:**
- Insurance advisers: $199/month + $150–300 per won lead
- Mortgage advisers: $299/month + $500–900 per won lead
- Energy providers: $99/month + $50–100 per switch
- Tradies: $99/month + $20–80 per won job
- Moving companies: $99/month + $30–60 per won job

**The flywheel:** More homeowners → more leads → more vendors → better deals → more homeowners.

---

## The Homeowner Journey

### At purchase (Settlement onboarding)
- Agent sits down with new homeowner before settlement
- Together they enrol in Sanctury — property details, mortgage, insurance, utilities, family composition
- Homeowner gets complete picture of their new home from day one
- Agent gets a reason to return at 3 months post-settlement
- Sanctury gets complete, accurate data that no web form could capture

### Year 1 (Getting sorted)
- Renewal calendar shows every upcoming date — refix, insurance, power, broadband
- Maintenance schedule specific to the property age and features
- Insurance gap identified and fixed via marketplace
- Mortgage structure optimised via adviser marketplace
- Utilities switched to best deal via comparison engine

### Years 2–5 (Managing well)
- Quarterly property value updates via Relab/Cotality AVM
- Equity position tracked and visualised
- Refix decisions supported with rate comparison and adviser access
- Maintenance calendar updated as items become due
- Climate and flood risk assessment surfaced

### Years 5–10 (Growing wealth)
- Equity decision tool — renovate, invest, pay down, do nothing
- Renovation ROI modelling — what adds value in this suburb
- Investment property feasibility using existing equity
- Pre-listing preparation — what to do 12–18 months before selling
- Neighbourhood intelligence — what agents know that Google doesn't

### At sale (Closing the loop)
- Pre-sale maximiser report generated
- Agent who enrolled them at settlement wins the listing
- Moving marketplace connected via Wise Move API
- Next property search begins — the cycle restarts

---

## Current Status (June 2026)

### Live and working
- Landing page — sanctury-five.vercel.app
- Home Health Check — 4-step form with NZ address autocomplete
- Insurance gap calculation with regional rebuild cost rates
- Report page — insurance, mortgage, and maintenance visualisations
- Insurance marketplace — job posting, adviser proposals, selection flow
- My Sanctury dashboard — property overview, active requests, home status, alerts
- Agent dashboard — client portfolio, alert feed, message generator
- Magic link authentication via Supabase

### In progress
- Domain connection — sanctury.co.nz not yet pointing to Vercel
- Privacy notice — required before real user deployment
- Demo data consistency — seed data now matches calculation engine

### Technical debt (fix before real deployment)
- **Persist health check to Supabase** — report and marketplace pages read from sessionStorage. Must save to `health_checks` table and load from there. Enables real per-user data on dashboard.
- **Agent dashboard auth** — currently hardcoded demo credentials. Needs proper auth before real agents use it.
- **Addy API keys** — not in Vercel environment variables. Address autocomplete may fail on live site.
- **Middleware deprecation** — update middleware file convention to proxy pattern.
- **Supabase keep-alive** — free tier pauses after inactivity. Upgrade or implement ping.
- **136 days spacing bug** — missing space in mortgage section copy.

---

## Build Priorities

### This week (before Tall Poppy pitch)
- [ ] Connect sanctury.co.nz to Vercel
- [ ] Add privacy notice to health check form
- [ ] Create /privacy page
- [ ] Fix all known bugs
- [ ] Full QA sweep of demo flow

### Phase 1 — Foundation (post Tall Poppy, months 1–3)
- [ ] Persist health check data to Supabase
- [ ] Settlement onboarding flow for agents
- [ ] Renewal calendar — visual 12-month view of upcoming dates
- [ ] Mortgage marketplace — same pattern as insurance
- [ ] Connect Claude API for personalised report insights
- [ ] PDF report download
- [ ] Email report delivery via Resend
- [ ] Privacy policy page and consent framework

### Phase 2 — Marketplace (months 3–6)
- [ ] Energy and broadband comparison marketplace
- [ ] Tradie marketplace — native or Builderscrack API integration
- [ ] Moving marketplace — Wise Move API integration
- [ ] Vendor subscription billing infrastructure
- [ ] Vendor dashboard — profile, incoming jobs, proposals
- [ ] Per-lead fee tracking and payment processing
- [ ] Homeowner review and rating system

### Phase 3 — Intelligence (months 6–12)
- [ ] Equity decision tool — renovate, invest, pay down, do nothing
- [ ] Renovation ROI modelling by suburb and property type
- [ ] Home timeline — visual history of the property journey
- [ ] Climate and flood risk assessment by address
- [ ] Neighbourhood intelligence feed
- [ ] LINZ property data integration
- [ ] Relab AVM integration for quarterly value updates
- [ ] Bright-line tax position tracker
- [ ] Pre-sale maximiser report

### Phase 4 — Scale (year 2)
- [ ] Mortgage rate comparison with live bank feeds
- [ ] TradeMe and realestate.co.nz listing data integration
- [ ] First home buyer hub
- [ ] Investment property feasibility tool
- [ ] Mobile app
- [ ] API for third-party integrations
- [ ] Homeowner advisory board

---

## The Agent Proposition

### What agents currently do at settlement
$80 gift basket. Relationship ends. Client lists with someone else in 7 years.

### What Tall Poppy agents do with Sanctury
1. **Before settlement** — sit down with the new homeowner, open Sanctury together, enrol the property with complete data. Takes 20 minutes. Homeowner leaves with a complete picture of their new home.

2. **3 months post-settlement** — return visit. Review the dashboard together. Answer questions. Connect with the right adviser if needed. Cements the relationship in a way no other agent in NZ offers.

3. **Annually** — Sanctury generates a property maximiser review. Agent delivers it. Stays relevant without cold calling.

4. **At sale** — the agent who enrolled them wins the listing. Near-zero acquisition cost.

**The cost:** Two visits and an hour of the agent's time.
**The return:** A warm client relationship for 7–10 years and a near-certain listing at the end of it.

---

## The Tall Poppy Deal

**The ask:** Tall Poppy takes 15–20% equity in Sanctury Limited in exchange for:
- Network deployment across all franchises within 12 months
- Co-marketing and agent onboarding support
- Franchise fee waived for founder

**What Tall Poppy gets:**
- First mover advantage — 12 months before platform opens to other agencies
- The only agent proposition in NZ that turns settlement into a 10-year relationship
- Near-zero listing acquisition cost for every enrolled homeowner
- A genuine reason to be the agent of choice for Millennial and Gen Z buyers

**What Sanctury gets:**
- Immediate distribution across Tall Poppy's national franchise network
- Settlement data at the point of purchase — the richest possible onboarding
- Credibility with other JV partners

---

## The JV Structure

- Founder: 55–60%
- Tall Poppy: 15–20%
- Insurance JV partner: 10%
- Mortgage JV partner: 10%
- Data JV partner (Relab/Cotality): 5–10%
- Option pool (team): 10%

**JV partners to approach after Tall Poppy signed:**
1. Insurance broker group — Tower, IAG, or independent broker network
2. Mortgage adviser group — Squirrel, Loan Market
3. Relab or Cotality for data partnership

---

## Integration Partners (APIs and data)

| Partner | What they provide | How Sanctury uses it |
|---------|------------------|---------------------|
| Relab | Property AVM, comparable sales | Quarterly value updates, renovation ROI |
| Cotality | Cordell build costs, property data | Insurance rebuild cost accuracy |
| LINZ | Title, land area, parcel data | Property profile enrichment |
| TradeMe Property | Listing data, market trends | Comparable sales, neighbourhood intelligence |
| realestate.co.nz | Listing data | Market context |
| Wise Move | Moving quotes | Moving marketplace |
| Builderscrack | Tradie network | Tradie marketplace |
| Addy | NZ address autocomplete | Health check and onboarding forms |
| Google Maps | Address, street view | Property visualisation |
| NZ councils | Flood maps, zoning, consents | Climate and planning risk |
| Contact/Genesis/Mercury | Energy pricing | Utilities marketplace |
| Spark/One NZ | Broadband pricing | Utilities marketplace |

---

## Climate and Risk

Every property profile includes:
- Flood zone classification (council data)
- Coastal erosion risk (NIWA/council)
- Liquefaction risk (Canterbury and Wellington specific)
- Insurance availability risk — areas where insurers are quietly withdrawing
- Climate trajectory — projected risk change over 10, 20, 30 years

This is not fearmongering. It is information homeowners deserve to have when making the biggest financial decision of their lives. Sanctury surfaces it clearly, in plain language, with context about what it means practically.

---

## The Manifesto

Sanctury exists because the people who own New Zealand's homes deserve the same quality of financial guidance that used to be available only to the wealthy.

Not advice — intelligence. Not sales — transparency. Not a platform that profits from confusion — one that profits from clarity.

We believe that when homeowners understand their options and can access the best professionals to help them act, everyone wins. The homeowners win because they make better decisions. The professionals win because they earn clients who trust them. The housing market wins because informed owners make better long-term decisions. And Sanctury wins because it built the trust that makes all of it possible.

Free for homeowners. Forever.

---

## Key Accounts and Contacts

- GitHub: github.com/ratherspicy/sanctury
- Vercel: vercel.com — project: sanctury
- Supabase: supabase.com — project: ratherspicy's Project
- Domain registrar: iwantmyname.com or 1stdomains.nz
- Addy: addy.co.nz
- Tall Poppy: jointallpoppy.com
- Relab: relab.co.nz
- NZ Privacy Commissioner: privacy.org.nz

---

## Technology Stack

- Next.js 16.2.6 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- Supabase (database + auth)
- Anthropic Claude API (insights and personalisation)
- Addy API (NZ address autocomplete)
- Recharts (data visualisations)
- Vercel (hosting)

## Environment Variables Required

```
NEXT_PUBLIC_ADDY_API_KEY=
ADDY_API_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
ANTHROPIC_API_KEY=
```
