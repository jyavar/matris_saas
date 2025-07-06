// @ts-ignore

"use client";

import * as React from "react";
import { SiJavascript, SiTypescript } from "react-icons/si";

import { CopyButton } from "@/components/docs/mdx-components/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const UtilsSourceContext = React.createContext(false);

export function useUtilsSource() {
  return React.useContext(UtilsSourceContext);
}

interface UtilsSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function UtilsSource({
  children,
  className,
  ...props
}: UtilsSourceProps) {
  const [currentLanguage, setCurrentLanguage] = React.useState("typescript");

  const extractTextFromChildren = (children: React.ReactNode): string => {
    let extractedText = "";
    React.Children.forEach(children, (child) => {
      if (typeof child === "string") {
        extractedText += child;
      } else if (React.isValidElement(child) && child.props.children) {
        extractedText += extractTextFromChildren(
          React.Children.toArray(child.props.children)
        );
      }
    });
    return extractedText;
  };

  const codeBlocks = React.useMemo(() => {
    const parsedChildren = React.Children.toArray(children);
    const jsCode = parsedChildren.find(
      (child) => (child as any)?.props?.slot === "javascript"
    );
    const tsCode = parsedChildren.find(
      (child) => (child as any)?.props?.slot === "typescript"
    );

    return {
      javascript: {
        element: jsCode,
        text: jsCode
          ? extractTextFromChildren((jsCode as any).props.children)
          : "",
      },
      typescript: {
        element: tsCode,
        text: tsCode
          ? extractTextFromChildren((tsCode as any).props.children)
          : "",
      },
    };
  }, [children]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <div className="relative max-h-[650px] overflow-x-auto rounded-md bg-zinc-950 dark:bg-sidebar text-white">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 dark:bg-sidebar px-3 py-2.5">
          <div className="flex items-center gap-2.5 ml-0.5">
            {currentLanguage === "typescript" ? (
              <div className="bg-white rounded-lg">
                <SiTypescript className="text-[#2d79c7]" size={14} />
              </div>
            ) : (
              <SiJavascript className="text-[#f0dc4e]" size={14} />
            )}
            <p className="text-sm">
              {currentLanguage === "typescript" ? "utils.ts" : "utils.js"}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Select
              onValueChange={setCurrentLanguage}
              defaultValue="typescript"
            >
              <SelectTrigger className="h-4 w-min gap-1 text-xs pr-1.5 border-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="h-7 text-xs [&_svg]:size-3"
                  value="typescript"
                >
                  TypeScript
                </SelectItem>
                <SelectItem
                  className="h-7 text-xs [&_svg]:size-3"
                  value="javascript"
                >
                  JavaScript
                </SelectItem>
              </SelectContent>
            </Select>
            <CopyButton
              value={
                currentLanguage === "typescript"
                  ? codeBlocks.typescript.text
                  : codeBlocks.javascript.text
              }
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <UtilsSourceContext.Provider value={true}>
            <div className="w-full h-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {currentLanguage === "typescript"
                ? codeBlocks.typescript.element
                : codeBlocks.javascript.element}
            </div>
          </UtilsSourceContext.Provider>
        </div>
      </div>
    </div>
  );
}
