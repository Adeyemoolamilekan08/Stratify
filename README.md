# STRATIFY 2.0

STRATIFY Planner is being evolved from the MP4-based frontend prototype into the owner's transaction-based production planning, control and inventory system.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- API: REST
- Transaction model: atomic inventory movements with immutable ledger records

## Implementation direction

The owner specifications are the functional source of truth. The MP4 is the UI/UX reference. Existing frontend work is reused where it is compatible; conflicting prototype pieces may be replaced.

## Run frontend

```bash
npm install
npm run dev
```

## Backend

This package contains the frontend only. Set `VITE_API_URL` (and `VITE_WS_URL`, if used) in your `.env` to point at wherever the backend API is hosted.

## Current architecture

Masters → BOMs → Work Orders → Material Issue → DPR → SFG → Assembly → FG Quarantine → QC → FG Store

Production rejection/lumps → Grinding → Regrind → Raw Material Store

The frontend contains the interaction layer; the Node.js backend owns authoritative business rules, inventory posting, database transactions, permissions and auditability.
