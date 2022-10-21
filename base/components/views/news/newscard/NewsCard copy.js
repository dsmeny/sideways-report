import { useEffect, useState, useRef } from "react";
import Links from "../../../link/Links";
import NewsCardSidebar from "./NewsCard.sidebar";
import Sentiment from "./NewsCard.sentiment";
import { newsModel } from "../../../../../constants";
import { formatNewsDate } from "./NewsCard.helpers";
import { FaExternalLinkAlt } from "react-icons/fa";

import classes from "../News.module.css";

const NewsCard = ({ news }) => {
  const [isMobile, setIsMobile] = useState(null);
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

  const radioRef = useRef();
  const containerRef = useRef();
  const currentIDRef = useRef();
  const hasChangedRef = useRef(false);

  const MIDSIZE = "(min-width: 992px)";

  useEffect(() => {
    matchMedia(MIDSIZE).addEventListener("change", (e) => {
      if (e.matches === false) {
        setIsMobile(true);
      } else setIsMobile(false);
    });
  }, [isMobile, setIsMobile]);

  function changeHandler(e) {
    const target = e.target;
    const container = containerRef.current;

    if (currentIDRef.current !== target.id) {
      currentIDRef.current = target.id;
      hasChangedRef.current = true;
    }

    const radioButtons = [...radioRef.current.childNodes];

    const altNode = radioButtons.find((node) => node.id !== target.id);
    altNode.checked = false;
    target.checked = true;

    const animationOut = [
      { translate: "0 0", opacity: "0" },
      { translate: "-30rem 0", opacity: "1" },
    ];
    const animationIn = [
      { translate: "-30rem 0", opacity: "0" },
      { translate: "0rem 0", opacity: "1" },
    ];

    const animationTiming = {
      duration: 800,
      fill: "both",
      easing: "ease-in-out",
    };

    if (hasChangedRef.current && currentIDRef.current !== undefined) {
      hasChangedRef.current = false;
      if (target.id === "sentiment") {
        container.animate(animationOut, animationTiming);
      } else {
        container.animate(animationIn, animationTiming);
      }
    }
  }

  return (
    <div className={classes["news-card"]}>
      <Sentiment image={image} overall={overall_sentiment} />
      {isMobile && isMobile === true && (
        <div style={{ textAlign: "center" }} ref={radioRef}>
          <input
            type="radio"
            onChange={changeHandler}
            checked
            id="summary"
            className={classes.radio}
          />
          <input
            type="radio"
            onChange={changeHandler}
            id="sentiment"
            className={classes.radio}
          />
        </div>
      )}

      <div className={classes["news-container"]} ref={containerRef}>
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
        <NewsCardSidebar ticker_label={ticker_sentiment} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default NewsCard;
