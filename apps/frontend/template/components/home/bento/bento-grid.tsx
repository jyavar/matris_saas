import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode } from "react";

import { PlausibleButton } from "@/components/plausible-button";
import { cn } from "@/lib/utils";
interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6 grid-cols-1 md:max-w-none max-w-[400px] mx-auto w-full md:grid-cols-5 md:grid-rows-[340px_380px] lg:grid-rows-[380px_420px] grid-rows-[460px]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  className?: string;
  title: string;
  description: string;
  link?: {
    src: string;
    text: string;
  };
  visual: ReactNode;
}

export function BentoCell({
  className,
  title,
  description,
  link,
  visual,
}: BentoCellProps) {
  return (
    <div
      className={cn(
        "row-span-1 md:col-span-2 border border-[#7876c5]/20 rounded-xl flex flex-col items-center justify-end relative overflow-hidden  max-md:h-[460px] bg-sidebar/50 p-1.5 large-accent-shadow  ",
        className
      )}
    >
      <div className="h-full w-full overflow-hidden absolute inset-0">
        {visual}
      </div>
      <div className="p-4 bg-sidebar/50 backdrop-blur-md border rounded-xl z-20 accent-shadow overflow-hidden">
        <span className="relative text-balance text-sidebar-muted-foreground">
          <h3 className="mb-2 text-foreground inline">{title} </h3>
          {description}
        </span>
        {link && (
          <Link
            target="_blank"
            href={link.src}
            aria-label="Learn more about Badtz UI Pro"
            className="text-accent text-sm mt-2 block hover:underline underline-offset-2 font-medium"
          >
            <PlausibleButton
              eventName="Clicked on Pro"
              className="flex items-center justify-center gap-0"
            >
              {link.text}
              <ArrowTopRightIcon className="inline-block w-3.5 h-3.5 ml-1" />
            </PlausibleButton>
          </Link>
        )}
      </div>
    </div>
  );
}
