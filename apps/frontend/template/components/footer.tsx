//TODO: All pages...

import Link from "next/link";
import * as React from "react";

import { LargeLogo } from "@/components/logo";
import NewsletterForm from "@/components/newsletter/subscribe-form";
import { TrackedLink } from "@/components/tracked-links";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface LinkType {
  href: string;
  label: string;
  itemProp?: string;
}

interface LinkSectionProps {
  title: string;
  links: LinkType[];
}

const CURRENT_YEAR = new Date().getFullYear();

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => {
  return (
    <nav
      aria-label={title}
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="flex flex-col md:text-sm">
        <h3 className="font-medium text-foreground mb-6" itemProp="name">
          {title}
        </h3>
        <ul className="space-y-3 text-muted-foreground">
          {links.map(({ href, label }) => {
            const isTracked =
              href === "https://github.com/badtzx0/badtz-ui" ||
              href === "https://pro.badtz-ui.com" ||
              href === "https://x.com/badtz_ui";

            const isExternal = href === "https://pro.badtz-ui.com";
            const isSocial =
              href === "https://discord.com/invite/SV2y7vz6Es" ||
              href === "https://x.com/badtz_ui";

            return (
              <li key={href}>
                {isTracked ? (
                  <TrackedLink
                    href={href}
                    label={label}
                    className="text-sidebar-muted-foreground hover:text-foreground transition-colors duration-200"
                  />
                ) : (
                  <Link
                    href={href}
                    target={isExternal || isSocial ? "_blank" : undefined}
                    rel={isSocial ? "noopener noreferrer" : undefined}
                    className="text-sidebar-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

const FOOTER_SECTIONS: { title: string; links: LinkType[] }[] = [
  {
    title: "Products",
    links: [
      { href: "/docs", label: "Components" },
      { href: "/changelog", label: "Changelog" },
      { href: "/docs/templates/mappl-saas-template", label: "Templates" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/tos", label: "Terms of Service" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://discord.com/invite/SV2y7vz6Es", label: "Discord" },
      { href: "https://x.com/badtz_ui", label: "Twitter" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "https://pro.badtz-ui.com", label: "BadtzUI Pro" }],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-sidebar-border/50 w-full"
      aria-label="Footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="px-6 lg:px-8 pb-12 pt-12 max-w-5xl mx-auto"
        itemScope
        itemType="https://schema.org/Organization"
        itemID="#organization"
      >
        <meta itemProp="name" content="BadtzUI" />
        <link itemProp="url" href={baseUrl} />
        <meta itemProp="logo" content={`${baseUrl}/static/badtz-ui-logo.png`} />

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
          <div className="flex flex-col space-y-4">
            <LargeLogo />
            <p
              className="md:text-sm text-sidebar-muted-foreground"
              itemProp="description"
            >
              Built in public by{" "}
              <Link
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:underline underline-offset-2"
                href="https://x.com/badtz_ui"
                itemProp="founder"
              >
                Badtz
              </Link>
              <br />
              with{" "}
              <span
                aria-label="Component library"
                data-tooltip="Custom React components"
                className="cursor-default py-0.5 px-1 text-xs bg-sidebar border border-sidebar-border rounded-md font-mono"
              >
                BadtzUI
              </span>
            </p>
            <p
              className="md:text-sm text-sidebar-muted-foreground mt-2"
              itemProp="slogan"
            >
              Here you can subscribe
              <br />
              to our newsletter.
            </p>
            <NewsletterForm />
            <a
              href="https://www.producthunt.com/posts/badtzui?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-badtzui"
              target="_blank" rel="noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=956559&theme=dark&t=1745353693431"
                alt="BadtzUI - A&#0032;free&#0032;and&#0032;open&#0045;source&#0032;React&#0032;component&#0032;library | Product Hunt"
                style={{ width: "185px", height: "40px" }}
                width="185"
                height="40"
              />
            </a>
            <div itemScope itemType="https://schema.org/ContactPoint">
              <meta itemProp="email" content="contact@badtz-ui.com" />
              <meta itemProp="contactType" content="customer service" />
              <meta itemProp="url" content={baseUrl} />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-auto">
            {FOOTER_SECTIONS.map((section) => (
              <LinkSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
        <p
          className="text-xs text-sidebar-muted-foreground mt-10"
          itemScope
          itemType="https://schema.org/CreativeWork"
        >
          <meta itemProp="copyrightYear" content={CURRENT_YEAR.toString()} />
          <span itemProp="copyrightHolder">© {CURRENT_YEAR} BadtzUI.</span> All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
