import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import classes from "../News.module.css";

// constants
const NEWS_IMAGE = "https://picsum.photos/250";

const Sentiment = ({ image, overall }) => {
  return (
    <div className={classes["news-sentiment"]}>
      {overall === "Bullish" ||
        (/Somewhat-Bullish/.test(overall) && (
          <div className={classes["news-icons"]}>
            <VscTriangleUp
              className={`${classes["news-bullish"]} ${classes["news-neutral-translate"]}`}
            />
            <VscTriangleDown className={classes["news-neutral"]} />
          </div>
        ))}
      {overall === "Bearish" ||
        (/Somewhat-Bearish/.test(overall) && (
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
