import axios, {
  type Method,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { ref, type Ref } from 'vue';

type FetchData = (
  method?: Method,
  config?: AxiosRequestConfig
) => Promise<void>;

type UseFetchReturnType<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  fetchData: FetchData;
};

export function useFetch<T>(
  url: string,
  mapper?: (data: any) => T
): UseFetchReturnType<T> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const fetchData: FetchData = async (method = 'GET', config) => {
    error.value = null;
    isLoading.value = true;

    try {
      const res: AxiosResponse<T> = await axios.request({
        url,
        method,
        ...config,
        params: { apikey: import.meta.env.VITE_API_KEY, ...config?.params },
      });

      data.value = mapper ? mapper(res.data) : res.data;
    } catch (e) {
      if (e instanceof Error) {
        error.value = e;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetchData };
}
