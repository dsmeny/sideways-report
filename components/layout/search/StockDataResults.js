import { useContext } from "react";
import useStockApi from "../../utility/hooks/useStockApi";
import StockCard from "../cards/StockCard";
import Spinner from "../../ui/Spinner";
import TableList from "../table/TableList";
import TriggerContext from "../../../store/context-provider";
import styles from "./StockDataSearch.module.css";

const StockDataSearch = ({ symbol, timeSeries }) => {
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

  const series = stockData["Time Series (Daily)"];

  const _stockDays = Object.entries(series);
  const recentDate = _stockDays.shift();

  return (
    <>
      <div className={styles.data}>
        <StockCard
          clickHandler={scrollRefresh}
          stockData={recentDate[1]}
          date={recentDate[0]}
          symbol={timeSeries ? symbol : stockData["Meta Data"]["2. Symbol"]}
          isClicked={clickedTrigger}
          key={Math.random() * 1}
        />
      </div>
      {/* {clickedTrigger && (
        <div className={styles.TableList}>
          <TableList stockDays={_stockDays} />
        </div>
      )} */}
    </>
  );
};

export default StockDataSearch;
