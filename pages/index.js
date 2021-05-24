import { useState, useRef, useEffect, useContext, useCallback } from "react";
import TriggerContext from "../store/context-provider";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataSearch from "../components/ui/StockDataSearch";

export default function Home() {
  const [date, setDate] = useState(null);
  const [timeSeries, setTimeSeries] = useState("");
  const [symbol, setSymbol] = useState("");

  const { searchTrigger } = useContext(TriggerContext);

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();
  const dateRef = useRef();

  function clearField() {
    inputRef.current.value = "";
  }

  function changeHandler() {
    const targetDate = dateRef.current.value;
    const enteredSymbol = inputRef.current.value.toUpperCase();
    setDate(targetDate);
    setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
    setSymbol(enteredSymbol);
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
            clickHandler={clearField}
            changeHandler={changeHandler}
            inputRef={inputRef}
            dateRef={dateRef}
          />
        </div>
      </div>
    </>
  );
}
