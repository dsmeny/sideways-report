import { useReducer } from "react";
import { sidebarReducer } from "./sideBar.reducer";
import { FiMenu, FiX } from "react-icons/fi";
import classes from "./Sidebar.module.css";

const initialState = {
  icon1: true,
  icon2: false,
  icon3: false,
};

const Sidebar = ({ showSidebar, sidebarHandler }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const styles = {
    menu: {
      fontSize: "2.2rem",
      marginTop: "1rem",
      color: `${
        showSidebar
          ? "var(--coral-highlight-color)"
          : "var(--button-font-color)"
      }`,
      transform: `${showSidebar ? "translateX(6rem)" : "translateX(-2.2rem)"}`,
      transition: "all 0.4s ease",
    },
  };

  return (
    <div className={classes["sidebar-container"]}>
      <div style={styles.menu} onClick={sidebarHandler}>
        {showSidebar ? <FiX /> : <FiMenu />}
      </div>
      <ul
        className={
          showSidebar ? classes["sidebar-container-list"] : classes.hidden
        }
      >
        <li
          id="icon1"
          className={`${classes.listItems} ${
            state.icon1 ? classes.active : classes.inactive
          }`}
          onClick={() => dispatch({ type: "icon1" })}
        >
          Overview
        </li>
        <li
          id="icon2"
          className={`${classes.listItems} ${
            state.icon2 ? classes.active : classes.inactive
          }`}
          onClick={() => dispatch({ type: "icon2" })}
        >
          History
        </li>
        <li
          id="icon3"
          className={`${classes.listItems} ${
            state.icon3 ? classes.active : classes.inactive
          }`}
          onClick={() => dispatch({ type: "icon3" })}
        >
          Analysis
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
