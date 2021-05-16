import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import Card from "../components/ui/Card";
import Menubar from "../components/layout/MenuBar";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [stockInfo, setStockInfo] = useState([]);
  const [stockSymbol, setStockSymbol] = useState(null);
  const [date, setDate] = useState("");
  const [classTrigger, setClassTrigger] = useState(false);

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function changeHandler(e) {
    const targetDate = e.target.value;
    const enteredInput = inputRef.current.value.toUpperCase();
    const timeSeries = "TIME_SERIES_DAILY";

    const req = await fetch(
      `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${enteredInput}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const res = await req.json();

    if (res) {
      const dataSymbol = await res["Meta Data"]["2. Symbol"];
      const dataDay = await res["Time Series (Daily)"][`${targetDate}`];
      if (dataDay) {
        const dataArray = Object.entries(dataDay);
        setStockInfo(dataArray);
        setDate(targetDate);
      }
      setStockSymbol(dataSymbol);
    }

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <>
      <nav className={styles.nav}>
        <h1>Sideways Report</h1>
      </nav>
      <Menubar classTrigger={classTrigger} setClassTrigger={setClassTrigger} />
      <div className={styles.container} ref={containerRef}>
        <div className={styles.data}>
          {stockInfo.length > 0 && (
            <div className={styles.stockData}>
              <ul>
                {stockInfo.map((data, index) => (
                  <Card date={date} data={data} key={index} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.search} ref={searchRef}>
          <SearchStocks
            classTrigger={classTrigger}
            stockSymbol={stockSymbol}
            changeHandler={changeHandler}
            inputRef={inputRef}
          />
        </div>
      </div>
    </>
  );
}
