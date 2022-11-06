import useTableFilter from "./useTableFilter";
import StockItem from "./Table.list.item";
import { DataViewItem, DataViewList } from "../../Views.structure";
import Spinner from "../../../spinner/Spinner";
import Header from "../header/Header";
import classes from "../History.module.css";

const HEADERS = ["date", "open", "high", "low", "close", "volume"];

const StockList = ({ stocks }) => {
  const stockData = useTableFilter(stocks);

  // const dataWithHeaders = stockData.unshift(HEADERS);
  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const styles = {
    header: {
      position: "fixed",
      left: "10px",
      top: "148px",
      zIndex: 9999,
    },
    lists: {
      position: "fixed",
      left: "81px",
      top: "148px",
      zIndex: 1,
      overflowX: "hidden",
    },
  };

  return (
    <DataViewList>
      <DataViewItem style={styles.header}>
        <Header />
      </DataViewItem>
      <DataViewItem style={styles.lists}>
        <div className={classes["list-cols"]}>
          {stockData.map((entry, index) => (
            <DataViewItem
              className={`${classes["list-item-row"]} ${classes["row-styling"]}`}
              key={index}
            >
              <StockItem
                items={{ date: entry[0], prices: entry[1] }}
                className={`${classes["list-item-row"]} ${classes["list-header-width"]}`}
              />
            </DataViewItem>
          ))}
        </div>
      </DataViewItem>
    </DataViewList>
  );
};

export default StockList;
