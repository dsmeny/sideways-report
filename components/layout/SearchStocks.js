import Search from "../ui/Search";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({ changeHandler, inputRef, clickHandler }) => {
  return (
    <>
      <Search className={classes.search_buttons}>
        <input
          type="text"
          onClick={clickHandler}
          placeholder="symbol"
          ref={inputRef}
          autoFocus
        />
        <input
          type="date"
          onChange={(e) => {
            changeHandler(e);
            // searchContext.getStorage();
          }}
        />
      </Search>
    </>
  );
};

export default SearchStocks;
