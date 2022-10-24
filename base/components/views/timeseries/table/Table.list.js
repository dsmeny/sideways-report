import { useEffect, useState } from "react";
import StockItem from "./Table.list.item";
import { DataViewItem, DataViewList } from "../../Views.structure";
import Spinner from "../../../spinner/Spinner";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";
import { getStockYear } from "../history.helpers";
import { filterByDate, getFilteredOption } from "./Table.helpers";
import classes from "./Timeseries.module.css";

const StockList = ({ stocks }) => {
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

  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`fade ${classes.list} ${classes["list-col"]}`}>
      {stockData.map((entry, index) => (
        <DataViewItem
          className={`${classes["list-item-row"]} ${classes["row-styling"]}`}
          key={index}
        >
          <div
            style={{ width: "10rem", whiteSpace: "nowrap", textAlign: "left" }}
          >
            {entry[0]}
          </div>
          <StockItem
            items={Object.values(entry[1])}
            className={`${classes["list-item-row"]} ${classes["list-header-width"]}`}
          />
        </DataViewItem>
      ))}
    </div>
  );
};

export default StockList;
