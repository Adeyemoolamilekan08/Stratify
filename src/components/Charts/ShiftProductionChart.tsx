import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ShiftProductionChartProps {
  data: Array<{
    name: string;
    production: number;
    target: number;
  }>;
}

export const ShiftProductionChart = ({ data }: ShiftProductionChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
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
          />
          <Tooltip 
            contentStyle={{ fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="production" name="Production" fill="#2F6BFF" radius={[2, 2, 0, 0]} />
          <Bar dataKey="target" name="Target" fill="#BDBDBD" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};