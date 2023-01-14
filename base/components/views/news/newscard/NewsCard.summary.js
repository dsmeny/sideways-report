import Links from "../../../link/Links";
import { formatNewsDate } from "./NewsCard.helpers";
import { FaExternalLinkAlt } from "react-icons/fa";
import classes from "../News.module.css";

const NewsCardSummary = ({ authors, source, summary, time, title, url }) => {
  return (
    <div className={classes["news-content-summary"]}>
      <p>{formatNewsDate(time)}</p>
      <p className={`${classes["news-content-title"]}`}>
        <strong>{title}</strong>
      </p>
      <hr />
      <p>{summary}</p>
      <div className={classes["news-content-links"]}>
        <p className={classes["shorten-text"]}>{authors.join(", ")}</p> |{" "}
        <p className={classes["shorten-text"]}>{source}</p> |
        <Links url={url} Icon={FaExternalLinkAlt} />
      </div>
    </div>
  );
};

export default NewsCardSummary;
