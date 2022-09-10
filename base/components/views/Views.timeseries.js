import useStockApi from "../../hooks/useStockApi";
import { API_PARAMS } from "../../../constants";
import { MONTHS } from "../../../constants";
import { useTimeSeries } from "../../../contexts/timeseries-context";
import { findStockYears, getIpoMonth } from "./Views.helpers";
import Spinner from "../spinner";
import StockList from "./timeseries/table/Table.list";
import StockHeader from "./timeseries/header/Header";

const TimeSeries = ({ symbol }) => {
  const { stockData } = useStockApi({
    symbol,
    timeSeries: API_PARAMS.TIME_SERIES_DAILY,
  });
  const [{ setSelectedYear, setMonth, setIpoDate }, timeseries] =
    useTimeSeries();
  const { selectedYear } = timeseries;

  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const data = stockData[API_PARAMS.TIME_SERIES];
  const meta = stockData[API_PARAMS.META_DATA];
  const years = findStockYears(data);
  const ipoMonth = getIpoMonth(data);
  if (years.length > 0 && selectedYear === 0) {
    setSelectedYear(years.shift());
    setMonth(MONTHS[new Date().getMonth()]);
    setIpoDate({ year: years.pop(), month: ipoMonth });
  }

  return (
    <div style={{ marginTop: "-4rem" }}>
      {data && (
        <>
          <StockHeader years={years} meta={meta} />
          <StockList stocks={data} />
        </>
      )}
    </div>
  );
};

export default TimeSeries;
