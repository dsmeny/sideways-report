import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { fetchAll } from "../helpers/fetch.helpers";
import { apiParamsHandler } from "../helpers/stockApi.helpers";

function useOverviewApi({ symbol, timeSeries }) {
  const { data, error } = useSWR(
    timeSeries
      ? [
          `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&outputsize=full&apikey=${process.env.NEXT_PUBLIC_API}`,
          "/api/finance_api",
        ]
      : null,
    fetchAll,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

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

  console.log("data: ", data);

  const stocks = useMemo(() => data, [data]);

  return {
    stockData: !timeSeries ? JSON.parse(symbol) : stocks,
    isError: error,
  };
}

export default useOverviewApi;
