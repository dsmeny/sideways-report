import { useEffect, useState } from "react";
import { DataViewList, DataViewItem } from "../../Views.structure";
import classes from "../History.module.css";

const headers = ["date", "open", "high", "low", "close", "volume"];
const SCROLLY = 124;

const HeaderItems = ({ headers }) => {
  return (
    <>
      {headers.map((item, index) => (
        <DataViewItem key={index}>{item}</DataViewItem>
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
      <DataViewList
        style={{ fontSize: "calc(13px + 0.6vw)" }}
        className={classes["tableheader-wrapper-options"]}
      >
        <HeaderItems headers={headers} />
      </DataViewList>
    </div>
  );
};

export default Header;
