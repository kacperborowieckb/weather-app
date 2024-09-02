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

export function useFetch<T>(url: string): UseFetchReturnType<T> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const fetchData: FetchData = async (
    method = "GET",
    config?: AxiosRequestConfig
  ) => {
    error.value = null;
    isLoading.value = true;

    try {
      const res: AxiosResponse<T> = await axios.request({
        url,
        method,
        ...config,
      });

      data.value = res.data;
      console.log(res.data);
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
