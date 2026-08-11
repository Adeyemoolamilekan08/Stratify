interface SplitButtonProps {
  onClick?: () => void;
}

export const SplitButton = ({ onClick }: SplitButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 border border-[#3048A8] rounded-[4px] text-[11px] text-[#3048A8] hover:bg-[#3048A8] hover:text-white transition-colors"
    >
      Split
    </button>
  );
};
