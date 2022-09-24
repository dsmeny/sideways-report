import { useState, useEffect, useRef } from "react";
import { validateSentiment } from "./NewsCard.helpers";
import { DataViewItem, DataViewList } from "../../Views.structure";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import classes from "../News.module.css";

const INCREMENT_BY = 50;

const Sidebar = ({ ticker_label }) => {
  const [tickerSentiment, setTickerSentiment] = useState([]);
  const [counter, setCounter] = useState({
    count: 4,
    count_length: ticker_label.length,
    upper_bound: 1,
    lower_bound: 4,
  });

  const { count, count_length, upper_bound, lower_bound } = counter;

  const listRef = useRef([]);
  const countRef = useRef(0);

  function countHandler(direction) {
    const listRefNode = listRef.current;
    switch (direction) {
      case "up":
        countRef.current = countRef.current + INCREMENT_BY;
        listRefNode.style.translate = `0 ${countRef.current}px`;
        setCounter((prop) => {
          return {
            ...prop,
            upper_bound: prop.upper_bound - 1,
            lower_bound: prop.lower_bound - 1,
          };
        });
        break;
      case "down":
        countRef.current = countRef.current - INCREMENT_BY;
        listRefNode.style.translate = `0 ${countRef.current}px`;

        setCounter((prop) => {
          return {
            ...prop,
            lower_bound: prop.lower_bound + 1,
            upper_bound: prop.upper_bound + 1,
          };
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setTickerSentiment(() => ticker_label);
  }, []);

  return (
    <div className={classes["news-sidebar"]}>
      {count_length > 4 && (
        <div className={classes.counter}>
          <p>{`${lower_bound}/${count_length}`}</p>
        </div>
      )}
      <div className={classes["news-sidebar-list"]}>
        {count_length > 4 && upper_bound > 1 && (
          <div className={classes.arrows} onClick={() => countHandler("up")}>
            <FiChevronUp />
          </div>
        )}
        <div className={classes["news-sidebar-items"]}>
          <ul ref={listRef}>
            {tickerSentiment.map(
              ({ ticker, ticker_sentiment_label: label }) => (
                <DataViewItem
                  key={ticker.toLowerCase()}
                  className={classes["news-sidebar-item"]}
                >
                  <p>{ticker}</p>
                  <>
                    {validateSentiment(label) === "bull" && (
                      <p style={{ color: "green" }}>
                        {/Somewhat/.test(label) ? (
                          label
                        ) : (
                          <strong>{label}</strong>
                        )}
                      </p>
                    )}
                    {validateSentiment(label) === "bear" && (
                      <p style={{ color: "red" }}>
                        {/Somewhat/.test(label) ? (
                          label
                        ) : (
                          <strong>{label}</strong>
                        )}
                      </p>
                    )}
                    {validateSentiment(label) === "neutral" && <p>{label}</p>}
                  </>
                </DataViewItem>
              )
            )}
          </ul>
        </div>
        {count_length > 4 && lower_bound !== count_length && (
          <div className={classes.arrows} onClick={() => countHandler("down")}>
            <FiChevronDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
