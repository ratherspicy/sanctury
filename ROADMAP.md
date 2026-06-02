# Sanctury Product Roadmap

## Live in Production
- Landing page with NZ homeowner positioning
- Three-step Home Health Check form
- NZ address autocomplete via Addy API with auto region detection
- Dollar-based loan structure calculator with auto-remainder
- Comma-formatted dollar inputs
- Insurance gap calculation with regional NZ rebuild cost rates
- House coverage visual showing insured vs gap proportion
- Mortgage strategy with loan payoff curve and timeline visualisation
- Maintenance snapshot with colour-coded property age timeline
- Email capture before report delivery
- Regulatory disclaimer throughout
- Deployed to Vercel at sanctury-five.vercel.app

## In Progress
- Insurance marketplace with live RFP flow
- Homeowner job posting pre-filled from report data
- Adviser proposal cards with selection flow
- Confirmation and next steps page

## Technical Debt

- **Persist health check data to Supabase** — Currently the report and insurance proposals pages read from sessionStorage, which means they break when navigating directly from the dashboard. The health check form data and generated report need to be saved to the `health_checks` Supabase table at submission, and loaded from there on the report and marketplace pages. This will also enable the dashboard to show real data per user instead of placeholder data. Priority: high — do before real user deployment.

## Feature Requests & Ideas

### Marketplace
- [ ] Standalone marketplace access without requiring Home Health Check
      — allow homeowners to browse and post jobs directly without 
      completing the full qualification flow first
- [ ] Mortgage adviser marketplace with RFP flow
- [ ] Energy provider comparison and switching marketplace
- [ ] Tradie and maintenance services marketplace
- [ ] Vendor subscription billing ($99–$299/month by category)
- [ ] Per-lead fee tracking and invoicing
- [ ] Vendor dashboard — manage profile, view incoming jobs, submit proposals
- [ ] Homeowner rating and review system for advisers post-engagement
- [ ] Adviser response time tracking and badges

### Agent Tools (Tall Poppy Integration)
- [ ] Agent dashboard — client portfolio view
- [ ] Automated alert feed — refix approaching, equity milestone, 
      bright-line expiry, market movement, maintenance overdue
- [ ] One-click personalised client contact generator using Claude API
- [ ] Annual property WOF report — generated for agent to deliver to client
- [ ] Neighbourhood market report — hyper-local comparable sales by street
- [ ] Settlement onboarding flow — agent inputs property data at close
- [ ] Agent referral tracking — which clients converted to marketplace leads

### Agent Intelligence Tools
- [ ] Renovation value adviser — agent shares data-backed renovation recommendations with clients before their next sale. 'In your suburb, adding a second bathroom returns 1.8x the cost on average. A pool in this price bracket typically reduces days on market but adds less than the build cost.' Agent becomes the trusted adviser on how to maximise the property before listing.
- [ ] The things agents know — a curated intelligence layer where agents share local knowledge that never appears in public data: which streets flood, which developments are coming, which body corporates are well-run, which areas are being rezoned, where the infrastructure investment is going. Structured as agent-verified local insights attached to specific suburbs.
- [ ] Pre-sale maximiser report — generated 12-18 months before a likely sale. Agent sits down with client and walks through: the three renovations most likely to add value for their specific property and price bracket, current comparable sales, optimal listing timing based on seasonal patterns, and a realistic sale price range. Turns the coffee catchup into a genuine strategic planning session.
- [ ] Suburb data dashboard for agents — everything an agent knows about their patch in one place: average days on market, auction clearance rates, price per m² trends, most common buyer profiles, seasonal volume patterns. Makes every agent conversation data-backed rather than opinion-based.

## Renovation Intelligence Tool

### Vision
Give agents a data-backed reason to meet clients annually and give homeowners genuine intelligence about how to maximise their property before sale. This turns the agent from a transactional service provider into a trusted property adviser.

### Homeowner-facing features (My Sanctury)
- [ ] Renovation Planner tool — homeowner selects a renovation type and sees estimated cost range for their region, estimated value added at sale based on comparable sales, net return percentage, and break-even holding period
- [ ] Side-by-side renovation comparison — model up to three renovations simultaneously
- [ ] Best return recommendation — AI-generated recommendation based on property type, suburb, and price bracket
- [ ] What not to do section — renovations that typically do not add value in their specific market (e.g. pools in lower price brackets, over-capitalising on kitchens)
- [ ] Renovation cost tracker — log actual renovation costs and contractors, builds a record that adds value at resale
- [ ] Before and after value modelling — shows estimated property value before and after a planned renovation

### Agent-facing features (Agent Dashboard)
- [ ] Renovation intelligence card on each client profile — top two recommended renovations for their property type and suburb before sale, estimated cost and return for each
- [ ] Optimal listing window — if client renovates in next X months and lists in Y season, comparable data suggests sale price range of A–B
- [ ] One-click Generate renovation briefing — produces a personalised one-page renovation recommendation the agent can share with the client at a coffee meeting
- [ ] Annual property maximiser review — automatically generated once per year for every client in the agent portfolio. Agent receives alert: Client X annual property review is ready — two renovation recommendations could add $Y to their sale price
- [ ] One-click coffee meeting invitation — agent sends a personalised meeting request referencing the renovation briefing

### Data sources
- [ ] Phase 1 — Manually maintained NZ renovation return lookup table: suburb x property type x renovation type = average cost, average value added, average return. Updated quarterly. Sufficient for POC and early deployment.
- [ ] Phase 2 — Relab data integration for real-time comparable sales analysis and suburb-specific renovation return data. Leverage existing Tall Poppy x Relab relationship.
- [ ] Phase 3 — Cotality Cordell cost data integration for accurate regional build cost benchmarks

### The regular contact mechanism
- [ ] Automated annual trigger — 12 months after settlement, and every 12 months thereafter, Sanctury generates a property maximiser review for every client in the agent portfolio
- [ ] Agent alert — notifies agent that the review is ready with a summary of key recommendations and estimated value uplift
- [ ] One-click briefing generation — agent produces a personalised PDF in one click
- [ ] Meeting scheduler — agent sends a coffee meeting invitation with one click, pre-populated with the client name and a warm personal message

### Why this matters strategically
The renovation intelligence tool transforms the agent from a transactional service provider into a trusted annual property adviser. An agent who arrives once a year with data-backed renovation recommendations — specific to the client's property, suburb, and price bracket — does not need to pitch for the listing. By the time the client is ready to sell, the choice of agent is already made. This tool is the most defensible agent retention mechanism in the Sanctury platform because it delivers genuine, tangible, recurring value that no other NZ real estate technology currently provides.

### NZ-specific renovation return benchmarks (to be validated with Relab data)
Initial lookup table values for Bay of Plenty region:

- Bathroom addition: cost $25,000–$45,000, typical value added $45,000–$80,000, return 1.6–1.8x
- Kitchen renovation: cost $20,000–$50,000, typical value added $25,000–$55,000, return 1.1–1.3x
- Deck addition: cost $15,000–$30,000, typical value added $15,000–$35,000, return 1.0–1.2x
- Heat pump installation: cost $3,500–$6,000, typical value added $8,000–$15,000, return 1.8–2.5x
- Solar installation: cost $12,000–$20,000, typical value added $10,000–$18,000, return 0.8–1.0x
- Exterior repaint: cost $8,000–$15,000, typical value added $15,000–$25,000, return 1.5–2.0x
- Sleepout addition: cost $50,000–$90,000, typical value added $60,000–$110,000, return 1.1–1.3x
- Pool installation: cost $60,000–$120,000, typical value added $20,000–$50,000, return 0.3–0.5x — generally not recommended
- Landscaping: cost $10,000–$25,000, typical value added $10,000–$20,000, return 0.8–1.0x
- Insulation upgrade: cost $3,000–$8,000, typical value added $8,000–$15,000, return 1.5–2.5x

### Homeowner Tools
- [ ] Google address autocomplete as alternative to Addy
- [ ] LINZ property data integration — title type, land area, parcel ID
- [ ] Relab property data integration — AVM valuation, comparable sales
- [ ] Quarterly property intelligence report — automated, AI-generated
- [ ] Bright-line tax position tracker and alert
- [ ] Equity position tracker updated with market movements
- [ ] Renovation ROI modelling tool
- [ ] Climate and flood risk assessment by property address
- [ ] Full maintenance calendar with 10-year schedule
- [ ] Maintenance job history log — builds property record over time
- [ ] First home buyer education hub — KiwiSaver, First Home Loan, 
      auction process, LIM guide
- [ ] Mortgage strategy coach — revolving credit explainer, 
      overpayment calculator, refix timing guide
- [ ] Renovation ROI tool — data-driven analysis of which renovations add value in specific NZ suburbs. What does adding a bedroom return vs cost? Does a pool add or subtract value in this market? What about a sleepout, a heat pump, a new kitchen? Powered by comparable sales data from Relab/Cotality.
- [ ] Neighbourhood intelligence feed — what is happening in my street and suburb that I don't know about? New consents lodged nearby, recent sales with prices, new developments, zoning changes, infrastructure projects. The things only agents currently know.

### Platform & Infrastructure
- [ ] Supabase database — store all form submissions and user data
- [ ] User accounts — homeowners can log back in to see their report
- [ ] Agent login and dashboard authentication
- [ ] Vendor login and profile management
- [ ] Connect sanctury.co.nz domain to Vercel
- [ ] Claude API integration — personalised AI-generated report text
- [ ] PDF report download — branded, shareable
- [ ] Email delivery of report via Resend or similar
- [ ] Referral link tracking — per adviser, per agent, per vendor
- [ ] Analytics — user journey tracking, drop-off points, conversion rates
- [ ] Mobile app (future)

### Business Model
- [ ] Vendor subscription billing infrastructure
- [ ] Per-lead fee payment processing
- [ ] Referral partner agreements — mortgage advisers
- [ ] Referral partner agreements — insurance brokers
- [ ] Referral partner agreements — energy providers
- [ ] Relab data partnership discussion
- [ ] Tall Poppy network deployment agreement
- [ ] Sanctury Limited company formation and IP ownership

## Notes
- Standalone marketplace (without Home Health Check) to be scoped 
  as a parallel entry point — same vendor and proposal infrastructure, 
  different consumer entry flow
- All financial content to maintain clear disclaimer: 
  Sanctury is not a licensed financial adviser
- Vendor data and consumer data to be strictly separated in database
- Climate risk data to be added as NZ council flood map APIs mature
