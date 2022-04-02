import { createContext, useState } from "react";

const STATS = "Overview";
const DAILY = "OHLC";

const StockContext = createContext();

export function StockContextProvider(props) {
  const [showSTATS, setShowSTATS] = useState(true);
  const [showDaily, setShowDAILY] = useState(false);

  function activeTbodyHandler(e) {
    const elem = e.target.textContent;
    if (elem === STATS) {
      setShowDAILY(false);
      if (showSTATS === false) setShowSTATS(true);
    } else if (elem === DAILY) {
      setShowSTATS(false);
      setShowDAILY(true);
    }
  }

  const context = {
    activeTbodyHandler,
    stats: showSTATS,
    daily: showDaily,
    labels: { STATS, DAILY },
  };

  return (
    <StockContext.Provider value={context}>
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContext;
