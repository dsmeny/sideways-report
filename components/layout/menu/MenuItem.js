import { useState, useEffect } from "react";
import classes from "./MenuBar.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const icon = {
  fontSize: "2.3rem",
};

const MenuItem = ({ searchTrigger, searchHandler }) => {
  const [isMobile, setIsMobile] = useState(null);

  const handleScreenChanges = (mql) => {
    setIsMobile(mql.matches);
  };

  useEffect(() => {
    const media = (size) => {
      return window.matchMedia(`screen and (max-width: ${size}px)`);
    };

    const MOBILE = media(720);

    if (!isMobile) {
      handleScreenChanges(MOBILE);
    }
    MOBILE.addListener(handleScreenChanges);
  });

  return (
    <div
      onClick={searchHandler}
      className={`${classes.title} ${searchTrigger ? classes.active : ""}`}
    >
      {!isMobile && <span>what stock do you like ??</span>}
      <RiSendPlaneFill style={icon} />
    </div>
  );
};

export default MenuItem;
