import { ReactNode } from "react";
import {
  InformationCircleIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  equipment?: string;
  toolbar?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({
  title,
  subtitle,
  equipment,
  toolbar,
  children,
}: PageLayoutProps) => {
  return (
    <>
      {/* Page Header */}

      <section className="bg-white border-b border-[#E5E7EB]">

        <div className="px-8 pt-6 pb-5 flex items-start justify-between">

          {/* Left */}

          <div className="flex items-start gap-4">

            <div>

              <h1 className="text-[28px] font-semibold text-[#1F2937]">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-1 text-xs uppercase tracking-wide text-[#94A3B8]">
                  {subtitle}
                </p>
              )}

              {equipment && (
                <p className="mt-1 text-sm font-medium text-[#475569]">
                  {equipment}
                </p>
              )}

            </div>

            <div className="flex items-center gap-2 pt-1">

              <HeaderIcon>
                <InformationCircleIcon className="w-5 h-5" />
              </HeaderIcon>

              <HeaderIcon>
                <Cog6ToothIcon className="w-5 h-5" />
              </HeaderIcon>

              <HeaderIcon>
                <ArrowPathIcon className="w-5 h-5" />
              </HeaderIcon>

            </div>

          </div>

          {/* Right */}

          {toolbar}

        </div>

      </section>

      {/* Page Content */}

      <section className="px-0 pb-6">

        {children}

      </section>
    </>
  );
};

function HeaderIcon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <button
      className="
        w-9
        h-9
        rounded-full
        border
        border-[#E2E8F0]
        bg-white
        flex
        items-center
        justify-center
        text-[#64748B]
        hover:bg-[#F8FAFC]
        hover:text-[#2563EB]
        transition-colors
      "
    >
      {children}
    </button>
  );
}