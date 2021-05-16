import styles from "./SearchStocks.module.css";

const SearchStocks = ({
  classTrigger,
  stockSymbol,
  changeHandler,
  inputRef,
}) => {
  return (
    <>
      <div className={classTrigger ? "hide_bar" : "show_bar"}>
        {stockSymbol && (
          <div className={styles.search_details}>
            <h3>{stockSymbol}</h3>
            <span>
              <Link href={`/${stockSymbol}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.dots}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Link>
            </span>
          </div>
        )}
        <div className={styles.search_buttons}>
          <input
            type="text"
            className={classTrigger ? styles.hide_bar : ""}
            placeholder="symbol"
            ref={inputRef}
            autoFocus
          />
          <input type="date" onChange={changeHandler} />
        </div>
      </div>
    </>
  );
};

export default SearchStocks;
