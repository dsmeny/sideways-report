import classes from "./Table.module.css";
import TableList from "./TableList";

const Table = () => {
  const [stocks, setStocks] = useState([]);
  const [pState, setState] = useState({
    page: 0,
    pp: 7,
    plength: 0,
  });
  const [hasStocks, setHasStocks] = useState(false);

  const clickHandler = (e) => {
    let target = e.target.textContent;
    if (target === "next") {
      setState((prev) => {
        return {
          ...prev,
          page: pState.page + 1,
        };
      });
    } else if (target === "prev") {
      setState((prev) => {
        return {
          ...prev,
          page: pState.page - 1,
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          page: +target - 1,
        };
      });
    }
  };

  useEffect(() => {
    async function fetcher() {
      const response = await fetch("/data.json");
      const data = await response.json();
      data && setStocks(Object.entries(data["Time Series (Daily)"]));
    }
    fetcher();

    let timer = setTimeout(() => setHasStocks(true), 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasStocks && pState.page === 0) {
      setState((prev) => {
        return { ...prev, plength: stocks.length };
      });
    }
  }, [hasStocks]);

  return (
    <div className={classes.Table}>
      <header className={classes["Table-header"]}>
        <h1>Stocks</h1>
        {stocks.length > 0 && (
          <TableList
            pState={pState}
            stocks={stocks}
            clickHandler={clickHandler}
          />
        )}
      </header>
    </div>
  );
};

export default Table;
