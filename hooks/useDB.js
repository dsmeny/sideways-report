import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";

function useDB() {
  const allItems = useLiveQuery(() => db.items.toArray(), []);
  const addStockToDb = async ({ name, date, itemHasBeenUpdated = true }) =>
    await db.items.add({
      name,
      date,
      itemHasBeenUpdated,
    });

  if (!allItems) return null;

  return {
    allItems,
    addStockToDb,
  };
}

export default useDB;
