//TODO: everything, (bad)

import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { allPosts } from "@/.contentlayer/generated";
import BunnyImage from "@/components/bunny-image";
import { Icons } from "@/components/icons";
import { formatDate } from "@/lib/utils";
export const metadata: Metadata = {
  title: "BadtzUI • Author: Badtz",
  description:
    "Discover articles by Badtz, the founder of BadtzUI. Sharing insights on UI components, React, design systems, and frontend development.",
  alternates: {
    canonical: "https://www.badtz-ui.com/blog/authors/badtz",
  },
};

export default function AuthorPage() {
  const articles = allPosts.filter((post) =>
    post.authors.some((author) => author.trim() === "badtz")
  );

  return (
    <>
      <div className="w-full h-full pb-16 sm:pb-28 min-h-[80dvh]">
        <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto pt-10 md:pt-16 relative">
          <Link
            href="/blog"
            className="pl-3 pr-4 text-sm w-min mr-auto gap-2 px-2 md:pl-3 h-8 text-[13.5px] border hover:border-foreground/10 duration-300 whitespace-nowrap shrink-0 hover:bg-sidebar-accent transition-colors flex items-center justify-center rounded [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0 text-foreground bg-transparent mb-8"
          >
            <ChevronLeft />
            Back
          </Link>
          <div className="mt-8 flex items-start flex-col">
            <BunnyImage
              src="/images/badtz-author.webp"
              alt="Badtz"
              width={80}
              height={80}
              className="rounded-full mr-auto border-border border"
            />
            <h1 className="text-3xl font-semibold tracking-tighter text-foreground text-balance max-w-[605px] font-gilroy mt-6">
              Badtz
            </h1>
            <p className="mt-4 text-balance md:max-w-[400px] tracking-tight text-sidebar-muted-foreground text-[15px]">
              Founder of BadtzUI – Crafting high-quality, accessible UI
              components for React developers.
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <Link
                href={`https://twitter.com/badtz_ui`}
                target="_blank"
                title={`View badtz's Twitter profile`}
                className="flex [&_svg]:size-3.5 items-center gap-2 rounded-md px-2 aspect-square justify-center h-8 w-8 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                <Icons.twitter />
              </Link>
              <Link
                href="https://github.com/badtzx0"
                target="_blank"
                title={`View badtz's Github profile`}
                className="flex [&_svg]:size-3.5 items-center gap-2 rounded-md px-2 aspect-square justify-center h-8 w-8 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                <Icons.gitHub />
              </Link>
            </div>
          </div>
          <hr className="my-6" />
          {articles?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
              {articles.map((post, index) => (
                <Link href={`/blog/${post.slugAsParams}`} key={post._id}>
                  <article className="flex flex-col w-full p-2 rounded-xl transition-colors duration-200 group/article">
                    {post.image && (
                      <BunnyImage
                        src={post.image}
                        alt={post.title}
                        width={760}
                        height={400}
                        className="aspect-video object-cover bg-secondary border-border border rounded-lg"
                        priority={index <= 1}
                      />
                    )}
                    <div className="pt-2.5 p-1">
                      <h2 className="group-hover/article:text-foreground mt-2 font-medium transition-colors duration-300 text-xl text-sidebar-foreground font-gilroy">
                        {post.title}
                      </h2>
                      {post.date && (
                        <p className="text-xs text-sidebar-muted-foreground mt-1.5">
                          {formatDate(post.date)}
                        </p>
                      )}
                      {post.description && (
                        <p className="mt-3 text-sm text-sidebar-muted-foreground text-prose">
                          {post.description.length > 140
                            ? `${post.description.slice(0, 140)}...`
                            : post.description}
                        </p>
                      )}

                      <div className="flex items-center space-x-1.5 text-sm mt-3">
                        <BunnyImage
                          src="/images/badtz-avatar-small.webp"
                          alt="Author Avatar"
                          width={20}
                          height={20}
                          className="rounded-full bg-secondary shrink-0 h-5 w-5 invert dark:invert-[0]"
                        />
                        <p className="text-sm text-sidebar-muted-foreground">
                          Badtz
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-6">
              No posts published by this author.
            </p>
          )}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Badtz",
                image: "/images/badtz-author.webp",
                description:
                  "Founder of BadtzUI – Crafting high-quality, accessible UI components for React developers.",
                url: "https://badtz-ui.com/blog/authors/badtz",
                sameAs: ["https://twitter.com/badtz_ui"],
              }),
            }}
          />
        </div>
      </div>
    </>
  );
}
