import { createContext, useContext, useMemo, useReducer } from "react";
import {
  timeSeriesReducer,
  initialState,
} from "../base/components/views/History/historyReducer";

const TimeseriesContext = createContext();

const TimeseriesProvider = (props) => {
  const [timeseries, dispatch] = useReducer(timeSeriesReducer, initialState);

  const value = useMemo(() => [timeseries, dispatch], [timeseries]);

  return <TimeseriesContext.Provider value={value} {...props} />;
};

const useTimeSeries = () => {
  const context = useContext(TimeseriesContext);

  if (!context) {
    throw new Error("useTimeSeries is undefined");
  }

  const [timeseries, dispatch] = context;

  const setDate = (value) => dispatch({ type: "setDate", payload: value });
  const setSelectedYear = (year) =>
    dispatch({ type: "setSelectedYear", payload: year });
  const setMonth = (month) => dispatch({ type: "setMonth", payload: month });
  const setIpoDate = (dateObj) =>
    dispatch({
      type: "setIpoDate",
      payload: { ...dateObj },
    });

  return [{ setDate, setSelectedYear, setMonth, setIpoDate }, timeseries];
};

export { TimeseriesProvider, useTimeSeries };
