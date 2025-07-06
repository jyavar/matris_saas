"use client";

import { BookmarksProvider } from "@/hooks/bookmarks-context";

export function BookmarksWrapper({ children }: { children: React.ReactNode }) {
  return <BookmarksProvider>{children}</BookmarksProvider>;
}
