interface Props {
  machine: string;
  status: "Running" | "Setup" | "Offline";
  operator: string;
  part: string;
  oee: number;
  produced: number;
  target: number;
}

const statusColor = {
  Running: "#31B86A",
  Setup: "#F4A62A",
  Offline: "#9CA3AF",
};

export default function MachineStatusCard(props: Props) {
  return (
    <div className="bg-white rounded-[10px] border border-[#ECECEC] shadow-sm overflow-hidden">

      <div className="bg-[#34469C] text-white px-3 py-2 flex justify-between items-center">

        <span className="font-semibold text-[12px]">
          {props.machine}
        </span>

        <div className="flex items-center gap-1">

          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: statusColor[props.status],
            }}
          />

          <span className="text-[9px]">
            {props.status}
          </span>

        </div>

      </div>

      <div className="p-3 space-y-1 text-[10px]">

        <div className="flex justify-between">
          <span>Operator</span>
          <span>{props.operator}</span>
        </div>

        <div className="flex justify-between">
          <span>Part</span>
          <span>{props.part}</span>
        </div>

        <div className="flex justify-between">
          <span>Produced</span>
          <span>{props.produced}</span>
        </div>

        <div className="flex justify-between">
          <span>Target</span>
          <span>{props.target}</span>
        </div>

        <div className="mt-2">

          <div className="flex justify-between mb-1">

            <span>OEE</span>

            <span>{props.oee}%</span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">

            <div
              className="bg-[#34469C] h-2 rounded-full"
              style={{
                width: `${props.oee}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}