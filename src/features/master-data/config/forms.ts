// src/features/master-data/config/forms.ts

import { MasterEntity } from './entities';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  options?: { value: string; label: string }[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
}

export const masterForms: Record<MasterEntity, FormField[]> = {
  downtime: [
    { name: 'reasonCode', label: 'Reason Code', type: 'text', required: true, maxLength: 10 },
    { name: 'reasonName', label: 'Reason Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
  ],
  rejection: [
    { name: 'code', label: 'Rejection Code', type: 'text', required: true, maxLength: 10 },
    { name: 'name', label: 'Rejection Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
  ],
  rework: [
    { name: 'code', label: 'Rework Code', type: 'text', required: true, maxLength: 10 },
    { name: 'name', label: 'Rework Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
  ],
  scrap: [
    { name: 'code', label: 'Scrap Code', type: 'text', required: true, maxLength: 10 },
    { name: 'name', label: 'Scrap Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
  ],
  machine: [
    { name: 'code', label: 'Machine Code', type: 'text', required: true, maxLength: 20 },
    { name: 'name', label: 'Machine Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'maintenance', label: 'Maintenance' },
    ]},
  ],
  mold: [
    { name: 'code', label: 'Mold Code', type: 'text', required: true, maxLength: 20 },
    { name: 'name', label: 'Mold Name', type: 'text', required: true, maxLength: 100 },
    { name: 'cavity', label: 'Cavity', type: 'number', required: true, min: 1, max: 999 },
    { name: 'machine', label: 'Machine', type: 'text' },
  ],
  color: [
    { name: 'code', label: 'Color Code', type: 'text', required: true, maxLength: 10 },
    { name: 'name', label: 'Color Name', type: 'text', required: true, maxLength: 50 },
    { name: 'hex', label: 'Hex Code', type: 'text', pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ },
  ],
  part: [
    { name: 'partNumber', label: 'Part Number', type: 'text', required: true, maxLength: 30 },
    { name: 'description', label: 'Description', type: 'text', required: true, maxLength: 200 },
    { name: 'customer', label: 'Customer', type: 'text' },
    { name: 'weight', label: 'Weight (g)', type: 'number', min: 0 },
  ],
  partMatrix: [
    { name: 'part', label: 'Part', type: 'text', required: true },
    { name: 'machine', label: 'Machine', type: 'text', required: true },
    { name: 'mold', label: 'Mold', type: 'text', required: true },
    { name: 'cavity', label: 'Cavity', type: 'number', required: true, min: 1 },
    { name: 'cycleTime', label: 'Cycle Time (s)', type: 'number', required: true, min: 0 },
  ],
  operator: [
    { name: 'employeeId', label: 'Employee ID', type: 'text', required: true, maxLength: 20 },
    { name: 'name', label: 'Operator Name', type: 'text', required: true, maxLength: 100 },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'shift', label: 'Shift', type: 'select', options: [
      { value: 'shift1', label: 'Shift 1' },
      { value: 'shift2', label: 'Shift 2' },
      { value: 'shift3', label: 'Shift 3' },
    ]},
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'on-leave', label: 'On Leave' },
    ]},
  ],
};