import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

interface Props {
  value: number;
  title?: string;
}

export default function OEEGauge({
  value,
  title = "Shift OEE",
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#ECECEC] p-5 h-[340px] flex flex-col">

      {/* Header */}

      <div className="mb-4">

        <h3 className="text-[15px] font-semibold text-[#1A1A2E]">
          {title}
        </h3>

        <p className="text-xs text-[#8A8F98]">
          Overall Equipment Effectiveness
        </p>

      </div>

      {/* Gauge */}

      <div className="relative flex-1">

        <ResponsiveContainer width="100%" height="100%">

          <RadialBarChart
            data={[{ value }]}
            innerRadius="68%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
          >

            <defs>

              <linearGradient id="oeeGradient">

                <stop offset="0%" stopColor="#EF4444" />

                <stop offset="50%" stopColor="#F59E0B" />

                <stop offset="100%" stopColor="#31B86A" />

              </linearGradient>

            </defs>

            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              dataKey="value"
              fill="url(#oeeGradient)"
              cornerRadius={14}
              background={{
                fill: "#ECECEC",
              }}
            />

          </RadialBarChart>

        </ResponsiveContainer>

        {/* Center */}

        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-3">

          <h1 className="text-[42px] font-bold text-[#1A1A2E]">
            {value.toFixed(2)}%
          </h1>

          <span className="text-sm text-[#6B7280]">
            OEE
          </span>

        </div>

      </div>

      {/* Bottom KPIs */}

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#ECECEC]">

        <div>

          <p className="text-[11px] text-[#9CA3AF]">
            Target
          </p>

          <h4 className="text-lg font-semibold text-[#34469C]">
            85%
          </h4>

        </div>

        <div>

          <p className="text-[11px] text-[#9CA3AF]">
            Actual
          </p>

          <h4 className="text-lg font-semibold text-[#31B86A]">
            {value.toFixed(2)}%
          </h4>

        </div>

        <div>

          <p className="text-[11px] text-[#9CA3AF]">
            Best Shift
          </p>

          <h4 className="text-sm font-semibold text-[#1A1A2E]">
            91.3%
          </h4>

        </div>

        <div>

          <p className="text-[11px] text-[#9CA3AF]">
            Previous
          </p>

          <h4 className="text-sm font-semibold text-[#1A1A2E]">
            83.7%
          </h4>

        </div>

      </div>

    </div>
  );
}