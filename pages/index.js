import { useState, useRef, useEffect, useContext, useCallback } from "react";
import TriggerContext from "../store/context-provider";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataSearch from "../components/ui/StockDataSearch";

export default function Home() {
  const [date, setDate] = useState(null);
  const [timeSeries, setTimeSeries] = useState("");
  const [symbol, setSymbol] = useState(null);

  const { searchTrigger } = useContext(TriggerContext);

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();
  const dateRef = useRef();

  function clickHandler() {
    const enteredSymbol = inputRef.current.value.toUpperCase();
    setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
    setSymbol(enteredSymbol);
  }

  function keypressHandler(e) {
    if (e.which === 13) {
      const enteredSymbol = inputRef.current.value.toUpperCase();
      setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
      setSymbol(enteredSymbol);
    }
  }

  function resetSymbol() {
    inputRef.current.value = "";
  }

  function changeHandler(e) {
    e.preventDefault();
    // we need to set min/max date values and pass them before setting the date.
    const targetDate = dateRef.current.value;
    setDate(targetDate);
  }

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.data}>
          {date && (
            <StockDataSearch
              timeSeries={timeSeries}
              symbol={symbol}
              date={date}
            />
          )}
        </div>
        <div
          className={`${searchTrigger ? "show_view" : "hide_view"} ${
            styles.search
          } `}
          ref={searchRef}
        >
          <SearchStocks
            clickHandler={clickHandler}
            resetSymbol={resetSymbol}
            keypressHandler={keypressHandler}
            changeHandler={changeHandler}
            inputRef={inputRef}
            dateRef={dateRef}
            symbol={symbol}
          />
        </div>
      </div>
    </>
  );
}
