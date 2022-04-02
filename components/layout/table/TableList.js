import { useContext, useCallback, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import StockContext from "../../../store/stock-provider";
import { convertNumber } from "../../utility/general";
import classes from "./TableList.module.css";
import useStatSetter from "../../utility/hooks/useStatSetter";

const TableList = (props) => {
  const { labels } = useContext(StockContext);
  const { stockStats, convertStats } = useStatSetter();

  console.log("TableList _stockDays: ", props.stockDays);

  const statsCallback = useCallback((stock) => convertStats(stock), []);

  const highlightHandler = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    target.classList.toggle(classes.addHighlighting);
  };

  useEffect(() => {
    statsCallback(props.stockDays);
  }, [labels.DAILY]);

  return (
    <>
      <table className={classes.tableStyle}>
        <TableHead />
        <TableBody>
          {props.stockDays.map((stock, index) => (
            <tr onClick={highlightHandler}>
              <td key={Math.random() + (index + 1)}>{stock[0]}</td>
              {labels.STATS === true && stockStats[index] !== undefined && (
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
                      return convertNumber(string);
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
              {labels.DAILY === true && (
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
