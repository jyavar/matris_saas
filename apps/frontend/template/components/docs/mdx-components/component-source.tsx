"use client";

import * as React from "react";
import { SiJavascript, SiTypescript } from "react-icons/si";

import { CopyButton } from "@/components/docs/mdx-components/copy-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ComponentSourceContext = React.createContext(false);

export function useComponentSource() {
  return React.useContext(ComponentSourceContext);
}

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  children: React.ReactNode;
}

export function ComponentSource({
  name,
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const [currentLanguage, setCurrentLanguage] = React.useState("typescript");
  const [isExpanded, setIsExpanded] = React.useState(false);

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
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={cn(
          "relative max-h-[650px] overflow-hidden rounded-md bg-zinc-950 dark:bg-sidebar text-white",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 dark:bg-sidebar px-3 py-2.5">
          <div className="flex items-center gap-2.5 ml-0.5">
            {currentLanguage === "typescript" ? (
              <div className="bg-white rounded-lg">
                <SiTypescript className="text-[#2d79c7]" size={14} />
              </div>
            ) : (
              <SiJavascript className="text-[#f0dc4e]" size={14} />
            )}
            <p className="!text-sm">
              {name}.{currentLanguage === "typescript" ? "tsx" : "jsx"}
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
              event="component-source"
            />
          </div>
        </div>

        <CollapsibleContent
          forceMount
          className={cn(
            "transition-none data-[state=open]:!animate-none data-[state=closed]:!animate-none",
            !isExpanded && "max-h-64"
          )}
        >
          <ComponentSourceContext.Provider value={true}>
            <div className="w-full rounded-md bg-zinc-950 dark:bg-sidebar">
              {currentLanguage === "typescript"
                ? codeBlocks.typescript.element
                : codeBlocks.javascript.element}
            </div>
          </ComponentSourceContext.Provider>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute pointer-events-none flex items-center justify-center inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-zinc-950 dark:to-sidebar",
            isExpanded ? "h-24" : "h-[250px]"
          )}
        >
          <CollapsibleTrigger
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 px-4 py-2 text-xs text-black bg-white rounded-md pointer-events-auto"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
