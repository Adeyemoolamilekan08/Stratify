import { cn } from '@utils/cn';

interface MachineStatusProps {
  status: 'running' | 'stopped' | 'idle' | 'maintenance' | 'setup';
}

const statusConfig = {
  running: { label: 'Running', color: 'bg-[#3CB44A]', text: 'text-[#3CB44A]' },
  stopped: { label: 'Stopped', color: 'bg-[#E53935]', text: 'text-[#E53935]' },
  idle: { label: 'Idle', color: 'bg-[#9CA3AF]', text: 'text-[#9CA3AF]' },
  maintenance: { label: 'Maintenance', color: 'bg-[#F5A623]', text: 'text-[#F5A623]' },
  setup: { label: 'Setup', color: 'bg-[#29B6F6]', text: 'text-[#29B6F6]' },
};

export const MachineStatus = ({ status }: MachineStatusProps) => {
  const config = statusConfig[status] || statusConfig.idle;

  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      <span className={cn("w-2 h-2 rounded-full", config.color)} />
      <span className={cn("text-[11px] font-medium", config.text)}>
        {config.label}
      </span>
    </div>
  );
};