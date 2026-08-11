// src/features/master-data/pages/ScrapPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Scrap Code', width: 120, editable: true },
  { field: 'name', headerName: 'Scrap Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
];

const formFields = [
  { name: 'code', label: 'Scrap Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Scrap Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
];

const ScrapPage = () => {
  return (
    <MasterDataPage
      entity="scrap"
      title="Scrap Reasons"
      breadcrumb={['Master Data', 'Reasons', 'Scrap Reasons']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default ScrapPage;