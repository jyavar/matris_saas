import { cn } from "@/lib/utils";

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "h-10 md:h-8 px-3 font-light whitespace-nowrap text-sm rounded-md bg-gradient-to-t from-orange-600 to-orange-500 shadow-[0_0px_8px_rgba(245,_73,_0,_0.7)] text-white flex items-center relative before:absolute before:inset-0 before:shadow-[0_0px_20px_rgba(245,_73,_0,_0.5)] before:opacity-0 transition-opacity duration-300 hover:before:opacity-100 before:rounded-[inherit] before:pointer-events-none before:transition-opacity before:duration-300 before:will-change-opacity after:inset-0 after:absolute after:shadow-[rgba(255,_255,_255,_0.2)_0px_1px_0px_inset] after:rounded-[inherit]",
        className,
      )}
    >
      {children}
    </button>
  );
};
