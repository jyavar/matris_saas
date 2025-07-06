// @ts-ignore

"use client";

import { RefreshCcw } from "lucide-react";
import * as React from "react";
import { SiJavascript, SiTypescript } from "react-icons/si";

import { Index } from "@/__registry__";
import { CopyButton } from "@/components/docs/mdx-components/copy-button";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { OpenInV0Button } from "../v0-button";

const ComponentPreviewContext = React.createContext(false);

export function useComponentPreview() {
  return React.useContext(ComponentPreviewContext);
}

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  replayable?: boolean;
  description?: string;
  align?: "center" | "start" | "end";
  v0Link?: string;
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  replayable = false,
  description,
  v0Link,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
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

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    if (!Component) {
      return (
        <p className="!text-sm text-muted-foreground my-auto">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono !text-sm">
            {name}
          </code>{" "}
          not found.
        </p>
      );
    }
    return <Component key={key} />;
  }, [name, key]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="preview"
          className="relative rounded-md border bg-white dark:bg-third"
        >
          <div
            className={cn(
              "preview flex min-h-[380px] w-full justify-center p-10 relative",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              },
              className
            )}
          >
            <div className="absolute top-4 right-4 z-20 flex gap-2.5 items-center">
              {replayable && (
                <button
                  onClick={() => setKey((prev) => prev + 1)}
                  className="flex items-center justify-center rounded-lg z-10 h-6 w-6 text-muted-foreground hover:text-foreground bg-muted/50 [&_svg]:h-3 [&_svg]:w-3"
                >
                  <RefreshCcw strokeWidth={2} />
                </button>
              )}
              {v0Link && <OpenInV0Button url={v0Link} />}
            </div>
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center !text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
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
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <ComponentPreviewContext.Provider value={true}>
                <div className="w-full h-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                  {currentLanguage === "typescript"
                    ? codeBlocks.typescript.element
                    : codeBlocks.javascript.element}
                </div>
              </ComponentPreviewContext.Provider>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
