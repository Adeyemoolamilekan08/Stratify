// src/features/production-log/components/OperatorDropdown.tsx

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { colors } from '@design-system/tokens/colors';

interface Operator {
  id: string;
  name: string;
}

interface OperatorDropdownProps {
  value: string;
  onChange: (value: string) => void;
  operators: Operator[];
}

export const OperatorDropdown: React.FC<OperatorDropdownProps> = ({
  value,
  onChange,
  operators,
}) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filteredOperators = operators.filter((op) =>
    op.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOperator = operators.find((op) => op.id === value);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="w-[280px] h-10 px-4 pr-10 text-[13px] text-left bg-[#F3F4F6] border-0 rounded-[4px] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between">
          <span className={selectedOperator ? 'text-[#1F2937]' : 'text-[#9CA3AF]'}>
            {selectedOperator?.name || 'Select Operator'}
          </span>
          <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          className="w-[280px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg z-50 overflow-hidden"
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search operators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-[4px] focus:outline-none focus:border-[#33479A] placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {filteredOperators.map((op) => (
              <button
                key={op.id}
                onClick={() => {
                  onChange(op.id);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-[13px] text-left hover:bg-[#F3F4F6] transition-colors flex items-center gap-2"
              >
                {op.id === value && (
                  <svg className="w-4 h-4 text-[#33479A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span className={op.id === value ? 'font-medium text-[#33479A]' : 'text-[#1F2937]'}>
                  {op.name}
                </span>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};