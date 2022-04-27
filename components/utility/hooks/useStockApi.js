import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../fetcher";
import { API_PARAMS } from "../../../util/constants";

const hasErrorMessage = (obj) => {
  return Object.keys(obj).some((elem) => elem.match(/([E]|[e])rror/g));
};

const postToRedis = (series, data) => {
  fetch("/api/redis_cloud", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: series,
      payload: JSON.stringify(data),
    }),
  });
};

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
    if (data && !hasErrorMessage(data)) {
      switch (timeSeries) {
        case API_PARAMS.TIME_SERIES_DAILY:
          postToRedis(data["Meta Data"]["2. Symbol"], data);
          return;
        case API_PARAMS.OVERVIEW:
          postToRedis(data.Name, data);
          return;
        case API_PARAMS.GLOBAL_QUOTE:
          postToRedis(`${data["Global Quote"]["01. symbol"]}_global`, data);
          return;
        default:
          console.log(new Error("No matching timeSeries."));
          return;
      }
    }
  }, [data, timeSeries]);

  if (data && hasErrorMessage(data)) {
    return {
      stockData:
        "Symbol does not exist in the AlphaVantage API. Try something else.",
      isError: error,
    };
  }

  return {
    stockData: !timeSeries ? JSON.parse(symbol) : data,
    isError: error,
  };
}

export default useStockApi;
