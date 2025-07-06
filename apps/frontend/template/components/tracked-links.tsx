"use client";

import Link from "next/link";
import { usePlausible } from "next-plausible";

interface TrackedLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function TrackedLink({ href, label, className }: TrackedLinkProps) {
  const plausible = usePlausible();

  const handleClick = () => {
    if (href === "https://github.com/badtzx0/badtz-ui") {
      plausible("Clicked on GitHub Button");
    }
    if (href === "https://pro.badtz-ui.com") {
      plausible("Clicked on Pro");
    }
    if (href === "https://x.com/badtz_ui") {
      plausible("Clicked on Twitter");
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
}
