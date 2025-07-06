import Link from "next/link";

import { PlausibleButton } from "@/components/plausible-button";
import { Button } from "@/components/ui/button";

interface ModularPreviewLinkProps {
  previewLink: string;
  previewLink2: string;
  pageLink: string;
}

export function ModularPreviewLink({
  previewLink,
  previewLink2,
  pageLink,
}: ModularPreviewLinkProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 md:gap-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full mt-12">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={previewLink}
          className="w-full"
        >
          <PlausibleButton
            eventName="PreviewModularBlue"
            className="w-full border bg-sidebar hover:bg-sidebar/50 rounded-md transition-colors duration-300 h-9 text-sm font-medium"
          >
            <span>Preview Example 1</span>
          </PlausibleButton>
        </Link>
        <Link target="_blank" href={pageLink} className="w-full">
          <PlausibleButton
            eventName="ClickedOnProFromModular"
            className="w-full bg-sidebar-foreground hover:bg-sidebar-foreground/90 text-background rounded-md transition-colors duration-300 h-9 text-sm font-medium"
          >
            <span>Get Template</span>
          </PlausibleButton>
        </Link>
      </div>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={previewLink2}
        className="w-full md:w-1/2"
      >
        <PlausibleButton
          eventName="PreviewModularPurple"
          className="w-full border bg-sidebar hover:bg-sidebar/50 rounded-md transition-colors duration-300 h-9 text-sm font-medium"
        >
          <span>Preview Example 2</span>
        </PlausibleButton>
      </Link>
    </div>
  );
}
