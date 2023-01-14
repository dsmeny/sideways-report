import NewsCardSidebar from "./NewsCard.sidebar";
import NewsCardSummary from "./NewsCard.summary";

const NewsCardContainer = ({
  sentimentRef,
  authors,
  source,
  summary,
  ticker_sentiment,
  time,
  title,
  url,
}) => {
  return (
    <>
      <NewsCardSummary
        authors={authors}
        source={source}
        summary={summary}
        time={time}
        title={title}
        url={url}
      />
      <NewsCardSidebar
        ticker_label={ticker_sentiment}
        sentimentRef={sentimentRef}
      />
    </>
  );
};

export default NewsCardContainer;
