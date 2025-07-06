// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  TableOfContents as TableOfContentsIcon,
} from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMounted } from "@/hooks/use-mounted";
import { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items?.length) {
    return null;
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 pb-2">
        <TableOfContentsIcon className="size-4" />
        <p className="font-medium !text-sm">On This Page</p>
      </div>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  const [activePosition, setActivePosition] = React.useState({
    top: 0,
    height: 0,
  });

  React.useEffect(() => {
    const activeElement = document.querySelector(`a[href="#${activeItem}"]`);
    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      const parentRect = activeElement.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setActivePosition({
          top: rect.top - parentRect.top,
          height: rect.height,
        });
      }
    }
  }, [activeItem]);

  return tree?.items?.length ? (
    <ul className={cn("m-0 list-none relative", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        const hasChildren = item.items?.length;
        const isActiveParent = hasChildren
          ? item.items.some((subItem) => subItem.url === `#${activeItem}`)
          : false;
        const isActive = item.url === `#${activeItem}`;

        return (
          <li
            key={index}
            className={cn(
              "mt-0 py-[3.5px] border-l-2 pl-3 border-sidebar-border relative",
              {
                "pl-0 border-0": level !== 1,
              }
            )}
          >
            {(isActive || isActiveParent) && (
              <motion.svg
                className="absolute left-[-2px] w-[2px] text-foreground"
                initial={false}
                animate={{
                  y: activePosition.top,
                  height: activePosition.height,
                }}
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            )}
            {hasChildren ? (
              <Collapsible defaultOpen={false} className="space-y-2">
                <CollapsibleTrigger
                  className={cn(
                    "flex text-left items-start gap-2 transition text-balance max-w-[220px] text-[13.5px]",
                    isActiveParent
                      ? "font-medium text-foreground"
                      : "text-sidebar-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="pl-4">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="mt-0 py-[2.5px]">
                        <a
                          href={subItem.url}
                          className={cn(
                            "inline-block no-underline transition-colors hover:text-foreground text-balance max-w-[220px] text-[13.5px]",
                            subItem.url === `#${activeItem}`
                              ? "font-medium text-foreground"
                              : "text-sidebar-muted-foreground"
                          )}
                        >
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <a
                href={item.url}
                className={cn(
                  "inline-block no-underline transition-colors hover:text-foreground text-balance max-w-[220px] text-[13.5px]",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-sidebar-muted-foreground"
                )}
              >
                {item.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  ) : null;
}
