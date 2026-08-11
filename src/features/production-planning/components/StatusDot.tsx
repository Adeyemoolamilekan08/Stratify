interface Props {
  status: "running" | "stopped";
}

export default function StatusDot({
  status,
}: Props) {
  return (
    <span
      className={`
        block
        w-3
        h-3
        rounded-full
        ${
          status === "running"
            ? "bg-[#22C55E]"
            : "bg-[#EF4444]"
        }
      `}
    />
  );
}