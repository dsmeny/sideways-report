import { useState, useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";
import api from "../api_data";

const useDB = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (action, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (action === "get") {
        const allItems = await useLiveQuery(() => db.items.toArray(), []);
        if (allItems.length > 0) applyData(allItems);
      } else if (action === "post") {
        const api_data = await api;
        const { meta, daily } = api_data;
        await db.items.add({
          meta,
          daily,
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useDB;
