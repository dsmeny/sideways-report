import { useContext } from "react";
import Button from "../../ui/Button";
import TableRow from "./TableRow";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableHead = () => {
  const { activeTbodyHandler, stocks, stats } = useContext(StockContext);

  return (
    <>
      <thead>
        <tr className={classes.btn_row}>
          <th>
            <Button status={stocks} activeTbodyHandler={activeTbodyHandler}>
              Overview
            </Button>
          </th>
          <th>
            <Button status={stats} activeTbodyHandler={activeTbodyHandler}>
              Stats
            </Button>
          </th>
        </tr>
        {stocks && stocks === true && (
          <TableRow
            tableHeaders={["Date", "Open", "High", "Low", "Close", "Volume"]}
          />
        )}
        {stats && stats === true && (
          <TableRow
            tableHeaders={["Date", "Day", "Average", "Gain%", "Vol -/+"]}
          />
        )}
      </thead>
    </>
  );
};

export default TableHead;