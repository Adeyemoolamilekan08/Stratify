import { ChevronDown, ChevronRight, Cpu } from "lucide-react";
import { useState } from "react";

import PlanningTable from "./PlanningTimeline";

interface Props {
  machine: string;
  plans: any[];
}

export default function PlanningMachineCard({
  machine,
  plans,
}: Props) {
  const [open, setOpen] = useState(true);

  const running = plans.filter(
    (p) => p.status === "running"
  ).length;

  const stopped = plans.filter(
    (p) => p.status === "stopped"
  ).length;

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-5 transition hover:bg-gray-100"
      >

        <div className="flex items-center gap-4">

          {open ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronRight size={20} />
          )}

          <Cpu
            size={20}
            className="text-[#3559B7]"
          />

          <div>

            <h2 className="text-xl font-semibold text-[#3559B7]">
              {machine}
            </h2>

            <p className="text-sm text-gray-500">
              {plans.length} Plans
            </p>

          </div>

        </div>

        <div className="flex gap-5 text-sm">

          <span className="font-medium text-green-600">
            Running {running}
          </span>

          <span className="font-medium text-red-500">
            Stopped {stopped}
          </span>

        </div>

      </button>

      {open && (
        <div className="p-4">
          <PlanningTable plans={plans} />
        </div>
      )}

    </section>
  );
} 