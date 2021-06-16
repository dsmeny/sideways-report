import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import useDB from "../hooks/useDB";

const index = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState({});

  const dataHook = new Promise((resolve, reject) => resolve(useDB()))
    .then((response) => response)
    .then((one) => one)
    .finally((two) => two);

  // const { isLoading, error, sendRequest: apiData } = dataHook;

  async function getSomething(props) {
    console.log("props:", props);
    const response = await props;
    if (response) setData(response);
  }

  useEffect(() => {
    if (isClicked === true) {
      console.log("post_apiData:", dataHook);
      // console.log("post_apiData:", apiData);
      // console.log("post_isLoading:", isLoading);
      // apiData("post", null);
    }

    // if (isLoading) {
    //   apiData("get", getSomething);
    // }
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
