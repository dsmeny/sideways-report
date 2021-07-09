import { createContext, useState } from "react";

const StockContext = createContext({
  activeTbodyHandler: () => {},
  overview: null,
  ohlc: null,
});

export function StockContextProvider(props) {
  const [showOverview, setShowOverview] = useState(true);
  const [showOhlc, setShowOhlc] = useState(false);

  function activeTbodyHandler(e) {
    const elem = e.target.textContent;
    if (elem === "Overview") {
      setShowOhlc(false);
      if (showOverview === false) setShowOverview(true);
    } else if (elem === "OHLC") {
      setShowOverview(false);
      setShowOhlc(true);
    }
  }

  const context = {
    activeTbodyHandler,
    overview: showOverview,
    ohlc: showOhlc,
  };

  return (
    <StockContext.Provider value={context}>
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContext;
