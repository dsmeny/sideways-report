import { DataViewItem, DataViewList } from "../../Views.structure";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";
import Select from "../../../select/Select";
import classes from "./Header.module.css";

const Options = ({ symbol }) => {
  const [{ setDate }, timeseries] = useTimeSeries();
  const { date } = timeseries;

  const selectDates = (e) => {
    const option = [...e.currentTarget.options].find(
      (option) => option.selected
    );
    setDate(option.value);
  };

  return (
    <div className={classes["header-options"]}>
      <Select
        name="dates"
        id="dates"
        defaultValue={date}
        onChange={selectDates}
      >
        <option value="max">max</option>
        <option value="byDate">byDate</option>
        <option value="3d">3 d</option>
        <option value="1w">1 wk</option>
        <option value="2w">2 wk</option>
        <option value="1m">1 mo</option>
        <option value="3m">3 mo</option>
        <option value="6m">6 mo</option>
        <option value="YTD">YTD</option>
        <option value="1y">1 yr</option>
        <option value="3y">3 yr</option>
      </Select>
      <div className={classes["header-options-symbol"]}>{symbol}</div>
    </div>
  );
};

export default Options;
