import { cn } from '@utils/cn';

interface StatsCardsProps {
  stats: {
    totalMachines: number;
    operating: number;
    stopped: number;
    idle: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    { label: 'Machines', value: stats.totalMachines, color: 'bg-[#2F6BFF]' },
    { label: 'Operating', value: stats.operating, color: 'bg-[#31B86A]' },
    { label: 'Stopped', value: stats.stopped, color: 'bg-[#EF5350]' },
    { label: 'Idle', value: stats.idle, color: 'bg-[#F4A62A]' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", card.color)} />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">
              {card.label}
            </span>
          </div>
          <div className="text-[28px] font-bold text-[#1F2937] mt-1">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};