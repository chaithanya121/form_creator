import * as React from "react"
import { cn } from "@/lib/utils";
import { Star as StarIcon } from "lucide-react";

export default function Star({ className, filled, ...props }) {
  return (
    <StarIcon
      className={cn(
        "h-4 w-4 transition-colors",
        filled ? "fill-primary text-primary" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
