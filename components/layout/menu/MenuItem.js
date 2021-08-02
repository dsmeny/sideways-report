import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <>
      <ul className={classes.list_styles}>
        <li
          onClick={(e) => {
            e.currentTarget.classList.toggle(classes.active);
            props.classTriggerHandler();
            e.stopPropagation();
          }}
        >
          <span
            style={{
              transform: "translateX(-10px)",
            }}
          >
            Search
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "2rem" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </li>
        {/* <li>p2</li>
        <li>p3</li> */}
      </ul>
    </>
  );
};

export default MenuItem;
