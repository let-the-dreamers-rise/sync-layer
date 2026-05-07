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
