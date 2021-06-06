import {
  useState,
  useRef,
  memo,
  useEffect,
  useContext,
  useCallback,
} from "react";

// import context_provider from "../store/context-provider";
// import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";
// import StockDataSearch from "../components/ui/StockDataSearch";
// import Checkbox from "../components/ui/Checkbox";
import useDB from "../hooks/useDB";
import api_data from "../api_data";

const Home = memo(() => {
  // const [timeSeries, setTimeSeries] = useState("");
  // const [userSymbol, setUserSymbol] = useState([]);
  const [stockArray, setStockArray] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  // const { searched, symbols, setSymbols, isChecked } =
  //   useContext(context_provider);
  const stocks = useDB();

  // const inputRef = useRef();
  // const searchRef = useRef();
  const containerRef = useRef();
  // const dateRef = useRef();

  // function clickHandler() {
  //   const enteredSymbol = inputRef.current.value.toUpperCase();
  //   setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
  //   setUserSymbol((prev) => [...prev, enteredSymbol]);
  // }

  // function keypressHandler(e) {
  //   if (e.which === 13) {
  //     const enteredSymbol = inputRef.current.value.toUpperCase();
  //     setTimeSeries("TIME_SERIES_DAILY"); // this will eventually be a filter option
  //     setUserSymbol((prev) => [...prev, enteredSymbol]);
  //   }
  // }

  // function resetSymbol() {
  //   inputRef.current.value = "";
  // }

  async function addStockHandler() {
    const stockDb = await stocks;
    const api = await api_data;
    stockDb.addStockToDb(api);
    setIsClicked(!isClicked);
  }

  // function changeHandler() {
  //   // we need to set min/max date values and pass them before setting the date.
  //   const targetDate = dateRef.current.value;
  //   setUserSymbol((prev) => [...prev, targetDate]);
  // }

  // useEffect(() => {
  //   if (userSymbol.length > 1) {
  //     setSymbols((prev) => [...prev, userSymbol]);
  //   }
  // }, [userSymbol]);

  useEffect(async () => {
    const response = await stocks;
    const stockItems = await response;
    console.log("stockItems:", stockItems);
    if (stockItems) {
      const data = await stockItems.allItems;
      // console.log("data:", data);
      setStockArray(stockItems.allItems);
    }
    // console.log("stockArray:", stockArray);
  }, [isClicked]);

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div>
          <ul>
            {stockArray.length > 0 &&
              stockArray.map((item, index) => (
                <li key={index}>{`${item.name}: ${item.date}`}</li>
              ))}
          </ul>
          <button onClick={addStockHandler}>add data</button>
        </div>
        {/* <div className={styles.data}>
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
        </div> */}
      </div>
    </>
  );
});

export default Home;
