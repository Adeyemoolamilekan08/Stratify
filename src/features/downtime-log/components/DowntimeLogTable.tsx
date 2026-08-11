import { mockDowntimeLogs } from "../data/mockDowntimeLog";
import DowntimeLogRow from "./DowntimeLogRow";

export default function DowntimeLogTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">

      <div className="overflow-x-auto">

        <table className="min-w-[1350px] w-full">

          {/* ================= HEADER ================= */}

          <thead className="bg-[#F7F8FA]">

            <tr className="border-b border-[#E5E7EB]">

              {/* Shift + Machine */}

              <th
                className="
                  w-[220px]
                  px-6
                  py-4
                  text-left
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Shift / Machine
              </th>

              {/* Downtime Start */}

              <th
                className="
                  w-[150px]
                  px-6
                  py-4
                  text-left
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Downtime Start
              </th>

              {/* Downtime End */}

              <th
                className="
                  w-[150px]
                  px-6
                  py-4
                  text-left
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Downtime End
              </th>

              {/* Duration */}

              <th
                className="
                  w-[110px]
                  px-6
                  py-4
                  text-center
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Duration
              </th>

              {/* Reason */}

              <th
                className="
                  w-[210px]
                  px-6
                  py-4
                  text-left
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Reason
              </th>

              {/* Explanation */}

              <th
                className="
                  w-[320px]
                  px-6
                  py-4
                  text-left
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Explanation
              </th>

              {/* Action */}

              <th
                className="
                  w-[80px]
                  px-4
                  py-4
                  text-center
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Action
              </th>

              {/* Remark */}

              <th
                className="
                  w-[80px]
                  px-4
                  py-4
                  text-center
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                Remark
              </th>

            </tr>

          </thead>

          {/* ================= BODY ================= */}

          <tbody className="bg-white">

            {mockDowntimeLogs.map((record) => (

              <DowntimeLogRow
                key={record.id}
                record={record}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}