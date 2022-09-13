import { DataViewItem, DataViewList } from "../../Views.structure";
import { newsModel } from "../../../../../constants";

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
    <DataViewList>
      news
      {/* <DataViewItem>{authors.join(", ")}</DataViewItem>
      <DataViewItem>{image}</DataViewItem>
      <DataViewItem>{overall_sentiment}</DataViewItem>
      <DataViewItem>{source}</DataViewItem>
      <DataViewItem>{summary}</DataViewItem>
      <DataViewItem>{ticker_sentiment.join(", ")}</DataViewItem>
      <DataViewItem>{time}</DataViewItem>
      <DataViewItem>{title}</DataViewItem>
      <DataViewItem>{url}</DataViewItem> */}
    </DataViewList>
  );
};

export default NewsCard;
