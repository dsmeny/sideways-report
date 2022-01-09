import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../fetcher";

function useStockApi({ symbol, timeSeries }) {
  const { data, error } = useSWR(
    timeSeries
      ? `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&outputsize=full&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      : null,
    fetcher
  );

  if (timeSeries && data) {
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
  }

  return {
    stockData: !timeSeries ? JSON.parse(symbol) : data,
    isError: error,
  };
}

export default useStockApi;
