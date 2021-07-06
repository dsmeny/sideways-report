import { useContext } from "react";
import StockContext from "../../../store/stock-provider";

const TableRow = () => {
  const { activeTbodyHandler, stocks, stats } = useContext(StockContext);
  const stockHeaders = ["Open", "High", "Low", "Close", "Volume"];
  const statHeaders = ["Day", "Average", "Gain %", "Vol %"];

  return (
    <tr>
      <th>Date</th>
      {stocks && stockHeaders.map((header) => <th>{header}</th>)}
      {stats && statHeaders.map((header) => <th>{header}</th>)}
    </tr>
  );
};

export default TableRow;
