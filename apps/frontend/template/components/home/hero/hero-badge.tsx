import { cn } from "@/lib/utils";

export function HeroBadge({
  children,
  icon,
  className,
  iconClassName,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-sidebar-border px-4 h-8 rounded-full text-sm font-mono shadow-sm bg-doc-background/50 text-foreground backdrop-blur-sm relative z-10",
        className
      )}
    >
      <div className={cn("", iconClassName)}>{icon}</div>
      {children}
    </div>
  );
}
