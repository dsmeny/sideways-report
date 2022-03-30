import classes from "./MenuBar.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const icon = {
  fontSize: "2.3rem",
};

const MenuItem = ({ searchTrigger, searchHandler }) => {
  return (
    <div
      onClick={searchHandler}
      className={`${classes.title} ${searchTrigger ? classes.active : ""}`}
    >
      <span>which stock do you like ??</span>
      <RiSendPlaneFill style={icon} />
    </div>
  );
};

export default MenuItem;
