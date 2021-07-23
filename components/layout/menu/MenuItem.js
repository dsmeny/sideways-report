import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <>
      <ul className={classes.list_styles}>
        <li
          className={(props.searchTrigger && classes.active) || ""}
          onClick={(e) => {
            e.target.classList.toggle(classes.active);
            props.classTriggerHandler();
          }}
        >
          p1
        </li>
        <li>p2</li>
        <li>p3</li>
      </ul>
    </>
  );
};

export default MenuItem;
