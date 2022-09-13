import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NewsCard from "./newscard/NewsCard";
import useNewsApi from "../../../hooks/useNewsApi";
import { DataViewItem, DataViewList } from "../Views.structure";
import classes from "./News.module.css";

const StockNews = () => {
  const [newsData, setNewsData] = useState(null);
  const router = useRouter();
  const { symbol } = router.query;
  const { data, error } = useNewsApi({ symbol, topic: "" });

  // async function loadData() {
  //   const dd = await data.feed;

  //   dd && setNewsData(dd);
  // }

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <div className={classes.news}>
      <h1>{symbol}</h1>
      <div>
        <DataViewList>
          {newsData &&
            newsData.map((news) => (
              <DataViewItem>
                <NewsCard news={news} />
              </DataViewItem>
            ))}
        </DataViewList>
      </div>
    </div>
  );
};

export default StockNews;
