import { useRef, useEffect } from "react";
import classes from "../../components/ui/Overview.module.css";
import { convertNumber } from "../utility/general";

const Overview = ({ array }) => {
  const listRef = useRef();

  useEffect(() => {
    listRef.current.style.backgroundColor = "rgba(250, 250, 253, 0.61)";
  }, [listRef]);

  return (
    <ul className={classes.list} ref={listRef}>
      {array.map((elem, index) => (
        <li className={classes.listItem} key={index}>
          <strong style={{ color: "rgb(87, 87, 87)" }}>{elem[0]}</strong>
          {+elem[1] ? `${convertNumber(elem[1])}` : elem[1]}
        </li>
      ))}
    </ul>
  );
};

export default Overview;
