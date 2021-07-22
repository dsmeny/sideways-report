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

  // console.log("date:", date);
  // console.log("data:", data);
  const targetData = getTarget(data, date);
  console.log("target_data:", targetData);

  return (
    <div>
      <StockCard
        stockData={Object.entries(series["2021-07-21"])}
        date={date}
        symbol={symbol}
      />
    </div>
  );
};

export default StockDataSearch;
