import { DataViewItem, DataViewList } from "../../Views.structure";
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

export default StockItem;
