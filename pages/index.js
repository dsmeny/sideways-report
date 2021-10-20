import { useState, useRef, useEffect, useContext, useCallback } from "react";
import TriggerContext from "../store/context-provider";
import SearchStocks from "../components/layout/search/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataResults from "../components/layout/search/StockDataResults";

export default function Home() {
  const [timeSeries, setTimeSeries] = useState("");
  const [symbol, setSymbol] = useState(null);

  const { searchTrigger } = useContext(TriggerContext);

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [searchTrigger]);

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
    inputRef.current.focus();
  }

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.data}>
          {symbol && (
            <StockDataResults timeSeries={timeSeries} symbol={symbol} />
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
            inputRef={inputRef}
            symbol={symbol}
          />
        </div>
      </div>
    </>
  );
}
