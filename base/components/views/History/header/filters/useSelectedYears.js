import { useTimeSeries } from "../../../../../../contexts/timeseries-context";
import { MONTHS } from "../../../../../../constants";

const useSelectedYears = () => {
  const { setMonth, setSelectedYear, timeseries } = useTimeSeries;
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
  return { selectYears, selectedYear };
};

export default useSelectedYears;
