import { useEffect } from "react";
import { DataViewList, DataViewItem } from "../../Views.structure";
import classes from "../History.module.css";

const headers = ["date", "open", "high", "low", "close", "volume"];

const Header = () => {
  // useEffect(() => {
  //   const header = document.querySelector(`.${classes["tableheader-row"]}`);

  //   window.addEventListener("scroll", (x) => {
  //     if (window.scrollY >= 124) {
  //       header.classList.add(`${classes.addSticky}`);
  //     } else header.classList.remove(`${classes.addSticky}`);
  //   });
  // });

  return (
    <div className={`fade ${classes["tableheader-wrapper"]}`}>
      <DataViewList className={classes["tableheader-wrapper-options"]}>
        {headers.map((item) => (
          <DataViewItem>{item}</DataViewItem>
        ))}
      </DataViewList>
    </div>
  );
};

export default Header;
