import classes from "./Select.module.css";

const Select = (props) => {
  return (
    <div className={classes["select-container"]}>
      <select {...props}>{props.children}</select>
      <span className="focus"></span>
    </div>
  );
};

export default Select;
