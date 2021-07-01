import { useContext, useState, useCallback } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableList = (props) => {
  const [stockStats, setStockStats] = useState([]);
  const { stocks, stats } = useContext(StockContext);

  function highlightHandler(e) {
    e.preventDefault();
    const target = e.target;
    target.classList.toggle(classes.addHighlighting);
  }

  let tempNumbers = 0;

  const statsCallback = useCallback((stock) => convertStats(stock), [stocks]);

  function convertStats(stockObj) {
    for (let key in stockObj) {
      if (key !== "5. volume") {
        let number = (+stockObj[key]).toFixed(2);
        tempNumbers += +number;
      }
    }

    const statObj = {
      date: props.date,
      day: "Mon",
      avg: +(tempNumbers / 4).toFixed(2),
      gain: 0.0,
      vol: 0.0,
    };

    setStockStats((prev) => [...prev, statObj]);
  }

  return (
    <>
      <table className={classes.tableStyle}>
        <TableHead />
        {stocks === true && (
          <TableBody>
            {stocks === true &&
              props.stockDays
                .filter((array) => array[0] !== props.date)
                .map((stock, index) => (
                  <tr onClick={highlightHandler} key={Math.random() + index}>
                    <td key={Math.random() + (index + 1)}>{stock[0]}</td>
                    {statsCallback(stock[1])}
                  </tr>
                ))}
          </TableBody>
        )}
        {stats === true && (
          <TableBody>
            {stockStats &&
              stockStats.map((stats) => {
                <>
                  <td>{stats.date}</td>
                  <td>{stats.day}</td>
                  <td>{stats.avg}</td>
                  <td>{stats.gain}</td>
                  <td>{stats.vol}</td>
                </>;
              })}
          </TableBody>
        )}
      </table>
    </>
  );
};

export default TableList;
