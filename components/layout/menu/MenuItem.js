import { useEffect, useState } from "react";
import classes from "./MenuBar.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const icon = {
  fontSize: "2.3rem",
};

const MenuItem = ({ searchTrigger, searchHandler }) => {
  const [isMatch, setIsMatch] = useState(false);

  const handleScreenChanges = (mql) => {
    setIsMatch(mql.matches);
  };

  useEffect(() => {
    const media = (size) => {
      return window.matchMedia(`screen and (max-width: ${size}px)`);
    };

    const MOBILE = media(720);

    if (!isMatch) {
      handleScreenChanges(MOBILE);
    }
    MOBILE.addEventListener("change", handleScreenChanges);
  });

  return (
    <div
      onClick={searchHandler}
      className={`${classes.title} ${searchTrigger ? classes.active : ""}`}
    >
      {isMatch && <RiSendPlaneFill style={icon} />}
    </div>
  );
};

export default MenuItem;
