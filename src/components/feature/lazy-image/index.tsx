"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  skeletonClassName = "",
  skeletonBgColor = "",
}: {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  skeletonClassName?: string;
  skeletonBgColor?: string;
}) {
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

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    if (imageRef.current.complete) handleImageLoad();

    imageRef.current.onload = handleImageLoad;
    imageRef.current.onerror = handleImageError;
  }, []);

  return (
    <div className={`flex flex-col relative`}>
      <div className="relative">
        {!error && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={loading ? "opacity-0" : className}
            ref={imageRef}
            style={{ height, width }}
          />
        )}
        {loading && !error && (
          <Skeleton
            className={[
              "absolute top-0 left-0 w-full h-full",
              skeletonClassName,
            ].join(" ")}
            style={{
              height: "100%",
              width: "100%",
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
