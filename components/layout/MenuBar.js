import { useContext, useState, useEffect } from "react";
import TriggerContext from "../../store/context-provider";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const { searchTrigger, showSearch, getStorage, locStorage } =
    useContext(TriggerContext);

  useEffect(() => {
    getStorage();
  }, [locStorage]);

  function classTriggerHandler() {
    showSearch();
  }

  const styles = {
    activeStyle: {
      backgroundColor: searchTrigger ? "red" : "transparent",
    },
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes.nav_trash_icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span style={{ color: "green" }}>{locStorage}</span>
        </span>
      </nav>
      <div className={classes.nav_bar}>
        <div className={classes.nav_bar_filters}>
          <ul className={classes.list_styles}>
            <li style={styles.activeStyle}>f1</li>
            <li style={styles.activeStyle}>f2</li>
            <li style={styles.activeStyle}>f3</li>
          </ul>
        </div>
        <div className={classes.nav_bar_pages}>
          <ul className={classes.list_styles}>
            <li style={styles.activeStyle} onClick={classTriggerHandler}>
              p1
            </li>
            <li style={styles.activeStyle}>p2</li>
            <li style={styles.activeStyle}>p3</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
