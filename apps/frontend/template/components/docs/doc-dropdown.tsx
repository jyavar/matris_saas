"use client";

import { ChevronDown, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DocDropdown() {
  const pathname = usePathname();

  const githubBaseUrl = "https://github.com/badtzx0/badtz-ui/blob/main/content";
  const githubEditUrl = `${githubBaseUrl}${pathname}.mdx`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-[30px] px-2 border border-sidebar-border text-[13.5px] font-medium !text-sidebar-primary-foreground bg-doc-background hover:bg-transparent dark:hover:bg-sidebar-primary transition-colors flex items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 shadow-none group/contribute">
          <HeartHandshake className="group-hover/contribute:animate-handshake text-sidebar-muted-foreground group-hover/contribute:text-sidebar-primary-foreground transition-colors" />
          <span className="lg:pt-[2px]">Contribute</span>
          <ChevronDown className="ml-1 text-sidebar-muted-foreground group-hover/contribute:text-sidebar-primary-foreground transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-sidebar-border mb-4 shadow-sm mr-2"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>GitHub</DropdownMenuSubTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={githubEditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edit this Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/badtzx0/badtz-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/component-suggestions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a component
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/bug-reports"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a Bug
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/badtzx0/badtz-ui/discussions/categories/general"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
