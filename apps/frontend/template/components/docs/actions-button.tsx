"use client";

import { Bug, ChevronRight, FilePenLine, FlaskRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
}

function ActionButton({
  href,
  icon,
  label,
  isExternal = false,
}: ActionButtonProps) {
  return (
    <Link
      href={href}
      className="flex h-9 border border-sidebar-border dark:border-border whitespace-nowrap text-muted-foreground hover:text-foreground hover:border-foreground/10 hover:bg-secondary transition-colors duration-200 max-w-[240px] items-center justify-between rounded-md px-3 text-sm gap-2"
      {...(isExternal && { target: "_blank", rel: "noreferrer" })}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ChevronRight className="h-3.5 w-3.5" />
    </Link>
  );
}

export function ReportBugButton() {
  return (
    <ActionButton
      href="https://github.com/badtzx0/badtz-ui/discussions/categories/bug-reports"
      icon={<Bug className="h-3.5 w-3.5" />}
      label="Report a Bug"
      isExternal={true}
    />
  );
}

export function RequestComponentButton() {
  return (
    <ActionButton
      href="https://github.com/badtzx0/badtz-ui/discussions/categories/component-suggestions"
      icon={<FlaskRound className="h-3.5 w-3.5" />}
      label="Request a component"
      isExternal={true}
    />
  );
}

export function EditPageButton() {
  const pathname = usePathname();

  // Remove the leading slash, remove the first 'docs' occurrence, and convert to GitHub URL format
  const githubPath = pathname
    .replace(/^\//, "") // Remove leading slash
    .replace(/^docs\//, "") // Remove the first 'docs/' occurrence
    .replace(/\/$/, ""); // Remove trailing slash if exists

  const githubUrl = `https://github.com/badtzx0/badtz-ui/blob/main/content/docs/${githubPath}.mdx`;

  return (
    <ActionButton
      href={githubUrl}
      icon={<FilePenLine className="h-3.5 w-3.5" />}
      label="Edit this page"
      isExternal={true}
    />
  );
}
