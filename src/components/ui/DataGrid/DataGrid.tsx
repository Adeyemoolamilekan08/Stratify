import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { 
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CellStyleModule, // ✅ ADD THIS
} from 'ag-grid-community';
import { 
  PaginationModule,
} from 'ag-grid-enterprise';

// Register modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CellStyleModule, // ✅ ADD THIS
  PaginationModule,
]);

interface DataGridProps<T = any> {
  data: T[];
  columns: ColDef[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  height?: number | string;
  className?: string;
  onRowClick?: (data: T) => void;
  onCellValueChanged?: (params: any) => void;
  rowSelection?: 'single' | 'multiple';
  gridOptions?: GridOptions;
  exportable?: boolean;
}

export const DataGrid = ({
  data,
  columns,
  loading = false,
  pagination = true,
  pageSize = 50,
  height = 500,
  className,
  onRowClick,
  onCellValueChanged,
  rowSelection,
  gridOptions = {},
  exportable = false,
}: DataGridProps) => {
  const [gridApi, setGridApi] = useState<any>(null);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    minWidth: 80,
    flex: 1,
  }), []);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onRowClicked = (params: any) => {
    if (onRowClick) {
      onRowClick(params.data);
    }
  };

  const exportData = () => {
    if (gridApi) {
      const csv = gridApi.getDataAsCsv();
      if (csv) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'export.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <div className="space-y-2">
      {exportable && gridApi && (
        <div className="flex justify-end">
          <button
            onClick={exportData}
            className="px-3 py-1 text-[11px] text-[#6B7280] border border-[#E5E7EB] rounded-[8px] hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
        </div>
      )}
      
      <div className={className}>
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          onCellValueChanged={onCellValueChanged}
          rowSelection={rowSelection}
          pagination={pagination}
          paginationPageSize={pageSize}
          loading={loading}
          style={{ height: typeof height === 'number' ? height : height }}
          animateRows={true}
          theme={themeQuartz}
          {...gridOptions}
        />
      </div>
    </div>
  );
};