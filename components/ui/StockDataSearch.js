import { useState, useEffect, useContext } from "react";
import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
import TableList from "../layout/table/TableList";
import TriggerContext from "../../store/context-provider";

const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });
  const { scrollRefresh, clickedTrigger } = useContext(TriggerContext);

  const spinnerStyle = {
    position: "relative",
    top: "30rem",
    transform: "translateY(-10rem)",
  };

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
          clickHandler={scrollRefresh}
          stockData={_stockDays.filter((array) => array[0] === date)}
          symbol={symbol}
          date={date}
          isClicked={clickedTrigger}
          key={Math.random() * 1}
        />
      </div>
      {clickedTrigger && (
        <div>
          <TableList stockDays={_stockDays} date={date} />
        </div>
      )}
    </>
  );
};

export default StockDataSearch;
