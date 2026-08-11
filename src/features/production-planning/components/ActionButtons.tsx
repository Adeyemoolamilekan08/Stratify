import {
  StarIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function ActionButtons() {
  return (
    <div className="flex items-center justify-center gap-2">

      <button className="rounded p-1 hover:bg-[#EEF4FF] transition">
        <StarIcon className="w-4 h-4 text-[#F4B400]" />
      </button>

      <button className="rounded p-1 hover:bg-[#EEF4FF] transition">
        <PencilSquareIcon className="w-4 h-4 text-[#667085]" />
      </button>

      <button className="rounded p-1 hover:bg-[#EEF4FF] transition">
        <DocumentDuplicateIcon className="w-4 h-4 text-[#667085]" />
      </button>

      <button className="rounded p-1 hover:bg-[#FEECEC] transition">
        <XCircleIcon className="w-4 h-4 text-[#E53935]" />
      </button>

    </div>
  );
}