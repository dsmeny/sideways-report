import { useContext } from "react";
import TriggerContext from "../../store/context-provider";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const searchContext = useContext(TriggerContext);
  function classTriggerHandler() {
    searchContext.showSearch();
  }

  return (
    <>
      <nav className={classes.nav}>
        <h1>Sideways Report</h1>
      </nav>
      <div className={classes.nav_bar}>
        <div className={classes.nav_bar_filters}>
          <ul className={classes.list_styles}>
            <li>f1</li>
            <li>f2</li>
            <li>f3</li>
          </ul>
        </div>
        <div className={classes.nav_bar_pages}>
          <ul className={classes.list_styles}>
            <li onClick={classTriggerHandler}>p1</li>
            <li>p2</li>
            <li>p3</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
