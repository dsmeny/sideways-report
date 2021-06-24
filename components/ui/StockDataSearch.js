import { useState, useEffect } from "react";
import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
import classes from "./StockDataSearch.module.css";

const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showStockNumbers, setShowStockNumbers] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });

  const spinnerStyle = {
    position: "relative",
    top: "30rem",
    transform: "translateY(-10rem)",
  };

  useEffect(() => {
    window.scrollTo({
      top: 1000,
      left: 0,
      behavior: "smooth",
    });
  }, [isClicked]);

  function clickHandler() {
    setIsClicked(!isClicked);
    window.scrollY = "100vh";
  }

  function activeTbodyHandler(e) {
    const elem = e.target.textContent;
    if (elem === "Overview") {
      setShowStats(false);
      if (showStockNumbers === false) setShowStockNumbers(true);
    } else if (elem === "Stats") {
      setShowStockNumbers(false);
      setShowStats(true);
    }
  }

  if (isLoading)
    return (
      <div style={spinnerStyle}>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error</div>;

  const series = stockData["Time Series (Daily)"];

  const _stockDays = Object.entries(series);
  // console.log("_stockDays:", _stockDays);

  return (
    <>
      <div>
        <StockCard
          clickHandler={clickHandler}
          stockData={_stockDays.filter((array) => array[0] === date)}
          symbol={symbol}
          date={date}
          isClicked={isClicked}
          key={Math.random() * 1}
        />
      </div>
      {isClicked && (
        <div>
          <table className={classes.tableStyle}>
            <thead>
              <tr className={classes.btn_row}>
                <th>
                  <button
                    className={showStockNumbers ? classes.isActive : ""}
                    onClick={(e) => activeTbodyHandler(e)}
                  >
                    Overview
                  </button>
                </th>
                <th>
                  <button
                    className={showStats ? classes.isActive : ""}
                    onClick={(e) => activeTbodyHandler(e)}
                  >
                    Stats
                  </button>
                </th>
              </tr>
              {showStockNumbers && showStockNumbers === true && (
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                </tr>
              )}
              {showStats && showStats === true && (
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Average</th>
                  <th>Gain %</th>
                  <th>Vol -/+</th>
                </tr>
              )}
            </thead>
            {showStockNumbers && showStockNumbers === true && (
              <tbody className={classes.trBody}>
                {_stockDays
                  .filter((array) => array[0] !== date)
                  .map((stock, index) => (
                    <tr key={Math.random() + index}>
                      <td>{stock[0]}</td>
                      {Object.entries(stock[1]).map(
                        (arr, index) =>
                          (index === 4 && (
                            <td key={Math.random() + index}>
                              {(arr[1] / 1000000).toFixed(3)}
                            </td>
                          )) || <td key={Math.random() + index}>{arr[1]}</td>
                      )}
                    </tr>
                  ))}
              </tbody>
            )}
            {showStats && showStats === true && (
              <tbody className={classes.trBody}>
                <tr>
                  <td>Stats!</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      )}
    </>
  );
};

export default StockDataSearch;
