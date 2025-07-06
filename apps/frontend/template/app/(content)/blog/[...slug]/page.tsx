//TODO: Rework the Author (BAD) + Add "related articles"

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { allAuthors, allPosts, type Post } from "@/.contentlayer/generated";
import BunnyImage from "@/components/bunny-image";
import { DashboardTableOfContents } from "@/components/docs/article-toc";
import DocsCta from "@/components/docs/doc-cta";
import { Mdx } from "@/components/docs/mdx-components/mdx-components";
import { Icons } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Params = {
  slug: string[];
};

type Author = {
  _id: string;
  slug: string;
  title: string;
  avatar: string;
  twitter: string;
};

async function getPostFromParams(params: Params): Promise<Post | undefined> {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return undefined;
  }

  return post;
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", post.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");
  const postUrl = `https://www.badtz-ui.com/blog/${post.slugAsParams}`;

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostFromParams(params);
  if (!post) {
    notFound();
  }
  const toc = await getTableOfContents(post.body.raw);
  const authors = post.authors.map((author) => {
    const cleanedAuthor = author.trim();
    return allAuthors.find(({ slug }) => slug === `/authors/${cleanedAuthor}`);
  }) as Author[];

  const cleanedTags =
    post.tags?.map((tag) => tag.trim().replace("\r", "")) ?? [];

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(post.slugAsParams),
    },
    headline: post.title,
    description: post.description,
    image: absoluteUrl(`${post.image}` || "/og-image.png"),
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: post.authors.map((author) => ({
      "@type": "Person",
      name: author.trim(),
      url: absoluteUrl(`/blog/authors/${author.trim()}`),
    })),
    publisher: {
      "@type": "Organization",
      name: "BadtzUI",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    articleSection: "Blog",
    keywords: cleanedTags,
    url: absoluteUrl(post.slugAsParams),
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://badtz-ui.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://badtz-ui.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Article",
        item: `https://badtz-ui.com/blog/${post.slugAsParams}`,
      },
    ],
  };

  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slugAsParams !== post.slugAsParams &&
        p.tags?.some((tag) => post.tags?.includes(tag))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const jsonLdRelatedArticles = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related Articles",
    itemListElement: relatedPosts.map((related, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: related.title,
      url: absoluteUrl(`/blog/${related.slugAsParams}`),
    })),
  };

  return (
    <div className="w-full h-full pb-16">
      <div className="px-6 lg:px-8 lg:max-w-5xl mx-auto pt-10 md:pt-20 relative lg:gap-10 xl:grid xl:grid-cols-[1fr_240px]">
        <div className="max-w-xl mx-auto">
          <Link
            href="/blog"
            className="pl-3 pr-4 text-sm w-min mr-auto gap-2 px-2 md:pl-3 h-8 text-[13.5px] border hover:border-foreground/10 duration-300 whitespace-nowrap shrink-0 hover:bg-sidebar-accent transition-colors flex items-center justify-center rounded [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0 text-foreground bg-transparent mb-8"
          >
            <ChevronLeft />
            Back
          </Link>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Article</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdBreadcrumbs),
            }}
          />
          <article className="w-full mt-3 [&_p]:font-light [&_li]:font-base [&_h3]:text-2xl max-w-xl mx-auto">
            <div className="flex flex-col items-start">
              <h1 className="text-4xl font-semibold tracking-tighter text-foreground text-balance font-gilroy mt-3">
                {post.title}
              </h1>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="block text-xs text-muted-foreground mt-1"
                >
                  Published on {formatDate(post.date)}
                </time>
              )}
              {cleanedTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {cleanedTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-3 py-0.5 text-xs bg-muted/70 rounded-full border border-border hover:bg-muted transition-colors mt-1"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-balance mt-6">
              {post.description}
            </p>
            {post.image && (
              <BunnyImage
                src={post.image}
                alt={post.title}
                width={760}
                height={400}
                className="bg-secondary border border-border rounded-lg aspect-video object-cover w-full mb-6 mt-10"
                priority
              />
            )}
            <hr className="my-6 border-0" />
            <Mdx code={post.body.code} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLdArticle),
              }}
            />
          </article>

          {authors?.length ? (
            <div className="mt-1 flex space-y-4">
              {authors.map((author) =>
                author ? (
                  <div className="w-full bg-secondary/20 border rounded-lg p-5 mt-12 flex text-left flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-row w-full md:w-auto items-start md:flex-col gap-2 justify-between h-full">
                      <BunnyImage
                        src={author.avatar}
                        alt={author.title}
                        width={90}
                        height={90}
                        className="aspect-square object-cover bg-secondary border-border border rounded-full shrink-0"
                      />
                      <div className="flex items-center space-x-3">
                        <Link
                          key={author._id}
                          href={`https://twitter.com/${author.twitter}`}
                          target="_blank"
                          title={`View ${author.title}'s Twitter profile`}
                          className="flex [&_svg]:size-3.5 items-center gap-2 rounded-md px-2 aspect-square justify-center h-8 w-8 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0"
                        >
                          <Icons.twitter />
                        </Link>
                        <Link
                          href="https://github.com/badtzx0"
                          target="_blank"
                          title={`View ${author.title}'s Github profile`}
                          className="flex [&_svg]:size-4 items-center gap-2 rounded-md px-2 aspect-square justify-center h-8 w-8 text-sm border bg-secondary hover:border-foreground/10 transition-colors duration-300 whitespace-nowrap shrink-0"
                        >
                          <Icons.gitHub />
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mt-2">
                        Article written by{" "}
                        <Link
                          href="/blog/authors/badtz"
                          className="hover:underline"
                          title={`View all articles by ${author.title}`}
                        >
                          {author.title}
                        </Link>
                      </h3>
                      <h4 className="mt-1">Founder of BadtzUI</h4>
                      <p className="text-muted-foreground text-pretty text-[15px] mt-3">
                        Badtz is the <strong>Founder of BadtzUI</strong>. Badtz
                        focuses on crafting
                        <strong>
                          high-quality, accessible, and customizable UI
                          components
                        </strong>
                        to help developers build beautiful applications with
                        ease.
                      </p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : null}
          <h3 className="mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 font-gilroy mb-4">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
            {relatedPosts.map((post, index) => (
              <Link
                href={`/blog/${post.slugAsParams}`}
                key={`related-${post.slugAsParams}`}
              >
                <article
                  className="flex flex-col w-full p-2 rounded-xl transition-colors duration-200 group/article"
                  key={`article-${post.slugAsParams}`}
                >
                  {post.image && (
                    <BunnyImage
                      src={post.image}
                      alt={post.title}
                      width={760}
                      height={400}
                      className="aspect-video object-cover bg-secondary border-border border rounded-lg"
                      priority={index <= 1}
                      quality={100}
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
                    <div className="flex items-center space-x-1.5 text-sm mt-4">
                      <BunnyImage
                        src="/images/badtz-avatar-small.webp"
                        alt="Badtz Avatar"
                        width={20}
                        height={20}
                        className="rounded-full bg-secondary shrink-0 h-5 w-5 invert dark:invert-[0]"
                      />
                      <p className="text-sm text-sidebar-muted-foreground">
                        Badtz
                      </p>
                    </div>
                  </div>
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(jsonLdRelatedArticles),
                    }}
                  />
                </article>
              </Link>
            ))}
          </div>
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/blog"
              className="pl-3 pr-4 text-sm w-min mr-auto gap-2 px-2 md:px-3 h-8 text-[13.5px] border hover:border-foreground/10 duration-300 whitespace-nowrap shrink-0 hover:bg-sidebar-accent transition-colors flex items-center justify-center rounded [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0 text-foreground bg-transparent"
            >
              <ChevronLeft />
              All articles
            </Link>
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 -mt-6 max-h-[calc(100vh-3.5rem)] pt-4 overflow-y-auto">
            <DocsCta className="border-border dark:border-border" />
            <div className="h-full overflow-auto pb-10 pt-8">
              {toc && <DashboardTableOfContents toc={toc} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
