import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });

  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const series = stockData["Time Series (Daily)"];

  return (
    <div>
      <StockCard
        stockData={Object.entries(series[`${date}`])}
        date={date}
        symbol={symbol}
      />
    </div>
  );
};

export default StockDataSearch;
