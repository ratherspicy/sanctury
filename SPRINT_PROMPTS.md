# Sanctury — Sprint Prompts: Pitch Build
### Run in order. One session at a time. Review live URL after each.

---

## PROMPT C — Dashboard Layout Fixes
*Run: Now. ~15 min session.*

Read CLAUDE.md. Do not change demo seed data. Do not touch /check, /report, /agent/dashboard, /partners/dashboard, /marketplace/insurance.

Five targeted changes to /my-sanctury only:

1. HERO ADDRESS — smaller
Reduce "14 Cameron Road, Tauranga" heading to ~60% current size. 
The address is a label, not a headline. Add small property stat chips 
directly below it: "262m²  ·  Built 1998  ·  Above Standard  ·  Bay of Plenty"
Style: text-sm, white/70 opacity. Above the agent handover line.

2. PROFILE SECTION — prominent, move above thumbnails
Move the profile bar (Jane & David Thompson) ABOVE the 4 photo thumbnails.
Increase names to text-2xl or text-3xl font-bold.
The homeowners' names are the emotional anchor of this page.
Keep photos, "Owner-occupiers since March 2024", family summary.

3. PETS — add Archie to household section
After Sam Thompson, before Emergency contact:
  Archie · Golden Retriever · 3 years
Use a paw print icon instead of a person icon.

4. RENAME — "Home Health Score" → "Sanctury Score" everywhere
Run: grep -r "home health score" --include="*.tsx" -i
Run: grep -r "Home Health Score" --include="*.tsx"
Replace every user-facing instance. TypeScript variable names can stay.

5. INFORMATION ORDER — verify sequence
1. Hero (smaller address + stat chips)
2. Profile bar PROMINENT (above thumbnails)
3. 4 photo thumbnails
4. Sanctury Score card
5. Priority action cards
6. Navigation tiles
7. Your Household (with Archie)
8. Property details strip

After: tsc --noEmit · check 390px mobile · git add -A && git commit -m "fix: Sanctury Score rename, prominent names, pets, address size" && git push · report all files changed.

---

## PROMPT D — Agent Property Record Creation Demo
*Run: After Prompt C is live and reviewed. ~45 min session.*

Read CLAUDE.md. Do not change demo seed data or break existing routes.

Build a new demo flow showing how an agent creates a property record 
before handing it to a homeowner. This completes the pitch story — 
it answers "how does the data get in there?"

NEW ROUTE: /agent/dashboard/properties/new

This page is accessed from the agent dashboard. Add a button or card 
to the agent dashboard: "Create Property Record" or "Prepare Handover" 
in sea green, linking to this route.

THE PAGE — a clean, multi-step form in the agent sea green theme:

STEP 1 — Property Search
- Addy address autocomplete (same component as /check)
- Pre-fill with "14 Cameron Road, Tauranga" for the demo
- Property details auto-populate: floor area, year built, build quality
- "Confirm property" button

STEP 2 — Sale Details
- Settlement date: 15 March 2024 (date picker, pre-filled for demo)
- Sale price: $1,285,000 (pre-filled for demo)
- Previous owner occupied: 14 years (dropdown: <2 years / 2-5 years / 5-10 years / 10+ years)
- Agent name: Mark Williams (pre-filled)
- Agency: Tall Poppy Real Estate (pre-filled)

STEP 3 — Upload Property Documents
Four upload zones, each with a label, a document type icon, and 
an "Uploaded ✅" state for the demo (pre-filled, not real uploads):
- LIM Report (pre-filled: "LIM Report 2024.pdf" ✅)
- Building Consent (pre-filled: "Building Consent 1998.pdf" ✅)
- Electrical Certificate (pre-filled: "Electrical CoC 2019.pdf" ✅)
- Property Photos (pre-filled: "8 photos uploaded ✅")
Add a "+ Add document" option below (non-functional, just UI)

STEP 4 — Invite New Owner
- Email input field
- Pre-fill with: jane.thompson@example.com for the demo
- A preview card showing what Jane will receive:
  "You're invited to claim your property record for
   14 Cameron Road, Tauranga
   Prepared by Mark Williams · Tall Poppy Real Estate
   Settlement 15 March 2024 · $1,285,000
   [Claim your property record →]"
- "Send invite" button (non-functional — just shows a success state)

STEP 5 — Confirmation screen
Clean success state:
- "Property record created ✅"
- "Invitation sent to jane.thompson@example.com"
- Summary: property address, documents uploaded count, sale details
- "Return to dashboard" link → /agent/dashboard
- A subtle note: "Jane will inherit this complete property record 
  including all documents, the maintenance history, and the 
  infrastructure map when she accepts the invitation."

DESIGN: Use the agent sea green gradient header and colour system. 
Clean, professional, minimal. Step indicator at the top showing 
which step the agent is on (1 of 5, 2 of 5, etc.)

After: tsc --noEmit · check 390px mobile · git add -A && git commit -m "feat: agent property record creation demo flow" && git push · report route URL and any issues.

---

## PROMPT E — Claude API + Report Polish
*Run: Day 7. Add ANTHROPIC_API_KEY to Vercel BEFORE running this prompt.*

Read CLAUDE.md. Do not change demo seed data or break existing routes.

TWO TASKS:

TASK 1 — Connect Anthropic Claude API for personalised report intro

Create a server action that generates a personalised 2-3 sentence 
introduction for the report page using the Claude API.

The server action receives: property address, floor area, year built, 
insurance gap amount, refix date.

The prompt to Claude (claude-sonnet-4-6, max_tokens 150):
"Write a warm, direct 2-3 sentence introduction for a property health 
report. Property: [address], built [year], [floor area]m². Key findings: 
$[gap] insurance gap, mortgage refix in [days] days. Tone: like a 
trusted friend who understands property finance. Plain English. 
No jargon. Start with the homeowner's situation, not with Sanctury."

If the API call fails (network, key not set, any error), fall back to 
this template: "Based on your property details, we've identified two 
areas that need your attention before they become costly problems. 
Your insurance coverage and your approaching mortgage refix both have 
clear, actionable paths forward."

Display the generated intro at the top of the report page, above the 
first section. Style: slightly larger than body text, purple accent 
left border, warm background (#EEEDF8).

TASK 2 — Report page polish

The insurance gap needs to be more prominent on the report page:
- The $163,290 gap figure should be the largest, most visible number 
  on the report page after the page loads
- Use danger red #DC2626 for the gap amount
- Add a brief one-line context below it: 
  "The difference between your cover ($900,000) and your rebuild cost 
  ($1,063,290) — at today's construction rates."
- The "Review your sum insured →" CTA should be a filled purple button, 
  not a text link

After: tsc --noEmit · check 390px · git commit -m "feat: Claude API personalised report intro, report page polish" && git push · report live URL and confirm the intro is rendering (or fallback if API not connected).

---

## PROMPT F — Resend Email Integration
*Run: Day 8. Add RESEND_API_KEY to Vercel BEFORE running this prompt.*

Read CLAUDE.md. Do not change demo seed data.

Connect Resend to send the "Your report is ready" email after Step 4 
of the health check form (when the homeowner enters their name and email).

EMAIL SPEC:
- From: hello@sanctury.co.nz (or the Resend default if domain not verified)
- Subject: "Your Sanctury report is ready, [first name]"
- Body (plain, clean, Sanctury purple brand):

  Header: Sanctury logo + wordmark

  "Hi [first name],

  Your home health report for [address] is ready.

  Here's what we found:
  • Insurance gap: $163,290 underinsured
  • Mortgage refix: [days] days away
  • [One more finding from the health check]

  [View your full report →] (purple CTA button)

  This link is your secure access to My Sanctury — 
  bookmark it for future visits.

  Mark Williams and the Sanctury team"

  Footer: Unsubscribe · Privacy policy · sanctury.co.nz

If Resend fails (key not set, API error), the form should still 
complete normally and show the report. Email is best-effort. 
Log the failure but do not block the user.

After: tsc --noEmit · git commit -m "feat: Resend email report delivery" && git push · note that live email testing needs a real email address.

---

## PROMPT G — Agent Dashboard + Final Pre-Pitch Polish
*Run: Day 9. After Prompts E and F are live.*

Read CLAUDE.md. Do not change demo seed data.

THREE TASKS:

TASK 1 — Agent dashboard language update
Find "Pre-build profile" language in the agent dashboard and replace 
with "Settlement meeting prep" or "Pre-settlement meeting" — language 
that reflects the agent's actual workflow before a homeowner moves in.

Run: grep -r "pre-build\|Pre-build\|prebuild" --include="*.tsx"
Update any instances found to reflect settlement meeting context.

TASK 2 — Sanctury Score physical safety teaser
On /my-sanctury, below the existing Sanctury Score card, add a new 
"Physical Safety" section. This is a teaser of Phase 1 features — 
UI only, no functionality.

Five status cards in a row (2 columns on mobile):
- Structural: ⚠️ "Last inspection unknown"
- Mould & damp: ⚠️ "No damp assessment on file"  
- Warmth: ⚠️ "Heat pump service unknown"
- Electrical: ⚠️ "CoC from 2019 — 7 years ago"
- Plumbing: ⚠️ "Pipe material unknown for 1998 build"

Each card: amber (#D97706) left border, small icon, one-line status, 
"Assess →" link (non-functional). Section header: "Physical Safety" 
with a small "Coming soon" pill in grey.

This section makes the Sanctury Score story visible in the demo and 
seeds the Phase 1 vision without requiring full functionality.

TASK 3 — Marketplace "For You" reasoning check
On /my-sanctury/marketplace, verify all six "For You Right Now" cards 
are rendering correctly with their explicit reasoning lines. 
If any are missing the reasoning text, restore it from the prompt spec.
Check at 390px mobile — cards should scroll horizontally cleanly.

After: tsc --noEmit · check all changes at 390px · git commit -m "feat: settlement meeting language, physical safety teaser, marketplace check" && git push · report all changes.

---

## PROMPT H — Pre-Pitch QA Sweep
*Run: Days 11-12. After DNS is connected if possible, otherwise on sanctury-five.vercel.app.*

Read CLAUDE.md.

Full QA sweep of every route before the pitch. Systematic check of:

HOMEOWNER JOURNEY (critical path):
1. / landing page — full scroll, hero, stats bar, feature sections
2. /check — all 5 steps, complete the form with seed data
3. /report — every section: gap amount prominent, payoff curve, maintenance timeline
4. /marketplace/insurance — proposals, "Review your sum insured"
5. /marketplace/insurance/confirmed — confirmation page
6. /marketplace — public hub, all categories visible

AUTHENTICATED HOMEOWNER (flag for manual check):
7. /my-sanctury — all sections, Sanctury Score, profile names prominent, Archie present
8. /my-sanctury/finances — equity, LVR, mortgage, insurance gap
9. /my-sanctury/maintenance — plumbing card, upcoming items
10. /my-sanctury/marketplace — "For You Right Now" cards with reasoning
11. /my-sanctury/vault — documents, maintenance log, Property Passport

AGENT JOURNEY:
12. /agents — landing page full scroll
13. /agent/dashboard — client list, red row visible, colour rules correct
14. /agent/dashboard/clients/[id] — client profile
15. /agent/dashboard/properties/new — all 5 steps of property creation

PARTNER JOURNEY:
16. /partners — landing page
17. /partners/dashboard — leads, Jane Thompson data correct
18. /partners/dashboard/leads/jane — gap $163,290, cover $900,000, rebuild $1,063,290

CONTENT AND DATA:
19. All Jane Thompson numbers consistent across every surface
20. No "Home Health Score" remaining anywhere — must be "Sanctury Score"
21. No placeholder text anywhere
22. No broken images
23. No JSX space-eating bugs in rendered text
24. All three marketplace quote amounts above $1,063,290

MOBILE:
25. All Priority 1 routes at 390px — no layout breaks

FIX EVERYTHING FOUND. Do not leave any issue for later.

After: tsc --noEmit · git commit -m "fix: pre-pitch QA sweep — [list major fixes]" && git push · provide full report: every issue found, every fix made, anything requiring manual auth check.

---

*These are all the prompts needed to reach pitch day.*
*Run in order. Review the live URL after each session.*
*Days 13-17: manual — demo rehearsals, DNS, final prep.*
