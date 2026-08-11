// src/features/production-planning/components/MachineGroup.tsx

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ProductionPlan, Equipment } from '../types/productionPlanning';
import { 
  StarOutlined, 
  Star, 
  ContentCopyOutlined, 
  DeleteOutlineOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from '@mui/icons-material';

interface MachineGroupProps {
  equipment: Equipment;
  plans: ProductionPlan[];
  isExpanded: boolean;
  onToggle: () => void;
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const MachineGroup: React.FC<MachineGroupProps> = ({
  equipment,
  plans,
  isExpanded,
  onToggle,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onDeletePlan,
}) => {
  const columnDefs = useMemo(() => [
    {
      field: 'planNumber',
      headerName: 'Plan',
      width: 120,
      cellRenderer: (params: any) => (
        <span
          className="text-[11px] font-medium cursor-pointer hover:underline text-[#2B6CB0]"
          onClick={() => onPlanClick(params.data.id)}
        >
          {params.value}
        </span>
      ),
    },
    { field: 'part.name', headerName: 'Part', width: 180, cellStyle: { fontSize: '11px' } },
    { field: 'color.name', headerName: 'Color', width: 80, cellStyle: { fontSize: '11px', color: '#8896AB' } },
    { field: 'equipment.name', headerName: 'Equipment', width: 140, cellStyle: { fontSize: '11px' } },
    { 
      field: 'plannedQuantity', 
      headerName: 'Planned qty', 
      width: 100, 
      cellStyle: { fontSize: '11px', fontWeight: 500, textAlign: 'right' },
    },
    {
      field: 'startDate',
      headerName: 'Start at',
      width: 120,
      cellRenderer: (params: any) => format(new Date(params.value), 'MMM d, HH:mm'),
      cellStyle: { fontSize: '11px', color: '#8896AB' },
    },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center gap-0.5">
          <button
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(params.data.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#D69E2E] transition-colors"
          >
            {params.data.isFavorite ? <Star className="w-3.5 h-3.5 text-[#D69E2E]" /> : <StarOutlined className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCopyPlan(params.data.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#4A5568] hover:bg-[#EDF2F7] rounded transition-colors"
          >
            <ContentCopyOutlined className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDeletePlan(params.data.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#E53E3E] hover:bg-[#FFF5F5] rounded transition-colors"
          >
            <DeleteOutlineOutlined className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    headerClass: 'text-[9px] font-semibold text-[#8896AB] uppercase tracking-[0.04em]',
    headerHeight: 28,
  }), []);

  return (
    <div className="bg-white border border-[#EDF2F7]">
      {/* Machine Header */}
      <div
        className="flex items-center justify-between px-3 cursor-pointer hover:bg-[#F7F8FA] transition-colors"
        style={{ height: '34px', borderBottom: '1px solid #EDF2F7' }}
        onClick={onToggle}
      >
        <span className="text-[13px] font-medium text-[#1A1F36]">
          {equipment.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8896AB]">{plans.length} plans</span>
          {isExpanded ? (
            <KeyboardArrowUpOutlined className="w-4 h-4 text-[#8896AB]" />
          ) : (
            <KeyboardArrowDownOutlined className="w-4 h-4 text-[#8896AB]" />
          )}
        </div>
      </div>

      {/* AG Grid Table */}
      {isExpanded && (
        <div className="ag-theme-alpine" style={{ height: `${Math.max(plans.length * 34 + 28 + 2, 60)}px`, width: '100%' }}>
          <AgGridReact
            rowData={plans}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={34}
            headerHeight={28}
            suppressRowClickSelection={true}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            rowClass="hover:bg-[#F7F8FA] transition-colors duration-150"
          />
        </div>
      )}
    </div>
  );
};