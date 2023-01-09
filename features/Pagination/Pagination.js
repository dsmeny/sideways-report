import { useRef, useEffect, useState, useMemo } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import useToggle from "../../base/hooks/useToggle.js";
import { useTimeSeries } from "../../contexts/timeseries-context.js";
import { MONTHS } from "../../constants.js";
import { selectMonth } from "./Pagination.helpers.js";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const [{ setMonth }, timeseries] = useTimeSeries();
  const { selectedYear, activeMonth, ipoDate } = timeseries;
  const [isClicked, setIsClicked] = useToggle();

  const feb = useMemo(() => MONTHS.length / 2 - 3, [MONTHS]);
  const apr = useMemo(() => MONTHS.length / 2 - 3, [MONTHS]);
  const may = useMemo(() => MONTHS.length / 2 - 2, [MONTHS]);
  const june = useMemo(() => MONTHS.length / 2 - 1, [MONTHS]);
  const jul = useMemo(() => MONTHS.length / 2, [MONTHS]);
  const sep = useMemo(() => Math.floor(MONTHS.length / 2 + 3) - 1, [MONTHS]);

  const innerRef = useRef();

  const clickHandler = (e) => {
    selectMonth(e, selectedYear, ipoDate, setMonth);
    setIsClicked();
  };

  useEffect(() => {
    if (MONTHS[june] === activeMonth) {
      innerRef.current.style.translate = "-25rem 0";
    }

    if (MONTHS[sep] === activeMonth) {
      innerRef.current.style.translate = "-47rem 0";
    }

    if (MONTHS[jul] === activeMonth) {
      innerRef.current.style.translate = "-28rem 0";
    }

    if (MONTHS[may] === activeMonth) {
      innerRef.current.style.translate = "-13rem 0";
    }

    if (MONTHS[apr] === activeMonth) {
      innerRef.current.style.translate = "-5rem 0";
    }

    if (MONTHS[1] === activeMonth) {
      innerRef.current.style.translate = "0rem 0";
    }
  }, [isClicked]);

  return (
    <div className={classes["pagination-wrapper-outer"]}>
      <div className={classes["pagination-wrapper-inner"]} ref={innerRef}>
        {MONTHS.map((month, index) => (
          <div
            className={`${classes["pagination-item"]} ${
              month === activeMonth && classes["pagination-highlight"]
            }`}
            onClick={clickHandler}
            key={index}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
