/* Sideways Report */

import { useState, useRef, useEffect, useContext } from "react";
import TriggerContext from "../store/context-provider";
import SearchStocks from "../components/layout/search/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataResults from "../components/layout/search/StockDataResults";
import { symbolHandlers } from "../components/utility/Index_handlers";

export default function Home() {
  const [timeSeries, setTimeSeries] = useState("");
  const [symbol, setSymbol] = useState(null);
  const {
    searchTrigger,
    showSearch,
    setDisplayIcon,
    displayIcon,
    clickedTrigger,
  } = useContext(TriggerContext);

  const inputRef = useRef();
  const resultsRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [searchTrigger, displayIcon]);

  useEffect(() => {
    if (timeSeries && timeSeries.length > 0 && clickedTrigger) {
      setTimeSeries(null);
    }
  }, [timeSeries]);

  function clickHandler() {
    setDisplayIcon();
    symbolHandlers(inputRef, setTimeSeries, "TIME_SERIES_DAILY", setSymbol);
    showSearch();
  }

  function keypressHandler(e) {
    if (e.which === 13) {
      setDisplayIcon();
      symbolHandlers(inputRef, setTimeSeries, "TIME_SERIES_DAILY", setSymbol);
      showSearch();
    }
  }

  function resetSymbol() {
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <>
      <div
        className={`${styles.dataResults} ${searchTrigger ? "shrink" : "grow"}`}
        ref={resultsRef}
      >
        {symbol && <StockDataResults timeSeries={timeSeries} symbol={symbol} />}
      </div>
      <div
        className={`${styles.search} ${searchTrigger ? "grow" : "shrink"}`}
        ref={searchRef}
      >
        <SearchStocks
          clickHandler={clickHandler}
          resetSymbol={resetSymbol}
          keypressHandler={keypressHandler}
          inputRef={inputRef}
        />
      </div>
    </>
  );
}
