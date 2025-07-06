"use client";

import { TriangleDownIcon } from "@radix-ui/react-icons";
import { CircleArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlausible } from "next-plausible";
import * as React from "react";

import { BookmarksNav } from "@/components/docs/bookmarks-nav";
import { DocDropdown } from "@/components/docs/doc-dropdown";
import { DocGithubButton } from "@/components/docs/doc-github-button";
import { DocModeToggle } from "@/components/docs/doc-mode-toggle";
import { DocsSearchbar } from "@/components/docs/doc-searchbar";
import { MobileDocHeader } from "@/components/docs/mobile-doc-header";
import { Icons } from "@/components/icons";
import { LargeLogo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MobileBadge } from "@/components/ui/mobile-badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialButton } from "@/components/ui/social-button";
import { DocItem } from "@/config/docs";
import { cn } from "@/lib/utils";

type ExtendedDocItem = DocItem & {
  icon?: React.ReactNode;
  disabled?: boolean;
  external?: boolean;
  items?: ExtendedDocItem[];
};

type DocNavProps = {
  items: ExtendedDocItem[];
  children: React.ReactNode;
};

type DocsSidebarNavItemsProps = {
  items: ExtendedDocItem[];
  pathname: string;
};

export function DocNav({ items, children }: DocNavProps) {
  const plausible = usePlausible();
  const pathname = usePathname();

  return (
    <div className="flex bg-sidebar h-[100dvh] overflow-hidden pl-2.5">
      <div className="h-full hidden lg:flex flex-col">
        <div className="flex flex-col h-full">
          <div className="px-4 py-3">
            <Link href="/">
              <LargeLogo />
            </Link>
          </div>
          <ScrollArea className="flex-1 overflow-auto w-[246px] relative">
            <div className="absolute top-0 h-6 inset-x-0 bg-gradient-to-t from-transparent to-sidebar z-20 pointer-events-none" />
            <div className="absolute bottom-0 h-6 inset-x-0 bg-gradient-to-b from-transparent to-sidebar z-20 pointer-events-none" />
            <div className="pb-6 pt-4 pr-6 pl-3">
              <nav aria-label="Documentation navigation">
                <BookmarksNav />
                {items.map((item, index) => {
                  const extendedItem = item as ExtendedDocItem;
                  return (
                    <Collapsible
                      defaultOpen
                      key={index}
                      className={cn("group/collapsible")}
                    >
                      <CollapsibleTrigger className="flex w-full items-center justify-start text-sm px-1.5 h-[30px] hover:bg-sidebar-accent rounded-md pt-[1px] group/trigger">
                        <span className="whitespace-nowrap text-sidebar-primary-foreground text-[13.5px] font-medium flex items-center gap-1 [&_svg]:opacity-70 group-hover/trigger:[&_svg]:opacity-100 [&_svg]:mb-[1.5px] [&_svg]:mr-[3px] [&_svg]:size-3.5 transition-opacity duration-200">
                          {extendedItem.icon}
                          {extendedItem.title}
                          <TriangleDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-[90deg] group-data-[state=open]/collapsible:rotate-[0deg]" />
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {extendedItem?.items?.length && (
                          <DocsSidebarNavItems
                            items={extendedItem.items}
                            pathname={pathname}
                          />
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </nav>
            </div>
          </ScrollArea>
          <div className="py-3 px-4 flex items-center justify-between gap-2">
            <Link
              href="https://pro.badtz-ui.com/"
              className="h-7 text-xs rounded-full border border-sidebar-border flex items-center whitespace-nowrap pr-3 pl-1.5 w-min group/pro-plan cursor-pointer"
            >
              <CircleArrowUp className="size-3.5 mr-1.5 text-sidebar-muted-foreground group-hover/pro-plan:text-sidebar-primary-foreground transition-colors duration-200" />
              Pro plan
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex justify-center gap-0.5">
                <SocialButton
                  className="hover:bg-sidebar-accent [&_svg]:size-3.5"
                  srOnly="GitHub Link"
                  src="https://github.com/badtzx0/badtz-ui"
                  onClick={() => plausible("Clicked on GitHub Button")}
                >
                  <Icons.gitHub />
                </SocialButton>
                <SocialButton
                  className="hover:bg-sidebar-accent [&_svg]:size-3"
                  srOnly="Twitter Link"
                  src="https://x.com/badtz_ui"
                >
                  <Icons.twitter />
                </SocialButton>
                <SocialButton
                  srOnly="Discord Link"
                  src="https://discord.gg/SV2y7vz6Es"
                  className="hover:bg-sidebar-accent [&_svg]:size-4"
                >
                  <Icons.discord />
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 pl-0 pt-0 h-full w-full flex-1 flex flex-col">
        <div className="py-3 md:py-2 flex justify-between lg:justify-end items-center relative">
          <MobileDocHeader items={items} />
          <div className="fixed w-full max-w-[450px] top-2 left-1/2 -translate-x-1/2 hidden lg:block">
            <DocsSearchbar />
          </div>
          <div className="flex items-center gap-1.5">
            <DocGithubButton />
            <DocModeToggle />
            <div className="hidden md:block">
              <DocDropdown />
            </div>
          </div>
        </div>
        <div className="border rounded-md overflow-y-auto flex-1 shadow-xs bg-doc-background">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm pt-1 pb-5 ml-1 gap-[1px]">
      {items.map((item, index) => {
        const extendedItem = item as ExtendedDocItem;
        const isSoon = extendedItem.label === "soon";

        return extendedItem.href && !extendedItem.disabled && !isSoon ? (
          <Link
            key={index}
            href={extendedItem.href}
            className={cn(
              "group flex w-full text-[13.5px] items-center focus:outline-transparent outline-none pl-4 pr-2 text-balance h-[30px] transition-colors rounded-md duration-200 font-medium text-sidebar-muted-foreground hover:text-sidebar-primary-foreground justify-between",
              pathname === extendedItem.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "hover:bg-sidebar-primary/50"
            )}
            target={extendedItem.external ? "_blank" : ""}
            rel={extendedItem.external ? "noreferrer" : ""}
          >
            {extendedItem.title}
            {extendedItem.label && (
              <>
                <Badge className="ml-auto" variant={extendedItem.label} />
                <MobileBadge className="ml-auto" variant={extendedItem.label} />
              </>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full text-[13.5px] outline-none focus:outline-transparent items-center pl-4 pr-2 h-[30px] text-sidebar-muted-foreground cursor-default text-balance font-medium justify-between"
            )}
          >
            {extendedItem.title}
            {extendedItem.label && (
              <>
                <Badge className="ml-auto" variant={extendedItem.label} />
                <MobileBadge className="ml-auto" variant={extendedItem.label} />
              </>
            )}
          </span>
        );
      })}
    </div>
  ) : null;
}
