import { useContext, useState, useCallback, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableList = (props) => {
  const [stockStats, setStockStats] = useState([]);
  const { stocks, stats } = useContext(StockContext);
  const [count, setCount] = useState(0);

  function highlightHandler(e) {
    e.preventDefault();
    const target = e.target;
    target.classList.toggle(classes.addHighlighting);
  }

  const statsCallback = useCallback((stock) => convertStats(stock), []);

  function convertStats(stockArray) {
    let tempNumbers = 0;

    const stockReducer = stockArray.reduce((acc, stock) => {
      if (stock[0] !== props.date) {
        for (let key in stock[1]) {
          if (key !== "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            tempNumbers += +number;
          }
        }

        const statObj = {
          date: stock[0],
          day: "Mon",
          avg: +(tempNumbers / 4).toFixed(2),
          gain: 0.0,
          vol: 0.0,
        };
        return [...acc, statObj];
      } else return [];
    }, []);

    setStockStats(stockReducer);
  }

  useEffect(() => {
    statsCallback(props.stockDays);
  }, [stats]);

  // stockStats && console.log("stockStats:", stockStats);
  // props.stockDays && console.log("props.stockDays:", props.stockDays);

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
                    <td>{stock[1]["1. open"]}</td>
                    <td>{stock[1]["2. high"]}</td>
                    <td>{stock[1]["3. low"]}</td>
                    <td>{stock[1]["4. close"]}</td>
                    <td>{stock[1]["5. volume"]}</td>
                  </tr>
                ))}
          </TableBody>
        )}
        {stats === true && (
          <TableBody>
            {stockStats &&
              stockStats.map(({ avg, date, day, gain, vol }, index) => (
                <tr key={Math.random() + index}>
                  <td>{date}</td>
                  <td>{day}</td>
                  <td>{avg}</td>
                  <td>{gain}</td>
                  <td>{vol}</td>
                </tr>
              ))}
          </TableBody>
        )}
      </table>
    </>
  );
};

export default TableList;
