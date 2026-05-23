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
