import useNewsRefs from "./useNewsRefs";
import Links from "../../../link/Links";
import NewsCardSidebar from "./NewsCard.sidebar";
import Sentiment from "./NewsCard.sentiment";
import { newsModel } from "../../../../../constants";
import { formatNewsDate } from "./NewsCard.helpers";
import { FaExternalLinkAlt } from "react-icons/fa";
import classes from "../News.module.css";

const NewsCard = ({ news }) => {
  const [{ containerRef, radioRef, sentimentRef }, radioHandlers] =
    useNewsRefs();
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
      <div className={classes.radios} ref={radioRef}>
        <div>
          <input
            type="radio"
            onChange={radioHandlers}
            checked
            id="summary"
            className={classes.radio}
          />
          <input
            type="radio"
            onChange={radioHandlers}
            id="sentiment"
            className={classes.radio}
          />
        </div>
      </div>
      <div className={classes["news-container"]} ref={containerRef}>
        <div className={classes["news-content-summary"]}>
          <p>{formatNewsDate(time)}</p>
          <p className={classes["news-content-title"]}>
            <strong>{title}</strong>
          </p>
          <hr />
          <p>{summary}</p>
          <div className={classes["news-content-links"]}>
            <p>{authors.join(", ")}</p> | <p>{source}</p> |
            <Links url={url} Icon={FaExternalLinkAlt} />
          </div>
        </div>
        <NewsCardSidebar
          ticker_label={ticker_sentiment}
          sentimentRef={sentimentRef}
        />
      </div>
    </div>
  );
};

export default NewsCard;
