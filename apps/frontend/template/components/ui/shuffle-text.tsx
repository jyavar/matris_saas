"use client";

import { useEffect, useRef,useState } from "react";

import { cn } from "@/lib/utils";

function shuffleChar(char: string) {
  const characters = "0123456789";
  return char === " "
    ? " "
    : characters[Math.floor(Math.random() * characters.length)];
}

export function ShuffleText({
  children,
  className,
  duration = 0.5,
  isHovering,
}: {
  children: string;
  className?: string;
  duration?: number;
  isHovering: boolean;
}) {
  const [shuffledText, setShuffledText] = useState(children);
  const intervals = useRef<NodeJS.Timeout[]>([]);
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const textArray = children.split("");
    const numberOfCharacters = textArray.filter((char) => char !== " ").length;
    const ABC = (duration * 500) / numberOfCharacters;

    if (isHovering) {
      textArray.forEach((char, index) => {
        if (char !== " ") {
          const intervalId = setInterval(() => {
            textArray[index] = shuffleChar(char);
            setShuffledText(textArray.join(""));
          }, 25);
          intervals.current.push(intervalId);

          const timeoutId = setTimeout(
            () => {
              clearInterval(intervalId);
              textArray[index] = children[index];
              setShuffledText(textArray.join(""));
            },
            ABC * (index + 1)
          );
          timeouts.current.push(timeoutId);
        }
      });
    } else {
      textArray.forEach((char, index) => {
        if (char !== " ") {
          const intervalId = setInterval(() => {
            textArray[numberOfCharacters - 1 - index] = shuffleChar(char);
            setShuffledText(textArray.join(""));
          }, 25);
          intervals.current.push(intervalId);

          const timeoutId = setTimeout(
            () => {
              clearInterval(intervalId);
              textArray[numberOfCharacters - 1 - index] =
                children[numberOfCharacters - 1 - index];
              setShuffledText(textArray.join(""));
            },
            ABC * (index + 1)
          );
          timeouts.current.push(timeoutId);
        }
      });
    }

    return () => {
      intervals.current.forEach(clearInterval);
      timeouts.current.forEach(clearTimeout);
      intervals.current = [];
      timeouts.current = [];
    };
  }, [isHovering, children, duration]);

  return (
    <span className={cn("transition-all duration-200", className)}>
      {shuffledText}
    </span>
  );
}
