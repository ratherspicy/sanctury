# Sanctury — Product Roadmap
### Last updated: June 13 2026
### Read ARCHITECTURE.md before building any feature on this roadmap.

---

## PITCH SPRINT — Days remaining to Tall Poppy (~11 days)

### Completed
- [x] Home Health Check (5 steps) + report
- [x] Insurance marketplace with adviser proposals
- [x] Agent dashboard — alerts, client list, message generator
- [x] Partner/adviser dashboard — leads, proposals, won jobs
- [x] Property Passport vault — documents, maintenance log
- [x] My Sanctury — Property Command Centre redesign
- [x] Homeowner finances, maintenance pages
- [x] Public + personalised marketplace
- [x] Homeowner profile with family structure
- [x] Full QA sweep — all routes verified
- [x] Jane Thompson data reconciled across all surfaces
- [x] Privacy policy, About page, middleware fix

### In progress / immediate
- [ ] Dashboard layout fixes (Sanctury Score rename, names prominent, address smaller, pets)
- [ ] Agent "Create Property Record" demo flow
- [ ] Claude API — personalised report intro (Day 7)
- [ ] Resend email — report delivery (Day 8)
- [ ] Report page polish (Day 9)
- [ ] sanctury.co.nz DNS (Day 10 — manual)
- [ ] Pre-pitch QA sweep (Days 11–12)
- [ ] Demo data consistency check (Day 13)
- [ ] Demo rehearsals + fixes (Days 14–16)
- [ ] Final prep (Day 17)

---

## PHASE 1 — Core Product (Months 1–3)
*Goal: A product real people can use. Schema rebuild. Pre-revenue.*

### Architecture — Schema Rebuild (Sprint 1, non-negotiable)
Implement ARCHITECTURE.md from scratch:
- PROPERTIES table (permanent property records)
- PERSONS table (portable individual records — never merged)
- RELATIONSHIPS table (Person↔Property, typed, lifecycled, access-levelled)
- PROPERTY_DOCUMENTS table (belongs to property, transfers on sale)
- PERSON_DOCUMENTS table (belongs to person, travels with them)
- CONSENT_LOG table (every data share event recorded)
- SAFETY_FLAGS table (Safety Mode, separation flags, legal restrictions)
- TENANCY_RECORDS table (tenant relationships, Healthy Homes compliance)
- PROPERTY_HISTORY table (ownership periods, prices, agents)
- RLS enabled on all tables from day one

### Sanctury Score — Full 5 Pillars
- Physical Safety (mould, warmth, electrical, structural, plumbing)
- Financial Protection (life, income protection, mortgage protection, TPD)
- Documentation (vault completeness, certificate currency, expiry alerts)
- Mortgage Health (LVR, refix timing, overpayment potential)
- Future Planning (maintenance schedule, renovation plan, equity goal)
One number. Five sub-scores. Updates when the homeowner takes action.

### Life & Income Protection Transparency
The insurance system is opaque. Sanctury makes it visible:
- Plain-English process timeline (getting income protection takes 8–16 weeks — here's every step)
- Exclusion explainer before signing — what actually won't be covered
- Policy Passport: life, income protection, mortgage protection, TPD in one place
- Coverage gap calculator: if you can't work for 3/6/12 months, what happens to your mortgage?
- "If the worst happened tomorrow" simulation — specific to this mortgage, this income, this family
- Claims preparation checklist — built before you ever need it

### Physical Safety Layer
A home is a sanctuary when it's safe to live in. Five cards, each with a status:
- Structural health (building era risks, earthquake zone, last inspection)
- Mould & damp (NZ housing health crisis — Healthy Homes compliance)
- Warmth & insulation (insulation rating, heat pump service record)
- Electrical safety (switchboard age, last CoC, open items)
- Plumbing (pipe material era, hot water cylinder age, last service)
Leaky homes era flag (1988–2004) surfaced automatically on affected properties.

### Home Services Map
The gap nobody has solved — private underground infrastructure:
- Two-layer overhead plan: council layer (from LIM) + homeowner layer (private works)
- Record EV charger cable routes, pool conduit, gate wiring, drainage additions
- Each record: contractor, date, scope, certificate reference, depth, route
- "What's under here?" tool before any digging
- Transfers completely on sale — new owner inherits full infrastructure picture
- Dial Before You Dig integration for public layer

### Landlord & Tenancy Mode
Property evolves from Owner-Occupier to Landlord without losing history:
- Role toggle: "I'm renting this property out"
- Tenancy record creation: tenant details, start date, rent, bond
- Tenant invitation and limited-access portal
- Healthy Homes compliance tracker (NZ landlord legal obligation)
- Maintenance request flow: tenant submits, landlord sees, tradesperson assigned
- Tenancy history preserved on property record (anonymised post-tenancy)

### Account Separation & Safety Framework
- Safety Mode (domestic violence protection — silent activation, zero data leakage)
- Separation flow (one database operation — accounts were never merged)
- Court order / legal restriction admin override
- Executor access (time-limited, scoped, audited)
- Child data transition at age 18

### Real Authentication & Persistence
- Remove magic-link-only access
- Persistent sessions with proper management
- Two onboarding paths: "Agent handed over my property" vs "Check my home"
- Real data entry replacing all hardcoded demo data

### Real Document Upload
- Property Passport file upload (currently static)
- Supabase storage with RLS
- Document expiry tracking and alerts
- Category tagging: Legal / Insurance / Mortgage / Maintenance / Improvements

### Personal Document Safe
The PERSON account becomes a secure, organized repository for all life documents:
- Legal (will, EPA, trust, court orders, separation agreements)
- Insurance (life, income protection, health, contents)
- Financial (KiwiSaver, investments, tax, loan agreements)
- Identity (passport, birth certificate — maximum security tier)
- Medical (insurance-relevant records)
Each category has: upload, version control, expiry alerts, designated access pre-setting, audit log.

### Professional Proxy Access
New partner type: Trusted Professional
- Lawyers: upload will, EPA, trust, conveyancing documents, settlement records
- Mortgage brokers: upload loan agreements, refix documents
- Insurance advisers: upload policies, claims records (already partly built in partner dashboard)
- Future: accountants, financial advisers
Proxy access model: scoped to specific document categories, explicit homeowner consent, fully audited, revocable at any time, every action logged.

### Designated Access for Life Events
Homeowners pre-designate who gets access to what, in which circumstances:
- Executor access on death
- Medical access if incapacitated
- Emergency access for family
Set up when everything is fine. Works when it's needed.

### Lawyer Partner Dashboard
New partner type alongside existing insurance adviser and mortgage broker dashboards:
- Client list (homeowners who have granted legal document access)
- Upload interface for will, EPA, trust, conveyancing documents
- Document versioning (when a will is updated, old version archived not deleted)
- Status tracking: draft / final / superseded / under review
- Expiry and review alerts (e.g., EPA may need renewal after major life change)
- Full audit log visible to both lawyer and homeowner

---

## PHASE 2 — Intelligence Layer (Months 3–6)
*Goal: Sanctury becomes indispensable. Marketplace revenue begins.*

### AI Renovation Planning
- Select renovation type → AI generates photorealistic renders
- Estimated regional cost (Tauranga 2026 builder rates)
- Estimated value add by suburb
- Equity impact before/after
- Marketplace connection: architects, builders, designers
- Agent notification trigger: "Jane has started a renovation plan"

### Equity Tracker
- Property value tracking over time
- Suburb comparison data
- Renovation impact modelling
- Milestone alerts triggering agent re-engagement
- Portfolio equity view (for multi-property owners)

### Portfolio View (Multi-Property)
- Homeowners with multiple properties see all in one dashboard
- Combined equity, combined risk, combined refix calendar
- Role clarity: which properties are owner-occupied, which are rented

### Mortgage Marketplace — Full
- Refix comparison tool
- Refinance calculator
- AI-matched adviser recommendations with explicit reasoning
- KiwiSaver integration advice

### Marketplace — Full Category Build
- Trades: plumbers, electricians, builders, roofers, painters, flooring
- Home Systems: heat pumps, solar, security, insulation, home automation
- Services: movers, cleaners, lawn & garden, pest control
- Property: valuers, building inspectors, surveyors
- Lifestyle: power & gas comparison, internet, water filtration
- All with AI reasoning ("Because your home was built in 1998...")

### Agent Post-Sale Engagement Platform
- Agent sees homeowner equity milestones
- Agent sees renovation plans (with homeowner consent)
- Agent sees refix windows as listing signals
- Relationship maintained without cold calling
- Renovation marketplace commissions for agent referrals

---

## PHASE 3 — Platform & Data (Months 6–12)
*Goal: Sanctury becomes the data layer for NZ property. B2B revenue begins.*

### Data Moat — Aggregated & Anonymised Intelligence
Every interaction builds a dataset nobody else has:
- LIM corpus → council risk patterns by region
- Insurance schedules → underinsurance spread nationally
- Home Services Map → private infrastructure patterns by suburb
- Renovation plans → regional demand signals for trades and materials
- Physical safety assessments → NZ housing stock quality data
- Tenancy records → rental market health by suburb

### Open Data Integrations
- Council API connections (LIM data, rates, zoning)
- Bank feeds (mortgage data with consent — open banking ready)
- Insurance API connections (policy data with consent)
- Property valuation APIs (CoreLogic, QV)
- Dial Before You Dig integration

### B2B Data API
- Anonymised risk profiling for insurers
- Property quality signals for bank lending decisions
- Renovation demand intelligence for builders and material suppliers
- Regional housing health data for councils

### Tradie & Energy Marketplaces
- Tradie directory with Sanctury-verified reviews
- Energy comparison with property-specific solar ROI calculator

### PDF Report Download
- Branded Sanctury report, shareable with advisers and banks

---

## PHASE 4 — The Long Game (Year 2+)
*Goal: Sanctury is the operating system for NZ homeownership.*

### Sanctury for Renters
- Tenant-facing tools: Healthy Homes rights, maintenance requests
- Rent payment tracking
- First home buyer pathway: savings tracker, deposit milestone, suburb targeting
- Transition: renter → first home buyer, with full history intact

### Sanctury for New Builds
- Developer uploads complete property record at completion
- Homeowner inherits everything before they move in
- No drawer of documents — it's all in the platform from day one
- Builder liability records attached to the property permanently

### National Property Intelligence Platform
- First national record of private residential infrastructure in NZ
- Regional housing health mapping
- Underinsurance spread by suburb, era, and build quality
- The dataset that no competitor is building

### International Expansion
- Australia first (same regulatory environment, same housing pain points)
- UK (leasehold complexity creates acute document management need)

---

## DESIGN PRINCIPLES (NEVER COMPROMISE)

1. **The property is permanent. The person is a traveller.**
2. **Every question has a visible return.** Ask because we help.
3. **Relationships are fluid.** The architecture handles life, not just the happy path.
4. **Safety overrides convenience.** Always.
5. **Plain English always.** No jargon, no hidden complexity.
6. **Mobile first.** Every screen earns its place at 390px.
7. **Transfers on sale.** Property data compounds. Personal data travels.
8. **Build on principles of the future, not principles of today.**

---

## THE PITCH LINE (Act 5 — vision)

"Phase 1 connects your home to its documents. Phase 2 connects your advisers
to your account. Your lawyer uploads your will directly. Your mortgage broker
uploads your loan documents. Your insurance adviser uploads your policies.
When something happens — and life always happens — the people who need access
have it, because you set that up years ago when everything was fine."

---

*This roadmap is a living document. Update after every major session and every strategic conversation.*
