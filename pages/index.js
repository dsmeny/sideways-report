import { useRouter } from "next/router";
import { useState, useRef, useEffect, useContext } from "react";
import TriggerContext from "../store/context-provider";
import Card from "../components/ui/Card";
import SearchStocks from "../components/layout/SearchStocks";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [stockInfo, setStockInfo] = useState([]);
  const [stockSymbol, setStockSymbol] = useState(null);
  const [date, setDate] = useState("");

  const searchContext = useContext(TriggerContext);
  const router = useRouter();

  const inputRef = useRef();
  const searchRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    searchContext.searchTrigger && inputRef.current.focus();
  }, [searchContext.searchTrigger]);

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
      <div className={styles.container} ref={containerRef}>
        <div className={styles.data}>
          {stockInfo.length > 0 && (
            <div className={styles.stockData}>
              <Card symbol={stockSymbol}>
                <div
                  className={styles.details}
                  onClick={() => router.push(`/${stockSymbol}`)}
                >
                  <h3>{stockSymbol}</h3>
                  <span style={{ transform: "translate(7px, 3px)" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="dots"
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
                  </span>
                </div>
                <p>{date}</p>
                <ul>
                  {stockInfo &&
                    stockInfo.map((data, index) => (
                      <li key={index}>{`${data[0]}: ${data[1]}`}</li>
                    ))}
                </ul>
              </Card>
            </div>
          )}
        </div>
        <div className={styles.search} ref={searchRef}>
          <SearchStocks
            stockSymbol={stockSymbol}
            changeHandler={changeHandler}
            inputRef={inputRef}
          />
        </div>
      </div>
    </>
  );
}
