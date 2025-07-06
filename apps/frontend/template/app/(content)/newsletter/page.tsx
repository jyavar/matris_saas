import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import NewsletterForm from "@/components/newsletter/subscribe-form";

export const metadata: Metadata = {
  title: "BadtzUI - Subscribe to Our Newsletter",
  description:
    "Join our exclusive community by subscribing to our newsletter. Stay updated with our shared experiences, new tool releases, valuable resources, and more!",
  openGraph: {
    title: "BadtzUI - Modern React Components",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SubscribeAction",
  name: "BadtzUI • Subscribe to Our Newsletter",
  description:
    "Join our exclusive community by subscribing to our newsletter. Stay updated with our shared experiences, new tool releases, valuable resources, and more!",
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
  potentialAction: {
    "@type": "SubscribeAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/subscribe`,
    expectsAcceptanceOf: {
      "@type": "Offer",
      category: "EmailSubscription",
    },
  },
  publisher: {
    "@type": "Organization",
    name: "BadtzUI",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/apple-icon.png`,
      width: 512,
      height: 512,
    },
  },
};

export default function NewsletterPage() {
  return (
    <div className="flex flex-col items-center justify-between w-full">
      <Header />
      <main
        id="main-content"
        aria-labelledby="page-title"
        role="main"
        className="min-h-[70vh] px-6 lg:px-8 pb-36 pt-28 w-full max-w-5xl text-center flex flex-col items-center justify-center"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1
          id="page-title"
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-foreground font-gilroy mt-8 md:mt-10"
        >
          Subscribe to our newsletter
        </h1>
        <p className="mt-4 text-balance max-w-[550px] md:max-w-[700px] tracking-tight lg:mt-6 sm:mt-3 text-muted-foreground text-base md:text-lg font-light md:mb-4">
          Join our exclusive community by subscribing to our newsletter and stay
          updated with our shared experiences, new tool releases, valuable
          resources, and more!
        </p>
        <div className="md:max-w-[400px] max-w-[300px] w-full">
          <NewsletterForm className="md:h-12 md:pr-12" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
