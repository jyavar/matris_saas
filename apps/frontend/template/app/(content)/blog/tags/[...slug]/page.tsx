import Link from "next/link";
import { notFound } from "next/navigation";

import { allPosts, type Post } from "@/.contentlayer/generated";
import BunnyImage from "@/components/bunny-image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const tag = params.slug.join(" ").replace("-", " ");
  const tagUrl = `https://www.badtz-ui.com/blog/tags/${params.slug.join("-")}`;

  return {
    title: `BadtzUI • Posts tagged "${tag}"`,
    description: `Explore all blog posts related to "${tag}" published on BadtzUI.`,
    alternates: {
      canonical: tagUrl,
    },
  };
}

export async function generateStaticParams() {
  const tags = new Set(
    allPosts.flatMap((post) =>
      post.tags
        ? post.tags.map((tag) => tag.trim().toLowerCase().replace(/\s+/g, "-"))
        : []
    )
  );
  return Array.from(tags).map((tag) => ({ slug: [tag] }));
}

export default async function TagPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const tag = params.slug.join("/");
  const postsWithTag = allPosts.filter((post) =>
    post.tags
      ? post.tags
          .map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"))
          .includes(tag)
      : false
  );

  if (postsWithTag.length === 0) {
    notFound();
  }

  const jsonLdTag = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Posts tagged "${tag}"`,
    url: `https://badtz-ui.com/blog/tags/${params.slug.join("-")}`,
    description: `Discover all articles related to "${tag}" on BadtzUI.`,
    hasPart: postsWithTag.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://badtz-ui.com/blog/${post.slugAsParams}`,
      datePublished: post.date,
      author: post.authors.map((author) => ({
        "@type": "Person",
        name: author.trim(),
        url: `https://badtz-ui.com/blog/authors/${author.trim()}`,
      })),
      publisher: {
        "@type": "Organization",
        name: "BadtzUI",
        logo: {
          "@type": "ImageObject",
          url: "https://badtz-ui.com/logo.png",
        },
      },
    })),
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
        name: `Tag: ${tag}`,
        item: `https://badtz-ui.com/blog/tags/${params.slug.join("-")}`,
      },
    ],
  };

  return (
    <div className="w-full h-full pb-16 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTag) }}
      />
      <div className="px-6 lg:px-8 lg:max-w-6xl mx-auto pt-10 md:pt-20 relative">
        <div>
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
                <BreadcrumbPage>Tags</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdBreadcrumbs),
            }}
          />

          <h1 className="text-4xl/[2.75rem] md:text-5xl/[3.5rem] font-semibold tracking-tighter text-foreground text-balance font-gilroy mt-12 max-w-[605px]">
            Articles tagged with "{tag}"
          </h1>
          <div className="mt-8">
            {postsWithTag.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
                {postsWithTag.map((post, index) => (
                  <Link
                    href={`/blog/${post.slugAsParams}`}
                    key={post.slugAsParams}
                  >
                    <article className="flex flex-col w-full p-2 rounded-xl transition-colors duration-200 group/article">
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
                        <h2 className="group-hover/article:text-foreground text-lg mt-2 font-medium text-foreground/70 transition-colors duration-300">
                          {post.title}
                        </h2>
                        {post.date && (
                          <p className="text-xs text-muted-foreground mt-1.5">
                            Published on {formatDate(post.date)}
                          </p>
                        )}
                        {post.description && (
                          <p className="mt-3 text-sm text-muted-foreground text-prose font-light">
                            {post.description.length > 140
                              ? `${post.description.slice(0, 140)}...`
                              : post.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-1.5 text-sm mt-4">
                          <BunnyImage
                            src="/images/badtz-avatar-small.webp"
                            alt="Twitter Logo"
                            width={20}
                            height={20}
                            className="rounded-full bg-secondary shrink-0 h-5 w-5 invert dark:invert-[0]"
                          />
                          <p className="font-light text-sm text-thin text-muted-foreground">
                            Badtz
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No posts published.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
