import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="w-full max-w-5xl mx-auto h-full md:pt-36 pt-24 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center flex flex-col items-center relative">
          <h2 className="text-4xl md:text-[44px]/[40px] pb-2 font-semibold tracking-tighter bg-gradient-to-b from-white/80 via-white to-white/60 inline-block text-transparent bg-clip-text text-balance max-w-[605px] font-gilroy relative z-10">
            Frequently asked questions
          </h2>
          <p className="text-balance max-w-[550px] md:max-w-[700px] tracking-tight text-sidebar-muted-foreground text-base mt-3 relative z-10">
            Browse through our most common questions. Can't find what you're
            looking for? Our team is here to help you.
          </p>
        </div>
        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full relative z-10">
            <AccordionItem
              value="item-1"
              className="px-4 border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200 rounded-xl accent-shadow overflow-hidden mb-3 bg-doc-background/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-[15px] gap-4 text-left text-foreground">
                What are UI components and how can they enhance my landing page?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-sidebar-muted-foreground text-left">
                UI components are pre-built, reusable interface elements
                designed to create stunning landing pages quickly. Our library
                offers a comprehensive collection of modern, customizable
                components that help developers and designers build
                professional-looking websites with minimal effort. From hero
                sections to feature cards, we provide everything you need for a
                high-converting landing page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="px-4 border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200  rounded-xl accent-shadow overflow-hidden mb-3 bg-doc-background/70 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-[15px] gap-4 text-left text-foreground">
                Is this UI component library free and open source?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-sidebar-muted-foreground text-left">
                Yes! Our entire UI component library is completely free and open
                source under the MIT license. You can use, modify, and
                distribute our components for both personal and commercial
                projects without any costs. We believe in giving back to the
                developer community while maintaining high-quality standards in
                our components.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="px-4 border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200  rounded-xl accent-shadow overflow-hidden mb-3 bg-doc-background/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-[15px] gap-4 text-left text-foreground">
                How customizable are these landing page UI components?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-sidebar-muted-foreground text-left">
                Our UI components are highly customizable through Tailwind CSS
                classes and design tokens. You can easily modify colors,
                typography, spacing, and animations to match your brand
                identity. Each component is built with flexibility in mind,
                allowing you to create unique designs while maintaining
                consistency across your landing page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="px-4 border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200  rounded-xl accent-shadow overflow-hidden mb-3 bg-doc-background/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-[15px] gap-4 text-left text-foreground">
                Are these UI components optimized for performance and SEO?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-sidebar-muted-foreground text-left">
                Absolutely! Our components are built with performance in mind,
                using React Server Components when possible and implementing
                best practices for web vitals. They're lightweight, accessible,
                and SEO-friendly by default. We ensure semantic HTML structure
                and proper meta tags support to help your landing page rank
                better in search engines.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="px-4 border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200  rounded-xl accent-shadow overflow-hidden mb-3 bg-doc-background/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-[15px] gap-4 text-left text-foreground">
                How do I get started with these landing page UI components?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-sidebar-muted-foreground text-left">
                Getting started is simple! You have two convenient options:
                either use our CLI to add components directly to your project,
                or simply copy and paste the component code you need from our
                documentation. Each component comes with clear instructions and
                can be easily customized using Tailwind CSS classes. Our
                components are designed to work seamlessly with Next.js and
                React, making implementation straightforward for developers of
                all skill levels.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
