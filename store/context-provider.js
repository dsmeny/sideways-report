import { createContext, useState } from "react";

const TriggerContext = createContext({
  isSearched: () => {},
  symbols: null,
  addSymbols: () => {},
  isChecked: null,
  setIsChecked: () => {},
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(true);
  const [symbols, setSymbols] = useState([]);
  const [isChecked, setIsChecked] = useState(null);

  function searchHandler() {
    setIsSearch(!isSearch);
  }

  const context = {
    isSearched: searchHandler,
    searched: isSearch,
    symbols,
    setSymbols,
    isChecked,
    setIsChecked,
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
