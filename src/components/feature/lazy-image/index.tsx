"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { type HTMLAttributes, useState, useCallback } from "react";

type TProps = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  containerClassname?: HTMLAttributes<HTMLDivElement>["className"];
  skeletonClassName?: string;
  skeletonBgColor?: string;
};

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  skeletonClassName = "",
  skeletonBgColor = "",
  containerClassname = "",
}: TProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const imageRef = useCallback(
    (node: HTMLImageElement) => {
      if (!node) return;

      if (node.complete) handleImageLoad();

      node.onload = handleImageLoad;
      node.onerror = handleImageError;
    },
    [src],
  );

  return (
    <div className={containerClassname}>
      <div className="relative">
        {!error && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={loading ? "opacity-0" + skeletonClassName : className}
            ref={imageRef}
            width={width}
            height={height}
          />
        )}
        {loading && !error && (
          <Skeleton
            className={["absolute top-0 left-0", skeletonClassName].join(" ")}
            style={{
              maxWidth: width,
              maxHeight: height,
              backgroundColor: skeletonBgColor,
            }}
          />
        )}
      </div>
      {error && <ErrorComponent containerClassName={skeletonClassName} />}
    </div>
  );
}

function ErrorComponent({
  containerClassName,
}: {
  containerClassName: string;
}) {
  return (
    <div
      className={`flex justify-center items-center bg-neutral-300 dark:bg-neutral-800 ${containerClassName}`}
    >
      <ImageOff className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
    </div>
  );
}
