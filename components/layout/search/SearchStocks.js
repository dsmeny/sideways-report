import { useContext } from "react";
import Search from "../../ui/Search";
import { SearchIcon } from "../../ui/Icons";
import classes from "./SearchStocks.module.css";
import TriggerContext from "../../../store/context-provider";

const SearchStocks = ({
  keypressHandler,
  resetSymbol,
  inputRef,
  clickHandler,
}) => {
  const { displayIcon } = useContext(TriggerContext);
  return (
    <Search className={classes.search_buttons}>
      <input
        type="text"
        placeholder="symbol"
        onKeyPress={(e) => keypressHandler(e)}
        onClick={resetSymbol}
        ref={inputRef}
      />
      {!displayIcon && <SearchIcon clickHandler={clickHandler} />}
    </Search>
  );
};

export default SearchStocks;
