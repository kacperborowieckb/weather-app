import { ref, type Ref } from "vue";

type UseFetchReturnType<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
};

export async function useFetch<T>(url: string): Promise<UseFetchReturnType<T>> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status}`);
    }

    data.value = await res.json();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e;
    }
  }

  return { data, error };
}
