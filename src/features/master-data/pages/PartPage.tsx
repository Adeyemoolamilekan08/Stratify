// src/features/master-data/pages/PartPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'partNumber', headerName: 'Part Number', width: 120, editable: true },
  { field: 'description', headerName: 'Description', width: 200, editable: true },
  { field: 'customer', headerName: 'Customer', width: 150, editable: true },
  { field: 'weight', headerName: 'Weight (g)', width: 100, editable: true },
  { field: 'material', headerName: 'Material', width: 120, editable: true },
];

const formFields = [
  { name: 'partNumber', label: 'Part Number', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'text' as const, required: true },
  { name: 'customer', label: 'Customer', type: 'text' as const },
  { name: 'weight', label: 'Weight (g)', type: 'number' as const },
  { name: 'material', label: 'Material', type: 'text' as const },
];

const PartPage = () => {
  return (
    <MasterDataPage
      entity="parts"
      title="Parts"
      breadcrumb={['Master Data', 'Assets', 'Parts']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default PartPage;