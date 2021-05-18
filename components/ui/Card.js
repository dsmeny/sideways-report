const Card = (props) => {
  const cardStyle = {
    border: "1px solid grey",
    borderRadius: "10px",
    minHeight: "12rem",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2rem",
    paddingTop: "2rem",
    width: "22rem",
  };

  return <div style={cardStyle}>{props.children}</div>;
};

export default Card;
