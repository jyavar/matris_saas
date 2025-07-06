import { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
export const metadata: Metadata = {
  title: "BadtzUI • Privacy Policy",
  description:
    "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Daily updates. Open source. React, Tailwind, TypeScript & JavaScript.",
  metadataBase: new URL("https://badtz-ui.com"),
  openGraph: {
    title: "BadtzUI - Privacy Policy",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BadtzUI - Privacy Policy",
    description:
      "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Daily updates. Open source. React, Tailwind, TypeScript & JavaScript.",
    images: [{ url: "/twitter-image.jpg", width: 1200, height: 675 }],
    site: "@badtz_ui",
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto">
        <div className="pt-20 pb-24 md:px-8 px-6">
          <h1 className="text-3xl font-gilroy">Privacy Policy for BadtzUI</h1>

          <pre className="leading-relaxed whitespace-pre-wrap font-mono text-sm mt-6">
            {`
1. Privacy Policy

Last updated on February 25, 2025

This Privacy Policy ("Policy") describes how Badtz ("we", "us", or "our") collects, uses, and protects any personal information you ("User", "you", or "your") provide when using the BadtzUI website ("Website").

1.1 Information We Collect

1.1.1 Personal Information
- We only collect email addresses when users voluntarily subscribe to our newsletter via the /newsletter page.

1.1.2 Non-Personal Information
- We use Plausible Analytics — a privacy-friendly analytics tool that does not use cookies or collect personal data. It helps us understand which components are most popular to better serve our users.

1.2 How We Use Your Information

- To send newsletter updates if you opt-in.
- To improve BadtzUI based on user interaction data (collected anonymously via Plausible).

We do not sell, rent, or trade your information.

1.3 Data Storage & Security

- Our website is hosted on Vercel, ensuring a secure and scalable infrastructure.
- We do not store any personal data beyond newsletter subscriptions.

1.4 User Rights

- Since we only collect emails for the newsletter, users can unsubscribe at any time via the unsubscribe link provided in the newsletter emails.
- There is no option to request data deletion as we do not store additional personal data.

1.5 Children's Privacy

- BadtzUI is accessible to all, including minors, but it is not specifically targeted at children under 13.
- We do not knowingly collect personal data from children.

1.6 External Links

- Our site may link to third-party platforms like Twitter (https://x.com/badtz_ui). We are not responsible for the privacy practices of external sites.

1.7 Changes to This Policy

We may update this Privacy Policy occasionally. All changes will be posted on this page with an updated revision date. Continued use of the Website constitutes acceptance of any changes.

1.8 Contact Us

For any questions regarding this Privacy Policy, you can reach us at:
- Email: contact@badtz-ui.com
- Twitter: @badtz_ui (https://x.com/badtz_ui)

Thank you for trusting BadtzUI.
            `}
          </pre>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
