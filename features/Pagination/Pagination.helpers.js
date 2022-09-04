import { MONTHS } from "../../constants";

export const selectMonth = (e, ...props) => {
  const target = e.target;
  const parent = target.parentElement;

  /* scroll right */
  if (target.offsetLeft === 1213) {
    parent.scrollLeft = 300;
  }

  if (target.offsetLeft === 1457) {
    parent.scrollLeft += 300;
  }

  if (target.offsetLeft === 1823) {
    parent.scrollLeft += 300;
  }

  /* scroll left */
  if (target.offsetLeft === 1335) {
    parent.scrollLeft -= 300;
  }

  if (target.offsetLeft === 1091) {
    parent.scrollLeft -= 300;
  }

  if (target.offsetLeft === 725) {
    parent.scrollLeft -= 300;
  }

  const targetContent = target.textContent;
  const [selectedYear, ipoDate, setMonth] = props;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const selectMonthIndex = MONTHS.indexOf(targetContent);

  if (selectedYear === currentYear && selectMonthIndex > currentMonthIndex) {
    setMonth(MONTHS[currentMonthIndex]);
    return;
  }
  if (ipoDate.year === selectedYear && selectMonthIndex < ipoDate.month) {
    setMonth(MONTHS[ipoDate.month]);
    return;
  }
  setMonth(MONTHS[selectMonthIndex]);
};
