import StockItem from "../table/Table.list.item";
import classes from "./Header.module.css";

const headers = ["open", "high", "low", "close", "volume"];

const Tableheaders = () => {
  return (
    <div className={classes["tableheader-row"]}>
      <div style={{ width: "10rem", whiteSpace: "nowrap", textAlign: "left" }}>
        date
      </div>
      <div className={classes["tableheader-container"]}>
        <StockItem
          items={headers}
          className={classes["tableheader-container-options"]}
        />
      </div>
    </div>
  );
};

export default Tableheaders;
