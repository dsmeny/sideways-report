import useByDate from "../header/filters/useByDate";
import { DataViewItem, DataViewList } from "../../Views.structure";
import Spinner from "../../../spinner/Spinner";
import Header from "../header/Header.headers";
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
  const stockData = useByDate(stocks);

  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const containerStyle = {
    width: "91vw",
    overflow: "hidden",
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
          <div className={classes["table-list-items"]}>
            {stockData.map((entry, index) => (
              <DataViewItem key={index} className={classes.backgrounds}>
                <StockItem items={{ date: entry[0], prices: entry[1] }} />
              </DataViewItem>
            ))}
          </div>
        </div>
      </DataViewItem>
    </DataViewList>
  );
};

export default StockList;
