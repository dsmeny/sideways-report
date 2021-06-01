import { useContext, useState, memo, useEffect } from "react";
import context_provider from "../../store/context-provider";
import classes from "./MenuBar.module.css";

const MenuBar = memo(() => {
  const [active, setActive] = useState(false);
  const { isSearched, searched, symbols } = useContext(context_provider);

  function classTriggerHandler() {
    isSearched();
  }

  return (
    <>
      <nav className={classes.nav}>
        <h1>Sideways Report</h1>
        <span className={classes.nav_trash}>
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
          <span style={{ color: "green" }}>0</span>
        </span>
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
            <li
              className={(searched && classes.active) || ""}
              onClick={(e) => {
                e.target.classList.toggle(classes.active);
                classTriggerHandler();
              }}
            >
              p1
            </li>
            <li>p2</li>
            <li>p3</li>
          </ul>
        </div>
      </div>
    </>
  );
});

export default MenuBar;
