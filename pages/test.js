import { useEffect } from "react";
import useSWR from "swr";
import { API_PARAMS } from "../constants";
import fetcher from "../base/helpers/fetch.helpers";

const obj = {
  symbol: "NIO",
  timeSeries: API_PARAMS.TIME_SERIES_DAILY,
};

const { symbol, timeSeries } = obj;

const Test = () => {
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

  console.log("TEST: ", data);

  return <div>hola</div>;
};

export default Test;
