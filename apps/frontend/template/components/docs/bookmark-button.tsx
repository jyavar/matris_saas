"use client";

import { AnimationSequence, useAnimate } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePlausible } from "next-plausible";
import React, { useEffect,useState } from "react";

import { useBookmarks } from "@/hooks/bookmarks-context";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

const Icon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className={cn("w-4 h-4", className)}
    fill="currentColor"
  >
    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
  </svg>
);

interface BookmarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  iconCount?: number;
  title?: string;
}

export function BookmarkButton({
  className,
  children,
  iconCount = 20,
  title,
  ...props
}: BookmarkButtonProps) {
  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [liked, setLiked] = useState<boolean>(false);
  const plausible = usePlausible();

  useEffect(() => {
    setLiked(isBookmarked(pathname));
  }, [pathname, isBookmarked]);

  const randomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const handleClick = () => {
    setLiked(!liked);

    if (!liked) {
      addBookmark({ title: title || "", href: pathname });
      plausible("Bookmarked", {
        props: {
          title: title || "",
          path: pathname,
          action: "add",
        },
      });
      const icons = Array.from({ length: iconCount });
      const iconsAnimation = icons.map((_, index) => [
        `.icon-${index}`,
        {
          x: randomNumber(-100, 100),
          y: randomNumber(-100, 100),
          opacity: [1, 0],
          scale: [randomNumber(1, 1.5), 0],
        },
        {
          duration: 0.7,
          at: "<",
        },
      ]);

      const iconsReset = icons.map((_, index) => [
        `.icon-${index}`,
        {
          x: 0,
          y: 0,
        },
        {
          duration: 0.000001,
        },
      ]);

      animate([...iconsReset, ...iconsAnimation] as AnimationSequence);
    } else {
      removeBookmark(pathname);
      plausible("Bookmarked", {
        props: {
          title: title || "",
          path: pathname,
          action: "remove",
        },
      });
    }
  };

  return (
    <div ref={scope} className="relative">
      <button
        onClick={handleClick}
        className={cn(
          "h-[30px] px-2 border border-sidebar-border text-[13.5px] font-medium text-sidebar-muted-foreground !hover:text-sidebar-primary-foreground bg-doc-background md:hover:bg-transparent dark:hover:bg-sidebar-primary transition-colors flex items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 shadow-none group/contribute gap-2",
          className
        )}
        {...props}
      >
        <Icon
          className={
            liked ? "text-[#f34e52]" : "dark:text-neutral-800 text-neutral-200"
          }
        />
        {children}
        <span aria-hidden className="absolute inset-0 pointer-events-none">
          {Array.from({ length: iconCount }).map((_, index) => (
            <Icon
              key={index}
              className={`absolute left-1/2 top-1/2 opacity-0 text-[#f34e52] icon-${index}`}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
