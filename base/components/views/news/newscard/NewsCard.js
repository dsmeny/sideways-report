import { useRef, useState } from "react";
import useMobile from "../../../../hooks/useMobile";
import NewsCardSidebar from "./NewsCard.sidebar";
import Sentiment from "./NewsCard.sentiment";
import NewsCardSummary from "./NewsCard.summary";
import NewsCardContainer from "./NewsCard.container";
import { newsModel } from "../../../../../constants";
import classes from "../News.module.css";

const NewsCard = ({ news }) => {
  const { isMobile } = useMobile();
  const [radioState, setRadioState] = useState({
    r1: true,
    r2: false,
  });
  const { r1, r2 } = radioState;

  const containerRef = useRef();
  const sentimentRef = useRef();

  const radioHandlers = () => {
    setRadioState((prev) => {
      return {
        r1: !prev.r1,
        r2: !prev.r2,
      };
    });
  };

  const {
    authors,
    image,
    overall_sentiment,
    source,
    summary,
    ticker_sentiment,
    time,
    title,
    url,
  } = newsModel(news);

  return (
    <div className={classes["news-card"]}>
      <Sentiment image={image} overall={overall_sentiment} />
      <div className={classes.radios}>
        <div>
          <input
            type="radio"
            checked={r1}
            onChange={radioHandlers}
            id="summary"
            className={classes.radio}
          />
          <input
            type="radio"
            checked={r2}
            onChange={radioHandlers}
            id="sentiment"
            className={classes.radio}
          />
        </div>
      </div>
      <div className={classes["news-container"]} ref={containerRef}>
        {isMobile ? (
          r1 ? (
            <NewsCardSummary
              authors={authors}
              source={source}
              summary={summary}
              time={time}
              title={title}
              url={url}
            />
          ) : (
            <NewsCardSidebar
              ticker_label={ticker_sentiment}
              sentimentRef={sentimentRef}
            />
          )
        ) : (
          <NewsCardContainer
            sentimentRef={sentimentRef}
            authors={authors}
            source={source}
            summary={summary}
            ticker_sentiment={ticker_sentiment}
            time={time}
            title={title}
            url={url}
          />
        )}
      </div>
    </div>
  );
};

export default NewsCard;
