export const symbolHandlers = (inputRef, setTimeSeries, series, setState) => {
  const enteredSymbol = inputRef.current.value.toUpperCase();

  console.log("symbolHandlers  inputRef: ", inputRef.current);
  console.log("symbolHandlers  enteredSymbol: ", enteredSymbol);

  fetch(`/api/redis_cloud?name=${enteredSymbol}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.data) {
        setTimeSeries(series);
        setState(enteredSymbol);
      } else {
        setTimeSeries(null);
        setState(data.data);
      }
    });
};
