import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";

async function useDB() {
  const allItems = await useLiveQuery(() => db.items.toArray(), []);

  const addStockToDb = async ({
    "Meta Data": meta,
    "Time Series (Daily)": daily,
  }) =>
    await db.items.add({
      meta,
      daily,
    });

  if (!allItems) return null;

  return {
    allItems,
    addStockToDb,
  };
}

export default useDB;
