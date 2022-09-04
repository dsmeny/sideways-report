import {
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { useTimeSeries } from "../../contexts/timeseries-context.js";
import { MONTHS } from "../../constants.js";
import { selectMonth } from "./Pagination.helpers.js";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const [{ setMonth }, timeseries] = useTimeSeries();
  const { selectedYear, activeMonth, ipoDate } = timeseries;

  return (
    <div className={classes["pagination-wrapper"]}>
      {MONTHS.map((month, index) => (
        <div
          className={`${classes["pagination-item"]} ${
            month === activeMonth && classes["pagination-highlight"]
          }`}
          onClick={(e) => selectMonth(e, selectedYear, ipoDate, setMonth)}
          key={index}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
