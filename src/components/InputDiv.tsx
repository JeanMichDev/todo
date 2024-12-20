import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const InputDiv = ({
  className,
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-1 border border-black",
        className
      )}
    >
      {children}
    </div>
  );
};
