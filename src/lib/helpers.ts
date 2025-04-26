export const isEmptyObject = (obj: object): boolean => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId); // Clear any existing timer
    }
    timeoutId = setTimeout(() => {
      func(...args); // Execute the original function after the wait time
    }, wait);
  };
}
