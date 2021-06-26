import Search from "../ui/Search";
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
        autoFocus
      />
      {!symbol && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          onClick={clickHandler}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
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
