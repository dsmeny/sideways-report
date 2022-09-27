import Links from "../../../link/Links";
import NewsCardSidebar from "./NewsCard.sidebar";
import Sentiment from "./NewsCard.sentiment";
import { newsModel } from "../../../../../constants";
import { formatNewsDate } from "./NewsCard.helpers";
import { FaExternalLinkAlt } from "react-icons/fa";

import classes from "../News.module.css";

const NewsCard = ({ news }) => {
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
      <div className={classes["news-container"]}>
        <div className={classes["news-content-summary"]}>
          <p>{formatNewsDate(time)}</p>
          <h3>{title}</h3>
          <hr />
          <p>{summary}</p>
          <div className={classes["news-content-links"]}>
            <p>{authors.join(", ")}</p> | <p>{source}</p> |
            <Links url={url} Icon={FaExternalLinkAlt} />
          </div>
        </div>
        <NewsCardSidebar ticker_label={ticker_sentiment} time={time} />
      </div>
    </div>
  );
};

export default NewsCard;
