import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { PlausibleButton } from "@/components/plausible-button";
import { cn } from "@/lib/utils";

export default function DocsCta({ className }: { className?: string }) {
  return (
    <Link
      href="https://pro.badtz-ui.com"
      target="_blank"
      className={cn(
        "border border-sidebar-border bg-white dark:bg-sidebar rounded-md flex max-w-[240px] group/cta ",
        className
      )}
    >
      <PlausibleButton
        eventName="Clicked on Pro From Doc"
        className="flex flex-col items-start justify-start text-left p-4 "
      >
        <h3 className="text-base text-sidebar-primary-foreground tracking-tight text-balance font-medium">
          Build stunning websites even faster.
        </h3>
        <p className="!text-[13.5px] text-sidebar-muted-foreground mt-4 mb-6">
          Get BadtzUI Pro and access prebuilt templates, blocks, and sections
          for ReactJS.
        </p>
        <span className="h-8 flex items-center text-[13px] w-full justify-center whitespace-nowrap rounded-md font-medium px-3 bg-accent hover:bg-[#6370c8] border border-[#6370c8] text-white transition-colors duration-200 relative gap-2 [&_svg]:mb-[1.5px] [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
          BadtzUI Pro <ExternalLinkIcon aria-hidden="true" />
        </span>
      </PlausibleButton>
    </Link>
  );
}
