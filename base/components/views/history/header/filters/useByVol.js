import { useState, useEffect } from "react";
import { getGreaterThan } from "./filter.helpers";
import { useTimeSeries } from "../../../../../../contexts/timeseries-context";

const useByVol = (stocks) => {
  const [stockData, setStockData] = useState(null);
  const [{}, timeseries] = useTimeSeries();
  const { date, selectedYear, activeMonth } = timeseries;

  useEffect(() => {
    switch (date) {
      case ">=500":
        getGreaterThan(setStockData, 500, stocks);
        break;
      case ">=1,000":
        getGreaterThan(setStockData, 1000, stocks);
        break;
      case ">=10,000":
        getGreaterThan(setStockData, 10000, stocks);
        break;
      case ">=100,000":
        getGreaterThan(setStockData, 100000, stocks);
        break;
      default:
        const stockArray = Object.entries(stocks);
        setStockData(stockArray);
    }
  }, [date, selectedYear, activeMonth]);

  return stockData;
};

export default useByVol;
