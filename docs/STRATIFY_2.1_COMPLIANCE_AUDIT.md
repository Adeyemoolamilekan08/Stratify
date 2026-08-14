# STRATIFY PLANNER 2.1 — Owner FRS Compliance Audit

**Authority:** the two company PDFs uploaded on 14 August 2026.

- `STRATIFY_PLANNER_Production_Planning_Control_System_Specification(1).pdf` — 14 pages.
- `STRATIFY_PLANNER_Developer_Functional_Requirements_Specification(1)(1).pdf` — 13 pages, confidential developer handoff dated 13 August 2026.

## Verdict

The previous **STRATIFY 2.0 checkpoint did NOT cover the owner's requirements completely**.

It had the correct direction and a useful Node.js/PostgreSQL foundation, but several pages were UI scaffolds backed by mock rows, and the backend only implemented a small subset of the required transaction lifecycle.

This checkpoint upgrades the project to **STRATIFY 2.1 Compliance Foundation**. It closes several structural gaps, but it is still not a claim of production certification. Remaining work is listed below.

## Owner requirements vs implementation

| Requirement | Previous 2.0 | 2.1 checkpoint | Status |
|---|---|---|---|
| Integrated transaction architecture | Partial | Strengthened | FOUNDATION READY |
| Master data model | Partial | Expanded with category/finished-product mappings and CRUD foundation | PARTIAL |
| Component BOM + 100% validation | Partial | Backend approval validation retained | PARTIAL |
| BOM version/effective dates/process loss | Partial | Schema expanded | FOUNDATION READY |
| Assembly BOM / complete-set logic | Partial | Schema + backend assembly validation foundation | PARTIAL |
| Work Order creation | Partial | BOM explosion/material requirement generation added | PARTIAL |
| Machine allocation | Schema only | Schema retained; allocation UI/business validation still needs completion | MISSING/PARTIAL |
| RM receipt | Missing | Backend posting endpoint added | FOUNDATION READY |
| RM issue against WO balance | Partial | Backend WO-balance + stock checks added | FOUNDATION READY |
| RM return | Missing | Ledger model exists; dedicated return UI/route still required | PARTIAL |
| DPR formulas | Partial | Backend validation/formula path strengthened | FOUNDATION READY |
| DPR Draft → Submitted → Approved/Rejected/Returned | Partial | Backend status endpoints added | FOUNDATION READY |
| DPR approval posting into production/SFG | Missing | SFG receipt endpoint added; automatic approval-to-SFG orchestration still required | PARTIAL |
| Downtime repeating rows/reasons | Partial | Dedicated downtime table added | PARTIAL |
| Production WO summary + ETA | Partial | Data model exists; full source-derived summary query/UI still required | PARTIAL |
| Location-based inventory | Partial | Location balances + atomic transfer engine retained | FOUNDATION READY |
| SFG store | UI scaffold | Receive/transfer backend foundation added | PARTIAL |
| Assembly General + Online Assembly | UI scaffold | Assembly consumption + FG quarantine creation foundation added | PARTIAL |
| FG Quarantine lifecycle | UI scaffold | QC status/release endpoint added | PARTIAL |
| FG Store release control | Missing | Release transfer now uses quarantine → FG Store transaction | FOUNDATION READY |
| Grinding input/output/loss/regrind | Missing/Mock | Grinding receipt/process/return endpoints added | PARTIAL |
| Duplicate waste prevention | Missing | Source DPR duplicate receipt check added | FOUNDATION READY |
| Roles & permissions | UI constants only | Roles/permissions schema + seed foundation added | PARTIAL |
| Approvals | UI scaffold | Approval action/audit foundation added | PARTIAL |
| Reversal/adjustment | Missing | Authorized adjustment endpoint foundation added | PARTIAL |
| Audit trail | Schema only | Audit writes added to core workflows | PARTIAL |
| Document numbering | Foundation | Expanded transaction code usage | FOUNDATION READY |
| Management drill-down | Partial | Dashboard endpoints started; complete drill-down still required | PARTIAL |
| Inventory health | UI concept | Health endpoint foundation added | PARTIAL |
| Dashboard derived from posted transactions | Partial | Source queries strengthened | PARTIAL |
| Future extensibility | Good | Preserved | READY |

## What the PDFs make non-negotiable

The company explicitly says modules must not behave as independent forms. Work Orders, production reports, inventory ledger, locations, BOMs and dashboards must be one connected transaction system. fileciteturn28file8L421-L438

The 14-page specification also requires stock to be location-based and transaction-based, with posted movements traceable by document code, user, date/time, source, destination and reference. fileciteturn28file9L449-L464

The FRS defines Draft, Submit, Post/Approve, Reverse/Adjust and permanent document-code behavior. fileciteturn27file1L24-L32

The FRS requires the development order to be Masters → BOMs → Work Orders → RM Store → DPR → WO Summary → SFG → Assembly → FG → Grinding → dashboards. fileciteturn28file7L383-L407

## Remaining implementation gates before calling this production-ready

1. Complete all Master CRUD screens and connect them to Node.js.
2. Build real Component BOM and Assembly BOM editors, including version/effective-date lifecycle.
3. Complete Work Order explosion, department WO output, machine allocation validation and printable documents.
4. Complete RM receipt, issue, return and adjustment screens.
5. Make DPR approval automatically post approved component production into SFG, with source references.
6. Build the complete SFG ledger and transfer/return workflows.
7. Complete Assembly consumption so every FG creation consumes the exact Assembly BOM quantities.
8. Complete FG Quarantine statuses and QC release/hold/rework/reject workflows.
9. Complete Grinding lifecycle from DPR-linked waste receipt through regrind return to RM.
10. Implement real authentication, role enforcement and permission middleware; frontend visibility alone is insufficient.
11. Implement reversal/adjustment as linked transactions without deleting posted history.
12. Replace remaining mock module data with API-backed data and transaction forms.
13. Complete dashboard formulas, loss analysis, drill-down and inventory health rules from posted transactions.
14. Add automated backend integration tests for the critical validations and atomic transaction rules.
15. Provision PostgreSQL and run migrations/seed against a real environment before deployment.

## Important conclusion

The project should **not be thrown away**. The existing MP4-derived frontend is valuable as the UI/UX foundation, and the owner specifications now provide the functional authority. The correct approach is to keep the visual/interaction work that matches the MP4 and refactor the business modules so that every displayed figure and every transaction comes from the Node.js/PostgreSQL transaction engine.
