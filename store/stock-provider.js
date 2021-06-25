import { createContext, useState } from "react";

const StockContext = createContext({
  activeTbodyHandler: () => {},
  stocks: null,
  stats: null,
});

export function StockContextProvider(props) {
  const [showStockNumbers, setShowStockNumbers] = useState(true);
  const [showStats, setShowStats] = useState(false);

  function activeTbodyHandler(e) {
    console.log("stock-provider_e:", e);
    const elem = e.target.textContent;
    if (elem === "Overview") {
      setShowStats(false);
      if (showStockNumbers === false) setShowStockNumbers(true);
    } else if (elem === "Stats") {
      setShowStockNumbers(false);
      setShowStats(true);
    }
  }

  const context = {
    activeTbodyHandler,
    stocks: showStockNumbers,
    stats: showStats,
  };

  return (
    <StockContext.Provider value={context}>
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContext;
