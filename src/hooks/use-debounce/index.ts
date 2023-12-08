import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T, null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return { debouncedValue };
}
