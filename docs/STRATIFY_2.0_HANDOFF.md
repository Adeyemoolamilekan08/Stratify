# STRATIFY 2.0 — Implementation Handoff

## Authority

1. Owner's STRATIFY Planner specifications / FRS are the functional authority.
2. The supplied MP4 reference is the UI/UX and interaction reference.
3. The current project is the starting implementation and may be reused, refactored or replaced where it conflicts with the requirements.

## Target stack

- React + Vite + TypeScript + Tailwind CSS
- Node.js + Express
- PostgreSQL
- REST API

## Core transaction chain

Masters → BOMs → Work Orders → Material Issue → DPR → SFG → Assembly → FG Quarantine → QC → FG Store

Production Rejection/Lumps → Grinding → Regrind → Raw Material Store

## Frontend responsibilities

- Application shell, sidebar, header and responsive navigation
- Planning, Work Orders and monthly planning UI
- DPR / Production Log UI and workflow states
- Downtime and Live Shopfloor UI
- Master data forms and tables
- BOM editors and validation feedback
- Inventory, SFG, Assembly, FG and Grinding screens
- Reports and dashboards
- Tooltips, dialogs, filters, loading/error/empty states
- API client and API-state handling

## Backend responsibilities

- PostgreSQL schema and relationships
- BOM explosion and 100% BOM enforcement
- Work Order calculations and status transitions
- DPR authoritative validation and posting
- Inventory ledger and location balances
- Atomic internal transfers
- SFG, Assembly, FG and Grinding transactions
- Document numbering
- Roles/permissions
- Approval/rejection/return/reversal/adjustment workflow
- Audit trail
- Dashboard source queries

## Implemented in this checkpoint

- Added a Node.js backend foundation under `/backend`.
- Added PostgreSQL schema covering masters, BOMs, work orders, DPR, inventory balances, inventory transactions and audit logs.
- Added atomic inventory transfer service using database transactions and row locks.
- Added document-number sequence service.
- Added backend endpoints for work orders, component BOM approval, DPR creation/validation, inventory transfers, master reads, inventory ledger and dashboard summary.
- Added frontend API client under `src/services/stratify/api.ts`.
- Added company-oriented Work Orders, BOM, Inventory, Locations, SFG, Assembly, FG Quarantine, FG Store, Grinding, Regrind, Production Summary, Approvals and Audit pages.
- Expanded navigation around the company module structure.
- Improved the dashboard split to equal columns, strengthened typography, restored operator selection as OP01/OP02, and enlarged header controls with tooltips/account menu.

## Production deployment note

The database must be provisioned and `DATABASE_URL` supplied before the Node.js backend can operate against real company data. The frontend can run independently with mock/service data while the backend is being provisioned.
