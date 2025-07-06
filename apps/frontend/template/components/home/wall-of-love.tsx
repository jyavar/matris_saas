import Link from "next/link";

import BunnyImage from "@/components/bunny-image";
import { Icons } from "@/components/icons";
import { Marquee } from "@/components/ui/marquee";
import { SvgLines } from "@/components/ui/svg-lines";
const items = [
  {
    name: "Vexoa",
    title: "Indie Developer",
    image: "/images/components/avatar-proof/avatar-4.webp",
    body: "I've been using this UI library for months, its been great. Highly recommend it. Goodluck badtz",
  },
  {
    name: "Badtz",
    title: "Founder of BadtzUI",
    image: "/images/components/avatar-proof/avatar-1.webp",
    body: "This space is waiting for your story. How has BadtzUI helped your project?",
  },
  {
    name: "Badtz",
    title: "Founder of BadtzUI",
    image: "/images/components/avatar-proof/avatar-5.webp",
    body: "Be the first to share your thoughts! Your experience matters to our community.",
  },
  {
    name: "Badtz",
    title: "Founder of BadtzUI",
    image: "/images/components/avatar-proof/avatar-2.webp",
    body: "Your voice could inspire others. Tell us how BadtzUI made a difference for you.",
  },
];

function SectionTitle() {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#7876c5]/20 to-[#7876c5]/40" />
      <h2 className="text-4xl md:text-[44px]/[40px] pb-2 font-semibold tracking-tighter bg-gradient-to-b from-white/80 via-white to-white/60 inline-block text-transparent bg-clip-text text-balance max-w-[605px] min-w-[220px] md:min-w-[550px] font-gilroy w-full">
        Open Source, Built Together
      </h2>
      <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#7876c5]/20 to-[#7876c5]/40" />
    </div>
  );
}

function DescriptionWithDecorations() {
  return (
    <div className="relative">
      <p className="text-pretty md:text-balance max-w-[550px] md:max-w-[700px] tracking-tight text-sidebar-muted-foreground text-base mt-3">
        BadtzUI is an open-source project where everyone can contribute. Join
        our community, suggest improvements, and help shape the future of this
        UI library!
      </p>
      <div
        className="absolute top-[10px] left-[10px] w-[195px] h-[200px] md:block hidden pointer-events-none"
        aria-hidden="true"
      >
        <SvgLines
          path="M1 0V79.1111C1 96.7842 15.3269 111.111 33 111.111H162C179.673 111.111 194 125.438 194 143.111V200"
          viewBox="0 0 195 200"
          pathColor="#7876c5"
          pathOpacity={0.35}
          gradientStartColor="#7876c5"
          gradientStopColor="#7876c570"
          duration={2}
        />
      </div>
      <div
        className="absolute top-[10px] left-[-20px] w-[195px] h-[200px] md:block hidden pointer-events-none"
        aria-hidden="true"
      >
        <SvgLines
          path="M1 0V49.1111C1 66.7842 15.3269 81.1111 33 81.1111H162C179.673 81.1111 194 95.438 194 113.111V200"
          viewBox="0 0 195 200"
          pathColor="#7876c5"
          pathOpacity={0.35}
          gradientStartColor="#7876c5"
          gradientStopColor="#7876c570"
          duration={2}
        />
      </div>
      <div
        className="absolute top-[10px] right-[10px] w-[195px] h-[200px] md:block hidden pointer-events-none"
        aria-hidden="true"
      >
        <SvgLines
          path="M194 0V79.1111C194 96.7842 179.673 111.111 162 111.111H33C15.3269 111.111 1 125.438 1 143.111V200"
          viewBox="0 0 195 200"
          pathColor="#7876c5"
          pathOpacity={0.35}
          gradientStartColor="#7876c5"
          gradientStopColor="#7876c570"
          duration={2}
        />
      </div>
      <div
        className="absolute top-[10px] right-[-20px] w-[195px] h-[200px] md:block hidden pointer-events-none"
        aria-hidden="true"
      >
        <SvgLines
          path="M194 0V49.1111C194 66.7842 179.673 81.1111 162 81.1111H33C15.3269 81.1111 1 95.438 1 113.111V200"
          viewBox="0 0 195 200"
          pathColor="#7876c5"
          pathOpacity={0.35}
          gradientStartColor="#7876c5"
          gradientStopColor="#7876c570"
          duration={2}
        />
      </div>
    </div>
  );
}

function GitHubButton() {
  return (
    <Link
      href="https://github.com/badtzx0/badtz-ui"
      target="_blank"
      rel="noopener noreferrer"
      className="h-9 px-4 shadow-sm font-medium text-sm rounded-xl bg-foreground text-background hover:bg-foreground/85 flex items-center relative transition-colors duration-300 mt-8 [&_svg]:size-4 [&_svg]:shrink-0 gap-2"
    >
      <Icons.gitHub />
      Star Us on GitHub
    </Link>
  );
}

function TestimonialCard({ item }: { item: (typeof items)[number] }) {
  return (
    <div className="relative h-full w-[20rem] rounded-xl border border-[#7876c5]/20 hover:border-[#7876c5]/30 transition-colors duration-200 p-3.5 flex flex-col justify-start items-start accent-shadow gap-2">
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <BunnyImage
            src={item.image}
            alt={item.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-foreground">{item.name}</div>
          <div className="text-xs text-sidebar-muted-foreground">
            {item.title}
          </div>
        </div>
      </div>
      <div className="text-sm text-sidebar-muted-foreground">{item.body}</div>
    </div>
  );
}

export default function WallOfLove() {
  return (
    <section className="w-full h-full py-12 relative after:absolute after:inset-x-6 after:-inset-y-10 after:bg-accent/[0.05] after:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] z-[5] after:pointer-events-none">
      <div className="mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <div className="flex flex-col items-center justify-center px-6 w-full relative after:absolute after:inset-x-0 after:bottom-[-115px] after:h-20 after:bg-gradient-to-b after:from-transparent after:via-doc-background after:to-transparent after:pointer-events-none md:after:block after:hidden">
          <SectionTitle />
          <DescriptionWithDecorations />
          <GitHubButton />
        </div>
      </div>
      <div className=" overflow-hidden mt-10 md:mt-16 relative z-10 max-w-5xl mx-auto">
        <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-doc-background to-transparent z-10"></div>
        <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-doc-background z-10"></div>
        <Marquee className="py-2" direction="left">
          {[...items, ...items].map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </Marquee>
        <Marquee className="py-2" direction="right">
          {[...items, ...items].map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
