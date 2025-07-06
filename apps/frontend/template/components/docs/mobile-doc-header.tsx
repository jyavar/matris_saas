"use client";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { CircleArrowUp, Menu, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePlausible } from "next-plausible";
import * as React from "react";

import { BookmarksNav } from "@/components/docs/bookmarks-nav";
import { DocsSearchbar } from "@/components/docs/doc-searchbar";
import { Icons } from "@/components/icons";
import { LargeLogo, Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MobileBadge } from "@/components/ui/mobile-badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SocialButton } from "@/components/ui/social-button";
import { type DocCategory, type DocItem,docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

interface MobileLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

interface DocsSidebarNavItemsProps {
  items: DocItem[];
  pathname: string;
  onItemClick?: () => void;
}

type ExtendedDocItem = DocItem & {
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
};

function DocsSidebarNavItems({
  items,
  pathname,
  onItemClick,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm pt-1 pb-5 ml-1 gap-[1px]">
      {items.map((item, index) => {
        const isSoon = item.label === "soon";
        const extendedItem = item as ExtendedDocItem;

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
            onClick={onItemClick}
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

function SocialLinks() {
  const plausible = usePlausible();

  return (
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
  );
}

export function MobileDocHeader({
  items,
}: {
  items: ExtendedDocItem[];
}): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="lg:hidden block">
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open main menu"
              aria-controls="mobile-navigation"
              className="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
              <span className="sr-only">Toggle Menu</span>
              <Logo />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-border z-50 max-w-[246px] bg-white dark:bg-black"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Use the options below to navigate the application.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="px-4 py-3">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <LargeLogo />
                </Link>
              </div>
              <div className="w-full px-3 pb-2">
                <DocsSearchbar />
              </div>
              <ScrollArea className="flex-1 overflow-auto w-[246px]">
                <div className="pb-6 pt-4 pr-6 pl-3">
                  <nav aria-label="Documentation navigation">
                    <BookmarksNav onItemClick={() => setIsOpen(false)} />
                    {items.map((item, index) => (
                      <Collapsible
                        defaultOpen
                        key={index}
                        className={cn("group/collapsible")}
                      >
                        <CollapsibleTrigger className="flex w-full items-center justify-start text-sm px-1.5 h-[30px] hover:bg-sidebar-accent rounded-md pt-[1px] group/trigger">
                          <span className="whitespace-nowrap text-sidebar-primary-foreground text-[13.5px] font-medium flex items-center gap-1 [&_svg]:opacity-70 group-hover/trigger:[&_svg]:opacity-100 [&_svg]:mb-[1.5px] [&_svg]:mr-[3px] [&_svg]:size-3.5 transition-opacity duration-200 justify-between w-full">
                            <div className="flex items-center gap-1">
                              {item.icon}
                              {item.title}
                            </div>
                            <TriangleDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-[90deg] group-data-[state=open]/collapsible:rotate-[0deg]" />
                          </span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {item?.items?.length && (
                            <DocsSidebarNavItems
                              items={item.items}
                              pathname={pathname}
                              onItemClick={() => setIsOpen(false)}
                            />
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </nav>
                </div>
              </ScrollArea>
              <div className="py-3 px-4 flex items-center justify-between gap-2">
                <Link
                  href="https://pro.badtz-ui.com/"
                  className="h-7 text-xs rounded-full border border-sidebar-border flex items-center whitespace-nowrap pr-3 pl-1.5 w-min group/pro-plan cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <CircleArrowUp className="size-3.5 mr-1.5 text-sidebar-muted-foreground group-hover/pro-plan:text-sidebar-primary-foreground transition-colors duration-200" />
                  Pro plan
                </Link>
                <SocialLinks />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
