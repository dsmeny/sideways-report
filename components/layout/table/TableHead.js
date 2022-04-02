import { useContext } from "react";
import Button from "../../ui/Button";
import TableRow from "./TableRow";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableHead = () => {
  const { activeTbodyHandler, stats, daily, labels } = useContext(StockContext);

  return (
    <>
      <thead>
        <tr className={classes.btn_row}>
          <th>
            <Button status={stats} activeTbodyHandler={activeTbodyHandler}>
              {labels.STATS}
            </Button>
          </th>
          <th>
            <Button status={daily} activeTbodyHandler={activeTbodyHandler}>
              {labels.DAILY}
            </Button>
          </th>
        </tr>
        <TableRow />
      </thead>
    </>
  );
};

export default TableHead;
