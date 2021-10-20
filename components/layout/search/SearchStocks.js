import Search from "../../ui/Search";
import { SearchIcon } from "../../ui/Icons";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({
  keypressHandler,
  resetSymbol,
  inputRef,
  clickHandler,
  symbol,
}) => {
  return (
    <Search className={classes.search_buttons}>
      <input
        type="text"
        placeholder="symbol"
        onKeyPress={(e) => keypressHandler(e)}
        onClick={resetSymbol}
        ref={inputRef}
      />
      {<SearchIcon clickHandler={clickHandler} />}
    </Search>
  );
};

export default SearchStocks;
