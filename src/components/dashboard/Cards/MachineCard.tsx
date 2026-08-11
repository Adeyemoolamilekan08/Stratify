interface Machine {
  id: string;
  status: "Running" | "Setup" | "Offline";
  operator: string;
  part: string;
  mould: string;
  cycle: number;
  shift: string;
  target: number;
  produced: number;
  rejected: number;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

interface Props {
  machine: Machine;
}

const statusStyle = {
  Running: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  Setup: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  Offline: {
    bg: "bg-gray-200",
    text: "text-gray-600",
    dot: "bg-gray-500",
  },
};

export default function MachineCard({ machine }: Props) {
  const status = statusStyle[machine.status];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="bg-[#34469C] px-4 py-3 text-white">

        <div className="flex items-center justify-between">

          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-full ${status.bg}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${status.dot}`}
            />

            <span className={`text-[10px] font-semibold ${status.text}`}>
              {machine.status}
            </span>

          </div>

          <span className="text-[11px] opacity-90">
            Shift {machine.shift}
          </span>

        </div>

        <h2 className="text-[34px] font-bold mt-3 tracking-wide">
          {machine.id}
        </h2>

      </div>

      {/* Details */}

      <div className="p-4">

        <div className="grid grid-cols-2 gap-y-2 text-[11px] mb-4">

          <span className="text-gray-500">Operator</span>
          <span className="text-right font-medium">{machine.operator}</span>

          <span className="text-gray-500">Part</span>
          <span className="text-right font-medium">{machine.part}</span>

          <span className="text-gray-500">Mould</span>
          <span className="text-right font-medium">{machine.mould}</span>

          <span className="text-gray-500">Cycle</span>
          <span className="text-right font-medium">{machine.cycle}s</span>

          <span className="text-gray-500">Target</span>
          <span className="text-right font-medium">{machine.target}</span>

          <span className="text-gray-500">Actual</span>
          <span className="text-right font-medium text-[#34469C]">
            {machine.produced}
          </span>

          <span className="text-gray-500">Reject</span>
          <span className="text-right font-medium text-red-500">
            {machine.rejected}
          </span>

        </div>

        <Metric
          label="Availability"
          value={machine.availability}
          color="#2F6BFF"
        />

        <Metric
          label="Performance"
          value={machine.performance}
          color="#31B86A"
        />

        <Metric
          label="Quality"
          value={machine.quality}
          color="#A855F7"
        />

        <Metric
          label="OEE"
          value={machine.oee}
          color="#F97316"
        />

      </div>

    </div>
  );
}

interface MetricProps {
  label: string;
  value: number;
  color: string;
}

function Metric({
  label,
  value,
  color,
}: MetricProps) {
  return (
    <div className="mb-3">

      <div className="flex justify-between text-[11px] mb-1">

        <span>{label}</span>

        <span className="font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />

      </div>

    </div>
  );
}