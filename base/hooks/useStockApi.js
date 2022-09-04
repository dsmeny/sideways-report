import { useEffect, useMemo } from "react";
import useSWR from "swr";
import fetcher from "../helpers/fetch.helpers";
import { apiParamsHandler } from "../helpers/stockApi.helpers";

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

  // console.log("useStockApi: ", data);

  const hasErrorMessage = (obj) => {
    return Object.keys(obj).some((elem) => elem.match(/([E]|[e])rror/g));
  };

  useEffect(() => {
    if (data && !hasErrorMessage(data)) {
      apiParamsHandler(data, timeSeries);
    }
  }, [data, timeSeries]);

  if (
    data &&
    timeSeries === "GLOBAL_QUOTE" &&
    Object.keys(data["Global Quote"]).length === 0
  ) {
    return {
      stockData:
        "Symbol does not exist in the AlphaVantage API. Try something else.",
      isError: error,
    };
  }

  const stocks = useMemo(() => data, [data]);

  return {
    stockData: !timeSeries ? JSON.parse(symbol) : stocks,
    isError: error,
  };
}

export default useStockApi;
