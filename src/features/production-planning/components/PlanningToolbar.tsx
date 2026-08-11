import React, { useState } from 'react';

interface PlanningToolbarProps {
  onRefresh: () => void;
  onFiltersToggle: () => void;
}

const PlanningToolbar: React.FC<PlanningToolbarProps> = ({ onRefresh, onFiltersToggle }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] text-[#7C8798]">Planning Toolbar</span>
      <button 
        onClick={onRefresh}
        className="px-3 py-1 text-[12px] text-[#3B82C4] hover:text-[#2F6FA3] hover:bg-[#EBF2F9] rounded-[2px] transition-colors"
      >
        Refresh
      </button>
      <button 
        onClick={onFiltersToggle}
        className="px-3 py-1 text-[12px] text-[#3B82C4] hover:text-[#2F6FA3] hover:bg-[#EBF2F9] rounded-[2px] transition-colors"
      >
        Filters
      </button>
    </div>
  );
};

export default PlanningToolbar;
