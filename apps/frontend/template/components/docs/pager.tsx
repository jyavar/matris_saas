"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

type Doc = {
  slug: string;
  title: string;
};

type Pager = {
  prev: LinkItem | null;
  next: LinkItem | null;
};

type LinkItem = {
  href: string;
  title: string;
  label?: string;
  disabled?: boolean;
  items?: LinkItem[];
};

export function DocsPager({ doc }: { doc: Doc }) {
  const pager = getPagerForDoc(doc);
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && pager?.prev?.href) {
        e.preventDefault();
        router.push(pager.prev.href);
      }
      if (e.key === "ArrowRight" && pager?.next?.href) {
        e.preventDefault();
        router.push(pager.next.href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pager]);

  if (!pager) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-6",
        !pager?.prev?.href && "justify-end"
      )}
    >
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className=" flex flex-col items-start gap-2 border border-sidebar-border rounded-md py-2 px-3 md:px-3 md:py-3 w-min md:w-1/2 md:text-left hover:bg-sidebar transition-colors duration-200"
        >
          <div className="flex flex-row items-center text-sm text-sidebar-muted-foreground md:gap-0 gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </div>

          <span className="md:block hidden font-medium">
            {pager.prev.title}
          </span>
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className=" flex flex-col items-end gap-2 border border-sidebar-border rounded-md py-2 px-3 md:px-3 md:py-3 w-min md:w-1/2 md:text-right hover:bg-sidebar transition-colors duration-200"
        >
          <div className="flex flex-row items-center text-sm text-sidebar-muted-foreground md:gap-0 gap-1">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </div>
          <span className="md:block hidden font-medium">
            {pager.next.title}
          </span>
        </Link>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: doc.title,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                  pager.prev
                    ? {
                        "@type": "ListItem",
                        position: 1,
                        name: pager.prev.title,
                        url: pager.prev.href,
                      }
                    : null,
                  pager.next
                    ? {
                        "@type": "ListItem",
                        position: 2,
                        name: pager.next.title,
                        url: pager.next.href,
                      }
                    : null,
                ].filter(Boolean),
              },
            },
            null,
            2
          ),
        }}
      />
    </div>
  );
}

export function getPagerForDoc(doc: Doc): Pager {
  const flattenedLinks = [
    null,
    ...flatten(docsConfig.flatMap((category) => category.items)),
    null,
  ];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );

  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: LinkItem[]): LinkItem[] {
  let result: LinkItem[] = [];

  links.forEach((link) => {
    if (link.href && link.label !== "soon") {
      result.push(link);
    }
    if (Array.isArray(link.items) && link.items.length > 0) {
      result = result.concat(flatten(link.items));
    }
  });

  return result.filter((link) => !link?.disabled);
}
