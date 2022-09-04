import useStockApi from "../../base/hooks/useStockApi";
import StockCard from "../stockcard";
import Spinner from "../../base/components/spinner";
import styles from "./StockSearchResults.module.css";

const SearchStockResults = ({ symbol, timeSeries }) => {
  const { stockData, isError } = useStockApi({ symbol, timeSeries });

  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (typeof stockData === "string") {
    return (
      <div className={styles.notification}>
        <pre style={{ display: "none" }}>
          {setTimeout(() => location.reload(), 1800)}
        </pre>
        <p style={{ fontSize: "1.2rem" }}>{stockData}</p>
      </div>
    );
  }

  if (isError) return <div>Error</div>;

  return (
    <>
      <div className={styles.data}>
        <StockCard stockData={stockData} key={Math.random() * 1} />
      </div>
    </>
  );
};

export default SearchStockResults;
