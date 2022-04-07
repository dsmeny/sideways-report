import { useContext } from "react";
import Search from "../../ui/Search";
import { SearchIcon } from "../../ui/Icons";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({ keypressHandler, inputRef, clickHandler, symbol }) => {
  return (
    <Search className={`${classes.search_buttons} `}>
      <input
        type="text"
        placeholder="stock symbol"
        onKeyPress={(e) => {
          keypressHandler(e);
        }}
        onClick={clickHandler}
        ref={inputRef}
      />
      <SearchIcon />
    </Search>
  );
};

export default SearchStocks;
