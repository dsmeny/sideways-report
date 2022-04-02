import { useContext } from "react";
import StockContext from "../../../store/stock-provider";

const TableRow = () => {
  const { labels } = useContext(StockContext);
  const overviewHeaders = ["Day", "Average", "Gain %", "Volume", "Vol %"];
  const ohlcHeaders = ["Open", "High", "Low", "Close"];

  return (
    <tr>
      <th>Date</th>
      {labels.STATS && overviewHeaders.map((header) => <th>{header}</th>)}
      {labels.DAILY && ohlcHeaders.map((header) => <th>{header}</th>)}
    </tr>
  );
};

export default TableRow;
