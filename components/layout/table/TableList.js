import { useContext, useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import StockContext from "../../../store/stock-provider";
import classes from "./TableList.module.css";

const TableList = (props) => {
  const { stocks, stats } = useContext(StockContext);

  function highlightHandler(e) {
    e.preventDefault();
    const target = e.target;
    target.classList.toggle(classes.addHighlighting);
  }

  return (
    <>
      <table className={classes.tableStyle}>
        <TableHead />
        {stocks && stocks === true && (
          <TableBody>
            {props.stockDays
              .filter((array) => array[0] !== props.date)
              .map((stock, index) => (
                <tr
                  onClick={(e) => highlightHandler(e)}
                  key={Math.random() + index}
                >
                  <td>{stock[0]}</td>
                  {Object.entries(stock[1]).map(
                    (arr, index) =>
                      (index === 4 && (
                        <td key={Math.random() + index}>
                          {(arr[1] / 1000000).toFixed(3)}
                        </td>
                      )) || <td key={Math.random() + index}>{arr[1]}</td>
                  )}
                </tr>
              ))}
          </TableBody>
        )}
        {stats && stats === true && (
          <TableBody>
            <tr>
              <td>Stats!</td>
            </tr>
          </TableBody>
        )}
      </table>
    </>
  );
};

export default TableList;
