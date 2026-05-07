# SYNC-LAYER

**SYNC-LAYER** is a frontend-complete prototype for deterministic two-way synchronisation between Karnataka's Single Window System (SWS) and department systems.

The project imagines a practical interoperability layer for government approval workflows where business application status, department updates, attachments, remarks, and operational events must stay consistent across multiple systems without silent overwrites or untraceable data drift.

## Submission Title

**SYNC-LAYER: A Two-Way Interoperability Control Plane for Karnataka SWS and Department Systems**

## Shortlisted Idea

**Two-way synchronisation layer between the Single Window System and departmental approval systems.**

## Project Description

Businesses often submit or track approvals through a Single Window System, while the actual decisioning and status changes may happen inside department-owned systems such as Pollution Control, Factories & Boilers, Energy, Revenue, or other legacy portals. If these systems do not synchronise reliably, applicants see stale statuses, departments duplicate work, operators manually reconcile records, and there is no trustworthy audit trail for which system changed what.

SYNC-LAYER solves this by acting as an operator-facing synchronisation control plane. It uses a canonical UBID-linked model, explicit department schema maps, idempotent operation IDs, conflict detection, replay controls, connector health monitoring, and an audit ledger so every state transition can be inspected, resolved, replayed, and proven.

This prototype is not just a generic dashboard. It demonstrates the operating workflows reviewers would expect in a real government integration product:

- A command center for live sync health, propagation pressure, exceptions, and UBID-linked requests.
- A propagation desk to inspect each SWS-to-department or department-to-SWS write.
- Canonical schema maps that explain how department-specific fields are translated.
- A conflict desk for explainable field-level resolution instead of silent overwrites.
- An audit ledger for before/after values, operation IDs, actors, routes, and evidence export.
- A systems health view for connector lag, queue depth, heartbeat status, retry pressure, and route controls.
- A product guide and guided tour so reviewers can understand the prototype without external explanation.

## Why This Matters

For ease of doing business, the applicant should not need to know which backend department system currently owns the latest truth. The government operator should not need to copy-paste status updates across portals. SYNC-LAYER creates a single operational surface where every connected system can continue to exist, but the synchronisation between them becomes observable, reversible, and accountable.

## Core Problem

Single-window portals improve application intake, but many approval journeys still depend on department systems that have different:

- Data models
- Status names
- Update mechanisms
- Ownership rules
- API maturity
- Audit requirements
- Operational reliability

Without a sync layer, the failure modes are serious:

- Applicants see outdated statuses.
- Department decisions do not reflect in SWS quickly.
- SWS edits overwrite authoritative department records.
- Legacy polling or snapshot systems create delayed updates.
- Retry storms produce duplicate writes.
- Operators lack field-level visibility into conflicts.
- Audit teams cannot reconstruct the exact change chain.

## Proposed Solution

SYNC-LAYER introduces a canonical synchronisation layer centered on UBID and operation-level traceability.

The product model is:

1. Capture a change from SWS or a department system.
2. Convert the payload into a canonical schema.
3. Validate required mappings and state transitions.
4. Attach an idempotent operation ID.
5. Write to the target system through the right connector mode.
6. Detect conflicts using versions, field policy, and source priority.
7. Allow operators to resolve or replay safely.
8. Record every before/after change in the audit ledger.

## Prototype Modules

### 1. Command Center

The main operating picture for synchronisation health.

Shows:

- Total operations today
- Idempotent duplicate writes blocked
- Open conflicts
- P95 propagation time
- System health average
- Queue pressure
- UBID-linked worklist
- SWS-to-department and department-to-SWS routes
- High-priority exception filtering

### 2. Propagation Desk

A drill-down workflow for individual sync operations.

Shows:

- Operation ID
- UBID
- Business name
- Source and target systems
- Direction of sync
- Attempts
- Latency
- Timeline of each sync stage
- Canonical payload
- Source payload
- Target payload
- Search and status filters
- Replay behavior for failed or retried operations

### 3. Schema Maps

Explains how canonical fields map to department-specific schemas.

Shows:

- Department name
- Service type
- Mapping freshness
- Mapping coverage percentage
- Required vs optional fields
- SWS path
- Department path
- Transformation rule
- Translation test workflow

Example mapping:

- Canonical: `requestState`
- SWS: `application.status`
- Department: `case_status`
- Rule: state machine transition only

### 4. Conflict Desk

Prevents silent overwrites when SWS and department systems disagree.

Shows:

- UBID
- Business name
- Conflicting field
- SWS value
- Department value
- Source versions
- Resolution policy
- Recommended action
- Risk level
- Reversibility
- Operator actions such as accept recommendation, hold, or route for review

### 5. Audit Ledger

Provides provable traceability for every change.

Shows:

- Operation ID
- UBID
- Route
- Timestamp
- Actor
- Action
- Result
- Before value
- After value
- Evidence-packet workflow

### 6. Systems Health

Tracks connector reliability across systems.

Shows:

- Department system status
- Integration mode: API, webhook, polling, or snapshot
- Health score
- Lag
- Throughput
- Queue depth
- Last heartbeat
- Sync policy
- Coverage areas
- Route controls

### 7. Product Guide

Acts as an embedded reviewer and operator guide.

Includes:

- Daily operating rhythm
- New department onboarding flow
- Conflict resolution workflow
- Reliability recovery workflow
- Operational readiness checklist
- Product tour restart

## Current Prototype Data

The prototype includes realistic sample data for:

- Karnataka SWS
- Factories & Boilers
- KSPCB Consent
- HESCOM Power
- Revenue Bhoomi

Sample business cases include:

- Factory plan approval amendment
- Consent for establishment
- Power load sanction
- Boiler registration renewal
- Land conversion update

## Competitive Analysis

SYNC-LAYER sits in a known integration category, but it is intentionally narrower and more government-operation-specific than generic integration platforms.

### API Setu

API Setu is a Government of India open API platform from MeitY/NeGD for publishing, discovering, consuming, and monitoring APIs across government and enterprise ecosystems.

How SYNC-LAYER is different:

- API Setu is an API platform and directory/gateway.
- SYNC-LAYER is an operational synchronisation control plane for a specific SWS-to-department workflow.
- API Setu helps systems expose and consume APIs.
- SYNC-LAYER helps operators handle propagation, conflict resolution, replay, schema drift, idempotency, and auditability after systems are connected.
- SYNC-LAYER could use API Setu-published APIs as connectors, but it adds workflow-level consistency controls on top.

Reference: [API Setu documentation](https://docs.apisetu.gov.in/document-central/explore-apisetu/Introduction.html), [NeGD API Setu overview](https://negd.gov.in/our_projects/api-setu/)

### National Single Window System

The National Single Window System is a platform for identifying and applying for approvals across central departments and states.

How SYNC-LAYER is different:

- NSWS is an application and approval access portal for businesses.
- SYNC-LAYER is a backend/operator synchronisation layer that keeps SWS and department systems consistent.
- NSWS focuses on application guidance, intake, and approval access.
- SYNC-LAYER focuses on two-way propagation, exception handling, retries, conflict policies, schema translation, and audit evidence.

Reference: [NSWS about page](https://www.nsws.gov.in/about-us)

### MuleSoft Anypoint Platform

MuleSoft provides an enterprise platform for APIs, integrations, automation, deployment, monitoring, and API management.

How SYNC-LAYER is different:

- MuleSoft is a broad enterprise integration platform for many industries.
- SYNC-LAYER is a domain-specific product for government approval synchronisation.
- MuleSoft provides generic integration building blocks.
- SYNC-LAYER packages government-specific operating concepts: UBID truth plane, field-level department conflict policies, approval-state translation, replayable operation IDs, and audit packets.

Reference: [MuleSoft enterprise integration](https://www.mulesoft.com/platform/enterprise-integration)

### Boomi

Boomi provides an enterprise integration and automation platform with connectors, APIs, data movement, workflow automation, and governance.

How SYNC-LAYER is different:

- Boomi is a horizontal iPaaS platform.
- SYNC-LAYER is a vertical workflow product for state approval ecosystems.
- Boomi helps enterprises connect applications.
- SYNC-LAYER helps government operators decide what to do when connected approval systems disagree.
- SYNC-LAYER's differentiator is not connector count; it is operational trust: canonical UBID mapping, conflict explainability, version-aware replay, dead-letter visibility, and evidence-ready audit trails.

Reference: [Boomi Enterprise Platform](https://boomi.com/platform/), [Boomi integration overview](https://developer.boomi.com/docs/GettingStarted/Integration_overview)

### Zapier and Low-Code Automation Tools

Low-code automation platforms are useful for simple trigger-action workflows across SaaS apps.

How SYNC-LAYER is different:

- SYNC-LAYER is designed for high-accountability government workflows, not simple personal or SaaS automations.
- It supports bidirectional state consistency, conflict detection, idempotency, audit trails, queue visibility, and operator resolution.
- It assumes legacy systems, mixed connector modes, and public-sector accountability.

## Key Differentiators

Judges may ask: "Isn't this just another integration platform?"

The answer is no. SYNC-LAYER is not trying to replace broad API or iPaaS platforms. It is a purpose-built consistency layer for government approval workflows.

The most important differentiators are:

- **UBID-centered truth plane:** Every operation is attached to a business identity rather than floating as an isolated API call.
- **Two-way by design:** Handles SWS-to-department and department-to-SWS propagation.
- **Conflict-first UX:** Disagreements are surfaced at field level with policy, source versions, recommendation, risk, and reversibility.
- **Idempotent replay:** Failed writes can be replayed using the same operation ID to prevent duplicate corruption.
- **Schema governance:** Required mappings and transformation rules are visible before enabling a route.
- **Legacy-aware connectors:** Supports API, webhook, polling, and snapshot modes.
- **Operator-grade audit:** Every route, actor, payload transition, and result is preserved for evidence.
- **Department onboarding workflow:** New systems can be onboarded gradually with coverage checks and shadow-mode thinking.
- **Not just integration, but governance:** The product focuses on the operational reality after APIs exist.

## Architecture Concept

```text
SWS / Department Event
        |
        v
Connector Adapter
        |
        v
Canonical UBID Schema
        |
        v
Validation + Mapping Coverage Check
        |
        v
Idempotent Operation Registry
        |
        v
Conflict Detection + Policy Engine
        |
        v
Target System Writer / Replay Queue
        |
        v
Audit Ledger + Operator Console
```

## Suggested Real Backend Components

If converted into a production system, the prototype could be backed by:

- API gateway for SWS and department endpoints
- Connector workers for API, webhook, polling, and snapshot systems
- Canonical schema registry
- Mapping rule engine
- Idempotency store
- Message queue for retries and dead-letter handling
- Conflict policy engine
- Audit event store with immutable logs
- Role-based operator console
- Alerting and observability stack

## Tech Stack

- React
- TypeScript
- Vite
- lucide-react
- CSS modules through standard stylesheet organization

## Repository Structure

```text
sync-layer/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  src/
    App.tsx
    main.tsx
    styles.css
    types.ts
    utils.ts
    components/
      AppShell.tsx
      ProductTour.tsx
      StatusPill.tsx
    data/
      syncData.ts
    views/
      AuditLedger.tsx
      CommandCenter.tsx
      ConflictDesk.tsx
      ProductGuide.tsx
      PropagationDesk.tsx
      SchemaMaps.tsx
      SystemHealth.tsx
```

## Instructions to Run

### Prerequisites

Install Node.js 20 or later.

### Local Setup

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

If Vite chooses another port, use the URL printed in the terminal.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Then open the preview URL printed in the terminal.

## Demo Script

Use this flow for a 3 to 5 minute demo video.

### 0:00 - 0:20: Problem Setup

Say:

"This prototype addresses a common problem in single-window governance. The applicant sees one portal, but the real approval journey moves across multiple department systems. When those systems do not synchronise reliably, statuses drift, operators manually reconcile records, and audit teams cannot prove which system changed what."

Show:

- App opening on Command Center
- Product tour if it appears
- Main health metrics

### 0:20 - 0:55: Command Center

Say:

"SYNC-LAYER creates one UBID-linked operating surface for two-way synchronisation. Here we can see operations today, duplicate writes blocked through idempotency, open conflicts, propagation latency, and connected department routes."

Show:

- Metrics strip
- Topology/radar view
- UBID-linked worklist
- Exception and critical filters

### 0:55 - 1:35: Propagation Desk

Say:

"Every write has an operation ID, source, target, version, attempts, timeline, and payload. This lets an operator inspect exactly how a department update or SWS update moved through the sync layer."

Show:

- Open Propagation Desk
- Select a request
- Show timeline
- Show canonical/source/target payload sections
- Mention replay for failed or retrying operations

### 1:35 - 2:05: Schema Maps

Say:

"Department systems do not speak the same schema. SYNC-LAYER makes mappings explicit before routes are trusted. Required fields, department paths, SWS paths, and transformation rules are visible to reviewers and operators."

Show:

- Schema Maps view
- Coverage percentages
- Required fields
- Transformation rule examples

### 2:05 - 2:45: Conflict Desk

Say:

"The key differentiator is that SYNC-LAYER does not silently overwrite data. When SWS and a department disagree, the conflict is shown at field level with both values, source versions, policy, recommendation, risk, and reversibility."

Show:

- Conflict Desk
- KSPCB category conflict
- Values from SWS and department
- Recommendation and risk

### 2:45 - 3:20: Audit Ledger

Say:

"For government workflows, every change must be explainable. The audit ledger records operation ID, UBID, route, actor, action, result, and before-after values. This supports evidence packets for review, escalation, or compliance."

Show:

- Audit Ledger
- Before/after values
- Operation IDs

### 3:20 - 3:50: Systems Health

Say:

"The product also assumes real department constraints. Not every system has modern APIs, so connector modes include APIs, webhooks, polling, and snapshots. Operators can monitor lag, queue depth, heartbeat, and route health."

Show:

- Systems Health
- Revenue Bhoomi degraded status
- Queue depth and lag

### 3:50 - 4:20: Differentiation

Say:

"Unlike generic integration tools, SYNC-LAYER is built around government approval consistency. It is UBID-centered, two-way, conflict-aware, replayable, schema-governed, legacy-aware, and audit-ready. API platforms can expose endpoints; SYNC-LAYER governs whether approval data remains consistent after those endpoints are connected."

Show:

- Product Guide or Command Center again
- Readiness checklist

### 4:20 - 4:40: Closing

Say:

"The result is a practical control plane for SWS and department interoperability: faster updates for applicants, fewer manual reconciliation tasks for departments, and a trustworthy audit trail for government operations."

## Suggested PPT Outline

### Slide 1: Title

**SYNC-LAYER: Two-Way Interoperability Control Plane for Karnataka SWS**

Include:

- Team/project name
- One-line tagline: "Keeping SWS and department systems consistent, explainable, and audit-ready."
- Visual: simple SWS <-> SYNC-LAYER <-> Departments diagram

Speaker note:

"SYNC-LAYER is a prototype for reliable two-way synchronisation between the Single Window System and connected department systems."

### Slide 2: The Problem

Include:

- Single-window frontends do not remove backend fragmentation.
- Departments maintain separate systems, formats, and status workflows.
- Updates can be delayed, duplicated, overwritten, or lost.
- Operators often need manual reconciliation.
- Applicants lose trust when portal status is stale.

Speaker note:

"The user sees one window, but the government operates many systems behind it. The pain is not only integration; it is maintaining one consistent truth across those systems."

### Slide 3: Why Existing Approaches Fall Short

Include:

- Point-to-point APIs connect systems but do not solve operations.
- Manual reconciliation does not scale.
- Simple automation cannot handle version conflicts.
- Generic dashboards do not provide replay, field-level conflict resolution, and audit evidence.

Speaker note:

"The hardest part starts after the API connection works: what happens when systems disagree, a connector lags, or a retry creates duplicate writes?"

### Slide 4: Our Solution

Include:

- SYNC-LAYER as a canonical UBID-based control plane.
- Captures changes from SWS and departments.
- Validates schema mappings.
- Detects conflicts.
- Replays safely.
- Maintains audit trail.

Speaker note:

"SYNC-LAYER sits between SWS and department systems as an operational consistency layer."

### Slide 5: Product Walkthrough - Command Center

Include:

- Live sync health
- Operations today
- Duplicate writes blocked
- Open conflicts
- Propagation latency
- UBID-linked worklist

Speaker note:

"The Command Center gives the operator a live view of whether the ecosystem is consistent and where attention is needed."

### Slide 6: Product Walkthrough - Propagation Desk

Include:

- Operation timeline
- Source and target systems
- Direction
- Attempts
- Latency
- Canonical payload
- Replay logic

Speaker note:

"Every write is inspectable. An operator can trace one UBID from event capture to validation, target write, confirmation, or failure."

### Slide 7: Product Walkthrough - Schema Maps

Include:

- Canonical model
- Department field paths
- SWS field paths
- Required fields
- Transformation rules
- Mapping coverage

Speaker note:

"This prevents hidden integration assumptions. Before enabling a department route, operators can see whether required fields are mapped and how values are transformed."

### Slide 8: Product Walkthrough - Conflict Desk

Include:

- SWS value vs department value
- Field-level conflict
- Source versions
- Resolution policy
- Recommended action
- Reversibility

Speaker note:

"SYNC-LAYER does not silently overwrite records. It explains conflicts and gives an operator a reversible decision path."

### Slide 9: Product Walkthrough - Audit Ledger

Include:

- Operation ID
- UBID
- Actor
- Route
- Action
- Result
- Before/after values
- Evidence packet

Speaker note:

"Government systems need proof. The audit ledger makes every state transition reconstructable."

### Slide 10: Product Walkthrough - Systems Health

Include:

- API, webhook, polling, and snapshot connector modes
- Lag
- Throughput
- Queue depth
- Heartbeat
- Route controls

Speaker note:

"The prototype assumes real-world legacy constraints. Some departments may have APIs, others may require polling or snapshots."

### Slide 11: Architecture

Include:

```text
Source Event -> Connector -> Canonical Schema -> Validation -> Idempotency Registry -> Conflict Engine -> Target Writer -> Audit Ledger
```

Mention:

- Event capture
- Schema registry
- Queue and retry layer
- Dead-letter queue
- Audit store
- Operator console

Speaker note:

"The architecture separates integration, validation, conflict policy, replay, and audit so the system can be governed."

### Slide 12: Competitive Landscape

Include a comparison table:

| Product / Category | What It Does | Gap SYNC-LAYER Fills |
| --- | --- | --- |
| API Setu | API publishing, discovery, gateway, monitoring | Does not provide SWS-specific conflict/replay/audit operations |
| NSWS | Approval discovery and application portal | Does not act as a sync control plane between all backend systems |
| MuleSoft | Enterprise API and integration platform | Generic platform, not government approval workflow UX |
| Boomi | iPaaS integration and automation | Generic connector/workflow platform, not UBID-specific consistency layer |
| Zapier-like tools | Trigger-action automation | Not suitable for high-accountability bidirectional government state |

Speaker note:

"These products are not necessarily competitors to replace. Some could be infrastructure underneath. SYNC-LAYER differentiates at the workflow and governance layer."

### Slide 13: Differentiation

Include:

- UBID-centered truth plane
- Two-way propagation
- Field-level conflict resolution
- Idempotent operation replay
- Schema coverage governance
- Legacy connector support
- Evidence-ready audit ledger
- Operator-first design

Speaker note:

"Our edge is not generic integration. Our edge is making government approval data consistent, explainable, and safely recoverable."

### Slide 14: Impact

Include:

- Faster applicant status updates
- Reduced manual reconciliation
- Lower duplicate-write risk
- Clear department accountability
- Better audit readiness
- Easier onboarding of additional departments
- Improved trust in single-window operations

Speaker note:

"The value is operational: less manual work, fewer stale statuses, fewer hidden overwrites, and stronger evidence for every decision."

### Slide 15: Implementation Status

Include:

- Frontend-complete prototype built in React, TypeScript, and Vite.
- Includes realistic sample data for SWS and departments.
- Demonstrates core workflows end to end.
- Current version uses mocked data.
- Backend connectors are the next implementation step.

Speaker note:

"The submitted prototype is frontend-complete and designed to show the full reviewer journey. The next step is connecting real APIs and persistence."

### Slide 16: Roadmap

Include:

- Real API connector adapters
- Auth and role-based access
- Persistent audit ledger
- Schema registry backend
- Message queue and retry workers
- Department onboarding wizard
- Alerting and SLA monitoring
- Evidence packet export
- Pilot with 2-3 high-volume services

Speaker note:

"The roadmap focuses on moving from prototype to pilot without changing the core product model."

### Slide 17: Demo Flow

Include:

- Command Center
- Propagation Desk
- Schema Maps
- Conflict Desk
- Audit Ledger
- Systems Health
- Product Guide

Speaker note:

"This slide helps judges follow the live demo and understand why each module exists."

### Slide 18: Closing

Include:

- "SYNC-LAYER keeps approval data consistent across SWS and department systems."
- "Not just connected. Governed, replayable, and auditable."
- Contact/team details

Speaker note:

"The final message is that single-window success depends on backend consistency. SYNC-LAYER makes that consistency operational."

## Judge Q&A Prep

### Q: Is any company already doing this?

Broad integration companies such as MuleSoft and Boomi solve enterprise integration, and API Setu supports API publishing and consumption in India. However, SYNC-LAYER is differentiated because it is built specifically for government approval synchronisation between SWS and department systems. It includes UBID-centered workflows, field-level conflict resolution, idempotent replay, schema coverage governance, connector health, and audit evidence as first-class product concepts.

### Q: Why not just use API Setu?

API Setu can help expose, discover, and consume APIs. SYNC-LAYER governs what happens after those APIs are connected: whether updates are consistent, whether conflicts are explainable, whether retries are safe, and whether every operation is auditable.

### Q: Why not just build direct APIs between SWS and every department?

Direct APIs create point-to-point complexity. They do not automatically solve schema drift, version conflicts, duplicate writes, dead-letter queues, or audit reconstruction. SYNC-LAYER centralizes these controls.

### Q: What is the unique technical idea?

The unique idea is combining a UBID-based canonical model with operation-level idempotency, field-level conflict policy, replay queues, schema coverage checks, and audit evidence in one operator product.

### Q: What happens if a department has no API?

SYNC-LAYER supports multiple connector modes: API, webhook, polling, and snapshot. A department can start with polling or snapshot ingestion and later upgrade to API/webhook integration.

### Q: How do you avoid duplicate writes?

Each sync operation has an operation ID. Replays use the same operation ID so duplicate attempts can be recognized and blocked instead of creating multiple inconsistent writes.

### Q: How do you decide which system wins during conflict?

The system uses policy by field and department. Examples include source priority, field-level merge, last-write-wins, or manual review. The operator sees the policy, source versions, recommendation, risk, and reversibility before deciding.

### Q: Is this production-ready?

This submission is a frontend-complete prototype. It demonstrates the product workflows, information architecture, and operating model. Production readiness would require real connectors, authentication, persistent storage, audit immutability, security review, and pilot integration with selected departments.

### Q: What makes this valuable for Karnataka?

It can reduce manual reconciliation between SWS and departments, improve applicant trust in status updates, create stronger audit trails, and make it easier to onboard more department systems without losing operational control.

## Source Code Upload Guidance

Upload a zip of the repository source code excluding:

- `node_modules/`
- `dist/`
- `.git/`
- `.vercel/`
- local environment files such as `.env.local`

Recommended upload name:

```text
sync-layer-source.zip
```

## Custom Attachment Suggestions

Recommended additional attachment:

```text
SYNC-LAYER Pitch Deck.pdf
```

Optional additional attachments:

- Demo video file or unlisted demo video link
- Architecture diagram PDF
- One-page product brief
- Screenshots from the prototype

## Future Enhancements

- Backend connector service
- Real SWS and department sandbox integrations
- PostgreSQL audit/event store
- Queue-backed retry orchestration
- Dead-letter queue management
- Role-based access for operators, department admins, and auditors
- Evidence packet PDF generation
- Configurable conflict policies
- Department onboarding wizard
- SLA alerts and escalation workflows
- Security, privacy, and compliance hardening

## License

Prototype submission for evaluation/demo purposes.
