// src/features/production-log/constants/columns.ts

import { ColDef } from 'ag-grid-community';
import { colors } from '@design-system/tokens/colors';
import { RejectedCellRenderer } from '../components/renderers/RejectedCellRenderer';
import { ReworkCellRenderer } from '../components/renderers/ReworkCellRenderer';
import { ScrapCellRenderer } from '../components/renderers/ScrapCellRenderer';

export const getProductionColumns = (): ColDef[] => [
  {
    field: 'plan',
    headerName: 'Plan',
    width: 100,
    cellStyle: { fontWeight: 500, color: colors.text.primary },
  },
  {
    field: 'part',
    headerName: 'Part',
    width: 180,
    cellStyle: { color: colors.text.secondary },
  },
  {
    field: 'colorName',
    headerName: 'Color Name',
    width: 100,
    cellStyle: { color: colors.text.secondary },
  },
  {
    field: 'productionStart',
    headerName: 'Production start',
    width: 120,
    cellStyle: { color: colors.text.secondary },
  },
  {
    field: 'productionEnd',
    headerName: 'Production end',
    width: 120,
    cellStyle: { color: colors.text.secondary },
  },
  {
    field: 'produced',
    headerName: 'Produced',
    width: 90,
    cellStyle: { fontWeight: 500, color: colors.text.primary, textAlign: 'right' },
  },
  {
    field: 'accepted',
    headerName: 'Accepted',
    width: 90,
    cellStyle: { fontWeight: 500, color: colors.status.accepted, textAlign: 'right' },
  },
  {
    field: 'rejected',
    headerName: 'Rejected',
    width: 90,
    cellRenderer: RejectedCellRenderer,
    cellStyle: { fontWeight: 500, color: colors.status.rejected, textAlign: 'right' },
  },
  {
    field: 'rework',
    headerName: 'Rework',
    width: 80,
    cellRenderer: ReworkCellRenderer,
    cellStyle: { color: colors.text.secondary, textAlign: 'right' },
  },
  {
    field: 'scrap',
    headerName: 'Scrap (In Kg)',
    width: 100,
    cellRenderer: ScrapCellRenderer,
    cellStyle: { color: colors.status.scrap, textAlign: 'right' },
  },
];

export const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  headerClass: 'text-[10px] text-[#6B7280] font-normal uppercase tracking-[0.05em]',
};