import { createContext, useState, useEffect } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
  showSearch: function () {},
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(false);

  function searchHandler() {
    console.log("searchHandler fired!");
    setIsSearch(!isSearch);
  }

  useEffect(() => {
    console.log("effect fired!");
    searchHandler();
  }, []);

  const context = {
    searchTrigger: isSearch,
    showSearch: searchHandler,
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
