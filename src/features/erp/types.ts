export type ModuleKind =
  | 'work-orders' | 'boms' | 'inventory' | 'locations' | 'sfg' | 'assembly'
  | 'fg-quarantine' | 'fg-store' | 'grinding' | 'regrind' | 'production-summary'
  | 'audit' | 'approvals';

export interface ModuleRow {
  id: string;
  code: string;
  name: string;
  status: string;
  owner: string;
  quantity?: number;
  balance?: number;
  updated: string;
  meta?: string;
}
