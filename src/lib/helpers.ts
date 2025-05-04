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
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const shortenTaskId = (uuid: string) => {
  if (!uuid) return;
  const id = uuid.split("-")[0].toUpperCase();
  return `PRIO-${id}`;
};

export const determineHexContrast = (hex: string = "#ffffff") => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 1 : 0; // 0 = dark , 1 = light
};
