import { useContext } from "react";
import StockContext from "../../../store/stock-provider";

const TableRow = () => {
  const { activeTbodyHandler, overview, ohlc } = useContext(StockContext);
  const overviewHeaders = ["Day", "Average", "Gain %", "Volume", "Vol %"];
  const ohlcHeaders = ["Open", "High", "Low", "Close"];

  return (
    <tr>
      <th>Date</th>
      {overview && overviewHeaders.map((header) => <th>{header}</th>)}
      {ohlc && ohlcHeaders.map((header) => <th>{header}</th>)}
    </tr>
  );
};

export default TableRow;
