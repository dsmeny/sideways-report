import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";
const StockDataSearch = ({ date, symbol, timeSeries }) => {
  const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });

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
  // console.log("series:", series);

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
