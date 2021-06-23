import { useState, useEffect } from "react";
import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
import classes from "./StockDataSearch.module.css";

const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const [isClicked, setIsClicked] = useState(false);
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
        />
      </div>
      {isClicked && (
        <div>
          <table className={classes.tableStyle}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody className={classes.trBody}>
              {_stockDays
                .filter((array) => array[0] !== date)
                .map((stock) => (
                  <tr>
                    <td>{stock[0]}</td>
                    {Object.entries(stock[1]).map((arr, index) => (
                      <>
                        {(index === 4 && (
                          <td>{(arr[1] / 1000000).toFixed(3)}</td>
                        )) || (
                          <div>
                            <td>{arr[1]}</td>
                          </div>
                        )}
                      </>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StockDataSearch;
