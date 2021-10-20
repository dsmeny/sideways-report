import { useContext, useState } from "react";
import TriggerContext from "../../../store/context-provider";
import MenuItem from "./MenuItem";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const [active, setActive] = useState(false);
  const { searchTrigger, showSearch } = useContext(TriggerContext);

  function classTriggerHandler() {
    showSearch();
  }

  return (
    <>
      <nav className={classes.nav}>
        <h1>Sideways Report</h1>
      </nav>
      <div className={classes.nav_bar}>
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
