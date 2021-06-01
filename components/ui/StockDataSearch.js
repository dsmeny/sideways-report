import { useContext } from "react";
import context_provider from "../../store/context-provider";
import useStockApi from "../../hooks/useStockApi";
import StockCard from "../../components/layout/StockCard";
import Spinner from "../../components/ui/Spinner";

const StockDataSearch = ({ userSymbol, timeSeries }) => {
  const { symbols } = useContext(context_provider);
  const symbol = symbols.find((s) => s[0] === userSymbol[0]);

  const { stockData, isLoading, isError } = useStockApi({
    symbol: symbol[0],
    timeSeries,
  });

  const styles = {
    spinner: {
      position: "relative",
      top: "30rem",
      transform: "translateY(-10rem)",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gridGap: "20px",
      listStyleType: "none",
    },
  };

  if (isLoading)
    return (
      <div style={styles.spinner}>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error</div>;

  const series = stockData["Time Series (Daily)"];

  return (
    <div style={styles.container}>
      {symbols &&
        symbols.map((el) => (
          <StockCard
            stockData={Object.entries(series[`${[el[1]]}`])}
            symbol={el}
          />
        ))}
    </div>
  );
};

export default StockDataSearch;
