import { DataViewItem, DataViewList } from "../Views.structure";
import Spinner from "../../spinner/Spinner";
import { overviewModel, API_PARAMS } from "../../../../constants";
import { convertNumber } from "../../../helpers/general.helpers";
import useOverviewApi from "../../../hooks/useOverviewApi";
import classes from "./Overview.module.css";

const Overview = ({ symbol }) => {
  const { stockData } = useOverviewApi({
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
