// src/features/master-data/config/columns.ts

import { MasterEntity } from './entities';
import { ColDef } from 'ag-grid-community';

export const masterColumns: Record<MasterEntity, ColDef[]> = {
  downtime: [
    { field: 'reasonCode', headerName: 'Reason Code', width: 120, editable: true },
    { field: 'reasonName', headerName: 'Reason Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
    { field: 'category', headerName: 'Category', width: 100, editable: true },
  ],
  rejection: [
    { field: 'code', headerName: 'Rejection Code', width: 120, editable: true },
    { field: 'name', headerName: 'Rejection Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
  ],
  rework: [
    { field: 'code', headerName: 'Rework Code', width: 120, editable: true },
    { field: 'name', headerName: 'Rework Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
  ],
  scrap: [
    { field: 'code', headerName: 'Scrap Code', width: 120, editable: true },
    { field: 'name', headerName: 'Scrap Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
  ],
  machine: [
    { field: 'code', headerName: 'Machine Code', width: 120, editable: true },
    { field: 'name', headerName: 'Machine Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 100, editable: true },
  ],
  mold: [
    { field: 'code', headerName: 'Mold Code', width: 120, editable: true },
    { field: 'name', headerName: 'Mold Name', width: 200, editable: true },
    { field: 'cavity', headerName: 'Cavity', width: 80, editable: true },
    { field: 'machine', headerName: 'Machine', width: 150, editable: true },
  ],
  color: [
    { field: 'code', headerName: 'Color Code', width: 120, editable: true },
    { field: 'name', headerName: 'Color Name', width: 200, editable: true },
    { field: 'hex', headerName: 'Hex Code', width: 100, editable: true },
  ],
  part: [
    { field: 'partNumber', headerName: 'Part Number', width: 120, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'customer', headerName: 'Customer', width: 150, editable: true },
    { field: 'weight', headerName: 'Weight (g)', width: 100, editable: true },
  ],
  partMatrix: [
    { field: 'part', headerName: 'Part', width: 120, editable: true },
    { field: 'machine', headerName: 'Machine', width: 150, editable: true },
    { field: 'mold', headerName: 'Mold', width: 150, editable: true },
    { field: 'cavity', headerName: 'Cavity', width: 80, editable: true },
    { field: 'cycleTime', headerName: 'Cycle Time', width: 100, editable: true },
  ],
  operator: [
    { field: 'employeeId', headerName: 'Employee ID', width: 120, editable: true },
    { field: 'name', headerName: 'Operator Name', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
    { field: 'shift', headerName: 'Shift', width: 100, editable: true },
    { field: 'status', headerName: 'Status', width: 100, editable: true },
  ],
};