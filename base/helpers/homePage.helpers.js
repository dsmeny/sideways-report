export const symbolHandlers = (inputRef, setTimeSeries, series, setState) => {
  const enteredSymbol = inputRef.current.value.toUpperCase();

  fetch(`/api/redis_cloud?name=${enteredSymbol}_global`)
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
