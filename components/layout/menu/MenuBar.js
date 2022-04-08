import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import TriggerContext from "../../../store/context-provider";
import MenuItem from "./MenuItem";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const { searchTrigger, showSearch } = useContext(TriggerContext);
  const router = useRouter();

  const searchHandler = () => {
    showSearch();
  };

  return (
    <nav className={classes.nav}>
      <h1
        className={classes.logo}
        onClick={() => {
          if (router.pathname === "/") {
            location.reload();
            return;
          }
          router.push("/");
        }}
      >
        <i>Sideways</i>.report
      </h1>
      <div className={classes.nav_bar_pages}>
        <MenuItem searchTrigger={searchTrigger} searchHandler={searchHandler} />
      </div>
    </nav>
  );
};

export default MenuBar;
