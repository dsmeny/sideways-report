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
    e.stopPropagation();
    const target = e.currentTarget;
    target.classList.toggle(classes.addHighlighting);
  }

  const statsCallback = useCallback((stock) => convertStats(stock), []);

  function convertStats(stockArray) {
    let tempNumbers = 0;

    const stockReducer = stockArray.reduce((acc, stock) => {
      if (stock[0] !== undefined) {
        for (let key in stock[1]) {
          if (key !== "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            tempNumbers += +number;
          }
        }

        function getDayOfTheWeek(daystring) {
          const dayArr = daystring.split("-");
          const date = new Date(`${dayArr[0]}, ${dayArr[1]}, ${dayArr[2]}`);
          return date.toDateString().split(" ").shift();
        }
        const statObj = {
          date: stock[0],
          day: getDayOfTheWeek(stock[0]),
          avg: +(tempNumbers / 4).toFixed(2),
          gain: 0.0,
          vol: 0.0,
        };
        tempNumbers = 0;
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
        <TableBody>
          {props.stockDays.map((stock, index) => (
            <tr onClick={highlightHandler}>
              <td key={Math.random() + (index + 1)}>{stock[0]}</td>
              {stocks === true && (
                <>
                  <td>{(+stock[1]["1. open"]).toFixed(2)}</td>
                  <td>{(+stock[1]["2. high"]).toFixed(2)}</td>
                  <td>{(+stock[1]["3. low"]).toFixed(2)}</td>
                  <td>{(+stock[1]["4. close"]).toFixed(2)}</td>
                  <td>
                    {(() => {
                      // formatting vol #'s xxx,xxx,xxx
                      let string = stock[1]["5. volume"];
                      let replaced = string.split(/(\d{3})(\d{3})(?!\d)/);
                      replaced.pop();
                      return replaced.join(",");
                    })()}
                  </td>
                </>
              )}
              {stats === true && stockStats[index] !== undefined && (
                <>
                  <td>{stockStats[index]["day"]}</td>
                  <td>{(+stockStats[index]["avg"]).toFixed(2)}</td>
                  <td>{stockStats[index]["gain"]}</td>
                  <td>{stockStats[index]["vol"]}</td>
                </>
              )}
            </tr>
          ))}
        </TableBody>
      </table>
    </>
  );
};

export default TableList;
