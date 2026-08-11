import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DowntimeReasonChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const DowntimeReasonChart = ({ data }: DowntimeReasonChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            tick={{ 
              fontSize: 9, 
              fill: '#6B7280',
              transform: 'rotate(-45deg)',
              textAnchor: 'end'
            }}
            interval={0}
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#6B7280' }}
            domain={[0, 10000]}
            tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
          />
          <Tooltip 
            formatter={(value: number) => [value, 'Minutes']}
            contentStyle={{ fontSize: '11px' }}
          />
          <Bar dataKey="value" name="Downtime" fill="#2F6BFF" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};