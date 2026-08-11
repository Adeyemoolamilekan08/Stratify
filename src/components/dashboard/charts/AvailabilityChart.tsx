import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ReferenceLine,
} from "recharts";

const data = [
  { machine: "HT28", availability: 92, target: 85 },
  { machine: "HT29", availability: 87, target: 85 },
  { machine: "HT30", availability: 81, target: 85 },
  { machine: "HT31", availability: 96, target: 85 },
  { machine: "HT32", availability: 74, target: 85 },
  { machine: "HT33", availability: 88, target: 85 },
  { machine: "HT34", availability: 91, target: 85 },
  { machine: "HT35", availability: 79, target: 85 },
  { machine: "HT36", availability: 94, target: 85 },
  { machine: "HT37", availability: 82, target: 85 },
  { machine: "HT38", availability: 90, target: 85 },
  { machine: "HT39", availability: 86, target: 85 },
];

export default function AvailabilityChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#ECECEC] p-5 h-[360px]">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h3 className="text-sm font-semibold text-[#1A1A2E]">
            Machine Availability
          </h3>

          <p className="text-xs text-gray-500">
            Live comparison against target
          </p>

        </div>

        <span className="text-xs text-gray-400">
          %
        </span>

      </div>

      <ResponsiveContainer width="100%" height="88%">

        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >

          <CartesianGrid
            stroke="#F1F3F5"
            vertical={false}
          />

          <XAxis
            dataKey="machine"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0,100]}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <ReferenceLine
            y={85}
            stroke="#F97316"
            strokeDasharray="5 5"
          />

          <Bar
            dataKey="availability"
            fill="#34469C"
            radius={[5,5,0,0]}
            barSize={16}
          />

          <Line
            type="monotone"
            dataKey="target"
            stroke="#31B86A"
            strokeWidth={3}
            dot={false}
          />

        </ComposedChart>

      </ResponsiveContainer>

    </div>
  );
}