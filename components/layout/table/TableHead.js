import { useContext } from "react";
import Button from "../../ui/Button";
import TableRow from "./TableRow";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableHead = () => {
  const { activeTbodyHandler, overview, ohlc } = useContext(StockContext);

  return (
    <>
      <thead>
        <tr className={classes.btn_row}>
          <th>
            <Button status={overview} activeTbodyHandler={activeTbodyHandler}>
              Overview
            </Button>
          </th>
          <th>
            <Button status={ohlc} activeTbodyHandler={activeTbodyHandler}>
              OHLC
            </Button>
          </th>
        </tr>
        <TableRow />
      </thead>
    </>
  );
};

export default TableHead;
