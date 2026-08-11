import { DowntimeStatus } from "../types/downtime-log.types";

interface Props {
  status: DowntimeStatus;
}

const statusStyles: Record<DowntimeStatus, string> = {
  Running:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  Resolved:
    "bg-gray-100 text-gray-700 border border-gray-200",
};

export default function DowntimeStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        whitespace-nowrap
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
}