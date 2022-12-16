import { useState, useEffect } from "react";
import { filterByDate, getLessThan } from "./filter.helpers";
import { getStockYear } from "../../history.helpers";
import { useTimeSeries } from "../../../../../../contexts/timeseries-context";

const useByDate = (stocks) => {
  const [stockData, setStockData] = useState(null);
  const [{}, timeseries] = useTimeSeries();
  const { date, selectedYear, activeMonth } = timeseries;

  useEffect(() => {
    switch (date) {
      case "byDate":
        filterByDate(setStockData, selectedYear, stocks, activeMonth);
        break;
      case "3d":
        getLessThan(setStockData, 3, stocks);
        break;
      case "1w":
        getLessThan(setStockData, 5, stocks);
        break;
      case "2w":
        getLessThan(setStockData, 10, stocks);
        break;
      case "1m":
        getLessThan(setStockData, 20, stocks);
        break;
      case "3m":
        getLessThan(setStockData, 60, stocks);
        break;
      case "6m":
        getLessThan(setStockData, 120, stocks);
        break;
      case "YTD":
        const stockYTD = Object.entries(getStockYear(selectedYear, stocks));
        setStockData(stockYTD);
        break;
      case "1y":
        getLessThan(setStockData, 253, stocks);
        break;
      case "3y":
        getLessThan(setStockData, 759, stocks);
        break;
      default:
        const stockArray = Object.entries(stocks);
        setStockData(stockArray);
    }
  }, [date, selectedYear, activeMonth]);

  return stockData;
};

export default useByDate;
