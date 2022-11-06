import useStockApi from "../../../hooks/useStockApi";
import { API_PARAMS, MONTHS } from "../../../../constants";
import { useTimeSeries } from "../../../../contexts/timeseries-context";
import { findStockYears, getIpoMonth } from "./history.helpers";
import Options from "./header/Header.options";
import HeaderYear from "./header/filters/Header.year";
import Spinner from "../../spinner";
import StockList from "./table/Table.list";
import classes from "./History.module.css";

const History = ({ symbol }) => {
  const { stockData } = useStockApi({
    symbol,
    timeSeries: API_PARAMS.TIME_SERIES_DAILY,
  });

  const [{ setSelectedYear, setMonth, setIpoDate }, timeseries] =
    useTimeSeries();
  const { date, selectedYear } = timeseries;

  if (!stockData) {
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
        <div
          style={{ marginTop: "-4rem" }}
          className={classes["history-container"]}
        >
          <Options symbol={symbol} />
          {date === "byDate" && (
            <>
              <HeaderYear years={years} />
            </>
          )}
          <div className={classes["history-table"]}>
            <StockList stocks={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default History;
