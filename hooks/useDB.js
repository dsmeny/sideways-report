import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";

async function useDB() {
  const allItems = await useLiveQuery(() => db.items.toArray(), []);

  const query = await new Promise((resolve, reject) => {
    resolve(allItems);
  }).then((data) => {
    if (data && data.length) return data;
  });

  const addStockToDb = async ({
    "Meta Data": meta,
    "Time Series (Daily)": daily,
  }) =>
    await db.items.add({
      meta,
      daily,
    });

  return {
    allItems: query,
    addStockToDb,
  };
}

export default useDB;
