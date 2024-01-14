"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

export function LazyImage({
  src,
  alt,
  className,
  skeletonClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName: string;
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

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = handleImageLoad;
    img.onerror = handleImageError;

    return () => {
      img.onerror = null;
      img.onload = null;
    };
  }, [src]);

  return (
    <>
      <img src={src} alt={alt} className={loading ? "hidden" : className} />
      {loading && !error && <Skeleton className={skeletonClassName} />}
      {error && <ErrorComponent containerClassName={skeletonClassName} />}
    </>
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
