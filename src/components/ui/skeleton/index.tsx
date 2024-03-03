import { HTMLAttributes } from "react";

type TSkeletonProps = HTMLAttributes<HTMLDivElement> & {};

export function Skeleton({ className, style, ...props }: TSkeletonProps) {
  return (
    <div
      className={`bg-neutral-300 dark:bg-neutral-800 transition-all duration-75 ${className}`}
      style={style}
      {...props}
    />
  );
}
