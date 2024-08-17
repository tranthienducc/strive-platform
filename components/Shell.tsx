import { shellVariants } from "@/constants/cssConstants";
import { cn } from "@/lib/utils";
import React from "react";

type VariantType =
  | "default"
  | "sidebar"
  | "centered"
  | "markdown"
  | undefined
  | null;

type ShellType = {
  className: string;
  variant?: VariantType | null;
  as?: React.ElementType;
  children: React.ReactNode;
};

const Shell = ({
  className,
  as: Comp = "section",
  variant = "default",
  children,
  ...props
}: ShellType) => {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props}>
      {children}
    </Comp>
  );
};

export { Shell };
