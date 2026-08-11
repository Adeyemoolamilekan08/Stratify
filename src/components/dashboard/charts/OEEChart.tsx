import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  value: number;
  trend?: number;
}

export default function OEEChart({
  value,
  trend = 3.58,
}: Props) {
  const data = [
    { name: "OEE", value },
    { name: "Remaining", value: 100 - value },
  ];

  const color =
    value >= 85
      ? "#31B86A"
      : value >= 70
      ? "#F4A62A"
      : "#EF4444";

  return (
    <div className="bg-white rounded-xl border border-[#ECECEC] shadow-sm p-5 h-[340px]">

      <div className="flex items-center justify-between mb-4">

        <div>
          <h3 className="text-sm font-semibold text-[#1A1A2E]">
            Overall Equipment Effectiveness
          </h3>

          <p className="text-xs text-gray-500">
            Current production shift
          </p>
        </div>

      </div>

      <div className="relative w-full h-[240px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              innerRadius={78}
              outerRadius={98}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#E5E7EB" />
            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h1 className="text-4xl font-bold text-[#1A1A2E]">
            {value.toFixed(1)}%
          </h1>

          <div
            className={`mt-2 flex items-center gap-1 text-sm font-semibold ${
              trend >= 0
                ? "text-[#31B86A]"
                : "text-red-500"
            }`}
          >
            <span>{trend >= 0 ? "▲" : "▼"}</span>
            <span>{Math.abs(trend).toFixed(2)}%</span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            OEE Score
          </p>

        </div>

      </div>

    </div>
  );
}