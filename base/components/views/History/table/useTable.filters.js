import { useEffect, useState } from "react";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";
import { getGreaterThan } from "../header/filters/filter.helpers";
import useByDate from "../header/filters/useByDate";

const useTableFilters = (stocks) => {
  const stockData = useByDate(stocks);
  const [filteredData, setFilteredData] = useState(null);
  const [{}, timeseries] = useTimeSeries();
  const { volume } = timeseries;

  useEffect(() => {
    switch (volume) {
      case 500000:
        getGreaterThan(setFilteredData, 500000, stockData);
        break;
      case 1000000:
        getGreaterThan(setFilteredData, 1000000, stockData);
        break;
      case 10000000:
        getGreaterThan(setFilteredData, 10000000, stockData);
        break;
      case 50000000:
        getGreaterThan(setFilteredData, 50000000, stockData);
        break;
      default:
        setFilteredData(stockData);
    }
  }, [volume, stockData]);

  return filteredData;
};

export default useTableFilters;
