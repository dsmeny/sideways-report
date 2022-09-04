const TableItem = ({ items }) => {
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      gap: "2rem",
    },
  };
  return (
    <ul style={styles.wrapper}>
      {Object.values(items).map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  );
};

export default TableItem;
