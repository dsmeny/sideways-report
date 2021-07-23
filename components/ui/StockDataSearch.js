import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
import { getTarget } from "../../functions/calendar";
const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error</div>;

  const series = stockData["Time Series (Daily)"];

  const data = Object.entries(series);

  const mapData = getTarget(data, date);
  const mapIterator = mapData.entries();
  const mapArray = mapIterator.next().value;
  console.log("mapArray:", mapArray);

  return (
    <div>
      <StockCard stockData={mapArray[1]} date={mapArray[0]} symbol={symbol} />
    </div>
  );
};

export default StockDataSearch;
