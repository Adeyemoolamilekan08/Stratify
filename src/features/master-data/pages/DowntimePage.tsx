// src/features/master-data/pages/DowntimePage.tsx

import React from 'react';
import MasterDataPage from './MasterDataPage';

const columns = [
  { field: 'reasonCode', headerName: 'Reason Code', width: 120, editable: true },
  { field: 'reasonName', headerName: 'Reason Name', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 150, editable: true },
  { field: 'category', headerName: 'Category', width: 100, editable: true },
];

const formFields = [
  { name: 'reasonCode', label: 'Reason Code', type: 'text' as const, required: true },
  { name: 'reasonName', label: 'Reason Name', type: 'text' as const, required: true },
  { name: 'department', label: 'Department', type: 'text' as const },
  { name: 'category', label: 'Category', type: 'text' as const },
];

const DowntimePage = () => {
  return (
    <MasterDataPage
      entity="downtime"
      title="Downtime Reasons"
      breadcrumb={['Master Data', 'Reasons', 'Downtime Reasons']}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default DowntimePage;