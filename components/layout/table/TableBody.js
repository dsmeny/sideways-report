import classes from "./TableBody.module.css";

const TableBody = (props) => {
  return (
    <>
      <tbody className={classes.trBody}>{props.children}</tbody>
    </>
  );
};

export default TableBody;
