import useSWR from "swr";
import fetcher from "../helpers/fetch.helpers";

const useNewsApi = ({ symbol, topic }) => {
  const { data, error } = useSWR(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&topics=${topic}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return {
    data,
    error,
  };
};

export default useNewsApi;
