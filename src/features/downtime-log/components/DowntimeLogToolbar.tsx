import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function DowntimeLogToolbar() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search machine, part, operator..."
            className="
              h-11
              w-[320px]
              rounded-lg
              border
              border-gray-300
              bg-white
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              focus:border-[#F97316]
              focus:ring-2
              focus:ring-[#F97316]/20
            "
          />
        </div>

        {/* Status */}
        <select
          className="
            h-11
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            outline-none
            focus:border-[#F97316]
          "
        >
          <option>All Status</option>
          <option>Running</option>
          <option>Resolved</option>
        </select>

        {/* Category */}
        <select
          className="
            h-11
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            outline-none
            focus:border-[#F97316]
          "
        >
          <option>All Categories</option>
          <option>Mechanical</option>
          <option>Electrical</option>
          <option>Hydraulic</option>
          <option>Pneumatic</option>
          <option>Material</option>
          <option>Operator</option>
          <option>Quality</option>
        </select>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            font-medium
            hover:bg-gray-50
          "
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </button>

        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            font-medium
            hover:bg-gray-50
          "
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Export
        </button>

        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-lg
            bg-[#F97316]
            px-5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#EA580C]
          "
        >
          <PlusIcon className="h-5 w-5" />
          New Downtime
        </button>
      </div>
    </div>
  );
}