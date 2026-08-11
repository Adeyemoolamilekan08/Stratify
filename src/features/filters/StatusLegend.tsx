export const StatusLegend = () => {
  const statuses = [
    { label: 'Running', color: 'bg-[#3CB44A]' },
    { label: 'Stopped', color: 'bg-[#E53935]' },
    { label: 'Idle', color: 'bg-[#9CA3AF]' },
    { label: 'Maintenance', color: 'bg-[#F5A623]' },
  ];

  return (
    <div>
      <h4 className="text-[11px] font-medium text-[#6B7280] mb-2">Status Legend</h4>
      <div className="space-y-1">
        {statuses.map((status) => (
          <div key={status.label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-[12px] text-[#1F2937]">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};