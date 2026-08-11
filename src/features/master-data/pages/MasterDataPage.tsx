// src/features/master-data/pages/MasterDataPage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { MasterToolbar } from '../components/MasterToolbar';
import { MasterGrid } from '../components/MasterGrid';
import { MasterFormDialog } from '../components/MasterFormDialog';
import { MasterBreadcrumb } from '../components/MasterBreadcrumb';

// Temporary service - will be replaced with real API
const masterDataService = {
  get: async (entity: string) => {
    // Mock data for testing
    return [
      { id: '1', code: 'RED', name: 'Red', hex: '#FF0000' },
      { id: '2', code: 'BLUE', name: 'Blue', hex: '#0000FF' },
    ];
  },
  create: async (entity: string, data: any) => {
    console.log('Create:', entity, data);
    return { ...data, id: Date.now().toString() };
  },
  update: async (entity: string, id: string, data: any) => {
    console.log('Update:', entity, id, data);
    return { ...data, id };
  },
  delete: async (entity: string, id: string) => {
    console.log('Delete:', entity, id);
  },
  bulkDelete: async (entity: string, ids: string[]) => {
    console.log('Bulk Delete:', entity, ids);
  },
  exportData: async (entity: string) => {
    console.log('Export:', entity);
    return new Blob(['id,name\n1,Test'], { type: 'text/csv' });
  },
  importData: async (entity: string, file: File) => {
    console.log('Import:', entity, file);
  },
  downloadSample: async (entity: string) => {
    console.log('Download Sample:', entity);
    return new Blob(['id,name\n1,Sample'], { type: 'text/csv' });
  },
};

interface ColumnDef {
  field: string;
  headerName: string;
  width?: number;
  editable?: boolean;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface MasterDataPageProps {
  entity: string;
  title: string;
  breadcrumb: string[];
  columns: ColumnDef[];
  formFields: FormField[];
}

const MasterDataPage: React.FC<MasterDataPageProps> = ({
  entity,
  title,
  breadcrumb,
  columns,
  formFields,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await masterDataService.get(entity);
      setData(result);
    } catch (error) {
      console.error(`Error loading ${entity}:`, error);
    } finally {
      setLoading(false);
    }
  }, [entity]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = () => {
    setEditingRow(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;
    
    const ids = selectedRows.map(row => row.id);
    try {
      await masterDataService.bulkDelete(entity, ids);
      await loadData();
      setSelectedRows([]);
    } catch (error) {
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingRow) {
        await masterDataService.update(entity, editingRow.id, formData);
      } else {
        await masterDataService.create(entity, formData);
      }
      await loadData();
      setIsDialogOpen(false);
      setEditingRow(null);
    } catch (error) {
      console.error(`Error saving ${entity}:`, error);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await masterDataService.exportData(entity);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${entity}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error exporting ${entity}:`, error);
    }
  };

  const handleImport = async (file: File) => {
    try {
      await masterDataService.importData(entity, file);
      await loadData();
    } catch (error) {
      console.error(`Error importing ${entity}:`, error);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const blob = await masterDataService.downloadSample(entity);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${entity}-sample.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading sample:`, error);
    }
  };

  return (
    <div>
      <MasterBreadcrumb items={breadcrumb} />
      
      <h2 className="text-[15px] font-semibold text-[#1F2937] mb-4">{title}</h2>
      
      <MasterToolbar
        onAdd={handleAdd}
        onRefresh={loadData}
        onExport={handleExport}
        onDownloadCSV={handleDownloadCSV}
        onImport={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) handleImport(file);
          };
          input.click();
        }}
        onDelete={selectedRows.length > 0 ? handleDelete : undefined}
        selectedCount={selectedRows.length}
        canDelete={true}
        canCreate={true}
        canExport={true}
        canImport={true}
      />
      
      <MasterGrid
        columnDefs={columns}
        rowData={data}
        loading={loading}
        onRowSelected={setSelectedRows}
        onRowDoubleClick={handleEdit}
      />
      
      <MasterFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingRow(null);
        }}
        onSave={handleSave}
        title={editingRow ? `Edit ${title}` : `Add ${title}`}
        fields={formFields}
        initialData={editingRow || {}}
        isLoading={loading}
      />
    </div>
  );
};

// ✅ Default export for lazy loading
export default MasterDataPage;