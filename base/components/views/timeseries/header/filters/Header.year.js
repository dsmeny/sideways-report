import Select from "../../../../select/Select";
import Pagination from "../../../../../../features/Pagination";
import { MONTHS } from "../../../../../../constants";
import { useTimeSeries } from "../../../../../../contexts/timeseries-context";
import classes from "../Header.module.css";

const Year = ({ years }) => {
  const [{ setSelectedYear, setMonth }, timeseries] = useTimeSeries();
  const { selectedYear, activeMonth, ipoDate } = timeseries;

  const selectYears = (e) => {
    const option = +[...e.currentTarget.options].find(
      (option) => option.selected
    ).value;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentMonthIndex = MONTHS.indexOf(currentMonth);
    const activeMonthIndex = MONTHS.indexOf(activeMonth);

    if (option === currentYear && activeMonthIndex > currentMonthIndex) {
      setMonth(MONTHS[currentMonth]);
      setSelectedYear(option);
      return;
    }
    if (option === ipoDate.year && activeMonthIndex < ipoDate.month) {
      setMonth(MONTHS[ipoDate.month]);
      setSelectedYear(option);
      return;
    }
    setSelectedYear(option);
  };

  return (
    <div className={classes["header-options"]}>
      <Select
        name="years"
        id="years"
        defaultValue={selectedYear}
        onChange={selectYears}
      >
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </Select>
      <Pagination />
    </div>
  );
};

export default Year;
