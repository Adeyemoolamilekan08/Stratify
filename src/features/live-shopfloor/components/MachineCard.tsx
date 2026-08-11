import { cn } from '@utils/cn';
import { MachineStatus } from '../types/live-shopfloor.types';

interface MachineCardProps {
  machine: MachineStatus;
}

const statusConfig = {
  operational: { label: 'Operational', color: 'bg-[#31B86A]' },
  stopped: { label: 'Stopped', color: 'bg-[#EF5350]' },
  idle: { label: 'Idle', color: 'bg-[#F4A62A]' },
  down: { label: 'Down', color: 'bg-[#9CA3AF]' },
};

export const MachineCard = ({ machine }: MachineCardProps) => {
  const status = statusConfig[machine.status] || statusConfig.idle;

  return (
    <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Machine Name and Status */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[14px] font-semibold text-[#1F2937]">
          {machine.name}
        </h3>
        <span className={cn(
          "px-2 py-0.5 text-[10px] font-medium rounded-full text-white",
          status.color
        )}>
          {status.label}
        </span>
      </div>

      {/* Product/Details */}
      {machine.product && (
        <div className="text-[11px] text-[#6B7280] mb-2">
          {machine.product}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-1 text-[11px]">
        {machine.availability !== undefined && (
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Availability</span>
            <span className="font-medium text-[#1F2937]">
              {machine.availability}%
            </span>
          </div>
        )}
        {machine.performance !== undefined && (
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Performance</span>
            <span className="font-medium text-[#1F2937]">
              {machine.performance}%
            </span>
          </div>
        )}
        {machine.quality !== undefined && (
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Quality</span>
            <span className="font-medium text-[#1F2937]">
              {machine.quality}%
            </span>
          </div>
        )}
        {machine.oee !== undefined && (
          <div className="flex justify-between">
            <span className="text-[#6B7280]">OEE</span>
            <span className="font-medium text-[#1F2937]">
              {machine.oee}%
            </span>
          </div>
        )}
      </div>

      {/* Down Info */}
      {machine.downSince && (
        <div className="text-[10px] text-[#EF5350] mt-1">
          Down since {machine.downSince}
        </div>
      )}
      {machine.downReason && (
        <div className="text-[10px] text-[#6B7280]">
          Reason: {machine.downReason}
        </div>
      )}

      {/* Last Update */}
      <div className="text-[10px] text-[#9CA3AF] mt-2 flex items-center gap-1">
        <span>📍</span>
        Last update {machine.lastUpdate}
      </div>
    </div>
  );
};