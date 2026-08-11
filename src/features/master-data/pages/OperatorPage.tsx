// src/features/master-data/pages/OperatorPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'employeeId', headerName: 'Employee ID', width: 120, editable: true },
  { field: 'name', headerName: 'Operator Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
  { field: 'shift', headerName: 'Shift', width: 100, editable: true },
  { field: 'status', headerName: 'Status', width: 100, editable: true },
];

const formFields = [
  { name: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
  { name: 'name', label: 'Operator Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
  { name: 'shift', label: 'Shift', type: 'select' as const, options: [
    { value: 'shift1', label: 'Shift 1' },
    { value: 'shift2', label: 'Shift 2' },
    { value: 'shift3', label: 'Shift 3' },
  ]},
  { name: 'status', label: 'Status', type: 'select' as const, options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
  ]},
];

const OperatorPage = () => {
  return (
    <MasterDataPage
      entity="operators"
      title="Operators"
      breadcrumb={['Master Data', 'People', 'Operators']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default OperatorPage;