import { useContext } from "react";
import useStockApi from "../../utility/hooks/useStockApi";
import StockCard from "../cards/StockCard";
import Spinner from "../../ui/Spinner";
import TableList from "../table/TableList";
import TriggerContext from "../../../store/context-provider";
import { getTarget } from "../../utility/calendar_functions";

const StockDataSearch = ({ date, symbol, timeSeries }) => {
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
  const mapData = getTarget(_stockDays, date);
  const mapIterator = mapData.entries();
  const mapArray = mapIterator.next().value;

  // console.log("date:", date);
  console.log("mapData:", mapData);
  // console.log("mapArray:", mapArray);

  return (
    <>
      <div>
        <StockCard
          clickHandler={scrollRefresh}
          stockData={mapArray[1]}
          date={mapArray[0]}
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
