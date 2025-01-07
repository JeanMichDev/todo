import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

import { ComponentPropsWithoutRef } from "react";

const button = cva("rounded-lg border font-semibold transition", {
  variants: {
    intent: {
      default: "bg-primary text-primary-foreground hover:bg-primary/50",
    },
    size: {
      sm: "w-10 px-2 py-1 text-sm",
      md: "w-24 px-4 py-2 text-base",
      lg: "w-40 px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "sm",
  },
});

type ButtonProps = VariantProps<typeof button>;

export const Button = ({
  intent = "default",
  size = "md",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & ButtonProps) => {
  return (
    <button className={cn(button({ intent, size }), className)} {...props}>
      {props.children}
    </button>
  );
};
