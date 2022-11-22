import { useEffect, useState } from "react";
import { DataViewList, DataViewItem } from "../../Views.structure";
import classes from "../History.module.css";

const headers = ["date", "open", "high", "low", "close", "volume"];
const SCROLLY = 124;

const headerStyles = {
  date: {
    width: "200px",
    color: "white",
  },
  volume: {
    width: "200px",
    color: "white",
  },
};

const HeaderItems = ({ headers }) => {
  return (
    <>
      {headers.map((item, index) => (
        <DataViewItem
          style={
            index === 0
              ? headerStyles.date
              : index === 5
              ? headerStyles.volume
              : { color: "white" }
          }
        >
          {item}
        </DataViewItem>
      ))}
    </>
  );
};

const Header = () => {
  useEffect(() => {
    const header = document.querySelector(`.${classes["tableheader-wrapper"]}`);

    window.addEventListener("scroll", (x) => {
      if (window.scrollY >= SCROLLY) {
        header.classList.add(`${classes.addSticky}`);
      } else {
        header.classList.remove(`${classes.addSticky}`);
      }
    });
  });

  return (
    <div className={`${classes["tableheader-wrapper"]}`}>
      <DataViewList className={classes["tableheader-wrapper-options"]}>
        <HeaderItems headers={headers} />
      </DataViewList>
    </div>
  );
};

export default Header;
