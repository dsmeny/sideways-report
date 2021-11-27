import useSWR from "swr";
import fetcher from "../fetcher";

function useStockApi({ symbol, timeSeries }) {
  const { data, error } = useSWR(
    `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&outputsize=full&apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return {
    stockData: data,
    isError: error,
  };
}

export default useStockApi;
