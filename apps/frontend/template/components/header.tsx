"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { DocGithubButton } from "@/components/docs/doc-github-button";
import { DocModeToggle } from "@/components/docs/doc-mode-toggle";
import { DocsSearchbar } from "@/components/docs/doc-searchbar";
import { Icons } from "@/components/icons";
import { LargeLogo, Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

interface Link {
  href: string;
  label: string;
  external?: boolean;
}

const links: Link[] = [
  {
    href: "/docs",
    label: "Components",
  },
  {
    href: "/docs/templates/modular-saas-template",
    label: "Templates",
  },
  {
    href: "/changelog",
    label: "Changelog",
  },
];

interface MobileLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  [x: string]: any;
}

type Item = {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  items?: Item[];
};

type DocNavProps = {
  items: Item[];
};

type DocsSidebarNavItemsProps = {
  items: Item[];
  pathname: string;
  onItemClick?: () => void;
};

function MobileLink({
  href,
  label,
  className,
  onClick,
  ...props
}: MobileLinkProps): JSX.Element {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onClick?.();
      }}
      className={cn(
        "w-min whitespace-nowrap text-foreground text-sm py-2",
        className
      )}
      {...props}
    >
      {label}
    </Link>
  );
}

export function DocsSidebarNavItems({
  items,
  pathname,
  onItemClick,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm ml-1">
      {items.map((item, index) => {
        const isSoon = item.label === "soon";

        return item.href && !item.disabled && !isSoon ? (
          <Link
            key={index}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "group flex w-full text-sm items-center focus:outline-transparent outline-none text-balance h-9 transition-colors rounded-md duration-200",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && <Badge className="ml-2" variant={item.label} />}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full text-sm outline-none focus:outline-transparent items-center h-9 text-muted-foreground cursor-not-allowed text-balance "
            )}
          >
            {item.title}
            {item.label && <Badge className="ml-2" variant={item.label} />}
          </span>
        );
      })}
    </div>
  ) : null;
}

export default function Header(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sidebar-border/80 backdrop-blur-md bg-code-background/70 px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto",
          pathname?.startsWith("/docs") ? "container" : "max-w-5xl"
        )}
      >
        <div className="flex h-14 items-center w-full justify-between z-50 relative">
          {/*Large screen Nav*/}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <LargeLogo />
            </Link>
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-4 text-[13.5px] xl:gap-5"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `${link.label} (opens in new tab)`,
                  })}
                  className={cn(
                    "transition-colors text-sidebar-muted-foreground hover:text-foreground font-normal",
                    pathname?.startsWith(link.href)
                      ? "text-foreground"
                      : "text-sidebar-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/*Mobile nav*/}
          <div className="md:hidden flex gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open main menu"
                  aria-controls="mobile-navigation"
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-menu"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-border z-50 max-w-[17.5rem] sm:max-w-[17.5rem] bg-white dark:bg-black"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Use the options below to navigate the application.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100vh)]">
                  <Link
                    href="/"
                    rel="prefetch"
                    className="flex items-center gap-2 text-foreground px-6 py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <Logo />
                    <span className="font-bold pt-0.5 font-gilroy">
                      BadtzUI
                    </span>
                  </Link>
                  <div className="px-5 pb-4">
                    <DocsSearchbar />
                  </div>
                  <ScrollArea className="flex-1 px-6">
                    <nav
                      aria-label="Mobile navigation"
                      className="flex flex-col"
                    >
                      {links.map((item) => (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                          label={item.label}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                      {pathname?.startsWith("/docs") && (
                        <div className="flex flex-col">
                          {docsConfig.map(
                            (item: DocCategory, index: number) => (
                              <Collapsible
                                key={index}
                                className={cn("group/collapsible py-2")}
                              >
                                <div key={item.title}>
                                  <div>
                                    <CollapsibleTrigger className="flex w-full items-center justify-between text-sm">
                                      <span className="whitespace-nowrap text-sm">
                                        {item.title}
                                      </span>
                                      <ChevronDown
                                        size={12}
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                                      />
                                    </CollapsibleTrigger>
                                  </div>
                                </div>
                                <CollapsibleContent className="mt-2">
                                  {item?.items?.length && (
                                    <DocsSidebarNavItems
                                      items={item.items}
                                      pathname={pathname}
                                      onItemClick={() => setIsOpen(false)}
                                    />
                                  )}
                                </CollapsibleContent>
                              </Collapsible>
                            )
                          )}
                        </div>
                      )}
                    </nav>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm font-light">
            <DocGithubButton className="h-[30px]" />
            {!pathname?.startsWith("/docs") && (
              <div className="flex items-center gap-0">
                {!isHomePage && (
                  <DocModeToggle className="border-0 hover:bg-sidebar-accent bg-transparent" />
                )}
                <SocialButton
                  srOnly="Twitter Link"
                  src="https://x.com/badtz_ui"
                >
                  <Icons.twitter />
                </SocialButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
