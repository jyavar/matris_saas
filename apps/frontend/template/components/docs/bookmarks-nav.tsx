"use client";

import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useBookmarks } from "@/hooks/bookmarks-context";
import { cn } from "@/lib/utils";

interface BookmarksNavProps {
  onItemClick?: () => void;
}

export function BookmarksNav({ onItemClick }: BookmarksNavProps) {
  const { bookmarks } = useBookmarks();
  const pathname = usePathname();

  if (bookmarks.length === 0) return null;

  return (
    <Collapsible defaultOpen className={cn("group/collapsible")}>
      <CollapsibleTrigger className="flex w-full items-center justify-start text-sm px-1.5 h-[30px] hover:bg-sidebar-accent rounded-md pt-[1px] group/trigger">
        <span className="whitespace-nowrap text-sidebar-primary-foreground text-[13.5px] font-medium flex items-center gap-1 [&_svg]:opacity-70 group-hover/trigger:[&_svg]:opacity-100 [&_svg]:mb-[1.5px] [&_svg]:mr-[3px] [&_svg]:size-3.5 transition-opacity duration-200">
          <Bookmark className="size-3.5" />
          Bookmarks
          <TriangleDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-[90deg] group-data-[state=open]/collapsible:rotate-[0deg]" />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-flow-row auto-rows-max text-sm pt-1 pb-5 ml-1 gap-[1px]">
          {bookmarks.map((bookmark, index) => (
            <Link
              key={index}
              href={bookmark.href}
              className={cn(
                "group flex w-full text-[13.5px] items-center focus:outline-transparent outline-none pl-4 pr-2 text-balance h-[30px] transition-colors rounded-md duration-200 font-medium text-sidebar-muted-foreground hover:text-sidebar-primary-foreground justify-between",
                pathname === bookmark.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-primary/50"
              )}
              onClick={onItemClick}
            >
              {bookmark.title}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
