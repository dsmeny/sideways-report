import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import classes from "../News.module.css";

// constants
const NEWS_IMAGE = "https://picsum.photos/250";
const BULLISH = "Bullish";
const BEARISH = "Bearish";
const SOMEWHAT_BULLISH = /Somewhat-Bullish/;
const SOMEWHAT_BEARISH = /Somewhat-Bearish/;

const Sentiment = ({ image, overall }) => {
  return (
    <div className={classes["news-sentiment"]}>
      {overall === BULLISH ||
        (SOMEWHAT_BULLISH.test(overall) && (
          <div className={classes["news-icons"]}>
            <VscTriangleUp
              className={`${classes["news-bullish"]} ${classes["news-neutral-translate"]}`}
            />
            <VscTriangleDown className={classes["news-neutral"]} />
          </div>
        ))}
      {overall === BEARISH ||
        (SOMEWHAT_BEARISH.test(overall) && (
          <div className={classes["news-icons"]}>
            <VscTriangleUp
              className={`${classes["news-neutral"]} ${classes["news-neutral-translate"]}`}
            />
            <VscTriangleDown className={classes["news-bearish"]} />
          </div>
        ))}

      {overall === "Neutral" && (
        <div className={`${classes["news-neutral"]} ${classes["news-icons"]}`}>
          <VscTriangleUp className={classes["news-neutral-translate"]} />
          <VscTriangleDown />
        </div>
      )}

      <img src={image === "" ? NEWS_IMAGE : image} />
    </div>
  );
};

export default Sentiment;
