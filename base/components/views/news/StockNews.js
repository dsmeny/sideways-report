import { useRouter } from "next/router";
import Spinner from "../../spinner";
import NewsCard from "./newscard/NewsCard";
import useNewsApi from "../../../hooks/useNewsApi";
import { DataViewItem, DataViewList } from "../Views.structure";
import { generateId } from "../../../helpers/general.helpers";
import classes from "./News.module.css";

const StockNews = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { data, error } = useNewsApi({ symbol, topic: "" });

  if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={classes.news}>
      <h1>{symbol} - News</h1>
      <div>
        <DataViewList className={classes["news-list"]}>
          {data &&
            data.feed.map((news) => (
              <DataViewItem key={`${generateId()}`}>
                <NewsCard news={news} />
              </DataViewItem>
            ))}
        </DataViewList>
      </div>
    </div>
  );
};

export default StockNews;
