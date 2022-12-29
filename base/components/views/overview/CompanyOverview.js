import { overviewModel, API_PARAMS } from "../../../../constants";
import useOverviewApi from "../../../hooks/useOverviewApi";
import OverviewCategory from "./OverviewCategory";
import { convertNumber } from "../../../helpers/general.helpers";
import Spinner from "../../spinner/Spinner";
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

  const overview = Object.values(overviewModel(stockData, convertNumber));
  const dayTrading = overview.slice(0, 5);
  const investing = overview.slice(5);

  return (
    <div className={classes.overview}>
      <OverviewCategory categoryTitle="TRADING" category={dayTrading} />
      <OverviewCategory categoryTitle="INVESTING" category={investing} />
    </div>
  );
};

export default Overview;
