import NewsCard from "./newscard/NewsCard";
import { useRouter } from "next/router";
import classes from "./News.module.css";
import useNewsApi from "../../../hooks/useNewsApi";
import { DataViewItem, DataViewList } from "../Views.structure";

const StockNews = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { data, error } = useNewsApi({ symbol, topic: "technology" });

  return (
    <div className={classes.news}>
      <h1>{symbol}</h1>
      <div>
        <DataViewList>
          <DataViewItem>
            <NewsCard />
          </DataViewItem>
          <DataViewItem>
            <NewsCard />
          </DataViewItem>
          <DataViewItem>
            <NewsCard />
          </DataViewItem>
        </DataViewList>
      </div>
    </div>
  );
};

export default StockNews;
