import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";

const useDB = async (props) => {
  const [queryData, setQueryData] = useState([]);
  const allItems = await useLiveQuery(() => db.items.toArray(), []);

  // useEffect(() => {
  //   console.log("useEffect fired from useDB!");
  // }, [data]);

  const test = await props[0];
  console.log("data:", test);

  if (allItems && allItems.length > 0) {
    setQueryData(allItems);
  }

  const addStockToDb = async ({
    "Meta Data": meta,
    "Time Series (Daily)": daily,
  }) => {
    await db.items.add({
      meta,
      daily,
    });
  };

  return {
    items: queryData,
    addStockToDb,
  };
};

export default useDB;
