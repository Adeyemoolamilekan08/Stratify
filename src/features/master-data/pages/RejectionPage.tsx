// src/features/master-data/pages/RejectionPage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'code', headerName: 'Rejection Code', width: 120, editable: true },
  { field: 'name', headerName: 'Rejection Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
];

const formFields = [
  { name: 'code', label: 'Rejection Code', type: 'text' as const, required: true },
  { name: 'name', label: 'Rejection Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
];

const RejectionPage = () => {
  return (
    <MasterDataPage
      entity="rejection"
      title="Rejection Reasons"
      breadcrumb={['Master Data', 'Reasons', 'Rejection Reasons']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default RejectionPage;