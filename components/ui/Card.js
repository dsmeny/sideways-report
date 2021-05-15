const Card = (props) => {
  const cardStyle = {
    border: "1px solid grey",
    borderRadius: "10px",
    minHeight: "12rem",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2rem",
    paddingTop: "2rem",
  };

  return (
    <>
      <li style={cardStyle}>
        {props.date && (
          <div>
            <p>{props.date}</p>
          </div>
        )}
        <ul>
          <li>
            <ul>
              {props.data.map((el, index) => (
                <li key={index}>
                  {el[0]}: {el[1]}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
};

export default Card;
