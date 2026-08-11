import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const downtimeData = [
  { name: "Break", value: 20 },
  { name: "Setup", value: 35 },
  { name: "Maint", value: 15 },
  { name: "Other", value: 10 },
];

export default function DowntimeChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">

      <h3 className="text-sm font-semibold mb-4">
        Downtime
      </h3>

      <ResponsiveContainer
        width="100%"
        height={220}
      >
        <BarChart data={downtimeData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#1F2229"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}