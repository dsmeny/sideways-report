import Select from "../../../select/Select";
import Pagination from "../../../../../features/Pagination";
import useSelectedYears from "./filters/useByYears";
import classes from "../History.module.css";

const SelectByYear = ({ years }) => {
  const { selectYears, selectedYear } = useSelectedYears();

  return (
    <div className={classes["header-options"]}>
      <Select
        name="years"
        id="years"
        defaultValue={selectedYear}
        onChange={selectYears}
      >
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </Select>
      <Pagination />
    </div>
  );
};

export default SelectByYear;
