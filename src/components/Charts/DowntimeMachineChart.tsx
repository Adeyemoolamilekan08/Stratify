import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';

interface DowntimeMachineChartProps {
  data: Array<{
    name: string;
    value: number;
    cumulative: number;
  }>;
}

export const DowntimeMachineChart = ({ data }: DowntimeMachineChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
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
            yAxisId="left"
            tick={{ fontSize: 10, fill: '#6B7280' }}
            domain={[0, 900]}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: '#6B7280' }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'Cumulative') return [`${value}%`, 'Cumulative'];
              return [value, 'Minutes'];
            }}
            contentStyle={{ fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar yAxisId="left" dataKey="value" name="Minutes" fill="#4F4F4F" radius={[2, 2, 0, 0]} />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="cumulative" 
            name="Cumulative" 
            stroke="#86BDF8" 
            strokeWidth={2}
            dot={{ r: 3, fill: '#86BDF8' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};