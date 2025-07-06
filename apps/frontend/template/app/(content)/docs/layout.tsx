import { BookmarksWrapper } from "@/components/docs/bookmarks-wrapper";
import { DocNav } from "@/components/docs/doc-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { docsConfig } from "@/config/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = docsConfig.map((category) => ({
    ...category,
    href: `#${category.title.toLowerCase().replace(/\s+/g, "-")}`,
    items: category.items.map((item) => ({
      ...item,
      href: item.href,
      items: item.items || [],
    })),
  }));

  return (
    <BookmarksWrapper>
      <div className="bg-doc-background">
        <DocNav items={navItems}>{children}</DocNav>
      </div>
    </BookmarksWrapper>
  );
}
