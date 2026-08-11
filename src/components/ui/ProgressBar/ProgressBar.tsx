interface Props {
  value: number;
}

export default function ProgressBar({
  value,
}: Props) {
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

      <div
        style={{
          width: `${value}%`,
        }}
        className="
        h-full
        bg-orange-500
        rounded-full
        transition-all
        duration-500
      "
      />

    </div>
  );
}