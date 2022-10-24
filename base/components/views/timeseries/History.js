import useStockApi from "../../../hooks/useStockApi";
import { API_PARAMS, MONTHS } from "../../../../constants";
import { useTimeSeries } from "../../../../contexts/timeseries-context";
import { findStockYears, getIpoMonth } from "./history.helpers";
import Spinner from "../../spinner";
import StockList from "./table/Table.list";
import StockHeader from "./header/Header";

const History = ({ symbol }) => {
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

export default History;
