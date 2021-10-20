import { useContext } from "react";
import useStockApi from "../../utility/hooks/useStockApi";
import StockCard from "../cards/StockCard";
import Spinner from "../../ui/Spinner";
import TableList from "../table/TableList";
import TriggerContext from "../../../store/context-provider";

const StockDataSearch = ({ symbol, timeSeries }) => {
  const { stockData, isError } = useStockApi({ symbol, timeSeries });
  const { scrollRefresh, clickedTrigger } = useContext(TriggerContext);

  const spinnerStyle = {
    position: "relative",
    top: "30rem",
    transform: "translateY(-10rem)",
  };

  if (!stockData)
    return (
      <div style={spinnerStyle}>
        <Spinner />
      </div>
    );

  if (isError) return <div>Error</div>;

  const series = stockData["Time Series (Daily)"];

  const _stockDays = Object.entries(series);
  const recentDate = _stockDays.shift();

  return (
    <>
      <div>
        <StockCard
          clickHandler={scrollRefresh}
          stockData={recentDate[1]}
          date={recentDate[0]}
          symbol={symbol}
          isClicked={clickedTrigger}
          key={Math.random() * 1}
        />
      </div>
      {clickedTrigger && (
        <div>
          <TableList stockDays={_stockDays} />
        </div>
      )}
    </>
  );
};

export default StockDataSearch;
