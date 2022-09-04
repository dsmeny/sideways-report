import Search from "../../base/components/search/Search";
import { IoIosSearch } from "react-icons/io";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({ keypressHandler, inputRef, clickHandler }) => {
  return (
    <Search className={`${classes.search_buttons} `}>
      <input
        type="text"
        placeholder="stock symbol"
        onKeyPress={(e) => {
          keypressHandler(e);
        }}
        ref={inputRef}
      />
      <IoIosSearch style={{ fontSize: "2rem" }} onClick={clickHandler} />
    </Search>
  );
};

export default SearchStocks;
