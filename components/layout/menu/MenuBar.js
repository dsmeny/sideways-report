import { useContext, useState, useEffect } from "react";
import TriggerContext from "../../../store/context-provider";
import MenuItem from "./MenuItem";
import classes from "./MenuBar.module.css";
import { Trash } from "../../ui/Icons";

const MenuBar = () => {
  const [active, setActive] = useState(false);
  const { searchTrigger, showSearch, getStorage, locStorage } =
    useContext(TriggerContext);

  useEffect(() => {
    getStorage();
  }, [locStorage]);

  function classTriggerHandler() {
    showSearch();
  }

  return (
    <>
      <nav className={classes.nav}>
        <h1>Sideways Report</h1>
        <span
          className={classes.nav_trash}
          onClick={() => {
            localStorage.clear();
            searchContext.getStorage();
          }}
        >
          <Trash />
          <span style={{ color: "green" }}>{locStorage}</span>
        </span>
      </nav>
      <div className={classes.nav_bar}>
        <div className={classes.nav_bar_filters}>
          <MenuItem />
        </div>
        <div className={classes.nav_bar_pages}>
          <MenuItem
            searchTrigger={searchTrigger}
            classTriggerHandler={classTriggerHandler}
          />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
