import React from "react";
import { DataViewItem, DataViewList } from "../Views.structure";
import { convertNumber } from "../../../helpers/general.helpers";
import classes from "./Overview.module.css";

const OverviewCategory = ({ category }) => {
  return (
    <div>
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
