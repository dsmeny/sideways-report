import { overviewModel, API_PARAMS } from "../../../../constants";
import useOverviewApi from "../../../hooks/useOverviewApi";
import OverviewCategory from "./OverviewCategory";
import useToggle from "../../../hooks/useToggle";
import { convertNumber } from "../../../helpers/general.helpers";
import Spinner from "../../spinner/Spinner";
import classes from "./Overview.module.css";

const titleStyle = {
  textAlign: "center",
  letterSpacing: "0.6rem",
  margin: "2rem 0",
  fontSize: "2rem",
  color: "rgba(69, 92, 119, 0.5)",
  fontWeight: "100",
};

const Overview = ({ symbol }) => {
  const { stockData } = useOverviewApi({
    symbol,
    timeSeries: API_PARAMS.OVERVIEW,
  });

  const [value, toggle] = useToggle(true);

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
      <div className={classes.categories}>
        <input
          type="button"
          className={classes.category}
          onClick={() => toggle()}
          value="TRADING"
          disabled={value === true}
        />
        <input
          type="button"
          className={classes.category}
          onClick={() => toggle()}
          value="INVESTING"
          disabled={value === false}
        />
      </div>
      {value ? (
        <>
          <h1 style={titleStyle}>TRADING</h1>
          <OverviewCategory category={dayTrading} />
        </>
      ) : (
        <>
          <h1 style={titleStyle}>INVESTING</h1>
          <OverviewCategory category={investing} />
        </>
      )}
    </div>
  );
};

export default Overview;
