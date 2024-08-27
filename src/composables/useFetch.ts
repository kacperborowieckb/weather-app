import {
  ref,
  watchEffect,
  toValue,
  ComputedRef,
  type Ref,
  type UnwrapRef,
} from "vue";

type UseFetchReturnType<T> = {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<UnwrapRef<Error> | null>;
};

export function useFetch<T>(
  url: ComputedRef<string> | Ref<UnwrapRef<string>> | string
): UseFetchReturnType<T> {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);

  watchEffect(async () => {
    data.value = null;
    error.value = null;

    const urlValue = toValue(url);

    try {
      const res = await fetch(urlValue);

      if (!res.ok) {
        throw new Error(`Something went wrong ${res.status}`);
      }

      data.value = await res.json();
    } catch (e) {
      if (e instanceof Error) {
        error.value = e;
      }
    }
  });

  return { data, error };
}
