"use client";

import NumberFlow, { useCanAnimate } from "@number-flow/react";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { useEffect,useState } from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const MotionNumberFlow = motion.create(NumberFlow);
const ANIMATION_DURATION = 900;

export function DocGithubButton({ className }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const canAnimate = useCanAnimate();

  const generateRandomNumber = (length: number) => {
    const targetLength = length + 2;
    const min = Math.pow(10, targetLength - 1);
    const max = Math.pow(10, targetLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const animateValue = (value: number) => {
    const randomValue = generateRandomNumber(value.toString().length);
    setDisplayValue(randomValue);
    setTimeout(() => setDisplayValue(value), ANIMATION_DURATION);
  };

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/badtzx0/badtz-ui"
        );
        const data = await response.json();
        setStars(data.stargazers_count);
        setDisplayValue(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <MotionConfig
      transition={{
        layout: canAnimate
          ? { duration: ANIMATION_DURATION / 1000, bounce: 0, type: "spring" }
          : { duration: 0 },
      }}
    >
      <Link
        target="_blank"
        href="https://github.com/badtzx0/badtz-ui"
        onMouseEnter={() => stars && animateValue(stars)}
      >
        <motion.span
          className={cn(
            "inline-flex items-center h-[30px] pl-2 pr-3 text-[13.5px] font-medium !text-white dark:!text-black bg-foreground hover:bg-foreground/95 transition-colors duration-300 rounded-lg [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 shadow-none group/contribute gap-2 overflow-hidden",
            className
          )}
          layout
        >
          <Icons.gitHub className="dark:text-[#59595b] text-[#949597] dark:group-hover/contribute:text-black group-hover/contribute:text-white transition-colors duration-300" />
          <span className="pt-[1px] lg:pt-[2px]">GitHub Stars</span>
          {displayValue !== null && (
            <MotionNumberFlow
              value={displayValue}
              className="font-semibold pt-[1px] text-right"
              format={{ style: "decimal", useGrouping: true }}
              style={
                {
                  "--number-flow-char-height": "0.85em",
                  "--number-flow-mask-height": "0.3em",
                  "--number-flow-direction": "up",
                } as React.CSSProperties
              }
              layout
              layoutRoot
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:text-[#59595b] text-[#949597] group-hover/contribute:text-amber-500 transition-colors mb-[1px] duration-300"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        </motion.span>
      </Link>
    </MotionConfig>
  );
}
