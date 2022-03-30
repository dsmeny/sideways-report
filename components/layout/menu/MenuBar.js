import { useContext, useState } from "react";
import TriggerContext from "../../../store/context-provider";
import MenuItem from "./MenuItem";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const { searchTrigger, showSearch } = useContext(TriggerContext);

  const searchHandler = () => {
    showSearch();
  };

  return (
    <nav className={classes.nav}>
      <h1>Sideways Report</h1>
      <div className={classes.nav_bar_pages}>
        <MenuItem searchTrigger={searchTrigger} searchHandler={searchHandler} />
      </div>
    </nav>
  );
};

export default MenuBar;
