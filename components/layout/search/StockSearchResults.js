import { useContext } from "react";
import useStockApi from "../../utility/hooks/useStockApi";
import StockCard from "../cards/StockCard";
import Spinner from "../../ui/Spinner";
import TableList from "../table/TableList";
import TriggerContext from "../../../store/context-provider";
import styles from "./StockSearchResults.module.css";

const StockSearchResults = ({ symbol, timeSeries }) => {
  const { stockData, isError } = useStockApi({ symbol, timeSeries });
  const { scrollRefresh, clickedTrigger } = useContext(TriggerContext);

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
        <p style={{ fontSize: "1.2rem" }}>
          Symbol does not exist in the AlphaVantage API. Try something else.
        </p>
      </div>
    );
  }

  if (isError) return <div>Error</div>;

  return (
    <>
      <div className={styles.data}>
        <StockCard
          clickHandler={scrollRefresh}
          stockData={stockData}
          isClicked={clickedTrigger}
          key={Math.random() * 1}
        />
      </div>
      {clickedTrigger && (
        <div className={styles.TableList}>
          <TableList symbol={symbol} timeSeries={"Time Series (Daily)"} />
        </div>
      )}
    </>
  );
};

export default StockSearchResults;
