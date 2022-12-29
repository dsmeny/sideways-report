import React from "react";
import { DataViewItem, DataViewList } from "../Views.structure";
import { convertNumber } from "../../../helpers/general.helpers";
import classes from "./Overview.module.css";

const styles = {
  overviewTitle: {
    padding: "1rem 0",
    color: "var(--primary-font-color)",
    textAlign: "center",
    fontWeight: "100",
    fontSize: "4rem",
    borderBottom: "1px solid var(--primary-font-color)",
  },
};

const OverviewCategory = ({ categoryTitle, category }) => {
  return (
    <div>
      <h2 style={styles.overviewTitle}>{categoryTitle}</h2>
      {category.map((el, index) => (
        <DataViewList className={classes["overview-list"]} key={index}>
          {Object.entries(el).map((el, index) => (
            <DataViewItem key={index}>
              <strong style={{ color: "var(--primary-font-color)" }}>
                {el[0]}
              </strong>
              {+el[1] ? `${convertNumber(el[1])}` : el[1]}
            </DataViewItem>
          ))}
        </DataViewList>
      ))}
    </div>
  );
};

export default OverviewCategory;
