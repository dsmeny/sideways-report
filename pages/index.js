import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import useDB from "../hooks/useDB";

const index = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [action, setAction] = useState({});

  const { isLoading, error, data } = useDB(action);

  async function requestData(request) {
    const api_data = await request;
    console.log("index_useEffect_data:", api_data);
  }

  useEffect(async () => {
    console.log("index_useEffect_fired!");
    requestData(data);
    if (isClicked === true) {
      setApiData("post");
    }
  }, [isClicked]);

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
