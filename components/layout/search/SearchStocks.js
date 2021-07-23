import Search from "../../ui/Search";
import { SearchIcon } from "../../ui/Icons";
import { getDate } from "../../utility/calendar_functions";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({
  changeHandler,
  keypressHandler,
  resetSymbol,
  inputRef,
  dateRef,
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
      {!symbol && <SearchIcon clickHandler={clickHandler} />}
      {symbol && <DatePicker dateRef={dateRef} changeHandler={changeHandler} />}
    </Search>
  );
};

function DatePicker(props) {
  return (
    <>
      <span className={classes.datepicker_toggle}>
        <span className={classes.datepicker_toggle_button}></span>
        <input
          type="date"
          className={classes.datepicker_input}
          ref={props.dateRef}
          max={getDate(0)}
          min={getDate(100, "min")}
          onChange={(e) => {
            props.changeHandler(e);
            // searchContext.getStorage();
          }}
        />
      </span>
    </>
  );
}

export default SearchStocks;
