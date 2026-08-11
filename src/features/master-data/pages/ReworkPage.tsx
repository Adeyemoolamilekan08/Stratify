// src/features/master-data/pages/ReworkPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Rework Code', width: 120, editable: true },
  { field: 'name', headerName: 'Rework Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
];

const formFields = [
  { name: 'code', label: 'Rework Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Rework Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
];

const ReworkPage = () => {
  return (
    <MasterDataPage
      entity="rework"
      title="Rework Reasons"
      breadcrumb={['Master Data', 'Reasons', 'Rework Reasons']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default ReworkPage;