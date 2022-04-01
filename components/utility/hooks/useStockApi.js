import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../fetcher";

// CONSTANTS
const TIME_SERIES_DAILY = "TIME_SERIES_DAILY";
const OVERVIEW = "OVERVIEW";

function useStockApi({ symbol, timeSeries }) {
  const { data, error } = useSWR(
    timeSeries
      ? `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&outputsize=full&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (timeSeries === TIME_SERIES_DAILY && data) {
      fetch("/api/redis_cloud", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data["Meta Data"]["2. Symbol"],
          payload: JSON.stringify(data),
        }),
      });
    } else if (timeSeries === OVERVIEW && data) {
      fetch("/api/redis_cloud", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.Name,
          payload: JSON.stringify(data),
        }),
      });
    }
  }, [data, timeSeries]);

  return {
    stockData: !timeSeries ? JSON.parse(symbol) : data,
    isError: error,
  };
}

export default useStockApi;
