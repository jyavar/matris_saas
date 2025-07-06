import "@/styles/mdx.css";

import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { allDocs } from "@/.contentlayer/generated";
import { BookmarkButton } from "@/components/docs/bookmark-button";
import DocsCta from "@/components/docs/doc-cta";
import { Mdx } from "@/components/docs/mdx-components/mdx-components";
import { DocsPager } from "@/components/docs/pager";
import { DashboardTableOfContents } from "@/components/docs/toc";
import { badgeVariants } from "@/components/ui/badge-shadcn";
import { siteConfig } from "@/config/site";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl,cn } from "@/lib/utils";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

interface TableOfContentsItem {
  title: string;
  url: string;
  items?: TableOfContentsItem[];
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: `BadtzUI - ${doc.title}`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
      creator: "@badtz",
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  const generateTocJsonLd = (items: TableOfContentsItem[]): any =>
    items.map((item: TableOfContentsItem) => ({
      "@type": "TableOfContents",
      name: item.title,
      url: absoluteUrl(item.url),
      itemListElement:
        item.items && item.items.length > 0
          ? generateTocJsonLd(item.items)
          : [],
    }));

  const tocJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: doc.title,
    hasPart: {
      "@type": "TableOfContents",
      itemListElement: toc?.items?.length ? generateTocJsonLd(toc.items) : [],
    },
  };

  return (
    <main className="relative bg-doc-background pt-10 lg:pt-16 pb-6 lg:gap-10 lg:pb-8 xl:grid xl:grid-cols-[1fr_300px] px-6 lg:px-8 lg:pr-0">
      <div className="mx-auto w-full min-w-0 max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="text-foreground">{doc.title}</div>
          </div>
          {/* JSON-LD Breadcrumb */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Docs",
                    item: absoluteUrl("/docs"),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: doc.title,
                    item: absoluteUrl(doc.slug),
                  },
                ],
              }),
            }}
          />
          <BookmarkButton title={doc.title}>
            <span className="md:block hidden">Bookmark</span>
          </BookmarkButton>
        </div>
        {/* JSON-LD Table of Contents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tocJsonLd, null, 2),
          }}
        />
        <div className="flex flex-col gap-3">
          <h1 className={cn("scroll-m-20 text-3xl font-gilroy tracking-tight")}>
            {doc.title}
          </h1>

          {doc.description && (
            <p className="text-[15px] text-muted-foreground text-balance">
              {doc.description}
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-10 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
          <DocsCta />
          <div className="h-full overflow-auto pb-10 pt-4 px-1.5">
            {doc.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </main>
  );
}
