import { 
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowTrendingDownIcon,
  CalculatorIcon,
  ServerIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { formatDuration } from '@utils/format';

interface DowntimeLogStatsProps {
  stats: {
    totalDowntime: number;
    totalEvents: number;
    activeEvents: number;
    averageDuration: number;
    mostCommonReason: string;
    mostCommonReasonCount: number;
    machinesAffected: number;
    availability: number;
    mtbf: number;
    mttr: number;
    oeeImpact: number;
    downtimeByCategory: { category: string; duration: number; count: number }[];
    downtimeByMachine: { machineId: string; machineName: string; duration: number; count: number }[];
  };
}

export const DowntimeLogStats = ({ stats }: DowntimeLogStatsProps) => {
  const statCards = [
    {
      title: 'Total Downtime',
      value: formatDuration(stats.totalDowntime),
      icon: ClockIcon,
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: ExclamationTriangleIcon,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Active Events',
      value: stats.activeEvents,
      icon: ArrowTrendingDownIcon,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Availability',
      value: `${stats.availability}%`,
      icon: CheckCircleIcon,
      color: stats.availability >= 85 ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'MTBF',
      value: formatDuration(stats.mtbf),
      icon: ArrowPathIcon,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'MTTR',
      value: formatDuration(stats.mttr),
      icon: ServerIcon,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'OEE Impact',
      value: `${stats.oeeImpact}%`,
      icon: CalculatorIcon,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Machines Affected',
      value: stats.machinesAffected,
      icon: ChartBarIcon,
      color: 'bg-teal-50 text-teal-600',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-card border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium truncate">{card.title}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={card.color + " p-2 rounded-lg"}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Downtime by Category */}
        <div className="bg-white rounded-xl shadow-card border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Downtime by Category</h4>
          <div className="space-y-2">
            {stats.downtimeByCategory.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.category}</span>
                  <span className="font-medium text-gray-900">{formatDuration(item.duration)} ({item.count} events)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary-500 rounded-full h-1.5 transition-all duration-500"
                    style={{ 
                      width: `${(item.duration / stats.totalDowntime) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downtime by Machine */}
        <div className="bg-white rounded-xl shadow-card border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Downtime by Machine</h4>
          <div className="space-y-2">
            {stats.downtimeByMachine.map((item) => (
              <div key={item.machineId}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.machineName}</span>
                  <span className="font-medium text-gray-900">{formatDuration(item.duration)} ({item.count} events)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-orange-500 rounded-full h-1.5 transition-all duration-500"
                    style={{ 
                      width: `${(item.duration / stats.totalDowntime) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Common Reason */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Most Common Downtime Reason</p>
            <p className="text-lg font-semibold text-gray-900">{stats.mostCommonReason || 'N/A'}</p>
          </div>
          <div className="bg-primary-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-primary-600">
              {stats.mostCommonReasonCount} occurrences
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};