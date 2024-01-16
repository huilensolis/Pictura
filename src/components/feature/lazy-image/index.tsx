"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [isOnViewPort, setIsOnViewPort] = useState<boolean>(false);

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

    if (isOnViewPort) {
      img.src = src;
    }

    img.onload = handleImageLoad;
    img.onerror = handleImageError;

    return () => {
      img.onerror = null;
      img.onload = null;
    };
  }, [src, isOnViewPort]);

  const imageContainerRef = useRef(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null, // we set the root to null, so it takes the screen viewport as the root element. for more info, read https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      rootMargin: "1000px 0px",
      threshold: 0,
    };

    function callback(entries: IntersectionObserverEntry[], _observer: any) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsOnViewPort(true);
        } else {
          setIsOnViewPort(false);
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    if (imageContainerRef.current && !error) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current && !error) {
        observer.unobserve(imageContainerRef.current);
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <div ref={imageContainerRef} className={`flex flex-none ${className}`}>
      {isOnViewPort && !error && (
        <img src={src} alt={alt} className={loading ? "hidden" : className} />
      )}
      {loading && !error && <Skeleton className={skeletonClassName} />}
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
