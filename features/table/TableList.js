import classes from "./Table.module.css";
import TableItem from "./TableItem";

const TableList = ({ pState, stocks, clickHandler }) => {
  const { page, pp, plength } = pState;
  const array = [...Array(Math.round(plength / pp))];
  const pages = array.reduce((curr, num, index) => {
    if (array.indexOf(array.length) && (plength / pp) % 2 !== 0) {
      return [...curr, index + 1];
    }
  }, []);

  const lowerBound = page === 0 ? page : pp * page;
  const upperBound = page === 0 ? pp : lowerBound + pp;

  const stockdata = stocks.slice(lowerBound, upperBound);

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column",
    },
    content: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      Transition: "all 1s ease",
    },
    list: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      gap: "2rem",
      Transition: "all 1s ease",
    },
  };

  return (
    <div>
      <ul style={styles.wrapper} className={classes.fade}>
        {stockdata.map((entry, index) => (
          <li style={styles.content} key={index}>
            <span>{entry[0]}</span>
            <TableItem items={entry[1]} />
          </li>
        ))}
      </ul>
      <div style={styles.content}>
        <button onClick={clickHandler} disabled={page === 0 ? true : false}>
          prev
        </button>
        <ul style={styles.list}>
          {pages.map((el, index) => (
            <li
              style={{
                background: `${pState.page === index ? "green" : ""}`,
              }}
              onClick={clickHandler}
              key={index}
            >
              {el}
            </li>
          ))}
        </ul>
        <button
          onClick={clickHandler}
          disabled={page === Math.round(plength / pp) - 1 ? true : false}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default TableList;
