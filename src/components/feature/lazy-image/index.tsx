"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useState, useEffect } from "react";

type TProps = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
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
  skeletonBgColor,
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

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = handleImageLoad;
    img.onerror = handleImageError;
  }, [src]);

  return (
    <>
      {!error && !loading && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          width={width}
          height={height}
          style={{
            ...(skeletonBgColor && { backgroundColor: skeletonBgColor }),
          }}
        />
      )}
      {loading && !error && (
        <Skeleton
          className={[
            "w-full h-full",
            `${!skeletonBgColor && "bg-neutral-300"}`,
            skeletonClassName,
          ].join(" ")}
          style={{
            ...(height && { height }),
            ...(width && { width }),
            ...(skeletonBgColor && { backgroundColor: skeletonBgColor }),
          }}
        />
      )}
      {error && (
        <ErrorComponent
          height={height}
          width={width}
          containerClassName={skeletonClassName}
        />
      )}
    </>
  );
}

function ErrorComponent({
  containerClassName,
  width,
  height,
}: {
  containerClassName: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={`flex justify-center items-center bg-neutral-300 dark:bg-neutral-800 ${containerClassName}`}
      style={{
        ...(height && { height }),
        ...(width && { width }),
      }}
    >
      <ImageOff className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
    </div>
  );
}
