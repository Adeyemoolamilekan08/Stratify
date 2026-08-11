import {
  ArrowPathIcon,
  FunnelIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function DowntimeLogHeader() {
  return (
    <div className="mb-6">

      {/* ===================== Title ===================== */}

      <div className="flex items-center justify-between">

        {/* LEFT */}

    <div className="flex items-center gap-3">

  <h1 className="text-[28px] font-semibold tracking-tight text-[#1F2937]">
    Downtime Log
  </h1>

  <button className="rounded-full p-1 hover:bg-[#F3F4F6]">
    <InformationCircleIcon className="h-5 w-5 text-[#6B7280]" />
  </button>

  <button className="rounded-full p-1 hover:bg-[#F3F4F6]">
    <ArrowPathIcon className="h-5 w-5 text-[#6B7280]" />
  </button>

</div>    

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          <span className="text-[13px] text-[#6B7280]">
            402 of 11,412 records
          </span>

          <span className="text-[#D1D5DB]">|</span>

          <button className="text-[13px] text-[#374151] hover:text-[#111827]">
            All Machines
          </button>

          <span className="text-[#D1D5DB]">|</span>

          <button className="text-[13px] text-[#374151] hover:text-[#111827]">
            All Shifts
          </button>

          <span className="text-[#D1D5DB]">|</span>

          <button className="text-[13px] text-[#374151] hover:text-[#111827]">
            11 Jun 2026
          </button>

          <button
            className="
              ml-2
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#D7DCE3]
              bg-white
              px-3
              py-2
              hover:bg-[#F8F9FA]
            "
          >
            <FunnelIcon className="h-4 w-4 text-[#4B5563]" />

            <span className="text-sm text-[#374151]">
              Filter
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}