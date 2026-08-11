import { motion } from 'framer-motion';

interface SummaryCardsProps {
  stats: {
    planned: number;
    running: number;
    stopped: number;
    idle: number;
  };
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  const cards = [
    { label: 'Planned', value: stats.planned, color: 'bg-[#3048A8]' },
    { label: 'Running', value: stats.running, color: 'bg-[#3CB44A]' },
    { label: 'Stopped', value: stats.stopped, color: 'bg-[#E53935]' },
    { label: 'Idle', value: stats.idle, color: 'bg-[#9CA3AF]' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-lg border border-[#E5E7EB] p-4"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${card.color}`} />
            <span className="text-[11px] text-[#6B7280] uppercase tracking-wider">
              {card.label}
            </span>
          </div>
          <div className="text-[24px] font-medium text-[#1F2937] mt-1">
            {card.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;