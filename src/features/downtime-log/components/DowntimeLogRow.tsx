import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import type { DowntimeLog } from "../types/downtimeLog";

interface Props {
  record: DowntimeLog;
}

export default function DowntimeLogRow({ record }: Props) {
  return (
    <tr
      className="
        h-[58px]
        border-b
        border-[#ECECEC]
        hover:bg-[#FAFAFA]
        transition-colors
      "
    >
      {/* Shift + Machine */}

      <td className="px-5 py-3">

        <div className="text-[13px] font-semibold text-[#2F6BFF]">
          {record.shift}
        </div>

        <div
          className="
            mt-1
            whitespace-nowrap
            text-[13px]
            text-[#374151]
          "
        >
          {record.machine}
        </div>

      </td>

      {/* Downtime Start */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-3
          text-[13px]
          text-[#374151]
        "
      >
        {record.downtimeStart}
      </td>

      {/* Downtime End */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-3
          text-[13px]
          text-[#374151]
        "
      >
        {record.downtimeEnd}
      </td>

      {/* Duration */}

      <td
        className="
          px-5
          py-3
          text-center
          text-[13px]
          font-medium
          text-[#374151]
        "
      >
        {record.duration}
      </td>

      {/* Reason */}

      <td className="px-5 py-3">

        <button
          className="
            flex
            h-9
            w-full
            items-center
            justify-between
            rounded-md
            border
            border-[#D7DCE3]
            bg-white
            px-3
            text-[13px]
            text-[#374151]
            hover:border-[#2F6BFF]
          "
        >
          <span>{record.reason}</span>

          <ChevronDownIcon className="h-4 w-4 text-[#8A8F99]" />

        </button>

      </td>

      {/* Explanation */}

      <td
        className="
          px-5
          py-3
          text-[13px]
          text-[#4B5563]
        "
      >
        {record.explanation}
      </td>

      {/* Action */}

      <td className="px-5 py-3 text-center">

        <button
          className="
            rounded-md
            p-1
            hover:bg-[#F3F4F6]
          "
        >
          <EllipsisVerticalIcon className="h-5 w-5 text-[#6B7280]" />
        </button>

      </td>

      {/* Remark */}

      <td className="px-5 py-3 text-center">

        {record.hasRemark && (
          <button
            className="
              rounded-md
              p-1
              hover:bg-[#F3F4F6]
            "
          >
            <PencilSquareIcon className="h-5 w-5 text-[#6B7280]" />
          </button>
        )}

      </td>

    </tr>
  );
}