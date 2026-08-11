import { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  action,
}: CardProps) {
  return (
    <section
      className={`
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        overflow-hidden
        h-full
        flex
        flex-col
        ${className}
      `}
    >
      {title && (
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white">
          <div>
            <h2 className="text-[15px] font-semibold tracking-wide text-slate-800">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-xs text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {action ? (
            action
          ) : (
            <button
              className="
                rounded-lg
                p-2
                text-slate-500
                transition
                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              <MoreHorizontal size={18} />
            </button>
          )}
        </header>
      )}

      <div className="flex-1 p-6">
        {children}
      </div>
    </section>
  );
}