import {
  useState,
  useRef,
  memo,
  useEffect,
  useContext,
  useCallback,
} from "react";

import context_provider from "../store/context-provider";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";
import StockDataSearch from "../components/ui/StockDataSearch";
import Checkbox from "../components/ui/Checkbox";
import useDB from "../hooks/useDB";

const Home = memo(() => {
  const [timeSeries, setTimeSeries] = useState("");
  const [userSymbol, setUserSymbol] = useState([]);
  const [stockArray, setStockArray] = useState([]);
  const { searched, symbols, setSymbols, isChecked } =
    useContext(context_provider);
  const stocks = useDB();

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();
  const dateRef = useRef();

  const stockDummyData = {
    name: "GE",
    date: "2021-05-19",
  };

  const stockDummyData2 = {
    name: "F",
    date: "2021-05-19",
  };

  function clickHandler() {
    const enteredSymbol = inputRef.current.value.toUpperCase();
    setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
    setUserSymbol((prev) => [...prev, enteredSymbol]);
  }

  function keypressHandler(e) {
    if (e.which === 13) {
      const enteredSymbol = inputRef.current.value.toUpperCase();
      setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
      setUserSymbol((prev) => [...prev, enteredSymbol]);
    }
  }

  function resetSymbol() {
    inputRef.current.value = "";
  }

  async function addStockHandler() {
    const stockHook = await stocks;
    const getStocks = await stockHook.allItems;
    setStockArray((prev) => [...prev, getStocks]);
  }

  function changeHandler() {
    // we need to set min/max date values and pass them before setting the date.
    const targetDate = dateRef.current.value;
    setUserSymbol((prev) => [...prev, targetDate]);
    console.log("stockArray:", stockArray);
  }

  useEffect(() => {
    if (userSymbol.length > 1) {
      setSymbols((prev) => [...prev, userSymbol]);
    }
  }, [userSymbol]);

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div>
          <ul>
            {stockArray.length > 0 &&
              stockArray.map((item) => (
                <li key={item.id}>{`${item.name}: ${item.date}`}</li>
              ))}
          </ul>
          <button onClick={addStockHandler}>add data</button>
        </div>
        <div className={styles.data}>
          {userSymbol.length > 1 && (
            <StockDataSearch timeSeries={timeSeries} userSymbol={userSymbol} />
          )}
        </div>
        <div
          className={`${searched ? "show_view" : "hide_view"} ${
            styles.search
          } `}
          ref={searchRef}
        >
          <Checkbox />
          <SearchStocks
            clickHandler={clickHandler}
            resetSymbol={resetSymbol}
            keypressHandler={keypressHandler}
            changeHandler={changeHandler}
            inputRef={inputRef}
            dateRef={dateRef}
            userSymbol={userSymbol}
          />
        </div>
      </div>
    </>
  );
});

export default Home;
