import classes from "./MenuItem.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const icon = {
  fontSize: "2.3rem",
};

const MenuItem = ({ searchTrigger, searchHandler }) => {
  return (
    <>
      <ul className={classes.list_styles}>
        <li
          onClick={searchHandler}
          className={searchTrigger ? classes.active : ""}
        >
          <span>which stock do you like ??</span>
          <RiSendPlaneFill style={icon} />
        </li>
      </ul>
    </>
  );
};

export default MenuItem;
