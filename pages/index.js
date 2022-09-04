/* Sideways Report */
import { useState, useRef, useEffect, useContext } from "react";
import TriggerContext from "../contexts/context-provider";
import SearchStocks from "../features/search/SearchStocks";
import styles from "../styles/Home.module.css";
import SearchStockResults from "../features/search/SearchStockResults";
import { symbolHandlers } from "../base/helpers/homePage.helpers";
import { API_PARAMS, MEDIA_SIZES } from "../constants";

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
    showSearch(true);

    const media = (size) => {
      return window.matchMedia(`screen and (max-width: ${size}px)`);
    };

    const mediaMatch = media(MEDIA_SIZES.MOBILE);

    if (!isMobile) {
      handleScreenChanges(mediaMatch);
    }
    mediaMatch.addEventListener("change", handleScreenChanges);
  }, []);

  useEffect(() => {
    if (!symbol) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  }, [searchTrigger, symbol]);

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

    symbolHandlers(inputRef, setTimeSeries, API_PARAMS.GLOBAL_QUOTE, setSymbol);
    showSearch();
  }

  function keypressHandler(e) {
    if (e.which === 13) {
      if (!inputRef.current.value && !symbol) {
        return;
      }
      symbolHandlers(
        inputRef,
        setTimeSeries,
        API_PARAMS.GLOBAL_QUOTE,
        setSymbol
      );
      showSearch();
    }
  }

  return (
    <>
      <div
        style={{
          position: isMobile ? "absolute" : "relative",
          zIndex: isMobile && "9999",
          maxWidth: "100vw",
        }}
        className={`${styles.dataResults} ${searchTrigger ? "shrink" : "grow"}`}
        ref={resultsRef}
      >
        {symbol && (
          <SearchStockResults timeSeries={timeSeries} symbol={symbol} />
        )}
      </div>
      {!symbol && (
        <div
          className={`${styles.search} ${searchTrigger ? "grow" : "shrink"}`}
          ref={searchRef}
        >
          <p className={styles["search-title"]}>which stock do you like ??</p>

          <SearchStocks
            clickHandler={clickHandler}
            keypressHandler={keypressHandler}
            inputRef={inputRef}
          />
        </div>
      )}
    </>
  );
}
