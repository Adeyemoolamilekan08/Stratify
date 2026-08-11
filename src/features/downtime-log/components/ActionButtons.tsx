import {
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onView}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          border
          border-gray-200
          bg-white
          text-gray-500
          transition-colors
          hover:bg-gray-100
          hover:text-[#F97316]
        "
        title="View"
      >
        <EyeIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onEdit}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          border
          border-gray-200
          bg-white
          text-gray-500
          transition-colors
          hover:bg-gray-100
          hover:text-[#F97316]
        "
        title="Edit"
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>
    </div>
  );
}