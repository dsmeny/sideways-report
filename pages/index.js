import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import api from "../api_data";
import useDB from "../hooks/useDB";

const index = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);

  const api_data = new Promise((resolve, reject) => resolve(api))
    .then((res) => res)
    .then((data) => data);
  const hookData = useDB(api_data);

  async function getHookedData() {
    const response = await hookData;

    const data = await api_data;

    if (isClicked === true && data) {
      response.addStockToDb(data);
      setIsClicked(false);
    }

    if (response.items) {
      return response.items;
    }
  }

  useEffect(async () => {
    const response = await getHookedData();
    setData((prev) => [...prev, response]);
  }, [isClicked, hookData.items]);

  // data && console.log("index.js_DATA:", data);

  return (
    <div className={classes.container}>
      <div>hola</div>
      <div>
        <button
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Get Stock Data
        </button>
      </div>
    </div>
  );
};

export default index;
