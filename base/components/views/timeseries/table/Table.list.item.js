import { DataViewItem, DataViewList } from "../../Views.structure";
import { convertNumber } from "../../../../helpers/general.helpers";

const StockItem = ({ items, ...delegated }) => {
  return (
    <DataViewList {...delegated}>
      {items.map((el, index) => (
        <DataViewItem key={index}>
          {index === 4 ? convertNumber(el) : el}
        </DataViewItem>
      ))}
    </DataViewList>
  );
};

export default StockItem;
