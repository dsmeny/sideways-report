import { useState, useEffect } from "react";
import { filterByDate, getFilteredOption } from "./Table.helpers";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";

const useTableFilter = (stocks) => {
  const [stockData, setStockData] = useState(null);
  const [{}, timeseries] = useTimeSeries();
  const { date, selectedYear, activeMonth } = timeseries;

  useEffect(() => {
    switch (date) {
      case "byDate":
        filterByDate(setStockData, selectedYear, stocks, activeMonth);
        break;
      case "3d":
        getFilteredOption(setStockData, 3, stocks);
        break;
      case "1w":
        getFilteredOption(setStockData, 5, stocks);
        break;
      case "2w":
        getFilteredOption(setStockData, 10, stocks);
        break;
      case "1m":
        getFilteredOption(setStockData, 20, stocks);
        break;
      case "3m":
        getFilteredOption(setStockData, 60, stocks);
        break;
      case "6m":
        getFilteredOption(setStockData, 120, stocks);
        break;
      case "YTD":
        const stockYTD = Object.entries(getStockYear(selectedYear, stocks));
        setStockData(stockYTD);
        break;
      case "1y":
        getFilteredOption(setStockData, 253, stocks);
        break;
      case "3y":
        getFilteredOption(setStockData, 759, stocks);
        break;
      default:
        const stockArray = Object.entries(stocks);
        setStockData(stockArray);
    }
  }, [date, selectedYear, activeMonth]);

  return stockData;
};

export default useTableFilter;
