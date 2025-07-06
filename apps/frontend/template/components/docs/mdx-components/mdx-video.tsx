import { cn } from "@/lib/utils";

interface MdxVideoProps {
  url: string;
  aspect?: "square" | "video" | "auto";
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export function MdxVideo({
  url,
  aspect = "video",
  autoplay = true,
  loop = true,
  className,
}: MdxVideoProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        {
          "aspect-square": aspect === "square",
          "aspect-video": aspect === "video",
        },
        className
      )}
    >
      <video
        src={url}
        autoPlay={autoplay}
        loop={loop}
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
