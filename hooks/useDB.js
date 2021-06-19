import { useState, useCallback, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../store/dbStore";
import api from "../api_data";

const useDB = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const sendRequest = useCallback(
    async (action, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        if (action === "get") {
          const allItems = await useLiveQuery(() => db.items.toArray(), []);
          if (allItems.length > 0) setData(allItems);
        } else if (action === "post") {
          const { "Meta Data": meta, "Time Series (Daily)": daily } = applyData;
          await db.items.add({
            meta,
            daily,
          });
        }
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [props]
  );

  useEffect(() => {
    const data = new Promise((resolve, reject) => resolve(api))
      .then((response) => response)
      .then((data) => data);

    if (data) sendRequest(props.action, data);
  }, [props.action]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useDB;
