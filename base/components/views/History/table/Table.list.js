import useTableFilters from "./useTable.filters";
import { DataViewItem, DataViewList } from "../../Views.structure";
import Spinner from "../../../spinner/Spinner";
import Header from "./Table.list.headers";
import { convertNumber } from "../../../../helpers/general.helpers";
import { timeseriesModel } from "../../../../../constants";
import classes from "../History.module.css";

const StockItem = ({ items }) => {
  const { date, prices } = items;

  const keys = Object.values(timeseriesModel(prices));

  return (
    <DataViewList
      className={`${classes["tablelist-wrapper-options"]} ${classes["row-styling"]}`}
    >
      <DataViewItem>{date}</DataViewItem>
      {keys.map((el, index) => (
        <DataViewItem key={index}>
          {index === 4 ? convertNumber(el) : el}
        </DataViewItem>
      ))}
    </DataViewList>
  );
};

const StockList = ({ stocks }) => {
  const filteredData = useTableFilters(stocks);

  if (!filteredData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const containerStyle = {
    overflow: "hidden",
    background: "white",
  };

  return (
    <DataViewList className={classes["table-list-container"]}>
      <DataViewItem>
        <Header />
      </DataViewItem>
      <DataViewItem
        style={containerStyle}
        className={classes["table-list-desktop"]}
      >
        <div className={classes["scrolling"]}>
          <DataViewList className={classes["table-list-items"]}>
            {filteredData.map((entry, index) => (
              <DataViewItem key={index} className={classes.backgrounds}>
                <StockItem items={{ date: entry[0], prices: entry[1] }} />
              </DataViewItem>
            ))}
          </DataViewList>
        </div>
      </DataViewItem>
    </DataViewList>
  );
};

export default StockList;
