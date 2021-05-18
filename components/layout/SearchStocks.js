import Link from "next/link";
import { useContext } from "react";
import TriggerContext from "../../store/context-provider";
import styles from "./SearchStocks.module.css";

const SearchStocks = ({ stockSymbol, changeHandler, inputRef }) => {
  const searcContext = useContext(TriggerContext);
  return (
    <>
      <div className={searcContext.searchTrigger ? "show_view" : "hide_view"}>
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
          <input type="text" placeholder="symbol" ref={inputRef} autoFocus />
          <input type="date" onChange={changeHandler} />
        </div>
      </div>
    </>
  );
};

export default SearchStocks;
