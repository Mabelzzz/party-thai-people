import { useEffect, useRef } from "react";

export function useAutoSaveForm<T>(
  key: string,
  value: T,
  onLoad: (loaded: T) => void,
  debounceMs = 500
): void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasLoaded.current) return;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown as T;
        onLoad(parsed);
      }
    } catch {
      // ignore
    } finally {
      hasLoaded.current = true;
    }
  }, [key, onLoad]);

  // บันทึกลง localStorage พร้อม debounce
  useEffect(() => {
    if (typeof window === "undefined" || !hasLoaded.current) 
      return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch { }
    }, debounceMs);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [key, value, debounceMs]);
}
