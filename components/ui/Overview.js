import classes from "../../components/ui/Overview.module.css";
import { convertNumber } from "../utility/general";

const Overview = ({ obj }) => {
  return (
    <ul className={classes.list}>
      {Object.entries(obj).map((elem, index) => (
        <li className={classes.listItem} key={index}>
          <strong style={{ color: "#455c77" }}>{elem[0]}</strong>
          {+elem[1] ? `${convertNumber(elem[1])}` : elem[1]}
        </li>
      ))}
    </ul>
  );
};

export default Overview;
