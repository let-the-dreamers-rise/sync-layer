# SYNC-LAYER

SYNC-LAYER is a frontend-complete product prototype for two-way interoperability between Karnataka's Single Window System and department systems.

The prototype includes:

- Command Center for sync health and UBID-linked exception monitoring
- Propagation Desk with searchable operation timelines and idempotent replay flow
- Schema Maps for canonical-to-department translation checks
- Conflict Desk for explainable field-level resolution
- Audit Ledger with evidence-packet workflow
- Systems Health for connector lag, queues, and route controls
- Product Guide and first-load guided tour

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app is built with React, TypeScript, Vite, and lucide-react.
