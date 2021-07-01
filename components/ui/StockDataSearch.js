import { useState, useEffect } from "react";
import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
import TableList from "../layout/table/TableList";

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
          <TableList stockDays={_stockDays} date={date} />
        </div>
      )}
    </>
  );
};

export default StockDataSearch;
