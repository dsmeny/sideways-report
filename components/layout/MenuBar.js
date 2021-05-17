import classes from "./MenuBar.module.css";

const MenuBar = ({ isSearch, setIsSearch }) => {
  function classTriggerHandler() {
    console.log("function called");
    // setClassTrigger(!classTrigger);
  }

  return (
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
  );
};

export default MenuBar;
