import { useState, useEffect } from "react";
import classes from "./MenuBar.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const icon = {
  fontSize: "2.3rem",
};

const MenuItem = ({ searchTrigger, searchHandler }) => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(() => window.matchMedia("(max-width: 720px)").matches);
  });

  console.log("isMobile: ", isMobile);

  return (
    <div
      onClick={searchHandler}
      className={`${classes.title} ${searchTrigger ? classes.active : ""}`}
    >
      {!isMobile && <span>which stock do you like ??</span>}
      <RiSendPlaneFill style={icon} />
    </div>
  );
};

export default MenuItem;
