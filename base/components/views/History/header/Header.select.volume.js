import { useEffect, useState } from "react";
import { useTimeSeries } from "../../../../../contexts/timeseries-context";
import { MdHighlightOff } from "react-icons/md";
import { MdFilterListAlt } from "react-icons/md";
import classes from "../History.module.css";

const SelectByVolume = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [{ setVolume }, timeseries] = useTimeSeries();
  const { volume } = timeseries;

  const clickHandler = () => {
    setShowFilter(() => !showFilter);
  };

  const selectVol = (e) => {
    const target = e.target.value;
    setVolume(target === "all" ? target : +target);
  };

  useEffect(() => {
    if (showFilter) {
      const radioGrp = [
        ...document.querySelectorAll(`.${classes["header-radio-btns"]}`),
      ].map((elem) => elem.childNodes[0]);

      const radioGrpValues = radioGrp.map((elem) =>
        elem.value === "all" ? elem.value : +elem.value
      );

      const index = radioGrpValues.indexOf(volume);

      radioGrp[index].checked = true;
    }
  }, [volume, showFilter]);

  return (
    <>
      {!showFilter && (
        <MdFilterListAlt
          onClick={clickHandler}
          className={classes["header-filter"]}
        />
      )}
      {showFilter && (
        <div className={classes["header-radio"]}>
          <form onChange={selectVol} className={classes["header-radio-group"]}>
            <div className={classes["byVol-group"]}>
              <legend>By Volume</legend>
              <MdHighlightOff
                className={classes.byVol}
                onClick={clickHandler}
              />
            </div>
            <div>
              <div className={classes["header-radio-btns"]}>
                <input type="radio" id="all" name="volume" value="all" />
                <label htmlFor="all">all</label>
              </div>
              <div className={classes["header-radio-btns"]}>
                <input type="radio" id="fiveh" name="volume" value="500000" />
                <label htmlFor="fiveh">&#62;=500k</label>
              </div>
              <div className={classes["header-radio-btns"]}>
                <input type="radio" id="onet" name="volume" value="1000000" />
                <label htmlFor="onet">&#62;=1m</label>
              </div>
              <div className={classes["header-radio-btns"]}>
                <input type="radio" id="tenth" name="volume" value="10000000" />
                <label htmlFor="tenth">&#62;=10m</label>
              </div>
              <div className={classes["header-radio-btns"]}>
                <input type="radio" id="oneht" name="volume" value="50000000" />
                <label htmlFor="oneht">&#62;=50m</label>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SelectByVolume;
