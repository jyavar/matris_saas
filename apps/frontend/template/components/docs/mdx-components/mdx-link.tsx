import { ReactNode } from "react";

import Link from "@/node_modules/next/link";

interface MdxLinkProps {
  children: ReactNode;
  href: string;
}

export function MdxLink({ children, href }: MdxLinkProps) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-block underline underline-offset-2"
    >
      {children}
    </Link>
  );
}
