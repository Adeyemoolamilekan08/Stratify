// src/features/master-data/components/MasterGrid.tsx

import React, { useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { cn } from '@utils/cn';

interface MasterGridProps {
  columnDefs: any[];
  rowData: any[];
  onRowSelected?: (rows: any[]) => void;
  onRowDoubleClick?: (row: any) => void;
  loading?: boolean;
  onCellValueChanged?: (event: any) => void;
}

export const MasterGrid: React.FC<MasterGridProps> = ({
  columnDefs,
  rowData,
  onRowSelected,
  onRowDoubleClick,
  loading = false,
  onCellValueChanged,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  }), []);

  const onSelectionChanged = () => {
    if (gridRef.current) {
      const selected = gridRef.current.api.getSelectedRows();
      onRowSelected?.(selected);
    }
  };

  return (
    <div className={cn(
      "ag-theme-alpine w-full h-[500px] border border-[#E5E7EB] rounded-[4px] overflow-hidden",
      loading && "opacity-50 pointer-events-none"
    )}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onSelectionChanged={onSelectionChanged}
        onRowDoubleClicked={(event) => onRowDoubleClick?.(event.data)}
        onCellValueChanged={onCellValueChanged}
        pagination={true}
        paginationPageSize={20}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        suppressCellFocus={false}
        theme={{
          headerBackgroundColor: '#F8F9FC',
          headerTextColor: '#6B7280',
          headerFontSize: 11,
          headerFontWeight: 600,
          rowTextColor: '#1F2937',
          rowFontSize: 13,
          borderColor: '#E5E7EB',
          cellHorizontalPadding: 12,
          cellVerticalPadding: 8,
        }}
      />
    </div>
  );
};