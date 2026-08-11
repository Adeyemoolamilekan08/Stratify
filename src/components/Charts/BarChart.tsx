import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
}

export const BarChart = ({ data, height = 100 }: BarChartProps) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#6B7280' }} />
          <YAxis tick={{ fontSize: 8, fill: '#6B7280' }} />
          <Tooltip formatter={(value: number) => [value, 'Minutes']} contentStyle={{ fontSize: '10px' }} />
          <Bar dataKey="value" fill="#2F6BFF" radius={[2, 2, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};