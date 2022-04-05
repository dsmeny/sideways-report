const Search = (props) => {
  const styles = {
    search_btn: {
      height: "5rem",
      color: "var(--button-font-color)",
      display: "flex",
      justifyContent: "space-around",
    },
  };
  return (
    <div style={styles.search_btn} className={props.className}>
      {props.children}
    </div>
  );
};

export default Search;
