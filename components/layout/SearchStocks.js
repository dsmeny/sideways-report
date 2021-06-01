import Search from "../ui/Search";
import classes from "./SearchStocks.module.css";

const SearchStocks = ({
  changeHandler,
  keypressHandler,
  resetSymbol,
  inputRef,
  dateRef,
  clickHandler,
  userSymbol,
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
      {userSymbol.length < 1 && (
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
      {userSymbol.length > 0 && (
        <input
          type="date"
          ref={dateRef}
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      )}
    </Search>
  );
};

export default SearchStocks;
