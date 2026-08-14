import type { ModuleKind, ModuleRow } from './types';

const rows: Record<ModuleKind, ModuleRow[]> = {
  'work-orders': [
    { id: 'wo1', code: 'WO-2026-000184', name: 'JUG SET — Monthly Demand', status: 'RELEASED', owner: 'Production Planning', quantity: 12000, balance: 4820, updated: 'Today 08:15', meta: 'Injection · High priority' },
    { id: 'wo2', code: 'WO-2026-000185', name: 'CHAIR — Component Production', status: 'IN_PRODUCTION', owner: 'Injection', quantity: 8500, balance: 3260, updated: 'Today 07:42', meta: 'Machine M-04' },
    { id: 'wo3', code: 'WO-2026-000179', name: 'TRAY — Assembly Requirement', status: 'PARTIALLY_COMPLETED', owner: 'Blow', quantity: 5000, balance: 950, updated: 'Yesterday 18:10', meta: 'ETA 1.2 days' },
  ],
  boms: [
    { id: 'bom1', code: 'CBOM-JUG-01', name: 'JUG Component BOM v1', status: 'APPROVED', owner: 'Engineering', updated: 'Aug 13', meta: '100% composition' },
    { id: 'bom2', code: 'ABOM-JUGSET-01', name: 'JUG SET Assembly BOM v1', status: 'APPROVED', owner: 'Assembly', updated: 'Aug 13', meta: '5 components' },
    { id: 'bom3', code: 'CBOM-CHAIR-02', name: 'CHAIR Component BOM v2', status: 'DRAFT', owner: 'Engineering', updated: 'Aug 12', meta: 'Pending 100% validation' },
  ],
  inventory: [
    { id: 'inv1', code: 'RM-PP-001', name: 'Polypropylene Natural', status: 'HEALTHY', owner: 'RM-MAIN', quantity: 8420, balance: 8420, updated: 'Today 08:00', meta: 'KG · 18.4 days cover' },
    { id: 'inv2', code: 'RM-MB-002', name: 'Masterbatch Blue', status: 'WATCH', owner: 'RM-MAIN', quantity: 960, balance: 960, updated: 'Today 08:00', meta: 'KG · 9.2 days cover' },
    { id: 'inv3', code: 'SFG-JUG-01', name: 'Jug Component', status: 'HEALTHY', owner: 'SFG-MAIN', quantity: 1480, balance: 1480, updated: 'Today 07:50', meta: 'PCS' },
  ],
  locations: [
    { id: 'loc1', code: 'RM-MAIN', name: 'Raw Material Store', status: 'ACTIVE', owner: 'Stores', updated: 'Today', meta: 'RAW_MATERIAL' },
    { id: 'loc2', code: 'SFG-MAIN', name: 'SFG Main', status: 'ACTIVE', owner: 'SFG Store', updated: 'Today', meta: 'SFG' },
    { id: 'loc3', code: 'FG-QA', name: 'FG Quarantine', status: 'ACTIVE', owner: 'QC', updated: 'Today', meta: 'FG_QUARANTINE' },
    { id: 'loc4', code: 'FG-STORE', name: 'FG Store', status: 'ACTIVE', owner: 'FG Store', updated: 'Today', meta: 'FINISHED_GOODS' },
  ],
  sfg: [
    { id: 'sfg1', code: 'SFG-RCV-2026-00192', name: 'Jug Components Receipt', status: 'POSTED', owner: 'Production', quantity: 1200, balance: 1200, updated: 'Today 07:51', meta: 'SFG-MAIN' },
    { id: 'sfg2', code: 'SFG-TRF-2026-00118', name: 'Jug → Assembly General', status: 'POSTED', owner: 'SFG Store', quantity: 400, balance: 800, updated: 'Today 07:40', meta: 'Atomic transfer' },
  ],
  assembly: [
    { id: 'asy1', code: 'ASY-2026-00044', name: 'JUG SET Assembly', status: 'POSTED', owner: 'Assembly Supervisor', quantity: 100, updated: 'Today 07:35', meta: 'FG Quarantine created' },
    { id: 'asy2', code: 'ASY-2026-00045', name: 'CHAIR Assembly', status: 'DRAFT', owner: 'Assembly Supervisor', quantity: 25, updated: 'Today 07:20', meta: 'Awaiting stock confirmation' },
  ],
  'fg-quarantine': [
    { id: 'fgq1', code: 'ASY-2026-00044', name: 'JUG SET — 100 sets', status: 'PENDING_INSPECTION', owner: 'QC', quantity: 100, updated: 'Today 07:35', meta: 'Awaiting inspection' },
    { id: 'fgq2', code: 'ASY-2026-00040', name: 'CHAIR — 60 pcs', status: 'QC_ACCEPTED', owner: 'QC', quantity: 60, updated: 'Today 06:20', meta: 'Ready for release' },
  ],
  'fg-store': [
    { id: 'fg1', code: 'FG-RCV-2026-00071', name: 'JUG SET', status: 'RELEASED', owner: 'FG Store', quantity: 420, updated: 'Today 06:25', meta: 'FG-STORE' },
  ],
  grinding: [
    { id: 'grd1', code: 'GRD-IN-2026-00029', name: 'DPR Rejection / Lumps', status: 'RECEIVED', owner: 'Grinding', quantity: 86, updated: 'Today 07:10', meta: 'KG input' },
    { id: 'grd2', code: 'GRD-IN-2026-00028', name: 'Chair Rejection', status: 'PROCESSED', owner: 'Grinding', quantity: 54, updated: 'Yesterday 16:45', meta: '100% traced to DPR' },
  ],
  regrind: [
    { id: 'rg1', code: 'GRD-OUT-2026-00017', name: 'PP Natural Regrind', status: 'RETURNED_TO_RM', owner: 'Grinding', quantity: 72, updated: 'Today 07:18', meta: 'RM-MAIN' },
  ],
  'production-summary': [
    { id: 'ps1', code: 'WO-2026-000184', name: 'JUG SET — Component Summary', status: 'IN_PROGRESS', owner: 'Production', quantity: 12000, balance: 4820, updated: 'Today', meta: '60% complete' },
  ],
  audit: [
    { id: 'au1', code: 'AUD-000091', name: 'Material Issue posted', status: 'POSTED', owner: 'RM Store Officer', updated: 'Today 08:03', meta: 'MIN-2026-00211' },
  ],
  approvals: [
    { id: 'ap1', code: 'DPR-2026-00123', name: 'Daily Production Report', status: 'SUBMITTED', owner: 'Production Supervisor', updated: 'Today 08:12', meta: 'Awaiting approval' },
  ],
};

export function getRows(kind: ModuleKind) { return rows[kind] ?? []; }
