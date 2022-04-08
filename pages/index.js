/* Sideways Report */

import { useState, useRef, useEffect, useContext } from "react";
import TriggerContext from "../store/context-provider";
import SearchStocks from "../components/layout/search/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataResults from "../components/layout/search/StockDataResults";
import { symbolHandlers } from "../components/utility/Index_handlers";

export default function Home() {
  const [timeSeries, setTimeSeries] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const { searchTrigger, showSearch, clickedTrigger } =
    useContext(TriggerContext);

  const inputRef = useRef();
  const resultsRef = useRef();
  const searchRef = useRef();

  const handleScreenChanges = (mql) => {
    setIsMobile(mql.matches);
  };

  useEffect(() => {
    const media = (size) => {
      return window.matchMedia(`screen and (max-width: ${size}px)`);
    };

    const MOBILE = media(720);

    if (!isMobile) {
      handleScreenChanges(MOBILE);
    }
    MOBILE.addEventListener("change", handleScreenChanges);
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = "";
  }, [searchTrigger]);

  useEffect(() => {
    if (timeSeries && timeSeries.length > 0 && clickedTrigger) {
      setTimeSeries(null);
    }
  }, [timeSeries]);

  function clickHandler() {
    if (typeof symbol === "string" && symbol.length) {
      return;
    }

    if (!inputRef.current.value && !symbol) {
      return;
    }
    symbolHandlers(inputRef, setTimeSeries, "TIME_SERIES_DAILY", setSymbol);
    showSearch();
  }

  function keypressHandler(e) {
    if (e.which === 13) {
      if (!inputRef.current.value && !symbol) {
        return;
      }
      symbolHandlers(inputRef, setTimeSeries, "TIME_SERIES_DAILY", setSymbol);
      showSearch();
    }
  }

  return (
    <>
      <div
        style={{ position: isMobile ? "absolute" : "relative" }}
        className={`${styles.dataResults} ${searchTrigger ? "shrink" : "grow"}`}
        ref={resultsRef}
      >
        {symbol && <StockDataResults timeSeries={timeSeries} symbol={symbol} />}
      </div>
      <div
        className={`${styles.search} ${searchTrigger ? "grow" : "shrink"}`}
        ref={searchRef}
      >
        <p className={styles["search-title"]}>which stock do you like ??</p>
        <SearchStocks
          clickHandler={clickHandler}
          keypressHandler={keypressHandler}
          inputRef={inputRef}
          symbol={symbol}
        />
      </div>
    </>
  );
}
