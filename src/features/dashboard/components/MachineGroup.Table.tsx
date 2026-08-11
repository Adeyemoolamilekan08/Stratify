import { cn } from '@utils/cn';
import { formatNumber } from '@utils/format';

interface MachineCardProps {
  machine: {
    id: string;
    name: string;
    status: 'running' | 'idle' | 'offline' | 'maintenance' | 'setup';
    operator: string;
    currentProduct: string;
    progress: { current: number; target: number };
    efficiency: number;
    oee?: number;
    shift?: string;
  };
  onExpand?: () => void;
}

const statusConfig = {
  running: { label: 'Running', color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  idle: { label: 'Idle', color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  offline: { label: 'Offline', color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
  maintenance: { label: 'Maintenance', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
  setup: { label: 'Setup', color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
};

export const MachineCard = ({ machine, onExpand }: MachineCardProps) => {
  const status = statusConfig[machine.status] || statusConfig.idle;
  const progressPercentage = Math.min((machine.progress.current / machine.progress.target) * 100, 100);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded p-4 hover:border-gray-300 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{machine.name}</h3>
          <p className="text-xs text-gray-500">Operator: {machine.operator}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex items-center space-x-1.5">
            <span className={cn("w-2 h-2 rounded-full", status.color)}></span>
            <span className={cn("text-xs font-medium", status.text)}>{status.label}</span>
          </div>
          {machine.shift && (
            <span className="text-xs text-gray-400">{machine.shift}</span>
          )}
        </div>
      </div>

      {/* Product */}
      <div className="mb-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Product</span>
          <span className="font-medium text-gray-900">{machine.currentProduct}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-900">
            {formatNumber(machine.progress.current)} / {formatNumber(machine.progress.target)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-1.5 rounded-full transition-all duration-500 bg-[#3B82F6]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E7EB]">
        <div>
          <p className="text-xs text-gray-500">Efficiency</p>
          <p className={cn(
            "text-base font-medium",
            machine.efficiency >= 90 ? "text-green-600" :
            machine.efficiency >= 75 ? "text-yellow-600" :
            "text-red-600"
          )}>
            {machine.efficiency}%
          </p>
        </div>
        {machine.oee !== undefined && (
          <div>
            <p className="text-xs text-gray-500">OEE</p>
            <p className="text-base font-medium text-gray-900">{machine.oee}%</p>
          </div>
        )}
        <div className="col-span-2 mt-1">
          <button
            onClick={onExpand}
            className="w-full text-xs text-[#3B82F6] hover:text-blue-700 font-medium hover:underline focus:outline-none"
          >
            Expand Details →
          </button>
        </div>
      </div>
    </div>
  );
};