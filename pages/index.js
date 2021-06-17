import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import useDB from "../hooks/useDB";
import api from "../api_data";

const index = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [apiData, setApiData] = useState({});

  const { isLoading, error, data } = useDB(apiData);

  // async function get(request) {}

  useEffect(async () => {
    console.log("index_useEffect_fired!");
    new Promise((resolve, reject) => resolve(api))
      .then((response) => response)
      .then((data) =>
        setApiData((prev) => {
          return {
            action: "get",
            data,
          };
        })
      );

    if (isClicked === true) {
      setApiData("post", apiData);
    }
  }, [isClicked, apiData, isLoading]);

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
