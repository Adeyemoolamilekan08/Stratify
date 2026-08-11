// src/features/master-data/pages/PartMatrixPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'part', headerName: 'Part', width: 120, editable: true },
  { field: 'machine', headerName: 'Machine', width: 150, editable: true },
  { field: 'mold', headerName: 'Mold', width: 150, editable: true },
  { field: 'cavity', headerName: 'Cavity', width: 80, editable: true },
  { field: 'cycleTime', headerName: 'Cycle Time (s)', width: 100, editable: true },
];

const formFields = [
  { name: 'part', label: 'Part', type: 'text' as const, required: true },
  { name: 'machine', label: 'Machine', type: 'text' as const, required: true },
  { name: 'mold', label: 'Mold', type: 'text' as const, required: true },
  { name: 'cavity', label: 'Cavity', type: 'number' as const, required: true },
  { name: 'cycleTime', label: 'Cycle Time (s)', type: 'number' as const, required: true },
];

const PartMatrixPage = () => {
  return (
    <MasterDataPage
      entity="part-matrix"
      title="Part Matrix"
      breadcrumb={['Master Data', 'Assets', 'Part Matrix']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default PartMatrixPage;