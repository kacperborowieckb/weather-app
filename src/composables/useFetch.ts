import axios, {
  type Method,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { ref, type Ref } from "vue";

type FetchData = (method: Method, payload?: any) => void;

type UseFetchReturnType<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  fetchData: FetchData;
};

export function useFetch<T>(
  url: string,
  config?: AxiosRequestConfig
): UseFetchReturnType<T> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const fetchData: FetchData = async (method = "GET", payload) => {
    error.value = null;
    isLoading.value = true;

    try {
      const res: AxiosResponse<T> = await axios.request({
        url,
        method,
        data: payload,
        ...config,
      });

      data.value = res.data;
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
