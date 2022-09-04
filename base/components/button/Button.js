import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${props.status ? classes.isActive : ""} ${classes.btnStyle}`}
      onClick={(e) => props.activeTbodyHandler(e)}
    >
      {props.children}
    </button>
  );
};

export default Button;
