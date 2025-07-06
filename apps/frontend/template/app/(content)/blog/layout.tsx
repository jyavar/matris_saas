import Footer from "@/components/footer";
import Header from "@/components/header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-code-background">
      <Header />
      <main className="w-full flex justify-center">{children}</main>
      <Footer />
    </div>
  );
}
