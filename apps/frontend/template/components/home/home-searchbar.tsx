"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { File, Monitor } from "lucide-react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

import { DialogTitle } from "../ui/dialog";

interface HomeSearchbarProps {
  className?: string;
}

export function HomeSearchbar(props: HomeSearchbarProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setTheme } = useTheme();

  const handleButtonClick = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        className={cn(
          "h-8 w-8 hover:bg-sidebar-accent transition-colors flex items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-foreground bg-transparent"
        )}
        onClick={handleButtonClick}
        {...props}
      >
        <Search size={16} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Command search</DialogTitle>
        </VisuallyHidden>
        <CommandInput
          ref={inputRef}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsConfig.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items
                .filter((navItem) => navItem.label !== "soon")
                .map((navItem) => (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.href));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <File className="h-3 w-3" />
                    </div>
                    {navItem.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-3 w-3" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-3 w-3" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor className="mr-2 h-3 w-3" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
