import { DataViewItem, DataViewList } from "../../Views.structure";
import { convertNumber } from "../../../../helpers/general.helpers";
import classes from "../History.module.css";

const StockItem = ({ items }) => {
  const itemValues = Object.values(items);
  const prices = Object.values(itemValues[1]);

  return (
    <DataViewList className={classes["tableheader-wrapper-options"]}>
      <DataViewItem>{itemValues[0]}</DataViewItem>
      {prices.map((el, index) => (
        <DataViewItem key={index}>
          {index === 4 ? convertNumber(el) : el}
        </DataViewItem>
      ))}
    </DataViewList>
  );
};

export default StockItem;
