import { useEffect, useState } from "react";

export default function useDebounce<T>(value: any, duration: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, value]);
  return debounceValue;
}
