import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";

async function useDB() {
  const [queryData, setQueryData] = useState([]);
  const allItems = await useLiveQuery(() => db.items.toArray(), []);
  setQueryData(allItems);

  const addStockToDb = async ({
    "Meta Data": meta,
    "Time Series (Daily)": daily,
  }) =>
    await db.items.add({
      meta,
      daily,
    });

  return {
    items: queryData,
    addStockToDb,
  };
}

export default useDB;
