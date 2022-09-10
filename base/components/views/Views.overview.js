import { DataViewItem, DataViewList } from "./Views.structure";
import Spinner from "../spinner";
import { overviewModel } from "../../../constants";
import { convertNumber } from "../../helpers/general.helpers";
import useStockApi from "../../hooks/useStockApi";
import { API_PARAMS } from "../../../constants";
import classes from "./overview/Overview.module.css";

const Overview = ({ symbol }) => {
  const { stockData } = useStockApi({
    symbol,
    timeSeries: API_PARAMS.OVERVIEW,
  });

  if (!stockData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className={classes.overview}>
      {Object.values(overviewModel(stockData, convertNumber)).map(
        (elem, index) => (
          <DataViewList className={classes["overview-list"]} key={index}>
            {Object.entries(elem).map((el, index) => (
              <DataViewItem key={index}>
                <strong style={{ color: "var(--primary-font-color)" }}>
                  {el[0]}
                </strong>
                {+el[1] ? `${convertNumber(el[1])}` : el[1]}
              </DataViewItem>
            ))}
          </DataViewList>
        )
      )}
    </div>
  );
};

export default Overview;