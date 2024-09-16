import { DEFAULT_DEBOUNCE_DELAY } from '@/constants';

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = DEFAULT_DEBOUNCE_DELAY
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn(...args), delay);
  };
};
