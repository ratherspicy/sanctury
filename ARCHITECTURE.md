# Sanctury — Platform Architecture & Principles
### Version 1.0 — June 13 2026
### Status: Constitutional document. Read before building anything.

---

## PHILOSOPHY

Sanctury is built on a single foundational belief:

**The property is permanent. The person is a traveller. The relationship between them is temporary.**

Most property platforms are built around the transaction — the moment of sale. Sanctury is built around everything else: the years of ownership, the life events that happen inside the home, the way people and properties move through time independently of each other.

This means the architecture must be designed for change from the very first line of code. Not change as an edge case. Change as the normal state of affairs.

Couples separate. Families restructure. People rent out their homes, move back in, buy investment properties, inherit properties, lose properties in hard times. The platform must handle all of this gracefully — not by patching edge cases, but because the architecture was designed for it.

**Build on principles of the future, not principles of today.**

---

## THE THREE CORE ENTITIES

### 1. The PROPERTY
A permanent record that follows the building, not the people inside it.

The property exists independently of who owns or lives in it. It accumulates history across every owner, every tenant, every renovation, every certificate. When ownership transfers, the property record transfers with it — intact, complete, and enriched by every interaction it has ever had.

**The property never dies. It only changes hands.**

What belongs to the property:
- Physical data (address, legal title, floor area, year built, build quality)
- All documents (LIM, building consents, certificates, compliance records)
- Maintenance and repair history
- Infrastructure and services map (underground cables, pipes, private works)
- Improvement and renovation records
- Every ownership period (who owned it, when, what they paid)
- Tenancy history (anonymised after tenancy ends)
- Property photos from each era

### 2. The PERSON
A portable record that follows the individual through every property they ever touch.

A Person account is created once and exists for life. It is never merged with another person's account — not for couples, not for business partners, not for family members. Shared access to a property is always granted, never merged.

**The person owns their data. Always. Completely.**

What belongs to the person:
- Identity and demographics (name, contact details, family structure)
- Financial profile (income, savings, goals, risk appetite)
- All insurance policies (life, income protection, mortgage protection, TPD)
- Mortgage history across every property they have ever owned
- Goals and life aspirations
- Health check history
- Personal documents (not property-specific)
- Life journey (properties owned, rented, timing, prices)
- Relationship history with properties (role, dates, access level)

### 3. The RELATIONSHIP
The connection between a Person and a Property at a point in time.

This is the most important architectural element. The relationship is a first-class entity — not a foreign key, but a record in its own right. It has a type, a start date, an end date, a role, an access level, and a consent record.

**The relationship is the thing that changes. Not the people. Not the property.**

Relationship types:
- Owner-Occupier (owns and lives in the property)
- Landlord (owns but does not live in the property)
- Tenant (lives in but does not own the property)
- Co-owner (owns jointly, may or may not occupy)
- Executor (temporary estate management access)
- Agent (professional access — listing, management, sales)
- Property Manager (appointed by landlord, manages tenancy)

A relationship has a lifecycle:
1. Created (settlement date, tenancy start, agent listing appointment)
2. Evolves (owner-occupier becomes landlord when they move out and rent)
3. Terminates (property sold, tenancy ends, agency expires)
4. Archives (relationship closed, data attribution preserved)

---

## ACCOUNT EVOLUTION — KEY SCENARIOS

### Scenario: Couple separates or divorces
**Before:** Jane and David are both Owner-Occupiers. Two separate PERSON accounts. One PROPERTY account. Two RELATIONSHIP records linking each person to the property.

**During:** Either party can flag the relationship as "Under Legal Review." The property record remains intact. Neither party can see the other's PERSON account data — they never could. A court order can restrict one party's access to the property record via an admin override.

**After:** One party is removed from the property (RELATIONSHIP record closed with end date). The other retains full access. The removed party's PERSON account is fully intact — their financial profile, insurance, history, goals — all theirs, untouched.

**Architectural rule:** Because the accounts were never merged, there is nothing to untangle. The separation is one database operation.

### Scenario: Domestic violence or safety concern
This is the most critical scenario. A platform that holds someone's address, new mortgage, new property, and new insurance could be weaponised by an abusive partner.

**Safety Mode** must be a first-class architectural feature:
- Either party can activate silently, without notifying the other
- When activated: the activating person's location data, new address, new financial details, new property connections are completely invisible to the flagged person
- Access to the shared property record appears as anonymous co-owner
- Their new My Sanctury (new property, new location) has zero connection visible to the former partner
- Platform partnership with NZ Women's Refuge and similar organisations
- Safety Mode cannot be deactivated by the other party
- A formal process exists to deactivate (requires identity verification by the activating party only)

### Scenario: Owner-occupier becomes landlord
**Before:** Jane and David live in 14 Cameron Road. Owner-Occupier relationship.

**Transition:** They buy another property and decide to rent out Cameron Road instead of selling.

**After:** Their RELATIONSHIP record for 14 Cameron Road updates from Owner-Occupier to Landlord. A new TENANCY record is created. The property record gains a tenancy section. Tenant gets their own limited-access RELATIONSHIP record.

**What changes:** Their role and access level. Not their data. Not the property record.

### Scenario: Landlord moves back in
The tenancy ends. The TENANCY record closes. The RELATIONSHIP record updates back to Owner-Occupier. Tenant's access is revoked. The property record retains the tenancy history (anonymised after a period).

### Scenario: Multi-property portfolio
Jane owns 14 Cameron Road (rented out) and buys 22 Harbour View (lives in).

**Her PERSON account** now connects to two PROPERTY accounts through two RELATIONSHIP records. Her financial profile spans both properties. Her My Sanctury shows a portfolio view: combined equity, combined risk exposure, refix dates across all properties.

The properties remain separate records. Their histories do not merge.

### Scenario: First home → upsize (keep first as rental)
Classic NZ property ladder move. Jane and David's first home becomes an investment property. Their PERSON accounts link to both PROPERTY accounts with different roles (Landlord on the first, Owner-Occupier on the second). The platform handles this natively — no workarounds needed.

### Scenario: Death of a co-owner
David dies. His PERSON account enters an archived state. His RELATIONSHIP record for the property closes. Jane's relationship to the property continues.

David's contributions to the property record (maintenance logs, documents he uploaded) remain on the PROPERTY account — that data belongs to the house. David's personal financial data, insurance policies, and personal documents remain archived in his PERSON account, accessible only to his designated executor for estate purposes.

A designated executor role can be granted: time-limited, scoped to specific data, logged and audited.

### Scenario: Children growing up
Lily Thompson turns 18. Her data, currently held as a dependent in Jane's PERSON account, transitions to her own PERSON account. She is notified and invited to claim her record. She can choose to port it to her own account or delete it.

In a separation, children's dependent records are duplicated to both parents' accounts with a clear data ownership rule: each parent can only see and edit their own entries about the child. Neither can use the platform to access information the other parent has entered.

### Scenario: Tenancy
Tenants get a PERSON account (if they don't already have one) with a limited-access RELATIONSHIP to the property.

Tenant access level includes:
- Their tenancy details (start date, rent, bond, end date)
- Maintenance request log (they can submit, track, view resolved)
- Healthy Homes compliance status (they have a legal right to this information in NZ)
- Property safety records relevant to their occupancy

Tenant access level excludes:
- Previous owner financial data
- Owner's personal financial profile
- Full property ownership history (they can see the property exists but not the transaction history)
- The owner's identity details beyond what's legally required for the tenancy

When the tenancy ends, the tenant's RELATIONSHIP record closes. Their PERSON account persists — they can use it when they rent or buy elsewhere.

---

## DATA OWNERSHIP — THE TRANSFER PROTOCOL

### What transfers when a property is sold
Everything in the PROPERTY account:
- All documents (LIM, building consents, certificates)
- Maintenance and repair history (with tradesperson contacts)
- Infrastructure and services map
- Improvement and renovation records
- Healthy Homes compliance records
- Tenancy history (anonymised — dates and condition notes, no personal tenant data)
- Property photos
- Ownership history (dates and prices — this is public record in NZ)

### What stays with the person
Everything in the PERSON account:
- All financial data
- Insurance policies
- Mortgage history (the mortgage is closed, the history stays)
- Goals and aspirations
- Family and demographic profile
- Personal documents
- Health check history
- Anything they explicitly chose to keep private

### What is destroyed
The RELATIONSHIP record is closed (end_dated). No data is deleted — it is archived. Sanctury never destroys data; it changes access permissions.

---

## THE CONSENT FRAMEWORK

Every data-sharing event requires explicit, recorded consent. This is not a terms and conditions checkbox. It is a specific, granular, revocable consent for a specific data action.

**Principles:**
1. No data crosses between PERSON accounts without explicit consent
2. No data crosses from a PERSON account to a PROPERTY account without explicit consent
3. Consent is revocable — withdrawing consent removes access (but does not delete the data)
4. Every consent event is logged: who consented, what was shared, when, for how long
5. Agents and third parties (insurers, banks) can only access data the homeowner has explicitly shared with them
6. Consent for one purpose does not imply consent for another

**The IPP11 modal is the visible expression of this principle.** Every data collection event has a visible return. Every consent is informed.

---

## NZ-SPECIFIC CONSIDERATIONS

**Healthy Homes Standards (2019)**
Landlords have legal obligations around insulation, heating, ventilation, moisture, and draught stopping. The platform must track compliance status for any tenanted property. Tenants have a legal right to see their property's compliance status.

**EQC and earthquake risk**
NZ is seismically active. Regional earthquake risk varies significantly. The platform should surface EQC information and connect it to the Sanctury Score physical safety pillar.

**Privacy Act 2020 / NZ IPP**
All data collection and storage must comply with the NZ Privacy Act 2020 and Information Privacy Principles. Particular care around health data, financial data, and data about children.

**Leaky homes era (1988-2004)**
Properties built in this era have a statistically higher risk of weathertightness issues. This should be flagged on any property in this build era and connected to the physical safety assessment.

**Open banking / open data direction**
NZ is moving toward open banking frameworks. The platform should be architected to receive financial data feeds (mortgage data from banks, insurance data from insurers) when these become available. The data model should not require manual entry as the only pathway.

---

## FUTURE-FIRST PRINCIPLES

These are the principles that govern every architectural decision:

**1. Identity is portable**
A person's Sanctury record follows them through every property they ever touch. It gets richer over time. It never starts from scratch.

**2. Relationships are fluid**
The architecture handles Owner-Occupier, Landlord, Tenant, Co-owner, Executor, and any future role type without structural changes. Roles are data, not schema.

**3. Privacy is architecture, not compliance**
Data separation between people is enforced at the database level, not the application level. The application cannot accidentally expose one person's data to another because the architecture prevents it.

**4. Consent is granular and revocable**
Every data share is specific, recorded, and can be undone. There is no "all or nothing" data access.

**5. Safety overrides convenience**
In any conflict between usability and safety, safety wins. Safety Mode is a first-class feature, not an admin tool.

**6. The data compounds**
The longer someone is in the platform, the more valuable it becomes for them. Every maintenance record, every insurance event, every renovation plan adds to a picture that becomes irreplaceable. This is by design — not lock-in through friction, but lock-in through genuine value.

**7. Transfer-readiness**
Every piece of data is tagged at creation time as property-level or person-level. There is no ambiguity. The transfer protocol runs cleanly because the tagging was always clean.

**8. The platform is a graph**
The real architecture is a graph: People and Properties as nodes, Relationships as edges. Each edge has properties (type, dates, permissions, consent records). This is the mental model for all future development.

**9. Multi-role is normal**
The same person can be an Owner-Occupier on one property, a Landlord on another, and a future buyer browsing the marketplace simultaneously. The platform handles all roles concurrently without conflict.

**10. Open by design**
The platform should be architected to receive data from external sources (council APIs, bank feeds, insurance APIs, property valuation services) and to share data with them under consent. Sanctury is a hub, not a silo.

---

## WHAT THIS MEANS FOR THE CURRENT BUILD

The current POC uses hardcoded demo data. The Supabase schema was built fast for demo purposes and does not yet reflect this architecture. That is acceptable for the pitch — the demo shows the vision, not the implementation.

**Post-pitch Sprint 1** should be a clean schema rebuild that implements this architecture from the ground up. The PERSON and PROPERTY entities as separate tables. The RELATIONSHIP as a first-class table with type, lifecycle, and access level. The consent framework as a logs table. The safety framework as a flags table.

**Before that sprint:** Do not build any feature that creates an assumption the schema is permanent. Every current feature uses hardcoded or demo data. Keep it that way until the schema rebuild.

**The one thing to avoid:** Do not allow the frontend to build habits that merge person and property data. The "Jane & David Thompson" display on the dashboard is a UI convenience — make sure the data model underneath always treats them as two separate records.

---

*This document is the constitution for all technical decisions in Sanctury.*
*Update it when a new architectural principle is identified.*
*Never build against it.*

---

## DOCUMENT ARCHITECTURE — ADDENDUM (June 13 2026)

### The Two Document Stores

Sanctury operates two distinct document stores. Every document created or uploaded is tagged at the point of creation as one or the other. There is no ambiguity.

**PROPERTY_DOCUMENTS** — belongs to the building. Transfers on sale.
- LIM report, building consents, certificates
- Maintenance and repair records
- Infrastructure and services map records
- Improvement and renovation records
- Tenancy compliance records (Healthy Homes)
- Property photos

**PERSON_DOCUMENTS** — belongs to the individual. Travels with them forever.

| Category | Examples | Security Tier |
|---|---|---|
| Legal | Will, Enduring Power of Attorney, Trust deed, Separation agreement, Court orders | High |
| Insurance | Life policy, Income protection, Mortgage protection, Health, Contents | Standard |
| Financial | KiwiSaver, Investment statements, Tax documents, Loan agreements | High |
| Property-linked | House insurance schedule, Mortgage agreement | Standard (linked to both PERSON and PROPERTY) |
| Identity | Passport, Birth certificate | Maximum |
| Medical | Records relevant to insurance claims or care decisions | Maximum |

### The Professional Proxy Model

A new access class: Trusted Professional. A professional (lawyer, accountant, mortgage broker, insurance adviser) can be granted scoped, consented, fully audited access to upload and manage specific document categories in a homeowner's PERSON account.

Rules for proxy access:
1. Homeowner explicitly grants access to a specific professional for a specific document category
2. The professional can upload, version, and annotate within that scope only
3. The professional cannot view other document categories unless separately consented
4. Every action is logged immutably: timestamp, document name, action, professional identity
5. The homeowner sees a complete audit trail at all times
6. The homeowner can revoke access at any time
7. Documents uploaded by a professional remain in the homeowner's account after access is revoked — they belong to the homeowner

### Security Tiers

Standard: Encrypted at rest and in transit. Standard authentication.
High: Encrypted at rest and in transit. MFA required for access.
Maximum: End-to-end encrypted. Sanctury cannot read the document. MFA required. Designated access only.

### Designated Access (pre-set for life events)

Homeowners can pre-designate who gets access to which documents in which circumstances:
- Executor access on death (e.g., Jane's lawyer can access her Legal documents)
- Medical access if incapacitated (e.g., David can access Jane's Medical documents)
- Emergency access (e.g., family member can access insurance policies)

This is set up in advance, when everything is fine, so it works when it's needed.

### Professional Partner Types

| Partner | Document Access | Dashboard |
|---|---|---|
| Insurance Adviser | Insurance category | Existing partner dashboard |
| Mortgage Broker | Financial category (loan docs) | Phase 1 |
| Lawyer | Legal category | Phase 1 |
| Accountant | Financial category (tax docs) | Phase 2 |
| Financial Adviser | Financial category (investments) | Phase 2 |

### What This Means for the Build

The Property Passport vault (/my-sanctury/vault) is the current demo expression of PROPERTY_DOCUMENTS. It will evolve to show both stores clearly separated.

The PERSON_DOCUMENTS store is new. It will become the broader document hub for legal, insurance, and financial documents — accessible only to the homeowner and their explicitly granted proxies.

Never store PERSON_DOCUMENTS in the PROPERTY account. Never allow them to transfer on sale. The architecture enforces this at the database level.
