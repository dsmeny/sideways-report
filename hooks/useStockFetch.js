import { useState, useCallback } from "react";

const useStockFetch = () => {
  const [stockData, setStockData] = useState([]);

  const sendRequest = useCallback(async (timeSeries, enteredInput) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${enteredInput}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    if (!data["Error Message"]) {
      setStockData(data);
    }
  });

  return {
    sendRequest,
    stockData: {
      metaData: stockData["Meta Data"],
      series: stockData["Time Series (Daily)"],
    },
  };
};

export default useStockFetch;
