import useSWR from "swr";
import fetcher from "../fetcher";

const useSWRApi = (url, timeSeries) => {
  const { data, error } = useSWR(timeSeries ? url : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
  };
};

export default useSWRApi;
