// src/features/master-data/pages/ColorPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Color Code', width: 120, editable: true },
  { field: 'name', headerName: 'Color Name', width: 200, editable: true },
  { field: 'hex', headerName: 'Hex Code', width: 120, editable: true },
];

const formFields = [
  { name: 'code', label: 'Color Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Color Name', type: 'text' as const, required: true },
  { name: 'hex', label: 'Hex Code', type: 'text' as const },
];

const ColorPage = () => {
  return (
    <MasterDataPage
      entity="colors"
      title="Colors"
      breadcrumb={['Master Data', 'Assets', 'Colors']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default ColorPage;