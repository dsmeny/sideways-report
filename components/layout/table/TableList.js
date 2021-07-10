import { useContext, useState, useCallback, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import StockContext from "../../../store/stock-provider";
import { formatLargeNum, calcNums } from "../../utility/functions";
import classes from "./TableList.module.css";

const TableList = (props) => {
  const [stockStats, setStockStats] = useState([]);
  const { overview, ohlc } = useContext(StockContext);

  function highlightHandler(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    target.classList.toggle(classes.addHighlighting);
  }

  const statsCallback = useCallback((stock) => convertStats(stock), []);

  function convertStats(stockArray) {
    let gainNumbers = 0;
    let volNumbers = 0;

    const stockReducer = stockArray.reduce((acc, stock, index) => {
      console.log("stock:", stock);
      if (stock[0] !== undefined) {
        for (let key in stock[1]) {
          // calculate average
          if (key !== "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            gainNumbers += +number;
          } else if (key === "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            volNumbers += +number;
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
          avg: +(gainNumbers / 4).toFixed(2),
          gain: 0.0,
          volAvg: +(volNumbers / 2).toFixed(2),
          vol: 0.0,
        };

        if (acc.length > 0) {
          statObj.gain = calcNums(statObj.avg, acc[index - 1].avg).toFixed(2);
          statObj.vol = calcNums(statObj.volAvg, acc[index - 1].volAvg).toFixed(
            2
          );
        }

        gainNumbers = 0;
        volNumbers = 0;

        return [...acc, statObj];
      } else return [];
    }, []);

    setStockStats(stockReducer);
  }

  useEffect(() => {
    statsCallback(props.stockDays);
  }, [ohlc]);

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
              {overview === true && stockStats[index] !== undefined && (
                <>
                  <td>{stockStats[index]["day"]}</td>
                  <td>{(+stockStats[index]["avg"]).toFixed(2)}</td>
                  <td
                    style={{
                      color:
                        stockStats[index + 1] !== undefined &&
                        stockStats[index + 1]["gain"] < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {stockStats[index + 1] !== undefined &&
                      stockStats[index + 1]["gain"]}
                  </td>
                  <td>
                    {(() => {
                      let string = stock[1]["5. volume"];
                      return formatLargeNum(string);
                    })()}
                  </td>
                  <td
                    style={{
                      color:
                        stockStats[index + 1] !== undefined &&
                        stockStats[index + 1]["vol"] < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {stockStats[index + 1] !== undefined &&
                      stockStats[index + 1]["vol"]}
                  </td>
                </>
              )}
              {ohlc === true && (
                <>
                  <td>{(+stock[1]["1. open"]).toFixed(2)}</td>
                  <td>{(+stock[1]["2. high"]).toFixed(2)}</td>
                  <td>{(+stock[1]["3. low"]).toFixed(2)}</td>
                  <td>{(+stock[1]["4. close"]).toFixed(2)}</td>
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
