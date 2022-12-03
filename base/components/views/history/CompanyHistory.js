import useStockApi from "../../../hooks/useStockApi";
import { API_PARAMS, MONTHS } from "../../../../constants";
import { useTimeSeries } from "../../../../contexts/timeseries-context";
import { findStockYears, getIpoMonth } from "./history.helpers";
import SelectByDate from "./header/Header.select.date";
import SelectByYear from "./header/Header.select.year";
import SelectByVolume from "./header/Header.select.volume";
import Spinner from "../../spinner";
import StockList from "./table/Table.list";
import classes from "./History.module.css";

const CompanyHistory = ({ symbol }) => {
  const { stockData } = useStockApi({
    symbol,
    timeSeries: API_PARAMS.TIME_SERIES_DAILY,
  });

  const [{ setSelectedYear, setMonth, setIpoDate }, timeseries] =
    useTimeSeries();
  const { date, selectedYear } = timeseries;

  if (!stockData || stockData === undefined) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const data = stockData[API_PARAMS.TIME_SERIES];
  const years = findStockYears(data);
  const ipoMonth = getIpoMonth(data);

  if (years.length > 0 && selectedYear === 0) {
    setSelectedYear(years.shift());
    setMonth(MONTHS[new Date().getMonth()]);
    setIpoDate({ year: years.pop(), month: ipoMonth });
  }

  return (
    <>
      {data && (
        <div className={classes["history-container"]}>
          <div className={classes["history-container-filters"]}>
            <div>
              <SelectByDate symbol={symbol} />
              <SelectByVolume />
            </div>
            {date === "byDate" && (
              <>
                <SelectByYear years={years} />
              </>
            )}
          </div>
          <div className={classes["history-table"]}>
            <StockList stocks={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyHistory;
