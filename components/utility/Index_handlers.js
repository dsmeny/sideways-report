export const symbolHandlers = (inputRef, setTimeSeries, series, setState) => {
  const enteredSymbol = inputRef.current.value.toUpperCase();
  setTimeSeries(series); // this will eventually be a filter option
  setState(enteredSymbol);
};
