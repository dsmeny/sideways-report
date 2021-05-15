import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [stockInfo, setStockInfo] = useState([]);
  const [stockSymbol, setStockSymbol] = useState(null);
  const [date, setDate] = useState("");

  const inputRef = useRef();

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
      <div className={styles.container}>
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
        <div className={styles.search}>
          {stockSymbol && (
            <div className={styles.search_details}>
              <h3>{stockSymbol}</h3>
              <span>
                <Link href={`/${stockSymbol}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.dots}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </Link>
              </span>
            </div>
          )}
          <div className={styles.search_buttons}>
            <input type="text" placeholder="symbol" ref={inputRef} autoFocus />
            <input type="date" onChange={changeHandler} />
          </div>
        </div>
      </div>
    </>
  );
}
