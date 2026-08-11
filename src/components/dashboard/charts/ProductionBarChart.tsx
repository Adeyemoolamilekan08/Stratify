import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const productionData = [
  { hour: "1", value: 20 },
  { hour: "2", value: 26 },
  { hour: "3", value: 18 },
  { hour: "4", value: 34 },
  { hour: "5", value: 40 },
  { hour: "6", value: 38 },
  { hour: "7", value: 44 },
  { hour: "8", value: 56 },
  { hour: "9", value: 48 },
  { hour: "10", value: 60 },
  { hour: "11", value: 65 },
  { hour: "12", value: 58 },
];

export default function ProductionBarChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#ECECEC] p-5 h-[340px]">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h3 className="text-[15px] font-semibold text-[#1A1A2E]">
            Production Trend
          </h3>

          <p className="text-xs text-[#8A8F98]">
            Hourly production output
          </p>

        </div>

        <span className="text-xs font-medium text-[#34469C]">
          Today
        </span>

      </div>

      <ResponsiveContainer width="100%" height="82%">

        <AreaChart data={productionData}>

          <defs>

            <linearGradient
              id="productionFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2F6BFF"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#2F6BFF"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#ECECEC"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 10,
              fill: "#777",
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 10,
              fill: "#777",
            }}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#34469C"
            strokeWidth={3}
            fill="url(#productionFill)"
            dot={{
              r: 3,
              fill: "#34469C",
            }}
            activeDot={{
              r: 5,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}