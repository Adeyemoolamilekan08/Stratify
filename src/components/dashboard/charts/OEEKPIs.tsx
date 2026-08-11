interface KPI {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const items: KPI[] = [
  {
    title: "Availability",
    value: "94.62%",
    change: "+2.3%",
    positive: true,
  },
  {
    title: "Performance",
    value: "86.40%",
    change: "+1.1%",
    positive: true,
  },
  {
    title: "Quality",
    value: "99.18%",
    change: "-0.2%",
    positive: false,
  },
  {
    title: "OEE",
    value: "81.34%",
    change: "+3.7%",
    positive: true,
  },
];

export default function OEEKPIs() {
  return (
    <div className="grid grid-cols-4 gap-4">

      {items.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5"
        >

          <p className="text-xs text-gray-500">
            {item.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#34469C]">
            {item.value}
          </h2>

          <p
            className={`mt-2 text-sm font-semibold ${
              item.positive
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {item.positive ? "▲" : "▼"} {item.change}
          </p>

        </div>

      ))}

    </div>
  );
}