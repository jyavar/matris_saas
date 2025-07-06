import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BadtzUI • Unsubscribe from Newsletter",
  description: "Manage your newsletter preferences and unsubscribe if needed.",
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
