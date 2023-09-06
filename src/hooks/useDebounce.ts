import { useRef } from "react";

type Callback<T extends any[]> = (...args: T) => void;

const useDebounce = <T extends any[]>(
  func: Callback<T>,
  wait: number = 800
): Callback<T> => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  return (...args: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      func(...args);
    }, wait);
  };
};

export default useDebounce;
