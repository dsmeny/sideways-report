import { useState, useEffect, useRef } from "react";
import { validateSentiment } from "./NewsCard.helpers";
import { DataViewItem } from "../../Views.structure";
import { counterNodes } from "./NewsCard.helpers";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import classes from "../News.module.css";

const INCREMENT_BY = 50;

const Sidebar = ({ ticker_label, sentimentRef }) => {
  const [tickerSentiment, setTickerSentiment] = useState([]);
  const [counter, setCounter] = useState({
    count_length: ticker_label.length,
    upper_bound: 1,
    lower_bound: 4,
  });

  const { count_length, upper_bound, lower_bound } = counter;

  const listRef = useRef([]);
  const countRef = useRef(0);

  function countHandler(direction) {
    counterNodes(direction, listRef, countRef, setCounter, INCREMENT_BY);
  }

  useEffect(() => {
    setTickerSentiment(() => ticker_label);
  }, []);

  return (
    <div className={classes["news-sidebar"]}>
      <div>
        <h2>Ticker Sentiment</h2>
        {count_length > 4 && (
          <div ref={sentimentRef}>
            <p>{`${lower_bound}/${count_length}`}</p>
          </div>
        )}
      </div>
      <div className={classes["news-sidebar-items"]}>
        <div className={classes["news-sidebar-container"]}>
          {count_length > 4 && upper_bound > 1 && (
            <div className={classes.arrows} onClick={() => countHandler("up")}>
              <FiChevronUp />
            </div>
          )}
          <div className={classes["news-sidebar-list"]}>
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
            <div
              className={classes.arrows}
              onClick={() => countHandler("down")}
            >
              <FiChevronDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
