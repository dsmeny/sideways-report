import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import TriggerContext from "../../contexts/context-provider";
import { IoIosSearch } from "react-icons/io";
import classes from "./MenuBar.module.css";

const MenuBar = () => {
  const { searchTrigger, showSearch } = useContext(TriggerContext);
  const router = useRouter();

  const searchHandler = () => {
    if (router.pathname === "/") {
      location.reload();
      return;
    }
    showSearch(false);
    router.push("/");
  };

  return (
    <nav className={classes.nav}>
      <h1 className={classes.logo} onClick={searchHandler}>
        <i>Sideways</i>.report
      </h1>
      {!searchTrigger && (
        <div className={classes["nav-bar-pages"]}>
          <IoIosSearch
            className={classes["nav-icon"]}
            onClick={searchHandler}
          />
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
