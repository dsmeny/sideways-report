import { useContext } from "react";
import useStockApi from "../../utility/hooks/useStockApi";
import StockCard from "../cards/StockCard";
import Spinner from "../../ui/Spinner";
import TableList from "../table/TableList";
import TriggerContext from "../../../store/context-provider";
import { recentTradeDay } from "../../utility/calendar_functions";

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
          stockData={_stockDays.find((array, index) => {
            if (
              recentTradeDay(date) === "sun" ||
              recentTradeDay(date) === "sat"
            ) {
            }
          })}
          symbol={symbol}
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
