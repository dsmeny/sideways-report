const Card = (props) => {
  const cardStyle = {
    borderRadius: "10px",
    minHeight: "12rem",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2rem",
    paddingTop: "2rem",
    width: "22rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  const classes = "card" + props.className;

  return (
    <div className={classes} style={cardStyle}>
      {props.children}
    </div>
  );
};

export default Card;
