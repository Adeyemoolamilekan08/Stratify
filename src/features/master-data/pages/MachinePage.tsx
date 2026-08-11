// src/features/master-data/pages/MachinePage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Machine Code', width: 120, editable: true },
  { field: 'name', headerName: 'Machine Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
  { field: 'status', headerName: 'Status', width: 100, editable: true },
];

const formFields = [
  { name: 'code', label: 'Machine Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Machine Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
  { name: 'status', label: 'Status', type: 'select' as const, options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Maintenance' },
  ]},
];

const MachinePage = () => {
  return (
    <MasterDataPage
      entity="machines"
      title="Machines"
      breadcrumb={['Master Data', 'Assets', 'Machines']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default MachinePage;