import { ReactNode } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";

interface ChangelogLayoutProps {
  children: ReactNode;
}

export default function ChangelogLayout({ children }: ChangelogLayoutProps) {
  return (
    <div className="bg-code-background">
      <Header />
      <div className="container w-full flex justify-center">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
