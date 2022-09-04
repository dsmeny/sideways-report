import { DataViewList } from "../../Views.structure";
import { API_PARAMS } from "../../../../../constants";
import Options from "./Header.options";
import HeaderYear from "./filters/Header.year";
import Tableheaders from "./Header.tableheaders";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";
import classes from "./Header.module.css";

const StockHeader = ({ years, meta }) => {
  const [{}, timeseries] = useTimeSeries();
  const { date } = timeseries;
  const symbol = meta[API_PARAMS.META_SYMBOL];

  return (
    <div className={classes["stockheader-wrapper"]}>
      <Options symbol={symbol} />
      {date === "byDate" && (
        <>
          <HeaderYear years={years} />
        </>
      )}
      <Tableheaders />
    </div>
  );
};

export default StockHeader;
