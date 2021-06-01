import { useContext } from "react";
import context_provider from "../../store/context-provider";
import classes from "./Checkbox.module.css";
const Checkbox = () => {
  const { setIsChecked } = useContext(context_provider);
  return (
    <>
      <label className={classes.switch}>
        <input
          onChange={(e) => setIsChecked(e.target.checked)}
          type="checkbox"
        />
        <span className={`${classes.slider} ${classes.round}`}></span>
      </label>
    </>
  );
};

export default Checkbox;
