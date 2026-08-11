// src/features/master-data/pages/MoldPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Mold Code', width: 120, editable: true },
  { field: 'name', headerName: 'Mold Name', width: 200, editable: true },
  { field: 'cavity', headerName: 'Cavity', width: 80, editable: true },
  { field: 'machine', headerName: 'Machine', width: 150, editable: true },
  { field: 'status', headerName: 'Status', width: 100, editable: true },
];

const formFields = [
  { name: 'code', label: 'Mold Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Mold Name', type: 'text' as const, required: true },
  { name: 'cavity', label: 'Cavity', type: 'number' as const, required: true },
  { name: 'machine', label: 'Machine', type: 'text' as const },
  { name: 'status', label: 'Status', type: 'select' as const, options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Maintenance' },
  ]},
];

const MoldPage = () => {
  return (
    <MasterDataPage
      entity="molds"
      title="Molds"
      breadcrumb={['Master Data', 'Assets', 'Molds']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default MoldPage;