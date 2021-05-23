import { useState, useRef, useEffect, useContext, useCallback } from "react";
import TriggerContext from "../store/context-provider";
import StockCard from "../components/layout/StockCard";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";
import useStockFetch from "../hooks/useStockFetch";

export default function Home() {
  const [date, setDate] = useState(null);
  const [searchId, setSearchId] = useState(null);
  const { sendRequest: getStockData, stockData } = useStockFetch();
  const [apiData, setApiData] = useState({});
  const [locStorage, setLocStorage] = useState([]);

  const { metaData, series } = stockData;

  const { searchTrigger } = useContext(TriggerContext);

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [searchTrigger]);

  useEffect(() => {
    inputRef.current.focus();

    if (date && series) {
      const locStoreData = Object.entries(series[date]);
      setLocStorage(locStoreData);
    }
  }, [date, series]);

  const setStorageCallback = useCallback(changeHandler, [dateRef]);

  function clearField() {
    inputRef.current.value = "";
  }

  function searchStorage(id) {
    const dataStore = localStorage.getItem(id);
    let dataArr = JSON.parse(dataStore);
    return dataArr;
  }

  async function changeHandler() {
    const targetDate = dateRef.current.value;
    const enteredSymbol = inputRef.current.value.toUpperCase();
    const timeSeries = "TIME_SERIES_DAILY";
    getStockData(timeSeries, enteredSymbol);
    setDate(targetDate);
  }

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.data}>
          {series && (
            <StockCard
              stockData={locStorage}
              stockSymbol={metaData["2. Symbol"]}
              stockDate={date}
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
            changeHandler={setStorageCallback}
            inputRef={inputRef}
            dateRef={dateRef}
          />
        </div>
      </div>
    </>
  );
}
